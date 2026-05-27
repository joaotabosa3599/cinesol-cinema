
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 text-2xl font-bold text-white mb-4">
            <img src="/CineSol_logo.png" alt="CineSol Logo" className="w-8 h-8" />
            CineSol
          </div>
          <p className="text-sm">
            Vivencie a emoção de ponta a ponta na melhor estrutura de cinema da região.
          </p>
        </div>

        <div>
           <h4 className="text-white font-semibold mb-4 text-lg">Links Rápidos</h4>
           <ul className="space-y-2 text-sm">
             <li><a href="#" className="hover:text-amber-400 transition-colors">Programação</a></li>
             <li><a href="#" className="hover:text-amber-400 transition-colors">Preços e Combos</a></li>
             <li><a href="#" className="hover:text-amber-400 transition-colors">Regras de Meia-Entrada</a></li>
           </ul>
        </div>

        <div>
           <h4 className="text-white font-semibold mb-4 text-lg">Institucional</h4>
           <ul className="space-y-2 text-sm">
             <li><a href="#" className="hover:text-amber-400 transition-colors">Sobre Nós</a></li>
             <li><a href="#" className="hover:text-amber-400 transition-colors">Trabalhe Conosco</a></li>
             <li><a href="#" className="hover:text-amber-400 transition-colors">Contato</a></li>
           </ul>
        </div>

        <div>
           <h4 className="text-white font-semibold mb-4 text-lg">Siga-nos</h4>
           <div className="flex gap-4">
             <a href="#" className="p-2 bg-slate-900 rounded-full hover:bg-amber-400 hover:text-slate-950 transition-colors"><FaInstagram className="w-5 h-5"/></a>
             <a href="#" className="p-2 bg-slate-900 rounded-full hover:bg-amber-400 hover:text-slate-950 transition-colors"><FaTwitter className="w-5 h-5"/></a>
             <a href="#" className="p-2 bg-slate-900 rounded-full hover:bg-amber-400 hover:text-slate-950 transition-colors"><FaFacebook className="w-5 h-5"/></a>
           </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 text-sm text-center">
        © {new Date().getFullYear()} CineSol Cinema. Todos os direitos reservados.
      </div>
    </footer>
  );
}
