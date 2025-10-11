<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use Illuminate\Http\Request;
use App\Models\Account;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AccountController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(Account::class, 'account');
    }

    public function index()
    {
        $accounts = Account::all();
        return Inertia::render('Account/Index', ['accounts' => $accounts]);
    }

    public function create()
    {

        return Inertia::render('Account/Create');
    }

    public function store(StoreAccountRequest $request)
    {

        $validated = $request->validated();
        Account::create($validated);

        return redirect()->route('accounts.index')->with('success', 'Account created successfully.');
    }

    public function edit(Account $account)
    {
        return Inertia::render('Account/Create', ['account' => $account]);
    }

    public function update(UpdateAccountRequest $request, Account $account)
    {
        
        $validated = $request->validated();
        $account->update($validated,);

        return redirect()->route('accounts.index')
        ->with('success', "{$validated['name']} Account updated successfully.");
    }

    public function destroy(Account $account)
    {
        $account->delete();
        return redirect()->back()
            ->with('message', "$account->name Account trashing....")
            ->with('restore', route('accounts.restore', $account))
            ->with('id', $account);
    }

    public function restore( $id)
    {
        $account = Account::withTrashed()->findOrFail($id);
        if (! $account->restore()) {
            return redirect()->back()->with('error', 'Account could not be restored.');
        }
        return redirect()->back()->with('success', "$account->name Account restored successfully.");
    }

    public function forceDelete( Account $account)
    {
        $account->forceDelete();
        return redirect()->back()->with('success', "$account ->name Account deleted permanently.");
    }
}
