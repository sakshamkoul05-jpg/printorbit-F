'use client';

import { useState } from 'react';
import { Upload, Palette, Type, Image, Layers, Undo2, Redo2, Download, ShoppingCart } from 'lucide-react';
import Button from '@/components/ui/Button';
import { PRODUCT_CATEGORIES } from '@/lib/constants';

const templates = [
  { id: 1, name: 'Modern Business Card', category: 'business-cards', premium: false },
  { id: 2, name: 'Elegant Banner', category: 'banners-posters', premium: false },
  { id: 3, name: 'Corporate Letterhead', category: 'stationery', premium: true },
  { id: 4, name: 'Product Label', category: 'labels-stickers', premium: false },
];

export default function DesignStudioPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [activeTool, setActiveTool] = useState('select');

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col bg-slate-100">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-navy text-sm">Design Studio</h1>
          <select className="text-sm border border-slate-200 rounded px-3 py-1.5 text-slate-700 focus:outline-none focus:border-navy/30">
            <option>Select Product</option>
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm"><Undo2 className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm"><Redo2 className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm"><Download className="w-4 h-4" /> Export</Button>
          <Button variant="primary" size="sm"><ShoppingCart className="w-4 h-4 mr-1" /> Add to Quote</Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tools */}
        <div className="w-12 bg-white border-r border-slate-200 flex flex-col items-center py-3 gap-2">
          {[
            { id: 'select', icon: Layers, label: 'Select' },
            { id: 'text', icon: Type, label: 'Text' },
            { id: 'image', icon: Image, label: 'Image' },
            { id: 'upload', icon: Upload, label: 'Upload' },
            { id: 'templates', icon: Palette, label: 'Templates' },
          ].map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`w-9 h-9 rounded flex items-center justify-center transition-colors ${
                activeTool === tool.id
                  ? 'bg-navy text-white'
                  : 'text-slate-400 hover:bg-slate-100 hover:text-navy'
              }`}
              title={tool.label}
            >
              <tool.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-slate-200 flex items-center justify-center p-6">
          <div className="bg-white shadow-lg rounded-lg border border-slate-200" style={{ width: 600, height: 400 }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Palette className="w-10 h-10 mx-auto mb-2 text-slate-200" />
                <p className="text-sm text-slate-400">Select a template or upload your design</p>
                <p className="text-xs text-slate-300 mt-1">Drag elements onto the canvas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-60 bg-white border-l border-slate-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold text-navy mb-3 text-sm">
              {activeTool === 'templates' ? 'Templates' : 'Properties'}
            </h3>

            {activeTool === 'templates' ? (
              <div className="space-y-2">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      selectedTemplate === tpl.id
                        ? 'border-navy/30 bg-navy/5'
                        : 'border-slate-200 hover:border-navy/20'
                    }`}
                  >
                    <div className="aspect-video bg-slate-50 rounded mb-2 flex items-center justify-center">
                      <Palette className="w-5 h-5 text-slate-200" />
                    </div>
                    <p className="text-xs font-medium text-navy">{tpl.name}</p>
                    {tpl.premium && (
                      <span className="text-[10px] bg-navy text-white px-1.5 py-0.5 rounded font-medium mt-1 inline-block">Premium</span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-500">Position</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input type="number" placeholder="X" className="px-2 py-1.5 text-sm border border-slate-200 rounded text-slate-700 focus:outline-none focus:border-navy/30" />
                    <input type="number" placeholder="Y" className="px-2 py-1.5 text-sm border border-slate-200 rounded text-slate-700 focus:outline-none focus:border-navy/30" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">Size</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input type="number" placeholder="W" className="px-2 py-1.5 text-sm border border-slate-200 rounded text-slate-700 focus:outline-none focus:border-navy/30" />
                    <input type="number" placeholder="H" className="px-2 py-1.5 text-sm border border-slate-200 rounded text-slate-700 focus:outline-none focus:border-navy/30" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500">Color</label>
                  <input type="color" className="w-full h-8 mt-1 rounded border border-slate-200 cursor-pointer" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
