import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import {
    FolderOpen,
    UserCheck,
    Layers,
    LogOut,
    Settings,
} from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Expert {
    id: number;
    name: string;
}

interface Trail {
    id: number;
    name: string;
}

interface SidebarData {
    categories: Category[];
    experts: Expert[];
    trails: Trail[];
    totalCategories: number;
    totalExperts: number;
    totalTrails: number;
}

export default function PortalLayout({ children }: PropsWithChildren) {
    const props = usePage().props as unknown as {
        auth: {
            user: {
                id: number;
                name: string;
                email: string;
                role: string;
            };
        };
        sidebar: SidebarData;
    };
    const { auth, sidebar } = props;

    const isActive = (pattern: string) => {
        return window.location.pathname.includes(pattern);
    };

    // Sort items alphabetically
    const sortedCategories = [...(sidebar?.categories || [])].sort((a, b) => a.name.localeCompare(b.name));
    const sortedExperts = [...(sidebar?.experts || [])].sort((a, b) => a.name.localeCompare(b.name));
    const sortedTrails = [...(sidebar?.trails || [])].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="min-h-screen bg-black flex">
            {/* Sidebar */}
            <aside className="w-72 bg-zinc-950 border-r border-zinc-800 flex flex-col fixed h-full">
                <div className="p-6 border-b border-zinc-800">
                    <Link href={route('portal.home')}>
                        <h1 className="text-2xl font-black text-white italic uppercase hover:opacity-80 transition-opacity">
                            <span className="text-yellow-400">IH</span> maratonei
                        </h1>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {/* Categories Section */}
                    <div className="p-4 border-b border-zinc-800">
                        <h3 className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase mb-3 px-4">
                            <FolderOpen size={14} />
                            Assuntos
                        </h3>
                        <ul className="space-y-1">
                            {sortedCategories.map((category) => (
                                <li key={category.id}>
                                    <Link
                                        href={route('portal.category', category.slug)}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                                            isActive(`/portal/category/${category.slug}`)
                                                ? 'bg-red-600/20 text-red-500'
                                                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                        }`}
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                            {sidebar?.totalCategories > 5 && (
                                <li>
                                    <Link
                                        href={route('portal.categories')}
                                        className="flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm text-yellow-400 hover:bg-zinc-900 hover:text-yellow-300 font-medium"
                                    >
                                        Conheça outros assuntos
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Experts Section */}
                    <div className="p-4 border-b border-zinc-800">
                        <h3 className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase mb-3 px-4">
                            <UserCheck size={14} />
                            Experts
                        </h3>
                        <ul className="space-y-1">
                            {sortedExperts.map((expert) => (
                                <li key={expert.id}>
                                    <Link
                                        href={route('portal.expert', expert.id)}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                                            isActive(`/portal/expert/${expert.id}`)
                                                ? 'bg-red-600/20 text-red-500'
                                                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                        }`}
                                    >
                                        {expert.name}
                                    </Link>
                                </li>
                            ))}
                            {sidebar?.totalExperts > 5 && (
                                <li>
                                    <Link
                                        href={route('portal.experts')}
                                        className="flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm text-yellow-400 hover:bg-zinc-900 hover:text-yellow-300 font-medium"
                                    >
                                        Conheça outros experts
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Trails Section */}
                    <div className="p-4">
                        <h3 className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase mb-3 px-4">
                            <Layers size={14} />
                            Trilhas
                        </h3>
                        <ul className="space-y-1">
                            {sortedTrails.map((trail) => (
                                <li key={trail.id}>
                                    <Link
                                        href={route('portal.trail', trail.id)}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                                            isActive(`/portal/trail/${trail.id}`)
                                                ? 'bg-red-600/20 text-red-500'
                                                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                        }`}
                                    >
                                        {trail.name}
                                    </Link>
                                </li>
                            ))}
                            {sidebar?.totalTrails > 5 && (
                                <li>
                                    <Link
                                        href={route('portal.trails')}
                                        className="flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm text-yellow-400 hover:bg-zinc-900 hover:text-yellow-300 font-medium"
                                    >
                                        Conheça outras trilhas
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* User Section */}
                <div className="p-4 border-t border-zinc-800">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={`https://i.pravatar.cc/100?u=${auth.user.id}`}
                            className="w-10 h-10 rounded-full border border-zinc-700"
                            alt={auth.user.name}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">{auth.user.name}</p>
                            <p className="text-xs text-zinc-500 truncate">{auth.user.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {auth.user.role === 'admin' && (
                            <Link
                                href={route('admin.dashboard')}
                                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors flex-1 text-sm"
                            >
                                <Settings size={16} />
                                <span>Admin</span>
                            </Link>
                        )}
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors text-sm"
                        >
                            <LogOut size={16} />
                            <span>Sair</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 overflow-auto">
                {children}
            </main>
        </div>
    );
}
