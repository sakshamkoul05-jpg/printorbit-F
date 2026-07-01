'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Loader2, Image, FileText, Flag, Package, Shirt, Gift } from 'lucide-react';
import { aiAPI } from '@/lib/ai';
import { generateLayout } from '@/lib/designEngine';
import type { CanvasElement } from '@/app/design-studio/page';

interface AIDesignGeneratorProps {
  canvasWidth: number;
  canvasHeight: number;
  onDesignGenerated: (design: { backgroundColor: string; elements: CanvasElement[] }) => void;
}

const PRODUCT_TYPES = [
  { id: 'business card', label: 'Business Card', icon: Image },
  { id: 'flyer', label: 'Flyer', icon: FileText },
  { id: 'banner', label: 'Banner', icon: Flag },
  { id: 'brochure', label: 'Brochure', icon: FileText },
  { id: 'poster', label: 'Poster', icon: Image },
  { id: 'label', label: 'Label/Sticker', icon: Package },
  { id: 'tshirt', label: 'T-Shirt', icon: Shirt },
  { id: 'mug', label: 'Mug', icon: Gift },
];

const SUGGESTED_PROMPTS = [
  'Modern minimalist design with clean lines',
  'Bold and colorful with geometric shapes',
  'Elegant luxury style with gold accents',
  'Eco-friendly natural theme in green tones',
  'Corporate professional in blue and white',
  'Creative artistic with abstract elements',
];

export default function AIDesignGenerator({
  canvasWidth,
  canvasHeight,
  onDesignGenerated,
}: AIDesignGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [productType, setProductType] = useState('business card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleGenerate = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || prompt;
    if (!finalPrompt.trim()) return;

    setLoading(true);
    setError('');
    try {
      // AI generates content + layout/style choices
      const result = await aiAPI.generateContent(finalPrompt, canvasWidth, canvasHeight, productType);

      // Design engine calculates all positions mathematically
      const design = generateLayout(
        result.layout || 'centered',
        result.style || 'modern',
        result.content,
        canvasWidth,
        canvasHeight,
      );

      onDesignGenerated(design);
    } catch (err: any) {
      setError(err.message || 'Generation failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
          Product Type
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {PRODUCT_TYPES.map((pt) => (
            <button
              key={pt.id}
              onClick={() => setProductType(pt.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] font-medium transition-all ${
                productType === pt.id
                  ? 'bg-primary text-white shadow-sm shadow-primary/30'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              <pt.icon className="w-3.5 h-3.5" />
              {pt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
          Describe your design
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A modern business card for a tech startup, dark theme with blue accent..."
          rows={3}
          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none transition-all"
        />
      </div>

      <button
        onClick={() => handleGenerate()}
        disabled={loading || !prompt.trim()}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 shadow-sm"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4" />
        )}
        {loading ? 'Generating...' : 'Generate Design'}
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

      {/* Suggested prompts */}
      {showSuggestions && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Try these
            </label>
            <button
              onClick={() => setShowSuggestions(false)}
              className="text-[10px] text-slate-400 hover:text-slate-600"
            >
              Hide
            </button>
          </div>
          <div className="space-y-1.5">
            {SUGGESTED_PROMPTS.map((sp, i) => (
              <button
                key={i}
                onClick={() => {
                  setPrompt(sp);
                  handleGenerate(sp);
                }}
                disabled={loading}
                className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-primary/5 text-xs text-slate-600 rounded-lg border border-slate-200 hover:border-primary/30 transition-all"
              >
                {sp}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
