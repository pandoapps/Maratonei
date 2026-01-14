import { Head, Link, router } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';
import {
    ArrowLeft,
    Star,
    Share2,
    Play,
    CheckCircle,
    Eye,
    Facebook,
    Twitter,
    Linkedin,
    Copy,
    Check,
} from 'lucide-react';
import { useState } from 'react';

interface Expert {
    id: number;
    name: string;
    role: string;
    image: string;
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
    views: number;
    expert: Expert | null;
    trail: Trail | null;
    categories: Category[];
    user_rating: number | null;
}

interface RelatedVideo {
    id: number;
    title: string;
    thumbnail: string | null;
    expert: Expert | null;
    categories: Category[];
    is_rated: boolean;
}

interface Props {
    video: Video;
    relatedVideos: RelatedVideo[];
}

function StarRating({
    rating,
    onRate,
    interactive = true,
}: {
    rating: number | null;
    onRate?: (rating: number) => void;
    interactive?: boolean;
}) {
    const [hoverRating, setHoverRating] = useState<number | null>(null);
    const displayRating = hoverRating ?? rating ?? 0;

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    disabled={!interactive}
                    onClick={() => interactive && onRate?.(star)}
                    onMouseEnter={() => interactive && setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className={`transition-transform ${
                        interactive ? 'hover:scale-110 cursor-pointer' : 'cursor-default'
                    }`}
                >
                    <Star
                        size={28}
                        className={`transition-colors ${
                            star <= displayRating
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-zinc-600'
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}

function ShareModal({
    isOpen,
    onClose,
    videoTitle,
    videoUrl,
}: {
    isOpen: boolean;
    onClose: () => void;
    videoTitle: string;
    videoUrl: string;
}) {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const shareText = `Confira "${videoTitle}" no Maratonei!`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(videoUrl);

    const shareLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            color: 'hover:bg-blue-600',
        },
        {
            name: 'Twitter',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
            color: 'hover:bg-sky-500',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            color: 'hover:bg-blue-700',
        },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(videoUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = videoUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold text-white mb-4">Compartilhar</h3>

                <div className="flex justify-center gap-4 mb-6">
                    {shareLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-14 h-14 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 ${link.color} hover:text-white transition-all`}
                            >
                                <Icon size={24} />
                            </a>
                        );
                    })}
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        readOnly
                        value={videoUrl}
                        className="flex-1 bg-zinc-800 border-none rounded-lg px-4 py-3 text-white text-sm"
                    />
                    <button
                        onClick={copyToClipboard}
                        className={`px-4 rounded-lg font-bold transition-all ${
                            copied
                                ? 'bg-green-600 text-white'
                                : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                    >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-4 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg font-bold transition-colors"
                >
                    FECHAR
                </button>
            </div>
        </div>
    );
}

function RelatedVideoCard({ video }: { video: RelatedVideo }) {
    return (
        <Link
            href={route('portal.video', video.id)}
            className="group flex gap-3"
        >
            <div className="relative w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 border border-zinc-800 group-hover:border-red-600/50 transition-all">
                <img
                    src={video.thumbnail || 'https://via.placeholder.com/160x90'}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {video.is_rated && (
                    <div className="absolute top-1 right-1 bg-green-600 rounded-full p-0.5">
                        <CheckCircle size={12} className="text-white" />
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white text-sm line-clamp-2 group-hover:text-red-500 transition-colors">
                    {video.title}
                </h4>
                {video.expert && (
                    <p className="text-xs text-zinc-500 mt-1">{video.expert.name}</p>
                )}
            </div>
        </Link>
    );
}

export default function VideoDetails({ video, relatedVideos }: Props) {
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [isRating, setIsRating] = useState(false);

    const handleRate = (rate: number) => {
        setIsRating(true);
        router.post(route('portal.video.rate', video.id), { rate }, {
            preserveScroll: true,
            onFinish: () => setIsRating(false),
        });
    };

    const videoUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <PortalLayout>
            <Head title={`${video.title} - Maratonei!`} />

            <div className="p-8">
                {/* Back button */}
                <Link
                    href={route('portal.home')}
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Voltar
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Video Player */}
                        <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 mb-6">
                            <iframe
                                src={video.embed_url}
                                title={video.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>

                        {/* Video Info */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                            <h1 className="text-2xl font-bold text-white mb-4">{video.title}</h1>

                            {/* Meta info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-6">
                                <div className="flex items-center gap-1">
                                    <Eye size={16} />
                                    <span>{video.views.toLocaleString()} visualizações</span>
                                </div>
                                {video.expert && (
                                    <Link
                                        href={route('portal.expert', video.expert.id)}
                                        className="flex items-center gap-2 hover:text-red-500 transition-colors"
                                    >
                                        <img
                                            src={video.expert.image || `https://i.pravatar.cc/40?u=${video.expert.id}`}
                                            alt={video.expert.name}
                                            className="w-6 h-6 rounded-full"
                                        />
                                        <span>{video.expert.name}</span>
                                    </Link>
                                )}
                                {video.trail && (
                                    <Link
                                        href={route('portal.trail', video.trail.id)}
                                        className="text-purple-400 hover:text-purple-300 transition-colors"
                                    >
                                        {video.trail.name}
                                    </Link>
                                )}
                            </div>

                            {/* Categories */}
                            {video.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {video.categories.map((cat) => (
                                        <span
                                            key={cat.id}
                                            className="text-xs px-3 py-1 bg-zinc-800 rounded-full text-zinc-400"
                                        >
                                            {cat.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Description */}
                            {video.description && (
                                <div className="border-t border-zinc-800 pt-6">
                                    <h3 className="text-sm font-bold text-zinc-500 uppercase mb-2">Descrição</h3>
                                    <div
                                        className="text-zinc-300 prose prose-invert prose-sm max-w-none prose-a:text-red-500 prose-a:hover:text-red-400"
                                        dangerouslySetInnerHTML={{ __html: video.description }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Rating Section */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Avalie este vídeo</h3>
                            <div className="flex items-center gap-4">
                                <StarRating
                                    rating={video.user_rating}
                                    onRate={handleRate}
                                    interactive={!isRating}
                                />
                                {video.user_rating && (
                                    <span className="text-green-500 flex items-center gap-1 text-sm">
                                        <CheckCircle size={16} />
                                        Avaliado
                                    </span>
                                )}
                            </div>
                            {isRating && (
                                <p className="text-sm text-zinc-500 mt-2">Salvando...</p>
                            )}
                        </div>

                        {/* Share Section */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Compartilhar</h3>
                            <button
                                onClick={() => setShareModalOpen(true)}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
                            >
                                <Share2 size={20} />
                                COMPARTILHAR
                            </button>
                        </div>

                        {/* Related Videos */}
                        {relatedVideos.length > 0 && (
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4">Vídeos Relacionados</h3>
                                <div className="space-y-4">
                                    {relatedVideos.map((relatedVideo) => (
                                        <RelatedVideoCard key={relatedVideo.id} video={relatedVideo} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Share Modal */}
            <ShareModal
                isOpen={shareModalOpen}
                onClose={() => setShareModalOpen(false)}
                videoTitle={video.title}
                videoUrl={videoUrl}
            />
        </PortalLayout>
    );
}
