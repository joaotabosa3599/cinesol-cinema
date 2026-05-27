'use client';

import MovieCard from './MovieCard';

interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  poster: string;
  synopsis?: string;
}

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  isComingSoon?: boolean;
  onMovieClick: (movie: Movie) => void;
}

export default function MovieCarousel({ 
  title, 
  movies, 
  isComingSoon, 
  onMovieClick 
}: MovieCarouselProps) {
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white px-10">{title}</h2>
      
      <div className="flex overflow-x-auto gap-6 px-10 pb-5 snap-x snap-mandatory">
        
        {movies.map((movie) => (
          <div 
            key={movie.id} 
            onClick={() => onMovieClick(movie)}
            className="snap-start"
          >
            <MovieCard 
              title={movie.title}
              poster={movie.poster}
              duration={movie.duration}
              genre={movie.genre}
              isComingSoon={isComingSoon}
            />
          </div>
        ))}

      </div>
    </div>
  );
}
