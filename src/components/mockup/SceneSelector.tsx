'use client';

import { Search } from 'lucide-react';
import type { SceneDef, MockupCategory } from '@/types/mockup';
import type { CategoryDef } from '@/lib/mockup/categories';

interface SceneSelectorProps {
  categories: CategoryDef[];
  selectedCategory: CategoryDef;
  scenes: SceneDef[];
  selectedScene: SceneDef | null;
  designImage?: string | null;
  onCategoryChange: (cat: CategoryDef) => void;
  onSceneSelect: (scene: SceneDef) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function SceneSelector({
  categories, selectedCategory, scenes, selectedScene, designImage,
  onCategoryChange, onSceneSelect, searchQuery, onSearchChange,
}: SceneSelectorProps) {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
        <input
          type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)}
          placeholder="Search scenes..."
          className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {categories.map(cat => (
          <button key={cat.id} onClick={() => onCategoryChange(cat)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-colors ${
              selectedCategory.id === cat.id
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Scenes */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
        {scenes.length === 0 && (
          <p className="text-xs text-slate-500 text-center py-4">No scenes found</p>
        )}
        {scenes.map(s => {
          const isSelected = selectedScene?.id === s.id;
          return (
            <button key={s.id} onClick={() => onSceneSelect(s)}
              className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-700 hover:border-slate-500 bg-slate-700/50'
              }`}
            >
              <div className="w-full h-14 rounded-md overflow-hidden mb-1.5"
                style={{ background: `linear-gradient(135deg, ${s.color.join(', ')})` }}
              >
                {designImage && isSelected && (
                  <img src={designImage} alt="" className="w-full h-full object-cover opacity-40" />
                )}
              </div>
              <p className="text-[11px] text-slate-200 font-medium leading-tight">{s.name}</p>
              <p className="text-[9px] text-slate-500 mt-0.5 line-clamp-1">{s.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
