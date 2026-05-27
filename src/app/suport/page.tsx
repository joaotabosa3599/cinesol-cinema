'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  Camera,
  X,
  Globe
} from 'lucide-react';
// Ajuste o caminho abaixo conforme a estrutura do seu projeto
import { BackButton } from '@/components/BackButton';

export default function ContatoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleBack = () => {
    const hasInternalHistory = typeof window !== 'undefined' && 
                               document.referrer.indexOf(window.location.host) !== -1;

    if (hasInternalHistory) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500 selection:text-slate-900">
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        {/* Novo BackButton com a animação mantida através de uma div container */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 inline-block"
        >
          <BackButton onClick={handleBack} />
        </motion.div>

        <header className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold uppercase tracking-widest"
          >
            Atendimento CineSol
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            COMO PODEMOS <span className="text-amber-500 text-glow">AJUDAR?</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light">
            Dúvidas sobre ingressos, eventos corporativos ou apenas quer compartilhar sua experiência conosco? Nossa equipe está pronta para te ouvir.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <motion.section 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 space-y-8"
          >
            <div className="grid grid-cols-1 gap-6">
              {[
                { icon: Mail, title: "E-mail", detail: "contato@cinesol.com.br", desc: "Respondemos em até 24h" },
                { icon: Phone, title: "Telefone & WhatsApp", detail: "0800 123 4567", desc: "Segunda a Sexta, 09h às 18h" },
                { icon: MapPin, title: "Localização", detail: "Av. das Estrelas, 1000", desc: "Piso L3, Shopping Central" },
                { icon: Clock, title: "Horário do Cinema", detail: "Diariamente", desc: "Das 13h às 00h" },
              ].map((info, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="group flex items-start gap-5 p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-amber-500/50 transition-all"
                >
                  <div className="p-3 rounded-2xl bg-slate-800 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                    <info.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{info.title}</h3>
                    <p className="text-xl font-bold text-white">{info.detail}</p>
                    <p className="text-sm text-slate-400 mt-1">{info.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950">
              <h3 className="text-2xl font-black mb-4 uppercase italic">Siga o Brilho</h3>
              <p className="mb-6 font-medium opacity-90">Fique por dentro das estreias e promoções exclusivas.</p>
              <div className="flex gap-4">
                {[
                  { icon: Camera, label: "Instagram" },
                  { icon: X, label: "Twitter" },
                  { icon: Globe, label: "Site" }
                ].map((social, i) => (
                  <button key={i} aria-label={social.label} className="p-3 bg-slate-950/10 hover:bg-slate-950/20 rounded-xl transition-colors cursor-pointer">
                    <social.icon size={24} strokeWidth={2.5} />
                  </button>
                ))}
              </div>
            </div>
          </motion.section>

          <motion.section 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7"
          >
            <div className="relative p-8 md:p-12 rounded-[3rem] bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] -z-10" />
              
              {submitted ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                    <Send className="text-slate-950" size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-2">MENSAGEM ENVIADA!</h2>
                  <p className="text-slate-400">Obrigado por entrar em contato. Em breve daremos um retorno.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-amber-500 font-bold hover:underline"
                  >
                    Enviar outra mensagem
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center gap-3 mb-8">
                    <MessageSquare className="text-amber-500" />
                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Mande um sinal</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-2">Nome Completo</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Ex: Steven Spielberg"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-4 outline-none transition-all focus:ring-4 focus:ring-amber-500/10 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-2">Seu Melhor E-mail</label>
                      <input 
                        required
                        type="email" 
                        placeholder="seu@email.com"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-4 outline-none transition-all focus:ring-4 focus:ring-amber-500/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-2">Assunto</label>
                    <div className="relative">
                      <select className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-4 outline-none transition-all appearance-none text-white cursor-pointer">
                        <option>Dúvidas Gerais</option>
                        <option>Problemas com Ingresso</option>
                        <option>Eventos & Parcerias</option>
                        <option>Sugestões</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                        <Clock size={16} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-2">Sua Mensagem</label>
                    <textarea 
                      required
                      rows={5}
                      placeholder="Como podemos tornar seu dia mais cinematográfico?"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-2xl p-4 outline-none transition-all focus:ring-4 focus:ring-amber-500/10 resize-none text-white"
                    ></textarea>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full group flex items-center justify-center gap-3 bg-white hover:bg-amber-500 text-slate-950 font-black py-5 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-4 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                    ) : (
                      <>
                        ENVIAR
                        <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.section>

        </div>
      </main>
      
      <style jsx global>{`
        .text-glow {
          text-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
        }
      `}</style>
    </div>
  );
}