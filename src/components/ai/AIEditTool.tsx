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
    <div className="d-flex flex-column gap-3 p-3">
      {elements.length === 0 ? (
        <div className="text-center py-5">
          <Pencil size={40} className="mx-auto mb-3" style={{ color: '#cbd5e1' }} />
          <p className="mb-0" style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>No design to edit</p>
          <p className="mt-1 mb-0" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Generate a design first, then edit it here.
          </p>
        </div>
      ) : (
        <>
          <div>
            <label className="d-block mb-2" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Edit command
            </label>
            <textarea
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="e.g., Make the heading larger and change to blue..."
              rows={2}
              className="w-100"
              style={{
                padding: '0.625rem 0.75rem',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                outline: 'none',
                resize: 'none',
                transition: 'all 0.15s',
              }}
            />
          </div>

          <button
            onClick={handleEdit}
            disabled={loading || !command.trim()}
            className="w-100 d-flex align-items-center justify-content-center gap-2 btn"
            style={{
              padding: '0.625rem',
              backgroundColor: 'var(--bs-primary, #0d6efd)',
              color: 'var(--bs-white)',
              fontSize: '0.875rem',
              fontWeight: 600,
              borderRadius: '0.75rem',
              transition: 'background-color 0.15s',
              opacity: loading || !command.trim() ? 0.5 : 1,
              border: 'none',
            }}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Pencil size={16} />
            )}
            {loading ? 'Applying...' : 'Apply Edit'}
          </button>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-0"
              style={{ fontSize: '0.75rem', color: 'var(--bs-red, #dc3545)', backgroundColor: 'rgba(220,53,69,0.05)', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}
            >
              {error}
            </motion.p>
          )}

          {showResult && changes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ backgroundColor: 'rgba(25,135,84,0.05)', border: '1px solid rgba(25,135,84,0.2)', borderRadius: '0.75rem', padding: '0.75rem' }}
            >
              <div className="d-flex align-items-center gap-2 mb-2">
                <Check size={14} style={{ color: 'var(--bs-success, #198754)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--bs-success, #198754)' }}>Changes applied</span>
              </div>
              <ul className="list-unstyled mb-0" style={{ gap: '0.25rem' }}>
                {changes.map((c, i) => (
                  <li key={i} className="d-flex align-items-start gap-1" style={{ fontSize: '0.75rem', color: '#475569' }}>
                    <span style={{ color: 'var(--bs-success, #198754)', marginTop: '0.125rem' }}>-</span>
                    {c}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowResult(false)}
                className="d-flex align-items-center gap-1 btn p-0 mt-2"
                style={{ fontSize: '10px', color: '#94a3b8' }}
              >
                <X size={12} /> Dismiss
              </button>
            </motion.div>
          )}

          <div>
            <label className="d-block mb-2" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Try these edits
            </label>
            <div className="d-flex flex-column" style={{ gap: '0.375rem' }}>
              {EDIT_EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCommand(ex);
                  }}
                  className="w-100 text-start btn"
                  style={{
                    padding: '0.5rem 0.75rem',
                    backgroundColor: '#f8fafc',
                    fontSize: '0.75rem',
                    color: '#475569',
                    borderRadius: '0.5rem',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.15s',
                  }}
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
