import { useState, useEffect, FormEvent } from 'react';
import { 
  X, 
  Film, 
  Activity, 
  Sliders, 
  Calendar, 
  Link as LinkIcon, 
  Plus, 
  Trash2, 
  ExternalLink, 
  RefreshCw, 
  Sparkles, 
  Youtube, 
  Instagram, 
  FileText, 
  Info,
  Layers,
  Image as ImageIcon,
  Lock,
  Unlock,
  Share2
} from 'lucide-react';
import { Project } from '../data';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  theme: 'dark' | 'light';
  projectsList: Project[];
  saveProjectsList: (newList: Project[]) => void;
}

interface MediaLink {
  id: string;
  url: string;
  type: 'youtube' | 'instagram' | 'googledrive' | 'direct' | 'unknown';
  embedUrl: string;
  title: string;
}

// Robust Link Parser for YouTube, Instagram, Google Drive, and Direct assets
function parseMediaLink(url: string, customTitle?: string): MediaLink {
  const trimmed = url.trim();
  let type: 'youtube' | 'instagram' | 'googledrive' | 'direct' | 'unknown' = 'unknown';
  let embedUrl = '';
  let title = customTitle || 'Media Asset';

  // 1. YouTube Matches
  const ytReg = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/ ]{11})/;
  const ytMatch = trimmed.match(ytReg);
  if (ytMatch) {
    type = 'youtube';
    embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
    title = customTitle || 'YouTube Video';
    return { id: Math.random().toString(), url: trimmed, type, embedUrl, title };
  }

  // 2. Instagram Matches
  const igReg = /(?:instagram\.com\/(?:p|reel)\/)([^/?#&]+)/;
  const igMatch = trimmed.match(igReg);
  if (igMatch) {
    type = 'instagram';
    embedUrl = `https://www.instagram.com/p/${igMatch[1]}/embed/`;
    title = customTitle || 'Instagram Post';
    return { id: Math.random().toString(), url: trimmed, type, embedUrl, title };
  }

  // 3. Google Drive Matches
  const gdReg = /(?:drive\.google\.com\/)(?:file\/d\/|open\?id=)([^/?#&]+)/;
  const gdMatch = trimmed.match(gdReg);
  if (gdMatch) {
    type = 'googledrive';
    embedUrl = `https://drive.google.com/file/d/${gdMatch[1]}/preview`;
    title = customTitle || 'Google Drive File';
    return { id: Math.random().toString(), url: trimmed, type, embedUrl, title };
  }

  // 4. Direct video or image links
  if (/\.(jpeg|jpg|gif|png|webp|svg)/i.test(trimmed) || trimmed.includes('unsplash.com')) {
    type = 'direct';
    embedUrl = trimmed;
    title = customTitle || 'Direct Image';
  } else if (/\.(mp4|webm|ogg|mov)/i.test(trimmed)) {
    type = 'direct';
    embedUrl = trimmed;
    title = customTitle || 'Direct Video';
  } else {
    // Fallback as direct
    type = 'direct';
    embedUrl = trimmed;
    title = customTitle || 'Custom Media';
  }

  return { id: Math.random().toString(), url: trimmed, type, embedUrl, title };
}

export default function ProjectModal({ 
  project, 
  onClose, 
  theme,
  projectsList,
  saveProjectsList
}: ProjectModalProps) {
  if (!project) return null;

  // Local storage prefix
  const storageKey = `portfolio-project-media-${project.id}`;

  const [mediaList, setMediaList] = useState<MediaLink[]>([]);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [newUrl, setNewUrl] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleShareLink = () => {
    const shareUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?project=${project.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Fallback in case permission is denied (or in some sandboxed iframes)
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed'; // Avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Bisa disalin manual:', shareUrl);
      }
      document.body.removeChild(textArea);
    });
  };

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('portfolio-owner-admin-mode') === 'true';
  });
  const [passcode, setPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string>('');
  const [showPasscodeForm, setShowPasscodeForm] = useState<boolean>(false);

  const handleUnlockAdmin = (e: FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'yakin100') {
      setIsAdmin(true);
      localStorage.setItem('portfolio-owner-admin-mode', 'true');
      setPasscode('');
      setPasscodeError('');
      setShowPasscodeForm(false);
    } else {
      setPasscodeError('Passcode salah! Silakan coba dengan yakin100');
    }
  };

  const handleLockAdmin = () => {
    setIsAdmin(false);
    localStorage.setItem('portfolio-owner-admin-mode', 'false');
  };

  // Sourced suggestions to help user play around easily
  const devSuggestions = [
    {
      title: 'Cinematic Sunset Nature',
      url: 'https://www.youtube.com/watch?v=EngW7tLk6R8'
    },
    {
      title: 'Studio Lighting Setup Post',
      url: 'https://www.instagram.com/p/Ct9uF9XMcV3/'
    },
    {
      title: 'Google Drive Asset Preview',
      url: 'https://drive.google.com/file/d/1t_2eWp_fD-1z1N_hGj_H5a2gU8Hnpx3Y/view?usp=sharing'
    }
  ];

  // Load from local storage or use defaults
  useEffect(() => {
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      try {
        setMediaList(JSON.parse(cached));
      } catch (e) {
        // Fallback to defaults
        loadDefaultLinks();
      }
    } else {
      loadDefaultLinks();
    }
    setActiveMediaIndex(0);
    setNewUrl('');
    setNewTitle('');
    setFormError('');
    setCopied(false);
  }, [project.id]);

  const loadDefaultLinks = () => {
    const list: MediaLink[] = [];
    if (project.mediaLinks) {
      project.mediaLinks.forEach((link, i) => {
        let name = '';
        if (link.includes('youtube') || link.includes('youtu.be')) name = `Cinematic Showcase #${i + 1}`;
        else if (link.includes('instagram')) name = `Instagram Visual Reference`;
        else if (link.includes('drive.google')) name = `Google Drive Resource`;
        list.push(parseMediaLink(link, name));
      });
    }
    setMediaList(list);
  };

  const saveMediaList = (list: MediaLink[]) => {
    setMediaList(list);
    localStorage.setItem(storageKey, JSON.stringify(list));
  };

  const handleAddLink = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!newUrl.trim()) return;

    try {
      const parsed = parseMediaLink(newUrl, newTitle.trim() || undefined);
      const updated = [...mediaList, parsed];
      saveMediaList(updated);
      setActiveMediaIndex(updated.length - 1);
      setNewUrl('');
      setNewTitle('');
      setFormError('');
    } catch (err) {
      setFormError('Failed to parse this URL. Please verify its format.');
    }
  };

  const handleRemoveLink = (indexToRemove: number) => {
    const updated = mediaList.filter((_, i) => i !== indexToRemove);
    saveMediaList(updated);
    if (activeMediaIndex >= updated.length) {
      setActiveMediaIndex(Math.max(0, updated.length - 1));
    }
  };

  const resetToDefault = () => {
    loadDefaultLinks();
    setActiveMediaIndex(0);
  };

  const injectSuggestion = (sug: { title: string; url: string }) => {
    const parsed = parseMediaLink(sug.url, sug.title);
    // Avoid duplicates
    if (mediaList.some(item => item.url === parsed.url)) {
      setFormError('This link already exists in your showcase!');
      return;
    }
    const updated = [...mediaList, parsed];
    saveMediaList(updated);
    setActiveMediaIndex(updated.length - 1);
    setFormError('');
  };

  const activeMedia = mediaList[activeMediaIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-md overflow-hidden animate-fade-in" id="project-viewport-overlay">
      
      {/* Responsive Core Card */}
      <div 
        className={`w-full max-w-5xl rounded-3xl border overflow-hidden shadow-2xl relative flex flex-col h-[94vh] sm:h-[90vh] md:h-[86vh] max-h-[850px] transition-all duration-300 ${
          theme === 'dark' 
            ? 'bg-zinc-950 border-zinc-900 text-white shadow-black/80' 
            : 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-200/40'
        }`}
        id="project-detail-card"
      >
        {/* Top Floating Action Bar containing Share & Close Actions */}
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-40 flex items-center gap-2">
          {/* Delete Project button if Admin */}
          {isAdmin && (
            <button
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin menghapus project ini dari gallery?')) {
                  const filtered = projectsList.filter(p => p.id !== project.id);
                  saveProjectsList(filtered);
                  onClose();
                }
              }}
              className="p-2 sm:p-2.5 rounded-full border cursor-pointer hover:scale-105 transition-all duration-200 flex items-center gap-1.5 focus:outline-none bg-red-500/10 border-red-500/30 hover:border-red-500 text-red-400 hover:bg-red-600 hover:text-white backdrop-blur-md shadow-md"
              title="Hapus Project Ini"
              id="btn-modal-delete-project"
            >
              <Trash2 size={12} />
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-0.5">
                Hapus Project
              </span>
            </button>
          )}

          {/* Share/Copy link of this specific project */}
          <button
            onClick={handleShareLink}
            className={`p-2 sm:p-2.5 rounded-full border cursor-pointer hover:scale-105 transition-all duration-200 flex items-center gap-1.5 focus:outline-none backdrop-blur-md shadow-md ${
              copied
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 font-semibold'
                : theme === 'dark'
                  ? 'bg-black/60 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500'
                  : 'bg-zinc-100/90 border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:border-zinc-400'
            }`}
            title="Salin Link Shareable"
            id="btn-modal-share-link"
          >
            <Share2 size={13} className={copied ? 'scale-110 transition-transform' : ''} />
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-0.5">
              {copied ? 'Tersalin' : 'Bagikan Link'}
            </span>
          </button>

          <button
            onClick={onClose}
            className={`p-2 sm:p-2.5 rounded-full border cursor-pointer hover:scale-105 transition-all duration-200 focus:outline-none backdrop-blur-md shadow-md ${
              theme === 'dark'
                ? 'bg-black/60 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-500'
                : 'bg-zinc-100/90 border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:border-zinc-400'
            }`}
            aria-label="Close Modal"
            id="btn-modal-close"
          >
            <X size={13} />
          </button>
        </div>

        {/* Scrollable Content Container (Prevents clipping across screens) */}
        <div className="flex-1 overflow-y-auto scroll-smooth min-h-0" id="modal-scroller-track">
          
          {/* Cinematic Aspect-Ratio Adjusted Header Block */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[21/7] max-h-[280px] bg-neutral-900 select-none overflow-hidden" id="modal-project-cover">
            {project.videoSrc ? (
              <video
                src={project.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-70"
              />
            ) : (
              <img
                src={project.imageUrl}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-75"
              />
            )}
            {/* Gradient contrast scrim overlay */}
            <div className={`absolute inset-0 z-10 bg-gradient-to-t ${
              theme === 'dark' ? 'from-zinc-950 via-zinc-950/45 to-black/20' : 'from-white via-white/45 to-black/10'
            }`} />

            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 z-20 space-y-2 p-1 sm:p-2">
              <span className="font-mono text-amber-500 text-[9px] sm:text-[10px] tracking-wider uppercase bg-black/65 px-2.5 py-1.2 backdrop-blur-md rounded-md inline-block">
                {project.category}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-display text-white tracking-tight drop-shadow-md leading-tight">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Details Dual Columns Layout */}
          <div className="p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8" id="modal-details-grid">
            
            {/* Column 1: Info Specs Grid */}
            <div className="col-span-1 lg:col-span-5 space-y-5" id="col-project-specs">
              <h3 className="font-mono text-xs uppercase text-zinc-500 tracking-wider flex items-center gap-2">
                <Sliders size={13} />
                PROJECT DESIGN SHEET
              </h3>

              <div className={`space-y-3.5 rounded-2xl border p-4 sm:p-5 ${
                theme === 'dark' ? 'bg-black/40 border-zinc-900' : 'bg-zinc-50/50 border-zinc-200'
              }`} id="specs-card">
                <div className="flex justify-between items-start text-xs">
                  <span className="text-zinc-500 font-mono tracking-wider shrink-0 mr-4">CREATIVE ROLE:</span>
                  <span className="font-semibold text-right max-w-[200px] sm:max-w-none">{project.role}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-zinc-500/10 pt-3">
                  <span className="text-zinc-500 font-mono tracking-wider">CLIENT ENTITY:</span>
                  <span className="font-semibold text-right">{project.client}</span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-zinc-500/10 pt-3">
                  <span className="text-zinc-500 font-mono tracking-wider">RELEASE TIMEPIN:</span>
                  <span className="font-semibold text-right">{project.date}</span>
                </div>
                {project.duration && (
                  <div className="flex justify-between items-center text-xs border-t border-zinc-500/10 pt-3">
                    <span className="text-zinc-500 font-mono tracking-wider">CL-REEL LENGTH:</span>
                    <span className="font-semibold font-mono text-amber-500">{project.duration} Min</span>
                  </div>
                )}
              </div>

              {/* Responsive tags */}
              <div className="space-y-2">
                <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase block">
                  SOFTWARE SPECS USED
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono tracking-wide ${
                        theme === 'dark' 
                          ? 'border-zinc-900 bg-zinc-950 text-zinc-300' 
                          : 'border-zinc-200 bg-zinc-100/80 text-zinc-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Interactive Storyboard Treatments */}
            <div className="col-span-1 lg:col-span-7 space-y-5" id="col-storyboard-treatments">
              <h3 className="font-mono text-xs uppercase text-zinc-500 tracking-wider flex items-center gap-2">
                <Activity size={13} />
                SCENE SEQUENCING TREATMENTS
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {project.storyboard && project.storyboard.length > 0 ? (
                  project.storyboard.map((step, i) => (
                    <div 
                      key={i} 
                      className={`border p-4.5 rounded-2xl space-y-2 transition-all hover:bg-neutral-500/5 ${
                        theme === 'dark' ? 'bg-zinc-950/40 border-zinc-900' : 'bg-zinc-100/30 border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded font-bold">
                          {step.timecode}
                        </span>
                        <span className="font-display font-medium text-[10px] text-zinc-500 uppercase">
                          SCENE {i + 1}
                        </span>
                      </div>

                      <p className={`text-xs font-semibold leading-relaxed ${
                        theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'
                      }`}>
                        {step.description}
                      </p>

                      <p className="text-[9px] text-zinc-500 font-mono uppercase">
                        {step.visualCue}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-zinc-400 text-xs italic p-8 border border-dashed border-zinc-300 rounded-2xl text-center">
                    Storyboard guidelines configured inside project metadata specs.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Interactive Multimedia Space Section (Required) */}
          <div className="border-t border-zinc-500/10 px-4 py-8 sm:p-8 md:p-10 space-y-6" id="multimedia-curator-space">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="font-mono text-xs text-amber-500 uppercase tracking-widest block">
                  🎨 PROJECT MULTIMEDIA SHOWCASE
                </span>
                <h3 className={`text-lg sm:text-xl font-bold font-display ${
                  theme === 'dark' ? 'text-white' : 'text-zinc-950'
                }`}>
                  Live Photo, YouTube, Instagram &amp; Google Drive Player
                </h3>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-center">
                {isAdmin ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <Unlock size={10} /> Mode Admin
                    </span>
                    <button
                      type="button"
                      onClick={handleLockAdmin}
                      className="text-3xs font-mono text-zinc-450 hover:text-red-500 underline cursor-pointer pr-2 transition-colors"
                    >
                      Keluar Admin
                    </button>
                    {mediaList.length > 0 && (
                      <button
                        type="button"
                        onClick={resetToDefault}
                        className="inline-flex items-center gap-1.5 text-3xs font-mono border border-amber-500/30 text-amber-500 px-3 py-1.5 rounded-full hover:bg-amber-500/5 transition-colors cursor-pointer"
                        id="btn-reset-media"
                      >
                        <RefreshCw size={10} className="animate-hover-spin" />
                        RESTORE DEFAULTS
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPasscodeForm(!showPasscodeForm)}
                    className="inline-flex items-center gap-1.5 text-3xs font-mono border border-zinc-500/20 text-zinc-400 hover:text-white px-3 py-1.5 rounded-full hover:bg-zinc-500/5 transition-colors cursor-pointer self-start"
                  >
                    <Lock size={10} className="text-zinc-500 animate-pulse" />
                    BUKA KUNCI ADMIN
                  </button>
                )}
              </div>
            </div>

            {/* Main Stage Grid (Player Box & Interactive List) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Main Prominent Player Slot */}
              <div className="col-span-1 lg:col-span-7 space-y-4">
                <div 
                  className={`w-full aspect-video rounded-3xl overflow-hidden border flex flex-col justify-between shadow-lg relative ${
                    theme === 'dark' ? 'bg-zinc-950 border-zinc-900 shadow-black/40' : 'bg-zinc-50 border-zinc-200 shadow-zinc-200/20'
                  }`}
                  id="media-prominent-player"
                >
                  {/* Dynamic Rendering Based on Type */}
                  {mediaList.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
                      <div className="p-4 rounded-full bg-zinc-500/10 text-zinc-400">
                        <Layers size={28} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold">No multimedia links loaded yet</p>
                        <p className="text-xs text-zinc-500 max-w-sm">
                          Use the link adder on the right to paste YouTube URLs, Instagram posts, or Google Drive links!
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 pt-2">
                        {devSuggestions.map((sug, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => injectSuggestion(sug)}
                            className="text-4xs font-semibold uppercase tracking-widest px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-full cursor-pointer transition-colors"
                          >
                            Demo {sug.title.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : activeMedia ? (
                    <div className="relative w-full h-full flex-1">
                      {activeMedia.type === 'youtube' && (
                        <iframe 
                          src={activeMedia.embedUrl} 
                          className="w-full h-full aspect-video absolute inset-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen 
                          frameBorder="0"
                          title={activeMedia.title} 
                        />
                      )}

                      {activeMedia.type === 'instagram' && (
                        <div className="w-full h-full absolute inset-0 overflow-y-auto p-4 flex justify-center bg-zinc-900/10 p-2">
                          <iframe 
                            src={activeMedia.embedUrl} 
                            className="w-full max-w-md h-[450px] rounded-2xl bg-white shadow-md"
                            allowTransparency
                            frameBorder="0" 
                            scrolling="no" 
                            title={activeMedia.title} 
                          />
                        </div>
                      )}

                      {activeMedia.type === 'googledrive' && (
                        <iframe 
                          src={activeMedia.embedUrl} 
                          className="w-full h-full absolute inset-0 bg-black/5" 
                          allow="autoplay" 
                          frameBorder="0"
                          title={activeMedia.title} 
                        />
                      )}

                      {activeMedia.type === 'direct' && (
                        <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-black/10 overflow-hidden">
                          {activeMedia.url.match(/\.(mp4|webm|ogg|mov)/i) ? (
                            <video 
                              src={activeMedia.url} 
                              controls 
                              className="max-w-full max-h-full object-contain"
                            />
                          ) : (
                            <img 
                              src={activeMedia.url} 
                              alt={activeMedia.title} 
                              referrerPolicy="no-referrer"
                              className="max-w-full max-h-full object-contain"
                            />
                          )}
                        </div>
                      )}

                      {activeMedia.type === 'unknown' && (
                        <div className="w-full h-full absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4">
                          <Info size={24} className="text-zinc-500" />
                          <div className="space-y-1">
                            <p className="text-xs font-semibold">Custom Link Injected</p>
                            <p className="text-3xs text-zinc-500 max-w-xs truncate">{activeMedia.url}</p>
                          </div>
                          <a 
                            href={activeMedia.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-zinc-800 text-white hover:bg-zinc-700 px-4 py-2 rounded-full font-mono text-[10px] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            Open Link <ExternalLink size={10} />
                          </a>
                        </div>
                      )}
                    </div>
                  ) : null}
                  
                  {/* Active Slide Info strip */}
                  {mediaList.length > 0 && activeMedia && (
                    <div className={`p-3 border-t text-[10px] font-mono flex items-center justify-between ${
                      theme === 'dark' ? 'bg-zinc-950 border-zinc-900 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-500'
                    }`}>
                      <div className="flex items-center gap-1.5 truncate pr-4">
                        {activeMedia.type === 'youtube' && <Youtube size={12} className="text-red-500 shrink-0" />}
                        {activeMedia.type === 'instagram' && <Instagram size={12} className="text-pink-500 shrink-0" />}
                        {activeMedia.type === 'googledrive' && <FileText size={12} className="text-blue-500 shrink-0" />}
                        {activeMedia.type === 'direct' && <ImageIcon size={12} className="text-amber-500 shrink-0" />}
                        <span className="font-semibold text-zinc-200 dark:text-zinc-300 truncate">{activeMedia.title}</span>
                      </div>
                      <span className="shrink-0 text-amber-500 font-bold">{activeMediaIndex + 1} / {mediaList.length}</span>
                    </div>
                  )}
                </div>

                {/* Slides Picker Thumbnail Slider Rail */}
                {mediaList.length > 0 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin" id="media-thumbnails-rail">
                    {mediaList.map((media, idx) => {
                      const isActive = idx === activeMediaIndex;
                      return (
                        <button
                          key={media.id}
                          onClick={() => setActiveMediaIndex(idx)}
                          className={`px-3.5 py-2 rounded-xl text-3xs font-mono font-medium tracking-wide flex items-center gap-2 border cursor-pointer shrink-0 transition-all ${
                            isActive
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/50 scale-[1.02]'
                              : theme === 'dark'
                                ? 'bg-black/30 border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700'
                                : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400'
                          }`}
                        >
                          {media.type === 'youtube' && <Youtube size={11} />}
                          {media.type === 'instagram' && <Instagram size={11} />}
                          {media.type === 'googledrive' && <FileText size={11} />}
                          {media.type === 'direct' && <ImageIcon size={11} />}
                          <span className="max-w-[130px] truncate">{media.title}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Column 2: Link Curator Console Editor Block */}
              <div className="col-span-1 lg:col-span-5 space-y-6">
                
                {isAdmin ? (
                  /* Curator Input Form when admin */
                  <form onSubmit={handleAddLink} className={`p-5 rounded-2xl border space-y-4 ${
                    theme === 'dark' ? 'bg-zinc-950/40 border-zinc-900' : 'bg-zinc-50/70 border-zinc-200'
                  }`} id="curator-add-form">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <LinkIcon size={13} className="text-amber-500" />
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                        Inbound Link Curator
                      </span>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-1">
                          Sourced Media URL Link
                        </label>
                        <input 
                          type="url"
                          value={newUrl}
                          onChange={(e) => setNewUrl(e.target.value)}
                          placeholder="YouTube, Instagram, or Google Drive URL..." 
                          className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                            theme === 'dark'
                              ? 'bg-zinc-950 border-zinc-900 focus:border-zinc-500 text-white'
                              : 'bg-white border-zinc-200 focus:border-zinc-400 text-zinc-900'
                          }`}
                          required
                          id="form-media-url-input"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-1">
                          Asset Friendly Name (Optional)
                        </label>
                        <input 
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g. Cinematic Shoot Video" 
                          maxLength={40}
                          className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                            theme === 'dark'
                              ? 'bg-zinc-950 border-zinc-900 focus:border-zinc-500 text-white'
                              : 'bg-white border-zinc-200 focus:border-zinc-400 text-zinc-900'
                          }`}
                          id="form-media-title-input"
                        />
                      </div>
                    </div>

                    {formError && (
                      <p className="text-[10px] font-mono text-red-500 leading-normal bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                        {formError}
                      </p>
                    )}

                    <button 
                      type="submit" 
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-mono font-semibold uppercase tracking-wider text-2xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10 hover:scale-[1.01]"
                      id="btn-add-showcase-link"
                    >
                      <Plus size={12} />
                      CURATE INBOUND ASSET
                    </button>
                  </form>
                ) : showPasscodeForm ? (
                  /* Form to input passcode */
                  <form onSubmit={handleUnlockAdmin} className={`p-5 rounded-2xl border space-y-4 ${
                    theme === 'dark' ? 'bg-zinc-950/40 border-zinc-900' : 'bg-zinc-50/70 border-zinc-200'
                  }`} id="admin-unlock-form">
                    <div className="flex items-center gap-1.5 text-zinc-400">
                      <Lock size={13} className="text-amber-500 animate-pulse" />
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                        Owner Admin Authorization
                      </span>
                    </div>

                    <div className="space-y-3">
                      <p className="text-3xs text-zinc-400 leading-relaxed font-mono">
                        Silakan masukkan kode sandi Anda (Kode bawaan: <code className="text-amber-500 px-1 bg-black/30 rounded font-bold">yakin100</code>) untuk mengaktifkan console pengelolaan link.
                      </p>
                      <div>
                        <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-1">
                          Passcode
                        </label>
                        <input 
                          type="password"
                          value={passcode}
                          onChange={(e) => setPasscode(e.target.value)}
                          placeholder="••••••••" 
                          className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                            theme === 'dark'
                              ? 'bg-zinc-950 border-zinc-900 focus:border-zinc-500 text-white'
                              : 'bg-white border-zinc-200 focus:border-zinc-400 text-zinc-900'
                          }`}
                          required
                          id="admin-passcode-input"
                        />
                      </div>
                    </div>

                    {passcodeError && (
                      <p className="text-[10px] font-mono text-red-500 leading-normal bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                        {passcodeError}
                      </p>
                    )}

                    <div className="flex gap-2.5 pt-1">
                      <button 
                        type="button"
                        onClick={() => {
                          setShowPasscodeForm(false);
                          setPasscodeError('');
                          setPasscode('');
                        }}
                        className={`w-1/2 font-mono font-semibold uppercase tracking-wider text-2xs py-2.5 rounded-xl border transition-all cursor-pointer ${
                          theme === 'dark'
                            ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                            : 'border-zinc-200 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100'
                        }`}
                      >
                        Batal
                      </button>
                      <button 
                        type="submit" 
                        className="w-1/2 bg-amber-500 hover:bg-amber-600 text-white font-mono font-semibold uppercase tracking-wider text-2xs py-2.5 rounded-xl transition-all cursor-pointer shadow-md shadow-amber-500/10 hover:scale-[1.01]"
                      >
                        Buka Kunci
                      </button>
                    </div>
                  </form>
                ) : (
                  /* Standard display informing that the portfolio is in viewer mode */
                  <div className={`p-5 rounded-2xl border space-y-4 ${
                    theme === 'dark' ? 'bg-zinc-950/20 border-zinc-900' : 'bg-zinc-50/50 border-zinc-200'
                  }`} id="visitor-mode-card">
                    <div className="flex items-center gap-1.5 text-zinc-450">
                      <Sparkles size={13} className="text-amber-500" />
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold text-zinc-400">
                        Interactive Reference Board
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${
                      theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'
                    }`}>
                      Koleksi video, foto Instagram, dsb. yang Anda kelola langsung di atas tersimpan dengan aman. Pengunjung publik hanya dapat melihat koleksi media premium Anda tanpa bisa merubah isinya.
                    </p>

                    <button
                      type="button"
                      onClick={() => setShowPasscodeForm(true)}
                      className={`w-full font-mono font-semibold uppercase tracking-wider text-3xs py-3 rounded-xl border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        theme === 'dark'
                          ? 'border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900'
                          : 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                      }`}
                    >
                      <Lock size={11} className="text-amber-500" />
                      MEMASUKI MODE ADMIN (PASSCODE)
                    </button>
                  </div>
                )}

                {/* Form quick helpers tips */}
                <div className={`p-4 rounded-xl text-3xs font-mono leading-relaxed space-y-2 border ${
                  theme === 'dark' ? 'bg-zinc-950/20 border-zinc-900 text-zinc-550' : 'bg-zinc-100/40 border-zinc-200 text-zinc-600'
                }`}>
                  <p className="font-semibold text-amber-500 flex items-center gap-1 uppercase">
                    <Sparkles size={10} /> Link Parsing Capabilities:
                  </p>
                  <ul className="list-disc pl-3.5 space-y-1">
                    <li><strong className={theme === 'dark' ? 'text-zinc-3 w' : 'text-zinc-800'}>YouTube:</strong> Supports <code className="bg-black/3 px-1 rounded text-neutral-400">watch?v=...</code>, <code className="bg-black/3 px-1 rounded text-neutral-400">youtu.be/...</code>, and Shorts links.</li>
                    <li><strong className={theme === 'dark' ? 'text-zinc-3 w' : 'text-zinc-800'}>Instagram:</strong> Paste any post or Reel link (<code className="bg-black/3  px-1 rounded text-neutral-400">instagram.com/p/...</code>) to embed natively.</li>
                    <li><strong className={theme === 'dark' ? 'text-zinc-3 w' : 'text-zinc-800'}>Google Drive:</strong> Paste standard public file URLs to display photos/video streams. Make sure link is set as public/universal readable.</li>
                  </ul>
                </div>

                {/* List of Loaded Sourced Links with deletion tools */}
                {mediaList.length > 0 && (
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase block">
                      CURRENTLY STREAMED ASSETS
                    </span>
                    <div className={`rounded-2xl border divide-y overflow-hidden max-h-[170px] overflow-y-auto ${
                      theme === 'dark' ? 'border-zinc-900 bg-black/20 divide-zinc-900/60' : 'border-zinc-200 bg-zinc-50/20 divide-zinc-200/60'
                    }`} id="media-assets-list">
                      {mediaList.map((media, idx) => (
                        <div 
                          key={media.id} 
                          className={`p-3 flex items-center justify-between text-3xs font-mono group gap-3 ${
                            idx === activeMediaIndex 
                              ? theme === 'dark' ? 'bg-zinc-901 text-white' : 'bg-zinc-100 text-zinc-950'
                              : 'text-zinc-400'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => setActiveMediaIndex(idx)}
                            className="flex items-center gap-2 truncate flex-1 hover:text-amber-500 transition-colors text-left cursor-pointer"
                          >
                            <span className="text-[9px] opacity-70">#{idx + 1}</span>
                            {media.type === 'youtube' && <Youtube size={12} className="text-red-500 shrink-0" />}
                            {media.type === 'instagram' && <Instagram size={12} className="text-pink-500 shrink-0" />}
                            {media.type === 'googledrive' && <FileText size={12} className="text-blue-500 shrink-0" />}
                            {media.type === 'direct' && <ImageIcon size={12} className="text-amber-500 shrink-0" />}
                            <span className="truncate max-w-[200px]">{media.title}</span>
                          </button>
                          
                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() => handleRemoveLink(idx)}
                              className="p-1 cursor-pointer text-zinc-600 hover:text-red-500 transition-all rounded"
                              title="Remove link"
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* Modal Footer HUD */}
        <div className={`p-4 border-t flex items-center justify-between text-[10px] font-mono uppercase ${
          theme === 'dark' ? 'border-zinc-900 bg-zinc-950/95 text-zinc-500' : 'border-zinc-200 bg-zinc-50/95 text-zinc-600'
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
