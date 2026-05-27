'use client';
import Link from 'next/link';
import { QrCode, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans text-slate-300">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10">
        <div className="flex justify-center mb-6">
          <img src="/CineSol_logo.png" alt="CineSol Logo" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]" />
        </div>
        <h1 className="text-3xl font-black text-white mb-8 text-center">Como deseja pagar?</h1>
        
        <div className="space-y-4">
          <Link href="/checkout/pix" className="w-full py-4 px-4 bg-amber-400 text-slate-950 text-lg font-bold rounded-xl hover:bg-amber-300 hover:-translate-y-0.5 shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_-5px_rgba(251,191,36,0.5)] transition-all duration-300 flex items-center justify-center gap-3">
            <QrCode className="w-6 h-6" />
            PIX
          </Link>
          <Link href="/checkout/card" className="w-full py-4 px-4 bg-slate-800 border border-slate-700 text-white text-lg font-bold rounded-xl hover:bg-slate-700 hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3">
            <CreditCard className="w-6 h-6" />
            Cartão de Crédito
          </Link>
        </div>
        
        <div className="mt-8 text-center">
           <Link href="/" className="text-sm text-slate-500 hover:text-amber-400 transition-colors">Cancelar e voltar</Link>
        </div>
      </div>
    </div>
  );
}
