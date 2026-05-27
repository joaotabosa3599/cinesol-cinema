'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Monitor, Armchair, Ticket, CheckCircle2, Plus, Minus, Tag } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BackButton } from '@/components/BackButton';
import { calculateSeatsTotal, calculateTicketPrice } from '@/utils/halfTicketUtils';

const SESSIONS = [
  { id: 's1', time: '15:00', type: 'Dublado', format: '3D' },
  { id: 's2', time: '18:30', type: 'Legendado', format: '2D' },
  { id: 's3', time: '21:00', type: 'Legendado', format: 'IMAX' },
];

const COMBOS = [
  {
    id: 1,
    nome: "Combo Star",
    img: "/combo.png",
    preco: 10.00,
    itens: ["Pipoca pequena", "1 Refrigerante lata"]
  },
  {
    id: 2,
    nome: "Combo Blockbuster",
    img: "/combo.png",
    preco: 20.00,
    itens: ["Pipoca média", "1 Refrigerante lata"]
  },
  {
    id: 3,
    nome: "Combo VIP Premiere",
    img: "/combo2.png",
    preco: 30.00,
    itens: ["Pipoca grande", "2 Refrigerantes lata"]
  }
];

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8];
const OCCUPIED_SEATS = ['C4', 'C5', 'E7', 'E8', 'F1', 'F2']; 
const TICKET_PRICE = 20.00;

interface UserData {
  name: string;
  email: string;
  age?: number;
  cpf?: string;
  institution?: string;
  institutionVerification?: boolean;
  halfTicket?: {
    isEligible: boolean;
    status: string;
  };
}

// Função para gerar as datas dinamicamente
const getDynamicDates = (numDays = 4) => {
  const dates = [];
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  for (let i = 0; i < numDays; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    
    const dayName = i === 0 ? 'Hoje' : weekDays[d.getDay()];
    const dayNum = String(d.getDate()).padStart(2, '0');
    const monthName = months[d.getMonth()];
    
    dates.push(`${dayName}, ${dayNum} ${monthName}`);
  }
  return dates;
};

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieTitle = searchParams.get('title') || "Selecionar Sessão";

  const [step, setStep] = useState<1 | 2>(1);
  const [dates, setDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [comboQuantities, setComboQuantities] = useState<Record<number, number>>({});
  
  // estados pra meia-entrada
  const [user, setUser] = useState<UserData | null>(null);
  const [hasHalfTicket, setHasHalfTicket] = useState(false);

  useEffect(() => {
    // Gerar datas dinâmicas no client-side
    const generatedDates = getDynamicDates(4);
    setDates(generatedDates);
    setSelectedDate(generatedDates[0]);

    // Lidar com o usuário logado
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado) {
      try {
        const userData = JSON.parse(usuarioLogado);
        setUser(userData);
        if (userData.halfTicket?.isEligible) {
          setHasHalfTicket(true);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    }
  }, []);

  const toggleSeat = (seatId: string) => {
    if (OCCUPIED_SEATS.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]); 
    }
  };

  const updateComboQuantity = (comboId: number, delta: number) => {
    setComboQuantities(prev => {
      const currentQty = prev[comboId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      
      if (newQty === 0) {
        const newState = { ...prev };
        delete newState[comboId];
        return newState;
      }
      return { ...prev, [comboId]: newQty };
    });
  };

  const seatsTotal = calculateSeatsTotal(selectedSeats.length, TICKET_PRICE, hasHalfTicket);
  
  const combosTotal = Object.entries(comboQuantities).reduce((acc, [id, qty]) => {
    const combo = COMBOS.find(c => c.id === Number(id));
    return acc + (combo ? combo.preco * qty : 0);
  }, 0);

  const totalPrice = seatsTotal + combosTotal;

  // Evita renderizar antes de as datas dinâmicas estarem prontas
  if (dates.length === 0) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 flex flex-col items-center font-sans">
      
      <div className="w-full max-w-6xl flex items-center justify-between mb-10 mt-8">
        <div className="w-32 flex justify-start">
          {step === 1 ? (
            <BackButton />
          ) : (
            <div onClick={() => setStep(1)} className="cursor-pointer">
              <BackButton onClick={() => setStep(1)} />
            </div>
          )}
        </div>
        
        <h1 className="text-xl md:text-2xl font-bold text-center flex-1">
          {movieTitle}
        </h1>
        
        <div className="w-32"></div>
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
                <Calendar className="text-amber-400 w-5 h-5" /> 
                Escolha a Data
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {dates.map(date => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 px-6 py-3 rounded-xl border font-medium transition-all ${
                      selectedDate === date 
                        ? 'bg-amber-400 border-amber-400 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
                        : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-amber-400/50'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="text-amber-400 w-5 h-5" /> 
                Escolha o Horário
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SESSIONS.map(session => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSession(session.id)}
                    className={`p-5 rounded-xl border flex flex-col gap-2 transition-all text-left ${
                      selectedSession === session.id 
                        ? 'bg-slate-800 border-amber-400 ring-1 ring-amber-400' 
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
                className="bg-amber-400 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-amber-300 text-slate-950 font-bold py-4 px-10 rounded-xl transition-colors"
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
            className="w-full max-w-6xl flex flex-col lg:flex-row gap-10"
          >
            <div className="flex-1 space-y-10">
              <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 flex flex-col items-center">
                <div className="w-full max-w-md mb-12 flex flex-col items-center gap-2">
                  <div className="w-full h-8 border-t-4 border-amber-400/50 rounded-t-[50%] shadow-[0_-15px_30px_rgba(251,191,36,0.1)]"></div>
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
                                  ${isSelected ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] scale-110' : ''}
                                  ${!isOccupied && !isSelected ? 'bg-slate-700 hover:bg-slate-500 cursor-pointer' : ''}
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
                  <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-t bg-amber-400"></div> Selecionada</div>
                  <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-t bg-slate-800 opacity-50"></div> Ocupada</div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center justify-center w-full gap-2 text-center">
                  <span className="text-amber-400">Pipoca e Refri</span> para acompanhar?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {COMBOS.map((combo) => {
                    const qty = comboQuantities[combo.id] || 0;
                    
                    return (
                      <div 
                        key={combo.id}
                        className={`p-6 rounded-[2rem] border transition-all duration-300 flex flex-col items-center text-center group ${
                          qty > 0 ? 'bg-amber-400/5 border-amber-400' : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                        }`}
                      >
                        <div className="h-32 flex items-center justify-center mb-4">
                          <img src={combo.img} alt={combo.nome} className="h-full object-contain group-hover:scale-110 transition-transform" />
                        </div>
                        <h4 className="font-bold text-white mb-1">{combo.nome}</h4>
                        <span className="text-amber-400 font-black text-xl mb-3">R$ {combo.preco.toFixed(2)}</span>
                        
                        <ul className="text-[10px] text-slate-400 space-y-1 mb-6 flex-1">
                          {combo.itens.map((it, idx) => (
                            <li key={idx} className="flex items-center justify-center gap-1">
                              <CheckCircle2 size={10} className="text-amber-400" /> {it}
                            </li>
                          ))}
                        </ul>

                        <div className="flex items-center justify-between w-full bg-slate-950 p-1.5 rounded-full border border-slate-800 mt-auto">
                          <button 
                            onClick={() => updateComboQuantity(combo.id, -1)}
                            disabled={qty === 0}
                            className="w-10 h-10 flex items-center justify-center bg-slate-800 text-slate-400 rounded-full hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:hover:bg-slate-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold text-lg w-8 text-center">{qty}</span>
                          <button 
                            onClick={() => updateComboQuantity(combo.id, 1)}
                            className="w-10 h-10 flex items-center justify-center bg-amber-400 text-slate-950 rounded-full hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 cursor-pointer"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-80">
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl sticky top-10">
                <h3 className="text-xl font-bold mb-6 border-b border-slate-800 pb-4">Resumo do Pedido</h3>

                {hasHalfTicket && (
                  <div className="mb-6 p-3 bg-green-900/30 border border-green-600/50 rounded-lg flex items-center gap-2">
                    <Tag className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-green-300">Meia-Entrada Aplicada</p>
                      <p className="text-xs text-green-200">Desconto de 50% em ingressos</p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Sessão</span>
                    <span className="text-white text-right">{selectedDate}<br/>{SESSIONS.find(s => s.id === selectedSession)?.time}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Ingressos ({selectedSeats.length}x)</span>
                    <div className="text-right">
                      {hasHalfTicket ? (
                        <div>
                          <p className="line-through text-slate-500 text-xs">R$ {(selectedSeats.length * TICKET_PRICE).toFixed(2)}</p>
                          <p className="text-white font-semibold">R$ {seatsTotal.toFixed(2)}</p>
                        </div>
                      ) : (
                        <span className="text-white">R$ {seatsTotal.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  {Object.entries(comboQuantities).length > 0 && (
                    <div className="border-t border-slate-800/50 pt-4 mt-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Snacks</span>
                      {Object.entries(comboQuantities).map(([id, qty]) => {
                        const combo = COMBOS.find(c => c.id === Number(id));
                        if (!combo) return null;
                        return (
                          <div key={id} className="flex justify-between text-sm text-slate-400 mb-1">
                            <span>{qty}x {combo.nome}</span>
                            <span className="text-white">R$ {(combo.preco * qty).toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex justify-between pt-4 border-t border-slate-800/50 text-sm text-slate-300">
                    <span>Poltronas</span>
                    <span className="font-semibold text-amber-400 text-right">
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
                  disabled={selectedSeats.length === 0}
                  onClick={() => router.push('/checkout/paymentMethod')}
                  className="w-full flex items-center justify-center gap-2 bg-amber-400 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-amber-300 text-slate-950 font-bold py-4 px-6 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(251,191,36,0.3)] cursor-pointer disabled:cursor-not-allowed"
                >
                  <Ticket className="w-5 h-5" />
                  Finalizar Compra
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-amber-400 mt-4 font-bold">Carregando sessão...</p>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}