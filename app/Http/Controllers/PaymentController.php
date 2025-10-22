<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Payment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with(['sale:id,invoice_number,total,balance,status,customer_id,delivery_fee','sale.customer.user:name,phone,id'])->orderBy('date', 'desc')->paginate(10, ['id', 'method', 'amount', 'date', 'description', 'sale_id',]);
        return Inertia::render('Transactions/Payments/Index', ['payments' => $payments]);
    }

    public function create()
    {
        return Inertia::render('');
    }
}
