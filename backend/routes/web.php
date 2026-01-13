<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ExpertController;
use App\Http\Controllers\Admin\TrailController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VideoController;
use App\Http\Controllers\Portal\PortalController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing');
})->name('landing');

Route::get('/dashboard', function () {
    return redirect()->route('portal.home');
})->middleware(['auth', 'verified'])->name('dashboard');

// Portal Routes (User)
Route::middleware(['auth', 'portal'])->prefix('portal')->name('portal.')->group(function () {
    Route::get('/', [PortalController::class, 'home'])->name('home');
    Route::get('/category/{slug}', [PortalController::class, 'category'])->name('category');
    Route::get('/expert/{expert}', [PortalController::class, 'expert'])->name('expert');
    Route::get('/trail/{trail}', [PortalController::class, 'trail'])->name('trail');
    Route::get('/video/{video}', [PortalController::class, 'video'])->name('video');
    Route::post('/video/{video}/rate', [PortalController::class, 'rate'])->name('video.rate');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('categories', CategoryController::class)->except(['show']);
    Route::resource('experts', ExpertController::class)->except(['show']);
    Route::resource('trails', TrailController::class)->except(['show']);
    Route::resource('videos', VideoController::class)->except(['show']);

    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/{user}', [UserController::class, 'show'])->name('users.show');
});

require __DIR__.'/auth.php';
