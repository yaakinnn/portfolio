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
      title: "Vertical Cinematic Reel",
      category: "Short-form",
      thumbnail: "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2021/04/12/70878-537446416_tiny.mp4",
      description: "Fast-paced vertical edit for social media with high-dynamic range color grading."
    },
    {
      id: "sf-2",
      title: "Product Showcase",
      category: "Short-form",
      thumbnail: "https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2020/09/20/50484-462118320_tiny.mp4",
      description: "Clean, minimalist product reveal focusing on texture and lighting."
    },
    {
      id: "sf-3",
      title: "Urban Motion Edit",
      category: "Short-form",
      thumbnail: "https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=800",
      videoUrl: "https://cdn.pixabay.com/video/2022/09/06/130386-747352278_tiny.mp4",
      description: "Gritty urban environment showcase with synchronized sound design."
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
      videoUrl: "https://cdn.pixabay.com/video/2016/10/25/6157-188812684_tiny.mp4",
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

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <motion.div 
      className="project-card bg-white/[0.03] border border-white/[0.05] rounded-xl overflow-hidden relative group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onFullScreen(project)}
      layoutId={project.id}
    >
      <div className="aspect-video relative">
        <img 
          src={project.thumbnail} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isHovered ? 0 : 1 }}
        />
        <video 
          ref={videoRef}
          src={project.videoUrl}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
        
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="p-1.5 glass rounded-full">
            <Maximize2 size={12} className="text-white" />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-[9px] opacity-30 mb-1 truncate uppercase tracking-widest">{project.category}</div>
        <div className="font-medium text-[13px] text-white/80 group-hover:text-white mb-1">{project.title}</div>
        <p className="text-[10px] opacity-40 line-clamp-1">{project.description}</p>
      </div>
    </motion.div>
  );
};

export const ProjectGrid = ({ category, onFullScreen }: ProjectGridProps) => {
  const projects = SAMPLE_PROJECTS[category] || [];

  return (
    <div className="p-5 pb-24 flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
