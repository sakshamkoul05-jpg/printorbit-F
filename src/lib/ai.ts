import type { CanvasElement } from '@/app/design-studio/page';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface AIDesignResponse {
  success: boolean;
  design: {
    backgroundColor: string;
    elements: CanvasElement[];
  };
  generationTime: number;
}

interface AIEditResponse {
  success: boolean;
  design: {
    backgroundColor: string;
    elements: CanvasElement[];
  };
  changes: string[];
  generationTime: number;
}

interface AISuggestionItem {
  title: string;
  description: string;
  type: 'color' | 'typography' | 'layout' | 'contrast' | 'spacing';
  priority: 'high' | 'medium' | 'low';
}

interface AISuggestionsResponse {
  success: boolean;
  suggestions: AISuggestionItem[];
}

async function fetchAI(endpoint: string, body: unknown) {
  const res = await fetch(`${API_URL}/ai/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'AI request failed');
  return data;
}

interface AIChatResponse {
  success: boolean;
  reply: string;
}

interface AIContentResponse {
  success: boolean;
  content: {
    title: string;
    subtitle: string;
    body: string;
    tagline: string;
    contact: string;
    cta: string;
  };
  layout: string;
  style: string;
  generationTime: number;
}

export const aiAPI = {
  chat: (message: string, context?: string): Promise<AIChatResponse> =>
    fetchAI('chat', { message, context }),

  generateContent: (
    prompt: string,
    canvasWidth: number,
    canvasHeight: number,
    productType?: string
  ): Promise<AIContentResponse> =>
    fetchAI('generate-design', { prompt, productType, canvasWidth, canvasHeight }),

  generateDesign: (
    prompt: string,
    canvasWidth: number,
    canvasHeight: number,
    productType?: string
  ): Promise<AIDesignResponse> =>
    fetchAI('generate-design', { prompt, productType, canvasWidth, canvasHeight }),

  editDesign: (
    command: string,
    currentElements: CanvasElement[],
    backgroundColor?: string
  ): Promise<AIEditResponse> =>
    fetchAI('edit-design', { command, currentElements, backgroundColor }),

  suggestImprovements: (
    elements: CanvasElement[],
    backgroundColor?: string
  ): Promise<AISuggestionsResponse> =>
    fetchAI('suggest-improvements', { elements, backgroundColor }),

  generateColorPalette: (description: string) =>
    fetchAI('generate-color-palette', { description }),

  enhancePrompt: (prompt: string, productType?: string) =>
    fetchAI('enhance-prompt', { prompt, productType }),
};

export async function proxyImage(url: string): Promise<string> {
  const res = await fetch(`${API_URL}/mockups/proxy-image?url=${encodeURIComponent(url)}`);
  const data = await res.json();
  if (!res.ok || !data.dataUrl) throw new Error(data.error || 'Failed to proxy image');
  return data.dataUrl;
}

export type { AISuggestionItem };
