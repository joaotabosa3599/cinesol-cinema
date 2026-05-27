'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Play, Film, Ticket, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MOVIES_NOW_PLAYING = [
  { id: '1', title: 'Duna: Parte 2', genre: 'Ficção', duration: '2h 46m', poster: 'https://plus.unsplash.com/premium_photo-1666902065428-68f2cc04c2b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHVuYSUyMHBhcnRlJTIwMnxlbnwwfHwwfHx8MA%3D%3D', synopsis: 'A tão aguardada continuação da épica saga de Duna, onde Paul Atreides enfrenta novos desafios e inimigos para proteger seu povo e o futuro do universo.', trailerUrl: 'https://www.youtube.com/watch?v=ncwsW3qxQlo' },
  { id: '2', title: 'O Voo Final', genre: 'Ação', duration: '2h 10m', poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop', synopsis: 'Em um futuro próximo, um piloto de testes enfrenta desafios mortais ao tentar salvar sua equipe e impedir uma catástrofe global durante um voo experimental.', trailerUrl: 'https://www.youtube.com/watch?v=oQ0Rwndeqzs' },
  { id: '3', title: 'Cidade de Sombras', genre: 'Suspense', duration: '1h 55m', poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000&auto=format&fit=crop', synopsis: 'Um detetive investiga uma série de desaparecimentos em uma cidade onde a escuridão esconde segredos sombrios, revelando uma trama de corrupção e mistério.', trailerUrl: 'https://www.youtube.com/watch?v=iIDNPruC078' },
  { id: '4', title: 'Aventura Espacial', genre: 'Aventura', duration: '2h 20m', poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2000&auto=format&fit=crop', synopsis: 'Uma jornada épica pela galáxia, onde heróis e vilões se enfrentam em uma batalha que determinará o destino de milhões de vidas.', trailerUrl: 'https://www.youtube.com/watch?v=HxjxxprZ6l8' },
];

const MOVIES_COMING_SOON = [
  { id: '5', title: 'Eco: O Início', genre: 'Sci-Fi', duration: 'TBA', poster: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=2000&auto=format&fit=crop', synopsis: 'Em um futuro distante, um grupo de exploradores descobre um mistério cósmico que desafia a compreensão humana.', trailerUrl: 'https://www.youtube.com/watch?v=NkMo33WguTg' },
  { id: '6', title: 'Riso na Noite', genre: 'Comédia', duration: 'TBA', poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS044SC3TLY9jklE5XCX43-0k7a_sA3H_j2sQ&s', synopsis: 'Uma comédia leve e engraçada que traz risos e diversão para todos os públicos.', trailerUrl: 'https://www.youtube.com/watch?v=JCCxDxe2X-Y' },
  { id: '7', title: 'Amnésia Escarlate', genre: 'Terror', duration: 'TBA', poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?q=80&w=2000&auto=format&fit=crop', synopsis: 'Um thriller de terror que mergulha nas profundezas da mente humana, explorando os limites da memória e da identidade.', trailerUrl: 'https://www.youtube.com/watch?v=t1EuIMA_28w' },
];

const ALL_MOVIES = [...MOVIES_NOW_PLAYING, ...MOVIES_COMING_SOON];

interface MovieDetails {
  id?: string;
  title: string;
  poster: string;
  duration: string;
  genre: string;
  synopsis?: string;
  isComingSoon?: boolean;
  trailerUrl?: string; 
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: MovieDetails | null;
}

export default function Modal({ isOpen, onClose, movie }: ModalProps) {
  const router = useRouter();
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<MovieDetails | null>(null);

  // Sincroniza o filme selecionado inicialmente quando o modal abre
  useEffect(() => {
    if (isOpen && movie) {
      setCurrentMovie(movie);
      setIsPlayingTrailer(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsPlayingTrailer(false); 
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, movie]);

  if (!currentMovie) return null;

  const isNowPlaying = MOVIES_NOW_PLAYING.some(
    (nowPlayingMovie) => nowPlayingMovie.title === currentMovie.title
  );

  const isComingSoon = currentMovie.isComingSoon || MOVIES_COMING_SOON.some(
    (comingSoonMovie) => comingSoonMovie.title === currentMovie.title
  );

  const handleBookingRedirect = () => {
    if (!isNowPlaying) return;
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      router.push(`/booking?title=${encodeURIComponent(currentMovie.title)}&poster=${encodeURIComponent(currentMovie.poster)}`);
    } else {
      router.push('/login');
    }
  };

  const formatYouTubeUrl = (url?: string) => {
    if (!url) return '';
    const embedUrl = url.replace('watch?v=', 'embed/');
    return `${embedUrl}?autoplay=1&rel=0`;
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = ALL_MOVIES.findIndex((m) => m.title === currentMovie.title);
    const nextIndex = (currentIndex + 1) % ALL_MOVIES.length;
    setCurrentMovie(ALL_MOVIES[nextIndex]);
    setIsPlayingTrailer(false);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = ALL_MOVIES.findIndex((m) => m.title === currentMovie.title);
    const prevIndex = (currentIndex - 1 + ALL_MOVIES.length) % ALL_MOVIES.length;
    setCurrentMovie(ALL_MOVIES[prevIndex]);
    setIsPlayingTrailer(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-8 z-50 p-3 bg-slate-900/80 hover:bg-amber-500 text-white rounded-full transition-all border border-white/10 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <motion.div
            key={currentMovie.title}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-slate-900 rounded-[2rem] shadow-2xl shadow-black/60 overflow-hidden flex flex-col md:flex-row border border-slate-800"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-30 p-2 bg-slate-950/60 hover:bg-red-500 text-white rounded-full transition-all backdrop-blur-md border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-2/5 h-72 md:h-auto relative bg-black flex-shrink-0">
              {isPlayingTrailer && currentMovie.trailerUrl ? (
                <iframe
                  className="w-full h-full absolute inset-0"
                  src={formatYouTubeUrl(currentMovie.trailerUrl)}
                  title={currentMovie.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  <img
                    src={currentMovie.poster}
                    alt={currentMovie.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-slate-900" />
                </>
              )}
            </div>

            <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col">
              <div className="flex-1">
                {isComingSoon && (
                  <span className="inline-block bg-amber-500 text-slate-950 text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-full mb-4">
                    Em Breve
                  </span>
                )}
                
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight uppercase tracking-tight">
                  {currentMovie.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <span className="flex items-center gap-2 bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-sm border border-slate-700">
                    <Film className="w-4 h-4 text-amber-500" />
                    {currentMovie.genre}
                  </span>
                  <span className="flex items-center gap-2 bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-sm border border-slate-700">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {currentMovie.duration}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-slate-500 uppercase text-xs font-bold tracking-widest">Sinopse</h3>
                  <p className="text-slate-300 text-lg leading-relaxed font-light italic">
                    "{currentMovie.synopsis || "A sinopse deste filme ainda não está disponível."}"
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
                {isNowPlaying && (
                  <button 
                    onClick={handleBookingRedirect} 
                    className="group flex items-center justify-center gap-3 w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 px-8 rounded-2xl transition-all shadow-[0_10px_20px_rgba(245,158,11,0.2)] hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Ticket className="w-5 h-5" />
                    COMPRAR INGRESSO
                  </button>
                )}

                {currentMovie.trailerUrl && !isPlayingTrailer && (
                  <button 
                    onClick={() => setIsPlayingTrailer(true)} 
                    className={`flex items-center justify-center gap-3 w-full sm:w-auto font-black py-4 px-8 rounded-2xl transition-all border-2 hover:scale-105 active:scale-95 cursor-pointer ${
                      isComingSoon 
                        ? "bg-white border-white text-slate-950 hover:bg-slate-200" 
                        : "bg-transparent border-slate-700 text-white hover:bg-slate-800"
                    }`}
                  >
                    <Play className="w-5 h-5 fill-current" />
                    ASSISTIR TRAILER
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-8 z-50 p-3 bg-slate-900/80 hover:bg-amber-500 text-white rounded-full transition-all border border-white/10 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}