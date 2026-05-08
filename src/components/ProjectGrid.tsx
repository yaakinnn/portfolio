import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Maximize2, Pause } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectGridProps {
  category: string;
  onFullScreen: (item: ProjectItem) => void;
}

const SAMPLE_PROJECTS: Record<string, ProjectItem[]> = {
  "Short-form Content": [
    {
      id: "sf-1",
      title: "Neon City Reels",
      category: "Short-form",
      thumbnail: "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://www.instagram.com/reel/DOk8BN8kacO/",
      description: "Visual exploration of urban neon aesthetics. (Instagram Reel Embed)"
    },
    {
      id: "sf-2",
      title: "Cinematic Product Reveal",
      category: "Short-form",
      thumbnail: "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Fast-paced product showcase with dynamic lighting. (YouTube Embed)"
    },
    {
      id: "sf-3",
      title: "Urban Motion Edit",
      category: "Short-form",
      thumbnail: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2022/09/06/130386-747352278_tiny.mp4",
      description: "Gritty urban environment showcase with synchronized sound design. (Direct Video)"
    },
     {
      id: "sf-4",
      title: "Urban Motion Edit",
      category: "Short-form",
      thumbnail: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2022/09/06/130386-747352278_tiny.mp4",
      description: "Gritty urban environment showcase with synchronized sound design."
    },
     {
      id: "sf-5",
      title: "Urban Motion Edit",
      category: "Short-form",
      thumbnail: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2022/09/06/130386-747352278_tiny.mp4",
      description: "Gritty urban environment showcase with synchronized sound design."
    },
     {
      id: "sf-6",
      title: "Urban Motion Edit",
      category: "Short-form",
      thumbnail: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2022/09/06/130386-747352278_tiny.mp4",
      description: "Gritty urban environment showcase with synchronized sound design."
    },
     {
      id: "sf-7",
      title: "Urban Motion Edit",
      category: "Short-form",
      thumbnail: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2022/09/06/130386-747352278_tiny.mp4",
      description: "Gritty urban environment showcase with synchronized sound design."
    }
  ],
  "Long-form Editing": [
    {
      id: "lf-1",
      title: "Documentary Feature",
      category: "Long-form",
      thumbnail: "https://images.pexels.com/photos/331684/pexels-photo-331684.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://www.youtube.com/watch?v=QPrNB9TG24g&list=RDQPrNB9TG24g&start_radio=1",
      description: "Deep-dive storytelling focusing on human perspective and pacing."
    },
    {
      id: "lf-2",
      title: "Corporate Brand Story",
      category: "Long-form",
      thumbnail: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2018/12/11/20067-306915354_tiny.mp4",
      description: "Professional narrative explaining company values and vision."
    }
  ],
  "Wedding Visuals": [
    {
      id: "w-1",
      title: "Timeless Ceremony",
      category: "Wedding",
      thumbnail: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2016/09/21/5496-184587635_tiny.mp4",
      description: "Emotional highlights from the main ceremony with soft-focus aesthetics."
    },
    {
      id: "w-2",
      title: "Bridal Preparation",
      category: "Wedding",
      thumbnail: "https://images.pexels.com/photos/3785927/pexels-photo-3785927.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2023/10/24/186358-877717462_tiny.mp4",
      description: "Candid moments captured during the morning preparations."
    }
  ],
  "Motion/3D Design": [
    {
      id: "m-1",
      title: "Abstract Geometry",
      category: "Motion/3D",
      thumbnail: "https://images.pexels.com/photos/4033148/pexels-photo-4033148.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2023/06/07/166299-835081079_tiny.mp4",
      description: "3D simulated environment exploring light and physics."
    },
    {
      id: "m-2",
      title: "Typographic Animation",
      category: "Motion/3D",
      thumbnail: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2021/08/31/87027-601429986_tiny.mp4",
      description: "Kinetic typography using advanced motion graphics techniques."
    }
  ],
  "Project Hub": [
    {
      id: "ph-1",
      title: "Master Portfolio",
      category: "Core Portfolio",
      thumbnail: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2021/08/04/83901-584732152_tiny.mp4",
      description: "A comprehensive look at the best works across all categories."
    }
  ],
};


const ProjectCard = ({ project, onFullScreen }: { project: ProjectItem; onFullScreen: (p: ProjectItem) => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isShortForm = project.category === 'Short-form';
  
  // Check if it's a direct video link for preview
  const isDirectVideo = project.videoUrl.match(/\.(mp4|webm|ogg|mov)$|^https:\/\/cdn\.pixabay\.com/i);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isDirectVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isDirectVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div 
      className={`project-card bg-white/[0.03] border border-white/[0.05] rounded-xl overflow-hidden relative group cursor-pointer ${isShortForm ? 'row-span-2' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onFullScreen(project)}
      layoutId={project.id}
    >
      <div className={`${isShortForm ? 'aspect-[9/16]' : 'aspect-video'} relative overflow-hidden bg-black`}>
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          style={{ 
            opacity: (isHovered && isDirectVideo) ? 0 : 1,
            filter: (isHovered && !isDirectVideo) ? 'brightness(0.7) blur(2px)' : 'none'
          }}
        />
        
        {isDirectVideo && (
          <video 
            ref={videoRef}
            src={project.videoUrl}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        )}

        <div className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-black/20" />
          {!isDirectVideo && (
            <div className="z-10 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Play size={20} className="text-white fill-white" />
            </div>
          )}
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <div className="p-2 glass rounded-full">
            <Maximize2 size={14} className="text-white" />
          </div>
        </div>
      </div>
      
      <div className="p-4 glass-dark relative z-10">
        <div className="text-[9px] text-white/40 mb-1 truncate uppercase tracking-widest">{project.category}</div>
        <div className="font-medium text-[13px] text-white/90 group-hover:text-white mb-1 shadow-black drop-shadow-sm">{project.title}</div>
        <p className="text-[10px] text-white/50 line-clamp-1 drop-shadow-sm">{project.description}</p>
      </div>
    </motion.div>
  );
};

export const ProjectGrid = ({ category, onFullScreen }: ProjectGridProps) => {
  const projects = SAMPLE_PROJECTS[category] || [];
  const isShortForm = category === "Short-form Content";

  return (
    <div className="p-5 pb-24 flex flex-col gap-6">
      <div className={`grid gap-4 ${isShortForm ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {projects.map(p => (
          <ProjectCard key={p.id} project={p} onFullScreen={onFullScreen} />
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="py-20 text-center text-white/20 uppercase tracking-widest text-[10px]">
          No items found in this directory
        </div>
      )}

      <div className="mt-8 p-4 bg-white/[0.02] rounded-lg border border-dashed border-white/10 mb-8">
        <h4 className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Category Context</h4>
        <p className="text-[11px] text-white/50 leading-relaxed font-light italic">
          Curated works in {category.toLowerCase()}. Exploring narrative structure and visual rhythm.
        </p>
      </div>
    </div>
  );
};
