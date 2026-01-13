
import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="text-3xl font-extrabold text-red-600 tracking-tighter uppercase italic">Maratonei!</h1>
        <Link to="/auth" className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-bold transition-colors">
          Entrar
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with red overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-red-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Maratone o conhecimento de quem <span className="text-red-600 italic">chegou lá.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            Aprenda com os maiores experts do Brasil gratuitamente antes de investir na sua carreira. 
            Empreendedorismo, Idiomas, Tecnologia e muito mais.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/auth" className="bg-red-600 hover:bg-red-700 text-white text-xl px-12 py-4 rounded font-bold transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
              COMEÇAR AGORA
            </Link>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-24 px-6 md:px-12 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 hover:border-red-600/50 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-red-500">Conteúdo Curado</h3>
            <p className="text-zinc-400">Apenas os melhores vídeos e trilhas dos maiores experts do mercado selecionados para você.</p>
          </div>
          <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 hover:border-red-600/50 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-red-500">Totalmente Grátis</h3>
            <p className="text-zinc-400">Maratone quanto quiser sem pagar nada. Crie sua conta e comece a aprender hoje mesmo.</p>
          </div>
          <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 hover:border-red-600/50 transition-colors">
            <h3 className="text-2xl font-bold mb-4 text-red-500">Trilhas de Sucesso</h3>
            <p className="text-zinc-400">Siga caminhos estruturados para atingir objetivos como morar fora ou abrir sua empresa.</p>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-zinc-900 text-zinc-500">
        <p>&copy; 2024 Maratonei! - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Landing;
