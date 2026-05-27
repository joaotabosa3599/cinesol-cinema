'use client';
import Link from 'next/link';
import { CreditCard, Calendar, Lock } from 'lucide-react';

export default function CardPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans text-slate-300">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        <h1 className="text-3xl font-black text-white mb-2 text-center">Pagamento com cartão</h1>
        <p className="text-slate-400 mb-8 text-center">Insira os dados do seu cartão de crédito.</p>
        
        <form className="space-y-4 mb-8" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Nome no cartão</label>
            <input 
              type="text" 
              placeholder="Ex: JOAO M SILVA" 
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600 uppercase"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 ml-1">Número do cartão</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <CreditCard className="w-5 h-5 text-slate-500 group-focus-within:text-amber-400 transition-colors" />
              </div>
              <input 
                type="text" 
                placeholder="0000 0000 0000 0000" 
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 ml-1">Vencimento</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="w-5 h-5 text-slate-500 group-focus-within:text-amber-400 transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="MM/AA" 
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400 ml-1">CVV</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-amber-400 transition-colors" />
                </div>
                <input 
                  type="text" 
                  placeholder="123" 
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>
        </form>

        <div className="space-y-4">
          <Link href="/Checkout/success" className="w-full py-4 px-4 bg-amber-400 text-slate-950 text-lg font-bold rounded-xl hover:bg-amber-300 hover:-translate-y-0.5 shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_-5px_rgba(251,191,36,0.5)] transition-all duration-300 flex items-center justify-center">
            Pagar
          </Link>
          <Link href="/Checkout/paymentMethod" className="w-full py-4 px-4 bg-slate-800 border border-slate-700 text-white text-lg font-bold rounded-xl hover:bg-slate-700 hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
