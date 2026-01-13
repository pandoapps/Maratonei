
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { ASSUNTOS, EXPERTS, TRILHAS } from '../constants';
import { Menu, X, User as UserIcon, LogOut, Search, Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden md:w-20'} transition-all duration-300 bg-zinc-950 border-r border-zinc-900 fixed left-0 top-0 bottom-0 z-40`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-10">
            {isSidebarOpen && <h1 className="text-2xl font-black text-red-600 italic">MARATONEI!</h1>}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-zinc-800 rounded">
              <Menu size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide">
            {/* Assuntos */}
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Assuntos</h3>
              <ul className="space-y-2">
                {ASSUNTOS.map((item, idx) => (
                  <li key={idx}>
                    <button className="text-sm text-zinc-400 hover:text-white transition-colors w-full text-left py-1 truncate">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experts */}
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Experts</h3>
              <ul className="space-y-2">
                {EXPERTS.map((expert) => (
                  <li key={expert.id}>
                    <button className="text-sm text-zinc-400 hover:text-white transition-colors w-full text-left py-1 truncate">
                      {expert.name}
                    </button>
                  </li>
                ))}
                <li><button className="text-sm text-red-600 hover:text-red-500 font-bold transition-colors w-full text-left py-1">Conheça outros influencers</button></li>
              </ul>
            </div>

            {/* Trilhas */}
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Trilhas</h3>
              <ul className="space-y-2">
                {TRILHAS.map((trilha) => (
                  <li key={trilha.id}>
                    <button className="text-sm text-zinc-400 hover:text-white transition-colors w-full text-left py-1 truncate">
                      {trilha.name}
                    </button>
                  </li>
                ))}
                <li><button className="text-sm text-red-600 hover:text-red-500 font-bold transition-colors w-full text-left py-1">Conheça outras trilhas</button></li>
              </ul>
            </div>
          </div>
          
          {user.role === 'admin' && (
            <div className="pt-4 border-t border-zinc-900">
               <button 
                onClick={() => navigate('/admin')}
                className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors w-full py-2"
               >
                 <Settings size={20} />
                 {isSidebarOpen && <span className="text-sm font-bold">Admin Panel</span>}
               </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? 'md:ml-64' : 'ml-0 md:ml-20'} transition-all duration-300 min-h-screen`}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-md">
          <div className="flex items-center gap-6">
            {!isSidebarOpen && <h1 className="text-xl font-black text-red-600 italic">M!</h1>}
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Busque por vídeos ou trilhas"
                className="bg-zinc-900/50 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 w-64 lg:w-96 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center font-bold text-sm">
                {user.name.charAt(0)}
              </div>
              <span className="text-sm font-medium hidden sm:block">{user.name}</span>
            </div>
            <button 
                onClick={onLogout}
                className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
                title="Sair"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <div className="pb-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
