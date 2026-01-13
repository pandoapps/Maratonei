
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { User, Video, Expert, Trilha } from '../types';
import { VIDEOS, EXPERTS, TRILHAS } from '../constants';
import { Play, Info, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ExploreProps {
  user: User;
  onLogout: () => void;
}

const Explore: React.FC<ExploreProps> = ({ user, onLogout }) => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [metadata, setMetadata] = useState<{ title: string; description: string; image: string } | null>(null);
  const [watchedIds, setWatchedIds] = useState<string[]>([]);

  useEffect(() => {
    const customVideos = JSON.parse(localStorage.getItem('maratonei_custom_videos') || '[]');
    const allVideos = [...VIDEOS, ...customVideos];
    
    // Get history
    const history = JSON.parse(localStorage.getItem('maratonei_history') || '[]');
    const userHistory = history.find((h: any) => h.userId === user.id);
    if (userHistory) {
      setWatchedIds(userHistory.videoIds);
    }

    let title = '';
    let description = '';
    let image = 'https://loremflickr.com/1200/630?lock=999';
    let videos: Video[] = [];

    const decodedId = decodeURIComponent(id || '');

    if (type === 'subject') {
      title = decodedId;
      description = `Explore os melhores conteúdos sobre ${decodedId.toLowerCase()} selecionados especialmente para você.`;
      videos = allVideos.filter(v => v.category === decodedId);
      image = `https://loremflickr.com/1200/630?${decodedId}`;
    } else if (type === 'expert') {
      const expert = EXPERTS.find(e => e.id === decodedId);
      if (expert) {
        title = expert.name;
        description = expert.bio;
        // Pravatar used for experts, but here we use a landscape placeholder for hero
        image = `https://loremflickr.com/1200/630?${expert.name}`;
        videos = allVideos.filter(v => v.expertId === expert.id);
      }
    } else if (type === 'trilha') {
      const trilha = TRILHAS.find(t => t.id === decodedId);
      if (trilha) {
        title = trilha.name;
        description = trilha.description;
        image = trilha.thumbnail;
        videos = allVideos.filter(v => v.trilhaId === trilha.id);
      }
    }

    setMetadata({ title, description, image });
    setFilteredVideos(videos);
    window.scrollTo(0, 0);
  }, [type, id, user.id]);

  const recordView = (videoId: string) => {
    const history = JSON.parse(localStorage.getItem('maratonei_history') || '[]');
    const userHistory = history.find((h: any) => h.userId === user.id) || { userId: user.id, videoIds: [] };
    
    if (!userHistory.videoIds.includes(videoId)) {
      userHistory.videoIds.push(videoId);
      const newHistory = history.filter((h: any) => h.userId !== user.id);
      newHistory.push(userHistory);
      localStorage.setItem('maratonei_history', JSON.stringify(newHistory));
    }
    
    navigate(`/video/${videoId}`);
  };

  if (!metadata) return null;

  return (
    <Layout user={user} onLogout={onLogout}>
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src={metadata.image} 
          alt={metadata.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        <div className="absolute bottom-[15%] left-8 md:left-16 max-w-3xl">
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Voltar
          </button>
          <span className="text-red-600 text-sm font-bold uppercase tracking-[0.3em] mb-2 block">Explorar {type === 'subject' ? 'Assunto' : type === 'expert' ? 'Expert' : 'Trilha'}</span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight italic uppercase">{metadata.title}</h1>
          <p className="text-xl text-zinc-300 mb-8 leading-relaxed">{metadata.description}</p>
          
          {filteredVideos.length > 0 && (
            <div className="flex gap-4">
              <button 
                onClick={() => recordView(filteredVideos[0].id)}
                className="flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
              >
                <Play fill="white" size={24} /> Começar a Maratonar
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Videos Grid */}
      <div className="px-8 mt-12 pb-20">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
          Conteúdos Disponíveis
          <span className="text-sm font-normal text-zinc-500">{filteredVideos.length} vídeos encontrados</span>
        </h2>

        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredVideos.map((video) => (
              <div 
                key={video.id}
                onClick={() => recordView(video.id)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-zinc-900 mb-4 border border-zinc-800 transition-all duration-300 group-hover:scale-[1.02] shadow-lg group-hover:shadow-red-600/10">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                  
                  {/* Watched Mark */}
                  {watchedIds.includes(video.id) && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white p-1 rounded-full shadow-lg z-20">
                      <CheckCircle2 size={18} />
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-red-600 p-4 rounded-full shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                      <Play size={24} fill="white" />
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-lg text-zinc-100 group-hover:text-red-500 transition-colors line-clamp-1">{video.title}</h4>
                <p className="text-sm text-zinc-500 mt-2 line-clamp-2">{video.description}</p>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-green-500 text-xs font-black uppercase">98% Match</span>
                  <span className="text-zinc-600 text-xs">•</span>
                  <span className="text-zinc-500 text-xs">{video.views.toLocaleString()} views</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-dashed border-zinc-800">
            <p className="text-zinc-500 text-lg">Nenhum vídeo encontrado para esta seleção no momento.</p>
            <button 
              onClick={() => navigate('/home')}
              className="mt-6 text-red-600 font-bold hover:underline"
            >
              Explorar outros conteúdos
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Explore;
