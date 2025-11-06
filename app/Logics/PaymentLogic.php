<?php

namespace App\Logics;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\Payment;
use Exception;

enum PaymentMethod: string
{
    case CASH = 'cash';
    case MPESA = 'mpesa';
}
class PaymentLogic
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * @param 'cash | mpesa' $method,
     */


    public static function register(PaymentMethod $method, $amount, $saleId, $balance, $description  = null)
    {
       
        try {
            $accountId = session('account_id');
            $paymentData = [
                'amount' => $amount,
                'method' => $method,
                'sale_id' => $saleId,
                'account_id' => $accountId,
                'balance' => $balance,
                'date' => Carbon::now(),
                'user_id' => Auth::id(),
                'description' => $description,
            ];
            Payment::create($paymentData);
            
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
