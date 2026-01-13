import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Pencil, Trash2 } from 'lucide-react';

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

export default function Index({ trails }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir esta trilha?')) {
            router.delete(route('admin.trails.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Admin - Trilhas" />

            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black mb-2 text-white italic">TRILHAS</h1>
                        <p className="text-zinc-500">Gerencie as trilhas de aprendizado.</p>
                    </div>
                    <Link
                        href={route('admin.trails.create')}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded flex items-center gap-2 font-bold transition-all"
                    >
                        <Plus size={20} /> NOVA TRILHA
                    </Link>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-950 text-zinc-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Trilha</th>
                                <th className="px-6 py-4">Descrição</th>
                                <th className="px-6 py-4">Vídeos</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {trails.map((trail) => (
                                <tr key={trail.id} className="hover:bg-zinc-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {trail.thumbnail && (
                                                <img
                                                    src={trail.thumbnail}
                                                    className="w-12 aspect-video rounded object-cover border border-zinc-700"
                                                    alt={trail.name}
                                                />
                                            )}
                                            <span className="font-bold text-white">{trail.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400 max-w-xs">
                                        <span className="line-clamp-2">{trail.description || '-'}</span>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">{trail.videos_count}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={route('admin.trails.edit', trail.id)}
                                                className="p-2 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white"
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(trail.id)}
                                                className="p-2 hover:bg-red-600/20 rounded text-zinc-400 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {trails.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                                        Nenhuma trilha cadastrada.
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
