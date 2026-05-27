export default function Prices() {
  const combos = [
    {
      img: "/combo.png",
      preco: "R$ 10",
      tamanhoImagem: "w-36",
      itens: [
        "Balde de pipoca pequeno",
        "1 lata de refrigerante"
      ]
    },
    {
      img: "/combo.png",
      preco: "R$ 20",
      tamanhoImagem: "w-48",
      itens: [
        "Balde de pipoca médio",
        "1 lata de refrigerante"
      ]
    },
    {
      img: "/combo2.png",
      preco: "R$ 30",
      tamanhoImagem: "w-56",
      itens: [
        "Balde de pipoca grande",
        "1 lata de refrigerante",
        "+ 1 lata de refrigerante de brinde"
      ]
    }
  ];

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-white px-10 mb-8">
        Compre um <strong className="text-amber-400">combo de pipoca</strong> para acompanhar seu filme
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10">
        {combos.map((combo, index) => (
          <div 
            className="bg-slate-900 rounded-3xl p-8 flex flex-col items-center text-center border border-slate-800 hover:border-amber-400/50 transition-all duration-300 shadow-xl" 
            key={index}
          >
            <div className="h-64 flex items-end justify-center mb-8">
              <img 
                src={combo.img} 
                alt="combo pipoca" 
                className={`object-contain transition-transform hover:scale-105 drop-shadow-2xl ${combo.tamanhoImagem}`} 
              />
            </div>
            
            <h3 className="text-4xl font-black text-amber-400 mb-6">{combo.preco}</h3>
            
            <ul className="space-y-3 text-slate-300 w-full mb-8">
              {combo.itens.map((item, i) => (
                <li key={i} className="flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
            
            <button className="mt-auto w-full py-4 px-6 bg-amber-400 text-slate-950 font-bold rounded-xl hover:bg-amber-300 hover:scale-[1.02] transition-all">
              Escolher Combo
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}