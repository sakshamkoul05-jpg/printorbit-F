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
      <div className="text-center py-10">
        <Lightbulb className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-sm text-slate-500 font-medium">No design to analyze</p>
        <p className="text-xs text-slate-400 mt-1">
          Generate a design first to see AI suggestions.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          AI Analysis
        </label>
        <button
          onClick={fetchSuggestions}
          disabled={loading}
          className="flex items-center gap-1 text-[10px] text-primary hover:text-primary-dark transition-colors"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
        </div>
      )}

      {error && (
        <p className="text-xs text-red bg-red/5 px-3 py-2 rounded-lg">{error}</p>
      )}

      {!loading && suggestions.length === 0 && !error && (
        <p className="text-xs text-slate-400 text-center py-4">
          No suggestions available. Try refining your design.
        </p>
      )}

      <div className="space-y-2.5">
        {suggestions.map((s, i) => {
          const Icon = TYPE_ICONS[s.type] || Lightbulb;
          const priorityColors = {
            high: 'border-l-red',
            medium: 'border-l-amber',
            low: 'border-l-slate',
          };

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-white border border-slate-200 rounded-xl p-3 border-l-4 ${
                s.priority === 'high' ? 'border-l-red' : s.priority === 'medium' ? 'border-l-amber' : 'border-l-slate-300'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className={`p-1.5 rounded-lg ${
                  s.type === 'color' ? 'bg-purple/10 text-purple' :
                  s.type === 'typography' ? 'bg-blue/10 text-blue' :
                  s.type === 'layout' ? 'bg-green/10 text-green' :
                  s.type === 'contrast' ? 'bg-orange/10 text-orange' :
                  'bg-slate/10 text-slate'
                }`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-dark">{s.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{s.description}</p>
                </div>
                <button
                  onClick={() => handleApply(i)}
                  disabled={appliedIndex === i}
                  className="shrink-0 p-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors disabled:opacity-50"
                >
                  {appliedIndex === i ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
