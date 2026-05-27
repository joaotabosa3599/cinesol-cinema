'use client';
import Link from 'next/link';
import { Ticket, Film, Clock, Popcorn } from 'lucide-react';

export default function ConfirmPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans text-slate-300">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        <h1 className="text-3xl font-black text-white mb-8 text-center">Confirmar compra?</h1>
        
        <div className="space-y-4 mb-8">
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2 text-white font-semibold text-lg">
              <Film className="w-5 h-5 text-amber-400" />
              Duna: Parte 2
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm mb-1">
              <Ticket className="w-4 h-4" />
              2x Ingressos (Inteira)
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm mb-1">
              <Clock className="w-4 h-4" />
              Hoje, 20:30 - Sala 3 (IMAX 3D)
            </div>
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <Popcorn className="w-4 h-4" />
              1x Combo Mega
            </div>
          </div>
          
          <div className="flex justify-between items-center py-4 border-t border-slate-800">
            <span className="text-slate-400 font-medium">Total a pagar</span>
            <span className="text-2xl font-black text-amber-400">R$ 80,00</span>
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/Checkout/pix" className="w-full py-4 px-4 bg-amber-400 text-slate-950 text-lg font-bold rounded-xl hover:bg-amber-300 hover:-translate-y-0.5 shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_-5px_rgba(251,191,36,0.5)] transition-all duration-300 flex items-center justify-center">
            Confirmar pagamento
          </Link>
          <Link href="/Checkout" className="w-full py-4 px-4 bg-slate-800 border border-slate-700 text-white text-lg font-bold rounded-xl hover:bg-slate-700 hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
