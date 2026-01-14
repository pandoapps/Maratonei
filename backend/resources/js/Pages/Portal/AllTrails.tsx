import { Head, Link } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';
import { ArrowLeft, Layers, Play } from 'lucide-react';

interface Trail {
    id: number;
    name: string;
    description: string | null;
    thumbnail: string | null;
    videos_count: number;
}

interface Props {
    trails: Trail[];
}

function TrailCard({ trail }: { trail: Trail }) {
    return (
        <Link
            href={route('portal.trail', trail.id)}
            className="group relative block"
        >
            <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 group-hover:border-yellow-400/50 transition-all">
                {trail.thumbnail ? (
                    <img
                        src={trail.thumbnail}
                        alt={trail.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-zinc-900 flex items-center justify-center">
                        <Layers size={48} className="text-purple-500/50" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                {/* Trail badge */}
                <div className="absolute top-3 left-3 px-3 py-1 bg-purple-600/80 rounded-full">
                    <span className="text-xs font-bold text-white uppercase">Trilha</span>
                </div>

                {/* Trail info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white text-lg mb-1">{trail.name}</h3>
                    {trail.description && (
                        <p className="text-sm text-zinc-400 line-clamp-2">{trail.description}</p>
                    )}
                </div>
            </div>

            {/* Videos count */}
            <div className="flex items-center gap-2 mt-2 text-zinc-500 text-sm">
                <Play size={14} />
                <span>{trail.videos_count} {trail.videos_count === 1 ? 'vídeo' : 'vídeos'}</span>
            </div>
        </Link>
    );
}

export default function AllTrails({ trails }: Props) {
    return (
        <PortalLayout>
            <Head title="Todas as Trilhas - Maratonei!" />

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
                    <div className="flex items-center gap-3 mb-2">
                        <Layers size={32} className="text-yellow-400" />
                        <h1 className="text-3xl font-black text-white italic">TODAS AS TRILHAS</h1>
                    </div>
                    <p className="text-zinc-400">
                        Explore todas as {trails.length} trilhas de aprendizado disponíveis.
                    </p>
                </div>

                {/* Trails Grid */}
                {trails.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trails.map((trail) => (
                            <TrailCard key={trail.id} trail={trail} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-zinc-900 rounded-xl border border-zinc-800">
                        <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Layers size={40} className="text-zinc-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Nenhuma trilha encontrada</h3>
                        <p className="text-zinc-500">Novas trilhas serão adicionadas em breve.</p>
                    </div>
                )}
            </div>
        </PortalLayout>
    );
}
