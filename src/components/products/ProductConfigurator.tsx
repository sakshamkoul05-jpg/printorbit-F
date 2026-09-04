'use client';

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Minus, Plus, Check, Palette, Ruler, Layers, Sparkles } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import type { Product, ProductMaterial, ProductSize, ProductFinish } from '@/types';

interface ProductConfiguratorProps {
  product: Product;
  onPriceChange: (price: number, quantity: number) => void;
}

const SHAPE_OPTIONS = [
  { name: 'Rectangle', icon: '▭' },
  { name: 'Square', icon: '□' },
  { name: 'Circle', icon: '○' },
  { name: 'Rounded', icon: '▢' },
];

export default function ProductConfigurator({ product, onPriceChange }: ProductConfiguratorProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<ProductMaterial>(product.materials?.[0] || { name: 'Standard', price_modifier: 0 });
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes?.[0] || { name: 'Standard', width: 0, height: 0, price_modifier: 0 });
  const [selectedFinish, setSelectedFinish] = useState<ProductFinish>(product.finishes?.[0] || { name: 'Matte', price_modifier: 0 });
  const [selectedShape, setSelectedShape] = useState<string>(SHAPE_OPTIONS[0].name);
  const [quantity, setQuantity] = useState(product.min_quantity || 100);

  const calculatedPrice = useMemo(() => {
    const base = product.base_price;
    const materialMod = selectedMaterial.price_modifier || 0;
    const sizeMod = selectedSize.price_modifier || 0;
    const finishMod = selectedFinish.price_modifier || 0;
    const unitPrice = base + materialMod + sizeMod + finishMod;

    let discount = 0;
    if (quantity >= 10000) discount = 0.35;
    else if (quantity >= 5000) discount = 0.25;
    else if (quantity >= 2000) discount = 0.15;
    else if (quantity >= 1000) discount = 0.10;
    else if (quantity >= 500) discount = 0.05;

    return Math.round(unitPrice * quantity * (1 - discount));
  }, [product.base_price, selectedMaterial, selectedSize, selectedFinish, quantity]);

  const unitPrice = useMemo(() => {
    const base = product.base_price;
    const materialMod = selectedMaterial.price_modifier || 0;
    const sizeMod = selectedSize.price_modifier || 0;
    const finishMod = selectedFinish.price_modifier || 0;
    return base + materialMod + sizeMod + finishMod;
  }, [product.base_price, selectedMaterial, selectedSize, selectedFinish]);

  const handleQuantityChange = (newQty: number) => {
    const min = product.min_quantity || 1;
    const max = product.max_quantity || 100000;
    const val = Math.max(min, Math.min(max, newQty));
    setQuantity(val);
    onPriceChange(calculatedPrice, val);
  };

  return (
    <div className="d-flex flex-column gap-4">
      {product.materials && product.materials.length > 0 && (
        <div>
          <label className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
            <Layers size={16} style={{ color: 'var(--bs-primary, #0d6efd)' }} />
            Material
          </label>
          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {product.materials.map((mat) => (
              <button
                key={mat.name}
                onClick={() => {
                  setSelectedMaterial(mat);
                  onPriceChange(calculatedPrice, quantity);
                }}
                className="position-relative text-start btn"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${selectedMaterial.name === mat.name ? 'var(--bs-primary, #0d6efd)' : '#e2e8f0'}`,
                  backgroundColor: selectedMaterial.name === mat.name ? 'rgba(13,110,253,0.05)' : 'var(--bs-white)',
                  transition: 'all 0.15s',
                }}
              >
                {selectedMaterial.name === mat.name && (
                  <div className="position-absolute d-flex align-items-center justify-content-center rounded-circle" style={{ top: '0.5rem', right: '0.5rem', width: '1.25rem', height: '1.25rem', backgroundColor: 'var(--bs-primary, #0d6efd)' }}>
                    <Check size={12} style={{ color: 'var(--bs-white)' }} />
                  </div>
                )}
                <span className="d-block" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1e293b' }}>{mat.name}</span>
                {mat.price_modifier !== 0 && (
                  <span style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                    {mat.price_modifier > 0 ? '+' : ''}{formatPrice(mat.price_modifier)} per unit
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.sizes && product.sizes.length > 0 && (
        <div>
          <label className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
            <Ruler size={16} style={{ color: 'var(--bs-primary, #0d6efd)' }} />
            Size
          </label>
          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {product.sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => {
                  setSelectedSize(size);
                  onPriceChange(calculatedPrice, quantity);
                }}
                className="position-relative text-start btn"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${selectedSize.name === size.name ? 'var(--bs-primary, #0d6efd)' : '#e2e8f0'}`,
                  backgroundColor: selectedSize.name === size.name ? 'rgba(13,110,253,0.05)' : 'var(--bs-white)',
                  transition: 'all 0.15s',
                }}
              >
                {selectedSize.name === size.name && (
                  <div className="position-absolute d-flex align-items-center justify-content-center rounded-circle" style={{ top: '0.5rem', right: '0.5rem', width: '1.25rem', height: '1.25rem', backgroundColor: 'var(--bs-primary, #0d6efd)' }}>
                    <Check size={12} style={{ color: 'var(--bs-white)' }} />
                  </div>
                )}
                <span className="d-block" style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1e293b' }}>{size.name}</span>
                {size.width > 0 && (
                  <span style={{ fontSize: '0.75rem', color: '#6c757d' }}>{size.width} × {size.height} mm</span>
                )}
                {size.price_modifier !== 0 && (
                  <span className="d-block" style={{ fontSize: '0.75rem', color: '#6c757d' }}>
                    {size.price_modifier > 0 ? '+' : ''}{formatPrice(size.price_modifier)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.finishes && product.finishes.length > 0 && (
        <div>
          <label className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
            <Palette size={16} style={{ color: 'var(--bs-primary, #0d6efd)' }} />
            Finish
          </label>
          <div className="d-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {product.finishes.map((fin) => (
              <button
                key={fin.name}
                onClick={() => {
                  setSelectedFinish(fin);
                  onPriceChange(calculatedPrice, quantity);
                }}
                className="position-relative text-center btn"
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  border: `2px solid ${selectedFinish.name === fin.name ? 'var(--bs-primary, #0d6efd)' : '#e2e8f0'}`,
                  backgroundColor: selectedFinish.name === fin.name ? 'rgba(13,110,253,0.05)' : 'var(--bs-white)',
                  transition: 'all 0.15s',
                }}
              >
                {selectedFinish.name === fin.name && (
                  <div className="position-absolute d-flex align-items-center justify-content-center rounded-circle" style={{ top: '0.375rem', right: '0.375rem', width: '1rem', height: '1rem', backgroundColor: 'var(--bs-primary, #0d6efd)' }}>
                    <Check size={10} style={{ color: 'var(--bs-white)' }} />
                  </div>
                )}
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1e293b' }}>{fin.name}</span>
                {fin.price_modifier !== 0 && (
                  <span className="d-block" style={{ fontSize: '10px', color: '#6c757d' }}>
                    {fin.price_modifier > 0 ? '+' : ''}{formatPrice(fin.price_modifier)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="d-flex align-items-center gap-2 mb-2" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
          <Sparkles size={16} style={{ color: 'var(--bs-primary, #0d6efd)' }} />
          Shape
        </label>
        <div className="d-flex" style={{ gap: '0.5rem' }}>
          {SHAPE_OPTIONS.map((shape) => (
            <button
              key={shape.name}
              onClick={() => setSelectedShape(shape.name)}
              className="flex-fill text-center btn"
              style={{
                padding: '0.75rem',
                borderRadius: '0.75rem',
                border: `2px solid ${selectedShape === shape.name ? 'var(--bs-primary, #0d6efd)' : '#e2e8f0'}`,
                backgroundColor: selectedShape === shape.name ? 'rgba(13,110,253,0.05)' : 'var(--bs-white)',
                transition: 'all 0.15s',
              }}
            >
              <span className="d-block mb-0" style={{ fontSize: '1.25rem' }}>{shape.icon}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#1e293b' }}>{shape.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="d-flex align-items-center justify-content-between mb-2" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>
          <span>Quantity</span>
          <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#6c757d' }}>
            {product.min_quantity} — {product.max_quantity?.toLocaleString() || '10,000+'} pcs
          </span>
        </label>
        <div className="d-flex align-items-center" style={{ gap: '0.75rem' }}>
          <button
            onClick={() => handleQuantityChange(quantity - (quantity >= 1000 ? 100 : quantity >= 100 ? 10 : 1))}
            className="d-flex align-items-center justify-content-center"
            style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', color: '#94a3b8', transition: 'all 0.15s', backgroundColor: 'var(--bs-white)' }}
          >
            <Minus size={16} />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || product.min_quantity)}
            className="flex-fill text-center"
            style={{ height: '2.5rem', padding: '0 1rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', fontSize: '0.875rem', fontWeight: 600, color: '#1e293b', outline: 'none' }}
          />
          <button
            onClick={() => handleQuantityChange(quantity + (quantity >= 1000 ? 100 : quantity >= 100 ? 10 : 1))}
            className="d-flex align-items-center justify-content-center"
            style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', border: '1px solid #e2e8f0', color: '#94a3b8', transition: 'all 0.15s', backgroundColor: 'var(--bs-white)' }}
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="d-flex mt-2" style={{ gap: '0.5rem' }}>
          {[100, 250, 500, 1000, 2500, 5000].filter(q => q >= (product.min_quantity || 1)).map((q) => (
            <button
              key={q}
              onClick={() => handleQuantityChange(q)}
              className="flex-fill"
              style={{
                padding: '0.375rem',
                fontSize: '0.75rem',
                fontWeight: 500,
                borderRadius: '0.5rem',
                transition: 'all 0.15s',
                backgroundColor: quantity === q ? 'var(--bs-primary, #0d6efd)' : '#f1f5f9',
                color: quantity === q ? 'var(--bs-white)' : '#64748b',
                border: 'none',
              }}
            >
              {q >= 1000 ? `${q / 1000}K` : q}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={`${selectedMaterial.name}-${selectedSize.name}-${selectedFinish.name}-${quantity}`}
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        className="rounded-3 p-4"
        style={{ background: 'linear-gradient(to bottom right, rgba(13,110,253,0.05), rgba(111,66,193,0.05))', border: '1px solid rgba(13,110,253,0.1)' }}
      >
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span style={{ fontSize: '0.875rem', color: '#6c757d' }}>Unit Price</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>{formatPrice(unitPrice)}/pc</span>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span style={{ fontSize: '0.875rem', color: '#6c757d' }}>Quantity</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>{quantity.toLocaleString()} pcs</span>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <span style={{ fontSize: '0.875rem', color: '#6c757d' }}>Subtotal</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>{formatPrice(unitPrice * quantity)}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between pt-2" style={{ borderTop: '1px solid rgba(13,110,253,0.1)' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1e293b' }}>Total Price</span>
          <div className="text-end">
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--bs-primary, #0d6efd)' }}>{formatPrice(calculatedPrice)}</span>
            <span className="d-block" style={{ fontSize: '0.75rem', color: 'var(--bs-success, #198754)', fontWeight: 500 }}>
              You save {formatPrice(unitPrice * quantity - calculatedPrice)}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
