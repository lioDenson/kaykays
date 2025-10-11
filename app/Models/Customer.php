<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Traits\HasRoles;

class Customer extends Model
{
    /** @use HasFactory<\Database\Factories\CustomerFactory> */
    use HasFactory, SoftDeletes, HasRoles;
    protected $fillable = [
        'user_id',
        'bill_cycle',
        'estate',
        'street',
        'description',
        'house_number',
    ];

    protected $appends = ['address'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    protected function estate(): Attribute
    {
        return Attribute::make(
            set: fn($value) => strtolower($value),
            get: fn($value) => ucwords(strtolower($value)),
        );
    }

    protected function street(): Attribute
    {
        return Attribute::make(
            set: fn($value) => strtolower($value),
            get: fn($value) => ucwords(strtolower($value)),
        );
    }

    protected function address(): Attribute
    {
        return Attribute::make(

            get: fn() => " $this->street/$this->estate, House.No $this->house_number",
        );
    }
}
