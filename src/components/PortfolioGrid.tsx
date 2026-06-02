import { useState, FormEvent, MouseEvent } from 'react';
import { Project } from '../data';
import { 
  Play, 
  Plus, 
  Trash2, 
  Edit3,
  Image as ImageIcon, 
  Film, 
  Lock, 
  Maximize2, 
  Sparkles, 
  Calendar, 
  User, 
  Tag, 
  FolderPlus,
  RefreshCw,
  FolderOpen,
  ArrowLeft
} from 'lucide-react';

interface PortfolioGridProps {
  theme: 'dark' | 'light';
  onSelectProject: (project: Project) => void;
  projectsList: Project[];
  saveProjectsList: (newList: Project[]) => void;
  isAdmin: boolean;
  isFullGalleryView?: boolean;
  setIsFullGalleryView?: (val: boolean) => void;
}

export default function PortfolioGrid({ 
  theme, 
  onSelectProject, 
  projectsList, 
  saveProjectsList,
  isAdmin,
  isFullGalleryView = false,
  setIsFullGalleryView
}: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Creative Form States
  const [showCreatorForm, setShowCreatorForm] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'Videography' | 'Photography' | 'Motion Graphics' | 'Video Editing'>('Videography');
  const [newRole, setNewRole] = useState<string>('');
  const [newClient, setNewClient] = useState<string>('');
  const [newDate, setNewDate] = useState<string>('');
  const [newDuration, setNewDuration] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [newBannerUrl, setNewBannerUrl] = useState<string>('');
  const [newVideoUrl, setNewVideoUrl] = useState<string>('');
  const [newTagsStr, setNewTagsStr] = useState<string>('');
  const [newAspect, setNewAspect] = useState<'landscape' | 'portrait' | 'square'>('landscape');
  const [newDescription, setNewDescription] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const categories = ['All', 'Videography', 'Photography', 'Motion Graphics', 'Video Editing'];

  const baseProjects = isFullGalleryView
    ? projectsList
    : projectsList.filter(p => p.isFeatured);

  const filteredProjects = activeCategory === 'All'
    ? baseProjects
    : baseProjects.filter(p => p.category === activeCategory);

  // High quality curated presets to pre-fill image input with a single touch
  const imagePresets = [
    { label: 'CGI Urban Drone', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Sunset Camera Rig', url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Cyberpunk Vogue Neon', url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80' },
    { label: 'Athletic Sunrise track', url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Prismatic Neon Liquid', url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80' },
    { label: 'Fictional car chassis', url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80' },
  ];

  // Helper template video loops for previews
  const videoPresets = [
    { label: 'Mixkit Futuristic Flight', url: 'https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-futuristic-minimalist-city-at-night-42294-large.mp4' },
    { label: 'Mixkit Sunset Camera shoot', url: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-video-camera-filming-at-sunset-41484-large.mp4' },
    { label: 'Mixkit Athletic sprint loop', url: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-running-on-stadium-tracks-at-sunrise-33886-large.mp4' },
    { label: 'None (Still Image only)', url: '' }
  ];

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  const handleCreateProject = (e: FormEvent) => {
    e.preventDefault();

    if (!newTitle.trim()) {
      setFormError('Judul project wajib diisi!');
      return;
    }
    if (!newImageUrl.trim()) {
      setFormError('Link foto cover (Thumbnail) wajib diisi!');
      return;
    }

    const tagsArray = newTagsStr
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    if (editingProjectId) {
      // Editing Mode
      const updatedList = projectsList.map(p => {
        if (p.id === editingProjectId) {
          return {
            ...p,
            title: newTitle.trim(),
            category: newCategory,
            role: newRole.trim() || 'Lead Creator',
            client: newClient.trim() || 'Independent Release',
            date: newDate.trim() || 'May 2026',
            duration: newDuration.trim() || undefined,
            imageUrl: newImageUrl.trim(),
            bannerUrl: newBannerUrl.trim() || undefined,
            videoSrc: newVideoUrl.trim() || undefined,
            tags: tagsArray.length > 0 ? tagsArray : ['Creative Flow'],
            aspect: newAspect,
            description: newDescription.trim() || 'Deskripsi project sinematik baru.',
          };
        }
        return p;
      });
      saveProjectsList(updatedList);
      setEditingProjectId(null);
    } else {
      // Creation Mode
      const newProj: Project = {
        id: `custom-pr-${Date.now()}`,
        title: newTitle.trim(),
        category: newCategory,
        role: newRole.trim() || 'Lead Creator',
        client: newClient.trim() || 'Independent Release',
        date: newDate.trim() || 'May 2026',
        duration: newDuration.trim() || undefined,
        imageUrl: newImageUrl.trim(),
        bannerUrl: newBannerUrl.trim() || undefined,
        videoSrc: newVideoUrl.trim() || undefined,
        tags: tagsArray.length > 0 ? tagsArray : ['Creative Flow'],
        isFeatured: false,
        aspect: newAspect,
        description: newDescription.trim() || 'Deskripsi project sinematik baru.',
        mediaUrls: [newImageUrl.trim()]
      };

      saveProjectsList([newProj, ...projectsList]);
    }

    // Reset controls
    setNewTitle('');
    setNewRole('');
    setNewClient('');
    setNewDate('');
    setNewDuration('');
    setNewImageUrl('');
    setNewBannerUrl('');
    setNewVideoUrl('');
    setNewTagsStr('');
    setNewDescription('');
    setFormError('');
    setShowCreatorForm(false);
  };

  const handleEditProjectClick = (project: Project, e: MouseEvent) => {
    e.stopPropagation(); // Avoid opening modal details
    setEditingProjectId(project.id);
    setNewTitle(project.title);
    setNewCategory(project.category);
    setNewRole(project.role);
    setNewClient(project.client);
    setNewDate(project.date);
    setNewDuration(project.duration || '');
    setNewImageUrl(project.imageUrl);
    setNewBannerUrl(project.bannerUrl || '');
    setNewVideoUrl(project.videoSrc || '');
    setNewTagsStr(project.tags.join(', '));
    setNewAspect(project.aspect);
    setNewDescription(project.description || '');
    setShowCreatorForm(true);
    
    // Smooth scroll to the form panel
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setNewTitle('');
    setNewRole('');
    setNewClient('');
    setNewDate('');
    setNewDuration('');
    setNewImageUrl('');
    setNewBannerUrl('');
    setNewVideoUrl('');
    setNewTagsStr('');
    setNewDescription('');
    setFormError('');
    setShowCreatorForm(false);
  };

  const handleDeleteProject = (projectId: string, e: MouseEvent) => {
    e.stopPropagation(); // Avoid opening modal dialog when clicking trash icon
    if (confirm('Apakah Anda yakin ingin menghapus project ini dari gallery?')) {
      const filtered = projectsList.filter(p => p.id !== projectId);
      saveProjectsList(filtered);
    }
  };

  const handleResetToDefault = () => {
    if (confirm('Apakah Anda ingin memulihkan semua portfolio awal bawaan? Project tambahan akan terhapus.')) {
      localStorage.removeItem('portfolio-custom-projects');
      window.location.reload();
    }
  };

  return (
    <section 
      id="portfolio" 
      className={`py-24 transition-colors duration-300 border-t ${
        theme === 'dark' ? 'bg-zinc-950/45 border-zinc-900' : 'bg-zinc-50/10 border-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* Gallery Page Back Link */}
        {isFullGalleryView && setIsFullGalleryView && (
          <button
            onClick={() => {
              setIsFullGalleryView(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-zinc-500 hover:text-amber-500 font-mono text-[11px] uppercase tracking-wider mb-8 transition-colors cursor-pointer group"
          >
            <ArrowLeft size={14} className="transform group-hover:-translate-x-1 duration-200" />
            Kembali ke Beranda Utama
          </button>
        )}

        {/* Gallery Headers */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <span className="font-mono text-zinc-500 text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              {isFullGalleryView ? '02 // THE COMPLETE EXHIBITION' : '02 // THE BEST FROM THE BEST'}
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold font-display tracking-tight leading-none ${
              theme === 'dark' ? 'text-white' : 'text-zinc-950'
            }`}>
              {isFullGalleryView ? 'FULL GALLERY ARCHIVES.' : 'SIGNATURE SELECTION.'}
            </h2>
            <p className={`text-xs sm:text-sm max-w-xl leading-relaxed ${
              theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'
            }`}>
              {isFullGalleryView 
                ? 'Arsip digital lengkap yang menampung seluruh karya filmic, fotografi komersil, animasi dan motion graphics yang telah di-kurasi.'
                : 'Pilihan karya termegah dan terbaik ("The Best from the Best") untuk menampilkan kredensial serta dedikasi artistik sinematografi kami.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {isAdmin && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowCreatorForm(!showCreatorForm)}
                  className="inline-flex items-center gap-2 text-2xs font-mono font-bold tracking-wider bg-amber-500 hover:bg-amber-600 text-white px-5 py-3 rounded-full transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/10 cursor-pointer"
                >
                  <Plus size={14} />
                  {showCreatorForm ? 'TUTUP CREATOR PANEL' : 'TAMBAH PROJECT BARU'}
                </button>

                <button
                  onClick={handleResetToDefault}
                  title="Pulihkan Semua Project Bawaan"
                  className={`p-3 rounded-full border cursor-pointer transition-colors ${
                    theme === 'dark'
                      ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                      : 'border-zinc-200 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                >
                  <RefreshCw size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic New Project Creator Form Panel */}
        {showCreatorForm && isAdmin && (
          <div className={`p-6 sm:p-8 rounded-3xl border mb-16 animate-fade-in transition-all ${
            theme === 'dark' 
              ? 'bg-zinc-950/80 border-zinc-900/80 shadow-2xl' 
              : 'bg-white border-zinc-200 shadow-xl'
          }`}>
            <div className="flex items-center gap-2 mb-6">
              <FolderPlus className="text-amber-500" size={18} />
              <h3 className={`font-display font-semibold text-lg uppercase tracking-wider ${
                theme === 'dark' ? 'text-white' : 'text-zinc-900'
              }`}>
                {editingProjectId ? 'PROSES EDITING DATA PROJECT' : 'Visual Project Creator Panel'}
              </h3>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* Title input */}
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">
                    Judul Project
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Contoh: ECHELON // Architectural Motion"
                    className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400'
                    }`}
                  />
                </div>

                {/* Category selector */}
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">
                    Kategori Media
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-650 focus:border-zinc-400'
                    }`}
                  >
                    <option value="Videography">Videography</option>
                    <option value="Photography">Photography</option>
                    <option value="Motion Graphics">Motion Graphics</option>
                    <option value="Video Editing">Video Editing</option>
                  </select>
                </div>

                {/* Aspect ratio */}
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">
                    Gaya Grid (Aspect Ratio)
                  </label>
                  <select
                    value={newAspect}
                    onChange={(e) => setNewAspect(e.target.value as any)}
                    className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-650 focus:border-zinc-400'
                    }`}
                  >
                    <option value="landscape">Landscape (Horizontal standard)</option>
                    <option value="portrait">Portrait (Vertikal tinggi)</option>
                    <option value="square">Square (Sama sisi)</option>
                  </select>
                </div>

                {/* Client info */}
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">
                    Klien / Brand
                  </label>
                  <input
                    type="text"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    placeholder="Contoh: KRONOS Developments"
                    className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400'
                    }`}
                  />
                </div>

                {/* Role description */}
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">
                    Peran dalam Kegiatan
                  </label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="Contoh: Director of Photography & Colorist"
                    className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400'
                    }`}
                  />
                </div>

                {/* Project Date */}
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">
                    Tanggal Kegiatan
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="Contoh: Nov 2025"
                    className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400'
                    }`}
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">
                    Durasi Video (Opsional)
                  </label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="Contoh: 01:30"
                    className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400'
                    }`}
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">
                    Alat & Software (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={newTagsStr}
                    onChange={(e) => setNewTagsStr(e.target.value)}
                    placeholder="Cinema 4D, After Effects, DaVinci"
                    className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400'
                    }`}
                  />
                </div>

                {/* Video URL snippet preview */}
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">
                    Link Video Loop Hover (MP4)
                  </label>
                  <input
                    type="url"
                    value={newVideoUrl}
                    onChange={(e) => setNewVideoUrl(e.target.value)}
                    placeholder="https://assets.mixkit.co/..."
                    className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400'
                    }`}
                  />
                </div>

                {/* Banner image URL option */}
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">
                    Link Image Banner Detail (Opsional)
                  </label>
                  <input
                    type="url"
                    value={newBannerUrl}
                    onChange={(e) => setNewBannerUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... (Resolusi Tinggi)"
                    className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400'
                    }`}
                  />
                </div>
              </div>

              {/* Full-width project description narrative */}
              <div>
                <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">
                  Deskripsi / Narasi Storytelling Project
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Ceritakan proses kreatif, konsep estetik, dan makna di balik visual pameran ini..."
                  className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 resize-none ${
                    theme === 'dark'
                      ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                      : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400'
                  }`}
                />
              </div>

              {/* Cover Image Preset picker & Input */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[10px] text-zinc-500 uppercase font-mono mb-2">
                    Foto Cover (Thumbnail Image URL)
                  </label>
                  <input
                    type="url"
                    required
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Masukan link URL foto Unsplash dsb..."
                    className={`w-full text-xs rounded-xl p-3 border focus:outline-none focus:ring-0 ${
                      theme === 'dark'
                        ? 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400'
                    }`}
                  />
                </div>

                {/* Curated Preset Visual Shortcuts */}
                <div className="space-y-1.5">
                  <span className="block text-[9px] font-mono uppercase tracking-wider text-zinc-450">
                    Atau gunakan pintasan template gambar sinematik kami:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {imagePresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setNewImageUrl(preset.url)}
                        className={`text-[9px] font-mono px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          newImageUrl === preset.url
                            ? 'bg-amber-500 border-amber-500 text-white font-bold'
                            : theme === 'dark'
                              ? 'border-zinc-800 text-zinc-400 bg-zinc-900/50 hover:text-white'
                              : 'border-zinc-200 text-zinc-650 bg-zinc-100/50 hover:text-zinc-950'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Video shortcuts */}
                {newVideoUrl === '' && (
                  <div className="space-y-1.5 pt-1">
                    <span className="block text-[9px] font-mono uppercase tracking-wider text-zinc-450">
                      Gunakan pintasan loop video singkat gratis:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {videoPresets.map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setNewVideoUrl(preset.url)}
                          className={`text-[9px] font-mono px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                            newVideoUrl === preset.url
                              ? 'bg-amber-500 border-amber-500 text-white font-semibold'
                              : theme === 'dark'
                                ? 'border-zinc-800 text-zinc-400 bg-zinc-900/50 hover:text-white'
                                : 'border-zinc-200 text-zinc-650 bg-zinc-100/50 hover:text-zinc-950'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {formError && (
                <p className="text-[10px] font-mono text-red-500 leading-normal bg-red-500/10 p-2.5 rounded-lg border border-red-500/20 max-w-sm">
                  {formError}
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className={`px-6 py-3 font-mono font-bold tracking-wider text-2xs uppercase rounded-xl border transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900'
                      : 'border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  }`}
                >
                  BATAL
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-mono font-bold tracking-wider text-2xs uppercase px-8 py-3 rounded-xl transition-all shadow-md shadow-amber-500/10 cursor-pointer flex items-center gap-1.5 hover:scale-[1.01]"
                >
                  {editingProjectId ? <Edit3 size={12} /> : <Plus size={12} />}
                  {editingProjectId ? 'SIMPAN PERUBAHAN PROJECT' : 'TERBITKAN KE GALLERY'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtering Engine Pills */}
        <div className="flex flex-wrap items-center justify-between gap-5 mb-12 border-b border-zinc-900/10 dark:border-zinc-800/20 pb-6">
          <div className="flex flex-wrap gap-2 text-3xs sm:text-2xs uppercase tracking-widest font-mono font-medium">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2.5 rounded-full border cursor-pointer transition-all interactive-item ${
                  activeCategory === cat
                    ? theme === 'dark'
                      ? 'bg-white text-zinc-950 border-white'
                      : 'bg-zinc-950 text-white border-zinc-900'
                    : theme === 'dark'
                      ? 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 bg-zinc-950/20'
                      : 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 bg-white/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="font-mono text-3xs uppercase text-zinc-500 tracking-wider">
            Total pameran: {filteredProjects.length} data project
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        {filteredProjects.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border border-dashed ${
            theme === 'dark' ? 'border-zinc-800 text-zinc-500' : 'border-zinc-200 text-zinc-450'
          }`}>
            <FolderOpen size={32} className="mx-auto mb-4 opacity-40 text-amber-500" />
            <p className="font-mono text-xs uppercase tracking-wider mb-2">Belum ada project di kategori ini</p>
            {isAdmin && (
              <button
                onClick={() => setShowCreatorForm(true)}
                className="text-2xs underline font-mono hover:text-amber-500 cursor-pointer"
              >
                Buat project baru pertama Anda
              </button>
            )}
          </div>
        ) : (
          <div className="masonry-grid">
            {filteredProjects.map((project) => {
              // Align masonry item sizing based on actual custom aspect ratio defined!
              let masonryClass = '';
              if (project.aspect === 'portrait') {
                masonryClass = 'aspect-[3/4] col-span-1';
              } else if (project.aspect === 'square') {
                masonryClass = 'aspect-square col-span-1';
              } else {
                // landscape
                masonryClass = 'aspect-[16/10] sm:aspect-video md:col-span-2 col-span-1';
              }

              const isHovered = hoveredProjectId === project.id;

              return (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  className={`group relative bg-zinc-900 rounded-3xl overflow-hidden border cursor-pointer transition-all duration-305 hover:scale-[1.012] hover:shadow-2xl interactive-item ${masonryClass} ${
                    theme === 'dark' ? 'border-zinc-900 shadow-black/60' : 'border-zinc-200 shadow-zinc-200/20'
                  }`}
                  id={`project-card-${project.id}`}
                >
                  {/* Background Media Container */}
                  <div className="absolute inset-0 z-0 bg-neutral-900">
                    {/* Default Static Cover Thumbnail */}
                    <img
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=850&q=80'}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                        isHovered ? 'scale-105 opacity-100' : 'scale-100 opacity-80'
                      }`}
                    />
                    
                    {/* Simulated Hover Loop Video */}
                    {project.videoSrc && (
                      <video
                        src={project.videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`absolute inset-0 w-full h-full object-cover z-5 transition-opacity duration-300 pointer-events-none ${
                          isHovered ? 'opacity-90' : 'opacity-0'
                        }`}
                      />
                    )}
                    
                    {/* Shading layer */}
                    <div className={`absolute inset-0 z-10 transition-colors duration-400 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/20'
                        : 'bg-gradient-to-t from-black/85 via-black/20 to-transparent'
                    }`} />
                  </div>

                  {/* Card Texts details */}
                  <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-8 space-y-3">
                    <span className="font-mono text-neutral-300 text-[10px] tracking-wider uppercase block drop-shadow-md">
                      {project.client} // {project.category}
                    </span>
                    
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white leading-tight drop-shadow-lg">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span 
                          key={i} 
                          className="bg-white/15 px-2 py-0.5 rounded text-[9px] uppercase tracking-wider font-mono text-white backdrop-blur-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Edit & Delete Buttons overlay on Hover for Admin */}
                  {isAdmin && (
                    <div className="absolute top-6 left-6 z-35 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleEditProjectClick(project, e)}
                        title="Edit project"
                        className="p-2 rounded-lg bg-black/60 hover:bg-amber-500 backdrop-blur-md text-zinc-300 hover:text-white transition-all shadow-md cursor-pointer border border-zinc-800/40 hover:border-amber-500/40 hover:scale-105"
                      >
                        <Edit3 size={13} />
                      </button>
                      
                      <button
                        type="button"
                        onClick={(e) => handleDeleteProject(project.id, e)}
                        title="Hapus project"
                        className="p-2 rounded-lg bg-black/60 hover:bg-red-600 backdrop-blur-md text-zinc-300 hover:text-white transition-all shadow-md cursor-pointer border border-zinc-800/40 hover:border-red-500/40 hover:scale-105"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}

                  {/* DETAILED ACTION PLATES ON HOVERING */}
                  {isHovered && (
                    <div className="absolute top-6 right-6 z-35 animate-fade-in flex items-center gap-1.5 p-2 px-3 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/10 select-none">
                      <span className="font-mono text-[9px] uppercase tracking-wider font-semibold">
                        Buka Detail
                      </span>
                      <Play size={8} className="fill-current text-white" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Creative CTA to transition into Complete Showroom view */}
        {!isFullGalleryView && setIsFullGalleryView && (
          <div className="mt-16 text-center animate-fade-in flex flex-col items-center justify-center space-y-4">
            <div className="h-[1px] w-12 bg-amber-500/50 mb-2"></div>
            <p className={`text-3xs font-mono tracking-widest uppercase ${theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}`}>
              Tertarik melihat rangkuman seluruh logbook?
            </p>
            <button
              onClick={() => {
                setIsFullGalleryView(true);
                setTimeout(() => {
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="group inline-flex items-center gap-3 font-mono font-bold tracking-widest text-[10px] uppercase px-8 py-4.5 rounded-full transition-all border cursor-pointer hover:scale-[1.02] shadow-xl hover:shadow-amber-500/5 hover:border-amber-500/50 hover:text-amber-500 bg-transparent text-zinc-450 border-zinc-800 hover:bg-zinc-900/40"
            >
              EXPLORE FULL GALLERY ARCHIVE ({projectsList.length} PROJECTS) →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
