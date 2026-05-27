'use client';

import { motion } from 'framer-motion';
import { Gift, Star, Ticket, Package, Lock, Unlock, CupSoda, Info } from 'lucide-react';
import { BackButton } from '@/components/BackButton';

const REWARDS = [
  {
    id: 1,
    title: 'Refrigerante 500ml',
    description: 'Resgate um copo de refrigerante médio para acompanhar seu filme.',
    pointsCost: 400,
    icon: CupSoda,
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    id: 2,
    title: 'Pipoca Média',
    description: 'A clássica pipoca amanteigada do CineSol, fresquinha e crocante.',
    pointsCost: 500,
    icon: Package,
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    id: 3,
    title: 'Ingresso Meia-Entrada',
    description: 'Válido para qualquer filme 2D em cartaz de segunda a quinta-feira.',
    pointsCost: 1000,
    icon: Ticket,
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  {
    id: 4,
    title: 'Combo VIP',
    description: '1 Pipoca Grande + 2 Refrigerantes Grandes + Balde colecionável.',
    pointsCost: 1500,
    icon: Gift,
    color: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  },
];

export default function RewardsHub() {
  const userPoints = 450; 
  const nextTierPoints = 500;
  const progressPercentage = (userPoints / nextTierPoints) * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-amber-500/30">
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />

      <main className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 inline-block"
        >
          <BackButton />
        </motion.div>

        <section className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 opacity-5">
            <Star size={200} />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h1 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                <Star className="text-amber-400" fill="currentColor" />
                CineSol Club
              </h1>
              <p className="text-slate-400">Acumule pontos em cada compra e troque por prêmios exclusivos!</p>
            </div>

            <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 min-w-[250px] text-center">
              <span className="block text-sm font-bold text-amber-400 uppercase tracking-widest mb-2">Seu Saldo</span>
              <div className="text-5xl font-black text-white mb-4">
                {userPoints} <span className="text-lg font-medium text-slate-500 tracking-normal">pts</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Nível Bronze</span>
                  <span>Faltam {nextTierPoints - userPoints} pts</span>
                </div>
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <h2 className="text-2xl font-bold text-white mb-6">Prêmios Disponíveis</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {REWARDS.map((reward, index) => {
            const isEligible = userPoints >= reward.pointsCost;

            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-3xl border transition-all duration-300 ${
                  isEligible 
                    ? 'bg-slate-900 border-slate-700 hover:border-amber-400/50 hover:-translate-y-1' 
                    : 'bg-slate-900/50 border-slate-800 opacity-75 grayscale-[0.3]'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-4 rounded-2xl border ${reward.color}`}>
                    <reward.icon size={28} />
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5 ${
                    isEligible ? 'bg-amber-400/10 text-amber-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isEligible ? <Unlock size={14} /> : <Lock size={14} />}
                    {reward.pointsCost} pts
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{reward.title}</h3>
                <p className="text-slate-400 text-sm mb-6 min-h-[40px]">
                  {reward.description}
                </p>

                <button 
                  disabled={!isEligible}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    isEligible 
                      ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-lg shadow-amber-500/20' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isEligible ? 'Resgatar Prêmio' : 'Pontos Insuficientes'}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 bg-slate-900/30 border border-slate-800/50 rounded-2xl p-5 flex items-start gap-4">
          <Info className="text-slate-500 mt-0.5 flex-shrink-0" size={20} />
          <p className="text-sm text-slate-400 leading-relaxed">
            Os pontos expiram após 12 meses da data da compra. Para resgatar os prêmios físicos (pipoca e refrigerante), apresente o QR Code gerado na bomboniere do cinema.
          </p>
        </div>

      </main>
    </div>
  );
}