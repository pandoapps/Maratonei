<?php

namespace App\Http\Controllers\Portal;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Expert;
use App\Models\Trail;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PortalController extends Controller
{
    public function home()
    {
        $user = Auth::user();
        $ratedVideoIds = $user->videos()->wherePivotNotNull('rate')->pluck('videos.id')->toArray();

        return Inertia::render('Portal/Home', [
            'featuredVideos' => Video::with(['expert', 'categories'])
                ->inRandomOrder()
                ->take(6)
                ->get()
                ->map(fn($video) => [
                    ...$video->toArray(),
                    'is_rated' => in_array($video->id, $ratedVideoIds),
                ]),
            'recentVideos' => Video::with(['expert', 'categories'])
                ->latest()
                ->take(8)
                ->get()
                ->map(fn($video) => [
                    ...$video->toArray(),
                    'is_rated' => in_array($video->id, $ratedVideoIds),
                ]),
            'trails' => Trail::withCount('videos')->take(4)->get(),
        ]);
    }

    public function category(string $slug)
    {
        $category = Category::where('slug', $slug)->firstOrFail();
        $user = Auth::user();
        $ratedVideoIds = $user->videos()->wherePivotNotNull('rate')->pluck('videos.id')->toArray();

        return Inertia::render('Portal/Explore', [
            'title' => $category->name,
            'subtitle' => $category->description,
            'type' => 'category',
            'videos' => $category->videos()
                ->with(['expert', 'categories'])
                ->get()
                ->map(fn($video) => [
                    ...$video->toArray(),
                    'is_rated' => in_array($video->id, $ratedVideoIds),
                ]),
        ]);
    }

    public function expert(Expert $expert)
    {
        $user = Auth::user();
        $ratedVideoIds = $user->videos()->wherePivotNotNull('rate')->pluck('videos.id')->toArray();

        return Inertia::render('Portal/Explore', [
            'title' => $expert->name,
            'subtitle' => $expert->role,
            'type' => 'expert',
            'expert' => $expert,
            'videos' => $expert->videos()
                ->with(['expert', 'categories'])
                ->get()
                ->map(fn($video) => [
                    ...$video->toArray(),
                    'is_rated' => in_array($video->id, $ratedVideoIds),
                ]),
        ]);
    }

    public function trail(Trail $trail)
    {
        $user = Auth::user();
        $ratedVideoIds = $user->videos()->wherePivotNotNull('rate')->pluck('videos.id')->toArray();

        return Inertia::render('Portal/Explore', [
            'title' => $trail->name,
            'subtitle' => $trail->description,
            'type' => 'trail',
            'trail' => $trail,
            'videos' => $trail->videos()
                ->with(['expert', 'categories'])
                ->get()
                ->map(fn($video) => [
                    ...$video->toArray(),
                    'is_rated' => in_array($video->id, $ratedVideoIds),
                ]),
        ]);
    }

    public function video(Video $video)
    {
        $user = Auth::user();

        // Increment views
        $video->increment('views');

        // Get user's rating for this video
        $userVideo = $user->videos()->where('video_id', $video->id)->first();
        $userRating = $userVideo ? $userVideo->pivot->rate : null;

        // Get related videos (same categories or expert)
        $relatedVideos = Video::where('id', '!=', $video->id)
            ->where(function ($query) use ($video) {
                $query->where('expert_id', $video->expert_id)
                    ->orWhereHas('categories', function ($q) use ($video) {
                        $q->whereIn('categories.id', $video->categories->pluck('id'));
                    });
            })
            ->with(['expert', 'categories'])
            ->take(4)
            ->get();

        $ratedVideoIds = $user->videos()->wherePivotNotNull('rate')->pluck('videos.id')->toArray();

        return Inertia::render('Portal/VideoDetails', [
            'video' => [
                ...$video->load(['expert', 'trail', 'categories'])->toArray(),
                'user_rating' => $userRating,
            ],
            'relatedVideos' => $relatedVideos->map(fn($v) => [
                ...$v->toArray(),
                'is_rated' => in_array($v->id, $ratedVideoIds),
            ]),
        ]);
    }

    public function rate(Request $request, Video $video)
    {
        $validated = $request->validate([
            'rate' => 'required|integer|min:1|max:5',
        ]);

        $user = Auth::user();

        // Sync the rating (will create or update)
        $user->videos()->syncWithoutDetaching([
            $video->id => ['rate' => $validated['rate']],
        ]);

        return back()->with('success', 'Avaliação salva com sucesso!');
    }
}
