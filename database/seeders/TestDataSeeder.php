<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Account;
use Illuminate\Database\Seeder;
use Database\Seeders\SaleSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\BatchSeeder;
use Database\Seeders\RiderSeeder;
use Database\Seeders\CreditSeeder;
use Database\Seeders\AccountSeeder;
use Database\Seeders\PaymentSeeder;
use Database\Seeders\ProductSeeder;
use Database\Seeders\CustomerSeeder;
use Database\Seeders\DeliverySeeder;
use Database\Seeders\SaleItemSeeder;
use Database\Seeders\ScheduleSeeder;
use Database\Seeders\SupplierSeeder;
use Database\Seeders\TransactionSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create initial user




        // $this->call([
        //     AccountSeeder::class,
        //     UserSeeder::class,
        //     SupplierSeeder::class,
        //     ProductSeeder::class,
        //     BatchSeeder::class,
        //     TransactionSeeder::class,
        //     CustomerSeeder::class,
        //     RiderSeeder::class,
        //     DeliverySeeder::class,
        //     SaleSeeder::class,
        //     PaymentSeeder::class,
        //     CreditSeeder::class,
        //     SaleItemSeeder::class,
        //     ScheduleSeeder::class,
        // ]);

        $superAdmin = User::factory()->create([
            'name' => 'super admin',
            'email' => 'superadmin@test.com',
            'phone' => '0712345675',
            'password' => bcrypt('superadmin')
        ]);

        $superAdmin->assignRole('super-admin');

        $admin = User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@test.com',
            'phone' => '0712345678',
            'password' => bcrypt('admin')
        ]);

        $admin->assignRole('admin');

        $cashier = User::factory()->create([
            'name' => 'cashier',
            'email' => 'cashier@test.com',
            'phone' => '0712345671',
            'password' => bcrypt('cashier'),
            'account_id' => Account::pluck('id')->random(),
        ]);

        $cashier->assignRole('cashier');
    }
}
