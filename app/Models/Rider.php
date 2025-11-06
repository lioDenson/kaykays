<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rider extends Model
{
    /** @use HasFactory<\Database\Factories\RiderFactory> */
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'user_id', 
        'vehicle_number',
        'status',
    ];

    protected function vehicleNumber(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => strtolower($value),
            get: fn ($value) => strtoupper(strtolower($value))
        );
    }
  
    public function deliveries()
    {
        return $this->hasMany(Delivery::class);
    }
    public function sales()
    {
        return $this->hasManyThrough(Sale::class, Delivery::class);
    }

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
