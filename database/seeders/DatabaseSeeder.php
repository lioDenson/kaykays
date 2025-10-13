<?php

namespace Database\Seeders;

use App\Models\Payment;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Validation\Rules\Exists;
use PHPUnit\Event\Code\Test;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {



        $this->call([
            RolePermissionSeeder::class,
            TestDataSeeder::class,
        ]);
    }
}
