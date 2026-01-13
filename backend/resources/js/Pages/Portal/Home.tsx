import { Head, Link } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';
import { Play, CheckCircle, ChevronRight } from 'lucide-react';

interface Expert {
    id: number;
    name: string;
    role: string;
    image: string;
}

interface Category {
    id: number;
    name: string;
}

interface Video {
    id: number;
    title: string;
    thumbnail: string | null;
    views: number;
    expert: Expert | null;
    categories: Category[];
    is_rated: boolean;
}

interface Trail {
    id: number;
    name: string;
    description: string;
    thumbnail: string | null;
    videos_count: number;
}

interface Props {
    featuredVideos: Video[];
    recentVideos: Video[];
    trails: Trail[];
}

function VideoCard({ video }: { video: Video }) {
    return (
        <Link
            href={route('portal.video', video.id)}
            className="group relative block"
        >
            <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 group-hover:border-red-600/50 transition-all">
                <img
                    src={video.thumbnail || 'https://via.placeholder.com/320x180'}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center">
                        <Play size={24} className="text-white ml-1" fill="white" />
                    </div>
                </div>

                {/* Rated indicator */}
                {video.is_rated && (
                    <div className="absolute top-2 right-2 bg-green-600 rounded-full p-1">
                        <CheckCircle size={16} className="text-white" />
                    </div>
                )}

                {/* Video info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white line-clamp-2 mb-1">{video.title}</h3>
                    {video.expert && (
                        <p className="text-sm text-zinc-400">{video.expert.name}</p>
                    )}
                </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-1 mt-2">
                {video.categories.slice(0, 2).map((cat) => (
                    <span
                        key={cat.id}
                        className="text-[10px] px-2 py-0.5 bg-zinc-800 rounded text-zinc-400"
                    >
                        {cat.name}
                    </span>
                ))}
            </div>
        </Link>
    );
}

function TrailCard({ trail }: { trail: Trail }) {
    return (
        <Link
            href={route('portal.trail', trail.id)}
            className="group block bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-600/50 transition-all"
        >
            <div className="relative h-32">
                <img
                    src={trail.thumbnail || 'https://via.placeholder.com/400x200'}
                    alt={trail.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
            </div>
            <div className="p-4">
                <h3 className="font-bold text-white mb-1">{trail.name}</h3>
                <p className="text-sm text-zinc-500 line-clamp-2 mb-2">{trail.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">{trail.videos_count} vídeos</span>
                    <ChevronRight size={16} className="text-zinc-500 group-hover:text-red-500 transition-colors" />
                </div>
            </div>
        </Link>
    );
}

export default function Home({ featuredVideos, recentVideos, trails }: Props) {
    return (
        <PortalLayout>
            <Head title="Portal - Maratonei!" />

            <div className="p-8">
                {/* Welcome Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-white italic mb-2">
                        BEM-VINDO AO <span className="text-yellow-400">IH</span> <span className="text-white">MARATONEI</span>
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Explore os melhores conteúdos dos maiores experts do Brasil.
                    </p>
                </div>

                {/* Featured Videos */}
                {featuredVideos.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Em Destaque</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredVideos.map((video) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Trails */}
                {trails.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Trilhas de Sucesso</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {trails.map((trail) => (
                                <TrailCard key={trail.id} trail={trail} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Recent Videos */}
                {recentVideos.length > 0 && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Adicionados Recentemente</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {recentVideos.map((video) => (
                                <VideoCard key={video.id} video={video} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {featuredVideos.length === 0 && recentVideos.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Play size={40} className="text-zinc-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Nenhum vídeo disponível</h3>
                        <p className="text-zinc-500">Novos conteúdos serão adicionados em breve.</p>
                    </div>
                )}
            </div>
        </PortalLayout>
    );
}
