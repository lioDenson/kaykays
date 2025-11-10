<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Inertia\Inertia;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\Batch;
use App\Models\Credit;
use DivisionByZeroError;
use Illuminate\Support\Number;

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
                'topDebtors' => self::getTopDebtors(),

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
        $percentageDiff = 0;

        // today = 0, yes = 0, today > yest=0, yester > today = 0;

        if ($todaySales == 0) {
            if ($yesterdaySales == 0) {
                $percentageDiff = 0;
            } else {
                $percentageDiff = -100;
            }
        } else {
            if ($yesterdaySales == 0) {
                $percentageDiff = 100;
            } else {
                $percentageDiff = $diff / $yesterdaySales * 100;
            }
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
        $topSales = Sale::with(['customer:user_id,id', 'customer.user:name,id'])->whereDate('date', '>=', $thiWeek)->orderBy('total', 'asc')->take(5)->get(['id', 'customer_id', 'total', 'date']);
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

    protected function getTopDebtors()
    {
        $top = [];
        $topDebtors = Credit::with(['sale:id,customer_id', 'sale.customer.user:id,name'])->where('status', 'pending')->get(['id', 'sale_id', 'balance', 'due_date']);

        $grouped = $topDebtors->groupBy('sale.customer_id');

        foreach ($grouped as $debtor) {
            $top[] = [
                'customer_id' => $debtor[0]->sale->customer->id,
                'name' => $debtor[0]->sale->customer->user->name,
                'balance' => $debtor->map(fn($rec) => $rec->balance)->sum(),
                'due_date' => $debtor[0]->due_date,
            ];
        }
        return $top;
    }
}
