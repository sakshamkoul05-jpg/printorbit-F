'use client';

import { useState, useEffect } from 'react';
import { Shirt, Package, Image, Smartphone, BookOpen, Tag, MoreHorizontal } from 'lucide-react';
import { discoverMockups, type MockupListing } from '@/lib/mockup-v2/discovery';

interface MockupSelectorProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const CATEGORY_ICONS: Record<string, any> = {
  Apparel: Shirt,
  Stationery: BookOpen,
  Packaging: Package,
  Marketing: Tag,
  Posters: Image,
  'Business Cards': Tag,
  Promotional: Tag,
  Office: BookOpen,
  Restaurant: Tag,
};

export default function MockupSelector({ selectedId, onSelect }: MockupSelectorProps) {
  const [mockups, setMockups] = useState<MockupListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>('all');

  useEffect(() => {
    setLoading(true);
    discoverMockups().then(list => {
      setMockups(list);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const categories = ['all', ...new Set(mockups.map(m => m.category || 'Uncategorized'))];
  const filtered = category === 'all' ? mockups : mockups.filter(m => (m.category || 'Uncategorized') === category);

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <p className="text-xs text-slate-400 text-center py-8">Scanning for mockups...</p>
      </div>
    );
  }

  if (mockups.length === 0) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <p className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">Mockups</p>
        <div className="text-center py-6">
          <Package className="w-8 h-8 mx-auto mb-2 text-slate-600" />
          <p className="text-[11px] text-slate-500">No mockups found</p>
          <p className="text-[10px] text-slate-600 mt-1">Add assets to <code className="text-blue-400">public/mockups/{'{product}'}/</code></p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
      <p className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider">Mockups</p>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1 mb-3">
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-2 py-1 rounded-md text-[10px] font-medium transition-colors ${category === c ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-slate-200'}`}>
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2">
        {filtered.map(m => {
          const Icon = CATEGORY_ICONS[m.category] || MoreHorizontal;
          return (
            <button key={m.id} onClick={() => onSelect(m.id)}
              className={`p-3 rounded-xl border text-left transition-all ${selectedId === m.id
                ? 'bg-blue-600/10 border-blue-500 ring-1 ring-blue-500'
                : 'bg-slate-700/50 border-slate-600 hover:border-slate-500 hover:bg-slate-700'}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`p-1.5 rounded-lg ${selectedId === m.id ? 'bg-blue-500/20' : 'bg-slate-600'}`}>
                  <Icon className={`w-3.5 h-3.5 ${selectedId === m.id ? 'text-blue-400' : 'text-slate-400'}`} />
                </div>
                <span className={`text-xs font-medium truncate ${selectedId === m.id ? 'text-blue-300' : 'text-slate-200'}`}>
                  {m.name}
                </span>
              </div>
              <p className="text-[9px] text-slate-500 truncate">{m.description || m.id}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
