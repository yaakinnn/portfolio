import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Folder, Film, Scissors, Tv, Box } from 'lucide-react';
import { useWindowManager } from './hooks/useWindowManager';
import { WindowType, ProjectItem } from './types';
import { GlassWindow } from './components/GlassWindow';
import { DesktopIcon, Dock } from './components/DesktopComponents';
import { Laboratory } from './components/Laboratory';
import { ProjectGrid } from './components/ProjectGrid';

const InteractiveName = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const tx = useTransform(springX, (v) => (v - dimensions.width / 2) / 40);
  const ty = useTransform(springY, (v) => (v - dimensions.height / 2) / 40);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-2] hidden md:block overflow-hidden">
      {/* Background Subtle Gradient */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) => `radial-gradient(circle 400px at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 100%)`
          )
        }}
      />
      
      {/* Base Layer - Parallaxed */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div style={{ x: tx, y: ty }} className="relative">
          <h2 className="text-[8vw] font-bold tracking-[-0.07em] text-white/5 select-none text-center leading-[0.8] uppercase whitespace-nowrap">
            MOCHAMMAD<br />AINUL YAKIN
          </h2>
        </motion.div>
      </div>

      {/* Spotlight Layer - Pinned to Mouse with Fixed Container */}
      <motion.div 
        className="absolute inset-0 z-10 overflow-hidden"
        style={{ 
          clipPath: useTransform([springX, springY], ([x, y]) => `circle(200px at ${x}px ${y}px)`)
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div style={{ x: tx, y: ty }}>
            <h2 className="text-[8vw] font-bold tracking-[-0.07em] text-white/40 select-none text-center leading-[0.8] uppercase whitespace-nowrap">
              MOCHAMMAD<br />AINUL YAKIN
            </h2>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const { windows, openWindow, closeWindow, focusWindow, activeId } = useWindowManager();
  const [isMobile, setIsMobile] = useState(false);
  const [time, setTime] = useState(new Date());
  const desktopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit'
    });
  };

  const handleMediaFullScreen = (item: ProjectItem) => {
    openWindow(WindowType.MEDIA_FULLSCREEN, item.title, item);
  };

  const hasOpenWindow = windows.length > 0;

  return (
    <div 
      ref={desktopRef}
      className="relative w-full h-screen overflow-hidden selection:bg-white selection:text-black mesh-bg"
    >
      <InteractiveName />
      {/* OS Status Bar */}
      <AnimatePresence>
        {(!isMobile || !hasOpenWindow) && (
          <motion.div 
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            exit={{ y: -30 }}
            className="fixed top-0 left-0 right-0 h-7 bg-black/20 backdrop-blur-md flex justify-between items-center px-4 text-[10px] font-medium tracking-widest text-white/40 z-[2000] border-b border-white/5"
          >
            <div>ATELIER OS v1.0.4</div>
            <div className="uppercase">{formatDate(time)} • {formatTime(time)}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="pixelate" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feComponentTransfer>
              <feFuncR type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
              <feFuncG type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
              <feFuncB type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
            </feComponentTransfer>
            <feConvolveMatrix order="3" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0" preserveAlpha="true" />
          </filter>
        </defs>
      </svg>

      {/* Background Hero / Digital Atelier Identity */}
      <AnimatePresence>
        {(!isMobile || !hasOpenWindow) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-[100px] md:bottom-[120px] left-4 md:left-10 pointer-events-none z-0"
          >
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[15vw] md:text-[120px] font-extralight tracking-[-2px] md:tracking-[-5px] leading-[0.8] select-none text-white whitespace-nowrap"
            >
              VISUAL<br />STORYTELLER
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 md:mt-4 text-[10px] md:text-[14px] uppercase tracking-[0.3em] font-light text-white/80"
            >
              Motion Designer & Editor
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Works Tag */}
      <div className="absolute top-[60px] right-10 text-right z-5 pointer-events-none hidden md:block">
        <div className="text-[11px] opacity-30 uppercase tracking-[0.1em] mb-1">Selected Works</div>
        <div className="text-[24px] font-light tracking-tight">2026 PORTFOLIO</div>
      </div>

      {/* Desktop Grid */}
      <AnimatePresence>
        {(!isMobile || !hasOpenWindow) && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="grid grid-cols-2 lg:grid-cols-1 gap-4 p-8 pt-16 w-fit relative z-10"
          >
            <DesktopIcon 
              icon={Scissors} 
              label="Short-form" 
              onClick={() => openWindow(WindowType.FOLDER, "Short-form Content")} 
            />
            <DesktopIcon 
              icon={Tv} 
              label="Long-form" 
              onClick={() => openWindow(WindowType.FOLDER, "Long-form Editing")} 
            />
            <DesktopIcon 
              icon={Film} 
              label="Wedding" 
              onClick={() => openWindow(WindowType.FOLDER, "Wedding Visuals")} 
            />
            <DesktopIcon 
              icon={Box} 
              label="Motion & 3D" 
              onClick={() => openWindow(WindowType.FOLDER, "Motion/3D Design")} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Windows Overlay */}
      <AnimatePresence mode="popLayout">
        {windows.map((w) => (
          <GlassWindow 
            key={w.id} 
            window={w} 
            onClose={closeWindow} 
            onFocus={focusWindow}
          >
            <WindowContent window={w} onMediaOpen={handleMediaFullScreen} />
          </GlassWindow>
        ))}
      </AnimatePresence>

      {/* OS Dock */}
      <AnimatePresence>
        {(!isMobile || !hasOpenWindow) && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <Dock onLaunch={(type, title) => openWindow(type, title)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Noise/Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  );
}

const TerminalForm = () => {
  const [view, setView] = useState<'info' | 'form'>('info');

  return (
    <div className="p-6 font-mono text-[13px] h-full flex flex-col">
      <AnimatePresence mode="wait">
        {view === 'info' ? (
          <motion.div 
            key="info"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1"
          >
            <div className="opacity-80 leading-relaxed mb-8">
              <span className="text-white/40">guest@digital-atelier:~$</span> contact-me<br />
              <br />
              <span className="text-white/60">&gt; CHANNEL:</span> SECURE<br />
              <span className="text-white/60">&gt; EMAIL:</span> ATELIER@STUDIO.COM<br />
              <span className="text-white/60">&gt; IG:</span> @DIGITAL.ATELIER<br />
              <br />
              <span className="text-white/20 animate-pulse">_</span>
            </div>
            <div className="border-t border-white/5 pt-4 text-center">
              <button 
                onClick={() => setView('form')}
                className="text-[10px] uppercase tracking-[0.2em] border border-white/10 px-8 py-2 hover:bg-white hover:text-black transition-all"
              >
                Launch Mailer
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-4">
              <label className="text-[10px] uppercase tracking-widest text-white/30 block mb-1">From</label>
              <input 
                type="email" 
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/5 p-2 focus:border-white/20 outline-none text-[12px]"
              />
            </div>
            <div className="flex-1 flex flex-col mb-4">
              <label className="text-[10px] uppercase tracking-widest text-white/30 block mb-1">Message</label>
              <textarea 
                placeholder="Draft your proposal..."
                className="flex-1 w-full bg-white/5 border border-white/5 p-2 focus:border-white/20 outline-none text-[12px] resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setView('info')}
                className="flex-1 text-[9px] uppercase tracking-widest border border-white/5 px-2 py-3 hover:bg-white/5 transition-all opacity-40"
              >
                Cancel
              </button>
              <button 
                className="flex-1 text-[9px] uppercase tracking-widest bg-white text-black px-2 py-3 hover:bg-white/90 transition-all font-bold"
              >
                Transmit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WindowContent = ({ window, onMediaOpen }: { window: any; onMediaOpen: (item: ProjectItem) => void }) => {
  switch (window.type) {
    case WindowType.LAB:
      return <Laboratory />;
    case WindowType.MEDIA_FULLSCREEN:
      const item = window.content as ProjectItem;
      return (
        <div className="w-full h-full bg-black flex items-center justify-center relative group">
          <video 
            src={item.videoUrl} 
            autoPlay 
            controls 
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-10 left-10 p-6 glass max-w-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-white/60">{item.description}</p>
          </div>
        </div>
      );
    case WindowType.FOLDER:
      return <ProjectGrid category={window.title} onFullScreen={onMediaOpen} />;
    case WindowType.ABOUT:
      return (
        <div className="p-8 max-w-lg mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Designer of Motion.</h2>
          <p className="text-white/60 leading-relaxed mb-6 font-light">
            I craft immersive digital experiences at the intersection of videography and 3D space. 
            Blending the grit of raw cinema with the precision of procedural animation.
          </p>
          <div className="space-y-4 border-t border-white/10 pt-6">
            <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/40">
              <span>Origin</span>
              <span className="text-white">Earth // 2026</span>
            </div>
            <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/40">
              <span>Focus</span>
              <span className="text-white">CGI / Narrative / UX</span>
            </div>
            <div className="flex justify-between text-[11px] uppercase tracking-widest text-white/40">
              <span>Stack</span>
              <span className="text-white">Three.js / Blender / DaVinci</span>
            </div>
          </div>
        </div>
      );
    case WindowType.TERMINAL:
      return <TerminalForm />;
    default:
      return <div className="p-20 text-center text-white/20 uppercase tracking-widest text-[10px]">System Error: Null Content</div>;
  }
};
