<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $transactions = Transaction::with(['product:id,name,price,unit'])->where('type','in')->get();
        $transactions = Transaction::with(['product:id,name,price,unit'])
            ->where('type', 'in')
            ->latest()
            ->get()
            ->map(function ($transaction) {
                $transaction->balance = Transaction::batchBalance(
                    $transaction->product_id,
                    $transaction->batch_number
                );
                return $transaction;
            });

        return Inertia::render('Inventory/Stock/Index', ['stocks' => $transactions]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
