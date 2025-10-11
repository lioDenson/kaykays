<?php

namespace App\Http\Controllers;

use App\Services\CreditService;
use id;
use Exception;
use Carbon\Carbon;
use App\Models\Sale;
use Inertia\Inertia;
use App\Models\Batch;
use App\Models\Rider;
use App\Models\Payment;
use App\Models\Customer;
use App\Models\Delivery;
use App\Models\SaleItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreSaleRequest;
use App\Services\DeliveryService;
use App\Services\SaleService;


class SaleController extends Controller
{
    public function index()
    {
        $sales = Sale::with(['items:id,batch_id,quantity,total', 'customer:id,user_id', 'customer.user:id,name'])->orderBy('date', 'desc')->paginate(10, ['invoice_number', 'status', 'customer_id', 'date', 'total', 'is_delivery']);
        return Inertia::render('Transactions/Sales/Index', ['sales' => $sales]);
    }

    public function create()
    {
        $products = Batch::with(['product:id,name,unit,price'])
            ->whereHas('product')
            ->where('balance', '>', 0)
            ->get()
            ->map(function ($batch) {

                return [
                    'id' => $batch->id,
                    'name' => $batch->product->name . ':' . $batch->batch_number . ' (' . $batch->balance . ' ' . $batch->product->unit . ' available)',
                    'display_name' => $batch->product->name,
                    'price' => $batch->product->price,
                    'unit' => $batch->product->unit,
                ];
            });


        $customers = Customer::with(['user:id,name,phone'])->get(['id', 'house_number', 'estate', 'street', 'bill_cycle', 'user_id']);
        $deliveries = Delivery::with(['rider.user:name,id'])->where('status', 'canceled')->get(['id', 'status', 'rider_id', 'description']);

        $riders = Rider::with(['user:id,name'])
            ->whereDoesntHave('deliveries', function ($query) {
                $query->where('status', 'pending');
            })
            ->get(['id', 'user_id']);
        return Inertia::render('Transactions/Sales/Create', ['customers' => $customers, 'products' => $products, 'deliveries' => $deliveries, 'riders' => $riders]);
    }

    public function store(StoreSaleRequest $request)
    {
        $validated = $request->validated();
        $hasDelivery = $validated['isDelivery'];
        if ($hasDelivery) {
            $validated['delivery_id'] = DeliveryService::getDeliveryId(
                $validated['delivery_id'],
                $validated['rider_id'],
                $validated['deliveryData']['description'],
                $validated['deliveryFee'],
            );
        }
        $balance = $validated['balance'];
        $totalPaid = $validated['totalPaid'];

        try {
            DB::transaction(function () use ($balance, $totalPaid, $validated) {
                // [ ]: remember to add appropriate account it;
                $sale = new SaleService;
                $saleId = $sale->createSaleFromRequest($validated);
                $accountId = 1;
                SaleService::registerSaleItems($validated['products'], $saleId, $accountId);
                SaleService::registerPayment(
                    $validated['mpesa'],
                    $validated['cash'],
                    $saleId,
                    $accountId,
                    $totalPaid,
                    $balance
                );
                $balance > 0 && CreditService::registerCredit(['sale_id' => $saleId, 'balance' => $balance]);
                
            }, 2);
            return to_route('sales.create')->with('success', 'Sale Recorded successfully.');
        } catch (Exception $e) {
            return back()->with('error', "'Failed to record the sale. Error' {$e->getMessage()}");
        }
    }
}
