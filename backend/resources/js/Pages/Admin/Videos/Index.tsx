import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

interface Video {
    id: number;
    title: string;
    thumbnail: string | null;
    views: number;
    expert?: {
        name: string;
    };
    trail?: {
        name: string;
    };
    categories: {
        id: number;
        name: string;
    }[];
}

interface Props {
    videos: Video[];
}

export default function Index({ videos }: Props) {
    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Excluir vídeo?',
            text: 'Esta ação não pode ser desfeita.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#3f3f46',
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar',
            background: '#18181b',
            color: '#fff',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.videos.destroy', id));
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Admin - Vídeos" />

            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black mb-2 text-white italic">VÍDEOS</h1>
                        <p className="text-zinc-500">Gerencie os vídeos da plataforma.</p>
                    </div>
                    <Link
                        href={route('admin.videos.create')}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded flex items-center gap-2 font-bold transition-all"
                    >
                        <Plus size={20} /> NOVO VÍDEO
                    </Link>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-950 text-zinc-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Vídeo</th>
                                <th className="px-6 py-4">Expert</th>
                                <th className="px-6 py-4">Categorias</th>
                                <th className="px-6 py-4">Views</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {videos.map((video) => (
                                <tr key={video.id} className="hover:bg-zinc-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={video.thumbnail || 'https://via.placeholder.com/120x68'}
                                                className="w-20 aspect-video rounded object-cover border border-zinc-700"
                                                alt={video.title}
                                            />
                                            <div>
                                                <span className="font-bold text-white line-clamp-1">{video.title}</span>
                                                {video.trail && (
                                                    <p className="text-xs text-purple-400">{video.trail.name}</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">{video.expert?.name || '-'}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {video.categories.map((cat) => (
                                                <span
                                                    key={cat.id}
                                                    className="text-[10px] px-2 py-0.5 bg-zinc-800 rounded text-zinc-400"
                                                >
                                                    {cat.name}
                                                </span>
                                            ))}
                                            {video.categories.length === 0 && (
                                                <span className="text-zinc-600">-</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">{video.views.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={route('admin.videos.edit', video.id)}
                                                className="p-2 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white"
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(video.id)}
                                                className="p-2 hover:bg-red-600/20 rounded text-zinc-400 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {videos.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                        Nenhum vídeo cadastrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
