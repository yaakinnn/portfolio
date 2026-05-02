import { motion } from 'motion/react';
import { LucideIcon, FolderOpen, FlaskConical, Mail, User } from 'lucide-react';
import { WindowType } from '../types';

interface DesktopIconProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}

export const DesktopIcon = ({ icon: Icon, label, onClick }: DesktopIconProps) => {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.05,
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group flex flex-col items-center gap-2 p-4 rounded-xl transition-colors w-24"
    >
      <div className="w-14 h-14 glass rounded-[1.2rem] flex items-center justify-center shadow-xl border-white/20 group-hover:border-white/50 transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
        <Icon 
          className="text-white group-hover:text-white transition-all relative z-10 filter-none group-hover:[filter:url(#pixelate)]" 
          size={24} 
        />
      </div>
      <span className="text-[10px] font-medium text-white/50 group-hover:text-white transition-all uppercase tracking-widest text-center">
        {label}
      </span>
    </motion.button>
  );
};

interface DockProps {
  onLaunch: (type: WindowType, title: string) => void;
}

export const Dock = ({ onLaunch }: DockProps) => {
  const items = [
    { type: WindowType.ABOUT, title: 'About', icon: User, label: 'Me' },
    { type: WindowType.FOLDER, title: 'Project Hub', icon: FolderOpen, label: 'Work' },
    { type: WindowType.LAB, title: 'Laboratory', icon: FlaskConical, label: 'Exp' },
    { type: WindowType.TERMINAL, title: 'Contact', icon: Mail, label: 'Mail' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
      <motion.div 
        layout
        className="glass p-2 px-3 rounded-[24px] flex items-center gap-3 shadow-2xl border-white/20"
      >
        {items.map((item) => (
          <motion.button
            key={item.title}
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onLaunch(item.type, item.title)}
            className="w-12 h-12 glass flex items-center justify-center rounded-2xl group relative border-white/10 hover:border-white/30 transition-all shadow-lg"
          >
            <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 rounded-2xl transition-colors" />
            <item.icon size={20} className="text-white/70 group-hover:text-white relative z-10" />
            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 px-2 py-1 rounded text-[9px] uppercase tracking-widest whitespace-nowrap border border-white/10">
              {item.label}
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};
