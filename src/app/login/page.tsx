'use client';

import Link from 'next/link';
import { Mail, Lock } from 'lucide-react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { loginSchema, LoginFormData } from '../../schemas/auth';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { BackButton } from '@/components/BackButton';

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormData) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) => u.email === data.email && u.password === data.password);
    
    if (usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      router.push('/');
    } else {
      alert('Email ou senha incorretos!');
    }
  }

  // Função para revelar falhas silenciosas do Zod
  function onError(errors: any) {
    console.error("O Zod bloqueou o envio por causa destes erros:", errors);
    alert("Erro de validação! Verifique o console do navegador (F12).");
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans text-zinc-300 relative selection:bg-amber-500/30">
      
      <div className="absolute top-6 left-6 sm:top-12 sm:left-12 z-50">
        <BackButton />
      </div>

      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-black items-center justify-center p-12 border-r border-zinc-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-md">
          <img src="/CineSol_logo.png" alt="CineSol Logo" className="w-32 h-32 mb-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.2)]"/>
          
          <h1 className="text-4xl font-bold text-white mb-6 tracking-tight leading-snug">
            A magia do cinema <br />na palma da sua mão.
          </h1>
          <p className="text-base text-zinc-400 font-light leading-relaxed">
            Acesse sua conta para garantir seus ingressos, comprar combos antecipados e viver a emoção de ponta a ponta.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none lg:hidden"></div>

        <div className="w-full max-w-md bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-8 sm:p-12 shadow-2xl relative z-10 animate-fade-in-up">
          
          <div className="flex items-center gap-3 text-xl font-bold text-white mb-10 lg:hidden justify-center tracking-wide uppercase">
            <img src="/CineSol_logo.png" alt="CineSol Logo" className="w-6 h-6" />
            CineSol
          </div>

          <h2 className="text-3xl font-semibold text-white mb-8 text-center lg:text-left tracking-tight">Entrar</h2>

          {/* Adicionamos a função onError ao handleSubmit */}
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-zinc-400 tracking-widest uppercase ml-1 block">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
                </div>
                <input 
                  type="email" 
                  placeholder="seu@email.com"
                  {...register("email")} 
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-lg py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-zinc-600"
                />
              </div>
              {errors.email && (<p className="text-red-400 text-xs mt-1 ml-1">{errors.email.message}</p>)}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-semibold text-zinc-400 tracking-widest uppercase ml-1 block">Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-4 h-4 text-zinc-500 group-focus-within:text-amber-400 transition-colors" />
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  {...register("password")} 
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-lg py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/50 transition-all placeholder:text-zinc-600"
                />
              </div>
              {errors.password && (<p className="text-red-400 text-xs mt-1 ml-1">{errors.password.message}</p>)}
            </div>

            <div className="flex items-center justify-end pt-1">
              <Link href="#" className="text-xs text-amber-500 hover:text-amber-400 transition-colors font-medium">
                Esqueceu a senha?
              </Link>
            </div>

            <button type="submit" className="cursor-pointer w-full mt-4 py-3.5 px-4 bg-amber-500 text-zinc-950 text-sm tracking-wide uppercase font-bold rounded-lg hover:bg-amber-400 hover:-translate-y-0.5 shadow-[0_0_15px_-5px_rgba(251,191,36,0.2)] hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.4)] transition-all duration-300">
              Entrar
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px bg-zinc-800 flex-1"></div>
            <span className="text-[10px] text-zinc-500 font-semibold tracking-widest uppercase">Ou acesse com</span>
            <div className="h-px bg-zinc-800 flex-1"></div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button type="button" className="cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-300">
              <FaGoogle className="w-4 h-4 text-zinc-300" />
              <span className="text-xs font-semibold text-zinc-300">Google</span>
            </button>
            <button type="button" className="cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 hover:border-zinc-700 hover:-translate-y-0.5 transition-all duration-300">
              <FaFacebook className="w-4 h-4 text-zinc-300" />
              <span className="text-xs font-semibold text-zinc-300">Facebook</span>
            </button>
          </div>

          <p className="mt-8 text-center text-xs text-zinc-400">
            Ainda não tem conta?{' '}
            <Link href="/register" className="text-amber-500 font-semibold hover:text-amber-400 transition-colors">
              Crie sua conta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}