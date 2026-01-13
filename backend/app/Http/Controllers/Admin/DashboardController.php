<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Expert;
use App\Models\Trail;
use App\Models\User;
use App\Models\Video;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users' => User::count(),
                'videos' => Video::count(),
                'experts' => Expert::count(),
                'trails' => Trail::count(),
                'categories' => Category::count(),
            ],
            'recentUsers' => User::latest()->take(5)->get(),
            'recentVideos' => Video::with('expert')->latest()->take(5)->get(),
        ]);
    }
}
