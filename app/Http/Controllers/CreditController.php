<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreditRequest;
use Illuminate\Http\Request;
use App\Models\Credit;
use App\Models\User;
use Inertia\Inertia;
use App\Services\CreditService;
use Exception;
use Illuminate\Support\Facades\DB;

class CreditController extends Controller
{

    public function __construct(){
        $this->authorizeResource(Credit::class, 'credit');
    }
    public function index()
    {
        $credits = Credit::with(['customer:user_id', 'customer.user:name,phone,id', 'sale:invoice_number,id,total,balance,customer_id,delivery_fee', 'sale.saleItems:id,batch_id,quantity,total,sale_id', 'sale.saleItems.product:name,price,unit'])->orderBy('date', 'desc')->paginate(10, ['status', 'balance', 'id', 'sale_id', 'due_date', 'description']);
        return Inertia::render('Transactions/Credits/Index', ['credits' => $credits]);
    }

    public function pay(CreditRequest $request)
    {


        $validated = $request->validated();
        try {
            DB::transaction(function () use ($validated) {
                CreditService::registerCreditPayment(mpesa: $validated['mpesa'], cash: $validated['cash'], saleId: $validated['sale_id'], dueBalance: $validated['due_balance']);
                CreditService::updateCredit($validated['credit_id']);
            }, 2);
            return redirect()->back()->with('success', 'Payment recorded successfully.');
        } catch (Exception $e) {
            return back()->with('error', "Failed to record the payment {$e->getMessage()}");
        }
    }
}
