<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    /** @use HasFactory<\Database\Factories\TransactionFactory> */
    use HasFactory;
    protected $fillable = [
        'date',
        'type',
        'quantity',
        'reason',
        'description',
        'user_id',
        'is_void',
        'batch_id'
    ];

    protected $casts = [
        'date' => 'date',
        'is_void' => 'boolean',
    ];



    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeValid($query)
    {
        return $query->where('is_void', false);
    }

    public static function batchBalance($productId, $batchNumber){
        return self::valid()
            ->where('product_id', $productId)
            ->where('batch_number', $batchNumber)
            ->selectRaw("
                SUM(CASE WHEN type='in' THEN quantity ELSE 0 END) -
                SUM(CASE WHEN type='out' THEN quantity ELSE 0 END) as balance")
            ->value('balance') ?? 0;
    }



    

}
