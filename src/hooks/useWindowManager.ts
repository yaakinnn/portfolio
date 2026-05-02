import { useState, useCallback } from 'react';
import { WindowState, WindowType } from '../types';

export const useWindowManager = () => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const openWindow = useCallback((type: WindowType, title: string, content?: any) => {
    const id = `${type}-${Date.now()}`;
    setWindows((prev) => {
      // If already open (by type/title combo), just focus it
      const existing = prev.find(w => w.type === type && w.title === title);
      if (existing) {
        setActiveId(existing.id);
        return prev;
      }

      const nextZ = Math.max(100, ...prev.map(w => w.zIndex)) + 1;
      const newWindow: WindowState = {
        id,
        type,
        title,
        isOpen: true,
        isMinimized: false,
        zIndex: nextZ,
        initialPos: { x: 100 + prev.length * 30, y: 100 + prev.length * 30 },
        content
      };
      
      setActiveId(id);
      return [...prev, newWindow];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter(w => w.id !== id));
    if (activeId === id) setActiveId(null);
  }, [activeId]);

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) => {
      const nextZ = Math.max(100, ...prev.map(w => w.zIndex)) + 1;
      return prev.map(w => w.id === id ? { ...w, zIndex: nextZ } : w);
    });
    setActiveId(id);
  }, []);

  return { windows, openWindow, closeWindow, focusWindow, activeId };
};
