import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Eye } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    videos_count: number;
}

interface Props {
    users: User[];
}

export default function Index({ users }: Props) {
    return (
        <AdminLayout>
            <Head title="Admin - Usuários" />

            <div className="p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black mb-2 text-white italic">USUÁRIOS</h1>
                    <p className="text-zinc-500">Visualize os usuários cadastrados na plataforma.</p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-950 text-zinc-500 text-xs uppercase font-bold">
                            <tr>
                                <th className="px-6 py-4">Usuário</th>
                                <th className="px-6 py-4">Papel</th>
                                <th className="px-6 py-4">Vídeos Assistidos</th>
                                <th className="px-6 py-4">Cadastro</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-zinc-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={`https://i.pravatar.cc/100?u=${user.id}`}
                                                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                                                alt={user.name}
                                            />
                                            <div>
                                                <span className="font-bold text-white">{user.name}</span>
                                                <p className="text-xs text-zinc-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                                user.role === 'admin'
                                                    ? 'bg-red-900/30 text-red-500 border border-red-900/50'
                                                    : 'bg-green-900/30 text-green-500 border border-green-900/50'
                                            }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-zinc-400">{user.videos_count}</td>
                                    <td className="px-6 py-4 text-zinc-400">
                                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end">
                                            <Link
                                                href={route('admin.users.show', user.id)}
                                                className="p-2 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white"
                                            >
                                                <Eye size={16} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-500">
                                        Nenhum usuário cadastrado.
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
