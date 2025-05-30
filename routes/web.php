<?php

use App\Http\Controllers\Car\CarController;
use App\Models\Car\Car;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('auth/dashboard', [
            'cars' => Car::with('images')->where('user_id', Auth::user()->id)->get(),
        ]);
    })->name('dashboard');
});

Route::redirect('/', 'cars');
Route::resource('cars', CarController::class)->except('index', 'show')->middleware('auth');
Route::get('cars', [CarController::class, 'index'])->name('cars.index');
Route::get('cars/{car}', [CarController::class, 'show'])->name('cars.show');

Route::fallback(function () {
    return redirect()->route('cars.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
