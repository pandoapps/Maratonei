import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Entrar" />
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/auth-bg/1920/1080?grayscale')] bg-cover"></div>

                <div className="bg-black/90 p-8 md:p-16 rounded-lg w-full max-w-md relative z-10 border border-zinc-800 shadow-2xl">
                    <h1 className="text-4xl font-black text-white italic mb-8 text-center uppercase">
                        <span className="text-yellow-400">IH</span> maratonei
                    </h1>
                    <h2 className="text-3xl font-bold text-white mb-8">Entrar</h2>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-500 bg-green-500/10 p-3 rounded">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
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
                                autoFocus
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
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-zinc-600 bg-zinc-800 text-red-600 focus:ring-red-600"
                                />
                                <span className="ms-2 text-sm text-zinc-400">Lembrar-me</span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                                >
                                    Esqueceu a senha?
                                </Link>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-colors text-lg"
                        >
                            {processing ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>

                    <div className="mt-8 text-zinc-500 text-center">
                        <p>
                            Novo por aqui?{' '}
                            <Link href={route('register')} className="text-white hover:underline font-bold">
                                Assine agora.
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 p-4 bg-zinc-900 rounded text-xs text-zinc-400">
                        Dica: Use <strong>admin@admin.com</strong> / <strong>123456</strong> para acessar o painel administrativo.
                    </div>
                </div>
            </div>
        </>
    );
}
