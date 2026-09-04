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
      <div className="rounded-3 p-3" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
        <p className="text-center mb-0" style={{ fontSize: '0.75rem', color: '#94a3b8', padding: '2rem 0' }}>Scanning for mockups...</p>
      </div>
    );
  }

  if (mockups.length === 0) {
    return (
      <div className="rounded-3 p-3" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
        <p className="mb-3" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mockups</p>
        <div className="text-center py-3">
          <Package size={32} className="mx-auto mb-2" style={{ color: '#475569' }} />
          <p className="mb-0" style={{ fontSize: '0.6875rem', color: '#64748b' }}>No mockups found</p>
          <p className="mb-0 mt-1" style={{ fontSize: '10px', color: '#475569' }}>Add assets to <code style={{ color: '#60a5fa' }}>public/mockups/{'{product}'}/</code></p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3 p-3" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
      <p className="mb-3" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mockups</p>

      <div className="d-flex flex-wrap mb-2" style={{ gap: '0.25rem' }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className="btn"
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
              fontSize: '10px',
              fontWeight: 500,
              transition: 'all 0.15s',
              backgroundColor: category === c ? '#2563eb' : '#334155',
              color: category === c ? 'var(--bs-white)' : '#94a3b8',
              border: 'none',
            }}>
            {c === 'all' ? 'All' : c}
          </button>
        ))}
      </div>

      <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
        {filtered.map(m => {
          const Icon = CATEGORY_ICONS[m.category] || MoreHorizontal;
          return (
            <button key={m.id} onClick={() => onSelect(m.id)}
              className="text-start btn"
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                transition: 'all 0.15s',
                backgroundColor: selectedId === m.id ? 'rgba(37,99,235,0.1)' : 'rgba(51,65,85,0.5)',
                border: `1px solid ${selectedId === m.id ? '#3b82f6' : '#475569'}`,
                outline: selectedId === m.id ? '1px solid #3b82f6' : 'none',
              }}>
              <div className="d-flex align-items-center gap-2 mb-1">
                <div style={{
                  padding: '0.375rem',
                  borderRadius: '0.5rem',
                  backgroundColor: selectedId === m.id ? 'rgba(59,130,246,0.2)' : '#475569',
                }}>
                  <Icon size={14} style={{ color: selectedId === m.id ? '#60a5fa' : '#94a3b8' }} />
                </div>
                <span className="text-truncate" style={{ fontSize: '0.75rem', fontWeight: 500, color: selectedId === m.id ? '#93c5fd' : '#e2e8f0' }}>
                  {m.name}
                </span>
              </div>
              <p className="text-truncate mb-0" style={{ fontSize: '9px', color: '#64748b' }}>{m.description || m.id}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
