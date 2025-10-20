<?php

namespace App\Services;

use Exception;
use Carbon\Carbon;
use App\Models\Sale;
use App\Models\Payment;
use App\Models\SaleItem;
use Illuminate\Support\Facades\Auth;

class SaleService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function createSaleFromRequest(array $data): int
    {
        
        try {
            $delivery_fee = isset($data['deliveryFee']) ? $data['deliveryFee'] : 0;

            $data['deliveryFee'] = $delivery_fee;
            $date = Carbon::now();
            $status = $this->saleStatus($data['balance'], $data['total'] + $delivery_fee);
            $customer_id = $data['customer'];
            $delivery_id = $data['delivery_id'];
            $delivery_fee = $data['deliveryFee'];
            $total = $data['total'];
            $is_delivery = $data['isDelivery'];
            $balance = $data['balance'];
            $description = $data['description'] ?? 'Sale.';
            $created_by = Auth::id();

            $data = [
                'date' => $date,
                'status' => $status,
                'customer_id' => $customer_id,
                'delivery_id' => $delivery_id,
                'delivery_fee' => $delivery_fee,
                'total' => $total,
                'is_delivery' => $is_delivery,
                'balance' => $balance,
                'description' => $description,
                'created_by' => $created_by,
            ];


            return $sale_id = Sale::create($data)->id;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public static function saleStatus($balance, $totalExpected): string
    {
        $status = 'unknown';

        if ($balance == $totalExpected) {
            $status = 'unpaid';
        } elseif ($balance == 0) {
            $status = 'paid';
        } elseif ($balance > 0 && $balance < $totalExpected) {
            $status = 'partial';
        }
        return $status;
    }

    public static function registerSaleItems(array $items, $saleId, $accountId)
    {

        $items = self::saleItems($items);

        $final_items = collect($items)->map(
            function ($item) use ($saleId, $accountId) {
                return [
                    'sale_id' => $saleId,
                    'account_id' => $accountId,
                    'batch_id' => $item['batch_id'],
                    'quantity' => $item['quantity'],
                    'total' => $item['total'],
                    'description' => $item['description'],
                ];
            }
        );

        try{
            $final_items->map(function ($item){
                SaleItem::create($item);
            
            });
        } catch(Exception $e){
            throw new Exception($e->getMessage());
        }

        
    }

    public static function saleItems(array  $items): array
    {
        $items =  collect($items)->groupBy('id')->map(function ($group) {
            return [
                'batch_id' => $group->first()['id'],
                'total' => $group->sum('subTotal'),
                'quantity' => $group->sum('quantity'),
                'description' => 'Sale'
            ];
        })->toArray();

        return $items;
    }

    public static function registerPayment($mpesa, $cash, $saleId, $accountId, $totalPaid, $balance)
    {
        try {
            if ($mpesa > 0) {
                $balance = $balance + $totalPaid - $mpesa;

                $paymentData = [
                    'amount' => $mpesa,
                    'method' => 'mpesa',
                    'sale_id' => $saleId,
                    'account_id' => $accountId,
                    'balance' => $balance,
                    'date' => Carbon::now(),
                    'user_id' => Auth::id(),
                    'description' => 'Mpesa payment on sale',
                ];
                Payment::create($paymentData);
            }
            if ($cash > 0) {
                $balance = $balance + $totalPaid - $cash;
                $paymentData = [
                    'sale_id' => $saleId,
                    'amount' => $cash,
                    'method' => 'cash',
                    'account_id' => $accountId,
                    'balance' => $balance,
                    'date' => Carbon::now(),
                    'user_id' => Auth::id(),
                    'description' => 'Cash payment on sale.',
                ];
                Payment::create($paymentData);
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
