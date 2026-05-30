import { useEffect, useRef } from 'react';

export default function CustomCursor({ theme }: { theme: 'dark' | 'light' }) {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const coordinates = useRef({ x: 0, y: 0, ringX: 0, ringY: 0 });
  const isHiddenRef = useRef(true);

  useEffect(() => {
    // Check if the device has a touch screen
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
      if (cursorRingRef.current) cursorRingRef.current.style.display = 'none';
      return;
    }

    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (isHiddenRef.current) {
        isHiddenRef.current = false;
        if (cursorDot) cursorDot.style.opacity = '1';
        if (cursorRing) cursorRing.style.opacity = '1';
      }

      coordinates.current.x = e.clientX;
      coordinates.current.y = e.clientY;

      if (cursorDot) {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseLeave = () => {
      isHiddenRef.current = true;
      if (cursorDot) cursorDot.style.opacity = '0';
      if (cursorRing) cursorRing.style.opacity = '0';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Dynamic scale and properties on hovering clickable items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'SELECT' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('a') !== null || 
        target.closest('button') !== null || 
        target.closest('.interactive-item') !== null;

      if (isClickable && cursorRing && cursorDot) {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursorRing.style.borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null || 
        target.closest('.interactive-item') !== null;

      if (isClickable && cursorRing && cursorDot) {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.borderColor = theme === 'dark' ? 'rgba(156, 163, 175, 0.35)' : 'rgba(17, 17, 17, 0.35)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Core animation loop for smooth trailing ring (using requestAnimationFrame)
    let animationFrameId: number;

    const lerpRing = () => {
      const dX = coordinates.current.x - coordinates.current.ringX;
      const dY = coordinates.current.y - coordinates.current.ringY;

      // Smooth follow decay rate
      coordinates.current.ringX += dX * 0.15;
      coordinates.current.ringY += dY * 0.15;

      if (cursorRing) {
        cursorRing.style.left = `${coordinates.current.ringX}px`;
        cursorRing.style.top = `${coordinates.current.ringY}px`;
      }

      animationFrameId = requestAnimationFrame(lerpRing);
    };

    animationFrameId = requestAnimationFrame(lerpRing);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <>
      {/* Centered microdot */}
      <div 
        ref={cursorDotRef} 
        id="custom-cursor-dot" 
        className={`fixed pointer-events-none z-50 w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 pointer-events-none hidden md:block select-none ${
          theme === 'dark' ? 'bg-white mix-blend-difference' : 'bg-black'
        }`}
      />
      
      {/* Outer follow circle */}
      <div 
        ref={cursorRingRef} 
        id="custom-cursor-ring" 
        className={`fixed pointer-events-none z-[49] w-11 h-11 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 transition-transform duration-100 ease-out pointer-events-none hidden md:block border select-none ${
          theme === 'dark' ? 'border-zinc-400/35' : 'border-zinc-900/35'
        }`}
      />
    </>
  );
}
