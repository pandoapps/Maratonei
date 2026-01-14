import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

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

export default function Index({ experts }: Props) {
    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'Excluir expert?',
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
                router.delete(route('admin.experts.destroy', id));
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Admin - Experts" />

            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black mb-2 text-white italic">EXPERTS</h1>
                        <p className="text-zinc-500">Gerencie os experts da plataforma.</p>
                    </div>
                    <Link
                        href={route('admin.experts.create')}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded flex items-center gap-2 font-bold transition-all"
                    >
                        <Plus size={20} /> NOVO EXPERT
                    </Link>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-950 text-zinc-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Expert</th>
                                <th className="px-6 py-4">Área</th>
                                <th className="px-6 py-4">Vídeos</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {experts.map((expert) => (
                                <tr key={expert.id} className="hover:bg-zinc-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={expert.image || `https://i.pravatar.cc/100?u=${expert.id}`}
                                                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                                                alt={expert.name}
                                            />
                                            <div>
                                                <span className="font-bold text-white">{expert.name}</span>
                                                {expert.bio && (
                                                    <p className="text-xs text-zinc-500 line-clamp-1">{expert.bio}</p>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">{expert.role}</td>
                                    <td className="px-6 py-4 text-zinc-400">{expert.videos_count}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={route('admin.experts.edit', expert.id)}
                                                className="p-2 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white"
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(expert.id)}
                                                className="p-2 hover:bg-red-600/20 rounded text-zinc-400 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {experts.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                                        Nenhum expert cadastrado.
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
