import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Users, Video, UserCheck, Layers, FolderOpen, Plus } from 'lucide-react';

interface Stats {
    users: number;
    videos: number;
    experts: number;
    trails: number;
    categories: number;
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface VideoItem {
    id: number;
    title: string;
    thumbnail: string;
    views: number;
    expert?: {
        name: string;
    };
}

interface Props {
    stats: Stats;
    recentUsers: User[];
    recentVideos: VideoItem[];
}

export default function Dashboard({ stats, recentUsers, recentVideos }: Props) {
    return (
        <AdminLayout>
            <Head title="Admin - Dashboard" />

            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black mb-2 text-white italic">
                            PAINEL ADMINISTRATIVO
                        </h1>
                        <p className="text-zinc-500">
                            Gerencie a plataforma e acompanhe o engajamento.
                        </p>
                    </div>
                    <Link
                        href={route('admin.videos.create')}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded flex items-center gap-2 font-bold transition-all shadow-lg hover:shadow-red-600/20"
                    >
                        <Plus size={20} /> ADICIONAR VÍDEO
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
                    <StatCard
                        icon={<Users className="text-blue-500" />}
                        label="Usuários"
                        value={stats.users}
                    />
                    <StatCard
                        icon={<Video className="text-red-500" />}
                        label="Vídeos"
                        value={stats.videos}
                    />
                    <StatCard
                        icon={<UserCheck className="text-green-500" />}
                        label="Experts"
                        value={stats.experts}
                    />
                    <StatCard
                        icon={<Layers className="text-purple-500" />}
                        label="Trilhas"
                        value={stats.trails}
                    />
                    <StatCard
                        icon={<FolderOpen className="text-yellow-500" />}
                        label="Categorias"
                        value={stats.categories}
                    />
                </div>

                {/* Recent Data */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Users */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">Usuários Recentes</h2>
                            <Link
                                href={route('admin.users.index')}
                                className="text-sm text-red-500 hover:text-red-400"
                            >
                                Ver todos
                            </Link>
                        </div>
                        <div className="divide-y divide-zinc-800">
                            {recentUsers.map((user) => (
                                <div key={user.id} className="p-4 flex items-center gap-3 hover:bg-zinc-800/50">
                                    <img
                                        src={`https://i.pravatar.cc/100?u=${user.id}`}
                                        className="w-10 h-10 rounded-full border border-zinc-700"
                                        alt={user.name}
                                    />
                                    <div className="flex-1">
                                        <p className="font-bold text-sm text-white">{user.name}</p>
                                        <p className="text-xs text-zinc-500">{user.email}</p>
                                    </div>
                                    <span
                                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                            user.role === 'admin'
                                                ? 'bg-red-900/30 text-red-500 border border-red-900/50'
                                                : 'bg-green-900/30 text-green-500 border border-green-900/50'
                                        }`}
                                    >
                                        {user.role}
                                    </span>
                                </div>
                            ))}
                            {recentUsers.length === 0 && (
                                <div className="p-8 text-center text-zinc-500">
                                    Nenhum usuário cadastrado.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Videos */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">Vídeos Recentes</h2>
                            <Link
                                href={route('admin.videos.index')}
                                className="text-sm text-red-500 hover:text-red-400"
                            >
                                Ver todos
                            </Link>
                        </div>
                        <div className="divide-y divide-zinc-800">
                            {recentVideos.map((video) => (
                                <div key={video.id} className="p-4 flex items-center gap-3 hover:bg-zinc-800/50">
                                    <img
                                        src={video.thumbnail || 'https://via.placeholder.com/120x68'}
                                        className="w-20 aspect-video rounded object-cover border border-zinc-700"
                                        alt={video.title}
                                    />
                                    <div className="flex-1">
                                        <p className="font-bold text-sm text-white line-clamp-1">
                                            {video.title}
                                        </p>
                                        <p className="text-xs text-zinc-500">
                                            {video.expert?.name || 'Sem expert'}
                                        </p>
                                    </div>
                                    <span className="text-xs text-zinc-400">
                                        {video.views.toLocaleString()} views
                                    </span>
                                </div>
                            ))}
                            {recentVideos.length === 0 && (
                                <div className="p-8 text-center text-zinc-500">
                                    Nenhum vídeo cadastrado.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg group hover:border-red-600/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">
                    {label}
                </span>
                <div className="bg-zinc-950 p-2 rounded-lg border border-zinc-800 group-hover:scale-110 transition-transform">
                    {icon}
                </div>
            </div>
            <div className="text-3xl font-black text-white">{value}</div>
        </div>
    );
}
