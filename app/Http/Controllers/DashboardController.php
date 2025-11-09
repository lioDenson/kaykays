<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\Batch;
use DivisionByZeroError;

class DashboardController extends Controller
{
    public function  index()
    {
        $today = Carbon::today();



        $stockCount = Batch::count();
        $customerCount = Customer::count();
        $discoveredCustomers = User::where('created_at', '>', $today)->count();
        $recentSales = Sale::latest()->take(4)->get(['id', 'invoice_number', 'total', 'delivery_fee', 'date']);
        self::getSaleDifference();
        return Inertia::render(
            'Dashboard/dashboard',
            [
                'recentSales' => $recentSales,
                'stockCount' => $stockCount,
                'customerCount' => $customerCount,
                'discoveredCustomers' => $discoveredCustomers,
                'lowStock' => self::getLowStock(),
                'saleStatistics' => self::getSaleDifference(),
                'topSales' => self::getTopSales(),

            ],
        );
    }


    protected function getLowStock()
    {
        $stocks = Batch::get(['id', 'quantity_received', 'balance']);
        $lowStock = [];
        foreach ($stocks as $stock) {
            $percentage = $stock->balance * 100 / $stock->quantity_received;
            $percentage = number_format($percentage, 0);
            if ($percentage < 15) {
                $lowStock[] = $stock;
            }
        }
        return $lowStock;
    }

    protected function  getSaleDifference()
    {
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();

        $todaySales = Sale::whereDate('date', $today)->sum('total');
        $yesterdaySales = Sale::whereDate('date', $yesterday)->sum('total');

        $diff = $todaySales - $yesterdaySales;
        try {
            $percentageDiff = ($diff / $yesterdaySales) * 100;
            $percentageDiff = number_format($percentageDiff, 0);
        } catch (DivisionByZeroError $e) {
            $percentageDiff = 0;
        }

        return [
            'salesValue' => $todaySales,
            'diff' => $diff,
            'percentageDiff' => $percentageDiff,
        ];
    }

    protected function getTopSales()
    {
        $thiWeek = Carbon::now()->startOfWeek();
        $topSales = Sale::with(['customer:user_id', 'customer.user:name'])->whereDate('date', '>=', $thiWeek)->orderBy('total', 'asc')->take(5)->get(['id', 'customer_id', 'total', 'date']);

        $top = [];
        foreach ($topSales as $sale) {
            $top[] = [
                'id' => $sale->id,
                'customer' => $sale->customer?->user->name ?? 'Walk In Customer',
                'total' => $sale->total,
                'date' => $sale->date
            ];
        }

        return $top;
    }
}
