import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Criar conta" />
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/auth-bg/1920/1080?grayscale')] bg-cover"></div>

                <div className="bg-black/90 p-8 md:p-16 rounded-lg w-full max-w-md relative z-10 border border-zinc-800 shadow-2xl">
                    <h1 className="text-4xl font-black text-white italic mb-8 text-center uppercase">
                        <span className="text-yellow-400">IH</span> maratonei
                    </h1>
                    <h2 className="text-3xl font-bold text-white mb-8">Criar conta</h2>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Seu nome"
                                required
                                className="w-full bg-zinc-800 text-white px-4 py-3 rounded border-none focus:ring-2 focus:ring-red-600 transition-all outline-none"
                                value={data.name}
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                className="w-full bg-zinc-800 text-white px-4 py-3 rounded border-none focus:ring-2 focus:ring-red-600 transition-all outline-none"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Senha"
                                required
                                className="w-full bg-zinc-800 text-white px-4 py-3 rounded border-none focus:ring-2 focus:ring-red-600 transition-all outline-none"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                placeholder="Confirmar senha"
                                required
                                className="w-full bg-zinc-800 text-white px-4 py-3 rounded border-none focus:ring-2 focus:ring-red-600 transition-all outline-none"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors text-lg"
                        >
                            {processing ? 'Cadastrando...' : 'Cadastrar'}
                        </button>
                    </form>

                    <div className="mt-8 text-zinc-500 text-center">
                        <p>
                            Já tem conta?{' '}
                            <Link href={route('login')} className="text-white hover:underline font-bold">
                                Faça login.
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
