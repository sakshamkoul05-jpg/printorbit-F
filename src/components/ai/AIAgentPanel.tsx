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
          className="w-80 bg-white border-l border-slate-200 flex flex-col overflow-hidden shrink-0"
        >
          {/* Header */}
          <div className="h-12 bg-gradient-to-r from-primary to-primary-dark flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">AI Agent</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-white/70 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 shrink-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
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
          <div className="p-3 border-t border-slate-200 shrink-0">
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
              className="w-full flex items-center justify-center gap-2 py-2 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
            >
              {paletteLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Palette className="w-3.5 h-3.5" />
              )}
              Generate Color Palette
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
