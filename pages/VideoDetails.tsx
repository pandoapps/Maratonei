
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
        {/* Back Button */}
        <div className="px-8 py-4">
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} /> Voltar para o catálogo
          </button>
        </div>

        {/* Video Player */}
        <div className="w-full max-w-7xl mx-auto aspect-video px-4 md:px-8">
          <div className="relative w-full h-full bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800">
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
        <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-green-500 font-bold">98% Match</span>
                {isWatched && (
                  <span className="flex items-center gap-1 bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded text-xs font-bold">
                    <CheckCircle2 size={14} /> Já assistido
                  </span>
                )}
                <span className="text-zinc-500">2024</span>
                <span className="border border-zinc-700 px-1.5 py-0.5 text-[10px] text-zinc-400 rounded">HD</span>
                <span className="text-zinc-400 text-sm">{video.category}</span>
            </div>

            <h1 className="text-4xl font-bold mb-4">{video.title}</h1>
            <p className="text-lg text-zinc-300 leading-relaxed mb-10">
              {video.description}
            </p>

            <div className="flex gap-4 mb-12">
                <button className="flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                    <div className="p-3 border border-zinc-800 rounded-full hover:bg-zinc-800 transition-colors">
                        <ThumbsUp size={20} />
                    </div>
                    <span className="text-xs">Gostei</span>
                </button>
                <button className="flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                    <div className="p-3 border border-zinc-800 rounded-full hover:bg-zinc-800 transition-colors">
                        <Share2 size={20} />
                    </div>
                    <span className="text-xs">Compartilhar</span>
                </button>
            </div>

            <div className="bg-red-900/10 border border-red-900/30 p-6 rounded-xl mb-12 flex gap-6">
                <div className="bg-red-600 p-3 rounded-lg h-fit text-white">
                    <Sparkles size={24} />
                </div>
                <div>
                    <h3 className="text-red-500 font-bold mb-2">Insight Maratonei AI</h3>
                    <p className="text-zinc-300 text-sm">
                        Este conteúdo de <strong>{expert?.name || 'Expert Maratonei'}</strong> é fundamental para a sua trilha de {video.category}. 
                        Ele aborda pontos cruciais que frequentemente impedem o crescimento no nível iniciante. 
                        Preste atenção especial aos minutos finais onde ele compartilha o "pulo do gato".
                    </p>
                </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={`https://i.pravatar.cc/300?u=${expert?.id || 'default'}`} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-red-600" 
                      alt={expert?.name} 
                    />
                    <div>
                        <h4 className="font-bold text-lg">{expert?.name || 'Expert Especialista'}</h4>
                        <span className="text-zinc-500 text-sm">{expert?.role || 'Mentor Maratonei'}</span>
                    </div>
                </div>
                <p className="text-zinc-400 text-sm italic mb-4">"{expert?.bio || 'Líder em sua área com anos de experiência transformando vidas através do conhecimento.'}"</p>
                <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 rounded transition-colors text-sm">
                    Ver Perfil do Expert
                </button>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="max-w-7xl mx-auto px-8 py-12 border-t border-zinc-900">
          <h2 className="text-2xl font-bold mb-8 italic">Pessoas que assistiram também maratonaram</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map(v => (
              <div 
                key={v.id}
                onClick={() => navigate(`/video/${v.id}`)}
                className="group cursor-pointer bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800 transition-colors border border-zinc-800"
              >
                <div className="aspect-video relative overflow-hidden">
                    <img src={v.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={v.title} />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent"></div>
                </div>
                <div className="p-4">
                    <h5 className="font-bold text-sm mb-1 line-clamp-1">{v.title}</h5>
                    <div className="flex justify-between items-center">
                        <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">{v.category}</span>
                        <Play size={14} className="text-red-600" fill="currentColor" />
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
