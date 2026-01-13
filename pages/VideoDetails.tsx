
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { User, Video } from '../types';
import { VIDEOS, EXPERTS } from '../constants';
import { Play, Share2, ThumbsUp, ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface VideoDetailsProps {
  user: User;
  onLogout: () => void;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ user, onLogout }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [video, setVideo] = useState<Video | null>(null);
  const [expert, setExpert] = useState<any>(null);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    const customVideos = JSON.parse(localStorage.getItem('maratonei_custom_videos') || '[]');
    const allAvailableVideos = [...VIDEOS, ...customVideos];
    const v = allAvailableVideos.find((item) => item.id === id);
    if (v) {
      setVideo(v);
      setExpert(EXPERTS.find(e => e.id === v.expertId));
    }
    
    const history = JSON.parse(localStorage.getItem('maratonei_history') || '[]');
    const userHistory = history.find((h: any) => h.userId === user.id);
    if (userHistory && userHistory.videoIds.includes(id)) {
      setIsWatched(true);
    }
    
    window.scrollTo(0, 0);
  }, [id, user.id]);

  if (!video) return null;

  const customVideos = JSON.parse(localStorage.getItem('maratonei_custom_videos') || '[]');
  const allAvailableVideos = [...VIDEOS, ...customVideos];
  const recommendations = allAvailableVideos.filter(v => v.id !== video.id).slice(0, 4);

  const iframeSrc = `${video.embedUrl.split('?')[0]}?origin=${window.location.origin}&enablejsapi=1&rel=0&modestbranding=1`;

  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="bg-zinc-950 min-h-screen">
        {/* Header & Back Button */}
        <div className="max-w-7xl mx-auto px-8 py-6">
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={18} /> Voltar para o catálogo
          </button>

          {/* Title and Metadata ABOVE the video */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-4 mb-3">
                <span className="text-green-500 font-bold text-sm">98% Match</span>
                {isWatched && (
                  <span className="flex items-center gap-1 bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded text-[10px] font-black uppercase">
                    <CheckCircle2 size={12} /> Já assistido
                  </span>
                )}
                <span className="text-zinc-500 text-sm">2024</span>
                <span className="border border-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-400 rounded font-bold">HD</span>
                <span className="text-red-600 text-xs font-black uppercase tracking-widest">{video.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white italic uppercase">{video.title}</h1>
          </div>
        </div>

        {/* Video Player */}
        <div className="w-full max-w-7xl mx-auto aspect-video px-4 md:px-8">
          <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-zinc-800">
            <iframe 
              src={iframeSrc}
              title={video.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Info Area */}
        <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">Sobre esta aula</h3>
            <p className="text-xl text-zinc-300 leading-relaxed mb-10">
              {video.description}
            </p>

            <div className="flex gap-6 mb-12">
                <button className="flex flex-col items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                    <div className="p-4 border border-zinc-800 rounded-full group-hover:bg-zinc-800 group-hover:border-zinc-700 transition-all">
                        <ThumbsUp size={22} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Gostei</span>
                </button>
                <button className="flex flex-col items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
                    <div className="p-4 border border-zinc-800 rounded-full group-hover:bg-zinc-800 group-hover:border-zinc-700 transition-all">
                        <Share2 size={22} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Compartilhar</span>
                </button>
            </div>

            <div className="bg-red-950/20 border border-red-900/30 p-8 rounded-2xl mb-12 flex flex-col md:flex-row gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles size={120} className="text-red-600" />
                </div>
                <div className="bg-red-600 p-4 rounded-xl h-fit text-white shadow-lg shadow-red-600/20 relative z-10">
                    <Sparkles size={28} />
                </div>
                <div className="relative z-10">
                    <h3 className="text-red-500 font-black mb-3 italic uppercase tracking-wider">Insight Maratonei AI</h3>
                    <p className="text-zinc-300 text-base leading-relaxed">
                        Este conteúdo de <strong>{expert?.name || 'Expert Maratonei'}</strong> é fundamental para a sua trilha de {video.category}. 
                        Ele aborda pontos cruciais que frequentemente impedem o crescimento no nível iniciante. 
                        Preste atenção especial aos minutos finais onde ele compartilha o "pulo do gato".
                    </p>
                </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={`https://i.pravatar.cc/300?u=${expert?.id || 'default'}`} 
                      className="w-20 h-20 rounded-full object-cover border-2 border-red-600 shadow-xl" 
                      alt={expert?.name} 
                    />
                    <div>
                        <h4 className="font-black text-xl text-white italic uppercase">{expert?.name || 'Expert Especialista'}</h4>
                        <span className="text-red-600 text-xs font-bold uppercase tracking-widest">{expert?.role || 'Mentor Maratonei'}</span>
                    </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed italic mb-6">"{expert?.bio || 'Líder em sua área com anos de experiência transformando vidas através do conhecimento.'}"</p>
                <button className="w-full bg-white hover:bg-zinc-200 text-black font-black py-3 rounded-lg transition-all text-xs uppercase tracking-widest">
                    Ver Perfil Completo
                </button>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="max-w-7xl mx-auto px-8 py-16 border-t border-zinc-900">
          <h2 className="text-2xl font-black mb-10 italic uppercase text-white tracking-tight">Pessoas que assistiram também maratonaram</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendations.map(v => (
              <div 
                key={v.id}
                onClick={() => navigate(`/video/${v.id}`)}
                className="group cursor-pointer bg-zinc-900/30 rounded-xl overflow-hidden hover:bg-zinc-900 transition-all border border-zinc-800/50 hover:border-red-600/30 shadow-lg"
              >
                <div className="aspect-video relative overflow-hidden">
                    <img src={v.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={v.title} />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play size={32} className="text-white drop-shadow-2xl" fill="currentColor" />
                    </div>
                </div>
                <div className="p-5">
                    <h5 className="font-bold text-sm mb-2 line-clamp-1 text-zinc-100 group-hover:text-red-500 transition-colors">{v.title}</h5>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-600 text-[10px] uppercase font-black tracking-widest">{v.category}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-green-500 text-[10px] font-bold">98% Match</span>
                        </div>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VideoDetails;
