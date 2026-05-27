'use client';
import Link from 'next/link';
import { CheckCircle, Mail, Download } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans text-slate-300">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-center">
        
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]" />
        </div>

        <h1 className="text-3xl font-black text-white mb-4">Compra realizada com sucesso!</h1>
        <p className="text-slate-400 mb-8 text-lg">Como deseja receber seu comprovante?</p>
        
        <div className="space-y-4">
          <Link href="/checkout/receipt/email" className="w-full py-4 px-4 bg-amber-400 text-slate-950 text-lg font-bold rounded-xl hover:bg-amber-300 hover:-translate-y-0.5 shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_-5px_rgba(251,191,36,0.5)] transition-all duration-300 flex items-center justify-center gap-3">
            <Mail className="w-5 h-5" />
            Enviar por Email
          </Link>
          <Link href="/checkout/receipt/download" className="w-full py-4 px-4 bg-slate-800 border border-slate-700 text-white text-lg font-bold rounded-xl hover:bg-slate-700 hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3">
            <Download className="w-5 h-5" />
            Download em PDF
          </Link>
        </div>
      </div>
    </div>
  );
}
