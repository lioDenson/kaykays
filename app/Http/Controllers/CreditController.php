<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Credit;
use App\Models\User;
use Inertia\Inertia;

class CreditController extends Controller
{
    public function index()
    {
        $credits = Credit::with(['customer:user_id', 'customer.user:name,phone,id', 'sale:invoice_number,id,total,balance,customer_id,delivery_fee', 'sale.saleItems:id,batch_id,quantity,total,sale_id', 'sale.saleItems.product:name,price,unit'])->orderBy('date', 'desc')->paginate(10, ['status', 'balance', 'id', 'sale_id', 'due_date', 'description']);
        return Inertia::render('Transactions/Credits/Index', ['credits' => $credits]);
    }

    public function pay(Credit $credit)
    {
        return Inertia::render('Transactions/Credits/Pay', ['credit' => $credit]);
    }

}
