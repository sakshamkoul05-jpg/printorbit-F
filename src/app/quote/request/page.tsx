'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Upload, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

interface QuoteItem {
  id: string;
  product: string;
  quantity: number;
  material: string;
  size: string;
  finish: string;
  notes: string;
}

export default function QuoteRequestPage() {
  const [items, setItems] = useState<QuoteItem[]>([
    { id: '1', product: '', quantity: 50, material: '', size: '', finish: '', notes: '' },
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), product: '', quantity: 50, material: '', size: '', finish: '', notes: '' }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof QuoteItem, value: string | number) => {
    setItems(items.map((item) => item.id === id ? { ...item, [field]: value } : item));
  };

  const inputClass = "w-full px-3 py-2.5 border border-slate-200 rounded text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-navy/30 transition-colors";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-navy mb-1">Request a Quote</h1>
      <p className="text-sm text-slate-500 mb-8">Fill in your requirements and we&apos;ll get back to you with a quote.</p>

      {/* Items */}
      <div className="space-y-5 mb-6">
        {items.map((item, index) => (
          <div key={item.id} className="bg-white rounded-lg border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-navy flex items-center gap-2 text-sm">
                <span className="w-7 h-7 rounded bg-slate-100 flex items-center justify-center text-navy text-xs font-bold">{index + 1}</span>
                Item {index + 1}
              </h3>
              {items.length > 1 && (
                <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red transition-colors p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Product *</label>
                <select value={item.product} onChange={(e) => updateItem(item.id, 'product', e.target.value)} className={inputClass}>
                  <option value="">Select product</option>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Quantity *</label>
                <input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)} min={1} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Material</label>
                <select value={item.material} onChange={(e) => updateItem(item.id, 'material', e.target.value)} className={inputClass}>
                  <option value="">Select material</option>
                  <option value="standard">Standard Paper</option>
                  <option value="premium">Premium Paper</option>
                  <option value="art">Art Paper</option>
                  <option value="matte">Matte Paper</option>
                  <option value="glossy">Glossy Paper</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Size</label>
                <select value={item.size} onChange={(e) => updateItem(item.id, 'size', e.target.value)} className={inputClass}>
                  <option value="">Select size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="custom">Custom Size</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Finish</label>
                <select value={item.finish} onChange={(e) => updateItem(item.id, 'finish', e.target.value)} className={inputClass}>
                  <option value="">Select finish</option>
                  <option value="matte">Matte</option>
                  <option value="glossy">Glossy</option>
                  <option value="lamination">Lamination</option>
                  <option value="uv">UV Coating</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">Customization Notes</label>
                <textarea value={item.notes} onChange={(e) => updateItem(item.id, 'notes', e.target.value)} rows={2} placeholder="Describe your design requirements..."
                  className={`${inputClass} resize-none`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="flex items-center gap-2 text-sm text-navy hover:text-navy-light mb-8 font-medium transition-colors">
        <Plus className="w-4 h-4" />
        Add Another Item
      </button>

      {/* Design Upload */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 mb-6">
        <h3 className="font-semibold text-navy mb-3 text-sm">Upload Design Files (Optional)</h3>
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center hover:border-navy/30 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500 mb-1">Drag and drop your files here, or click to browse</p>
          <p className="text-xs text-slate-400">PDF, AI, PSD, JPG, PNG (Max 10MB per file)</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 mb-6">
        <h3 className="font-semibold text-navy mb-4 text-sm">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Full Name *</label>
            <input type="text" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Email *</label>
            <input type="email" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Phone *</label>
            <input type="tel" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Company</label>
            <input type="text" className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-500 mb-1">Delivery Address *</label>
            <textarea rows={2} className={`${inputClass} resize-none`} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-500 mb-1">Additional Notes</label>
            <textarea rows={3} placeholder="Any other requirements..." className={`${inputClass} resize-none`} />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Link href="/products">
          <Button variant="ghost">Continue Shopping</Button>
        </Link>
        <Button variant="primary" size="lg">
          Submit Quote Request
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
