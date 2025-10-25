<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Inertia\Inertia;
use App\Models\Delivery;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;

class DeliveryController extends Controller
{
    public function index()
    {
        // $details = Sale::with(['saleItems:id,quantity', 'saleItems.product:id,name,unit'])->get();
        // dd($details);

        $deliveries = Delivery::with('user:name,phone', 'sales.saleItems:id,batch_id,quantity,total,sale_id', 'sales.saleItems.product:name,price,unit', 'sales.customer:id,user_id,house_number,estate,street', 'sales.customer.user:id,name')->select('id', 'status', 'description', 'date', 'rider_id', 'total_fee')->paginate(10);

        return Inertia::render('Delivery/Index', ['deliveries' => $deliveries]);
    }

    public function details()
    {
        $details = Delivery::with(['sails:id', 'customer'])->get();
    }

    public function status($id, Request $request)
    {
        try {
            $status = $request->input('status');
            $delivery = Delivery::findOrFail($id);
            $delivery->status = $status;
            $delivery->save();

            return response()->json([
                'status' => $delivery->status,
                'message' => 'Status updated successfully.'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update delivery status.',
            ], 500);
        }
    }
}
