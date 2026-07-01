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

export const aiAPI = {
  chat: (message: string, context?: string): Promise<AIChatResponse> =>
    fetchAI('chat', { message, context }),

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

export type { AISuggestionItem };
