import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { X } from 'lucide-react';
import { WindowState, WindowType } from '../types';
import { useState, useEffect } from 'react';

interface GlassWindowProps {
  window: WindowState;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  children: React.ReactNode;
}

export const GlassWindow = ({ window: wState, onClose, onFocus, children }: GlassWindowProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const x = useMotionValue(wState.initialPos.x);
  const y = useMotionValue(wState.initialPos.y);
  
  const velocityX = useMotionValue(0);
  const blur = useTransform(velocityX, [-200, 0, 200], [4, 0, 4]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isMediaWindow = wState.type === WindowType.MEDIA_FULLSCREEN;

  return (
    <motion.div
      drag={!isMobile && !isMediaWindow}
      dragMomentum={false}
      x={isMobile || isMediaWindow ? 0 : x}
      y={isMobile || isMediaWindow ? 0 : y}
      onDrag={(_, info) => {
        velocityX.set(info.velocity.x);
      }}
      onDragEnd={() => velocityX.set(0)}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        x: isMobile || isMediaWindow ? 0 : undefined,
        y: isMobile || isMediaWindow ? 0 : undefined,
        width: isMobile || isMediaWindow ? '100%' : undefined,
        height: isMobile || isMediaWindow ? '100%' : undefined,
        top: isMobile || isMediaWindow ? 0 : undefined,
        left: isMobile || isMediaWindow ? 0 : undefined,
        filter: `blur(0px)`,
        transition: { type: 'spring', damping: 25, stiffness: 200 }
      }}
      whileDrag={{ 
        scale: 1.02,
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        zIndex: 9999
      }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      onPointerDown={() => onFocus(wState.id)}
      style={{ 
        zIndex: wState.zIndex,
        filter: useTransform(blur, b => `blur(${b}px)`),
        position: isMobile || isMediaWindow ? 'fixed' : 'absolute',
        borderRadius: isMobile || isMediaWindow ? 0 : undefined
      }}
      className={`glass shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden ${
        isMobile || isMediaWindow ? 'w-full h-full inset-0' : 'min-w-[320px] min-h-[200px] rounded-xl'
      }`}
    >
      {/* Header */}
      <div className={`h-10 flex items-center justify-between px-4 bg-white/5 border-b border-white/5 ${isMobile || isMediaWindow ? '' : 'cursor-grab active:cursor-grabbing'}`}>
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 mr-4">
            <button 
              onClick={(e) => { e.stopPropagation(); onClose(wState.id); }}
              className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 flex items-center justify-center group transition-all active:scale-90"
            >
              <X className={`w-2 h-2 text-black transition-opacity ${isMobile || isMediaWindow ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            </button>
            {!isMobile && (
              <>
                <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] opacity-90" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] opacity-90" />
              </>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-widest text-white/30 uppercase select-none">
            {wState.title}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-black/20 custom-scrollbar">
        {children}
      </div>
    </motion.div>
  );
};
