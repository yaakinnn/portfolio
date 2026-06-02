export interface Project {
  id: string;
  title: string;
  category: 'Videography' | 'Photography' | 'Motion Graphics' | 'Video Editing';
  role: string;
  client: string;
  date: string;
  duration?: string;
  imageUrl: string;
  bannerUrl?: string; // Optional custom top banner/poster image
  videoSrc?: string; // Short video loop or canvas type
  tags: string[];
  isFeatured: boolean;
  aspect: 'landscape' | 'portrait' | 'square';
  description?: string; // Detailed single-narrative description for project showcase
  mediaUrls?: string[]; // Direct visual asset URLs for carousel showcase (no parsing)
}

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: 'pr-01',
    title: 'ECHELON // Architectural Motion',
    category: 'Motion Graphics',
    role: 'Lead Motion & CGI Designer',
    client: 'KRONOS Developments',
    date: 'Dec 2025',
    duration: '01:15',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-futuristic-minimalist-city-at-night-42294-large.mp4',
    tags: ['Cinema 4D', 'Redshift', 'After Effects', 'CAD Assembly'],
    isFeatured: true,
    aspect: 'landscape',
    description: 'Sebuah eksplorasi visual mengenai struktur brutalist urban dalam dimensi tiga dimensi modern. Menggunakan pencahayaan dinamis dan partikel neon untuk menciptakan ketegangan artistik antara soliditas beton dan kefanaan cahaya digital.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'pr-02',
    title: 'THE SILENT WHISPER // Cinematic Short',
    category: 'Videography',
    role: 'Director of Photography & Colorist',
    client: 'Neo-Noir Films Ltd',
    date: 'Oct 2025',
    duration: '01:30',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=90',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-video-camera-filming-at-sunset-41484-large.mp4',
    tags: ['RED V-Raptor', 'Zeiss Supreme Primes', 'DaVinci Resolve', 'HDR'],
    isFeatured: true,
    aspect: 'landscape',
    description: 'Kisah visual sunyi mengenai pencarian makna di tengah belantara hutan berkabut tebal. Karakteristik grading film neo-noir yang rendah cahaya memberikan atmosfer misteri yang mendalam pada setiap detiknya.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'pr-03',
    title: 'VOGUE // Cyberpunk Autumn Editorial',
    category: 'Photography',
    role: 'Fashion Photographer & Liquid Artist',
    client: 'VOGUE Magazine',
    date: 'Sep 2025',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=90',
    tags: ['Sony Alpha A1', '85mm f/1.2 GM', 'Neon Accents', 'Gelled Strobes'],
    isFeatured: false,
    aspect: 'portrait',
    description: 'Sesi fotografi editorial mode bertema retro-futuristik di tengah gemerlap lampu neon Tokyo. Kombinasi kontras tinggi antara rona magenta dan cyan dengan plastik holografik pakaian model memperkuat estetika cyberpunk yang dingin.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'pr-04',
    title: 'CHRONICLES // Sports Showreel Intro',
    category: 'Video Editing',
    role: 'Lead Visual Editor & Sound Mixer',
    client: 'RUSH Athletics',
    date: 'Nov 2025',
    duration: '00:45',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1600&q=90',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-running-on-stadium-tracks-at-sunrise-33886-large.mp4',
    tags: ['Premiere Pro', 'Heavy FPV Drone Rushes', 'Sound Design', 'Rhythmic SpeedRamps'],
    isFeatured: true,
    aspect: 'landscape',
    description: 'Video intro atletik berenergi tinggi dengan teknik penyuntingan matchcut dinamas dan speed ramping presisi untuk menangkap intensitas detak jantung sebelum memulai lari cepat.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'pr-05',
    title: 'AURORA // Fluid Luminescence',
    category: 'Photography',
    role: 'Macro Photographer',
    client: 'Prism Art Space',
    date: 'Jul 2025',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=90',
    tags: ['Laowa Macro Pro', 'Polarizing Filters', 'Chemical Reactions', 'Studio Gels'],
    isFeatured: false,
    aspect: 'portrait',
    description: 'Studi fotografi makro mengenai interaksi kimiawi sabun pencuci piring dan cairan berwarna di bawah pancaran sinar ultraviolet, menangkap formasi keindahan geometri fractal luminal yang mengalir.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'pr-06',
    title: 'HYPER-GRAVITY // Audi Promo Concept',
    category: 'Motion Graphics',
    role: 'Particle & VFX Artist',
    client: 'AUDI Global Studio',
    date: 'Aug 2025',
    duration: '01:00',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=90',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-car-headlights-driving-on-a-wet-highway-at-night-41584-large.mp4',
    tags: ['Houdini', 'Octane Render', 'Nuke Compositing', 'Dynamic Physics'],
    isFeatured: false,
    aspect: 'landscape',
    description: 'Integrasi simulasi partikel angin aerodinamis di sekitar sasis mobil Audi menggunakan visualisasi 3D mutakhir, memproyeksikan kecepatan, friksi gas, dan kestabilan mutlak.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 'pr-07',
    title: 'PORTRAIT STUDY // Monomatic',
    category: 'Photography',
    role: 'Studio Photographer',
    client: 'Exhibition of Shadows',
    date: 'Jun 2025',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=90',
    tags: ['Medium Format', 'Hasselblad H6D', 'Rembrandt Lighting', 'Film Grain'],
    isFeatured: false,
    aspect: 'square',
    description: 'Sebuah studi potret hitam-putih berformat medium menggunakan teknik pencahayaan Rembrandt yang tajam untuk menonjolkan tekstur kulit, ketebalan bayangan wajah, dan spektrum emosi subjek secara dramatis.',
    mediaUrls: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const VIRTUAL_SHOWREEL_URL = 'https://assets.mixkit.co/videos/preview/mixkit-urban-fashion-video-of-a-man-in-running-clothes-32943-large.mp4';

export const EXPORT_HTML_CODE = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cinematic Portfolio | Creative Artist</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    /* Add Custom styles and Cursor resets */
    html {
      font-family: 'Inter', sans-serif;
    }
    h1, h2, h3, .font-display {
      font-family: 'Space Grotesk', sans-serif;
    }
    code, .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(156, 163, 175, 0.25);
      border-radius: 9999px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(156, 163, 175, 0.45);
    }

    /* Custom tracking cursor */
    .custom-cursor {
      width: 12px;
      height: 12px;
      background: #ffffff;
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: width 0.2s, height 0.2s, background-color 0.2s, mix-blend-mode 0.2s;
      mix-blend-mode: difference;
    }
    .custom-cursor-ring {
      width: 40px;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      transform: translate(-50%, -50%);
      transition: transform 0.12s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.2s;
    }

    /* Light mode styling overrides if active */
    body.light-theme {
      background-color: #fcfcfc !important;
      color: #111111 !important;
    }
    body.light-theme .custom-cursor {
      background-color: #000000;
    }
    body.light-theme .custom-cursor-ring {
      border-color: rgba(0, 0, 0, 0.4);
    }
    
    /* Playful Sound/Video pulse lines */
    .pulse-bar {
      width: 3px;
      height: 15px;
      background-color: currentColor;
      animation: sound-bounce 1s ease-in-out infinite alternate;
    }
    .pulse-bar:nth-child(2) { animation-delay: 0.2s; height: 25px; }
    .pulse-bar:nth-child(3) { animation-delay: 0.4s; height: 18px; }
    .pulse-bar:nth-child(4) { animation-delay: 0.1s; height: 22px; }

    @keyframes sound-bounce {
      0% { transform: scaleY(0.4); }
      100% { transform: scaleY(1.2); }
    }
  </style>
</head>
<body class="bg-black text-white selection:bg-neutral-800 selection:text-white transition-colors duration-500 overflow-x-hidden min-h-screen">

  <!-- Interactive Custom Hover Cursor -->
  <div class="custom-cursor hidden md:block" id="cursor"></div>
  <div class="custom-cursor-ring hidden md:block" id="cursor-ring"></div>

  <!-- NAVIGATION BAR -->
  <nav class="fixed top-0 left-0 w-full z-50 border-b border-zinc-900/40 bg-black/80 backdrop-blur-md px-6 py-4 flex items-center justify-between transition-colors duration-500" id="navbar">
    <div class="flex items-center gap-3">
      <div class="h-8 w-8 rounded-full bg-white flex items-center justify-center text-black font-semibold text-sm cursor-pointer logo-hover shadow-lg">FC</div>
      <span class="font-display font-semibold text-lg tracking-wider">FILM & MOTION</span>
    </div>
    
    <!-- Navigation Items -->
    <div class="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-zinc-400 font-medium">
      <a href="#hero" class="nav-link hover:text-white transition-colors">Showreel</a>
      <a href="#about" class="nav-link hover:text-white transition-colors">About</a>
      <a href="#portfolio" class="nav-link hover:text-white transition-colors">Projects</a>
      <a href="#storyboard" class="nav-link hover:text-white transition-colors">Storyboard Spec</a>
      <a href="#contact" class="nav-link hover:text-white transition-colors">Connect</a>
    </div>

    <!-- Theme and Quick CTA -->
    <div class="flex items-center gap-4">
      <button id="themeToggle" class="p-2 rounded-full border border-zinc-800 hover:border-zinc-500 transition-colors cursor-pointer" aria-label="Toggle Theme">
        <!-- Sun Icon (revealed in dark mode) -->
        <svg id="sunIcon" class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg>
        <!-- Moon Icon (revealed in light mode) -->
        <svg id="moonIcon" class="w-4 h-4 text-zinc-500 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
      </button>
      <a href="#contact" class="bg-white text-black px-4 py-2 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer shadow-md shadow-white/5 inline-block">BOOK SYNC</a>
    </div>
  </nav>

  <!-- HERO SHOWREEL SECTION -->
  <section id="hero" class="relative w-full h-screen flex flex-col justify-end px-6 md:px-16 pb-20 overflow-hidden pt-24">
    <!-- Background Loop Showreel Video Placeholder -->
    <div class="absolute inset-0 z-0 bg-neutral-950">
      <video id="hero-video" class="w-full h-full object-cover opacity-55 transition-transform duration-[10s] ease-linear hover:scale-105" autoplay loop muted playsinline>
        <source src="https://assets.mixkit.co/videos/preview/mixkit-urban-fashion-video-of-a-man-in-running-clothes-32943-large.mp4" type="video/mp4">
        <!-- Replace prompt or src with your 90-second showreel clip! -->
      </video>
      <!-- Gradient scrim to make sure texts are contrastive -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 z-10 transition-colors duration-500" id="hero-gradient"></div>
    </div>

    <!-- Hero Content -->
    <div class="relative z-20 max-w-4xl space-y-6">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs text-zinc-300 font-mono ring-1 ring-white/10 uppercase tracking-widest">
        <span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
        DIRECTOR OF PHOTOGRAPHY & GRAPHIC ARTIST
      </div>
      
      <h1 class="text-4xl sm:text-6xl md:text-8xl font-bold font-display tracking-tighter leading-none">
        CRAFTING UNTAMED <span class="bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-neutral-100 to-zinc-400">VISUAL WORLDS.</span>
      </h1>

      <p class="text-zinc-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
        I edit high-impact commercial campaigns, shoot modular multi-spectral film projects, and design responsive 3D environments that feel like breathing poetry.
      </p>

      <div class="flex flex-wrap gap-4 items-center pt-4">
        <a href="#portfolio" class="bg-white text-black hover:bg-zinc-200 text-sm font-semibold uppercase tracking-wider px-8 py-4 rounded-full transition-all flex items-center gap-3 select-btn group shadow-lg shadow-white/15">
          VIEW PORTFOLIO
          <svg class="w-4 h-4 transform group-hover:translate-x-1 duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </a>
        <button onclick="document.getElementById('about').scrollIntoView({behavior: 'smooth'})" class="border border-white/20 text-white hover:border-white hover:bg-white/5 text-sm font-semibold uppercase tracking-wider px-6 py-4 rounded-full transition-colors select-btn">
          REEL DETAILS
        </button>
      </div>
    </div>

    <!-- Live Media Prompt Spec Footer -->
    <div class="absolute bottom-6 right-6 z-20 flex items-center gap-3 text-xs text-zinc-500 font-mono">
      <span class="w-2 h-2 rounded-full bg-zinc-600 animate-pulse"></span>
      SHOWREEL // CL108 // 90S RUNTIME
    </div>
  </section>

  <!-- BRAND STATEMENT / SPEC SHIELD -->
  <section id="about" class="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-zinc-900 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
    <!-- Text Specs -->
    <div class="col-span-1 md:col-span-7 space-y-6">
      <h2 class="text-zinc-500 font-mono text-sm uppercase tracking-widest font-bold">01 // CREATIVE CREDO</h2>
      <p class="text-2xl sm:text-4xl font-display font-light text-zinc-100 leading-tight">
        "Every frame is a sensory landscape. If the light does not tell a story, then the screen is simply an empty mirror."
      </p>
      <div class="space-y-4 text-zinc-400 font-sans max-w-xl md:text-base leading-relaxed text-sm">
        <p>
          I am a specialized Director of Photography, Photographer, Video Editor, and Motion Graphic Artist. My career has focused on removing barriers between pure cinematic storytelling and digital precision.
        </p>
        <p>
          By syncing camera timing matrices with modular kinetic typography rigs, I construct immersive digital installations that seize focus. My custom workflows save production overhead while driving visual depth.
        </p>
      </div>
    </div>
    
    <!-- Specs Stats Bento Widget -->
    <div class="col-span-1 md:col-span-5 bg-zinc-950/80 border border-zinc-900 rounded-3xl p-8 space-y-6 flex flex-col justify-between shadow-2xl">
      <div class="flex items-center justify-between">
        <span class="font-mono text-xs text-zinc-500 uppercase">RIG SPEC & TOOLSTACK</span>
        <svg class="h-5 w-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-black/40 border border-zinc-900/60 p-4 rounded-xl">
          <span class="block text-xl font-bold font-display text-white">RED/SONY</span>
          <span class="block text-xs text-zinc-500 font-mono uppercase mt-1">Multi-Cam Rigs</span>
        </div>
        <div class="bg-black/40 border border-zinc-900/60 p-4 rounded-xl">
          <span class="block text-xl font-bold font-display text-white">C4D/REDSHIFT</span>
          <span class="block text-xs text-zinc-500 font-mono uppercase mt-1">3D Production</span>
        </div>
        <div class="bg-black/40 border border-zinc-900/60 p-4 rounded-xl">
          <span class="block text-xl font-bold font-display text-white">DAVINCI / PP</span>
          <span class="block text-xs text-zinc-500 font-mono uppercase mt-1">Grade & Timeline</span>
        </div>
        <div class="bg-black/40 border border-zinc-900/60 p-4 rounded-xl">
          <span class="block text-xl font-bold font-display text-white">09 MILLION +</span>
          <span class="block text-xs text-zinc-500 font-mono uppercase mt-1">Views Delivered</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ASYMMETRICAL PORTFOLIO GALLERY -->
  <section id="portfolio" class="py-24 bg-zinc-950/45 border-t border-zinc-900">
    <div class="max-w-7xl mx-auto px-6 md:px-16">
      
      <!-- Section Info -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div class="space-y-4">
          <span class="font-mono text-zinc-500 text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
            02 // CURATED EXHIBITION
          </span>
          <h2 class="text-3xl sm:text-5xl font-bold font-display tracking-tight text-white leading-none">
            UNRECONSTRUCTED SCENES.
          </h2>
          <p class="text-zinc-400 text-sm sm:text-base max-w-lg">
            Hover to ignite preview snippets. Click any piece to dissect its core story blueprint, technical timeline specs & tools used.
          </p>
        </div>
        
        <!-- Category Filter Pills -->
        <div class="flex flex-wrap gap-2 text-xs uppercase tracking-widest font-medium text-zinc-400" id="filter-container">
          <button class="px-4 py-2 border border-zinc-800 rounded-full hover:border-white hover:text-white transition-all active-filter bg-white text-black" onclick="filterGallery('All', this)">ALL</button>
          <button class="px-4 py-2 border border-zinc-800 rounded-full hover:border-white hover:text-white transition-all" onclick="filterGallery('Videography', this)">VIDEOGRAPHY</button>
          <button class="px-4 py-2 border border-zinc-800 rounded-full hover:border-white hover:text-white transition-all" onclick="filterGallery('Photography', this)">PHOTOGRAPHY</button>
          <button class="px-4 py-2 border border-zinc-800 rounded-full hover:border-white hover:text-white transition-all" onclick="filterGallery('Motion Graphics', this)">MOTION</button>
          <button class="px-4 py-2 border border-zinc-800 rounded-full hover:border-white hover:text-white transition-all" onclick="filterGallery('Video Editing', this)">EDITING</button>
        </div>
      </div>

      <!-- Asymmetrical Editorial Masonry Grid -->
      <div class="masonry-grid" id="gallery-grid">
        
        <!-- Case Item-01: Motion -->
        <div class="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/80 cursor-pointer masonry-item-tall masonry-item-wide gallery-item" data-category="Motion Graphics">
          <div class="absolute inset-0 bg-neutral-900">
            <!-- Static Image -->
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Echelon Architecture" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-10 opacity-100" referrerPolicy="no-referrer">
            <!-- Simulated Hover Loop Video -->
            <video class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" loop muted playsinline>
              <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-futuristic-minimalist-city-at-night-42294-large.mp4" type="video/mp4">
            </video>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 transition-colors"></div>
          </div>

          <!-- Hover Overlay Specs -->
          <div class="absolute inset-0 z-25 flex flex-col justify-end p-8 space-y-3">
            <span class="font-mono text-zinc-400 text-xs tracking-widest uppercase">KRONOS Developments // Motion Design</span>
            <h3 class="text-2xl sm:text-3xl font-bold font-display text-white">ECHELON // Architectural Motion</h3>
            
            <div class="flex flex-wrap gap-2 pt-2">
              <span class="bg-white/10 px-2.5 py-1 rounded text-2xs uppercase tracking-wider font-mono text-neutral-300">Cinema 4D</span>
              <span class="bg-white/10 px-2.5 py-1 rounded text-2xs uppercase tracking-wider font-mono text-neutral-300">After Effects</span>
            </div>
          </div>

          <!-- Soundwave pulse visual when hovered -->
          <div class="absolute top-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end gap-1 text-white">
            <span class="font-mono text-3xs uppercase tracking-widest mr-2">PLAY SNIPPET</span>
            <div class="pulse-bar"></div>
            <div class="pulse-bar"></div>
            <div class="pulse-bar"></div>
            <div class="pulse-bar"></div>
          </div>
        </div>

        <!-- Case Item-02: Videography -->
        <div class="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/80 cursor-pointer masonry-item-tall gallery-item" data-category="Videography">
          <div class="absolute inset-0 bg-neutral-900">
            <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80" alt="Silent Whisper DP" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-15 opacity-100" referrerPolicy="no-referrer">
            <video class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" loop muted playsinline>
              <source src="https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-video-camera-filming-at-sunset-41484-large.mp4" type="video/mp4">
            </video>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
          </div>

          <div class="absolute inset-0 z-25 flex flex-col justify-end p-6 space-y-2">
            <span class="font-mono text-zinc-450 text-2xs uppercase tracking-widest">Neo-Noir Films // Videography</span>
            <h3 class="text-xl font-bold font-display text-white">THE SILENT WHISPER // Cinematic Short</h3>
            <div class="flex flex-wrap gap-1.5 pt-1">
              <span class="bg-white/10 px-2 py-0.5 rounded text-3xs uppercase tracking-wider font-mono text-zinc-300">RED V-Raptor</span>
              <span class="bg-white/10 px-2 py-0.5 rounded text-3xs uppercase tracking-wider font-mono text-zinc-300">DaVinci Grade</span>
            </div>
          </div>
        </div>

        <!-- Case Item-03: Photography -->
        <div class="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/80 cursor-pointer masonry-item-tall gallery-item" data-category="Photography">
          <div class="absolute inset-0 bg-neutral-900">
            <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80" alt="Vogue Fashion" class="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110 opacity-85 group-hover:opacity-100" referrerPolicy="no-referrer">
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10"></div>
          </div>

          <div class="absolute inset-0 z-25 flex flex-col justify-end p-6 space-y-2">
            <span class="font-mono text-zinc-450 text-2xs uppercase tracking-widest">Vogue Fashion // Portrait</span>
            <h3 class="text-xl font-bold font-display text-white">VOGUE // Cyberpunk Autumn Editorial</h3>
            <div class="flex flex-wrap gap-1.5 pt-1">
              <span class="bg-white/10 px-2 py-0.5 rounded text-3xs uppercase tracking-wider font-mono text-zinc-300">85mm f/1.2</span>
              <span class="bg-white/10 px-2 py-0.5 rounded text-3xs uppercase tracking-wider font-mono text-zinc-300">Gelled Strobes</span>
            </div>
          </div>
        </div>

        <!-- Case Item-04: Video Editing -->
        <div class="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800/80 cursor-pointer masonry-item-wide gallery-item" data-category="Video Editing">
          <div class="absolute inset-0 bg-neutral-900">
            <img src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80" alt="Chronicles Athlete" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-15" referrerPolicy="no-referrer">
            <video class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none" loop muted playsinline>
              <source src="https://assets.mixkit.co/videos/preview/mixkit-athlete-running-on-stadium-tracks-at-sunrise-33886-large.mp4" type="video/mp4">
            </video>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
          </div>

          <div class="absolute inset-0 z-25 flex flex-col justify-end p-6 space-y-2">
            <span class="font-mono text-zinc-450 text-2xs uppercase tracking-widest">RUSH Athletics // Timeline Specs</span>
            <h3 class="text-xl font-bold font-display text-white">CHRONICLES // Sports Intro</h3>
            <div class="flex flex-wrap gap-1.5 pt-1">
              <span class="bg-white/10 px-2 py-0.5 rounded text-3xs uppercase tracking-wider font-mono text-zinc-300">Premiere Pro</span>
              <span class="bg-white/10 px-2 py-0.5 rounded text-3xs uppercase tracking-wider font-mono text-zinc-300">Rhythm Ramping</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- STORYBOARD SPECS PANEL & TIMELINE MATRIX -->
  <section id="storyboard" class="py-24 max-w-7xl mx-auto px-6 md:px-16 border-t border-zinc-900">
    <div class="space-y-4 mb-16">
      <span class="font-mono text-zinc-500 text-sm uppercase tracking-widest font-semibold">03 // TIMELINE STORYBOARDING</span>
      <h2 class="text-3xl sm:text-5xl font-bold font-display text-zinc-100">SCENE-BY-SCENE ANIMATIC DIALOGUE</h2>
      <p class="text-zinc-400 text-sm sm:text-base max-w-2xl">
        A preview of my production pre-visualization layout. In visual cinematic mediums, planning the rhythmic pacing before cutting saves days of post-production.
      </p>
    </div>

    <!-- Interactive Animatic Flow -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="col-span-1 lg:col-span-4 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 h-[440px] flex flex-col justify-between select-none relative overflow-hidden group">
        <div class="absolute inset-0 overflow-hidden opacity-10">
          <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80" alt="Liquid backdrop" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer">
        </div>
        <div class="relative z-10 flex items-center justify-between">
          <span class="font-mono text-xs text-zinc-500 uppercase">ACTIVE TIMECODE FEED</span>
          <span class="px-2 py-1 bg-red-500/20 text-red-500 rounded text-3xs font-mono font-bold animate-pulse uppercase">LIVE SPEC</span>
        </div>
        
        <div class="relative z-10 my-auto text-center space-y-4">
          <div class="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white mb-2" id="timecode-timer">00:00:00</div>
          <p class="text-zinc-400 text-xs font-mono uppercase" id="storyboard-phase">PHASE 1: THE ESTABLISHING FRAME</p>
          <p class="text-zinc-200 text-sm italic font-sans max-w-xs mx-auto" id="storyboard-desc">"High-contrast desaturated misty forest. Establishing anamorphic camera angle."</p>
        </div>

        <div class="relative z-10 border-t border-zinc-900/80 pt-4 flex justify-between items-center text-xs text-neutral-500">
          <span>PROJECT REEL: CL108</span>
          <span id="storyboard-cue" class="font-mono">VISUAL CUE: DEEP NOIR</span>
        </div>
      </div>

      <!-- Linear Animatic Chronology Steps -->
      <div class="col-span-1 lg:col-span-8 space-y-4">
        
        <div class="flex flex-col sm:flex-row gap-4 p-5 bg-zinc-950/80 border border-zinc-900 hover:border-zinc-700 rounded-2xl transition-all cursor-pointer storyboard-step-card active-step" data-timecode="00:00 - 00:15" data-phase="PHASE 1: THE HOOK FRAME" data-desc="Macro lens wireframe rendering. Deep low-frequency synthetic pulses build visual tension." data-cue="VISUAL CUE: LINEAR WIRE" onclick="syncStoryboard(this)">
          <div class="text-xl font-bold font-mono text-white sm:w-28 shrink-0">00:15S</div>
          <div class="space-y-1">
            <h4 class="font-display font-semibold text-lg text-white">THE GEOMETRIC ESTABLISHING SHOT</h4>
            <p class="text-zinc-400 text-sm">Macro wireframe geometry transitions into solid brutalist elements under warm golden keylights.</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 p-5 bg-zinc-950/20 border border-zinc-900/60 hover:border-zinc-700 rounded-2xl transition-all cursor-pointer storyboard-step-card" data-timecode="00:15 - 00:40" data-phase="PHASE 2: THE VELOCITY RUN" data-desc="Rapid shutter angle (45 degrees) captures speed with high athletic definition." data-cue="VISUAL CUE: KINETIC SPEED" onclick="syncStoryboard(this)">
          <div class="text-xl font-bold font-mono text-zinc-500 sm:w-28 shrink-0">00:40S</div>
          <div class="space-y-1">
            <h4 class="font-display font-semibold text-lg text-white">DYNAMIC FLY-THROUGH SEQUENCE</h4>
            <p class="text-zinc-400 text-sm">Linear camera fly-by through brutalist concrete pillars synced directly with bass transients.</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 p-5 bg-zinc-950/20 border border-zinc-900/60 hover:border-zinc-700 rounded-2xl transition-all cursor-pointer storyboard-step-card" data-timecode="00:40 - 01:10" data-phase="PHASE 3: SPLASH FOCUS" data-desc="Iridescent liquid mercury structures colliding over dynamic particles." data-cue="VISUAL CUE: MAGENTA GLOW" onclick="syncStoryboard(this)">
          <div class="text-xl font-bold font-mono text-zinc-500 sm:w-28 shrink-0">01:10S</div>
          <div class="space-y-1">
            <h4 class="font-display font-semibold text-lg text-white">TEXTURAL SPLASH & REFLECTION</h4>
            <p class="text-zinc-400 text-sm">Rough textures collide abstractly with high fluid reflections, illuminated by high-contrast gelled strobes.</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 p-5 bg-zinc-950/20 border border-zinc-900/60 hover:border-zinc-700 rounded-2xl transition-all cursor-pointer storyboard-step-card" data-timecode="01:10 - 01:30" data-phase="PHASE 4: OUTRO DECAY" data-desc="Drone camera zoom back revealing high basalt solitary isolation monolith cliffs." data-cue="VISUAL CUE: CHROMATIC FADE" onclick="syncStoryboard(this)">
          <div class="text-xl font-bold font-mono text-zinc-500 sm:w-28 shrink-0">01:30S</div>
          <div class="space-y-1">
            <h4 class="font-display font-semibold text-lg text-white">LOGO REDUCTION & OUTRO</h4>
            <p class="text-zinc-400 text-sm">The 3D environment condenses abstractly into a single high-contrast vector brand stamp.</p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- SOURCE CODES EXPORTER TABS PANEL -->
  <section class="bg-black py-20 px-6 md:px-16 border-t border-zinc-900" id="exporter">
    <div class="max-w-7xl mx-auto">
      <div class="space-y-4 mb-12">
        <span class="font-mono text-zinc-500 text-sm uppercase tracking-widest font-semibold">04 // SOURCE DELIVERY SYSTEM</span>
        <h2 class="text-3xl sm:text-4xl font-bold font-display text-white">READY-TO-RUN STANDALONE CODE</h2>
        <p class="text-zinc-400 text-xs sm:text-sm max-w-xl">
          As requested by our visual design specs, copy the direct, fully cohesive raw code segments below for instant production hosting outside of the React container.
        </p>
      </div>

      <!-- Standalone Export Box Accordions/Tabs -->
      <div class="border border-zinc-900 rounded-3xl bg-neutral-950 overflow-hidden shadow-2xl">
        <div class="flex border-b border-zinc-900 text-xs uppercase font-mono tracking-widest text-zinc-400 overflow-x-auto bg-black">
          <button class="px-6 py-4 border-r border-zinc-900 hover:text-white transition-all bg-zinc-950/70 text-white font-semibold flex items-center gap-2 cursor-pointer focus:outline-none" onclick="toggleCodeTab('html-tab', this)">
            <span class="w-2 h-2 rounded-full bg-orange-500"></span> INDEX.HTML
          </button>
          <button class="px-6 py-4 border-r border-zinc-900 hover:text-white transition-all flex items-center gap-2 cursor-pointer focus:outline-none" onclick="toggleCodeTab('css-tab', this)">
            <span class="w-2 h-2 rounded-full bg-blue-500"></span> STYLES.CSS
          </button>
          <button class="px-6 py-4 border-r border-zinc-900 hover:text-white transition-all flex items-center gap-2 cursor-pointer focus:outline-none" onclick="toggleCodeTab('js-tab', this)">
            <span class="w-2 h-2 rounded-full bg-yellow-500"></span> SCRIPT.JS
          </button>
        </div>

        <div class="p-6 text-zinc-300 font-mono text-xs max-h-96 overflow-y-auto" id="code-content-wrapper">
          <!-- HTML TAB CONTENT -->
          <pre id="html-tab" class="code-tab-panel text-left"><code class="language-html">
  &lt;!-- COPY SELECTION: Ready to run index.html --&gt;
  &lt;!DOCTYPE html&gt;
  &lt;html lang="en" class="scroll-smooth"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Cinematic Portfolio | Creative Artist&lt;/title&gt;
    &lt;!-- Tailwind CSS CDN --&gt;
    &lt;script src="https://cdn.tailwindcss.com"&gt;&lt;/script&gt;
    &lt;link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&amp;family=Inter:wght@300;400;500;600&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap" rel="stylesheet"&gt;
  &lt;/head&gt;
  &lt;body class="bg-black text-white"&gt;
     &lt;!-- Find custom scripts and theme engines in script.js --&gt;
  &lt;/body&gt;
  &lt;/html&gt;
          </code></pre>

          <!-- CSS TAB CONTENT (Hidden initially) -->
          <pre id="css-tab" class="code-tab-panel hidden text-left"><code class="language-css">
  /* CSS STYLESHEET EXCISE */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 9999px;
  }
  .custom-cursor {
    width: 12px;
    height: 12px;
    background: #fff;
    mix-blend-mode: difference;
  }
          </code></pre>

          <!-- JS TAB CONTENT (Hidden initially) -->
          <pre id="js-tab" class="code-tab-panel hidden text-left"><code class="language-js">
  // VANILLA JS COMPONENT INTERACTIVE ENGINE
  document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  });
          </code></pre>
        </div>

        <div class="bg-zinc-950 p-4 border-t border-zinc-900/80 flex items-center justify-between">
          <span class="text-3s text-zinc-500 font-mono">COMPILED BY CHRONOMETRIC BUILD ENGINE</span>
          <button class="bg-zinc-800 text-white font-mono font-semibold px-4 py-2 hover:bg-white hover:text-black rounded transition-colors cursor-pointer text-2xs" onclick="copyCurrentCodeValue()">
            COPY ACTIVE CODE
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER CONNECT SECTION -->
  <footer id="contact" class="py-24 px-6 md:px-16 border-t border-zinc-900 bg-zinc-950/60 relative overflow-hidden">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative z-10">
      
      <!-- Connect message -->
      <div class="col-span-1 md:col-span-8 space-y-6">
        <span class="font-mono text-zinc-500 text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          05 // INTERACTIVE CONTACT TRANSIT
        </span>
        <h2 class="text-4xl sm:text-6xl md:text-7xl font-bold font-display tracking-tighter text-white">Let's orchestrate some frames.</h2>
        <p class="text-zinc-400 text-sm sm:text-base max-w-xl">
          Interested in booking a 90-second customized animatic test or scheduling commercial timeline grading sync? Drop me a ping. Currently taking freelance bookings globally.
        </p>

        <!-- Social Specs -->
        <div class="flex flex-wrap gap-8 pt-6 font-mono text-xs sm:text-sm text-zinc-400">
          <a href="#" class="hover:text-white transition-colors">VIMEO // <span>@FCEDITOR</span></a>
          <a href="#" class="hover:text-white transition-colors">INSTAGRAM // <span>@FCSYNC</span></a>
          <a href="#" class="hover:text-white transition-colors">YOUTUBE // <span>@FCSTUDIO</span></a>
          <a href="#" class="hover:text-white transition-colors">LINKEDIN // <span>@FCCREATOR</span></a>
        </div>
      </div>

      <!-- Quick Message form -->
      <div class="col-span-1 md:col-span-4 bg-black/60 border border-zinc-900 p-8 rounded-3xl space-y-4">
        <h3 class="font-display font-semibold text-lg text-white">SECURE SYNC TERMINAL</h3>
        <p class="text-zinc-500 text-3xs font-mono uppercase tracking-wider">Direct routing to visual artist mailbox.</p>
        
        <form class="space-y-4 pt-2" onsubmit="event.preventDefault(); alert('Visual Sync message simulated successfully!');">
          <div>
            <label class="block text-3xs text-zinc-450 uppercase font-mono mb-1">Your Pitch Identity</label>
            <input type="text" placeholder="e.g. Creative Producer at Vogue" class="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-3 text-xs focus:border-white focus:outline-none focus:ring-0 text-white" required>
          </div>
          <div>
            <label class="block text-3xs text-zinc-450 uppercase font-mono mb-1">Timeline Budget Scope</label>
            <select class="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-3 text-xs focus:border-white focus:outline-none focus:ring-0 text-zinc-400">
              <option>$5k - $15k Campaign</option>
              <option>$15k - $50k Feature Spec</option>
              <option>$50k+ Cinematic Production</option>
            </select>
          </div>
          <div>
            <label class="block text-3xs text-zinc-450 uppercase font-mono mb-1">Pitch Deck Frame Brief</label>
            <textarea placeholder="Brief summary of storyboard concepts..." rows="3" class="w-full bg-zinc-950 border border-zinc-900 rounded-lg p-3 text-xs focus:border-white focus:outline-none focus:ring-0 text-white" required></textarea>
          </div>
          <button type="submit" class="w-full bg-white text-black font-semibold uppercase tracking-wider text-2xs p-3.5 rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer">INITIATE SYNCHRONIZATION</button>
        </form>
      </div>

    </div>
    
    <div class="max-w-7xl mx-auto border-t border-zinc-900 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-3xs text-zinc-505 font-mono gap-4">
      <span>© 2026 CINEMATIC CREATOR WORKSPACE. PROCESSED VIA STANDALONE SYSTEMS.</span>
      <span>COORDINATES: LAT: 35.6762° N // LON: 139.6503° E</span>
    </div>
  </footer>

  <!-- VANILLA JAVASCRIPT LOGIC BLOCK -->
  <script>
    // Theme Engine
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      if (body.classList.contains('light-theme')) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      }
    });

    // Cursor Tracking logic with smooth decay
    const cursor = document.getElementById('cursor');
    const cursorRing = document.getElementById('cursor-ring');
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      // Show immediately
      cursor.style.opacity = 1;
      cursorRing.style.opacity = 1;
      
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Smooth trace update for Ring cursor using requestAnimationFrame
    function animateCursorRing() {
      const dX = mouseX - ringX;
      const dY = mouseY - ringY;
      ringX += dX * 0.15;
      ringY += dY * 0.15;
      
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      
      requestAnimationFrame(animateCursorRing);
    }
    requestAnimationFrame(animateCursorRing);

    // Expand cursor ring on clickable links or video elements
    const hoverables = document.querySelectorAll('a, button, select, input, textarea, .gallery-item, .storyboard-step-card');
    hoverables.forEach(item => {
      item.addEventListener('mouseenter', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursorRing.style.borderColor = 'rgba(255, 255, 255, 0.8)';
        cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
      });
      item.addEventListener('mouseleave', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });

    // Asymmetric masonry filtering
    function filterGallery(category, buttonElement) {
      // Remove active button color state
      const buttons = document.querySelectorAll('#filter-container button');
      buttons.forEach(btn => {
        btn.classList.remove('bg-white', 'text-black', 'active-filter');
      });
      buttonElement.classList.add('bg-white', 'text-black', 'active-filter');

      // Filter elements
      const items = document.querySelectorAll('.gallery-item');
      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'All' || itemCat === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }

    // Interactive Storyboard specs synchronizer
    function syncStoryboard(cardElement) {
      // Deactivate other timeline steps
      const cards = document.querySelectorAll('.storyboard-step-card');
      cards.forEach(card => {
        card.classList.remove('bg-zinc-950/80', 'border-zinc-700', 'active-step');
        card.classList.add('bg-zinc-950/20', 'border-zinc-900/60');
        card.querySelector('.font-mono').classList.remove('text-white');
        card.querySelector('.font-mono').classList.add('text-zinc-505');
      });

      // Activate clicked one
      cardElement.classList.add('bg-zinc-950/80', 'border-zinc-700', 'active-step');
      cardElement.classList.remove('bg-zinc-950/20', 'border-zinc-900/60');
      cardElement.querySelector('.font-mono').classList.add('text-white');
      cardElement.querySelector('.font-mono').classList.remove('text-zinc-505');

      // Sync active state attributes to visualizer feeds
      const timecode = cardElement.getAttribute('data-timecode');
      const phase = cardElement.getAttribute('data-phase');
      const desc = cardElement.getAttribute('data-desc');
      const cue = cardElement.getAttribute('data-cue');

      document.getElementById('timecode-timer').textContent = timecode.split(' - ')[1] + ':00';
      document.getElementById('storyboard-phase').textContent = phase;
      document.getElementById('storyboard-desc').textContent = '"' + desc + '"';
      document.getElementById('storyboard-cue').textContent = cue;
    }

    // Code explorer tab toggles
    let activeCodeTabId = 'html-tab';
    function toggleCodeTab(tabId, btnElement) {
      // Hide all panels
      const panels = document.querySelectorAll('.code-tab-panel');
      panels.forEach(p => p.classList.add('hidden'));
      
      // Remove states of other buttons in bar
      const btns = btnElement.parentElement.querySelectorAll('button');
      btns.forEach(b => {
        b.classList.remove('bg-zinc-950/70', 'text-white', 'font-semibold');
      });

      // Show selected panel
      document.getElementById(tabId).classList.remove('hidden');
      btnElement.classList.add('bg-zinc-950/70', 'text-white', 'font-semibold');
      activeCodeTabId = tabId;
    }

    // Copy code helper
    function copyCurrentCodeValue() {
      const activePre = document.getElementById(activeCodeTabId);
      const text = activePre.textContent.trim();
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied ' + activeCodeTabId.toUpperCase().replace('-TAB', '') + ' successfully to clipboard!');
      });
    }
  </script>
</body>
</html>`;

export const EXPORT_CSS_CODE = `/* ==========================================
   CINEMATIC CREATOR STYLESHEET (STYLES.CSS)
   ========================================== */

/* Font Definitions */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

/* Dynamic Typography Resets */
html {
  font-family: 'Inter', sans-serif;
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

h1, h2, h3, h4, .font-display {
  font-family: 'Space Grotesk', sans-serif;
  letter-spacing: -0.02em;
}

code, .font-mono {
  font-family: 'JetBrains Mono', monospace;
}

/* Custom Interactive Cursor Nodes */
.custom-cursor {
  width: 12px;
  height: 12px;
  background-color: #ffffff;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  transition: width 0.2s, height 0.2s, background-color 0.2s, mix-blend-mode 0.2s;
}

.custom-cursor-ring {
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 9998;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out, border-color 0.2s;
}

/* Day/Night Theme Override Variables */
body.light-theme {
  background-color: #fafafa !important;
  color: #121212 !important;
}

body.light-theme .custom-cursor {
  background-color: #000000 !important;
}

body.light-theme .custom-cursor-ring {
  border-color: rgba(0, 0, 0, 0.45) !important;
}

body.light-theme nav {
  background-color: rgba(255, 255, 255, 0.85) !important;
  border-color: rgba(0, 0, 0, 0.08) !important;
}

body.light-theme .bg-zinc-950 {
  background-color: #f1f1f1 !important;
}

body.light-theme .border-zinc-900 {
  border-color: #e5e5e5 !important;
}

/* Play/Active sound bar pulse */
.pulse-bar {
  width: 3px;
  height: 12px;
  background-color: #ffffff;
  transform-origin: bottom;
  animation: barPulse 0.8s ease-in-out infinite alternate;
}
.pulse-bar:nth-child(2) { animation-delay: 0.15s; height: 20px; }
.pulse-bar:nth-child(3) { animation-delay: 0.3s; height: 16px; }
.pulse-bar:nth-child(4) { animation-delay: 0.05s; height: 22px; }

@keyframes barPulse {
  0% { transform: scaleY(0.4); }
  100% { transform: scaleY(1.3); }
}

/* Masonry Grid Structural Directives */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-rows: 240px;
  gap: 1.5rem;
}

.masonry-item-tall {
  grid-row: span 2;
}

.masonry-item-wide {
  grid-column: span 2;
}

@media (max-width: 640px) {
  .masonry-item-wide {
    grid-column: span 1;
  }
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: rgba(150, 150, 150, 0.25);
  border-radius: 99px;
}`;

export const EXPORT_JS_CODE = `/* ==========================================
   CINEMATIC CREATOR VANILLA JAVASCRIPT (SCRIPT.JS)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sleek Day/Night Theme Controls
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  const body = document.body;

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-theme');
      if (body.classList.contains('light-theme')) {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      }
    });
  }

  // 2. High-Performance Custom Mouse Cursor Follower
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  if (cursor && cursorRing) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.opacity = '1';
      cursorRing.style.opacity = '1';
      
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Run animation loop via requestAnimationFrame (lag-decay trail)
    function smoothFollowCursor() {
      const dX = mouseX - ringX;
      const dY = mouseY - ringY;
      ringX += dX * 0.16; // Lerp velocity rate
      ringY += dY * 0.16;
      
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      
      requestAnimationFrame(smoothFollowCursor);
    }
    requestAnimationFrame(smoothFollowCursor);

    // Magnify cursor over hover-enabled elements
    const hoverElements = document.querySelectorAll('a, button, select, input, textarea, .gallery-item, .storyboard-step-card');
    hoverElements.forEach(elem => {
      elem.addEventListener('mouseenter', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursorRing.style.borderColor = body.classList.contains('light-theme') ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.85)';
        cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
      });
      elem.addEventListener('mouseleave', () => {
        cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorRing.style.borderColor = body.classList.contains('light-theme') ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.35)';
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
  }

  // 3. Immersive Gallery Filtration Engine
  window.filterGallery = function(category, buttonElement) {
    // Remove active filters from all control button siblings
    const filterButtons = document.querySelectorAll('#filter-container button');
    filterButtons.forEach(btn => {
      btn.classList.remove('bg-white', 'text-black', 'active-filter');
    });
    
    // Make selected filter high-contrast
    buttonElement.classList.add('bg-white', 'text-black', 'active-filter');

    // Show/Hide Items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (category === 'All' || itemCategory === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };

  // 4. Scene Storyboard Synchronizer
  window.syncStoryboard = function(cardElement) {
    // De-activate all timeline nodes
    const siblingCards = document.querySelectorAll('.storyboard-step-card');
    siblingCards.forEach(card => {
      card.classList.remove('bg-zinc-950/80', 'border-zinc-700', 'active-step');
      card.classList.add('bg-zinc-950/20', 'border-zinc-900/60');
    });

    // Make target step shine
    cardElement.classList.add('bg-zinc-950/80', 'border-zinc-700', 'active-step');
    cardElement.classList.remove('bg-zinc-950/20', 'border-zinc-900/60');

    // Dynamically route attributes to visualizer HUD (Head Up Display)
    const timecode = cardElement.getAttribute('data-timecode');
    const phase = cardElement.getAttribute('data-phase');
    const desc = cardElement.getAttribute('data-desc');
    const cue = cardElement.getAttribute('data-cue');

    document.getElementById('timecode-timer').textContent = timecode.split(' - ')[1] + ':00';
    document.getElementById('storyboard-phase').textContent = phase;
    document.getElementById('storyboard-desc').textContent = '"' + desc + '"';
    document.getElementById('storyboard-cue').textContent = cue;
  };
});`;
