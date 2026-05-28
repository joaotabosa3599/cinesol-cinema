'use client';
import Link from 'next/link';
import { Copy, CheckCircle2 } from 'lucide-react';

export default function PixPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans text-slate-300">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10 text-center">
        <h1 className="text-3xl font-black text-white mb-2">Pagamento via PIX</h1>
        <p className="text-slate-400 mb-8">Escaneie o QR Code ou copie o código abaixo para pagar.</p>
        
        <div className="bg-white p-4 rounded-2xl w-48 h-48 mx-auto mb-6 flex items-center justify-center">
          {/* QR Code fake */}
          <div className="w-full h-full bg-slate-200 border-4 border-slate-300 border-dashed rounded-xl flex items-center justify-center">
             <span className="text-slate-400 font-bold text-sm">QR CODE</span>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 mb-8 flex items-center justify-between gap-3">
          <span className="text-slate-300 text-sm truncate font-mono">00020126580014br.gov.bcb.pix...</span>
          <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-amber-400 transition-colors shrink-0">
            <Copy className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <Link href="/Checkout/success" className="w-full py-4 px-4 bg-amber-400 text-slate-950 text-lg font-bold rounded-xl hover:bg-amber-300 hover:-translate-y-0.5 shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)] hover:shadow-[0_0_25px_-5px_rgba(251,191,36,0.5)] transition-all duration-300 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Já paguei
          </Link>
          <Link href="/checkout/paymentMethod" className="w-full py-4 px-4 bg-slate-800 border border-slate-700 text-white text-lg font-bold rounded-xl hover:bg-slate-700 hover:border-slate-600 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
            Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
