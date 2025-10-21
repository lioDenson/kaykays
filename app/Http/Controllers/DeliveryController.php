<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Inertia\Inertia;
use App\Models\Delivery;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DeliveryController extends Controller
{
    public function index()
    {
        // $details = Sale::with(['saleItems:id,quantity', 'saleItems.product:id,name,unit'])->get();
        // dd($details);

        $deliveries = Delivery::with('user:name,phone')->select('id','status', 'description', 'date', 'rider_id', 'total_fee')->paginate(10);

        return Inertia::render('Delivery/Index', ['deliveries' => $deliveries]);
    }

    public function details (){
        $details = Delivery::with(['sails:id', 'customer'])->get();
    }
}
