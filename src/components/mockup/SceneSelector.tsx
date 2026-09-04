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
    <div className="rounded-3 p-3" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
      <div className="position-relative mb-2">
        <Search className="position-absolute" style={{ left: '0.625rem', top: '50%', transform: 'translateY(-50%)', width: '0.875rem', height: '0.875rem', color: '#64748b', pointerEvents: 'none' }} />
        <input
          type="text" value={searchQuery} onChange={e => onSearchChange(e.target.value)}
          placeholder="Search scenes..."
          className="w-100"
          style={{ backgroundColor: '#334155', border: '1px solid #475569', borderRadius: '0.5rem', paddingLeft: '2rem', paddingRight: '0.75rem', paddingBlock: '0.375rem', fontSize: '0.75rem', color: '#e2e8f0', outline: 'none', transition: 'border-color 0.15s' }}
        />
      </div>

      <div className="d-flex flex-wrap" style={{ gap: '0.375rem', marginBottom: '0.75rem' }}>
        {categories.map(cat => (
          <button key={cat.id} onClick={() => onCategoryChange(cat)}
            className="btn"
            style={{
              padding: '0.25rem 0.625rem',
              borderRadius: '0.5rem',
              fontSize: '10px',
              fontWeight: 500,
              transition: 'all 0.15s',
              backgroundColor: selectedCategory.id === cat.id ? '#2563eb' : '#334155',
              color: selectedCategory.id === cat.id ? 'var(--bs-white)' : '#94a3b8',
              border: 'none',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="d-flex flex-column overflow-y-auto" style={{ gap: '0.5rem', maxHeight: '500px', paddingRight: '0.25rem' }}>
        {scenes.length === 0 && (
          <p className="text-center mb-0" style={{ fontSize: '0.75rem', color: '#64748b', padding: '1rem 0' }}>No scenes found</p>
        )}
        {scenes.map(s => {
          const isSelected = selectedScene?.id === s.id;
          return (
            <button key={s.id} onClick={() => onSceneSelect(s)}
              className="w-100 text-start btn"
              style={{
                padding: '0.625rem',
                borderRadius: '0.5rem',
                transition: 'all 0.15s',
                backgroundColor: isSelected ? 'rgba(59,130,246,0.1)' : 'rgba(51,65,85,0.5)',
                border: `1px solid ${isSelected ? '#3b82f6' : '#334155'}`,
              }}
            >
              <div className="w-100 rounded overflow-hidden mb-1"
                style={{ height: '3.5rem', background: `linear-gradient(135deg, ${s.color.join(', ')})` }}
              >
                {designImage && isSelected && (
                  <img src={designImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
                )}
              </div>
              <p className="mb-0" style={{ fontSize: '0.6875rem', color: '#e2e8f0', fontWeight: 500, lineHeight: 1.3 }}>{s.name}</p>
              <p className="mb-0" style={{ fontSize: '9px', color: '#64748b', marginTop: '0.125rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
