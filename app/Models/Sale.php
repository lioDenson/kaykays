<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sale extends Model
{
    /** @use HasFactory<\Database\Factories\SaleFactory> */
    use HasFactory;
    protected $fillable = [
        'account_id',
        'invoice_number',
        'status',
        'customer_id',
        'date',
        'delivery_id',
        'total',
        'delivery_fee',
        'balance',
        'is_delivery',
        'description',
        'created_by',
    ];

    protected $appends = [
        'paid'
    ];

    protected function paid(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->total + $this->delivery_fee - $this->balance,
        );
    }
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
    public function delivery()
    {
        return $this->belongsTo(Delivery::class);
    }
    public function saleItems()
    {
        return $this->hasMany(SaleItem::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function customerUser()
    {
        return $this->customer?->user;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }




    public static function boot()
    {
        parent::boot();
        static::creating(function ($sale) {

            $sale->account_id = 1;
            $sale->invoice_number = self::generateInvoiceNumber($sale);
        });
    }

    private static function generateInvoiceNumber($sale)
    {
        $account = 1;
        $date = Carbon::parse($sale->date)->format('dmy');
        $count = Sale::count() + 1;
        $monthCount = Sale::whereMonth('date', now()->month())->whereYear('date', now()->year())->count() + 1;
        $dayCount = Sale::where('date', $sale->date)->count() + 1;

        $invoiceNumber = "SLE/$account/{$date}/$dayCount.$monthCount.$count";
        return $invoiceNumber;
    }
}
