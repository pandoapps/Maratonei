<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Expert;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpertController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Experts/Index', [
            'experts' => Expert::withCount('videos')->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Experts/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'image' => 'nullable|string',
            'bio' => 'nullable|string',
        ]);

        Expert::create($validated);

        return redirect()->route('admin.experts.index')
            ->with('success', 'Expert criado com sucesso!');
    }

    public function edit(Expert $expert)
    {
        return Inertia::render('Admin/Experts/Edit', [
            'expert' => $expert,
        ]);
    }

    public function update(Request $request, Expert $expert)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'image' => 'nullable|string',
            'bio' => 'nullable|string',
        ]);

        $expert->update($validated);

        return redirect()->route('admin.experts.index')
            ->with('success', 'Expert atualizado com sucesso!');
    }

    public function destroy(Expert $expert)
    {
        $expert->delete();

        return redirect()->route('admin.experts.index')
            ->with('success', 'Expert excluído com sucesso!');
    }
}
