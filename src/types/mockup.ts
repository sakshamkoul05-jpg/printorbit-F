export type MockupProduct =
  | 'business-card' | 'flyer' | 'brochure' | 'poster' | 'sticker' | 'label'
  | 'tshirt' | 'hoodie' | 'cap' | 'mug' | 'phone-case' | 'shopping-bag'
  | 'packaging-box' | 'letterhead' | 'certificate' | 'menu' | 'banner'
  | 'roll-up-standee' | 'canvas-print' | 'notebook' | 'id-card'
  | 'wedding-card' | 'invitation';

export type MockupCategory =
  | 'Business Cards' | 'Flyers' | 'Posters' | 'Packaging' | 'Apparel'
  | 'Marketing' | 'Restaurant' | 'Office' | 'Promotional' | 'Stationery';

export type SceneAngle = 'front' | 'back' | 'side' | '45deg' | 'lifestyle' | 'flat-lay';

export type AllowedFileType = 'image/png' | 'image/jpeg' | 'image/svg+xml' | 'application/pdf';

export type ExportFormat = 'png' | 'jpeg' | 'webp';

export type DesignBlendMode = 'normal' | 'multiply' | 'overlay' | 'screen' | 'darken' | 'lighten' | 'soft-light';

export interface CornerPoints {
  tl: { x: number; y: number };
  tr: { x: number; y: number };
  bl: { x: number; y: number };
  br: { x: number; y: number };
}

export interface MaskDefinition {
  type: 'circle' | 'ellipse' | 'polygon' | 'rounded-rect' | 'path';
  value: string;
}

export interface SceneDef {
  id: string;
  name: string;
  product: MockupProduct;
  category: MockupCategory;
  description: string;
  tags: string[];
  background: { type: 'gradient' | 'solid' | 'image'; value: string };
  printableArea: CornerPoints;
  perspectivePoints: CornerPoints;
  mask: MaskDefinition | null;
  reflectionLayer: { opacity: number; blendMode: DesignBlendMode } | null;
  shadow: { angle: number; distance: number; blur: number; opacity: number; color: string } | null;
  textureLayer: { type: 'paper' | 'fabric' | 'ceramic' | 'vinyl' | 'cardboard'; opacity: number } | null;
  dpi: number;
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape' | 'square';
  color: string[];
  material: string;
  industry: string[];
  renderOptions: {
    curve?: { axis: 'x' | 'y'; amount: number };
    clipPath?: string;
    designClipPath?: string;
    designBorderRadius?: string;
    designTransform?: string;
    designLeft: string;
    designTop: string;
    designWidth: string;
    designHeight: string;
    boxShadow?: string;
    blendMode?: DesignBlendMode;
  };
}

export interface MockupEditorState {
  designScale: number;
  designX: number;
  designY: number;
  designRotation: number;
  designOpacity: number;
  brightness: number;
  contrast: number;
  saturation: number;
  dropShadow: boolean;
  shadowOpacity: number;
  shadowBlur: number;
  vignette: number;
  backgroundBrightness: number;
  texture: boolean;
  textureOpacity: number;
  reflection: boolean;
  reflectionOpacity: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

export interface DesignLayer {
  id: string;
  dataUrl: string;
  width: number;
  height: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
  blendMode: DesignBlendMode;
  visible: boolean;
}

export interface DesignFile {
  id: string;
  name: string;
  file: File;
  dataUrl: string;
  type: string;
  size: number;
  width: number;
  height: number;
  validation: ValidationResult;
  layers: DesignLayer[];
}

export type EditorActionType =
  | 'setScale' | 'setPositionX' | 'setPositionY' | 'setRotation'
  | 'setOpacity' | 'setBrightness' | 'setContrast' | 'setSaturation'
  | 'setDropShadow' | 'setShadowOpacity' | 'setShadowBlur'
  | 'setVignette' | 'setBackgroundBrightness'
  | 'setTexture' | 'setTextureOpacity'
  | 'setReflection' | 'setReflectionOpacity'
  | 'flipHorizontal' | 'flipVertical';

export interface EditorAction {
  type: EditorActionType;
  value: number | boolean;
}

export interface EditorActionResult {
  success: boolean;
  error?: string;
}

export interface UndoRedoState {
  past: MockupEditorState[];
  present: MockupEditorState;
  future: MockupEditorState[];
}

export interface ExportOptions {
  format: ExportFormat;
  scale: number;
  dpi: number;
  download?: boolean;
  background?: string;
  quality?: number;
}

export interface ExportResult {
  success: boolean;
  blob?: Blob;
  dataUrl?: string;
  filename?: string;
  fileSize?: number;
  format?: ExportFormat;
  width?: number;
  height?: number;
  dpi?: number;
  error?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  dimensions?: { width: number; height: number };
  hasTransparency?: boolean;
  fileSize?: number;
}
