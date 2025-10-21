<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SaleItem extends Model
{
    /** @use HasFactory<\Database\Factories\SaleItemFactory> */
    use HasFactory;
    protected $fillable = [
        'account_id',
        'sale_id',
        'batch_id',
        'transaction_id',
        'quantity',
        'total',
        'description',
    ];
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
    public function sale()
    {
        return $this->belongsTo(Sale::class,'sale_id', 'id');
    }
    public function batch()
    {
        return $this->belongsTo(Batch::class);
    }

    public function product(){
        return $this->hasOneThrough(Product::class, Batch::class, 'id', 'id', 'batch_id', 'product_id');
    }
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
    
    // public function product(){
    //     return $this->batch->product;
    // }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($item) {
            $batchBalance = Batch::where('id', $item->batch_id)->value('balance');

            if ($batchBalance - $item->quantity < 0) {
                throw new \Exception('No enough stock for this product');
            }
        });

        
    }
}
