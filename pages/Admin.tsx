
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { User, Video, Expert, Trilha } from '../types';
import { VIDEOS, EXPERTS, TRILHAS, ASSUNTOS } from '../constants';
import { Users, Video as VideoIcon, UserCheck, Layers, Plus, Trash2, Eye, ChevronRight, X, Link as LinkIcon } from 'lucide-react';

interface AdminProps {
  user: User;
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'videos' | 'experts' | 'tracks'>('users');
  const [usersList, setUsersList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userHistory, setUserHistory] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Video Form State
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    expertId: '',
    category: '',
    trilhaId: '',
    url: '' // Added URL field
  });

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

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert regular YouTube link to embed if necessary
    let embedUrl = newVideo.url;
    if (embedUrl.includes('watch?v=')) {
      embedUrl = embedUrl.replace('watch?v=', 'embed/');
    } else if (embedUrl.includes('youtu.be/')) {
      embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/');
    }

    const videoToAdd: Video = {
      id: `v-custom-${Date.now()}`,
      title: newVideo.title,
      description: newVideo.description,
      thumbnail: `https://loremflickr.com/800/600?lock=${Math.floor(Math.random() * 1000)}`,
      embedUrl: embedUrl,
      expertId: newVideo.expertId,
      category: newVideo.category,
      trilhaId: newVideo.trilhaId || undefined,
      views: 0
    };
    
    const currentVideos = JSON.parse(localStorage.getItem('maratonei_custom_videos') || '[]');
    localStorage.setItem('maratonei_custom_videos', JSON.stringify([...currentVideos, videoToAdd]));
    
    setIsModalOpen(false);
    setNewVideo({ title: '', description: '', expertId: '', category: '', trilhaId: '', url: '' });
    alert('Vídeo adicionado com sucesso!');
    window.location.reload(); // Refresh to show new video in allVideos
  };

  // Combine static and custom videos for display
  const customVideos = JSON.parse(localStorage.getItem('maratonei_custom_videos') || '[]');
  const allVideos = [...VIDEOS, ...customVideos];

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black mb-2 text-white italic">PAINEL ADMINISTRATIVO</h1>
            <p className="text-zinc-500">Gerencie a plataforma e acompanhe o engajamento.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded flex items-center gap-2 font-bold transition-all shadow-lg hover:shadow-red-600/20"
          >
            <Plus size={20} /> ADICIONAR VÍDEO
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <StatCard icon={<Users className="text-blue-500" />} label="Usuários" value={usersList.length.toString()} />
            <StatCard icon={<VideoIcon className="text-red-500" />} label="Vídeos" value={allVideos.length.toString()} />
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
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-950 text-zinc-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Informação</th>
                                <th className="px-6 py-4">{activeTab === 'users' ? 'Papel' : 'Métricas'}</th>
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
                                                <p className="font-bold text-sm text-white">{u.name}</p>
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
                            {activeTab === 'videos' && allVideos.map((v) => (
                                <tr key={v.id} className="hover:bg-zinc-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={v.thumbnail} className="w-12 aspect-video rounded object-cover border border-zinc-700" alt={v.title} />
                                            <div>
                                                <p className="font-bold text-sm line-clamp-1 text-white">{v.title}</p>
                                                <p className="text-xs text-zinc-500">{v.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-zinc-400 font-medium">{v.views.toLocaleString()} visualizações</td>
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
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                        <Eye size={20} className="text-red-500" /> Inspetor de Usuário
                    </h3>
                    
                    {selectedUser ? (
                        <div>
                            <div className="text-center mb-8">
                                <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-3xl font-black mx-auto mb-4 border-4 border-zinc-800 shadow-xl">
                                    {selectedUser.name.charAt(0)}
                                </div>
                                <h4 className="font-bold text-lg text-white">{selectedUser.name}</h4>
                                <p className="text-zinc-500 text-sm">{selectedUser.email}</p>
                                <p className="text-[10px] text-zinc-600 mt-1 uppercase font-bold">Desde {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                            </div>

                            <div>
                                <h5 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Histórico de Acessos</h5>
                                {userHistory.length > 0 ? (
                                    <ul className="space-y-3">
                                        {userHistory.map(vidId => {
                                            const v = allVideos.find(item => item.id === vidId);
                                            return v ? (
                                                <li key={vidId} className="flex items-center gap-3 bg-zinc-950 p-2 rounded border border-zinc-800 group hover:border-red-600/50 transition-colors">
                                                    <img src={v.thumbnail} className="w-14 aspect-video rounded object-cover" alt={v.title} />
                                                    <span className="text-xs font-medium line-clamp-2 text-zinc-300 group-hover:text-white">{v.title}</span>
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
                            Selecione um usuário na lista ao lado para ver os detalhes e histórico.
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* Modal Adicionar Vídeo */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h2 className="text-2xl font-black text-white italic">CADASTRAR NOVO VÍDEO</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddVideo} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Título do Vídeo</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Ex: Como gerenciar seu tempo"
                    className="w-full bg-zinc-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">URL do Vídeo (YouTube)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input 
                      required
                      type="url" 
                      placeholder="https://www.youtube.com/embed/..."
                      className="w-full bg-zinc-800 border-none rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none"
                      value={newVideo.url}
                      onChange={(e) => setNewVideo({...newVideo, url: e.target.value})}
                    />
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-1">Insira o link de incorporação (embed) ou o link direto do vídeo.</p>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Descrição</label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Breve resumo do conteúdo..."
                    className="w-full bg-zinc-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none resize-none"
                    value={newVideo.description}
                    onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Expert Relacionado</label>
                  <select 
                    required
                    className="w-full bg-zinc-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none appearance-none"
                    value={newVideo.expertId}
                    onChange={(e) => setNewVideo({...newVideo, expertId: e.target.value})}
                  >
                    <option value="">Selecione um expert</option>
                    {EXPERTS.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Assunto / Categoria</label>
                  <select 
                    required
                    className="w-full bg-zinc-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none appearance-none"
                    value={newVideo.category}
                    onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                  >
                    <option value="">Selecione o assunto</option>
                    {ASSUNTOS.filter(a => a !== 'Conheça outros assuntos').map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase">Faz parte de qual trilha? (Opcional)</label>
                  <select 
                    className="w-full bg-zinc-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none appearance-none"
                    value={newVideo.trilhaId}
                    onChange={(e) => setNewVideo({...newVideo, trilhaId: e.target.value})}
                  >
                    <option value="">Nenhuma trilha específica</option>
                    {TRILHAS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  CANCELAR
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-red-600/20"
                >
                  CONFIRMAR CADASTRO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

const StatCard: React.FC<{icon: React.ReactNode, label: string, value: string}> = ({icon, label, value}) => (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg group hover:border-red-600/30 transition-colors">
        <div className="flex items-center justify-between mb-4">
            <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">{label}</span>
            <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800 group-hover:scale-110 transition-transform">{icon}</div>
        </div>
        <div className="text-3xl font-black text-white">{value}</div>
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
