import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputError from '@/Components/InputError';
import { FormEventHandler } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        thumbnail: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('admin.trails.store'));
    };

    return (
        <AdminLayout>
            <Head title="Admin - Nova Trilha" />

            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black mb-2 text-white italic">NOVA TRILHA</h1>
                    <p className="text-zinc-500">Preencha os dados da nova trilha.</p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 max-w-2xl">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Nome</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-zinc-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">Descrição</label>
                            <textarea
                                rows={3}
                                className="w-full bg-zinc-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none resize-none"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-zinc-500 uppercase">URL da Imagem</label>
                            <input
                                type="url"
                                className="w-full bg-zinc-800 border-none rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-600 transition-all outline-none"
                                value={data.thumbnail}
                                onChange={(e) => setData('thumbnail', e.target.value)}
                            />
                            <InputError message={errors.thumbnail} />
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Link
                                href={route('admin.trails.index')}
                                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-lg transition-colors text-center"
                            >
                                CANCELAR
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
                            >
                                {processing ? 'SALVANDO...' : 'SALVAR'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
