<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Account;
use App\Models\Setting;
use App\Events\AppInstalled;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\StoreAdminRequest;

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

                $validated['account_id'] = Account::firstOrFail()->value('id');
                $validated['password'] = Hash::make($validated['password']);
                $user = User::create($validated);
                $user->assignRole('super-admin');
                $user->save();
                Setting::latest()->update(['installed' => true]);
                Auth::login($user);
                return route('dashboard');
            }, 2);
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
