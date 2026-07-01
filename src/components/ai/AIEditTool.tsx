'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Pencil, Loader2, Check, X } from 'lucide-react';
import { aiAPI } from '@/lib/ai';
import type { CanvasElement } from '@/app/design-studio/page';

interface AIEditToolProps {
  elements: CanvasElement[];
  backgroundColor: string;
  onElementsUpdate: (elements: CanvasElement[]) => void;
  onBackgroundChange: (color: string) => void;
}

const EDIT_EXAMPLES = [
  'Make the heading larger and bold',
  'Change all text to blue',
  'Add a colored bar at the top',
  'Make it more minimalist',
  'Add a border around the design',
  'Change the background to dark mode',
];

export default function AIEditTool({
  elements,
  backgroundColor,
  onElementsUpdate,
  onBackgroundChange,
}: AIEditToolProps) {
  const [command, setCommand] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [changes, setChanges] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleEdit = async () => {
    if (!command.trim() || elements.length === 0) return;

    setLoading(true);
    setError('');
    setChanges([]);
    setShowResult(false);

    try {
      const result = await aiAPI.editDesign(command, elements, backgroundColor);
      onElementsUpdate(result.design.elements);
      if (result.design.backgroundColor !== backgroundColor) {
        onBackgroundChange(result.design.backgroundColor);
      }
      setChanges(result.changes || []);
      setShowResult(true);
      setCommand('');
    } catch (err: any) {
      setError(err.message || 'Edit failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-4">
      {elements.length === 0 ? (
        <div className="text-center py-10">
          <Pencil className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">No design to edit</p>
          <p className="text-xs text-slate-400 mt-1">
            Generate a design first, then edit it here.
          </p>
        </div>
      ) : (
        <>
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
              Edit command
            </label>
            <textarea
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="e.g., Make the heading larger and change to blue..."
              rows={2}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none transition-all"
            />
          </div>

          <button
            onClick={handleEdit}
            disabled={loading || !command.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-50 shadow-sm"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Pencil className="w-4 h-4" />
            )}
            {loading ? 'Applying...' : 'Apply Edit'}
          </button>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-red bg-red/5 px-3 py-2 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          {showResult && changes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-success/5 border border-success/20 rounded-xl p-3"
            >
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-3.5 h-3.5 text-success" />
                <span className="text-xs font-semibold text-success">Changes applied</span>
              </div>
              <ul className="space-y-1">
                {changes.map((c, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                    <span className="text-success mt-0.5">-</span>
                    {c}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowResult(false)}
                className="mt-2 flex items-center gap-1 text-[10px] text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" /> Dismiss
              </button>
            </motion.div>
          )}

          {/* Edit examples */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
              Try these edits
            </label>
            <div className="space-y-1.5">
              {EDIT_EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCommand(ex);
                  }}
                  className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-accent/5 text-xs text-slate-600 rounded-lg border border-slate-200 hover:border-accent/30 transition-all"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
