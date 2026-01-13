
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { ASSUNTOS, EXPERTS, TRILHAS } from '../constants';
import { Menu, LogOut, Search, Settings, User as UserIcon, ChevronDown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const userPhoto = `https://picsum.photos/seed/${user.id}/100/100`;

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden md:w-20'} transition-all duration-300 bg-zinc-950 border-r border-zinc-900 fixed left-0 top-0 bottom-0 z-50`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-10">
            {isSidebarOpen && (
              <Link to="/home" className="text-2xl font-black text-red-600 italic hover:text-red-500 transition-colors">
                MARATONEI!
              </Link>
            )}
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-zinc-800 rounded">
              <Menu size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-8 scrollbar-hide">
            {/* Assuntos */}
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Assuntos</h3>
              <ul className="space-y-2">
                {ASSUNTOS.map((item, idx) => {
                  const isSpecial = item === 'Conheça outros assuntos';
                  return (
                    <li key={idx}>
                      <button className={`text-sm transition-colors w-full text-left py-1 truncate ${isSpecial ? 'text-red-600 hover:text-red-500 font-bold' : 'text-zinc-400 hover:text-white'}`}>
                        {item}
                      </button>
                    </li>
                  );
                })}
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
      <main className={`flex-1 ${isSidebarOpen ? 'md:ml-64' : 'ml-0 md:ml-20'} transition-all duration-300 min-h-screen relative`}>
        {/* Header */}
        <header className="sticky top-0 z-[60] flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-md border-b border-zinc-900">
          <div className="flex items-center gap-6">
            {!isSidebarOpen && (
              <Link to="/home" className="text-xl font-black text-red-600 italic hover:text-red-500 transition-colors">
                M!
              </Link>
            )}
            <div className="relative group hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Busque por vídeos ou trilhas"
                className="bg-zinc-900/50 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 w-64 lg:w-96 transition-all"
              />
            </div>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-3 bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-800 transition-colors group"
            >
              <img 
                src={userPhoto} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-zinc-700 object-cover"
              />
              <span className="text-sm font-bold hidden sm:block">{user.name}</span>
              <ChevronDown size={16} className={`text-zinc-500 group-hover:text-white transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-zinc-950 border border-zinc-800 rounded-lg shadow-2xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-zinc-900 mb-1">
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Minha Conta</p>
                </div>
                <button 
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <UserIcon size={18} />
                  Meu Perfil
                </button>
                <div className="border-t border-zinc-900 my-1"></div>
                <button 
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    onLogout();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors font-bold"
                >
                  <LogOut size={18} />
                  Sair (Logoff)
                </button>
              </div>
            )}
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
