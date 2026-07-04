'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import type {
  SceneDef, DesignFile, MockupEditorState,
  EditorAction, EditorActionResult,
} from '@/types/mockup';
import { SCENES, getScenesByProduct, searchScenes } from './scenes';
import { validateDesignFile } from './validation';
import { CATEGORIES, PRODUCTS } from './categories';

const MAX_HISTORY = 50;

function createInitialState(): MockupEditorState {
  return {
    designScale: 1,
    designX: 0,
    designY: 0,
    designRotation: 0,
    designOpacity: 1,
    brightness: 1,
    contrast: 1,
    saturation: 1,
    dropShadow: true,
    shadowOpacity: 0.25,
    shadowBlur: 4,
    vignette: 0.15,
    backgroundBrightness: 1,
    texture: true,
    textureOpacity: 0.06,
    reflection: true,
    reflectionOpacity: 0.08,
    flipHorizontal: false,
    flipVertical: false,
  };
}

export function useMockupGenerator() {
  const [selectedScene, setSelectedScene] = useState<SceneDef | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [designFile, setDesignFile] = useState<DesignFile | null>(null);
  const [editorState, setEditorState] = useState<MockupEditorState>(createInitialState());
  const [isExporting, setIsExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const historyRef = useRef<MockupEditorState[]>([createInitialState()]);
  const historyIndexRef = useRef(0);

  const scenes = useMemo(() => {
    if (searchQuery) return searchScenes(searchQuery);
    return getScenesByProduct(selectedCategory.products[0]).length > 0
      ? getScenesByProduct(selectedCategory.products[0])
      : SCENES.filter(s => s.category === selectedCategory.id);
  }, [selectedCategory, searchQuery]);

  const filteredScenes = useMemo(() => {
    if (!selectedScene) return scenes;
    return scenes;
  }, [scenes, selectedScene]);

  const handleCategoryChange = useCallback((cat: typeof CATEGORIES[0]) => {
    setSelectedCategory(cat);
    setSelectedScene(null);
    setDesignFile(null);
    setEditorState(createInitialState());
    historyRef.current = [createInitialState()];
    historyIndexRef.current = 0;
  }, []);

  const handleSceneSelect = useCallback((scene: SceneDef) => {
    setSelectedScene(scene);
    setEditorState(createInitialState());
    historyRef.current = [createInitialState()];
    historyIndexRef.current = 0;
  }, []);

  const handleFileUpload = useCallback(async (file: File) => {
    const validation = await validateDesignFile(file);
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    const designFile: DesignFile = {
      id: crypto.randomUUID(),
      name: file.name,
      file,
      dataUrl,
      type: file.type,
      size: file.size,
      width: validation.dimensions?.width || 0,
      height: validation.dimensions?.height || 0,
      validation,
      layers: [],
    };

    setDesignFile(designFile);
  }, []);

  const removeDesignFile = useCallback(() => {
    setDesignFile(null);
  }, []);

  // ── Editor action with undo/redo ──
  const applyEditorAction = useCallback((action: EditorAction): EditorActionResult => {
    setEditorState(prev => {
      const next = { ...prev };

      const v = action.value;
      switch (action.type) {
        case 'setScale': next.designScale = v as number; break;
        case 'setPositionX': next.designX = v as number; break;
        case 'setPositionY': next.designY = v as number; break;
        case 'setRotation': next.designRotation = v as number; break;
        case 'setOpacity': next.designOpacity = v as number; break;
        case 'setBrightness': next.brightness = v as number; break;
        case 'setContrast': next.contrast = v as number; break;
        case 'setSaturation': next.saturation = v as number; break;
        case 'setDropShadow': next.dropShadow = v as boolean; break;
        case 'setShadowOpacity': next.shadowOpacity = v as number; break;
        case 'setShadowBlur': next.shadowBlur = v as number; break;
        case 'setVignette': next.vignette = v as number; break;
        case 'setBackgroundBrightness': next.backgroundBrightness = v as number; break;
        case 'setTexture': next.texture = v as boolean; break;
        case 'setTextureOpacity': next.textureOpacity = v as number; break;
        case 'setReflection': next.reflection = v as boolean; break;
        case 'setReflectionOpacity': next.reflectionOpacity = v as number; break;
        case 'flipHorizontal': next.flipHorizontal = !prev.flipHorizontal; break;
        case 'flipVertical': next.flipVertical = !prev.flipVertical; break;
      }

      // Push to history (trim future if we undid)
      const history = historyRef.current.slice(0, historyIndexRef.current + 1);
      history.push(next);
      if (history.length > MAX_HISTORY) history.shift();
      historyRef.current = history;
      historyIndexRef.current = history.length - 1;

      return next;
    });

    return { success: true };
  }, []);

  const undo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--;
      setEditorState(historyRef.current[historyIndexRef.current]);
    }
  }, []);

  const redo = useCallback(() => {
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyIndexRef.current++;
      setEditorState(historyRef.current[historyIndexRef.current]);
    }
  }, []);

  const canUndo = historyIndexRef.current > 0;
  const canRedo = historyIndexRef.current < historyRef.current.length - 1;

  const resetEditor = useCallback(() => {
    const initial = createInitialState();
    setEditorState(initial);
    historyRef.current = [initial];
    historyIndexRef.current = 0;
  }, []);

  return {
    selectedScene,
    selectedCategory,
    designFile,
    editorState,
    isExporting,
    searchQuery,
    scenes: filteredScenes,
    allCategories: CATEGORIES,
    allProducts: PRODUCTS,
    canUndo,
    canRedo,
    handleCategoryChange,
    handleSceneSelect,
    handleFileUpload,
    removeDesignFile,
    applyEditorAction,
    setSearchQuery,
    setIsExporting,
    undo,
    redo,
    resetEditor,
  };
}
