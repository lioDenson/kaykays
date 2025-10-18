<?php

namespace App\Http\Controllers;

use Log;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Customer;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\CustomerRequest;

class CustomerController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Customer::class, 'customer');
    }

    public function index()
    {
        $customers = Customer::with(['user'])->paginate(10);
        
        return Inertia::render('People/Customers/Index', ['customers' => $customers]);
    }

    public function create()
    {
        $customersIds = Customer::select('id')->pluck('id');
        
        return Inertia::render('People/Customers/Create', ['customersIds' => $customersIds]);
    }

    public function store(CustomerRequest $request)
    {
        $validated = $request->validated();

        try {
            $user = User::findOrFail($validated['user_id']);

            DB::transaction(function () use ($validated, $user) {
                Customer::create([
                    'user_id' => $user->id,
                    'bill_cycle' => $validated['bill_cycle'],
                    'street' => $validated['street'],
                    'estate' => $validated['estate'],
                    'house_number' => $validated['house_number'],
                    'description' => $validated['description'],
                ]);
            }, 2);

            return to_route('customers.index')->with('success', "$user->name created successfully.");
        } catch (\Exception $e) {
            return to_route('customers.index')->with('error', 'Customer not created. Something went wrong' . $e->getMessage());
        }
    }


    public function edit(Customer $customer)
    {
        $customer->load('user');
        return Inertia::render('People/Customers/Create', ['customer' => $customer]);
    }

    public function update(CustomerRequest $request, Customer $customer)
    {
        $validated = $request->validated();

        try {
            $user = User::findOrFail($validated['user_id']);

            DB::transaction(function () use ($validated, $user, $customer) {
                // update user
                $user->name = $validated['name'];
                $user->phone = $validated['phone'];
                $user->update();

                // update customer
                $customer->bill_cycle = $validated['bill_cycle'];
                $customer->street = $validated['street'];
                $customer->estate = $validated['estate'];
                $customer->house_number = $validated['house_number'];
                $customer->description = $validated['description'];
                $customer->update();
            }, 2);

            return to_route('customers.index')->with('success', "$user->name updated successfully.");
        } catch (\Exception $e) {
            return to_route('customers.index')->with('error', 'Customer not updated. Something went wrong'.$e->getMessage());
        }
    }

    public function destroy(Customer $customer)
    {

        // $customer = Customer::findOrFail($id);
        $name = $customer->user->name;
        try {
            $customer->delete();
            return to_route('customers.index')
                ->with('message', "trashing Customer $name ...")
                ->with('restore', route('customers.restore', $customer->id));
        } catch (\Exception $e) {
            return back()->with('error', 'Customer not deleted. Something went wrong');
        }
    }

    public function restore($id)
    {
        $customer = Customer::withTrashed()->findOrFail($id);
        $name = $customer->user->name;
        try {
            $customer->restore();
            return to_route('customers.index')
                ->with('success', " Customer $name restored successfully.");
        } catch (\Exception $e) {
            return back()->with('error', 'Customer not restored. Something went wrong');
        }
    }

    public function forceDelete($id)
    {
        $customer = Customer::withTrashed()->findOrFail($id);
        $name = $customer->user->name;
        try {
            $customer->forceDelete();
            return to_route('customers.index')
                ->with('success', " Customer $name deleted permanently.");
        } catch (\Exception $e) {
            return back()->with('error', 'Customer not deleted. Something went wrong');
        }
    }
}
