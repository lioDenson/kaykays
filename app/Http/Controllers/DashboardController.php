<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    public function  index()
    {
        $today = Carbon::today();
        $customerCount = Customer::count();
        $discoveredCustomers = User::where('created_at', '>' , $today)->count();
        $recentSales = Sale::latest()->take(4)->get(['id', 'invoice_number', 'total', 'delivery_fee', 'date']);
        return Inertia::render('Dashboard/dashboard', ['recentSales' => $recentSales, 'customerCount' => $customerCount, 'discoveredCustomers' => $discoveredCustomers]);
    }
}
