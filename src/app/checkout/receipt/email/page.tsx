'use client';
import Link from 'next/link';
import { MailCheck, Home } from 'lucide-react';

export default function ReceiptEmailPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans text-slate-300">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-center">
        
        <div className="flex justify-center mb-6">
          <MailCheck className="w-20 h-20 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]" />
        </div>

        <h1 className="text-3xl font-black text-white mb-4">Email enviado!</h1>
        <p className="text-slate-400 mb-8 text-lg">Verifique sua caixa de entrada. O comprovante e seus ingressos foram enviados.</p>
        
        <Link href="/" className="w-full py-4 px-4 bg-amber-400 text-slate-950 text-lg font-bold rounded-xl hover:bg-amber-300 hover:-translate-y-0.5 shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_-5px_rgba(251,191,36,0.5)] transition-all duration-300 flex items-center justify-center gap-3">
          <Home className="w-5 h-5" />
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}
