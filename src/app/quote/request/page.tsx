'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Upload, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { ALL_CATEGORIES } from '@/lib/catalog';

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

  return (
    <div className="mx-auto px-4 py-10" style={{ maxWidth: '56rem' }}>
      <h1 className="fs-3 fw-bold text-navy mb-1">Request a Quote</h1>
      <p className="text-sm text-slate-500 mb-8">Fill in your requirements and we&apos;ll get back to you with a quote.</p>

      {/* Items */}
      <div className="d-flex flex-column gap-4 mb-6">
        {items.map((item, index) => (
          <div key={item.id} className="bg-white rounded-3 border border-slate-200 p-5">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h3 className="fw-semibold text-navy d-flex align-items-center gap-2 text-sm">
                <span className="w-7 h-7 rounded bg-slate-100 d-flex align-items-center justify-content-center text-navy fw-bold" style={{ fontSize: '0.75rem' }}>{index + 1}</span>
                Item {index + 1}
              </h3>
              {items.length > 1 && (
                <button onClick={() => removeItem(item.id)} className="text-slate-400 border-0 bg-transparent p-1">
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label text-xs fw-medium text-slate-500">Product *</label>
                <select value={item.product} onChange={(e) => updateItem(item.id, 'product', e.target.value)} className="form-select text-sm">
                  <option value="">Select product</option>
                  {ALL_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label text-xs fw-medium text-slate-500">Quantity *</label>
                <input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)} min={1} className="form-control text-sm" />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label text-xs fw-medium text-slate-500">Material</label>
                <select value={item.material} onChange={(e) => updateItem(item.id, 'material', e.target.value)} className="form-select text-sm">
                  <option value="">Select material</option>
                  <option value="standard">Standard Paper</option>
                  <option value="premium">Premium Paper</option>
                  <option value="art">Art Paper</option>
                  <option value="matte">Matte Paper</option>
                  <option value="glossy">Glossy Paper</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label text-xs fw-medium text-slate-500">Size</label>
                <select value={item.size} onChange={(e) => updateItem(item.id, 'size', e.target.value)} className="form-select text-sm">
                  <option value="">Select size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="custom">Custom Size</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label text-xs fw-medium text-slate-500">Finish</label>
                <select value={item.finish} onChange={(e) => updateItem(item.id, 'finish', e.target.value)} className="form-select text-sm">
                  <option value="">Select finish</option>
                  <option value="matte">Matte</option>
                  <option value="glossy">Glossy</option>
                  <option value="lamination">Lamination</option>
                  <option value="uv">UV Coating</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label text-xs fw-medium text-slate-500">Customization Notes</label>
                <textarea value={item.notes} onChange={(e) => updateItem(item.id, 'notes', e.target.value)} rows={2} placeholder="Describe your design requirements..."
                  className="form-control text-sm resize-none" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={addItem} className="d-flex align-items-center gap-2 text-sm text-navy mb-8 fw-medium border-0 bg-transparent p-0">
        <Plus size={16} />
        Add Another Item
      </button>

      {/* Design Upload */}
      <div className="bg-white rounded-3 border border-slate-200 p-5 mb-6">
        <h3 className="fw-semibold text-navy mb-3 text-sm">Upload Design Files (Optional)</h3>
        <div className="border-2 border-dashed border-slate-200 rounded-3 p-8 text-center cursor-pointer">
          <Upload size={32} className="text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500 mb-1">Drag and drop your files here, or click to browse</p>
          <p className="text-xs text-slate-400">PDF, AI, PSD, JPG, PNG (Max 10MB per file)</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white rounded-3 border border-slate-200 p-5 mb-6">
        <h3 className="fw-semibold text-navy mb-4 text-sm">Contact Details</h3>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label text-xs fw-medium text-slate-500">Full Name *</label>
            <input type="text" className="form-control text-sm" />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label text-xs fw-medium text-slate-500">Email *</label>
            <input type="email" className="form-control text-sm" />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label text-xs fw-medium text-slate-500">Phone *</label>
            <input type="tel" className="form-control text-sm" />
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label text-xs fw-medium text-slate-500">Company</label>
            <input type="text" className="form-control text-sm" />
          </div>
          <div className="col-12">
            <label className="form-label text-xs fw-medium text-slate-500">Delivery Address *</label>
            <textarea rows={2} className="form-control text-sm resize-none" />
          </div>
          <div className="col-12">
            <label className="form-label text-xs fw-medium text-slate-500">Additional Notes</label>
            <textarea rows={3} placeholder="Any other requirements..." className="form-control text-sm resize-none" />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="d-flex flex-column flex-sm-row gap-3 justify-content-end">
        <Link href="/products">
          <Button variant="ghost">Continue Shopping</Button>
        </Link>
        <Button variant="primary" size="lg">
          Submit Quote Request
          <ArrowRight size={16} className="ms-2" />
        </Button>
      </div>
    </div>
  );
}
