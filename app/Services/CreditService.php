<?php

namespace App\Services;

use Exception;
use App\Models\Sale;
use App\Services\CustomerService;
use App\Models\Credit;
use App\Models\Payment;
use App\Logics\PaymentLogic;
use App\Logics\PaymentMethod;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class CreditService
{
    /**
     * Create a new class instance.
     */
    public function __construct() {}

    public static function registerCredit(array $data)
    {

        try {
            $customer = Sale::findOrFail($data['sale_id'])->customer;

            $due_date = CustomerService::getCustomerDueDate($customer->bill_cycle);
            dd($due_date);

            $data['date'] = Carbon::now();
            $data['account_id'] = 1;
            $data['user_id'] = Auth::id();
            $data['description'] = 'Credit sale';
            $data['$due_date'] =


                // $customer = Sale::findOrFail($data['sale_id'])->customer;


                Credit::create($data);
        } catch (Exception $e) {
            throw new   Exception($e->getMessage());
        }
    }

    public static function registerCreditPayment($mpesa, $cash, $saleId, $dueBalance)
    {
        try {
            $payment = new PaymentLogic();
            DB::transaction(function () use ($mpesa, $cash, $saleId, $dueBalance, $payment) {

                if ($mpesa > 0) {
                    $dueBalance -= $mpesa;
                    $payment->register(PaymentMethod::MPESA, $mpesa, $saleId, $dueBalance, description: 'Credit payment by mpesa.');
                }
                if ($cash > 0) {
                    $dueBalance -= $cash;
                    $payment->register(PaymentMethod::CASH, $cash, $saleId, $dueBalance, description: 'Credit payment by cash.');
                }

                $sale = Sale::findOrFail($saleId);
                $status = $sale->status;
                $totalCost = $sale->total_cost;

                if ($dueBalance == 0) {
                    $status = 'paid';
                } elseif ($dueBalance > 0 && $dueBalance < $totalCost) {
                    $status = 'partial';
                } elseif ($dueBalance  == $totalCost) {
                    $status = 'unpaid';
                } else {
                    $status = 'unknown';
                }

                $sale->update(['status' => $status, 'balance' => $dueBalance]);
            }, 2);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public static function  updateCredit($id)
    {
        DB::transaction(function () use ($id) {
            try {

                $credit =  Credit::with(['sale:id,balance'])->findOrFail($id);
                $balance = $credit->sale->balance;

                $status =  $balance == 0 ? 'paid' : 'pending';
                $credit->update(['status' => $status, 'balance' => $balance]);

                $balance == 0 && $credit->delete();
                return true;
            } catch (Exception $e) {

                throw new Exception($e->getMessage());
            }
        }, 2);
    }
}
