import { Play, ArrowDown } from 'lucide-react';
import { VIRTUAL_SHOWREEL_URL } from '../data';

interface HeroProps {
  theme: 'dark' | 'light';
}

export default function Hero({ theme }: HeroProps) {
  return (
    <section 
      id="hero" 
      className="relative w-full h-screen flex flex-col justify-end px-6 md:px-16 pb-20 md:pb-24 lg:pb-28 overflow-hidden z-10"
    >
      {/* Background Loop Showreel Video */}
      <div className="absolute inset-0 z-0 bg-zinc-950">
        <video 
          className="w-full h-full object-cover opacity-50 xl:opacity-60 transition-transform duration-[12s] ease-out hover:scale-105 pointer-events-none select-none"
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={VIRTUAL_SHOWREEL_URL} type="video/mp4" />
        </video>
        
        {/* Dynamic Dark gradient scrim overlay to maintain high text contrast */}
        <div className={`absolute inset-0 z-10 bg-gradient-to-t transition-colors duration-500 ${
          theme === 'dark' 
            ? 'from-zinc-950 via-zinc-950/45 to-zinc-900/40' 
            : 'from-white via-white/40 to-white/10'
        }`} />
      </div>

      {/* Main Copy */}
      <div className="relative z-20 max-w-5xl space-y-6 animate-fade-in-up">
        {/* Cinematic microbadge */}
        <div className={`inline-flex items-center gap-2.5 px-3 py-1.5 backdrop-blur-md rounded-full text-[10px] font-mono tracking-widest uppercase ${
          theme === 'dark'
            ? 'bg-white/10 text-neutral-300 ring-1 ring-white/10'
            : 'bg-zinc-950/10 text-zinc-900 ring-1 ring-zinc-950/10'
        }`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          MULTIDISCIPLINES // DIRECTING &amp; CGI
        </div>

        {/* Cinematic typography paired heading */}
        <h1 className={`text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-black font-display tracking-tighter leading-[0.9] ${
          theme === 'dark' ? 'text-white' : 'text-zinc-950'
        }`}>
          CRAFTING UNTAMED <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 via-neutral-100 to-white dark:from-zinc-500 dark:via-zinc-300 dark:to-neutral-100">
            VISUAL WORLDS.
          </span>
        </h1>

        {/* Elegant supportive description */}
        <p className={`text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed ${
          theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'
        }`}>
          High-performance cinematic director, video editor, and macro photographer. Synthesizing light dynamics with vector typography coordinates to build high-retaining visual digital installations.
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-wrap gap-4 pt-4 items-center">
          <a 
            href="#portfolio" 
            className={`group border uppercase tracking-widest text-[11px] font-mono font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-all interactive-item shadow-lg ${
              theme === 'dark'
                ? 'bg-white text-zinc-950 border-white hover:bg-zinc-200 hover:border-zinc-200 shadow-white/5'
                : 'bg-zinc-950 text-white border-zinc-950 hover:bg-zinc-800 shadow-black/5'
            }`}
          >
            VIEW PORTFOLIO
            <Play size={10} className="fill-current transform group-hover:translate-x-1 duration-200" />
          </a>

          <a 
            href="#exporter" 
            className={`border uppercase tracking-widest text-[11px] font-mono font-semibold py-4 px-6 rounded-full transition-colors flex items-center gap-2 interactive-item ${
              theme === 'dark'
                ? 'border-white/20 text-white hover:border-white hover:bg-white/5'
                : 'border-zinc-300 text-zinc-900 hover:border-zinc-800 hover:bg-zinc-50'
            }`}
          >
            STANDALONE SYSTEM
          </a>
        </div>
      </div>

      {/* Floating technical coordinates metrics footer */}
      <div className={`absolute bottom-6 right-6 lg:right-12 z-20 flex items-center gap-3 text-[10px] font-mono select-none ${
        theme === 'dark' ? 'text-zinc-500' : 'text-zinc-450'
      }`}>
        <span className="w-2 h-2 rounded-full bg-amber-500/80 animate-pulse"></span>
        <span>ACTIVE RUNTIME // 90S SHOWREEL COAX SPEC</span>
        <ArrowDown size={12} className="animate-bounce" />
      </div>
    </section>
  );
}
