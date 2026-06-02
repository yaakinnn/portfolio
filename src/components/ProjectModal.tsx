import { useState } from 'react';
import { Project } from '../data';
import { 
  X, 
  Share2, 
  Film, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Image as ImageIcon 
} from 'lucide-react';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  theme: 'dark' | 'light';
  projectsList: Project[];
  saveProjectsList: (newList: Project[]) => void;
}

export default function ProjectModal({ 
  project, 
  onClose, 
  theme 
}: ProjectModalProps) {
  if (!project) return null;

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  // Use defined mediaUrls or default fallback to single main project image
  const mediaUrls = project.mediaUrls || [project.imageUrl];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? mediaUrls.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === mediaUrls.length - 1 ? 0 : prev + 1));
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}?project=${project.id}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy share link:', err);
      });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in"
      id="modal-container-backdrop"
    >
      {/* Absolute blur background backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md cursor-pointer" 
        id="modal-backdrop-trigger"
      />

      {/* Main viewport modal dialogue */}
      <div 
        className={`relative w-full max-w-5xl rounded-3xl overflow-hidden border flex flex-col justify-between max-h-[92vh] shadow-2xl transition-all duration-310 scale-in-center ${
          theme === 'dark' 
            ? 'bg-neutral-950 border-neutral-900/90 text-white shadow-black/80' 
            : 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-950/20'
        }`}
        id="modal-dialog-box"
      >
        
        {/* Floating Close button in high visual contrast */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 z-40 bg-black/60 hover:bg-amber-500 text-white p-2.5 rounded-full backdrop-blur-md cursor-pointer transition-all duration-200 hover:scale-105 border border-white/10"
          aria-label="Tutup Console"
          id="btn-close-modal"
        >
          <X size={15} />
        </button>

        <div className="overflow-y-auto flex-1 scrollbar-thin">
          
          {/* Cinematic Aspect-Ratio Adjusted Header Block */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[21/7] max-h-[300px] bg-neutral-950 select-none overflow-hidden" id="modal-project-cover">
            {project.videoSrc ? (
              <video
                src={project.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-80"
              />
            ) : (
              <img
                src={project.bannerUrl || project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80 animate-fade-in"
              />
            )}
            
            {/* Dark vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40 pointer-events-none" />
            
            {/* Badges Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div className="space-y-1">
                <span className="font-mono text-amber-500 text-[10px] sm:text-xs uppercase tracking-widest block font-bold">
                  {project.client} // {project.category}
                </span>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold font-display text-white tracking-tight leading-none drop-shadow-md">
                  {project.title}
                </h2>
              </div>
            </div>
          </div>

          {/* New Editorial Layout Grid */}
          <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8" id="modal-details-grid">
            
            {/* Left Column (Main Context): Narasi & Visual Gallery */}
            <div className="col-span-1 lg:col-span-8 space-y-8" id="col-project-main">
              
              {/* Concept Narrative */}
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase text-zinc-500 tracking-wider flex items-center gap-2">
                  <Sparkles size={13} className="text-amber-500" />
                  01 // KONSEP & PROSES KREATIF
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed font-sans ${
                  theme === 'dark' ? 'text-zinc-300' : 'text-zinc-750'
                }`}>
                  {project.description || 'Deskripsi narasi proyek sinematik belum diunggah untuk pameran ini.'}
                </p>
              </div>

              {/* Visual Asset Slider Showcase (Replacing complex parsed embeds) */}
              <div className="space-y-4 pt-2">
                <h3 className="font-mono text-xs uppercase text-zinc-500 tracking-wider flex items-center gap-2">
                  <Film size={13} className="text-amber-500" />
                  02 // MULTIMEDIA WORK SHOWCASE
                </h3>
                
                {/* Easy Direct Carousel */}
                <div className={`relative aspect-video w-full rounded-2xl overflow-hidden border ${
                  theme === 'dark' ? 'bg-zinc-950 border-neutral-900 shadow-2xl shadow-black/30' : 'bg-zinc-50 border-zinc-200 shadow-md'
                }`}>
                  {mediaUrls && mediaUrls.length > 0 ? (
                    <div className="relative w-full h-full group">
                      {/* Active multimedia item */}
                      {mediaUrls[activeIdx].match(/\.(mp4|webm|mov|ogg)/i) ? (
                        <video 
                          src={mediaUrls[activeIdx]} 
                          controls
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-contain bg-black"
                        />
                      ) : (
                        <img 
                          src={mediaUrls[activeIdx]} 
                          alt="Gallery item"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain bg-black/85 animate-fade-in"
                        />
                      )}

                      {/* Navigation Overlays */}
                      {mediaUrls.length > 1 && (
                        <>
                          <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/55 hover:bg-amber-500/90 text-white backdrop-blur-sm cursor-pointer transition-all duration-200"
                            title="Sebelumnya"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/55 hover:bg-amber-500/90 text-white backdrop-blur-sm cursor-pointer transition-all duration-200"
                            title="Selanjutnya"
                          >
                            <ChevronRight size={16} />
                          </button>

                          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-[9px] font-mono text-neutral-300">
                            {activeIdx + 1} / {mediaUrls.length}
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-2">
                      <ImageIcon size={28} className="text-zinc-650 opacity-40 animate-pulse" />
                      <p className="text-xs font-mono tracking-wider">TIDAK ADA SOURCE MEDIA LAIN</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column (Side Panel): Spesifikasi Metadata */}
            <div className="col-span-1 lg:col-span-4 space-y-6 lg:border-l lg:border-zinc-550/10 lg:pl-8" id="col-project-specs">
              <h3 className="font-mono text-xs uppercase text-zinc-500 tracking-wider">
                03 // DATA SPESIFIKASI KARYA
              </h3>

              <div className="grid grid-cols-1 gap-4 text-xs font-mono">
                {/* Specific elements */}
                <div className={`p-4 rounded-xl space-y-1 ${
                  theme === 'dark' ? 'bg-zinc-900/40' : 'bg-zinc-100/60'
                }`}>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold">Client / Producer</span>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{project.client}</p>
                </div>

                <div className={`p-4 rounded-xl space-y-1 ${
                  theme === 'dark' ? 'bg-zinc-900/40' : 'bg-zinc-100/60'
                }`}>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold">My Creative Role</span>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{project.role}</p>
                </div>

                <div className={`p-4 rounded-xl space-y-1 ${
                  theme === 'dark' ? 'bg-zinc-900/40' : 'bg-zinc-100/60'
                }`}>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold">Release Date</span>
                  <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{project.date}</p>
                </div>

                {project.duration && (
                  <div className={`p-4 rounded-xl space-y-1 ${
                    theme === 'dark' ? 'bg-zinc-900/40' : 'bg-zinc-100/60'
                  }`}>
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Reel Duration</span>
                    <p className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>{project.duration}</p>
                  </div>
                )}
              </div>

              {/* Tags panel */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase block">
                  SOFTWARE SPECS USED
                </span>
                <div className="flex flex-wrap gap-1.5 font-mono">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className={`px-2.5 py-1 rounded text-[10px] tracking-wide ${
                        theme === 'dark' 
                          ? 'bg-zinc-900 text-zinc-350 border border-zinc-900' 
                          : 'bg-zinc-100/80 text-zinc-700 border border-zinc-200'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share & Quick Link */}
              <div className="space-y-3 pt-4 border-t border-zinc-500/10">
                <button
                  onClick={handleShare}
                  className={`w-full font-mono py-3 rounded-full flex items-center justify-center gap-2 text-2xs uppercase tracking-widest font-bold transition-all cursor-pointer ${
                    copied 
                      ? 'bg-emerald-600 text-white' 
                      : theme === 'dark'
                        ? 'bg-white text-zinc-950 hover:bg-zinc-250'
                        : 'bg-zinc-950 text-white hover:bg-zinc-800'
                  }`}
                >
                  <Share2 size={12} />
                  {copied ? 'LINK DETAIL DI-COPY' : 'COPY SHAREABLE LINK'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer HUD */}
        <div className={`p-4 border-t flex items-center justify-between text-[10px] font-mono uppercase ${
          theme === 'dark' ? 'border-zinc-900 bg-neutral-950 text-zinc-500' : 'border-zinc-200 bg-zinc-50/85 text-zinc-600'
        }`} id="modal-footer-hud">
          <span className="truncate pr-4">VIEWING PORTFOLIO DISSECTION DECK // ACTIVE CONSOLE</span>
          <button 
            onClick={onClose}
            className="text-amber-500 font-bold hover:underline cursor-pointer shrink-0 transition-colors hover:text-amber-600"
            id="btn-dismiss-hud"
          >
            DISMISS DECK
          </button>
        </div>

      </div>
    </div>
  );
}
