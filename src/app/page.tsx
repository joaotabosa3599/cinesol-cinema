'use client'; 

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MovieCarousel from '@/components/MovieCarousel';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal'; 
import Prices from '@/components/Prices';

interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  poster: string;
  synopsis?: string;
  trailerUrl?: string;
}

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

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 font-sans">
      <Header />
      <Hero />
      
      <div className="relative -mt-20 z-30 space-y-8 pb-20">
        <div id="cartaz">
          <MovieCarousel 
            title="Em Cartaz" 
            movies={MOVIES_NOW_PLAYING} 
            onMovieClick={handleOpenModal} 
          />
        </div>
        
        <div id="breve">
          <MovieCarousel 
            title="Em Breve" 
            movies={MOVIES_COMING_SOON} 
            isComingSoon 
            onMovieClick={handleOpenModal} 
          />
        </div>

        <div id="precos">
          <Prices onBuyClick={() => handleOpenModal(MOVIES_NOW_PLAYING[0])} />
        </div>
      </div>

      <Footer />

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        movie={selectedMovie} 
      />
    </main>
  );
}