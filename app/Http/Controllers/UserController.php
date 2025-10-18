<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Searchable\Search;

class UserController extends Controller
{

    public function __construct()
    {
        $this->authorizeResource(User::class, 'user');
    }

    /**Search user 
     * 
     */
    public function search(Request $request)
    {

        // $this->authorize('search', User::class);

        $searchTerm  = $request->input('query');

        try {
            $searchResults = (new Search())
                ->registerModel(User::class, ['name', 'email', 'phone'])
                ->search($request->input('query'));

            $user = $searchResults->map(function ($result) {
                $user = $result->searchable;
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone

                ];
            });

            return response()->json($user);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ], 500);
        }
    }
    public function userRolling()
    {
        $roles = Role::all()->map(function ($role) {
            if ($role->name == 'customer') {
                return null;
            }
        });
        return Inertia::render('People/Users/Roles', ['roles' => $roles]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index($type = null)
    {
        $rolling = false;
        if ($type) {
            $users = User::with('roles')
                ->when($type, function ($query, $type) {
                    $query->whereHas('roles', fn($q) => $q->where('name', $type));
                })
                ->paginate(10);
            $rolling = true;
        } else {
            $users = User::with('roles')->paginate(10);
        }
        return Inertia::render('People/Users/Index', ['users' => $users, 'rolling' => $rolling]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('People/Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = bcrypt('password');
        $validated['account_id'] = session('account_id');
        $user = User::create($validated);
        // $user->assignRole($validated['role_id']);
        return redirect()->route('users.index')->with('success', "$user->name created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        dd($user->load(['accounts']));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $user->load(['roles:id,name']);
        return Inertia::render('People/Users/Create', ['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        $validated = $request->validated();
        $user->update($validated);
        $user->syncRoles($validated['role_id']);
        return redirect()->route('users.index')->with('success', "$user->name updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

        $user->delete();
        return redirect()->route('users.index')
            ->with('message', "Trashing user $user->name ... ")
            ->with('restore', route('users.restore', $user->id));
    }

    public function restore(Request $request, $id)
    {
        $user = User::withTrashed()->find($id);
        if ($user->restore()) {
            return redirect()->route('users.index')->with('success', "$user->name restored successfully.");
        }
        return redirect()->route('users.index')->with('error', "Failed to restore user $user->name .");
    }

    public function  forceDelete(Request $request, User $user)
    {
        $user->forceDelete();
        return redirect()->route('users.index')->with('success', "$user->name deleted successfully.");
    }
}
