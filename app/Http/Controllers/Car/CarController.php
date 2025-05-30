<?php

namespace App\Http\Controllers\Car;

use App\Http\Controllers\Controller;
use App\Models\Car\Car;
use App\Models\Car\CarName;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CarController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Car/Index', [
            'cars' => Car::with('images')->get(),
            'carName' => CarName::with('models')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Car/Create', [
            'carName' => CarName::with('models')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'color' => 'required|string|max:255',
            'year' => 'required|integer',
            'price' => 'required|numeric',
            'images.*' => 'nullable|image|max:2048',
        ]);

        $car = Car::create([
            'name' => $request->name,
            'model' => $request->model,
            'description' => $request->description,
            'color' => $request->color,
            'year' => $request->year,
            'price' => $request->price,
            'user_id' => Auth::id(),
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('Cars/Car_' . $car->id, 'public');
                $car->images()->create([
                    'name' => $image->getClientOriginalName(),
                    'path' => $path,
                ]);
            }
        }

        return to_route('cars.index');
    }


    public function show(Car $car): Response
    {
        return Inertia::render('Car/Show', [
            'car' => $car->load('images', 'user')
        ]);
    }

    public function edit(Car $car): Response
    {
        $car->load('images');
        return Inertia::render('Car/Edit', [
            'car' => $car,
            'carName' => CarName::with('models')->get(),
        ]);
    }

    public function update(Request $request, Car $car): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'color' => 'required|string|max:255',
            'year' => 'required|integer',
            'price' => 'required|numeric',
            'images.*' => 'nullable|image|max:2048',
        ]);

        $car->update([
            'name' => $request->name,
            'model' => $request->model,
            'description' => $request->description,
            'color' => $request->color,
            'year' => $request->year,
            'price' => $request->price,
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('Cars/Car_' . $car->id, 'public');
                $car->images()->create([
                    'name' => $image->getClientOriginalName(),
                    'path' => $path,
                ]);
            }
        }

        return to_route('dashboard');
    }

    public function destroy(Car $car): RedirectResponse
    {
        if (Storage::disk('public')->exists('Cars/Car_' . $car->id)) {
            Storage::disk('public')->deleteDirectory('Cars/Car_' . $car->id);
        }

        $car->images()->delete();
        $car->delete();

        return to_route('dashboard');
    }
}
