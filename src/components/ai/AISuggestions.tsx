'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Loader2, RefreshCw, Palette, Type, Layout, Contrast, Maximize, Check } from 'lucide-react';
import { aiAPI } from '@/lib/ai';
import type { CanvasElement } from '@/app/design-studio/page';
import type { AISuggestionItem } from '@/lib/ai';

interface AISuggestionsProps {
  elements: CanvasElement[];
  backgroundColor: string;
  onApplySuggestion: (design: { backgroundColor: string; elements: CanvasElement[] }) => void;
}

const TYPE_ICONS = {
  color: Palette,
  typography: Type,
  layout: Layout,
  contrast: Contrast,
  spacing: Maximize,
};

export default function AISuggestions({
  elements,
  backgroundColor,
  onApplySuggestion,
}: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<AISuggestionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [appliedIndex, setAppliedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (elements.length > 0) {
      fetchSuggestions();
    }
  }, [elements.length]);

  const fetchSuggestions = async () => {
    if (elements.length === 0) return;
    setLoading(true);
    setError('');
    try {
      const result = await aiAPI.suggestImprovements(elements, backgroundColor);
      setSuggestions(result.suggestions || []);
    } catch (err: any) {
      setError(err.message || 'Failed to get suggestions');
    }
    setLoading(false);
  };

  const handleApply = async (index: number) => {
    setAppliedIndex(index);
    try {
      const command = suggestions[index].description;
      const result = await aiAPI.editDesign(command, elements, backgroundColor);
      onApplySuggestion(result.design);
    } catch {
      // silent fail
    }
    setTimeout(() => setAppliedIndex(null), 2000);
  };

  if (elements.length === 0) {
    return (
      <div className="text-center py-5">
        <Lightbulb size={40} className="mx-auto mb-3" style={{ color: '#cbd5e1' }} />
        <p className="mb-0" style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>No design to analyze</p>
        <p className="mt-1 mb-0" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
          Generate a design first to see AI suggestions.
        </p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <div className="d-flex align-items-center justify-content-between">
        <label className="m-0" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          AI Analysis
        </label>
        <button
          onClick={fetchSuggestions}
          disabled={loading}
          className="d-flex align-items-center gap-1 btn p-0"
          style={{ fontSize: '10px', color: 'var(--bs-primary, #0d6efd)' }}
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {loading && (
        <div className="d-flex align-items-center justify-content-center py-4">
          <Loader2 size={20} className="animate-spin" style={{ color: 'var(--bs-primary, #0d6efd)' }} />
        </div>
      )}

      {error && (
        <p className="mb-0" style={{ fontSize: '0.75rem', color: 'var(--bs-red, #dc3545)', backgroundColor: 'rgba(220,53,69,0.05)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>{error}</p>
      )}

      {!loading && suggestions.length === 0 && !error && (
        <p className="text-center py-3 mb-0" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
          No suggestions available. Try refining your design.
        </p>
      )}

      <div className="d-flex flex-column" style={{ gap: '0.625rem' }}>
        {suggestions.map((s, i) => {
          const Icon = TYPE_ICONS[s.type] || Lightbulb;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white"
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '0.75rem',
                padding: '0.75rem',
                borderLeftWidth: '4px',
                borderLeftColor: s.priority === 'high' ? 'var(--bs-red, #dc3545)' : s.priority === 'medium' ? '#ffc107' : '#cbd5e1',
              }}
            >
              <div className="d-flex align-items-start gap-2">
                <div
                  style={{
                    padding: '0.375rem',
                    borderRadius: '0.5rem',
                    backgroundColor: s.type === 'color' ? 'rgba(124,58,237,0.1)' : s.type === 'typography' ? 'rgba(59,130,246,0.1)' : s.type === 'layout' ? 'rgba(34,197,94,0.1)' : s.type === 'contrast' ? 'rgba(249,115,22,0.1)' : 'rgba(100,116,139,0.1)',
                    color: s.type === 'color' ? '#7c3aed' : s.type === 'typography' ? '#3b82f6' : s.type === 'layout' ? '#22c55e' : s.type === 'contrast' ? '#f97316' : '#64748b',
                  }}
                >
                  <Icon size={14} />
                </div>
                <div className="flex-fill" style={{ minWidth: 0 }}>
                  <p className="mb-0" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#1e293b' }}>{s.title}</p>
                  <p className="mb-0 mt-1" style={{ fontSize: '0.6875rem', color: '#64748b' }}>{s.description}</p>
                </div>
                <button
                  onClick={() => handleApply(i)}
                  disabled={appliedIndex === i}
                  className="btn p-1"
                  style={{
                    flexShrink: 0,
                    backgroundColor: 'rgba(13,110,253,0.1)',
                    color: 'var(--bs-primary, #0d6efd)',
                    borderRadius: '0.5rem',
                    opacity: appliedIndex === i ? 0.5 : 1,
                    transition: 'background-color 0.15s',
                  }}
                >
                  <Check size={14} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
