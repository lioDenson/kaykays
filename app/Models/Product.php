<?php

namespace App\Models;

use App\HandlesUniqueRestore;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory, SoftDeletes, HandlesUniqueRestore;

    protected $fillable = [
        'name',
        'code',
        'price',
        'unit',
        'description',
        'account_id',

    ];

    protected array $uniqueRestoreAttributes = [
        'code',
        'name',
    ];

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    // accessor
    protected function name(): Attribute
    {
        return Attribute::make(
            set: fn($value) => strtolower($value),
            get: fn($value) => ucwords(strtolower($value)),
        );
    }
    protected function unit(): Attribute
    {
        return Attribute::make(
            set: fn($value) => strtolower($value),
            get: fn($value) => ucfirst(strtolower($value)),
        );
    }
}
