/**
 * Product renderer registry.
 * Maps product types to their rendering pipeline modifiers.
 * Each product type can inject custom pre/post-processing into the pipeline.
 */

import type { MockupMetadata, RenderOptions } from '../types';

export interface ProductRenderer {
  id: string;
  name: string;
  /** Modify metadata before rendering (e.g., add mesh points for fabric) */
  preProcess?: (metadata: MockupMetadata, options: RenderOptions) => MockupMetadata;
  /** Custom rendering logic (runs before compositing) */
  render?: (ctx: ProductRenderContext) => Promise<void>;
}

export interface ProductRenderContext {
  artwork: ImageData;
  metadata: MockupMetadata;
  options: RenderOptions;
  outputWidth: number;
  outputHeight: number;
}

// ── Built-in product renderers ──
const renderers = new Map<string, ProductRenderer>();

export function registerRenderer(renderer: ProductRenderer): void {
  renderers.set(renderer.id, renderer);
}

export function getRenderer(productId: string): ProductRenderer | undefined {
  return renderers.get(productId);
}

export function hasRenderer(productId: string): boolean {
  return renderers.has(productId);
}

// ── T-Shirt Renderer ──
registerRenderer({
  id: 'tshirt',
  name: 'T-Shirt',
  preProcess: (meta) => {
    return {
      ...meta,
      blend: 'multiply',
      surfaceTexture: 'fabric',
    };
  },
});

// ── Hoodie Renderer ──
registerRenderer({
  id: 'hoodie',
  name: 'Hoodie',
  preProcess: (meta) => {
    return {
      ...meta,
      blend: 'multiply',
      surfaceTexture: 'fabric',
    };
  },
});

// ── Mug Renderer ──
registerRenderer({
  id: 'mug',
  name: 'Mug',
  preProcess: (meta) => {
    return {
      ...meta,
      surfaceTexture: 'ceramic',
    };
  },
});

// ── Business Card Renderer ──
registerRenderer({
  id: 'business-card',
  name: 'Business Card',
  preProcess: (meta) => {
    return {
      ...meta,
      blend: 'multiply',
      surfaceTexture: 'paper',
    };
  },
});

// ── Poster Renderer ──
registerRenderer({
  id: 'poster',
  name: 'Poster',
  preProcess: (meta) => {
    return {
      ...meta,
      blend: 'normal',
      surfaceTexture: 'paper',
    };
  },
});

// ── Phone Case Renderer ──
registerRenderer({
  id: 'phone-case',
  name: 'Phone Case',
  preProcess: (meta) => {
    return {
      ...meta,
      blend: 'multiply',
      surfaceTexture: 'plastic',
    };
  },
});

// ── Bottle Renderer ──
registerRenderer({
  id: 'bottle',
  name: 'Bottle',
  preProcess: (meta) => {
    return {
      ...meta,
      blend: 'overlay',
      surfaceTexture: 'glass',
    };
  },
});

// ── Packaging Box Renderer ──
registerRenderer({
  id: 'packaging-box',
  name: 'Packaging Box',
  preProcess: (meta) => {
    return {
      ...meta,
      surfaceTexture: 'paper',
    };
  },
});

// ── Canvas Print Renderer ──
registerRenderer({
  id: 'canvas-print',
  name: 'Canvas Print',
  preProcess: (meta) => {
    return {
      ...meta,
      blend: 'normal',
      surfaceTexture: 'canvas',
    };
  },
});

export function getAllRenderers(): ProductRenderer[] {
  return Array.from(renderers.values());
}
