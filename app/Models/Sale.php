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
        'paid',
        'total_cost'
    ];

    protected function paid(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->total + $this->delivery_fee - (float) $this->balance,
        );
    }

    protected function total_cost(): Attribute
    {
        return Attribute::make(
            get: fn() => (float) $this->total + (float) $this->delivery_fee,
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
        return $this->hasMany(SaleItem::class, 'sale_id', 'id',);
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
        $prefix = 'SLE';
        $year = now()->format('y'); // e.g. 25
        $month = strtoupper(now()->format('M'));
        $day = now()->format('d');

        $count = Sale::whereMonth('date', now()->month)
            ->whereYear('date', now()->year)
            ->count() + 1;

        // Format: SLE25/NOV/0002
        return sprintf('%s%s/%s%s/%03d', $prefix, $year, $month, $day, $count);
    }
}
