'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Removido o ArrowLeft daqui, pois o BackButton já tem seu próprio ícone SVG
import { Calendar, Clock, Monitor, Armchair, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';
// Ajuste o caminho de importação abaixo conforme a estrutura das suas pastas
import { BackButton } from '@/components/BackButton';

// Mocks para simular horários e poltronas
const DATES = ['Hoje, 24 Mai', 'Sáb, 25 Mai', 'Dom, 26 Mai', 'Seg, 27 Mai'];
const SESSIONS = [
  { id: 's1', time: '15:00', type: 'Dublado', format: '3D' },
  { id: 's2', time: '18:30', type: 'Legendado', format: '2D' },
  { id: 's3', time: '21:00', type: 'Legendado', format: 'IMAX' },
];

// Gerador de poltronas simples (Letras A-F, Números 1-8)
const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8];
// Simulando algumas poltronas já ocupadas no banco de dados
const OCCUPIED_SEATS = ['C4', 'C5', 'E7', 'E8', 'F1', 'F2']; 
const TICKET_PRICE = 20.00;

export default function Checkout({ movieTitle = "Duna: Parte 2", onBack }: { movieTitle?: string, onBack: () => void }) {
  const router = useRouter();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedDate, setSelectedDate] = useState(DATES[0]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (seatId: string) => {
    if (OCCUPIED_SEATS.includes(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]); 
    }
  };

  const totalPrice = selectedSeats.length * TICKET_PRICE;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 flex flex-col items-center">
      
      <div className="w-full max-w-4xl flex items-center justify-between mb-10">
        
        {/* Usando o novo BackButton importado */}
        <BackButton 
          onClick={step === 2 ? () => setStep(1) : onBack}
          className="border-transparent bg-transparent hover:bg-slate-900" // Opcional: ajustando as classes para mesclar melhor com este header
        />
        
        <h1 className="text-xl md:text-2xl font-bold text-center">
          {movieTitle}
        </h1>
        <div className="w-20"></div> {/* Espaçador para manter o título centralizado */}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-4xl space-y-10"
          >
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="text-amber-500 w-5 h-5" /> 
                Escolha a Data
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {DATES.map(date => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 px-6 py-3 rounded-xl border font-medium transition-all ${
                      selectedDate === date 
                        ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' 
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-500/50'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="text-amber-500 w-5 h-5" /> 
                Escolha o Horário
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SESSIONS.map(session => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSession(session.id)}
                    className={`p-5 rounded-xl border flex flex-col gap-2 transition-all text-left ${
                      selectedSession === session.id 
                        ? 'bg-slate-800 border-amber-500 ring-1 ring-amber-500' 
                        : 'bg-slate-900 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span className="text-3xl font-bold text-white">{session.time}</span>
                    <div className="flex gap-2 text-xs font-bold">
                      <span className="bg-slate-700 px-2 py-1 rounded text-slate-300">{session.format}</span>
                      <span className="bg-slate-700 px-2 py-1 rounded text-slate-300">{session.type}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-6 border-t border-slate-800">
              <button
                disabled={!selectedSession}
                onClick={() => setStep(2)}
                className="bg-amber-500 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-amber-400 text-slate-950 font-bold py-4 px-10 rounded-xl transition-colors"
              >
                Escolher Poltronas
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-full max-w-4xl flex flex-col lg:flex-row gap-10"
          >
            <div className="flex-1 bg-slate-900 p-8 rounded-3xl border border-slate-800 flex flex-col items-center">
              
              <div className="w-full max-w-md mb-12 flex flex-col items-center gap-2">
                <div className="w-full h-8 border-t-4 border-amber-500/50 rounded-t-[50%] shadow-[0_-15px_30px_rgba(245,158,11,0.1)]"></div>
                <span className="text-slate-500 text-sm tracking-[0.3em] flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> TELA
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {ROWS.map(row => (
                  <div key={row} className="flex items-center gap-2 md:gap-4">
                    <span className="w-6 text-center text-slate-600 font-bold">{row}</span>
                    <div className="flex gap-2 md:gap-3">
                      {COLS.map(col => {
                        const seatId = `${row}${col}`;
                        const isOccupied = OCCUPIED_SEATS.includes(seatId);
                        const isSelected = selectedSeats.includes(seatId);

                        const isCorridor = col === 4;

                        return (
                          <div key={seatId} className={`flex items-center ${isCorridor ? 'mr-6 md:mr-8' : ''}`}>
                            <button
                              disabled={isOccupied}
                              onClick={() => toggleSeat(seatId)}
                              className={`w-8 h-8 md:w-10 md:h-10 rounded-t-lg rounded-b-sm transition-all flex items-center justify-center group relative
                                ${isOccupied ? 'bg-slate-800 cursor-not-allowed opacity-50' : ''}
                                ${isSelected ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-110' : ''}
                                ${!isOccupied && !isSelected ? 'bg-slate-700 hover:bg-slate-500' : ''}
                              `}
                            >
                              {isSelected && <Armchair className="w-5 h-5 text-slate-950" />}
                              
                              {!isOccupied && !isSelected && (
                                <span className="absolute -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                  {seatId}
                                </span>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-6 mt-12 text-sm text-slate-400">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-t bg-slate-700"></div> Livre</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-t bg-amber-500"></div> Selecionada</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-t bg-slate-800 opacity-50"></div> Ocupada</div>
              </div>
            </div>

            <div className="w-full lg:w-80 flex flex-col gap-6">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                <h3 className="text-xl font-bold mb-6 border-b border-slate-800 pb-4">Resumo do Pedido</h3>
                
                <div className="space-y-4 text-slate-300 mb-6">
                  <div className="flex justify-between">
                    <span>Data</span>
                    <span className="font-semibold text-white">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Horário</span>
                    <span className="font-semibold text-white">
                      {SESSIONS.find(s => s.id === selectedSession)?.time}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Poltronas</span>
                    <span className="font-semibold text-amber-500">
                      {selectedSeats.length > 0 ? selectedSeats.join(', ') : '-'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-4 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400">Total</span>
                    <span className="text-3xl font-bold text-white">
                      R$ {totalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/Checkout/paymentMethod')} 
                  disabled={selectedSeats.length === 0}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-amber-400 text-slate-950 font-bold py-4 px-6 rounded-xl transition-colors"
                >
                  <Ticket className="w-5 h-5" />
                  Ir para Pagamento
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}