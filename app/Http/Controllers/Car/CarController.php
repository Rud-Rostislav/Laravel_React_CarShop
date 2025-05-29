<?php

namespace App\Http\Controllers\Car;

use App\Http\Controllers\Controller;
use App\Models\Car;
use App\Models\CarName;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CarController extends Controller
{
    public function index()
    {
        return Inertia::render('Car/Index', [
            'cars' => Car::with('images')->get(),
            'carName' => CarName::with('models')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Car/Create', [
            'carName' => CarName::with('models')->get(),
        ]);
    }

    public function store(Request $request)
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


    public function show(Car $car)
    {
        return Inertia::render('Car/Show', [
            'car' => $car->load('images', 'user')
        ]);
    }

    public function edit(Car $car)
    {
        $car->load('images');
        return Inertia::render('Car/Edit', [
            'car' => $car,
            'carName' => CarName::with('models')->get(),
        ]);
    }

    public function update(Request $request, Car $car)
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

    public function destroy(Car $car)
    {
        $folder = 'Cars/Car_' . $car->id;
        if (Storage::disk('public')->exists($folder)) {
            Storage::disk('public')->deleteDirectory($folder);
        }
        $car->images()->delete();
        $car->delete();
        return to_route('dashboard');
    }
}
