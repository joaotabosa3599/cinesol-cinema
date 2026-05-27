'use client';

import { Ticket } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/60 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop" 
          alt="Cinema screen" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div 
        className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20 animate-fade-in-up"
      >
        <span className="text-amber-400 font-semibold tracking-widest text-sm uppercase mb-4 block">
          Sobral - CE
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
          A Magia do <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">
            Cinema na sua Tela
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Programação imperdível, poltronas premium e os melhores combos para sua diversão.
        </p>
        
        <div className="flex justify-center">
          <button 
            onClick={() => scrollToSection('cartaz')}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-xl shadow-amber-500/20 cursor-pointer">
            <Ticket className="w-6 h-6" />
            Ver programação em cartaz
          </button>
        </div>
      </div>
    </section>
  );
}