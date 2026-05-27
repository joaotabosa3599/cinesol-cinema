'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, User, LogOut, Film, Ticket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Adicionamos a propriedade isNowPlaying para separar os filmes
const ALL_MOVIES = [
  { id: '1', title: 'Duna: Parte 2', genre: 'Ficção', isNowPlaying: true },
  { id: '2', title: 'O Voo Final', genre: 'Ação', isNowPlaying: true },
  { id: '3', title: 'Cidade de Sombras', genre: 'Suspense', isNowPlaying: true },
  { id: '4', title: 'Aventura Espacial', genre: 'Aventura', isNowPlaying: true },
  { id: '5', title: 'Eco: O Início', genre: 'Sci-Fi', isNowPlaying: false },
  { id: '6', title: 'Riso na Noite', genre: 'Comédia', isNowPlaying: false },
  { id: '7', title: 'Amnésia Escarlate', genre: 'Terror', isNowPlaying: false },
];

export default function Header() {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const filteredMovies = searchQuery.length > 0 
    ? ALL_MOVIES.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  useEffect(() => {
    console.log("Posição do scroll:", window.scrollY);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll(); 
    
    window.addEventListener('scroll', handleScroll);
    
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      try {
        const user = JSON.parse(usuarioLogado);
        if (user && user.name) {
          const nomes = user.name.trim().split(' ');
          const nomeExibicao = nomes.length > 1 ? `${nomes[0]} ${nomes[1]}` : nomes[0];
          setUserName(nomeExibicao);
        }
      } catch (e) {
        console.error('Erro ao ler usuarioLogado do localStorage:', e);
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    setUserName(null);
    setIsProfileMenuOpen(false);
  };

  // Recebe o objeto do filme inteiro para checar se está em cartaz
  const handleSelectMovie = (movie: typeof ALL_MOVIES[0]) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    
    if (movie.isNowPlaying) {
      // Se estiver em cartaz, vai direto comprar ingressos
      router.push(`/booking?title=${encodeURIComponent(movie.title)}`);
    } else {
      // Se for "Em breve", avisa o usuário e rola até a seção de lançamentos
      alert(`Os ingressos para "${movie.title}" estarão disponíveis em breve!`);
      router.push('/#breve');
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-950/90 backdrop-blur-md shadow-lg shadow-black/50' : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-white">
          <img src="/CineSol_logo.png" alt="CineSol Logo" className="w-8 h-8" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200">
            CineSol
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-lg font-medium text-slate-300">
          <Link href="/#cartaz" className="hover:text-amber-400 transition-colors">Filmes</Link>
          <Link href="/#precos" className="hover:text-amber-400 transition-colors">Preços</Link>
          <Link href="/suport" className="hover:text-amber-400 transition-colors">Suporte</Link>
        </nav>

        <div className="flex items-center gap-4 lg:gap-8">
          
          <div className="relative flex items-center" ref={searchRef}>
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute right-10 top-1/2 -translate-y-1/2"
                >
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar filmes..."
                    className="w-full bg-slate-800/90 text-white text-sm border border-slate-700 rounded-full px-4 py-2 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 placeholder:text-slate-400"
                  />

                  <AnimatePresence>
                    {searchQuery.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-3 w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col z-50"
                      >
                        {filteredMovies.length > 0 ? (
                          filteredMovies.map((movie) => (
                            <button
                              key={movie.id}
                              onClick={() => handleSelectMovie(movie)}
                              className="w-full text-left px-4 py-3 hover:bg-slate-800 transition-colors flex items-center justify-between group border-b border-slate-800/50 last:border-0 cursor-pointer"
                            >
                              <div className="flex flex-col">
                                <span className="text-sm font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">
                                  {movie.title}
                                </span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">
                                  {movie.genre}
                                </span>
                              </div>
                              
                              {/* Alteramos o ícone dependendo do status do filme */}
                              {movie.isNowPlaying ? (
                                <Ticket className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
                              ) : (
                                <span className="text-[9px] font-bold tracking-widest text-slate-400 bg-slate-800 px-2 py-1 rounded">EM BREVE</span>
                              )}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-center flex flex-col items-center justify-center">
                            <Film className="w-6 h-6 text-slate-600 mb-2" />
                            <span className="text-sm text-slate-400">Nenhum filme encontrado.</span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) setSearchQuery('');
              }}
              className="p-2 bg-slate-800/50 sm:bg-transparent rounded-full hover:bg-slate-800 transition-colors text-white z-10 relative cursor-pointer"
            >
              <Search className="w-5 h-5 text-amber-400" />
            </button>
          </div>

          <div id="login" className="hidden md:flex items-center text-lg font-medium text-slate-300 relative">
            {userName ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="cursor-pointer flex items-center gap-2 hover:text-amber-400 transition-colors focus:outline-none"
                >
                  <User size={20} />
                  <span className="cursor-pointer hidden sm:block">{userName}</span>
                </button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-6 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col z-50"
                    >
                      <Link 
                        href="/profile" 
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="px-4 py-3 text-sm text-slate-300 hover:text-amber-400 hover:bg-slate-800 transition-colors flex items-center gap-3"
                      >
                        <User size={16} />
                        Meu Perfil
                      </Link>
                      
                      <div className="h-px bg-slate-800 w-full cursor-pointer" />

                      <button 
                        onClick={handleLogout}
                        className="cursor-pointer px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-slate-800 transition-colors flex items-center gap-3 text-left w-full"
                      >
                        <LogOut size={16} />
                        Sair
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
                <User size={20} /> 
                <span className="hidden sm:block">Entrar</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}