'use client';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

export interface MovieCardProps {
  title: string;
  poster: string;
  duration: string;
  genre: string;
  isComingSoon?: boolean;
}

export default function MovieCard({ title, poster, duration, genre, isComingSoon,}: MovieCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative flex-shrink-0 w-64 h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg shadow-black/40"
    >
      <img
        src={poster} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      
      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        {isComingSoon && (
          <span className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Em Breve
          </span>
        )}
        
        <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>
        
        <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
          <span className="bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded-md border border-slate-700">
            {genre}
          </span>
          <div className="flex items-center gap-1 text-amber-400">
            <Clock className="w-4 h-4" />
            <span className="text-white">{duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
