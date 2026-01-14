import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import {
    LayoutDashboard,
    Users,
    Video,
    UserCheck,
    Layers,
    FolderOpen,
    LogOut,
    ChevronRight,
} from 'lucide-react';

export default function AdminLayout({ children }: PropsWithChildren) {
    const { auth } = usePage().props as any;

    const menuItems = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: LayoutDashboard },
        { name: 'Usuários', href: route('admin.users.index'), icon: Users },
        { name: 'Vídeos', href: route('admin.videos.index'), icon: Video },
        { name: 'Experts', href: route('admin.experts.index'), icon: UserCheck },
        { name: 'Trilhas', href: route('admin.trails.index'), icon: Layers },
        { name: 'Categorias', href: route('admin.categories.index'), icon: FolderOpen },
    ];

    const isActive = (href: string) => {
        return window.location.href === href;
    };

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col">
                <div className="p-6 border-b border-zinc-800">
                    <Link href={route('landing')}>
                        <h1 className="text-2xl font-black text-white italic uppercase">
                            <span className="text-yellow-400">IH</span> maratonei
                        </h1>
                    </Link>
                    <p className="text-xs text-zinc-500 mt-1">Painel Administrativo</p>
                </div>

                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                            active
                                                ? 'bg-red-600 text-white'
                                                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                        }`}
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{item.name}</span>
                                        {active && <ChevronRight size={16} className="ml-auto" />}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={`https://i.pravatar.cc/100?u=${auth.user.id}`}
                            className="w-10 h-10 rounded-full border border-zinc-700"
                            alt={auth.user.name}
                        />
                        <div>
                            <p className="text-sm font-bold text-white">{auth.user.name}</p>
                            <p className="text-xs text-zinc-500">{auth.user.email}</p>
                        </div>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors w-full"
                    >
                        <LogOut size={18} />
                        <span className="text-sm">Sair</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
