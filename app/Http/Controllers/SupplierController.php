<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierRequest;
use Inertia\Inertia;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{

    // public function __construct()
    // {
    //     $this->authorizeResource(Supplier::class, 'supplier');
    // }

    public function index()
    {
        $supplier = Supplier::all();
        return Inertia::render('Inventory/Supplier/Index', ['suppliers' => $supplier]);
    }

    public function create()
    {
        return Inertia::render('Inventory/Supplier/Create');
    }

    public function store(SupplierRequest $request)
    {
        $validated = $request->validated();
        try {
            Supplier::create($validated);
            return to_route('suppliers.index')
                ->with('success', "Supplier {$validated->company_name} was added successfully.");
        } catch (\Exception $e) {
            return back()->with('error', "Supplier not added successfully. {$e->getMessage()}");
        }
    }

    public function edit(Supplier $supplier)
    {
        return Inertia::render('Inventory/Supplier/Create', ['supplier' => $supplier]);
    }

    public function updated(SupplierRequest $request, Supplier $supplier)
    {
        $validated = $request->validated();
        try {
            $supplier->update($validated);
            return to_route('suppliers.index')->with('success', "Supplier {$supplier->company_name} updated successfully.");
        } catch (\Exception $e) {
            return back()->with('error', "Supplier {$supplier->company_name} not updated successfully. {$e->getMessage()} ");
        }
    }

    public function destroy(Supplier $supplier)
    {
        $name = $supplier->company_name;
        try {
            $supplier->delete();
            return to_route('suppliers.index')
                ->with('message', "Trashing supplier {$name} ...")
                ->with('restore', route('suppliers.restore', $supplier->id));
        } catch (\Exception $e) {
            return back()->with('error', "Supplier {$name} not deleted successfully.");
        }
    }

    public function restore($id)
    {
        $supplier = Supplier::withTrashed()->findOrFail($id);
        try {
            $supplier->restore();
            return back()->with('success', "Supplier {$supplier->company_name} restored successfully.");
        } catch (\Exception $e) {
            return back()->with('error', "Failed to restore  {$supplier->company_name}.");
        }
    }
}
