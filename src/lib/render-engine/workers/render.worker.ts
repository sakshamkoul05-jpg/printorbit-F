/**
 * Render Web Worker.
 * Executes rendering pipeline off the main thread.
 * Communicates via postMessage with transferable objects (ImageBitmap, ImageData).
 */

import type { MockupMetadata, RenderOptions, RenderProgress, PipelineStage } from '../types';
import { parseMetadata } from '../assets/metadata';
import { renderPipeline } from '../core/pipeline';
import { loadArtwork, bitmapToImageData } from '../assets/loader';

interface WorkerMessage {
  type: 'render' | 'preview' | 'cancel';
  data: {
    artworkBitmap?: ImageBitmap;
    assets?: { background: ImageBitmap; mask: ImageBitmap; [key: string]: ImageBitmap | undefined };
    metadata: any;
    options: RenderOptions;
  };
}

let cancelled = false;

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { type, data } = e.data;

  if (type === 'cancel') {
    cancelled = true;
    return;
  }

  if (type === 'render' || type === 'preview') {
    cancelled = false;

    try {
      const metadata = parseMetadata(data.metadata);
      const options = data.options;

      // Convert artwork bitmap to ImageData
      const artwork = data.artworkBitmap
        ? bitmapToImageData(data.artworkBitmap)
        : new ImageData(1, 1);

      // Convert asset bitmaps to ImageData
      const assetData = {
        background: data.assets?.background
          ? bitmapToImageData(data.assets.background)
          : new ImageData(1, 1),
        mask: data.assets?.mask
          ? bitmapToImageData(data.assets.mask)
          : new ImageData(1, 1),
        displacement: data.assets?.displacement
          ? bitmapToImageData(data.assets.displacement!)
          : null,
        highlights: data.assets?.highlights
          ? bitmapToImageData(data.assets.highlights!)
          : null,
        shadows: data.assets?.shadows
          ? bitmapToImageData(data.assets.shadows!)
          : null,
        reflection: data.assets?.reflection
          ? bitmapToImageData(data.assets.reflection!)
          : null,
        texture: data.assets?.texture
          ? bitmapToImageData(data.assets.texture!)
          : null,
      };

      const result = await renderPipeline(
        artwork,
        assetData as any,
        metadata,
        options,
        (progress: RenderProgress) => {
          self.postMessage({ type: 'progress', data: progress });
        },
      );

      if (cancelled) return;

      // Convert result to transferable
      const resultBitmap = await createImageBitmap(
        new ImageData(new Uint8ClampedArray(result.data), result.width, result.height),
      );

      self.postMessage(
        { type: 'complete', data: { bitmap: resultBitmap, width: result.width, height: result.height } },
        { transfer: [resultBitmap] },
      );
    } catch (error: any) {
      self.postMessage({ type: 'error', data: { message: error.message } });
    }
  }
};
