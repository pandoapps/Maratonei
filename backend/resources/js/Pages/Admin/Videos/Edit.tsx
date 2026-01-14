import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import RichTextEditor from '@/Components/RichTextEditor';
import { FormEventHandler } from 'react';
import { Link as LinkIcon } from 'lucide-react';

interface Expert {
    id: number;
    name: string;
}

interface Trail {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
}

interface Video {
    id: number;
    title: string;
    description: string | null;
    thumbnail: string | null;
    embed_url: string;
    expert_id: number | null;
    trail_id: number | null;
    categories: Category[];
}

interface Props {
    video: Video;
    experts: Expert[];
    trails: Trail[];
    categories: Category[];
}

export default function Edit({ video, experts, trails, categories }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: video.title,
        description: video.description || '',
        thumbnail: video.thumbnail || '',
        embed_url: video.embed_url,
        expert_id: video.expert_id?.toString() || '',
        trail_id: video.trail_id?.toString() || '',
        categories: video.categories.map((c) => c.id),
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('admin.videos.update', video.id));
    };

    const toggleCategory = (id: number) => {
        if (data.categories.includes(id)) {
            setData('categories', data.categories.filter((c) => c !== id));
        } else {
            setData('categories', [...data.categories, id]);
        }
    };

    return (
        <AdminLayout>
            <Head title="Admin - Editar Vídeo" />

            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black mb-2 text-white italic">EDITAR VÍDEO</h1>
                    <p className="text-zinc-500">Atualize os dados do vídeo.</p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-2xl">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Título</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-zinc-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">URL do Vídeo (YouTube)</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input
                                    type="url"
                                    required
                                    className="w-full bg-zinc-800 border-none rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none"
                                    value={data.embed_url}
                                    onChange={(e) => setData('embed_url', e.target.value)}
                                />
                            </div>
                            <InputError message={errors.embed_url} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Descrição</label>
                            <RichTextEditor
                                value={data.description}
                                onChange={(value) => setData('description', value)}
                                placeholder="Adicione uma descrição para o vídeo..."
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">URL da Thumbnail</label>
                            <input
                                type="url"
                                className="w-full bg-zinc-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none"
                                value={data.thumbnail}
                                onChange={(e) => setData('thumbnail', e.target.value)}
                            />
                            <InputError message={errors.thumbnail} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Expert</label>
                                <select
                                    className="w-full bg-zinc-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none"
                                    value={data.expert_id}
                                    onChange={(e) => setData('expert_id', e.target.value)}
                                >
                                    <option value="">Selecione um expert</option>
                                    {experts.map((expert) => (
                                        <option key={expert.id} value={expert.id}>
                                            {expert.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.expert_id} />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase">Trilha</label>
                                <select
                                    className="w-full bg-zinc-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none"
                                    value={data.trail_id}
                                    onChange={(e) => setData('trail_id', e.target.value)}
                                >
                                    <option value="">Nenhuma trilha</option>
                                    {trails.map((trail) => (
                                        <option key={trail.id} value={trail.id}>
                                            {trail.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.trail_id} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Categorias</label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => toggleCategory(category.id)}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                            data.categories.includes(category.id)
                                                ? 'bg-red-600 text-white'
                                                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                            <InputError message={errors.categories} />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Link
                                href={route('admin.videos.index')}
                                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-colors text-center"
                            >
                                CANCELAR
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
                            >
                                {processing ? 'SALVANDO...' : 'ATUALIZAR'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
