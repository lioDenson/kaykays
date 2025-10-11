<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delivery extends Model
{
    /** @use HasFactory<\Database\Factories\DeliveryFactory> */
    use HasFactory;
    protected $fillable = [
        'date',
        'rider_id',
        'total_fee',
        'account_id',
        'description',
        'status',
    ];

    public function rider()
    {
        return $this->belongsTo(Rider::class);
    }
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function user()
    {
        return $this->hasOneThrough(
            User::class,  // final model
            Rider::class, // intermediate model
            'id',         // foreign key on riders table (local key for Rider)
            'id',         // foreign key on users table
            'rider_id',   // local key on deliveries table
            'user_id'     // local key on riders table
        );
    }

    
}
