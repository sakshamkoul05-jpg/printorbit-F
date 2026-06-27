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
    <div className="h-[calc(100vh-200px)] flex flex-col bg-black">
      {/* Top Bar */}
      <div className="bg-black-light border-b border-gold/10 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-bold text-white">Design Studio</h1>
          <select className="text-sm bg-black border border-gold/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-gold/30">
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
        <div className="w-12 bg-black-light border-r border-gold/10 flex flex-col items-center py-4 gap-3">
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
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                activeTool === tool.id
                  ? 'bg-gradient-to-br from-gold to-gold-dark text-black'
                  : 'text-white-dim hover:bg-gold/10 hover:text-gold'
              }`}
              title={tool.label}
            >
              <tool.icon className="w-5 h-5" />
            </button>
          ))}
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-black flex items-center justify-center p-8">
          <div className="bg-black-card shadow-2xl rounded-2xl border border-gold/10" style={{ width: 600, height: 400 }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Palette className="w-12 h-12 mx-auto mb-3 text-gold/20" />
                <p className="text-sm text-white-dim">Select a template or upload your design</p>
                <p className="text-xs text-white-dim/50 mt-1">Drag elements onto the canvas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 bg-black-light border-l border-gold/10 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              {activeTool === 'templates' ? 'Templates' : 'Properties'}
            </h3>

            {activeTool === 'templates' ? (
              <div className="space-y-3">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-all duration-300 ${
                      selectedTemplate === tpl.id
                        ? 'border-gold/40 bg-gold/5 glow-gold'
                        : 'border-gold/5 hover:border-gold/20 bg-black'
                    }`}
                  >
                    <div className="aspect-video bg-gradient-to-br from-gold/5 to-transparent rounded-lg mb-2 flex items-center justify-center">
                      <Palette className="w-6 h-6 text-gold/20" />
                    </div>
                    <p className="text-xs font-medium text-white">{tpl.name}</p>
                    {tpl.premium && (
                      <span className="text-[10px] bg-gradient-to-r from-gold to-gold-dark text-black px-2 py-0.5 rounded-full font-bold mt-1 inline-block">Premium</span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-white-dim">Position</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input type="number" placeholder="X" className="px-3 py-2 text-sm bg-black border border-gold/10 rounded-lg text-white focus:outline-none focus:border-gold/30" />
                    <input type="number" placeholder="Y" className="px-3 py-2 text-sm bg-black border border-gold/10 rounded-lg text-white focus:outline-none focus:border-gold/30" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-white-dim">Size</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <input type="number" placeholder="W" className="px-3 py-2 text-sm bg-black border border-gold/10 rounded-lg text-white focus:outline-none focus:border-gold/30" />
                    <input type="number" placeholder="H" className="px-3 py-2 text-sm bg-black border border-gold/10 rounded-lg text-white focus:outline-none focus:border-gold/30" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-white-dim">Color</label>
                  <input type="color" className="w-full h-10 mt-2 rounded-lg border border-gold/10 cursor-pointer bg-black" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
