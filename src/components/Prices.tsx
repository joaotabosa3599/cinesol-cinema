import { Check } from "lucide-react";

interface PricesProps {
  onBuyClick?: () => void;
}

export default function Prices({ onBuyClick }: PricesProps) {
    return (
        <div className="py-20 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <h2 className="text-3xl md:text-4xl font-black text-white px-10 mb-12 relative z-10">
                Confira os valores para curtir os <span className="text-amber-400">melhores filmes</span> no CineSol:
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-2 px-4 lg:px-8 relative z-10">
                
                <div className="space-y-8 flex flex-col justify-center w-full max-w-lg mx-auto lg:mx-0">

                    <div className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-10 lg:p-12 flex flex-col items-center text-center shadow-lg hover:border-amber-400/30 hover:bg-slate-800/50 hover:-translate-y-1 transition-all duration-500">
                        <span className="text-slate-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
                            Ingresso Inteira
                        </span>

                        <div className="flex items-start justify-center text-white mb-2">
                            <span className="text-2xl font-bold mt-2 mr-1 text-slate-400">R$</span>
                            <span className="text-7xl font-black tracking-tighter">20</span>
                            <span className="text-3xl font-bold mt-1 ml-1 text-slate-500">,00</span>
                        </div>

                        <span className="text-sm text-slate-500 mt-4 group-hover:text-slate-400 transition-colors">
                            Valor padrão para o público geral
                        </span>
                    </div>

                    <div className="group relative bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-3xl p-10 lg:p-12 flex flex-col items-center text-center shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 ring-1 ring-amber-400/50">
                        
                        <div className="absolute -top-4 bg-slate-950 text-amber-400 text-xs font-bold uppercase tracking-wider py-1.5 px-5 rounded-full border border-amber-400/30 shadow-lg flex items-center gap-2">
                            ⭐ Mais Popular
                        </div>

                        <span className="text-amber-950 text-sm font-bold uppercase tracking-[0.2em] mb-4">
                            Meia-Entrada
                        </span>

                        <div className="flex items-start justify-center text-slate-950 mb-2">
                            <span className="text-2xl font-bold mt-2 mr-1 opacity-70">R$</span>
                            <span className="text-8xl font-black tracking-tighter drop-shadow-sm">10</span>
                            <span className="text-3xl font-bold mt-1 ml-1 opacity-70">,00</span>
                        </div>

                        <span className="text-sm text-amber-950 mt-4 font-semibold opacity-90">
                            Para estudantes, crianças e adolescentes
                        </span>
                    </div>

                </div>

                <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-10 lg:p-12 border border-slate-800 shadow-2xl h-full flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-transparent opacity-50"></div>

                    <h3 className="text-3xl font-black text-white mb-8 flex items-center gap-4">
                        Quem tem direito?
                    </h3>
                    
                    <p className="text-slate-300 mb-10 text-lg leading-relaxed">
                        Estudantes, crianças e adolescentes pagam <strong className="text-amber-400 font-semibold">meia-entrada</strong>! Confira as regras para garantir seu benefício:
                    </p>
                    
                    <ul className="space-y-8 text-slate-300 flex-1">
                        <li className="flex items-start gap-5 group">
                            <div className="bg-slate-800/50 p-2.5 rounded-xl group-hover:bg-amber-400/10 transition-colors">
                                <Check className="text-amber-400 w-6 h-6 flex-shrink-0" strokeWidth={3} />
                            </div>
                            <div className="pt-1">
                                <strong className="text-white block mb-1 text-lg">Crianças</strong>
                                <span className="text-base text-slate-400 leading-relaxed block">Até 12 anos de idade.</span>
                            </div>
                        </li>

                        <li className="flex items-start gap-5 group">
                            <div className="bg-slate-800/50 p-2.5 rounded-xl group-hover:bg-amber-400/10 transition-colors">
                                <Check className="text-amber-400 w-6 h-6 flex-shrink-0" strokeWidth={3} />
                            </div>
                            <div className="pt-1">
                                <strong className="text-white block mb-1 text-lg">Adolescentes</strong>
                                <span className="text-base text-slate-400 leading-relaxed block">
                                    De 13 a 17 anos com apresentação de documento com foto (RG).
                                </span>
                            </div>
                        </li>

                        <li className="flex items-start gap-5 group">
                            <div className="bg-slate-800/50 p-2.5 rounded-xl group-hover:bg-amber-400/10 transition-colors">
                                <Check className="text-amber-400 w-6 h-6 flex-shrink-0" strokeWidth={3} />
                            </div>
                            <div className="pt-1">
                                <strong className="text-white block mb-1 text-lg">Estudantes</strong>
                                <span className="text-base text-slate-400 leading-relaxed block">
                                    De todos os níveis (Fundamental, Médio, Graduação e Pós), com apresentação de carteirinha ou comprovante de matrícula.
                                </span>
                            </div>
                        </li>
                    </ul>
                    
                    <div className="mt-12 pt-8 border-t border-slate-800">
                        <button 
                            onClick={onBuyClick}
                            className="cursor-pointer w-full py-5 px-8 bg-amber-400 text-slate-950 text-lg font-black rounded-2xl  hover:bg-amber-300 hover:-translate-y-1 transition-all duration-300 uppercase tracking-wide">
                            Aproveite e garanta seu ingresso
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}