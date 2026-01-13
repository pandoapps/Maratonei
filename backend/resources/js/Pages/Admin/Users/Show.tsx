import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Star } from 'lucide-react';

interface Video {
    id: number;
    title: string;
    thumbnail: string | null;
    pivot: {
        rate: number | null;
        created_at: string;
    };
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    videos: Video[];
}

interface Props {
    user: User;
}

export default function Show({ user }: Props) {
    return (
        <AdminLayout>
            <Head title={`Admin - ${user.name}`} />

            <div className="p-8">
                <Link
                    href={route('admin.users.index')}
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6"
                >
                    <ArrowLeft size={20} />
                    Voltar para usuários
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Info */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                        <div className="text-center mb-6">
                            <img
                                src={`https://i.pravatar.cc/200?u=${user.id}`}
                                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-zinc-800"
                                alt={user.name}
                            />
                            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                            <p className="text-zinc-500">{user.email}</p>
                            <span
                                className={`inline-block mt-2 text-[10px] px-3 py-1 rounded-full font-bold uppercase ${
                                    user.role === 'admin'
                                        ? 'bg-red-900/30 text-red-500 border border-red-900/50'
                                        : 'bg-green-900/30 text-green-500 border border-green-900/50'
                                }`}
                            >
                                {user.role}
                            </span>
                        </div>

                        <div className="border-t border-zinc-800 pt-4 space-y-3">
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Cadastrado em</span>
                                <span className="text-white">
                                    {new Date(user.created_at).toLocaleDateString('pt-BR')}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">Vídeos assistidos</span>
                                <span className="text-white">{user.videos.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Watch History */}
                    <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-zinc-800">
                            <h2 className="text-lg font-bold text-white">Histórico de Vídeos</h2>
                            <p className="text-sm text-zinc-500">Vídeos assistidos e avaliações</p>
                        </div>

                        <div className="divide-y divide-zinc-800 max-h-[600px] overflow-auto">
                            {user.videos.map((video) => (
                                <div key={video.id} className="p-4 flex items-center gap-4 hover:bg-zinc-800/50">
                                    <img
                                        src={video.thumbnail || 'https://via.placeholder.com/120x68'}
                                        className="w-24 aspect-video rounded object-cover border border-zinc-700"
                                        alt={video.title}
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-bold text-white line-clamp-1">{video.title}</h3>
                                        <p className="text-xs text-zinc-500">
                                            Assistido em{' '}
                                            {new Date(video.pivot.created_at).toLocaleDateString('pt-BR')}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {video.pivot.rate ? (
                                            <>
                                                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                                <span className="text-white font-bold">{video.pivot.rate}</span>
                                            </>
                                        ) : (
                                            <span className="text-zinc-600 text-sm">Sem avaliação</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {user.videos.length === 0 && (
                                <div className="p-12 text-center text-zinc-500">
                                    Este usuário ainda não assistiu nenhum vídeo.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
