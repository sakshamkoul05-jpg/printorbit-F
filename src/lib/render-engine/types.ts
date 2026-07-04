// ── Geometry ──
export interface Point2D {
  x: number;
  y: number;
}

export interface QuadCorners {
  tl: Point2D;
  tr: Point2D;
  br: Point2D;
  bl: Point2D;
}

// ── Mesh ──
export interface MeshGrid {
  /** rows × cols control points */
  rows: number;
  cols: number;
  /** [row][col] control point positions */
  points: Point2D[][];
}

// ── Bezier Surface ──
export interface BezierPatch {
  /** 4×4 control points for a bicubic bezier patch */
  points: Point2D[][];
}

// ── Color ──
export interface ColorAdjustments {
  brightness: number;   // multiplier 0..2, default 1
  contrast: number;     // multiplier 0..2, default 1
  saturation: number;   // multiplier 0..2, default 1
  exposure: number;     // EV offset -2..+2, default 0
  highlights: number;   // 0..1, default 0
  shadows: number;      // 0..1, default 0
  whites: number;       // 0..1, default 0
  blacks: number;       // 0..1, default 0
  temperature: number;  // -100..+100, default 0 (cool→warm)
  tint: number;         // -100..+100, default 0 (green→magenta)
  vibrance: number;     // 0..1, default 0
  curves: number[][];   // [[in, out], ...] tone curve
}

export const DEFAULT_COLOR_ADJUSTMENTS: ColorAdjustments = {
  brightness: 1, contrast: 1, saturation: 1, exposure: 0,
  highlights: 0, shadows: 0, whites: 0, blacks: 0,
  temperature: 0, tint: 0, vibrance: 0, curves: [],
};

// ── Blend Modes ──
export type BlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'soft-light'
  | 'hard-light'
  | 'difference'
  | 'exclusion';

// ── Texture Types ──
export type SurfaceTexture =
  | 'fabric'
  | 'paper'
  | 'canvas'
  | 'leather'
  | 'metal'
  | 'glass'
  | 'plastic'
  | 'ceramic'
  | 'wood'
  | 'custom';

// ── Mockup Metadata ──
export interface MockupMetadata {
  id: string;
  name: string;
  product: string;
  category: string;
  description: string;
  /** Resolution in px */
  width: number;
  height: number;
  /** The printable area rectangle (where artwork goes, in px) */
  printArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  /** Perspective corner points for the printable area (in px) */
  corners: QuadCorners;
  /** Mesh warp control points (optional, for fabric deformation) */
  mesh?: MeshGrid;
  /** Bezier warp patches (optional, for curved surfaces) */
  bezierPatches?: BezierPatch[];
  /** Cylinder projection (optional, for mugs/bottles) */
  cylinder?: {
    centerX: number;
    centerY: number;
    radius: number;
    angleStart: number;
    angleEnd: number;
  };
  /** Blend mode for artwork compositing */
  blend: BlendMode;
  /** Opacity layers */
  shadowOpacity: number;
  highlightOpacity: number;
  reflectionOpacity: number;
  textureStrength: number;
  displacementStrength: number;
  /** Surface texture type */
  surfaceTexture: SurfaceTexture;
  /** Asset file paths (relative to mockup directory) */
  assets: {
    background: string;
    mask: string;
    displacement?: string;
    highlights?: string;
    shadows?: string;
    reflection?: string;
    texture?: string;
  };
  /** DPI for print export */
  dpi: number;
  /** Color profile */
  colorSpace: 'sRGB' | 'AdobeRGB' | 'CMYK';
}

// ── Render Options ──
export interface RenderOptions {
  colorAdjustments: ColorAdjustments;
  shadowIntensity: number;    // 0..1
  highlightIntensity: number; // 0..1
  reflectionIntensity: number; // 0..1
  textureIntensity: number;   // 0..1
  displacementIntensity: number; // 0..1
  outputWidth: number;
  outputHeight: number;
  antiAlias: boolean;
  scale: number;             // 1x, 2x, 3x
}

export const DEFAULT_RENDER_OPTIONS: RenderOptions = {
  colorAdjustments: DEFAULT_COLOR_ADJUSTMENTS,
  shadowIntensity: 1,
  highlightIntensity: 1,
  reflectionIntensity: 1,
  textureIntensity: 1,
  displacementIntensity: 1,
  outputWidth: 1200,
  outputHeight: 800,
  antiAlias: true,
  scale: 1,
};

// ── Render Pipeline Stage ──
export enum PipelineStage {
  Preprocess = 'preprocess',
  FitToPrintArea = 'fitToPrintArea',
  PerspectiveWarp = 'perspectiveWarp',
  MeshWarp = 'meshWarp',
  BezierWarp = 'bezierWarp',
  CylinderProjection = 'cylinderProjection',
  DisplacementMapping = 'displacementMapping',
  MaskClip = 'maskClip',
  MultiplyBlend = 'multiplyBlend',
  ShadowApply = 'shadowApply',
  HighlightApply = 'highlightApply',
  ReflectionApply = 'reflectionApply',
  TextureApply = 'textureApply',
  ColorAdjust = 'colorAdjust',
  AntiAlias = 'antiAlias',
  Export = 'export',
}

// ── Render Context ──
export interface RenderContext {
  artwork: ImageData;
  background: ImageData;
  mask: ImageData;
  displacement?: ImageData;
  highlights?: ImageData;
  shadows?: ImageData;
  reflection?: ImageData;
  texture?: ImageData;
  metadata: MockupMetadata;
  options: RenderOptions;
  /** Intermediate buffers for pipeline stages */
  buffers: Map<string, ImageData>;
}

// ── Asset Manifests ──
export interface AssetManifest {
  mockups: string[];
  categories: AssetCategory[];
}

export interface AssetCategory {
  id: string;
  label: string;
  productIds: string[];
}

// ── Render Progress ──
export interface RenderProgress {
  stage: PipelineStage;
  percent: number;
  message: string;
}

// ── Export ──
export type ExportFormat = 'png' | 'jpeg' | 'webp' | 'pdf';

export interface ExportResult {
  success: boolean;
  blob?: Blob;
  dataUrl?: string;
  width?: number;
  height?: number;
  dpi?: number;
  format?: ExportFormat;
  fileSize?: number;
  error?: string;
}

// ── Validation ──
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  dimensions?: { width: number; height: number };
  hasTransparency?: boolean;
  dpi?: number;
  fileSize?: number;
}
