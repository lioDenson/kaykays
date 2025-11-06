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

        $latestPayments = Payment::select('id')
            ->whereIn('id', function ($q) {
                $q->selectRaw('MAX(id)')
                    ->from('payments')
                    ->groupBy('sale_id');
            });

        $payments = Payment::with([
            'sale:id,invoice_number,total,balance,status,customer_id,delivery_fee',
            'sale.customer.user:id,name,phone'
        ])
            ->joinSub($latestPayments, 'latest', 'latest.id', '=', 'payments.id')
            ->orderBy('date', 'desc')
            ->paginate(10, [
                'payments.id',
                'method',
                'amount',
                'date',
                'payments.balance',
                'description',
                'sale_id',
            ]);


        return Inertia::render('Transactions/Payments/Index', ['payments' => $payments]);
    }

    public function create()
    {
        return Inertia::render('');
    }
}
