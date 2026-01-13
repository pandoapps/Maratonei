
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { User, Video } from '../types';
import { VIDEOS, TRILHAS } from '../constants';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';

interface HomeProps {
  user: User;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeHero, setActiveHero] = useState(0);
  const [allVideos, setAllVideos] = useState<Video[]>([]);

  useEffect(() => {
    const customVideos = JSON.parse(localStorage.getItem('maratonei_custom_videos') || '[]');
    setAllVideos([...VIDEOS, ...customVideos]);
  }, []);

  const featuredVideos = allVideos.slice(0, 3);

  useEffect(() => {
    if (featuredVideos.length === 0) return;
    const timer = setInterval(() => {
      setActiveHero((prev) => (prev + 1) % featuredVideos.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredVideos.length]);

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

  return (
    <Layout user={user} onLogout={onLogout}>
      {/* Hero Carousel */}
      {featuredVideos.length > 0 && (
        <section className="relative h-[70vh] w-full overflow-hidden">
          {featuredVideos.map((video, idx) => (
            <div 
              key={video.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeHero ? 'opacity-100' : 'opacity-0'}`}
            >
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              <div className="absolute bottom-[20%] left-8 md:left-16 max-w-2xl">
                <span className="bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded mb-4 inline-block uppercase tracking-widest">Destaque</span>
                <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight">{video.title}</h2>
                <p className="text-lg text-zinc-300 mb-8 line-clamp-3">{video.description}</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => recordView(video.id)}
                    className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-zinc-200 transition-colors"
                  >
                    <Play fill="black" size={24} /> Assistir
                  </button>
                  <button 
                    onClick={() => recordView(video.id)}
                    className="flex items-center gap-2 bg-zinc-600/50 backdrop-blur text-white px-8 py-3 rounded font-bold hover:bg-zinc-600 transition-colors"
                  >
                    <Info size={24} /> Mais Info
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-10 right-8 flex gap-2">
            {featuredVideos.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveHero(idx)}
                className={`h-1 transition-all duration-300 ${idx === activeHero ? 'w-8 bg-red-600' : 'w-4 bg-zinc-600'}`}
              />
            ))}
          </div>
        </section>
      )}

      {/* Video Rows */}
      <div className={`px-8 ${featuredVideos.length > 0 ? 'mt-[-80px]' : 'mt-8'} relative z-20 space-y-12`}>
        
        <VideoRow title="Em alta" videos={[...allVideos].sort((a,b) => b.views - a.views)} onVideoClick={recordView} />
        
        <VideoRow title="Para você: Empreendedorismo" videos={allVideos.filter(v => v.category === 'Empreendedorismo')} onVideoClick={recordView} />
        
        {/* Trilhas Section */}
        <section>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            Trilhas de Sucesso
            <span className="text-sm font-normal text-zinc-500 hover:text-zinc-300 cursor-pointer">Ver todas</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRILHAS.map(trilha => (
              <div 
                key={trilha.id}
                className="group relative h-48 rounded-lg overflow-hidden cursor-pointer border border-zinc-800 hover:border-zinc-500 transition-all"
              >
                <img src={trilha.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={trilha.name} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col justify-end p-6">
                  <h4 className="text-xl font-bold">{trilha.name}</h4>
                  <p className="text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity mt-2">{trilha.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <VideoRow title="Educação e Idiomas" videos={allVideos.filter(v => ['Inglês', 'Educação'].includes(v.category))} onVideoClick={recordView} />
      </div>
    </Layout>
  );
};

interface VideoRowProps {
  title: string;
  videos: Video[];
  onVideoClick: (id: string) => void;
}

const VideoRow: React.FC<VideoRowProps> = ({ title, videos, onVideoClick }) => {
  if (videos.length === 0) return null;

  return (
    <section>
      <h3 className="text-2xl font-bold mb-4 flex items-center justify-between">
        {title}
        <div className="flex gap-2">
            <button className="p-1 hover:bg-zinc-800 rounded text-zinc-500"><ChevronLeft size={20}/></button>
            <button className="p-1 hover:bg-zinc-800 rounded text-zinc-500"><ChevronRight size={20}/></button>
        </div>
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
        {videos.map((video) => (
          <div 
            key={video.id}
            onClick={() => onVideoClick(video.id)}
            className="flex-none w-64 md:w-80 group cursor-pointer"
          >
            <div className="relative aspect-video rounded-md overflow-hidden bg-zinc-900 mb-3 border border-zinc-800 transition-transform duration-300 group-hover:scale-105 group-hover:z-10 shadow-lg group-hover:shadow-red-600/20">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-red-600 p-3 rounded-full shadow-xl">
                  <Play size={20} fill="white" />
                </div>
              </div>
            </div>
            <h4 className="font-bold text-zinc-200 group-hover:text-white transition-colors">{video.title}</h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500 font-medium">
              <span className="text-red-600 uppercase">98% Match</span>
              <span>{video.views.toLocaleString()} views</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
