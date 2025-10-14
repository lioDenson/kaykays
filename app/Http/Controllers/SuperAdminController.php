<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdminRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use App\Events\AppInstalled;
use App\Models\Setting;
use Illuminate\Support\Facades\DB;
use Exception;

class SuperAdminController extends Controller
{
    public function index(Request $request)
    {

        if ($request->expectsJson()) {
            return response()->json();
        }
        return Inertia::render('app/setting/super-admin');
    }


    public function create(Request $request)
    {
        // inertia render the form page
        return Inertia::render('app/setting/admin-register');
    }

    public function store(StoreAdminRequest $request)
    {

        $validated = $request->validated();

        try {
            DB::transaction(function () use ($validated) {
                $user = User::create([
                    'name' => $validated['name'],
                    'phone' => $validated['phone'],
                    'email' => $validated['email'],
                    'password' => Hash::make($validated['password']),
                ]);
                $user->assignRole('super-admin');
                $user->save();

                $app = Setting::latest()->update(['installed' => true]);

                return redirect()->route('dashboard')->with('success', 'Admin created successfully. You are now in charge of this System.');
            }, 2);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
