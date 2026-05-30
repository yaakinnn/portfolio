import { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export default function Navbar({ theme, setTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { label: 'Reel', href: '#hero' },
    { label: 'Credo', href: '#credo' },
    { label: 'Gallery', href: '#portfolio' },
    { label: 'Connect', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 border-b transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black/85 border-zinc-900/60 text-white backdrop-blur-md' 
        : 'bg-white/85 border-zinc-200/60 text-zinc-900 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-linear-to-tr from-zinc-700 to-zinc-900 flex items-center justify-center text-white font-mono font-bold text-xs shadow-md shadow-black/10">
            FC
          </div>
          <span className="font-display font-bold text-base uppercase tracking-widest">
            Film &amp; Motion
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-mono font-medium text-zinc-400">
          {navLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href}
              className={`hover:text-amber-500 transition-colors ${
                theme === 'dark' ? 'hover:text-white' : 'hover:text-zinc-950'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Custom Day/Night Toggle Button */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              theme === 'dark' 
                ? 'border-zinc-800 hover:border-zinc-500 hover:bg-zinc-900/50 text-amber-400' 
                : 'border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100 text-zinc-500'
            }`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          {/* Quick Connect CTA */}
          <a 
            href="#contact" 
            className={`hidden sm:inline-block px-4 py-2 rounded-full font-mono font-semibold text-[10px] uppercase tracking-wider transition-all shadow-md ${
              theme === 'dark'
                ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-white/5'
                : 'bg-zinc-950 text-white hover:bg-zinc-800 shadow-black/5'
            }`}
          >
            BOOK SYNC
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-md hover:bg-zinc-500/10 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t py-6 px-6 space-y-4 animate-fade-in ${
          theme === 'dark' ? 'bg-black border-zinc-900' : 'bg-white border-zinc-200'
        }`}>
          <div className="flex flex-col gap-4 text-xs font-mono uppercase tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-1 ${
                  theme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold py-2.5 rounded-full"
            >
              BOOK SYNC
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
