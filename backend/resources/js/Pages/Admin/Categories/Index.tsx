import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    thumbnail: string | null;
    videos_count: number;
}

interface Props {
    categories: Category[];
}

export default function Index({ categories }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Tem certeza que deseja excluir esta categoria?')) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Admin - Categorias" />

            <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black mb-2 text-white italic">CATEGORIAS</h1>
                        <p className="text-zinc-500">Gerencie as categorias de vídeos.</p>
                    </div>
                    <Link
                        href={route('admin.categories.create')}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded flex items-center gap-2 font-bold transition-all"
                    >
                        <Plus size={20} /> NOVA CATEGORIA
                    </Link>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-950 text-zinc-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Nome</th>
                                <th className="px-6 py-4">Slug</th>
                                <th className="px-6 py-4">Vídeos</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-zinc-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {category.thumbnail && (
                                                <img
                                                    src={category.thumbnail}
                                                    className="w-10 h-10 rounded object-cover border border-zinc-700"
                                                    alt={category.name}
                                                />
                                            )}
                                            <span className="font-bold text-white">{category.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">{category.slug}</td>
                                    <td className="px-6 py-4 text-zinc-400">{category.videos_count}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={route('admin.categories.edit', category.id)}
                                                className="p-2 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white"
                                            >
                                                <Pencil size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(category.id)}
                                                className="p-2 hover:bg-red-600/20 rounded text-zinc-400 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                                        Nenhuma categoria cadastrada.
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
