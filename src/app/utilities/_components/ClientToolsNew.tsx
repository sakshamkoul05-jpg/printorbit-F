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
    <div className="d-flex flex-column gap-4">
      <h3 className="h5 fw-semibold d-flex align-items-center gap-2">
        <ImageIcon size={20} /> File Upload & Proofing Tool
      </h3>

      {!image && (
        <label className="d-flex flex-column align-items-center justify-content-center w-100 border border-2 border-dashed rounded-lg p-4" style={{ height: '192px', borderColor: '#dee2e6', cursor: 'pointer' }}>
          <Upload size={40} className="text-muted mb-2" />
          <span className="text-sm text-muted">Upload design image</span>
          <input type="file" accept="image/*" className="d-none" onChange={handleUpload} />
        </label>
      )}

      {image && (
        <>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <button onClick={() => setZoom(z => Math.max(0.25, z - 0.25))} className="btn btn-sm p-1" style={{ backgroundColor: '#f3f4f6' }}><ZoomOut size={16} /></button>
            <span className="text-sm text-muted" style={{ minWidth: '60px', textAlign: 'center' }}>{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(4, z + 0.25))} className="btn btn-sm p-1" style={{ backgroundColor: '#f3f4f6' }}><ZoomIn size={16} /></button>
            <div className="vr mx-1" style={{ height: '20px' }} />
            <button onClick={() => setShowTrim(v => !v)} className={`btn btn-sm d-flex align-items-center gap-1 ${showTrim ? 'text-primary' : ''}`} style={showTrim ? { backgroundColor: '#dbeafe', borderColor: '#93c5fd' } : { backgroundColor: '#f3f4f6' }}><Scissors size={14} /> Trim</button>
            <button onClick={() => setShowBleed(v => !v)} className={`btn btn-sm d-flex align-items-center gap-1 ${showBleed ? 'text-warning' : ''}`} style={showBleed ? { backgroundColor: '#ffedd5', borderColor: '#fed7aa' } : { backgroundColor: '#f3f4f6' }}><Layers size={14} /> Bleed</button>
            <button onClick={() => setShowSafe(v => !v)} className={`btn btn-sm d-flex align-items-center gap-1 ${showSafe ? 'text-success' : ''}`} style={showSafe ? { backgroundColor: '#dcfce7', borderColor: '#bbf7d0' } : { backgroundColor: '#f3f4f6' }}><Eye size={14} /> Safe Zone</button>
            <div className="vr mx-1" style={{ height: '20px' }} />
            <button onClick={() => setAnnotationMode(v => !v)} className={`btn btn-sm d-flex align-items-center gap-1 ${annotationMode ? 'text-danger' : ''}`} style={annotationMode ? { backgroundColor: '#fee2e2', borderColor: '#fecaca' } : { backgroundColor: '#f3f4f6' }}><Pen size={14} /> Annotate</button>
            <button onClick={() => { setAnnotations([]); setImage(null); setZoom(1); setPan({ x: 0, y: 0 }) }} className="btn btn-sm d-flex align-items-center gap-1 text-danger" style={{ backgroundColor: '#f3f4f6' }}><Trash2 size={14} /></button>
          </div>

          <div
            ref={containerRef}
            className="position-relative overflow-hidden border rounded-lg"
            style={{ height: 400, backgroundColor: '#f9fafb', cursor: annotationMode ? 'crosshair' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleImageClick}
          >
            <div style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, transformOrigin: '0 0', position: 'absolute', top: 0, left: 0 }}>
              <img src={image} alt="Proof" style={{ display: 'block', maxWidth: 'none' }} />
              {showBleed && <div className="position-absolute top-0 start-0 w-100 h-100" style={{ border: '4px dashed #fb923c', pointerEvents: 'none' }} />}
              {showTrim && (
                <>
                  <div className="position-absolute" style={{ top: '8px', left: '8px', right: '8px', height: '1px', backgroundColor: '#ef4444', pointerEvents: 'none' }} />
                  <div className="position-absolute" style={{ bottom: '8px', left: '8px', right: '8px', height: '1px', backgroundColor: '#ef4444', pointerEvents: 'none' }} />
                  <div className="position-absolute" style={{ top: '8px', left: '8px', width: '1px', height: '100%', backgroundColor: '#ef4444', pointerEvents: 'none' }} />
                  <div className="position-absolute" style={{ top: '8px', right: '8px', width: '1px', height: '100%', backgroundColor: '#ef4444', pointerEvents: 'none' }} />
                </>
              )}
              {showSafe && <div className="position-absolute" style={{ top: '32px', left: '32px', right: '32px', bottom: '32px', border: '2px dashed #4ade80', pointerEvents: 'none' }} />}
              {annotations.map(a => (
                <div key={a.id} className="position-relative" style={{ left: a.x - 8, top: a.y - 8 }}>
                  <div style={{ width: '16px', height: '16px', backgroundColor: '#ef4444', borderRadius: '50%', border: '2px solid #fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer' }} />
                  <div className="position-absolute bg-white px-2 py-1 rounded shadow-sm text-xs text-nowrap d-flex align-items-center gap-1" style={{ left: '24px', top: 0, opacity: 0, transition: 'opacity 0.2s' }}>
                    {a.comment}
                    <button onClick={(e) => { e.stopPropagation(); removeAnnotation(a.id) }} className="btn btn-sm p-0 text-danger"><X size={12} /></button>
                  </div>
                </div>
              ))}
              {pendingPos && (
                <div className="position-absolute bg-white p-2 rounded shadow border" style={{ left: pendingPos.x + 16, top: pendingPos.y - 8, zIndex: 10 }}>
                  <input autoFocus className="form-control form-control-sm" placeholder="Add comment..." value={newComment} onChange={e => setNewComment(e.target.value)} onKeyDown={e => e.key === 'Enter' && confirmAnnotation()} style={{ width: '192px' }} />
                  <div className="d-flex gap-1 mt-1">
                    <button onClick={confirmAnnotation} className="btn btn-sm btn-primary text-white" style={{ padding: '2px 8px' }}>Add</button>
                    <button onClick={() => { setPendingPos(null); setNewComment('') }} className="btn btn-sm" style={{ backgroundColor: '#e5e7eb' }}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="d-flex flex-column gap-2">
            <h4 className="fw-medium text-sm">Approval Checklist</h4>
            {checklist.map((item, i) => (
              <label key={i} className="d-flex align-items-center gap-2 cursor-pointer text-sm">
                <button onClick={() => toggleChecklist(i)} className="btn btn-sm p-0 flex-shrink-0">
                  {item.checked ? <CheckCircle size={20} className="text-success" /> : <Circle size={20} className="text-muted" />}
                </button>
                <span className={item.checked ? 'text-decoration-line-through text-muted' : ''}>{item.label}</span>
              </label>
            ))}
          </div>

          <button onClick={exportProof} className="btn btn-primary d-flex align-items-center gap-2" style={{ padding: '8px 16px' }}>
            <Download size={16} /> Export Proof Sheet
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
    <div className="d-flex flex-column gap-4">
      <h3 className="h5 fw-semibold d-flex align-items-center gap-2">
        <Calculator size={20} /> Print Quantity Calculator
      </h3>

      <div>
        <label className="form-label text-sm fw-medium text-muted">Product Type</label>
        <div className="row g-2">
          {PRODUCTS.map((p, i) => (
            <div key={i} className="col-6 col-md-3">
              <button onClick={() => setSelectedProduct(i)} className={`btn w-100 text-sm ${i === selectedProduct ? 'btn-primary' : 'btn-outline-secondary'}`}>
                {p.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="form-label text-sm fw-medium text-muted">Quantity</label>
        <div className="d-flex flex-wrap gap-2 mb-2">
          {QUICK_QTYS.map(q => (
            <button key={q} onClick={() => { setQuantity(q); setCustomQty('') }} className={`btn btn-sm ${quantity === q && !customQty ? 'btn-primary' : 'btn-outline-secondary'}`}>
              {q.toLocaleString()}
            </button>
          ))}
        </div>
        <input type="number" placeholder="Custom quantity" value={customQty} onChange={e => { setCustomQty(e.target.value); const v = parseInt(e.target.value); if (v > 0) setQuantity(v) }} className="form-control form-control-sm" />
      </div>

      <div className="row g-3">
        <div className="col-4">
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#eff6ff' }}>
            <div className="h4 fw-bold text-primary">${unitCost.toFixed(4)}</div>
            <div className="text-xs text-muted">Per Unit</div>
          </div>
        </div>
        <div className="col-4">
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f0fdf4' }}>
            <div className="h4 fw-bold text-success">${totalCost.toFixed(2)}</div>
            <div className="text-xs text-muted">Total Cost</div>
          </div>
        </div>
        <div className="col-4">
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#faf5ff' }}>
            <div className="h4 fw-bold" style={{ color: '#9333ea' }}>{savingsPercent > 0 ? savingsPercent.toFixed(1) : 0}%</div>
            <div className="text-xs text-muted">Savings vs 100</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm fw-medium text-muted mb-2 d-flex align-items-center gap-1"><BarChart3 size={16} /> Price Per Unit Across Quantities</h4>
        <div className="d-flex flex-column gap-2">
          {barData.map(d => (
            <div key={d.qty} className="d-flex align-items-center gap-2">
              <span className="text-xs" style={{ width: '48px', textAlign: 'right', color: '#6c757d' }}>{d.qty >= 1000 ? `${d.qty / 1000}k` : d.qty}</span>
              <div className="flex-grow-1 rounded-pill overflow-hidden" style={{ height: '20px', backgroundColor: '#f3f4f6' }}>
                <div className="h-100 rounded-pill d-flex align-items-center justify-content-end px-2" style={{ width: `${(d.cost / maxCost) * 100}%`, minWidth: d.cost > 0 ? '2rem' : 0, background: 'linear-gradient(to right, #60a5fa, #2563eb)' }}>
                  <span className="text-white fw-medium" style={{ fontSize: '10px' }}>${d.cost.toFixed(4)}</span>
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
    <span className="fw-medium text-success">
      {'$'.repeat(level)}<span className="text-muted">{'$'.repeat(4 - level)}</span>
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
    <div className="d-flex flex-column gap-4">
      <h3 className="h5 fw-semibold d-flex align-items-center gap-2">
        <FileText size={20} /> Paper Stock Comparison
      </h3>

      <div className="row g-3">
        <div className="col-6">
          <label className="form-label text-sm fw-medium text-muted">Category</label>
          <div className="d-flex flex-wrap gap-1">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => toggleCategory(cat)} className={`btn btn-sm ${selectedCategories.includes(cat) ? 'btn-primary' : 'btn-outline-secondary'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="col-6">
          <label className="form-label text-sm fw-medium text-muted">Finish</label>
          <select value={selectedFinish} onChange={e => setSelectedFinish(e.target.value)} className="form-select form-select-sm">
            <option value="">All finishes</option>
            {FINISH_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div className="col-6">
          <label className="form-label text-sm fw-medium text-muted">GSM Range: {gsmRange[0]} - {gsmRange[1]}</label>
          <div className="d-flex gap-2 align-items-center">
            <input type="range" min={60} max={300} value={gsmRange[0]} onChange={e => setGsmRange([Number(e.target.value), gsmRange[1]])} className="form-range flex-grow-1" />
            <input type="range" min={60} max={300} value={gsmRange[1]} onChange={e => setGsmRange([gsmRange[0], Number(e.target.value)])} className="form-range flex-grow-1" />
          </div>
        </div>
        <div className="col-6">
          <label className="form-label text-sm fw-medium text-muted">Max Cost: {'$'.repeat(maxCost)}</label>
          <input type="range" min={1} max={4} value={maxCost} onChange={e => setMaxCost(Number(e.target.value))} className="form-range w-100" />
        </div>
      </div>

      {compareList.length >= 2 && (
        <div className="p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-medium text-sm">Comparison ({compareList.length}/3)</h4>
            <button onClick={() => setCompareList([])} className="btn btn-sm text-danger p-0">Clear</button>
          </div>
          <div className="table-responsive">
            <table className="table table-sm text-xs">
              <thead>
                <tr>
                  <th>Property</th>
                  {compareList.map(s => <th key={s.name}>{s.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {['GSM', 'Finish', 'Opacity', 'Brightness', 'Whiteness', 'Cost'].map(prop => (
                  <tr key={prop}>
                    <td className="text-muted">{prop}</td>
                    {compareList.map(s => (
                      <td key={s.name}>
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

      <div className="row g-3">
        {filteredStocks.map(stock => (
          <div key={stock.name} className="col-12 col-md-6 col-lg-4">
            <div className="border rounded-lg p-3 h-100" style={{ backgroundColor: '#fff' }}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h5 className="fw-medium text-sm mb-0">{stock.name}</h5>
                  <span className="text-xs text-muted">{stock.category} · {stock.finish}</span>
                </div>
                <CostLevel level={stock.costLevel} />
              </div>
              <div className="row g-1 text-xs text-muted mb-2">
                <div className="col-6">{stock.gsm} GSM</div>
                <div className="col-6">{stock.opacity}% opacity</div>
                <div className="col-6">{stock.brightness}% bright</div>
                <div className="col-6">{stock.whiteness}% white</div>
              </div>
              <div className="d-flex gap-2">
                <button onClick={() => setExpandedStock(expandedStock === stock.name ? null : stock.name)} className="btn btn-sm p-0 text-primary d-flex align-items-center gap-1">
                  {expandedStock === stock.name ? <ChevronUp size={12} /> : <ChevronDown size={12} />} Details
                </button>
                <button onClick={() => toggleCompare(stock)} className={`btn btn-sm ${compareList.find(s => s.name === stock.name) ? 'btn-primary' : 'btn-outline-secondary'}`}>
                  {compareList.find(s => s.name === stock.name) ? '✓ Comparing' : 'Compare'}
                </button>
              </div>
              {expandedStock === stock.name && (
                <div className="mt-3 pt-3 border-top text-xs">
                  <p className="fw-medium mb-1">Best for:</p>
                  <div className="d-flex flex-wrap gap-1">
                    {stock.useCases.map(uc => (
                      <span key={uc} className="badge bg-light text-dark">{uc}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {filteredStocks.length === 0 && <p className="text-center text-muted text-sm py-5">No paper stocks match your filters</p>}
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
    <div className="d-flex flex-column gap-4">
      <h3 className="h5 fw-semibold d-flex align-items-center gap-2">
        <Truck size={20} /> Shipping Cost Calculator
      </h3>

      <div className="row g-3">
        <div className="col-6">
          <label className="form-label text-sm fw-medium text-muted d-flex align-items-center gap-1"><Ruler size={14} /> Package Dimensions (cm)</label>
          <div className="row g-2">
            <div className="col-4">
              <span className="text-xs text-muted">L</span>
              <input type="number" value={length} onChange={e => setLength(Number(e.target.value))} className="form-control form-control-sm" />
            </div>
            <div className="col-4">
              <span className="text-xs text-muted">W</span>
              <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="form-control form-control-sm" />
            </div>
            <div className="col-4">
              <span className="text-xs text-muted">H</span>
              <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="form-control form-control-sm" />
            </div>
          </div>
        </div>
        <div className="col-6">
          <label className="form-label text-sm fw-medium text-muted d-flex align-items-center gap-1"><Weight size={14} /> Actual Weight (kg)</label>
          <input type="number" step="0.1" value={weight} onChange={e => setWeight(Number(e.target.value))} className="form-control form-control-sm" />
        </div>
      </div>

      <div className="d-flex gap-4 align-items-center">
        <label className="d-flex align-items-center gap-2 cursor-pointer text-sm">
          <input type="checkbox" checked={isInternational} onChange={e => setIsInternational(e.target.checked)} className="form-check-input" />
          International
        </label>
      </div>

      <div className="p-3 rounded-lg text-center text-sm" style={{ backgroundColor: '#f9fafb' }}>
        <div className="row g-3">
          <div className="col-4">
            <div className="text-muted text-xs">Volumetric Weight</div>
            <div className="fw-semibold">{volumetricWeight.toFixed(2)} kg</div>
          </div>
          <div className="col-4">
            <div className="text-muted text-xs">Actual Weight</div>
            <div className="fw-semibold">{weight.toFixed(2)} kg</div>
          </div>
          <div className="col-4">
            <div className="text-muted text-xs">Billable Weight</div>
            <div className="fw-bold text-primary">{billableWeight.toFixed(2)} kg</div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        {(Object.keys(rates) as CarrierTier[]).map(tier => (
          <div key={tier} className="col-4">
            <button onClick={() => setSelectedTier(tier)} className={`btn w-100 p-3 text-center ${selectedTier === tier ? 'btn-primary' : 'btn-outline-secondary'}`}>
              <div className="fw-medium text-sm">{tier}</div>
              <div className="text-xs mt-1 opacity-75">{rates[tier].days} days</div>
              <div className="h5 fw-bold mt-1 mb-0">${(rates[tier].baseCost + billableWeight * rates[tier].perKg).toFixed(2)}</div>
            </button>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-lg text-sm" style={{ backgroundColor: '#f0fdf4' }}>
        <div className="d-flex justify-content-between">
          <span>Estimated shipping cost ({selectedTier}):</span>
          <span className="fw-bold text-success">${estimatedCost.toFixed(2)}</span>
        </div>
        <div className="text-xs text-muted mt-1">Estimated delivery: {rates[selectedTier].days} business days</div>
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
    { name: 'Prepress', days: 1, color: 'bg-primary' },
    { name: 'Printing', days: printDays, color: 'bg-purple' },
    { name: 'Finishing', days: finishingDays || 0, color: 'bg-warning' },
    { name: 'QC', days: qcDays, color: 'bg-info' },
    { name: 'Shipping', days: shipDays, color: 'bg-success' },
  ].filter(s => s.days > 0)

  const maxDays = Math.max(...stages.map(s => s.days), 1)
  const today = new Date()
  const deliveryDate = new Date(today)
  deliveryDate.setDate(deliveryDate.getDate() + Math.ceil(totalDays))

  return (
    <div className="d-flex flex-column gap-4">
      <h3 className="h5 fw-semibold d-flex align-items-center gap-2">
        <Clock size={20} /> Order Timeline Estimator
      </h3>

      <div className="row g-3">
        <div className="col-6">
          <label className="form-label text-sm fw-medium text-muted">Product Type</label>
          <select value={productType} onChange={e => setProductType(e.target.value)} className="form-select form-select-sm">
            {PRODUCTS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
          </select>
        </div>
        <div className="col-6">
          <label className="form-label text-sm fw-medium text-muted">Quantity</label>
          <select value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="form-select form-select-sm">
            {QUICK_QTYS.map(q => <option key={q} value={q}>{q.toLocaleString()}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="form-label text-sm fw-medium text-muted">Finishing Options</label>
        <div className="d-flex flex-wrap gap-1">
          {(Object.keys(FINISHING_DAYS) as FinishingOption[]).map(opt => (
            <button key={opt} onClick={() => toggleFinishing(opt)} className={`btn btn-sm ${finishing.includes(opt) ? 'btn-warning' : 'btn-outline-secondary'}`}>
              {opt} (+{FINISHING_DAYS[opt]}d)
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="form-label text-sm fw-medium text-muted">Shipping Method</label>
        <div className="d-flex gap-2">
          {Object.keys(SHIPPING_DAYS).map(method => (
            <button key={method} onClick={() => setShipping(method)} className={`btn btn-sm ${shipping === method ? 'btn-success' : 'btn-outline-secondary'}`}>
              {method}
            </button>
          ))}
        </div>
      </div>

      <div className="d-flex flex-column gap-2">
        <h4 className="text-sm fw-medium text-muted">Production Timeline</h4>
        <div className="d-flex flex-column gap-2">
          {stages.map(stage => (
            <div key={stage.name} className="d-flex align-items-center gap-3">
              <span className="text-xs text-muted" style={{ width: '80px', textAlign: 'right' }}>{stage.name}</span>
              <div className="flex-grow-1 rounded-pill overflow-hidden position-relative" style={{ height: '24px', backgroundColor: '#f3f4f6' }}>
                <div className={`h-100 ${stage.color} rounded-pill d-flex align-items-center justify-content-end px-2`} style={{ width: `${(stage.days / maxDays) * 100}%`, minWidth: stage.days > 0 ? '2rem' : 0 }}>
                  <span className="text-white fw-medium" style={{ fontSize: '10px' }}>{stage.days}d</span>
                </div>
              </div>
              <span className="text-xs text-muted" style={{ width: '48px' }}>{stage.days} day{stage.days !== 1 ? 's' : ''}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-lg d-flex justify-content-between align-items-center" style={{ backgroundColor: '#eff6ff' }}>
        <div>
          <div className="text-sm text-muted">Total Estimated Time</div>
          <div className="h4 fw-bold text-primary mb-0">{Math.ceil(totalDays)} days</div>
        </div>
        <div className="text-end">
          <div className="text-sm text-muted">Estimated Delivery</div>
          <div className="h5 fw-bold text-success mb-0">{deliveryDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
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
    <div className="d-flex flex-column gap-4">
      <h3 className="h5 fw-semibold d-flex align-items-center gap-2">
        <ClipboardList size={20} /> Design Brief Template Generator
      </h3>

      <div className="row g-3">
        {BRIEF_FIELDS.map(field => (
          <div key={field.key} className={field.type === 'textarea' ? 'col-12' : 'col-12 col-md-6'}>
            <label className="form-label text-sm fw-medium text-muted">
              {field.label} {field.required && <span className="text-danger">*</span>}
            </label>
            {field.type === 'text' && (
              <input type="text" value={form[field.key]} onChange={e => updateField(field.key, e.target.value)} className="form-control form-control-sm" />
            )}
            {field.type === 'textarea' && (
              <textarea value={form[field.key]} onChange={e => updateField(field.key, e.target.value)} rows={3} className="form-control form-control-sm" style={{ resize: 'none' }} />
            )}
            {field.type === 'select' && (
              <select value={form[field.key]} onChange={e => updateField(field.key, e.target.value)} className="form-select form-select-sm">
                <option value="">Select...</option>
                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            )}
          </div>
        ))}
      </div>

      <div className="d-flex gap-2">
        <button onClick={() => setShowPreview(!showPreview)} className="btn btn-primary d-flex align-items-center gap-2">
          {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
        <button onClick={() => downloadBrief('txt')} className="btn btn-success d-flex align-items-center gap-2">
          <FileDown size={16} /> Download TXT
        </button>
        <button onClick={() => downloadBrief('json')} className="btn d-flex align-items-center gap-2" style={{ backgroundColor: '#9333ea', color: '#fff' }}>
          <FileDown size={16} /> Download JSON
        </button>
        <button onClick={copyToClipboard} className="btn btn-secondary d-flex align-items-center gap-2">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {showPreview && (
        <div className="rounded-lg p-4 font-monospace text-xs" style={{ backgroundColor: '#1a1a2e', color: '#4ade80', whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight: '384px' }}>
          {generateBrief()}
        </div>
      )}
    </div>
  )
}
