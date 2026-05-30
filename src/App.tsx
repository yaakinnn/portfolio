import { useState, useEffect } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import PortfolioGrid from './components/PortfolioGrid';
import FooterSection from './components/FooterSection';
import ProjectModal from './components/ProjectModal';
import { Project, PORTFOLIO_PROJECTS } from './data';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [projectsList, setProjectsList] = useState<Project[]>(() => {
    const cached = localStorage.getItem('portfolio-custom-projects');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        return PORTFOLIO_PROJECTS;
      }
    }
    return PORTFOLIO_PROJECTS;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('portfolio-owner-admin-mode') === 'true';
  });

  // Keep admin mode status synced with localstorage changes
  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem('portfolio-owner-admin-mode') === 'true');
    };
    window.addEventListener('storage', checkAdmin);
    const interval = setInterval(checkAdmin, 1000); // simple fast sync
    return () => {
      window.removeEventListener('storage', checkAdmin);
      clearInterval(interval);
    };
  }, []);

  const saveProjectsList = (newList: Project[]) => {
    setProjectsList(newList);
    localStorage.setItem('portfolio-custom-projects', JSON.stringify(newList));
    // If the currently selected project was updated or deleted:
    if (selectedProject) {
      const updatedSelected = newList.find(p => p.id === selectedProject.id);
      setSelectedProject(updatedSelected || null);
    }
  };

  // Check URL query parameters or hash to open a specific project directly on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('project');
    const hashMatch = window.location.hash.match(/#project-(.+)/);
    const targetId = projectId || (hashMatch ? hashMatch[1] : null);

    if (targetId) {
      const matched = projectsList.find(p => p.id === targetId);
      if (matched) {
        setSelectedProject(matched);
        
        // Scroll to portfolio section so they see the context when modal is opened or closed
        setTimeout(() => {
          const portfolioSec = document.getElementById('portfolio');
          if (portfolioSec) {
            portfolioSec.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500);
      }
    }
  }, [projectsList]);

  // Update query parameters when selected project changes
  useEffect(() => {
    if (selectedProject) {
      const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?project=${selectedProject.id}`;
      window.history.replaceState({ path: newUrl }, '', newUrl);
    } else {
      const params = new URLSearchParams(window.location.search);
      if (params.has('project')) {
        const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.replaceState({ path: newUrl }, '', newUrl);
      }
    }
  }, [selectedProject]);

  useEffect(() => {
    // Dynamic theme binding to document body element
    const body = document.body;
    if (theme === 'dark') {
      body.classList.remove('light-theme');
      body.classList.add('bg-zinc-950', 'text-white');
      body.style.backgroundColor = '#09090b'; // Tailwind slate-950 equivalent for stable paint
    } else {
      body.classList.add('light-theme');
      body.classList.remove('bg-zinc-950', 'text-white');
      body.style.backgroundColor = '#fafafa'; // Pristine Warm White for day light
    }
  }, [theme]);

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans antialiased selection:bg-amber-500/30">
      {/* High-Performance Custom Mouse Cursor Follower Node */}
      <CustomCursor theme={theme} />

      {/* Navigation Layer */}
      <Navbar theme={theme} setTheme={setTheme} />

      {/* Fullscreen Video Hero Area */}
      <Hero theme={theme} />

      {/* About/Design Credo Specifications */}
      <AboutSection theme={theme} />

      {/* Interative Asymmetric Portfolio Display */}
      <PortfolioGrid 
        theme={theme} 
        onSelectProject={setSelectedProject} 
        projectsList={projectsList} 
        saveProjectsList={saveProjectsList} 
        isAdmin={isAdmin} 
      />

      {/* Direct Sync Contacts Form Unit */}
      <FooterSection theme={theme} />

      {/* Active Project Details HUD Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        theme={theme}
        projectsList={projectsList}
        saveProjectsList={saveProjectsList}
      />
    </div>
  );
}
