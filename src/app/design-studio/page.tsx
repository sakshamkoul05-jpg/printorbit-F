'use client';

import { useState } from 'react';
import Link from 'next/link';
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
    <div className="h-[calc(100vh-200px)] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-printorbit-navy">Design Studio</h1>
          <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-printorbit-red/20">
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
        <div className="w-12 bg-printorbit-navy flex flex-col items-center py-4 gap-3">
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
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                activeTool === tool.id
                  ? 'bg-printorbit-red text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title={tool.label}
            >
              <tool.icon className="w-5 h-5" />
            </button>
          ))}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center p-8">
          <div className="bg-white shadow-lg rounded-lg" style={{ width: 600, height: 400 }}>
            <div className="w-full h-full flex items-center justify-center text-printorbit-gray">
              <div className="text-center">
                <Palette className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select a template or upload your design</p>
                <p className="text-xs text-printorbit-gray mt-1">Drag elements onto the canvas to start designing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties/Templates */}
        <div className="w-64 bg-white border-l overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold text-printorbit-navy mb-3">
              {activeTool === 'templates' ? 'Templates' : 'Properties'}
            </h3>

            {activeTool === 'templates' ? (
              <div className="space-y-3">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedTemplate === tpl.id
                        ? 'border-printorbit-red bg-printorbit-red/5'
                        : 'border-gray-100 hover:border-printorbit-red/30'
                    }`}
                  >
                    <div className="aspect-video bg-printorbit-light rounded mb-2 flex items-center justify-center">
                      <Palette className="w-6 h-6 text-printorbit-gray/30" />
                    </div>
                    <p className="text-xs font-medium text-printorbit-navy">{tpl.name}</p>
                    {tpl.premium && (
                      <span className="text-[10px] bg-printorbit-red text-white px-1.5 py-0.5 rounded-full">Premium</span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-printorbit-gray">Position</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input type="number" placeholder="X" className="px-2 py-1 text-sm border border-gray-200 rounded" />
                    <input type="number" placeholder="Y" className="px-2 py-1 text-sm border border-gray-200 rounded" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-printorbit-gray">Size</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input type="number" placeholder="W" className="px-2 py-1 text-sm border border-gray-200 rounded" />
                    <input type="number" placeholder="H" className="px-2 py-1 text-sm border border-gray-200 rounded" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-printorbit-gray">Color</label>
                  <input type="color" className="w-full h-8 mt-1 rounded border border-gray-200 cursor-pointer" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
