<?php

namespace App\Models\Car;

use Illuminate\Database\Eloquent\Model;

class CarName extends Model
{
    protected $fillable = [
        'name',
    ];

    public function models()
    {
        return $this->hasMany(CarModel::class);
    }
}
