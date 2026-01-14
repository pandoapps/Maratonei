import { Head, Link } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';
import { ArrowLeft, FolderOpen, Play } from 'lucide-react';

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

function CategoryCard({ category }: { category: Category }) {
    return (
        <Link
            href={route('portal.category', category.slug)}
            className="group relative block"
        >
            <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 group-hover:border-yellow-400/50 transition-all">
                {category.thumbnail ? (
                    <img
                        src={category.thumbnail}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                        <FolderOpen size={48} className="text-zinc-700" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                {/* Category info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-bold text-white text-lg mb-1">{category.name}</h3>
                    {category.description && (
                        <p className="text-sm text-zinc-400 line-clamp-2">{category.description}</p>
                    )}
                </div>
            </div>

            {/* Videos count */}
            <div className="flex items-center gap-2 mt-2 text-zinc-500 text-sm">
                <Play size={14} />
                <span>{category.videos_count} {category.videos_count === 1 ? 'vídeo' : 'vídeos'}</span>
            </div>
        </Link>
    );
}

export default function AllCategories({ categories }: Props) {
    return (
        <PortalLayout>
            <Head title="Todos os Assuntos - Maratonei!" />

            <div className="p-8">
                {/* Back button */}
                <Link
                    href={route('portal.home')}
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Voltar para início
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <FolderOpen size={32} className="text-yellow-400" />
                        <h1 className="text-3xl font-black text-white italic">TODOS OS ASSUNTOS</h1>
                    </div>
                    <p className="text-zinc-400">
                        Explore todos os {categories.length} assuntos disponíveis na plataforma.
                    </p>
                </div>

                {/* Categories Grid */}
                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-zinc-900 rounded-xl border border-zinc-800">
                        <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FolderOpen size={40} className="text-zinc-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Nenhum assunto encontrado</h3>
                        <p className="text-zinc-500">Novos assuntos serão adicionados em breve.</p>
                    </div>
                )}
            </div>
        </PortalLayout>
    );
}
