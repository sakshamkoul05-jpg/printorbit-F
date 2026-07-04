/**
 * Render Worker Client — manages the rendering Web Worker lifecycle.
 * Provides async API for rendering on a background thread.
 */

import type { MockupMetadata, RenderOptions, RenderProgress, PipelineStage } from '../types';
import type { LoadedAssets } from '../assets/loader';

type ProgressCallback = (progress: RenderProgress) => void;
type CompleteCallback = (bitmap: ImageBitmap, width: number, height: number) => void;
type ErrorCallback = (error: Error) => void;

export interface RenderJob {
  id: string;
  cancel: () => void;
}

let workerInstance: Worker | null = null;
let jobCounter = 0;

function getWorker(): Worker {
  if (workerInstance) return workerInstance;
  workerInstance = new Worker(
    new URL('./render.worker.ts', import.meta.url),
    { type: 'module' },
  );
  return workerInstance;
}

/**
 * Submit a rendering job to the Web Worker.
 * 
 * @param artwork Artwork as ImageBitmap
 * @param assets Loaded mockup assets (background, mask, etc.)
 * @param metadata Parsed mockup metadata
 * @param options Render options
 * @param onProgress Progress callback
 * @returns RenderJob with cancel() method
 */
export function submitRenderJob(
  artwork: ImageBitmap,
  assets: LoadedAssets,
  metadata: MockupMetadata,
  options: RenderOptions,
  onProgress?: ProgressCallback,
): Promise<{ bitmap: ImageBitmap; width: number; height: number }> {
  const worker = getWorker();
  const jobId = `render-${++jobCounter}`;

  return new Promise((resolve, reject) => {
    const handleMessage = (e: MessageEvent) => {
      const { type, data } = e.data;

      switch (type) {
        case 'progress':
          onProgress?.(data as RenderProgress);
          break;
        case 'complete':
          cleanup();
          resolve(data);
          break;
        case 'error':
          cleanup();
          reject(new Error(data.message));
          break;
      }
    };

    const handleError = (e: ErrorEvent) => {
      cleanup();
      reject(new Error(e.message));
    };

    const cleanup = () => {
      worker.removeEventListener('message', handleMessage);
      worker.removeEventListener('error', handleError);
    };

    worker.addEventListener('message', handleMessage);
    worker.addEventListener('error', handleError);

    // Transfer artwork and assets to worker
    const transferables: ImageBitmap[] = [artwork, assets.background, assets.mask];
    if (assets.displacement) transferables.push(assets.displacement);
    if (assets.highlights) transferables.push(assets.highlights);
    if (assets.shadows) transferables.push(assets.shadows);
    if (assets.reflection) transferables.push(assets.reflection);
    if (assets.texture) transferables.push(assets.texture);

    worker.postMessage(
      {
        type: 'render',
        data: {
          artworkBitmap: artwork,
          assets,
          metadata,
          options,
        },
      },
      transferables.map(b => (b as ImageBitmap).close ? b : b),
    );
  });
}

/**
 * Terminate the worker and free resources.
 */
export function terminateWorker(): void {
  if (workerInstance) {
    workerInstance.terminate();
    workerInstance = null;
  }
}

export default { submitRenderJob, terminateWorker };
