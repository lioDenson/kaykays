<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Rider;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\RiderRequest;
use App\Http\Requests\UpdateRiderRequest;

class RiderController extends Controller
{
    public function index()
    {
        $riders = Rider::with('user')->paginate(10);
        return Inertia::render('People/Riders/Index', ['riders' => $riders]);
    }

    public function create()
    {
        return Inertia::render('People/Riders/Create');
    }

    public function store(RiderRequest $request)
    {
        $validated = $request->validated();
        if (Rider::create($validated)) {
            return redirect()->route('riders.index')->with('success', 'Rider created successfully.');
        }
    }

    public function edit(Rider $rider)
    {
        $rider->load('user');

        return Inertia::render('People/Riders/Create', ['rider' => $rider]);
    }

    public function update(UpdateRiderRequest $request, Rider $rider)
    {

        $validated = $request->validated();


        try {
            DB::transaction(function () use ($validated, $rider) {
                $rider->update([
                    'vehicle_number' => $validated['vehicle_number']
                ]);
                Arr::forget($validated, ['vehicle_number', 'user_id', 'email']);
                $rider->user->update($validated);
            }, 2);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

        return redirect()->route('riders.index')->with('success', 'Rider updated successfully.');
    }

    public function destroy(Rider $rider)
    {
        $name = $rider->user->name;
        $rider->delete();
        return redirect()->route('riders.index')
            ->with('message', "Trashing rider $name ... ")
            ->with('restore', route('riders.restore', $rider->id));
    }


    public function forceDelete($id)
    {
        $rider = Rider::onlyTrashed()->findOrFail($id);
        if (! $rider) {
            return redirect()->back()->with('error', 'Rider could not be found.');
        }
        $rider->forceDelete();
        return redirect()->route('riders.index')->with('success', 'Rider deleted successfully.');
    }

    public function restore($id)
    {
        $rider = Rider::onlyTrashed()->findOrFail($id);
        if (! $rider) {
            return redirect()->back()->with('error', 'Rider could not be found.');
        }
        if ($rider->restore()) {
            return redirect()->route('riders.index')->with('success', 'Rider restored successfully.');
        }
        return redirect()->route('riders.index')->with('error', 'Failed to restore rider.');
    }
}
