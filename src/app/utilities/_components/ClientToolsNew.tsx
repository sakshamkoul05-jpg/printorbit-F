'use client'

import React, { useState, useRef, useCallback } from 'react'
import {
  Upload, ZoomIn, ZoomOut, Pen, Check, Image as ImageIcon,
  Calculator, BarChart3, FileText, Package, Clock, ClipboardList,
  ChevronDown, ChevronUp, X, Plus, Minus, Download, Copy,
  CheckCircle, Circle, ArrowRight, Weight, Truck, Ruler,
  Palette, Type, Target, DollarSign, Calendar, FileDown,
  Trash2, Move, Eye, EyeOff, Scissors, Layers, Star
} from 'lucide-react'

// ─── 1. File Upload & Proofing Tool ─────────────────────────────────────────

type Annotation = { id: number; x: number; y: number; comment: string }
type ChecklistItem = { label: string; checked: boolean }

export function FileProofingTool() {
  const [image, setImage] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [showTrim, setShowTrim] = useState(false)
  const [showBleed, setShowBleed] = useState(false)
  const [showSafe, setShowSafe] = useState(false)
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [annotationMode, setAnnotationMode] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [pendingPos, setPendingPos] = useState<{ x: number; y: number } | null>(null)
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { label: 'Colors approved', checked: false },
    { label: 'Text reviewed', checked: false },
    { label: 'Bleed correct', checked: false },
    { label: 'Resolution OK', checked: false },
  ])
  const [isPanning, setIsPanning] = useState(false)
  const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setImage(ev.target?.result as string)
    reader.readAsDataURL(file)
  }, [])

  const handleImageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!annotationMode || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left - pan.x) / zoom)
    const y = ((e.clientY - rect.top - pan.y) / zoom)
    setPendingPos({ x, y })
  }, [annotationMode, zoom, pan])

  const confirmAnnotation = useCallback(() => {
    if (pendingPos && newComment.trim()) {
      setAnnotations(prev => [...prev, {
        id: Date.now(),
        x: pendingPos.x,
        y: pendingPos.y,
        comment: newComment.trim(),
      }])
      setNewComment('')
      setPendingPos(null)
    }
  }, [pendingPos, newComment])

  const removeAnnotation = useCallback((id: number) => {
    setAnnotations(prev => prev.filter(a => a.id !== id))
  }, [])

  const toggleChecklist = useCallback((idx: number) => {
    setChecklist(prev => prev.map((item, i) => i === idx ? { ...item, checked: !item.checked } : item))
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (annotationMode) return
    setIsPanning(true)
    setLastMouse({ x: e.clientX, y: e.clientY })
  }, [annotationMode])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return
    setPan(prev => ({
      x: prev.x + (e.clientX - lastMouse.x),
      y: prev.y + (e.clientY - lastMouse.y),
    }))
    setLastMouse({ x: e.clientX, y: e.clientY })
  }, [isPanning, lastMouse])

  const handleMouseUp = useCallback(() => setIsPanning(false), [])

  const exportProof = useCallback(() => {
    if (!image) return
    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      ctx.fillStyle = 'rgba(255,0,0,0.15)'
      if (showBleed) ctx.fillRect(0, 0, img.width, img.height)
      annotations.forEach(a => {
        ctx.beginPath()
        ctx.arc(a.x, a.y, 8, 0, Math.PI * 2)
        ctx.fillStyle = '#ef4444'
        ctx.fill()
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.fillStyle = '#000'
        ctx.font = '14px sans-serif'
        ctx.fillText(a.comment, a.x + 14, a.y + 5)
      })
      const link = document.createElement('a')
      link.download = 'proof-sheet.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    img.src = image
  }, [image, annotations, showBleed])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <ImageIcon className="w-5 h-5" /> File Upload & Proofing Tool
      </h3>

      {!image && (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors">
          <Upload className="w-10 h-10 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Upload design image</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
      )}

      {image && (
        <>
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => setZoom(z => Math.max(0.25, z - 0.25))} className="p-2 rounded bg-gray-100 hover:bg-gray-200"><ZoomOut className="w-4 h-4" /></button>
            <span className="text-sm text-gray-600 min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(4, z + 0.25))} className="p-2 rounded bg-gray-100 hover:bg-gray-200"><ZoomIn className="w-4 h-4" /></button>
            <div className="h-5 w-px bg-gray-300 mx-1" />
            <button onClick={() => setShowTrim(v => !v)} className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 ${showTrim ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}><Scissors className="w-3.5 h-3.5" /> Trim</button>
            <button onClick={() => setShowBleed(v => !v)} className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 ${showBleed ? 'bg-orange-100 text-orange-700' : 'bg-gray-100'}`}><Layers className="w-3.5 h-3.5" /> Bleed</button>
            <button onClick={() => setShowSafe(v => !v)} className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 ${showSafe ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}><Eye className="w-3.5 h-3.5" /> Safe Zone</button>
            <div className="h-5 w-px bg-gray-300 mx-1" />
            <button onClick={() => setAnnotationMode(v => !v)} className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 ${annotationMode ? 'bg-red-100 text-red-700' : 'bg-gray-100'}`}><Pen className="w-3.5 h-3.5" /> Annotate</button>
            <button onClick={() => { setAnnotations([]); setImage(null); setZoom(1); setPan({ x: 0, y: 0 }) }} className="px-3 py-1.5 rounded text-sm bg-gray-100 hover:bg-red-50 text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
          </div>

          <div
            ref={containerRef}
            className="relative overflow-hidden border rounded-lg bg-gray-50 cursor-crosshair"
            style={{ height: 400 }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleImageClick}
          >
            <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: '0 0', position: 'absolute', top: 0, left: 0 }}>
              <img src={image} alt="Proof" className="max-w-none" style={{ display: 'block' }} />
              {showBleed && <div className="absolute inset-0 border-4 border-orange-400 border-dashed pointer-events-none" />}
              {showTrim && (
                <>
                  <div className="absolute top-2 left-2 right-2 h-px bg-red-500 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 h-px bg-red-500 pointer-events-none" />
                  <div className="absolute top-2 left-2 w-full h-px bg-red-500 pointer-events-none" style={{ transform: 'rotate(90deg)', transformOrigin: '0 0' }} />
                  <div className="absolute top-2 right-2 w-full h-px bg-red-500 pointer-events-none" style={{ transform: 'rotate(90deg)', transformOrigin: '100% 0' }} />
                </>
              )}
              {showSafe && <div className="absolute inset-8 border-2 border-green-400 border-dashed pointer-events-none" />}
              {annotations.map(a => (
                <div key={a.id} className="absolute group" style={{ left: a.x - 8, top: a.y - 8 }}>
                  <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg cursor-pointer" />
                  <div className="absolute left-6 top-0 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    {a.comment}
                    <button onClick={(e) => { e.stopPropagation(); removeAnnotation(a.id) }} className="text-red-400 hover:text-red-600"><X className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
              {pendingPos && (
                <div className="absolute z-10 bg-white p-2 rounded shadow-lg border" style={{ left: pendingPos.x + 16, top: pendingPos.y - 8 }}>
                  <input autoFocus className="border rounded px-2 py-1 text-sm w-48" placeholder="Add comment..." value={newComment} onChange={e => setNewComment(e.target.value)} onKeyDown={e => e.key === 'Enter' && confirmAnnotation()} />
                  <div className="flex gap-1 mt-1">
                    <button onClick={confirmAnnotation} className="px-2 py-0.5 bg-blue-500 text-white rounded text-xs">Add</button>
                    <button onClick={() => { setPendingPos(null); setNewComment('') }} className="px-2 py-0.5 bg-gray-200 rounded text-xs">Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Approval Checklist</h4>
            {checklist.map((item, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer text-sm">
                <button onClick={() => toggleChecklist(i)} className="flex-shrink-0">
                  {item.checked ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5 text-gray-300" />}
                </button>
                <span className={item.checked ? 'line-through text-gray-400' : ''}>{item.label}</span>
              </label>
            ))}
          </div>

          <button onClick={exportProof} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
            <Download className="w-4 h-4" /> Export Proof Sheet
          </button>
        </>
      )}
    </div>
  )
}

// ─── 2. Print Quantity Calculator ───────────────────────────────────────────

type ProductType = {
  name: string
  basePrice: number
  unitCosts: Record<number, number>
}

const PRODUCTS: ProductType[] = [
  { name: 'Business Card', basePrice: 25, unitCosts: { 100: 0.25, 250: 0.18, 500: 0.12, 1000: 0.08, 2500: 0.05, 5000: 0.035, 10000: 0.025 } },
  { name: 'Flyer', basePrice: 40, unitCosts: { 100: 0.55, 250: 0.38, 500: 0.28, 1000: 0.19, 2500: 0.13, 5000: 0.09, 10000: 0.065 } },
  { name: 'Poster', basePrice: 80, unitCosts: { 100: 3.50, 250: 2.60, 500: 1.95, 1000: 1.45, 2500: 1.10, 5000: 0.85, 10000: 0.65 } },
  { name: 'Brochure', basePrice: 60, unitCosts: { 100: 1.80, 250: 1.30, 500: 0.95, 1000: 0.70, 2500: 0.50, 5000: 0.38, 10000: 0.28 } },
  { name: 'Booklet', basePrice: 120, unitCosts: { 100: 4.50, 250: 3.20, 500: 2.40, 1000: 1.75, 2500: 1.25, 5000: 0.95, 10000: 0.70 } },
  { name: 'Sticker', basePrice: 30, unitCosts: { 100: 0.40, 250: 0.28, 500: 0.20, 1000: 0.14, 2500: 0.09, 5000: 0.065, 10000: 0.045 } },
  { name: 'T-Shirt', basePrice: 150, unitCosts: { 100: 8.00, 250: 6.00, 500: 4.50, 1000: 3.50, 2500: 2.80, 5000: 2.30, 10000: 1.90 } },
  { name: 'Mug', basePrice: 200, unitCosts: { 100: 6.50, 250: 4.80, 500: 3.60, 1000: 2.80, 2500: 2.20, 5000: 1.80, 10000: 1.50 } },
]

const QUICK_QTYS = [100, 250, 500, 1000, 2500, 5000, 10000]

function interpolateCost(product: ProductType, qty: number): number {
  const tiers = Object.entries(product.unitCosts).map(([k, v]) => [Number(k), v] as const).sort((a, b) => a[0] - b[0])
  if (qty <= tiers[0][0]) return tiers[0][1]
  if (qty >= tiers[tiers.length - 1][0]) return tiers[tiers.length - 1][1]
  for (let i = 0; i < tiers.length - 1; i++) {
    if (qty >= tiers[i][0] && qty <= tiers[i + 1][0]) {
      const ratio = (qty - tiers[i][0]) / (tiers[i + 1][0] - tiers[i][0])
      return tiers[i][1] + ratio * (tiers[i + 1][1] - tiers[i][1])
    }
  }
  return tiers[tiers.length - 1][1]
}

export function PrintQuantityCalculator() {
  const [selectedProduct, setSelectedProduct] = useState(0)
  const [quantity, setQuantity] = useState(500)
  const [customQty, setCustomQty] = useState('')
  const product = PRODUCTS[selectedProduct]
  const unitCost = interpolateCost(product, quantity)
  const totalCost = unitCost * quantity
  const baseUnitCost = interpolateCost(product, 100)
  const savingsPercent = ((baseUnitCost - unitCost) / baseUnitCost * 100)

  const barData = QUICK_QTYS.map(q => ({
    qty: q,
    cost: interpolateCost(product, q),
  }))
  const maxCost = Math.max(...barData.map(d => d.cost))

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Calculator className="w-5 h-5" /> Print Quantity Calculator
      </h3>

      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">Product Type</label>
        <div className="grid grid-cols-4 gap-2">
          {PRODUCTS.map((p, i) => (
            <button key={i} onClick={() => setSelectedProduct(i)} className={`px-3 py-2 rounded-lg text-sm border transition-colors ${i === selectedProduct ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">Quantity</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {QUICK_QTYS.map(q => (
            <button key={q} onClick={() => { setQuantity(q); setCustomQty('') }} className={`px-3 py-1.5 rounded text-sm border transition-colors ${quantity === q && !customQty ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
              {q.toLocaleString()}
            </button>
          ))}
        </div>
        <input type="number" placeholder="Custom quantity" value={customQty} onChange={e => { setCustomQty(e.target.value); const v = parseInt(e.target.value); if (v > 0) setQuantity(v) }} className="w-full border rounded-lg px-3 py-2 text-sm" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">${unitCost.toFixed(4)}</div>
          <div className="text-xs text-gray-500 mt-1">Per Unit</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">${totalCost.toFixed(2)}</div>
          <div className="text-xs text-gray-500 mt-1">Total Cost</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{savingsPercent > 0 ? savingsPercent.toFixed(1) : 0}%</div>
          <div className="text-xs text-gray-500 mt-1">Savings vs 100</div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1"><BarChart3 className="w-4 h-4" /> Price Per Unit Across Quantities</h4>
        <div className="space-y-1.5">
          {barData.map(d => (
            <div key={d.qty} className="flex items-center gap-2">
              <span className="text-xs w-12 text-right text-gray-500">{d.qty >= 1000 ? `${d.qty / 1000}k` : d.qty}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-end pr-2 transition-all" style={{ width: `${(d.cost / maxCost) * 100}%`, minWidth: d.cost > 0 ? '2rem' : 0 }}>
                  <span className="text-[10px] text-white font-medium">${d.cost.toFixed(4)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── 3. Paper Stock Comparison ──────────────────────────────────────────────

type PaperStock = {
  name: string
  category: string
  gsm: number
  finish: string
  opacity: number
  brightness: number
  whiteness: number
  costLevel: number
  useCases: string[]
}

const PAPER_STOCKS: PaperStock[] = [
  { name: 'Premium C1S Coated', category: 'Coated', gsm: 130, finish: 'Gloss', opacity: 92, brightness: 95, whiteness: 92, costLevel: 2, useCases: ['Brochures', 'Catalogs', 'Postcards'] },
  { name: 'C2S Gloss Art', category: 'Coated', gsm: 170, finish: 'Gloss', opacity: 95, brightness: 97, whiteness: 95, costLevel: 3, useCases: ['Magazine covers', 'Premium brochures', 'Annual reports'] },
  { name: 'C2S Matte Art', category: 'Coated', gsm: 150, finish: 'Matte', opacity: 93, brightness: 96, whiteness: 94, costLevel: 3, useCases: ['Art prints', 'Photo books', 'Business cards'] },
  { name: 'Offset Uncoated', category: 'Uncoated', gsm: 90, finish: 'Uncoated', opacity: 88, brightness: 85, whiteness: 82, costLevel: 1, useCases: ['Letterheads', 'Envelopes', 'Internal docs'] },
  { name: 'Premium Uncoated', category: 'Uncoated', gsm: 120, finish: 'Uncoated', opacity: 90, brightness: 92, whiteness: 90, costLevel: 2, useCases: ['Business cards', 'Invitations', 'Menus'] },
  { name: 'Linen Textured', category: 'Textured', gsm: 120, finish: 'Linen', opacity: 91, brightness: 90, whiteness: 88, costLevel: 3, useCases: ['Wedding invitations', 'Certificates', 'Luxury branding'] },
  { name: 'Felt Textured', category: 'Textured', gsm: 150, finish: 'Felt', opacity: 93, brightness: 88, whiteness: 86, costLevel: 3, useCases: ['Greeting cards', 'Posters', 'Premium menus'] },
  { name: 'Laid Texture', category: 'Textured', gsm: 100, finish: 'Laid', opacity: 89, brightness: 87, whiteness: 85, costLevel: 2, useCases: ['Business stationery', 'Business cards', 'Letterheads'] },
  { name: 'Eco Recycled', category: 'Recycled', gsm: 115, finish: 'Uncoated', opacity: 90, brightness: 80, whiteness: 78, costLevel: 2, useCases: ['Eco packaging', 'Flyers', 'Menus'] },
  { name: 'Post-Consumer Recycled', category: 'Recycled', gsm: 130, finish: 'Uncoated', opacity: 92, brightness: 78, whiteness: 75, costLevel: 2, useCases: ['Sustainable brands', 'Reports', 'Brochures'] },
  { name: 'Metallic Silver', category: 'Specialty', gsm: 140, finish: 'Metallic', opacity: 95, brightness: 90, whiteness: 88, costLevel: 4, useCases: ['Premium business cards', 'Event invites', 'Luxury packaging'] },
  { name: 'Translucent Vellum', category: 'Specialty', gsm: 90, finish: 'Translucent', opacity: 45, brightness: 93, whiteness: 91, costLevel: 4, useCases: ['Overlay pages', 'Invitations', 'Art projects'] },
  { name: 'Kraft Paper', category: 'Specialty', gsm: 120, finish: 'Kraft', opacity: 94, brightness: 60, whiteness: 55, costLevel: 2, useCases: ['Eco packaging', 'Tags', 'Rustic branding'] },
]

const CATEGORIES = [...new Set(PAPER_STOCKS.map(p => p.category))]
const FINISH_OPTIONS = [...new Set(PAPER_STOCKS.map(p => p.finish))]

function CostLevel({ level }: { level: number }) {
  return (
    <span className="text-green-600 font-medium">
      {'$'.repeat(level)}<span className="text-gray-300">{'$'.repeat(4 - level)}</span>
    </span>
  )
}

export function PaperStockComparison() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedFinish, setSelectedFinish] = useState('')
  const [gsmRange, setGsmRange] = useState<[number, number]>([60, 200])
  const [maxCost, setMaxCost] = useState(4)
  const [expandedStock, setExpandedStock] = useState<string | null>(null)
  const [compareList, setCompareList] = useState<PaperStock[]>([])

  const filteredStocks = PAPER_STOCKS.filter(s => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(s.category)) return false
    if (selectedFinish && s.finish !== selectedFinish) return false
    if (s.gsm < gsmRange[0] || s.gsm > gsmRange[1]) return false
    if (s.costLevel > maxCost) return false
    return true
  })

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }

  const toggleCompare = (stock: PaperStock) => {
    setCompareList(prev => {
      if (prev.find(s => s.name === stock.name)) return prev.filter(s => s.name !== stock.name)
      if (prev.length >= 3) return prev
      return [...prev, stock]
    })
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <FileText className="w-5 h-5" /> Paper Stock Comparison
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Category</label>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => toggleCategory(cat)} className={`px-2.5 py-1 rounded text-xs border transition-colors ${selectedCategories.includes(cat) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Finish</label>
          <select value={selectedFinish} onChange={e => setSelectedFinish(e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm">
            <option value="">All finishes</option>
            {FINISH_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">GSM Range: {gsmRange[0]} - {gsmRange[1]}</label>
          <div className="flex gap-2 items-center">
            <input type="range" min={60} max={300} value={gsmRange[0]} onChange={e => setGsmRange([Number(e.target.value), gsmRange[1]])} className="flex-1" />
            <input type="range" min={60} max={300} value={gsmRange[1]} onChange={e => setGsmRange([gsmRange[0], Number(e.target.value)])} className="flex-1" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Max Cost: {'$'.repeat(maxCost)}</label>
          <input type="range" min={1} max={4} value={maxCost} onChange={e => setMaxCost(Number(e.target.value))} className="w-full" />
        </div>
      </div>

      {compareList.length >= 2 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-sm">Comparison ({compareList.length}/3)</h4>
            <button onClick={() => setCompareList([])} className="text-xs text-red-500 hover:text-red-700">Clear</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-1 pr-3">Property</th>
                  {compareList.map(s => <th key={s.name} className="text-left py-1 px-2">{s.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {['GSM', 'Finish', 'Opacity', 'Brightness', 'Whiteness', 'Cost'].map(prop => (
                  <tr key={prop} className="border-b border-gray-100">
                    <td className="py-1 pr-3 text-gray-500">{prop}</td>
                    {compareList.map(s => (
                      <td key={s.name} className="py-1 px-2">
                        {prop === 'GSM' ? s.gsm : prop === 'Finish' ? s.finish : prop === 'Opacity' ? `${s.opacity}%` : prop === 'Brightness' ? `${s.brightness}%` : prop === 'Whiteness' ? `${s.whiteness}%` : <CostLevel level={s.costLevel} />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredStocks.map(stock => (
          <div key={stock.name} className="border rounded-lg p-3 hover:shadow-md transition-shadow bg-white">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h5 className="font-medium text-sm">{stock.name}</h5>
                <span className="text-xs text-gray-500">{stock.category} · {stock.finish}</span>
              </div>
              <CostLevel level={stock.costLevel} />
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 mb-2">
              <span>{stock.gsm} GSM</span>
              <span>{stock.opacity}% opacity</span>
              <span>{stock.brightness}% bright</span>
              <span>{stock.whiteness}% white</span>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => setExpandedStock(expandedStock === stock.name ? null : stock.name)} className="text-xs text-blue-600 hover:underline flex items-center gap-0.5">
                {expandedStock === stock.name ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />} Details
              </button>
              <button onClick={() => toggleCompare(stock)} className={`text-xs px-2 py-0.5 rounded border transition-colors ${compareList.find(s => s.name === stock.name) ? 'bg-blue-100 text-blue-700 border-blue-300' : 'border-gray-200 hover:border-blue-300'}`}>
                {compareList.find(s => s.name === stock.name) ? '✓ Comparing' : 'Compare'}
              </button>
            </div>
            {expandedStock === stock.name && (
              <div className="mt-3 pt-3 border-t text-xs">
                <p className="font-medium text-gray-700 mb-1">Best for:</p>
                <div className="flex flex-wrap gap-1">
                  {stock.useCases.map(uc => (
                    <span key={uc} className="bg-gray-100 px-2 py-0.5 rounded">{uc}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredStocks.length === 0 && <p className="text-center text-gray-400 text-sm py-8">No paper stocks match your filters</p>}
    </div>
  )
}

// ─── 4. Shipping Cost Calculator ────────────────────────────────────────────

type CarrierTier = 'Standard' | 'Express' | 'Overnight'

const RATES: Record<CarrierTier, { baseCost: number; perKg: number; days: string }> = {
  Standard: { baseCost: 5.99, perKg: 1.20, days: '5-7' },
  Express: { baseCost: 12.99, perKg: 2.50, days: '2-3' },
  Overnight: { baseCost: 24.99, perKg: 5.00, days: '1' },
}

const INTL_RATES: Record<CarrierTier, { baseCost: number; perKg: number; days: string }> = {
  Standard: { baseCost: 18.99, perKg: 4.50, days: '10-21' },
  Express: { baseCost: 35.99, perKg: 8.00, days: '5-10' },
  Overnight: { baseCost: 65.99, perKg: 15.00, days: '2-3' },
}

export function ShippingCalculator() {
  const [length, setLength] = useState(30)
  const [width, setWidth] = useState(20)
  const [height, setHeight] = useState(10)
  const [weight, setWeight] = useState(2)
  const [isInternational, setIsInternational] = useState(false)
  const [selectedTier, setSelectedTier] = useState<CarrierTier>('Standard')

  const volumetricWeight = (length * width * height) / 5000
  const billableWeight = Math.max(weight, volumetricWeight)
  const rates = isInternational ? INTL_RATES : RATES
  const estimatedCost = rates[selectedTier].baseCost + billableWeight * rates[selectedTier].perKg

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Truck className="w-5 h-5" /> Shipping Cost Calculator
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block flex items-center gap-1"><Ruler className="w-3.5 h-3.5" /> Package Dimensions (cm)</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <span className="text-xs text-gray-400">L</span>
              <input type="number" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full border rounded px-2 py-1.5 text-sm" />
            </div>
            <div>
              <span className="text-xs text-gray-400">W</span>
              <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="w-full border rounded px-2 py-1.5 text-sm" />
            </div>
            <div>
              <span className="text-xs text-gray-400">H</span>
              <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full border rounded px-2 py-1.5 text-sm" />
            </div>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block flex items-center gap-1"><Weight className="w-3.5 h-3.5" /> Actual Weight (kg)</label>
          <input type="number" step="0.1" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full border rounded px-2 py-1.5 text-sm" />
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="checkbox" checked={isInternational} onChange={e => setIsInternational(e.target.checked)} className="rounded" />
          International
        </label>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 grid grid-cols-3 gap-3 text-center text-sm">
        <div>
          <div className="text-gray-400 text-xs">Volumetric Weight</div>
          <div className="font-semibold">{volumetricWeight.toFixed(2)} kg</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs">Actual Weight</div>
          <div className="font-semibold">{weight.toFixed(2)} kg</div>
        </div>
        <div>
          <div className="text-gray-400 text-xs">Billable Weight</div>
          <div className="font-bold text-blue-600">{billableWeight.toFixed(2)} kg</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {(Object.keys(rates) as CarrierTier[]).map(tier => (
          <button key={tier} onClick={() => setSelectedTier(tier)} className={`p-3 rounded-lg border text-center transition-colors ${selectedTier === tier ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-200 hover:border-blue-300'}`}>
            <div className="font-medium text-sm">{tier}</div>
            <div className="text-xs mt-1 opacity-80">{rates[tier].days} days</div>
            <div className="text-lg font-bold mt-1">${(rates[tier].baseCost + billableWeight * rates[tier].perKg).toFixed(2)}</div>
          </button>
        ))}
      </div>

      <div className="bg-green-50 rounded-lg p-3 text-sm">
        <div className="flex justify-between">
          <span>Estimated shipping cost ({selectedTier}):</span>
          <span className="font-bold text-green-700">${estimatedCost.toFixed(2)}</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">Estimated delivery: {rates[selectedTier].days} business days</div>
      </div>
    </div>
  )
}

// ─── 5. Order Timeline Estimator ────────────────────────────────────────────

type FinishingOption = 'Lamination' | 'UV Coating' | 'Die-Cut' | 'Embossing' | 'Foil Stamping'

type TimelineStage = { name: string; days: number; color: string }

const FINISHING_DAYS: Record<FinishingOption, number> = {
  'Lamination': 0.5,
  'UV Coating': 0.5,
  'Die-Cut': 1,
  'Embossing': 1,
  'Foil Stamping': 1.5,
}

const SHIPPING_DAYS: Record<string, number> = {
  'Standard': 5,
  'Express': 2,
  'Overnight': 1,
  'Pickup': 0,
}

export function OrderTimelineEstimator() {
  const [productType, setProductType] = useState('Business Card')
  const [quantity, setQuantity] = useState(500)
  const [finishing, setFinishing] = useState<FinishingOption[]>([])
  const [shipping, setShipping] = useState('Standard')

  const toggleFinishing = (opt: FinishingOption) => {
    setFinishing(prev => prev.includes(opt) ? prev.filter(f => f !== opt) : [...prev, opt])
  }

  const printDays = quantity <= 250 ? 1 : quantity <= 1000 ? 2 : quantity <= 2500 ? 3 : quantity <= 5000 ? 4 : 5
  const finishingDays = finishing.reduce((sum, f) => sum + FINISHING_DAYS[f], 0)
  const qcDays = finishing.length > 0 ? 1 : 0.5
  const shipDays = SHIPPING_DAYS[shipping]
  const totalDays = 1 + printDays + finishingDays + qcDays + shipDays

  const stages: TimelineStage[] = [
    { name: 'Prepress', days: 1, color: 'bg-blue-500' },
    { name: 'Printing', days: printDays, color: 'bg-purple-500' },
    { name: 'Finishing', days: finishingDays || 0, color: 'bg-orange-500' },
    { name: 'QC', days: qcDays, color: 'bg-yellow-500' },
    { name: 'Shipping', days: shipDays, color: 'bg-green-500' },
  ].filter(s => s.days > 0)

  const maxDays = Math.max(...stages.map(s => s.days), 1)
  const today = new Date()
  const deliveryDate = new Date(today)
  deliveryDate.setDate(deliveryDate.getDate() + Math.ceil(totalDays))

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Clock className="w-5 h-5" /> Order Timeline Estimator
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Product Type</label>
          <select value={productType} onChange={e => setProductType(e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm">
            {PRODUCTS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Quantity</label>
          <select value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="w-full border rounded px-2 py-1.5 text-sm">
            {QUICK_QTYS.map(q => <option key={q} value={q}>{q.toLocaleString()}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">Finishing Options</label>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(FINISHING_DAYS) as FinishingOption[]).map(opt => (
            <button key={opt} onClick={() => toggleFinishing(opt)} className={`px-2.5 py-1 rounded text-xs border transition-colors ${finishing.includes(opt) ? 'bg-orange-100 text-orange-700 border-orange-300' : 'bg-white border-gray-200'}`}>
              {opt} (+{FINISHING_DAYS[opt]}d)
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">Shipping Method</label>
        <div className="flex gap-2">
          {Object.keys(SHIPPING_DAYS).map(method => (
            <button key={method} onClick={() => setShipping(method)} className={`px-3 py-1.5 rounded text-sm border transition-colors ${shipping === method ? 'bg-green-600 text-white border-green-600' : 'bg-white border-gray-200'}`}>
              {method}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-gray-600">Production Timeline</h4>
        <div className="space-y-1.5">
          {stages.map(stage => (
            <div key={stage.name} className="flex items-center gap-3">
              <span className="text-xs text-gray-600 w-20 text-right">{stage.name}</span>
              <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden relative">
                <div className={`h-full ${stage.color} rounded-full flex items-center justify-end pr-2 transition-all`} style={{ width: `${(stage.days / maxDays) * 100}%`, minWidth: stage.days > 0 ? '2rem' : 0 }}>
                  <span className="text-[10px] text-white font-medium">{stage.days}d</span>
                </div>
              </div>
              <span className="text-xs text-gray-400 w-12">{stage.days} day{stage.days !== 1 ? 's' : ''}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-600">Total Estimated Time</div>
          <div className="text-2xl font-bold text-blue-600">{Math.ceil(totalDays)} days</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Estimated Delivery</div>
          <div className="text-lg font-bold text-green-600">{deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
        </div>
      </div>
    </div>
  )
}

// ─── 6. Design Brief Template Generator ─────────────────────────────────────

type BriefField = {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'file'
  options?: string[]
  required?: boolean
}

const BRIEF_FIELDS: BriefField[] = [
  { key: 'companyName', label: 'Company Name', type: 'text', required: true },
  { key: 'industry', label: 'Industry', type: 'select', options: ['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Food & Beverage', 'Real Estate', 'Manufacturing', 'Non-Profit', 'Other'], required: true },
  { key: 'projectType', label: 'Project Type', type: 'select', options: ['Business Card', 'Brochure', 'Flyer', 'Poster', 'Banner', 'Logo', 'Website', 'Packaging', 'Social Media', 'Other'], required: true },
  { key: 'targetAudience', label: 'Target Audience', type: 'textarea', required: true },
  { key: 'colorsPreferred', label: 'Colors Preferred', type: 'text' },
  { key: 'fontsPreferred', label: 'Fonts Preferred', type: 'text' },
  { key: 'message', label: 'Message / Tagline', type: 'textarea' },
  { key: 'specialRequirements', label: 'Special Requirements', type: 'textarea' },
  { key: 'budgetRange', label: 'Budget Range', type: 'select', options: ['Under $500', '$500 - $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000+'] },
  { key: 'deadline', label: 'Deadline', type: 'text' },
]

const defaultForm = Object.fromEntries(BRIEF_FIELDS.map(f => [f.key, '']))

export function DesignBriefGenerator() {
  const [form, setForm] = useState<Record<string, string>>(defaultForm)
  const [showPreview, setShowPreview] = useState(false)
  const [copied, setCopied] = useState(false)

  const updateField = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const generateBrief = (): string => {
    const lines: string[] = []
    lines.push('═══════════════════════════════════════════')
    lines.push('           DESIGN BRIEF')
    lines.push('═══════════════════════════════════════════')
    lines.push('')
    lines.push(`Company: ${form.companyName || '—'}`)
    lines.push(`Industry: ${form.industry || '—'}`)
    lines.push(`Project Type: ${form.projectType || '—'}`)
    lines.push('')
    lines.push('── Target Audience ──')
    lines.push(form.targetAudience || '—')
    lines.push('')
    if (form.colorsPreferred) { lines.push(`Preferred Colors: ${form.colorsPreferred}`); lines.push('') }
    if (form.fontsPreferred) { lines.push(`Preferred Fonts: ${form.fontsPreferred}`); lines.push('') }
    lines.push('── Message / Tagline ──')
    lines.push(form.message || '—')
    lines.push('')
    if (form.specialRequirements) { lines.push('── Special Requirements ──'); lines.push(form.specialRequirements); lines.push('') }
    if (form.budgetRange) { lines.push(`Budget Range: ${form.budgetRange}`); lines.push('') }
    if (form.deadline) { lines.push(`Deadline: ${form.deadline}`); lines.push('') }
    lines.push('═══════════════════════════════════════════')
    return lines.join('\n')
  }

  const generateJSON = (): string => {
    return JSON.stringify({ ...form, generatedAt: new Date().toISOString() }, null, 2)
  }

  const downloadBrief = (format: 'txt' | 'json') => {
    const content = format === 'txt' ? generateBrief() : generateJSON()
    const blob = new Blob([content], { type: format === 'txt' ? 'text/plain' : 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `design-brief.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(generateBrief())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [form])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <ClipboardList className="w-5 h-5" /> Design Brief Template Generator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BRIEF_FIELDS.map(field => (
          <div key={field.key} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
            <label className="text-sm font-medium text-gray-600 mb-1 block">
              {field.label} {field.required && <span className="text-red-400">*</span>}
            </label>
            {field.type === 'text' && (
              <input type="text" value={form[field.key]} onChange={e => updateField(field.key, e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm" />
            )}
            {field.type === 'textarea' && (
              <textarea value={form[field.key]} onChange={e => updateField(field.key, e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 text-sm resize-none" />
            )}
            {field.type === 'select' && (
              <select value={form[field.key]} onChange={e => updateField(field.key, e.target.value)} className="w-full border rounded-lg px-3 py-2 text-sm">
                <option value="">Select...</option>
                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
          {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
        <button onClick={() => downloadBrief('txt')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
          <FileDown className="w-4 h-4" /> Download TXT
        </button>
        <button onClick={() => downloadBrief('json')} className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
          <FileDown className="w-4 h-4" /> Download JSON
        </button>
        <button onClick={copyToClipboard} className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {showPreview && (
        <div className="bg-gray-900 text-green-400 rounded-lg p-4 font-mono text-xs whitespace-pre-wrap overflow-auto max-h-96">
          {generateBrief()}
        </div>
      )}
    </div>
  )
}
