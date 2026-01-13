<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Trail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrailController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Trails/Index', [
            'trails' => Trail::withCount('videos')->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Trails/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
        ]);

        Trail::create($validated);

        return redirect()->route('admin.trails.index')
            ->with('success', 'Trilha criada com sucesso!');
    }

    public function edit(Trail $trail)
    {
        return Inertia::render('Admin/Trails/Edit', [
            'trail' => $trail,
        ]);
    }

    public function update(Request $request, Trail $trail)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|string',
        ]);

        $trail->update($validated);

        return redirect()->route('admin.trails.index')
            ->with('success', 'Trilha atualizada com sucesso!');
    }

    public function destroy(Trail $trail)
    {
        $trail->delete();

        return redirect()->route('admin.trails.index')
            ->with('success', 'Trilha excluída com sucesso!');
    }
}
