<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\Expert;
use App\Models\Trail;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class SharePortalData
{
    public function handle(Request $request, Closure $next): Response
    {
        Inertia::share('sidebar', [
            'categories' => Category::inRandomOrder()->take(5)->get(['id', 'name', 'slug']),
            'experts' => Expert::inRandomOrder()->take(5)->get(['id', 'name']),
            'trails' => Trail::inRandomOrder()->take(5)->get(['id', 'name']),
        ]);

        return $next($request);
    }
}
