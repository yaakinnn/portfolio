import { useState, FormEvent } from 'react';
import { Send, MapPin, Instagram, Youtube, Linkedin, Film } from 'lucide-react';

interface FooterSectionProps {
  theme: 'dark' | 'light';
}

export default function FooterSection({ theme }: FooterSectionProps) {
  const [formData, setFormData] = useState({ identity: '', budget: '$5k - $15k Campaign', brief: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ identity: '', budget: '$5k - $15k Campaign', brief: '' });
    }, 3000);
  };

  const socials = [
    { label: 'VIMEO // @FC_REEL', icon: <Film size={12} />, href: '#' },
    { label: 'INSTAGRAM // @FC_CREATIVES', icon: <Instagram size={12} />, href: '#' },
    { label: 'YOUTUBE // @FC_CINEMATIC', icon: <Youtube size={12} />, href: '#' },
    { label: 'LINKEDIN // @FC_STUDIOS', icon: <Linkedin size={12} />, href: '#' },
  ];

  return (
    <footer 
      id="contact" 
      className={`py-24 px-6 md:px-16 transition-colors duration-300 border-t ${
        theme === 'dark' ? 'bg-zinc-950/60 text-white border-zinc-900' : 'bg-zinc-50 text-zinc-950 border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Contact info pitch message */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          <span className="font-mono text-zinc-500 text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            05 // INTERACTIVE CONTACT CONSOLE
          </span>
          
          <h2 className={`text-4xl sm:text-6xl lg:text-[5.5rem] font-bold font-display tracking-tighter leading-none`}>
            Let's orchestrate <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-500 via-neutral-100 to-amber-500">
              some frames together.
            </span>
          </h2>

          <p className={`text-xs sm:text-sm max-w-xl leading-relaxed ${
            theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'
          }`}>
            Ready to book a 90-second animatic test sync or lock in custom post-grading sequences? Choose your project scope using the adjacent synchronized terminal deck, and dispatch a signal. Currently orchestrating clips globally.
          </p>

          {/* Connected Social credentials spec */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg pt-6 font-mono text-3xs sm:text-2xs text-zinc-505 uppercase">
            {socials.map((soc, i) => (
              <a 
                key={i} 
                href={soc.href} 
                className={`flex items-center gap-2 py-3 px-4 border rounded-xl hover:scale-[1.02] transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'border-zinc-900 bg-zinc-950 hover:bg-zinc-900 text-zinc-400 hover:text-white' 
                    : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {soc.icon}
                <span>{soc.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Sync submission terminal form */}
        <div className="col-span-1 lg:col-span-4 self-stretch flex flex-col">
          <div className={`border p-8 rounded-3xl flex-1 flex flex-col justify-between shadow-xl ${
            theme === 'dark' 
              ? 'bg-black/40 border-zinc-900 shadow-black/80' 
              : 'bg-white border-zinc-200 shadow-zinc-100'
          }`}>
            <div className="space-y-1.5 mb-6">
              <h3 className={`font-display font-bold text-base uppercase ${
                theme === 'dark' ? 'text-white' : 'text-zinc-950'
              }`}>
                Visual Sync terminal
              </h3>
              <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider block">
                Direct sequence routing pipeline // 256bits
              </p>
            </div>

            {submitted ? (
              <div className="my-auto text-center py-10 space-y-3 animate-fade-in">
                <span className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto text-sm animate-bounce">
                  ✓
                </span>
                <p className="font-display font-medium text-xs uppercase text-emerald-500">
                  TRANSMISSION DISPATCHED SENSORY
                </p>
                <p className="text-[10px] text-zinc-450 font-mono leading-relaxed max-w-[200px] mx-auto">
                  Sync stream matched sequentially. We will response in 24 frame periods.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                <div>
                  <label className="block text-[9px] text-zinc-500 uppercase font-mono mb-1.5">
                    Your Pitch Identity
                  </label>
                  <input 
                    type="text" 
                    value={formData.identity}
                    onChange={(e) => setFormData({ ...formData, identity: e.target.value })}
                    placeholder="e.g. Lead Producer at Audi Studio" 
                    className={`w-full border rounded-lg p-3 text-xs focus:outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-zinc-950 border-zinc-900 text-white focus:border-zinc-650'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-950 focus:border-zinc-500'
                    }`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[9px] text-zinc-500 uppercase font-mono mb-1.5">
                    Timeline Budget Scope
                  </label>
                  <select 
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={`w-full border rounded-lg p-3 text-xs focus:outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-zinc-950 border-zinc-900 text-zinc-400 focus:border-zinc-650'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-700 focus:border-zinc-500'
                    }`}
                  >
                    <option>$5k - $15k Campaign</option>
                    <option>$15k - $50k Feature Spec</option>
                    <option>$50k+ Cinematic Production</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] text-zinc-500 uppercase font-mono mb-1.5">
                    Pitch Deck Frame Brief
                  </label>
                  <textarea 
                    value={formData.brief}
                    onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                    placeholder="Summary of desired sequence storyboards / lenses..." 
                    rows={3}
                    className={`w-full border rounded-lg p-3 text-xs focus:outline-none transition-colors ${
                      theme === 'dark'
                        ? 'bg-zinc-950 border-zinc-900 text-white focus:border-zinc-650'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-950 focus:border-zinc-500'
                    }`}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className={`w-full font-semibold uppercase tracking-wider text-[10px] p-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer interactive-item ${
                    theme === 'dark'
                      ? 'bg-white text-zinc-950 hover:bg-zinc-250'
                      : 'bg-zinc-950 text-white hover:bg-zinc-800'
                  }`}
                >
                  <Send size={11} />
                  <span>INITIATE SYNCHRONIZATION</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Coordinate systems and rights */}
      <div className={`max-w-7xl mx-auto border-t mt-20 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono gap-4 select-none ${
        theme === 'dark' ? 'border-zinc-900 text-zinc-505' : 'border-zinc-200 text-zinc-450'
      }`}>
        <div className="flex items-center gap-1">
          <MapPin size={11} className="text-amber-500/80 animate-pulse" />
          <span>COORDINATES: LAT: 35.6762° N // LON: 139.6503° E (TOKYO HQ)</span>
        </div>
        <span>© 2026 CINEMATIC FILM WORKSPACE. ALL PRODUCTION STANDS VALID.</span>
      </div>
    </footer>
  );
}
