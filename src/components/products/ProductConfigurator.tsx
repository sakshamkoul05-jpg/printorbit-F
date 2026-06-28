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

    // Volume discounts
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
    <div className="space-y-6">
      {/* Material Selection */}
      {product.materials && product.materials.length > 0 && (
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
            <Layers className="w-4 h-4 text-primary" />
            Material
          </label>
          <div className="grid grid-cols-2 gap-2">
            {product.materials.map((mat) => (
              <button
                key={mat.name}
                onClick={() => {
                  setSelectedMaterial(mat);
                  onPriceChange(calculatedPrice, quantity);
                }}
                className={`relative px-4 py-3 rounded-xl border-2 text-left transition-all ${
                  selectedMaterial.name === mat.name
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {selectedMaterial.name === mat.name && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className="text-sm font-medium text-dark block">{mat.name}</span>
                {mat.price_modifier !== 0 && (
                  <span className="text-xs text-muted">
                    {mat.price_modifier > 0 ? '+' : ''}{formatPrice(mat.price_modifier)} per unit
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
            <Ruler className="w-4 h-4 text-primary" />
            Size
          </label>
          <div className="grid grid-cols-2 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size.name}
                onClick={() => {
                  setSelectedSize(size);
                  onPriceChange(calculatedPrice, quantity);
                }}
                className={`relative px-4 py-3 rounded-xl border-2 text-left transition-all ${
                  selectedSize.name === size.name
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {selectedSize.name === size.name && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
                <span className="text-sm font-medium text-dark block">{size.name}</span>
                {size.width > 0 && (
                  <span className="text-xs text-muted">{size.width} × {size.height} mm</span>
                )}
                {size.price_modifier !== 0 && (
                  <span className="text-xs text-muted block">
                    {size.price_modifier > 0 ? '+' : ''}{formatPrice(size.price_modifier)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Finish Selection */}
      {product.finishes && product.finishes.length > 0 && (
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
            <Palette className="w-4 h-4 text-primary" />
            Finish
          </label>
          <div className="grid grid-cols-3 gap-2">
            {product.finishes.map((fin) => (
              <button
                key={fin.name}
                onClick={() => {
                  setSelectedFinish(fin);
                  onPriceChange(calculatedPrice, quantity);
                }}
                className={`relative px-3 py-3 rounded-xl border-2 text-center transition-all ${
                  selectedFinish.name === fin.name
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                {selectedFinish.name === fin.name && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
                <span className="text-sm font-medium text-dark">{fin.name}</span>
                {fin.price_modifier !== 0 && (
                  <span className="text-[10px] text-muted block">
                    {fin.price_modifier > 0 ? '+' : ''}{formatPrice(fin.price_modifier)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Shape Selection (for applicable products) */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          Shape
        </label>
        <div className="flex gap-2">
          {SHAPE_OPTIONS.map((shape) => (
            <button
              key={shape.name}
              onClick={() => setSelectedShape(shape.name)}
              className={`flex-1 px-3 py-3 rounded-xl border-2 text-center transition-all ${
                selectedShape === shape.name
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <span className="text-xl block mb-0.5">{shape.icon}</span>
              <span className="text-xs font-medium text-dark">{shape.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <label className="flex items-center justify-between text-sm font-semibold text-dark mb-3">
          <span>Quantity</span>
          <span className="text-xs font-normal text-muted">
            {product.min_quantity} — {product.max_quantity?.toLocaleString() || '10,000+'} pcs
          </span>
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(quantity - (quantity >= 1000 ? 100 : quantity >= 100 ? 10 : 1))}
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || product.min_quantity)}
            className="flex-1 h-10 px-4 rounded-xl border border-slate-200 text-center text-sm font-semibold text-dark focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
          />
          <button
            onClick={() => handleQuantityChange(quantity + (quantity >= 1000 ? 100 : quantity >= 100 ? 10 : 1))}
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Quantity Buttons */}
        <div className="flex gap-2 mt-3">
          {[100, 250, 500, 1000, 2500, 5000].filter(q => q >= (product.min_quantity || 1)).map((q) => (
            <button
              key={q}
              onClick={() => handleQuantityChange(q)}
              className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                quantity === q
                  ? 'bg-primary text-white'
                  : 'bg-slate-100 text-slate-500 hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {q >= 1000 ? `${q / 1000}K` : q}
            </button>
          ))}
        </div>
      </div>

      {/* Price Summary */}
      <motion.div
        key={`${selectedMaterial.name}-${selectedSize.name}-${selectedFinish.name}-${quantity}`}
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-5 border border-primary/10"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted">Unit Price</span>
          <span className="text-sm font-semibold text-dark">{formatPrice(unitPrice)}/pc</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted">Quantity</span>
          <span className="text-sm font-semibold text-dark">{quantity.toLocaleString()} pcs</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted">Subtotal</span>
          <span className="text-sm font-semibold text-dark">{formatPrice(unitPrice * quantity)}</span>
        </div>
        <div className="border-t border-primary/10 pt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-dark">Total Price</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">{formatPrice(calculatedPrice)}</span>
            <span className="text-xs text-success block font-medium">
              You save {formatPrice(unitPrice * quantity - calculatedPrice)}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
