/**
 * Metadata system — loads, validates, and manages mockup metadata.
 * Metadata describes the product mockup scene including printable area,
 * perspective corners, warp parameters, asset paths, and render settings.
 */

import type { MockupMetadata } from '../types';

/**
 * Load metadata from a JSON response.
 */
export function parseMetadata(json: any): MockupMetadata {
  const corners = json.corners || [];
  const c = {
    tl: { x: corners[0]?.[0] ?? 0, y: corners[0]?.[1] ?? 0 },
    tr: { x: corners[1]?.[0] ?? 0, y: corners[1]?.[1] ?? 0 },
    br: { x: corners[2]?.[0] ?? 0, y: corners[2]?.[1] ?? 0 },
    bl: { x: corners[3]?.[0] ?? 0, y: corners[3]?.[1] ?? 0 },
  };

  return {
    id: json.id || '',
    name: json.name || '',
    product: json.product || '',
    category: json.category || '',
    description: json.description || '',
    width: json.width || 1200,
    height: json.height || 800,
    printArea: json.printArea || { x: 0, y: 0, width: 400, height: 400 },
    corners: c,
    mesh: json.mesh || undefined,
    bezierPatches: json.bezierPatches || undefined,
    cylinder: json.cylinder || undefined,
    blend: json.blend || 'multiply',
    shadowOpacity: json.shadowOpacity ?? 0.65,
    highlightOpacity: json.highlightOpacity ?? 0.42,
    reflectionOpacity: json.reflectionOpacity ?? 0.3,
    textureStrength: json.textureStrength ?? 0.55,
    displacementStrength: json.displacementStrength ?? 18,
    surfaceTexture: json.surfaceTexture || 'paper',
    assets: json.assets || {
      background: 'background.png',
      mask: 'mask.png',
    },
    dpi: json.dpi || 300,
    colorSpace: json.colorSpace || 'sRGB',
  };
}

/**
 * Pre-compute the homography matrix from metadata corner points.
 * Returns source-to-destination mapping in pixel coordinates.
 */
export function computePrintAreaMapping(metadata: MockupMetadata) {
  const pa = metadata.printArea;
  const c = metadata.corners;

  // Source: the artwork rectangle (printable area)
  const src = [
    { x: pa.x, y: pa.y },
    { x: pa.x + pa.width, y: pa.y },
    { x: pa.x + pa.width, y: pa.y + pa.height },
    { x: pa.x, y: pa.y + pa.height },
  ] as [{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }, { x: number; y: number }];

  // Destination: the perspective corners on the product
  const dst = [c.tl, c.tr, c.br, c.bl] as [{ x: number; y: number }, { x: number; y: number }, { x: number; y: number }, { x: number; y: number }];

  return { src, dst };
}

/**
 * Validate a metadata object.
 */
export function validateMetadata(m: MockupMetadata): string[] {
  const errors: string[] = [];

  if (!m.id) errors.push('Missing id');
  if (!m.name) errors.push('Missing name');
  if (!m.product) errors.push('Missing product');
  if (!m.width || !m.height) errors.push('Missing dimensions');
  if (!m.printArea) errors.push('Missing printArea');
  if (!m.corners) errors.push('Missing corners');
  if (!m.assets.background) errors.push('Missing background asset');
  if (!m.assets.mask) errors.push('Missing mask asset');

  // Validate corner sanity
  const c = m.corners;
  if (c) {
    if (c.tl.x >= c.tr.x) errors.push('Corners tl/tr x-order reversed');
    if (c.tl.y >= c.bl.y) errors.push('Corners tl/bl y-order reversed');
  }

  return errors;
}
