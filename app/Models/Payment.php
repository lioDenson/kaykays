<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    /** @use HasFactory<\Database\Factories\PaymentFactory> */
    use HasFactory;
    protected $fillable = [
        'account_id',
        'sale_id',
        'amount',
        'date',
        'balance',
        'description',
        'method',
        'user_id',
    ];
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }
    public function customer()
    {
        return $this->hasOneThrough(Customer::class, Sale::class, 'id', 'id', 'sale_id', 'customer_id');
    }

    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
