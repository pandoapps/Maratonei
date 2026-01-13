
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { User, Video, Expert, Trilha } from '../types';
import { VIDEOS, EXPERTS, TRILHAS } from '../constants';
import { Users, Video as VideoIcon, UserCheck, Layers, Plus, Trash2, Eye, ChevronRight } from 'lucide-react';

interface AdminProps {
  user: User;
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'videos' | 'experts' | 'tracks'>('users');
  const [usersList, setUsersList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userHistory, setUserHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('maratonei_users_list') || '[]');
    setUsersList(savedUsers);
  }, []);

  const viewUserDetail = (user: User) => {
    setSelectedUser(user);
    const history = JSON.parse(localStorage.getItem('maratonei_history') || '[]');
    const uh = history.find((h: any) => h.userId === user.id);
    setUserHistory(uh ? uh.videoIds : []);
  };

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2">Painel Administrativo</h1>
            <p className="text-zinc-500">Gerencie a plataforma e acompanhe o engajamento.</p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded flex items-center gap-2 font-bold transition-all">
            <Plus size={20} /> Adicionar Novo
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard icon={<Users className="text-blue-500" />} label="Usuários" value={usersList.length.toString()} />
            <StatCard icon={<VideoIcon className="text-red-500" />} label="Vídeos" value={VIDEOS.length.toString()} />
            <StatCard icon={<UserCheck className="text-green-500" />} label="Experts" value={EXPERTS.length.toString()} />
            <StatCard icon={<Layers className="text-purple-500" />} label="Trilhas" value={TRILHAS.length.toString()} />
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-zinc-800 mb-8 overflow-x-auto scrollbar-hide">
            <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} label="Usuários" icon={<Users size={18} />} />
            <TabButton active={activeTab === 'videos'} onClick={() => setActiveTab('videos')} label="Vídeos" icon={<VideoIcon size={18} />} />
            <TabButton active={activeTab === 'experts'} onClick={() => setActiveTab('experts')} label="Experts" icon={<UserCheck size={18} />} />
            <TabButton active={activeTab === 'tracks'} onClick={() => setActiveTab('tracks')} label="Trilhas" icon={<Layers size={18} />} />
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-950 text-zinc-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Nome</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {activeTab === 'users' && usersList.map((u) => (
                                <tr key={u.id} className={`hover:bg-zinc-800/50 cursor-pointer transition-colors ${selectedUser?.id === u.id ? 'bg-zinc-800' : ''}`} onClick={() => viewUserDetail(u)}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center font-bold text-xs uppercase">
                                                {u.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{u.name}</p>
                                                <p className="text-xs text-zinc-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${u.role === 'admin' ? 'bg-red-900/30 text-red-500 border border-red-900/50' : 'bg-green-900/30 text-green-500 border border-green-900/50'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-1.5 hover:bg-zinc-700 rounded text-zinc-400"><Trash2 size={16} /></button>
                                            <button className="p-1.5 hover:bg-zinc-700 rounded text-white" onClick={() => viewUserDetail(u)}><ChevronRight size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {activeTab === 'videos' && VIDEOS.map((v) => (
                                <tr key={v.id} className="hover:bg-zinc-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={v.thumbnail} className="w-12 aspect-video rounded object-cover" />
                                            <div>
                                                <p className="font-bold text-sm line-clamp-1">{v.title}</p>
                                                <p className="text-xs text-zinc-500">{v.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-zinc-400">{v.views} views</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1.5 hover:bg-zinc-700 rounded text-zinc-400"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {(activeTab === 'experts' || activeTab === 'tracks') && (
                        <div className="p-12 text-center text-zinc-500">
                             Modo demonstração: Gestão de Experts e Trilhas virá na próxima atualização.
                        </div>
                    )}
                </div>
            </div>

            {/* Sidebar Inspector */}
            <div className="space-y-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Eye size={20} className="text-red-500" /> Inspetor de Usuário
                    </h3>
                    
                    {selectedUser ? (
                        <div>
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-3xl font-black mx-auto mb-4 border-4 border-zinc-800 shadow-xl">
                                    {selectedUser.name.charAt(0)}
                                </div>
                                <h4 className="font-bold text-lg">{selectedUser.name}</h4>
                                <p className="text-zinc-500 text-sm">{selectedUser.email}</p>
                                <p className="text-[10px] text-zinc-600 mt-1">Desde {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                            </div>

                            <div>
                                <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Histórico de Acessos</h5>
                                {userHistory.length > 0 ? (
                                    <ul className="space-y-3">
                                        {userHistory.map(vidId => {
                                            const v = VIDEOS.find(item => item.id === vidId);
                                            return v ? (
                                                <li key={vidId} className="flex items-center gap-3 bg-zinc-950 p-2 rounded border border-zinc-800 group">
                                                    <img src={v.thumbnail} className="w-14 aspect-video rounded object-cover" />
                                                    <span className="text-xs font-medium line-clamp-2">{v.title}</span>
                                                </li>
                                            ) : null;
                                        })}
                                    </ul>
                                ) : (
                                    <div className="text-center py-8 bg-zinc-950 rounded border border-dashed border-zinc-800 text-zinc-600 text-sm">
                                        Nenhum vídeo assistido ainda.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-zinc-600">
                            Selecione um usuário para ver os detalhes e histórico.
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

const StatCard: React.FC<{icon: React.ReactNode, label: string, value: string}> = ({icon, label, value}) => (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
            <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">{label}</span>
            <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800">{icon}</div>
        </div>
        <div className="text-3xl font-black">{value}</div>
    </div>
);

const TabButton: React.FC<{active: boolean, onClick: () => void, label: string, icon: React.ReactNode}> = ({active, onClick, label, icon}) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all px-2 ${active ? 'border-red-600 text-white' : 'border-transparent text-zinc-500 hover:text-zinc-300'}`}
    >
        {icon} {label}
    </button>
);

export default Admin;
