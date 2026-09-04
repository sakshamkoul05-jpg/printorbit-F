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
      const result = await aiAPI.generateContent(finalPrompt, canvasWidth, canvasHeight, productType);
      const design = generateLayout(
        result.layout || 'centered',
        result.style || 'modern',
        result.content,
        canvasWidth,
        canvasHeight,
        productType,
      );
      onDesignGenerated(design);
    } catch (err: any) {
      setError(err.message || 'Generation failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column gap-3 p-3">
      <div>
        <label className="d-block mb-2" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Product Type
        </label>
        <div className="d-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.375rem' }}>
          {PRODUCT_TYPES.map((pt) => (
            <button
              key={pt.id}
              onClick={() => setProductType(pt.id)}
              className={`d-flex flex-column align-items-center gap-1 btn`}
              style={{
                padding: '0.5rem',
                fontSize: '10px',
                fontWeight: 500,
                borderRadius: '0.5rem',
                transition: 'all 0.15s',
                backgroundColor: productType === pt.id ? 'var(--bs-primary, #0d6efd)' : '#f8fafc',
                color: productType === pt.id ? 'var(--bs-white)' : '#64748b',
                border: 'none',
              }}
            >
              <pt.icon size={14} />
              {pt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="d-block mb-2" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Describe your design
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A modern business card for a tech startup, dark theme with blue accent..."
          rows={3}
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
        onClick={() => handleGenerate()}
        disabled={loading || !prompt.trim()}
        className="w-100 d-flex align-items-center justify-content-center gap-2 btn"
        style={{
          padding: '0.625rem',
          backgroundColor: 'var(--bs-primary, #0d6efd)',
          color: 'var(--bs-white)',
          fontSize: '0.875rem',
          fontWeight: 600,
          borderRadius: '0.75rem',
          transition: 'background-color 0.15s',
          opacity: loading || !prompt.trim() ? 0.5 : 1,
          border: 'none',
        }}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Sparkles size={16} />
        )}
        {loading ? 'Generating...' : 'Generate Design'}
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

      {showSuggestions && (
        <div>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <label className="m-0" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Try these
            </label>
            <button
              onClick={() => setShowSuggestions(false)}
              className="btn p-0"
              style={{ fontSize: '10px', color: '#94a3b8' }}
            >
              Hide
            </button>
          </div>
          <div className="d-flex flex-column" style={{ gap: '0.375rem' }}>
            {SUGGESTED_PROMPTS.map((sp, i) => (
              <button
                key={i}
                onClick={() => {
                  setPrompt(sp);
                  handleGenerate(sp);
                }}
                disabled={loading}
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
                {sp}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
