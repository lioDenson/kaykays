<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Credit extends Model
{
    /** @use HasFactory<\Database\Factories\CreditFactory> */
    use HasFactory;

    protected $fillable = [
        'account_id',
        'status',
        'due_date',
        'sale_id',
        'date',
        'balance',
        'description',
        'user_id'
    ];

    public function customer()
    {
        return $this->hasOneThrough(Customer::class, Sale::class, 'id', 'id', 'sale_id', 'customer_id');
    }

    public function sale (){
        return $this->belongsTo(Sale::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
}
