<?php

namespace App\Models;

use Carbon\Traits\LocalFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class Batch extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'batch_number',
        'quantity_received',
        'balance',
        'date',
        'product_id',
        'account_id',
        'user_id',
        'supplier_id',
        'expiry_date',
    ];

    protected $casts = [
        'date' => 'date',
        'expiry_date' => 'date',
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
        return $this->belongsTo(Product::class,'product_id');
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($batch) {
            $batch->account_id = 1;
            $batch->user_id = 1;
            $batch->batch_number = self::getBatchNumber($batch);
            $batch->balance += $batch->quantity_received;
           
        });
    }

    private static function getBatchNumber(Batch $batch): string
    {
        $productName = $batch->product->name ?? 'UNKNOWN'; 
        $nameInit = strtoupper(substr(preg_replace('/\s+/', '', $productName), 0, 3));

        $date = $batch->date
            ? Carbon::parse($batch->date)->format('m.d')
            : now()->format('m.d');

        // Count existing batches for same account, product, and date
        $count = Batch::where('account_id', $batch->account_id)
            ->where('product_id', $batch->product_id)
            ->where('date', $batch->date ?? today()) // safer date check
            ->count() + 1;

        $count = str_pad($count, 3, '0', STR_PAD_LEFT);

        return "{$nameInit}:{$date}/{$count}";
    }


    public function reduce(float $quantity){
        $this->balance -=  $quantity;
        if($this->save()){
            return true;
        }else{
            return false;
        }
    }
}
