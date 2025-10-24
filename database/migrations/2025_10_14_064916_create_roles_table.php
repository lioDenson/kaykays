<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'manage.accounts',
            'manage.users',
            'manage.customers',
            'manage.roles',
            'manage.sales',
            'manage.stocks',
            'manage.products',
            'manage.suppliers',
            'manage.riders',
            'manage.credits',
            'manage.deliveries',
            'manage.schedules',
            'manage.settings',
            'manage.payments',
            'manage.reports',
            'make.sales',
            'view.sales',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        $superAdmin = Role::firstOrCreate(['name' => 'super-admin']);
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $cashier = Role::firstOrCreate(['name' => 'cashier']);
        $customer = Role::firstOrCreate(['name' => 'customer']);

        $superAdmin->givePermissionTo(Permission::all());

        $admin->givePermissionTo([
            'manage.customers',
            'manage.roles',
            'manage.sales',
            'manage.stocks',
            'manage.products',
            'manage.suppliers',
            'manage.riders',
            'manage.credits',
            'manage.payments',
            'manage.reports',

        ]);

        $cashier->givePermissionTo([
            'make.sales',
            'view.sales',
            'manage.stocks',
            'manage.payments',
            'manage.credits'
        ]);

        $customer->givePermissionTo([
            'view.sales',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {}
};
