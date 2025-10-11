<?php

namespace App\Observers;

use App\Models\Batch;
use Exception;
use Carbon\Carbon;
use App\Models\SaleItem;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SaleItemObserver
{
    /**
     * Handle the SaleItem "created" event.
     */
    public function created(SaleItem $saleItem): void
    {

        // dd($saleItem->batch_id);
        $transaction = [
            'date' => Carbon::now(),
            'type' => 'out',
            'quantity' => $saleItem->quantity,
            'reason' => 'sale',
            'description' => 'cash sale',
            'user_id' => Auth::id(),
            'is_void' => false,
            'batch_id' => $saleItem->batch_id,
        ];

        DB::transaction(function () use ($transaction, $saleItem) {
            try {
                Transaction::create($transaction);
                Batch::where('id',$transaction['batch_id'])->decrement(column: 'balance', amount: $saleItem->quantity);
            } catch (Exception $e) {
                dd($e->getMessage());
                throw new Exception("{$e->getMessage()}");
            }
        }, 2);
    }

    /**
     * Handle the SaleItem "updated" event.
     */
    public function updated(SaleItem $saleItem): void
    {
        //
    }

    /**
     * Handle the SaleItem "deleted" event.
     */
    public function deleted(SaleItem $saleItem): void
    {
        //
    }

    /**
     * Handle the SaleItem "restored" event.
     */
    public function restored(SaleItem $saleItem): void
    {
        //
    }

    /**
     * Handle the SaleItem "force deleted" event.
     */
    public function forceDeleted(SaleItem $saleItem): void
    {
        //
    }
}
