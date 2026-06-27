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

  const inputClass = "w-full px-4 py-3 bg-black-light border border-gold/10 rounded-xl text-white placeholder:text-white-dim focus:outline-none focus:border-gold/30 transition-colors text-sm";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <span className="text-xs uppercase tracking-[0.3em] text-gold mb-4 block">Quote</span>
      <h1 className="text-4xl font-bold text-white mb-3">Request a Quote</h1>
      <p className="text-white-dim mb-10">Fill in your requirements and we&apos;ll get back to you with a premium quote.</p>

      {/* Items */}
      <div className="space-y-6 mb-8">
        {items.map((item, index) => (
          <div key={item.id} className="card-3d rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center text-gold text-sm font-bold">{index + 1}</span>
                Item {index + 1}
              </h3>
              {items.length > 1 && (
                <button onClick={() => removeItem(item.id)} className="text-ruby/60 hover:text-ruby transition-colors p-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Product *</label>
                <select value={item.product} onChange={(e) => updateItem(item.id, 'product', e.target.value)} className={inputClass}>
                  <option value="">Select product</option>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Quantity *</label>
                <input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)} min={1} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Material</label>
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
                <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Size</label>
                <select value={item.size} onChange={(e) => updateItem(item.id, 'size', e.target.value)} className={inputClass}>
                  <option value="">Select size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="custom">Custom Size</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Finish</label>
                <select value={item.finish} onChange={(e) => updateItem(item.id, 'finish', e.target.value)} className={inputClass}>
                  <option value="">Select finish</option>
                  <option value="matte">Matte</option>
                  <option value="glossy">Glossy</option>
                  <option value="lamination">Lamination</option>
                  <option value="uv">UV Coating</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Customization Notes</label>
                <textarea value={item.notes} onChange={(e) => updateItem(item.id, 'notes', e.target.value)} rows={2} placeholder="Describe your design requirements..."
                  className={`${inputClass} resize-none`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="flex items-center gap-2 text-sm text-gold hover:text-gold-light mb-10 font-medium transition-colors">
        <Plus className="w-4 h-4" />
        Add Another Item
      </button>

      {/* Design Upload */}
      <div className="card-3d rounded-2xl p-6 mb-10">
        <h3 className="font-semibold text-white mb-4">Upload Design Files (Optional)</h3>
        <div className="border-2 border-dashed border-gold/10 rounded-xl p-10 text-center hover:border-gold/30 transition-colors cursor-pointer">
          <Upload className="w-10 h-10 text-white-dim mx-auto mb-3" />
          <p className="text-sm text-white-dim mb-1">Drag and drop your files here, or click to browse</p>
          <p className="text-xs text-white-dim/60">PDF, AI, PSD, JPG, PNG (Max 10MB per file)</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="card-3d rounded-2xl p-6 mb-10">
        <h3 className="font-semibold text-white mb-5">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Full Name *</label>
            <input type="text" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Email *</label>
            <input type="email" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Phone *</label>
            <input type="tel" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Company</label>
            <input type="text" className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Delivery Address *</label>
            <textarea rows={2} className={`${inputClass} resize-none`} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-white-dim mb-2">Additional Notes</label>
            <textarea rows={3} placeholder="Any other requirements..." className={`${inputClass} resize-none`} />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Link href="/products">
          <Button variant="ghost">Continue Shopping</Button>
        </Link>
        <Button variant="primary" size="lg">
          Submit Quote Request
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
