<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Account extends Model
{
    /** @use HasFactory<\Database\Factories\AccountFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $fillable = [
        'name',
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
    public function users()
    {
        return $this->belongsToMany(User::class, 'account_users');
    }
    //crate relationship for product Model
    public function products()
    {
        return $this->hasMany(Product::class);
    }
    // relationship for stock Model
   
    // relationship for supplier Model
    public function suppliers()
    {
        return $this->hasMany(Supplier::class);
    }
    // relationship for customer Model
    public function customers()
    {
        return $this->hasMany(Customer::class);
    }
    // relationship for riders Model
    public function riders()
    {
        return $this->hasMany(Rider::class);
    }
    // relationship for delivery Model
    public function deliveries()
    {
        return $this->hasMany(Delivery::class);
    }
    // relationship for payment Model
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    // relationship for sale Model
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
    // relationship for credit Model
    public function credits()
    {
        return $this->hasMany(Credit::class);
    }
    // relationship for  saleItems Model
    public function saleItems()
    {
        return $this->hasMany(SaleItem::class);
    }
    // relationship for schedule Model
    public function schedules()
    {
        return $this->hasMany(Schedule::class);
    }

    public static function boot(){
        parent::boot();
        // static::created(function ($account){
        //     $admins = User::role(['admin', 'super-admin'])->pluck('id');
        //     $account->users()->syncWithoutDetaching($admins);
        // });
    }
}
