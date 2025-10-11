<?php

namespace App\Http\Controllers;

use App\Http\Requests\BatchRequest;
use App\Models\Batch;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpParser\Node\Expr\Throw_;

class BatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stock = Batch::with(['product:id,name,price,unit', 'supplier:name'])->where('balance', '>', 0)->get();
        return Inertia::render('Inventory/Stock/Index', ['stocks' => $stock]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $suppliers = Supplier::get(['id', 'name']);
        $products = Product::get(['id', 'name','unit']);

        return Inertia::render('Inventory/Stock/Create', ['suppliers' => $suppliers, 'products' => $products]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BatchRequest $request)
    {
        try {
            $validated = $request->validated();
            Batch::create($validated);
            return to_route('batches.index')->with('success', 'Stock Added Successfully');
        } catch (\Exception $e) {
            return to_route('batches.index')->with('error', "Error! Failed to add the Stock {$e->getMessage()} ");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Batch $batch)
    {
        $batch->load(['product:name,price,unit', 'supplier:name']);
        dd($batch);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Batch $batch)
    {
        $products = Product::get(['id,name,price,unit']);
        $suppliers = Supplier::get(['id:name']);

        $batch->load(['supplier:id,name', 'products:id,name,unit,price']);

        return Inertia::render('Inventory/Stock/Create', ['stock' => $batch, 'suppliers' => $suppliers, 'products' => $products]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BatchRequest $request, Batch $batch) {

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Batch $batch)
    {
        //
    }
}
