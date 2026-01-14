<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Expert;
use App\Models\Trail;
use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VideoController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Videos/Index', [
            'videos' => Video::with(['expert', 'trail', 'categories'])->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Videos/Create', [
            'experts' => Expert::all(),
            'trails' => Trail::all(),
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'embed_url' => 'required|url',
            'expert_id' => 'nullable|exists:experts,id',
            'trail_id' => 'nullable|exists:trails,id',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id',
        ]);

        $video = Video::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'thumbnail' => $validated['thumbnail'] ?? null,
            'embed_url' => $validated['embed_url'],
            'expert_id' => $validated['expert_id'] ?? null,
            'trail_id' => $validated['trail_id'] ?? null,
            'views' => 0,
        ]);

        if (!empty($validated['categories'])) {
            $video->categories()->sync($validated['categories']);
        }

        return redirect()->route('admin.videos.index')
            ->with('success', 'Vídeo criado com sucesso!');
    }

    public function edit(Video $video)
    {
        return Inertia::render('Admin/Videos/Edit', [
            'video' => $video->load('categories'),
            'experts' => Expert::all(),
            'trails' => Trail::all(),
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Video $video)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
            'embed_url' => 'required|url',
            'expert_id' => 'nullable|exists:experts,id',
            'trail_id' => 'nullable|exists:trails,id',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id',
        ]);

        $video->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'thumbnail' => $validated['thumbnail'] ?? null,
            'embed_url' => $validated['embed_url'],
            'expert_id' => $validated['expert_id'] ?? null,
            'trail_id' => $validated['trail_id'] ?? null,
        ]);

        $video->categories()->sync($validated['categories'] ?? []);

        return redirect()->route('admin.videos.index')
            ->with('success', 'Vídeo atualizado com sucesso!');
    }

    public function destroy(Video $video)
    {
        $video->categories()->detach();
        $video->delete();

        return redirect()->route('admin.videos.index')
            ->with('success', 'Vídeo excluído com sucesso!');
    }
}
