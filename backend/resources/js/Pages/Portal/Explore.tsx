import { Head, Link } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';
import { Play, CheckCircle, ArrowLeft } from 'lucide-react';

interface Expert {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
}

interface Trail {
    id: number;
    name: string;
    description: string;
    thumbnail: string | null;
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

interface Props {
    title: string;
    subtitle: string | null;
    type: 'category' | 'expert' | 'trail';
    videos: Video[];
    expert?: Expert;
    trail?: Trail;
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

            {/* Views */}
            <p className="text-xs text-zinc-500 mt-1">
                {video.views.toLocaleString()} visualizações
            </p>
        </Link>
    );
}

export default function Explore({ title, subtitle, type, videos, expert, trail }: Props) {
    return (
        <PortalLayout>
            <Head title={`${title} - Maratonei!`} />

            <div className="p-8">
                {/* Back button */}
                <Link
                    href={route('portal.home')}
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Voltar para início
                </Link>

                {/* Header */}
                <div className="mb-8">
                    {type === 'expert' && expert && (
                        <div className="flex items-center gap-6 mb-6">
                            <img
                                src={expert.image || `https://i.pravatar.cc/200?u=${expert.id}`}
                                alt={expert.name}
                                className="w-24 h-24 rounded-full border-4 border-zinc-800 object-cover"
                            />
                            <div>
                                <h1 className="text-3xl font-black text-white italic">{title}</h1>
                                {subtitle && <p className="text-lg text-red-500 font-medium">{subtitle}</p>}
                                {expert.bio && (
                                    <p className="text-zinc-400 mt-2 max-w-2xl">{expert.bio}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {type === 'trail' && trail && (
                        <div className="relative rounded-xl overflow-hidden mb-6">
                            <img
                                src={trail.thumbnail || 'https://via.placeholder.com/1200x300'}
                                alt={trail.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center">
                                <div className="p-8">
                                    <h1 className="text-3xl font-black text-white italic">{title}</h1>
                                    {subtitle && <p className="text-zinc-300 mt-2 max-w-xl">{subtitle}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {type === 'category' && (
                        <>
                            <h1 className="text-3xl font-black text-white italic">{title}</h1>
                            {subtitle && <p className="text-zinc-400 mt-2">{subtitle}</p>}
                        </>
                    )}
                </div>

                {/* Videos count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-zinc-500">
                        {videos.length} {videos.length === 1 ? 'vídeo encontrado' : 'vídeos encontrados'}
                    </p>
                </div>

                {/* Videos Grid */}
                {videos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {videos.map((video) => (
                            <VideoCard key={video.id} video={video} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-zinc-900 rounded-xl border border-zinc-800">
                        <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Play size={40} className="text-zinc-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Nenhum vídeo encontrado</h3>
                        <p className="text-zinc-500">Novos conteúdos serão adicionados em breve.</p>
                    </div>
                )}
            </div>
        </PortalLayout>
    );
}
