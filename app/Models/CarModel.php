<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarModel extends Model
{
    protected $fillable = [
        'name',
        'car_name_id',
    ];

    public function name()
    {
        return $this->belongsTo(CarName::class);
    }
}
