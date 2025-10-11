<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Delivery;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DeliveryController extends Controller
{
    public function index()
    {
        $deliveries = Delivery::with('user:name,phone')->select('status', 'description', 'date', 'rider_id', 'total_fee')->paginate(10);

        return Inertia::render('Delivery/Index', ['deliveries' => $deliveries]);
    }
}
