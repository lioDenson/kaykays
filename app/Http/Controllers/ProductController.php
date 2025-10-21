<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Product::class, 'product');
    }

    public function index(Request $request)
    {
        $products = Product::paginate(10, ['id', 'name', 'price', 'unit', 'code']);
        return Inertia::render('Inventory/Product/Index', ['products' => $products]);
    }

    public function create()
    {
        return Inertia::render('Inventory/Product/Create');
    }

    public function store(ProductRequest $request)
    {
        $validated = $request->validated();
        try {
            Product::create($validated);
            return redirect()->back()->with('success', "Product added successfully.");
        } catch (\Exception $e) {
            return back()->with('error', "Product not created.}");
        }
    }

    public function edit(Product $product)
    {
        return Inertia::render('Inventory/Product/Create', ['product' => $product]);
    }

    public function update(Product $product, ProductRequest $request)
    {
        $product->update($request->validated());
        return redirect()->route('products.index')->with('success', "{$product['name']} updated successfully.");
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index')
            ->with('message', "{$product['name']} deleted successfully.")
            ->with('restore', route('products.restore', $product));
    }

    public function restore($id)
    {
        $product = Product::withTrashed()->findOrFail($id);
        if (! $product->restore()) {
            return redirect()->back()->with('error', "{$product['name']} could not be restored.");
        }
        return redirect()->route('products.index')->with('success', "{$product['name']} Product restored successfully.");
    }
}
