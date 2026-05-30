import { ShieldCheck, Cpu, HardDrive, Eye } from 'lucide-react';

interface AboutSectionProps {
  theme: 'dark' | 'light';
}

export default function AboutSection({ theme }: AboutSectionProps) {
  const specs = [
    { icon: <Cpu className="text-zinc-500" size={18} />, title: 'R3D RAW & PRORES', desc: 'Symmetric digital workflow optimization.' },
    { icon: <ShieldCheck className="text-zinc-500" size={18} />, title: 'HDR COLOR GRADING', desc: 'DaVinci spectrum control up to 1000 nits.' },
    { icon: <HardDrive className="text-zinc-500" size={18} />, title: 'MODULAR GEOMETRY', desc: 'Cinema 4D structural simulations & physics builds.' },
    { icon: <Eye className="text-zinc-500" size={18} />, title: 'RHYTHMIC MATCH-CUTS', desc: 'Frame-perfect post production time edits.' },
  ];

  return (
    <section 
      id="credo" 
      className={`py-24 px-6 md:px-16 transition-colors duration-300 border-t ${
        theme === 'dark' ? 'bg-zinc-950/20 border-zinc-900' : 'bg-zinc-50/40 border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Creative Mission Statement */}
        <div className="col-span-1 lg:col-span-7 space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold block">
            01 // DESIGN CREDO
          </span>
          
          <h2 className={`text-2xl sm:text-4xl font-display font-light leading-snug tracking-tight ${
            theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900'
          }`}>
            "Every single frame is an architecture of light. When shadows tell stories, the observer stops scrolling and starts reflecting."
          </h2>

          <div className={`space-y-4 text-xs sm:text-sm font-sans leading-relaxed max-w-xl ${
            theme === 'dark' ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            <p>
              I am a specialized multidisciplinary visual director. I capture micro-expressions, sequence long take steadycam flights, and program kinetic typography rigs to convey distinct human sentiments.
            </p>
            <p>
              By structuring raw 8K rushes into precise, syncopated time beats, I remove editing waste while driving maximum focus retention. I do not dress screens; I create emotional canvases.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Specs Bento Widget */}
        <div className="col-span-1 lg:col-span-5">
          <div className={`border p-8 rounded-3xl space-y-6 shadow-xl transition-all ${
            theme === 'dark' 
              ? 'bg-zinc-950/80 border-zinc-900 shadow-black/40' 
              : 'bg-white border-zinc-200 shadow-zinc-200/40'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-zinc-505 uppercase tracking-wider block">
                TECHNICAL SPECSSTACK
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specs.map((spec, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-2xl border transition-colors ${
                    theme === 'dark'
                      ? 'bg-black/40 border-zinc-900/60 hover:bg-black/80'
                      : 'bg-zinc-50/50 border-zinc-200/60 hover:bg-zinc-50'
                  }`}
                >
                  <div className="mb-2">{spec.icon}</div>
                  <h4 className={`font-display text-xs font-bold uppercase tracking-wider ${
                    theme === 'dark' ? 'text-white' : 'text-zinc-950'
                  }`}>
                    {spec.title}
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                    {spec.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick software credentials line */}
            <div className="border-t border-zinc-900/60 dark:border-zinc-800/60 pt-4 flex items-center justify-between text-[10px] font-mono text-zinc-450 uppercase">
              <span>Primary Engine suite</span>
              <span>AE // C4D // DAVINCI // SONY FX3</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
