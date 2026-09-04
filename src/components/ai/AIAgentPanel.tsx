'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Wand2, Pencil, Lightbulb, Palette, Loader2 } from 'lucide-react';
import AIDesignGenerator from './AIDesignGenerator';
import AIEditTool from './AIEditTool';
import AISuggestions from './AISuggestions';
import type { CanvasElement } from '@/app/design-studio/page';

type AITab = 'generate' | 'edit' | 'suggestions';

interface AIAgentPanelProps {
  isOpen: boolean;
  onClose: () => void;
  canvasWidth: number;
  canvasHeight: number;
  elements: CanvasElement[];
  backgroundColor: string;
  onDesignGenerated: (design: { backgroundColor: string; elements: CanvasElement[] }) => void;
  onElementsUpdate: (elements: CanvasElement[]) => void;
  onBackgroundChange: (color: string) => void;
}

const TABS: { id: AITab; label: string; icon: typeof Wand2 }[] = [
  { id: 'generate', label: 'Generate', icon: Wand2 },
  { id: 'edit', label: 'Edit', icon: Pencil },
  { id: 'suggestions', label: 'Suggest', icon: Lightbulb },
];

export default function AIAgentPanel({
  isOpen,
  onClose,
  canvasWidth,
  canvasHeight,
  elements,
  backgroundColor,
  onDesignGenerated,
  onElementsUpdate,
  onBackgroundChange,
}: AIAgentPanelProps) {
  const [activeTab, setActiveTab] = useState<AITab>('generate');
  const [paletteLoading, setPaletteLoading] = useState(false);

  const handlePaletteGenerated = (colors: string[]) => {
    if (colors.length > 0) {
      onBackgroundChange(colors[0]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="d-flex flex-column overflow-hidden"
          style={{ width: '20rem', backgroundColor: 'var(--bs-white)', borderLeft: '1px solid var(--bs-slate-200, #e2e8f0)', flexShrink: 0 }}
        >
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between px-3" style={{ height: '3rem', background: 'linear-gradient(to right, var(--bs-primary), var(--bs-primary))', flexShrink: 0 }}>
            <div className="d-flex align-items-center gap-2">
              <Sparkles size={16} style={{ color: 'var(--bs-white)' }} />
              <span className="small fw-semibold" style={{ color: 'var(--bs-white)' }}>AI Agent</span>
            </div>
            <button
              onClick={onClose}
              className="btn p-1 rounded-3"
              style={{ color: 'rgba(255,255,255,0.7)', transition: 'color 0.15s' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Tabs */}
          <div className="d-flex" style={{ borderBottom: '1px solid var(--bs-slate-200, #e2e8f0)', flexShrink: 0 }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-fill d-flex align-items-center justify-content-center gap-1`}
                style={{
                  padding: '0.625rem 0',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  transition: 'color 0.15s',
                  color: activeTab === tab.id ? 'var(--bs-primary, #0d6efd)' : '#94a3b8',
                  borderBottom: activeTab === tab.id ? '2px solid var(--bs-primary, #0d6efd)' : '2px solid transparent',
                  backgroundColor: activeTab === tab.id ? 'rgba(13,110,253,0.05)' : 'transparent',
                  border: 'none',
                  borderBottomWidth: '2px',
                  borderBottomStyle: 'solid',
                  borderBottomColor: activeTab === tab.id ? 'var(--bs-primary, #0d6efd)' : 'transparent',
                }}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-fill overflow-y-auto">
            {activeTab === 'generate' && (
              <AIDesignGenerator
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
                onDesignGenerated={onDesignGenerated}
              />
            )}
            {activeTab === 'edit' && (
              <AIEditTool
                elements={elements}
                backgroundColor={backgroundColor}
                onElementsUpdate={onElementsUpdate}
                onBackgroundChange={onBackgroundChange}
              />
            )}
            {activeTab === 'suggestions' && (
              <AISuggestions
                elements={elements}
                backgroundColor={backgroundColor}
                onApplySuggestion={onDesignGenerated}
              />
            )}
          </div>

          {/* Quick Actions Footer */}
          <div className="p-3" style={{ borderTop: '1px solid var(--bs-slate-200, #e2e8f0)', flexShrink: 0 }}>
            <button
              onClick={async () => {
                setPaletteLoading(true);
                try {
                  const { aiAPI } = await import('@/lib/ai');
                  const result = await aiAPI.generateColorPalette('Generate a professional color palette for print design');
                  if (result.colors) {
                    handlePaletteGenerated(result.colors);
                  }
                } catch {
                  // silent fail
                }
                setPaletteLoading(false);
              }}
              disabled={paletteLoading}
              className="w-100 d-flex align-items-center justify-content-center gap-2 btn"
              style={{
                padding: '0.5rem',
                backgroundColor: '#f1f5f9',
                color: '#475569',
                fontSize: '0.75rem',
                fontWeight: 500,
                borderRadius: '0.5rem',
                transition: 'background-color 0.15s',
                opacity: paletteLoading ? 0.5 : 1,
                border: 'none',
              }}
            >
              {paletteLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Palette size={14} />
              )}
              Generate Color Palette
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
