
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for admin hack just for demo purposes
    const role = email === 'admin@maratonei.com' ? 'admin' : 'user';
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: isLogin ? (role === 'admin' ? 'Admin Master' : 'Usuário Maratonei') : name,
      email,
      role: role as 'admin' | 'user',
      createdAt: new Date().toISOString()
    };
    
    // Save to global user list for admin simulation
    const users = JSON.parse(localStorage.getItem('maratonei_users_list') || '[]');
    if (!users.find((u: User) => u.email === email)) {
        users.push(mockUser);
        localStorage.setItem('maratonei_users_list', JSON.stringify(users));
    }

    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/auth-bg/1920/1080?grayscale')] bg-cover"></div>
      
      <div className="bg-black/90 p-8 md:p-16 rounded-lg w-full max-w-md relative z-10 border border-zinc-800 shadow-2xl">
        <h1 className="text-4xl font-black text-white italic mb-8 text-center uppercase tracking-tighter">
          <span className="text-yellow-400">IH</span> maratonei
        </h1>
        <h2 className="text-3xl font-bold text-white mb-8">{isLogin ? 'Entrar' : 'Criar conta'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Seu nome"
                required
                className="w-full bg-zinc-800 text-white px-4 py-3 rounded border-none focus:ring-2 focus:ring-red-600 transition-all outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded border-none focus:ring-2 focus:ring-red-600 transition-all outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Senha"
              required
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded border-none focus:ring-2 focus:ring-red-600 transition-all outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition-colors text-lg"
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
        
        <div className="mt-8 text-zinc-500 text-center">
          {isLogin ? (
            <p>Novo por aqui? <button onClick={() => setIsLogin(false)} className="text-white hover:underline font-bold">Assine agora.</button></p>
          ) : (
            <p>Já tem conta? <button onClick={() => setIsLogin(true)} className="text-white hover:underline font-bold">Faça login.</button></p>
          )}
        </div>

        <div className="mt-6 p-4 bg-zinc-900 rounded text-xs text-zinc-400">
            Dica: Use <strong>admin@maratonei.com</strong> para acessar o painel administrativo.
        </div>
      </div>
    </div>
  );
};

export default Auth;