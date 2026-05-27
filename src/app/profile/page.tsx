'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Ticket, Star, Settings, Clock, ChevronRight, CreditCard, Bell, Check, AlertCircle, FileUp, Edit2, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BackButton } from '@/components/BackButton';
import { checkHalfTicketEligibility, formatHalfTicketStatus, getStatusColor } from '@/utils/halfTicketUtils';

interface UserData {
  name: string;
  email: string;
  age?: number;
  cpf?: string;
  institution?: string;
  institutionVerification?: boolean;
  halfTicket?: {
    isEligible: boolean;
    status: 'pendente' | 'aprovado' | 'rejeitado';
    age?: number;
    cpf?: string;
    institution?: string;
    institutionVerification: boolean;
    documentUrl?: string;
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [editAge, setEditAge] = useState<number | undefined>();
  const [editCpf, setEditCpf] = useState('');
  const [editInstitution, setEditInstitution] = useState('');
  const [editVerification, setEditVerification] = useState(false);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
      router.push('/login');
    } else {
      try {
        const userData = JSON.parse(usuarioLogado);
        setUser(userData);
        
        setEditAge(userData.age);
        setEditCpf(userData.cpf || '');
        setEditInstitution(userData.institution || '');
        setEditVerification(userData.institutionVerification || false);
      } catch (error) {
        router.push('/login');
      }
    }
    setIsLoading(false);
  }, [router]);

  const handleSaveHalfTicketInfo = () => {
    if (!user) return;

    const updatedUser: UserData = {
      ...user,
      age: editAge,
      cpf: editCpf,
      institution: editInstitution,
      institutionVerification: editVerification,
      halfTicket: {
        isEligible: checkHalfTicketEligibility({
          age: editAge,
          institution: editInstitution,
          institutionVerification: editVerification,
        }),
        status: 'pendente',
        age: editAge,
        cpf: editCpf,
        institution: editInstitution,
        institutionVerification: editVerification,
      },
    };
    
    setUser(updatedUser);
    localStorage.setItem('usuarioLogado', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-amber-500/30">
      <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />

      <main className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 inline-block"
        >
          <BackButton />
        </motion.div>

        <header className="flex flex-col items-center gap-6 mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500 to-yellow-200 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative w-32 h-32 bg-slate-900 rounded-full border-2 border-slate-800 flex items-center justify-center overflow-hidden">
              <User className="w-16 h-16 text-slate-700" />
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-amber-400 text-slate-950 rounded-full hover:scale-110 transition-transform shadow-lg">
              <Settings size={16} />
            </button>
          </div>

          <div className="w-full text-center space-y-3">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight"
            >
              {user.name}
            </motion.h1>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="flex items-center gap-1.5 text-slate-400 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800 text-sm">
                <Mail size={14} /> {user.email}
              </span>
              <span className="flex items-center gap-1.5 text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 text-sm font-medium">
                <Star size={14} fill="currentColor" /> Cliente VIP
              </span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 space-y-6">
            <section className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-6 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Star size={80} />
              </div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                CineSol Club
              </h3>
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-end">
                  <span className="text-3xl font-black text-white">450 <span className="text-sm font-normal text-slate-500">pts</span></span>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Nível Bronze</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '45%' }}
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-300"
                  />
                </div>
                <p className="text-xs text-slate-500">Ganhe mais 50 pontos para resgatar uma Pipoca Média!</p>
                <Link href="/rewards" className="block text-center w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-xl transition-all cursor-pointer">
                  Ver Recompensas
                </Link>
              </div>
            </section>

            <nav className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-2">
              {[
                { icon: Ticket, label: 'Meus Ingressos', active: true },
                { icon: Clock, label: 'Histórico de Filmes', active: false },
                { icon: CreditCard, label: 'Métodos de Pagamento', active: false },
                { icon: Bell, label: 'Notificações', active: false },
              ].map((item, idx) => (
                <button 
                  key={idx}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                    item.active ? 'bg-amber-400/10 text-amber-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 font-semibold">
                    <item.icon size={20} />
                    {item.label}
                  </div>
                  <ChevronRight size={18} opacity={0.5} />
                </button>
              ))}
            </nav>
          </aside>

          <section className="lg:col-span-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Ticket className="w-6 h-6 text-amber-400" />
                  Elegibilidade - Meia-Entrada
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-amber-400/10 text-amber-400 rounded-lg hover:bg-amber-400/20 transition-all border border-amber-400/30"
                  >
                    <Edit2 size={16} />
                    Editar
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Idade
                    </label>
                    <input
                      type="number"
                      value={editAge || ''}
                      onChange={(e) => setEditAge(e.target.value ? parseInt(e.target.value) : undefined)}
                      placeholder="Ex: 17"
                      className="w-full px-4 py-2 bg-slate-950/50 border border-slate-700 text-white rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                    <p className="text-xs text-slate-500 mt-1">Menores de 18 anos têm direito a meia-entrada</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      CPF
                    </label>
                    <input
                      type="text"
                      value={editCpf}
                      onChange={(e) => setEditCpf(e.target.value)}
                      placeholder="Ex: 123.456.789-00"
                      className="w-full px-4 py-2 bg-slate-950/50 border border-slate-700 text-white rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Instituição de Ensino
                    </label>
                    <input
                      type="text"
                      value={editInstitution}
                      onChange={(e) => setEditInstitution(e.target.value)}
                      placeholder="Ex: Universidade XYZ ou Escola ABC"
                      className="w-full px-4 py-2 bg-slate-950/50 border border-slate-700 text-white rounded-lg focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editVerification}
                        onChange={(e) => setEditVerification(e.target.checked)}
                        className="w-5 h-5 rounded border-slate-600 bg-slate-950 accent-amber-400 cursor-pointer"
                      />
                      <span className="text-sm font-semibold text-slate-300">
                        Confirmo que estou vinculado à instituição de ensino mencionada
                      </span>
                    </label>
                    <p className="text-xs text-slate-500 mt-2">
                      Ao marcar esta opção, você atesta que as informações fornecidas são verdadeiras.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Documento/Comprovante (Opcional)
                    </label>
                    <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-amber-400/50 transition-colors">
                      <FileUp className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">
                        Clique ou arraste um arquivo para fazer upload
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        (Neste protótipo, o upload não está funcional)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSaveHalfTicketInfo}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 text-slate-950 font-bold rounded-lg hover:bg-amber-300 transition-all"
                    >
                      <Save size={18} />
                      Salvar Informações
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 text-slate-300 font-semibold rounded-lg hover:bg-slate-700 transition-all"
                    >
                      <X size={18} />
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {user?.halfTicket ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`p-6 rounded-xl border-2 flex items-center gap-4 ${
                        user.halfTicket.isEligible
                          ? 'bg-green-900/20 border-green-600/50'
                          : 'bg-slate-800/20 border-slate-700/50'
                      }`}
                    >
                      {user.halfTicket.isEligible ? (
                        <Check className="w-8 h-8 text-green-400 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-8 h-8 text-slate-500 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-bold text-white">
                          {user.halfTicket.isEligible ? 'Elegível para Meia-Entrada' : 'Não elegível para Meia-Entrada'}
                        </p>
                        <p className="text-sm text-slate-400">
                          Status: {formatHalfTicketStatus(user.halfTicket.status)}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="p-6 rounded-xl border-2 border-slate-700/50 bg-slate-800/20 flex items-center gap-4">
                      <AlertCircle className="w-8 h-8 text-slate-500 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-white">Informações não preenchidas</p>
                        <p className="text-sm text-slate-400">Preencha seus dados para verificar elegibilidade</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/30 p-4 rounded-lg">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Idade</p>
                      <p className="text-lg font-bold text-white mt-1">{user?.age ? `${user.age} anos` : '-'}</p>
                    </div>
                    <div className="bg-slate-800/30 p-4 rounded-lg">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">CPF</p>
                      <p className="text-lg font-bold text-white mt-1">{user?.cpf ? user.cpf : '-'}</p>
                    </div>
                    <div className="bg-slate-800/30 p-4 rounded-lg col-span-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Instituição</p>
                      <p className="text-lg font-bold text-white mt-1">{user?.institution ? user.institution : '-'}</p>
                    </div>
                    <div className="bg-slate-800/30 p-4 rounded-lg col-span-2">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Confirmação de Vínculo</p>
                      <div className="flex items-center gap-2 mt-2">
                        {user?.institutionVerification ? (
                          <>
                            <Check className="w-5 h-5 text-green-400" />
                            <p className="text-white font-semibold">Confirmado</p>
                          </>
                        ) : (
                          <>
                            <X className="w-5 h-5 text-slate-500" />
                            <p className="text-slate-400 font-semibold">Não confirmado</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
                    <h4 className="font-bold text-amber-300 mb-3 flex items-center gap-2">
                      <AlertCircle size={18} />
                      Critérios para Elegibilidade
                    </h4>
                    <ul className="space-y-2 text-sm text-amber-200">
                      <li className="flex items-center gap-2">
                        {(user?.age !== undefined && user.age < 18) ? (
                          <Check size={16} className="text-green-400" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border-2 border-slate-500" />
                        )}
                        <span>Menor de 18 anos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        {user?.institution && user?.institutionVerification ? (
                          <Check size={16} className="text-green-400" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border-2 border-slate-500" />
                        )}
                        <span>Vinculado a instituição de ensino confirmada</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>

            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-700">
                <Ticket className="w-10 h-10 text-slate-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Próximas Sessões</h2>
              <p className="text-slate-500 max-w-xs mb-8">
                Você ainda não tem nenhum ingresso garantido. Que tal escolher um filme agora?
              </p>
              <Link 
                href="/#cartaz"
                className="px-8 py-4 bg-amber-400 text-slate-950 font-bold rounded-2xl hover:bg-amber-300 hover:-translate-y-1 transition-all shadow-[0_10px_20px_-10px_rgba(251,191,36,0.5)]"
              >
                Explorar Filmes
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}