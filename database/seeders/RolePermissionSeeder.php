<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
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

            'make.sales',
            'view.sales',

        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // crate role
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin']);
        $admin = Role::firstOrCreate(['name' => 'admin']);
        
        $cashier = Role::firstOrCreate(['name' => 'cashier']);
        $customer = Role::firstOrCreate(['name' => 'customer']);

        // give permissions
        $superAdmin->givePermissionTo(Permission::all());
        $admin->givePermissionTo([
            'manage.customers',
            'manage.roles',
            'manage.sales',
            'manage.stocks',
            'manage.products',
            'manage.suppliers',
            'manage.riders',
        ]);

        $cashier->givePermissionTo([
            'make.sales',
            'view.sales',
            'manage.stocks',
        ]);

        $customer->givePermissionTo([
            'view.sales',
        ]);
    }
}
