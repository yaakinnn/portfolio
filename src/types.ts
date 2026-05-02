export enum WindowType {
  FOLDER = 'FOLDER',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  LAB = 'LAB',
  TERMINAL = 'TERMINAL',
  ABOUT = 'ABOUT',
  MEDIA_FULLSCREEN = 'MEDIA_FULLSCREEN'
}

export interface WindowState {
  id: string;
  type: WindowType;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  initialPos: { x: number; y: number };
  content?: any;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
}
