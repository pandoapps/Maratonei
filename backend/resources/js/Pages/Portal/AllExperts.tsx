import { Head, Link } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';
import { ArrowLeft, UserCheck, Play } from 'lucide-react';

interface Expert {
    id: number;
    name: string;
    role: string;
    image: string | null;
    bio: string | null;
    videos_count: number;
}

interface Props {
    experts: Expert[];
}

function ExpertCard({ expert }: { expert: Expert }) {
    return (
        <Link
            href={route('portal.expert', expert.id)}
            className="group relative block bg-zinc-900 rounded-xl border border-zinc-800 hover:border-yellow-400/50 transition-all overflow-hidden"
        >
            <div className="p-6 text-center">
                {/* Avatar */}
                <div className="relative mx-auto mb-4 w-24 h-24">
                    <img
                        src={expert.image || `https://i.pravatar.cc/200?u=${expert.id}`}
                        alt={expert.name}
                        className="w-full h-full rounded-full object-cover border-4 border-zinc-800 group-hover:border-yellow-400/50 transition-all"
                    />
                </div>

                {/* Info */}
                <h3 className="font-bold text-white text-lg mb-1 group-hover:text-yellow-400 transition-colors">
                    {expert.name}
                </h3>
                <p className="text-red-500 text-sm font-medium mb-2">{expert.role}</p>
                {expert.bio && (
                    <p className="text-zinc-500 text-sm line-clamp-2 mb-4">{expert.bio}</p>
                )}

                {/* Videos count */}
                <div className="flex items-center justify-center gap-2 text-zinc-400 text-sm">
                    <Play size={14} />
                    <span>{expert.videos_count} {expert.videos_count === 1 ? 'vídeo' : 'vídeos'}</span>
                </div>
            </div>
        </Link>
    );
}

export default function AllExperts({ experts }: Props) {
    return (
        <PortalLayout>
            <Head title="Todos os Experts - Maratonei!" />

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
                        <UserCheck size={32} className="text-yellow-400" />
                        <h1 className="text-3xl font-black text-white italic">TODOS OS EXPERTS</h1>
                    </div>
                    <p className="text-zinc-400">
                        Conheça todos os {experts.length} experts da plataforma.
                    </p>
                </div>

                {/* Experts Grid */}
                {experts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {experts.map((expert) => (
                            <ExpertCard key={expert.id} expert={expert} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-zinc-900 rounded-xl border border-zinc-800">
                        <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <UserCheck size={40} className="text-zinc-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Nenhum expert encontrado</h3>
                        <p className="text-zinc-500">Novos experts serão adicionados em breve.</p>
                    </div>
                )}
            </div>
        </PortalLayout>
    );
}
