<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\Account;
use App\Models\User;
use App\Models\Supplier;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BatchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'quantity_received' => $this->faker->numberBetween(1, 100),
            'balance' => $this->faker->numberBetween(1, 100),
            'date' => $this->faker->date(),
            'product_id' => Product::pluck('id')->random(),
            'account_id' => Account::pluck('id')->random(),
            'supplier_id' => Supplier::pluck('id')->random(),
            'expiry_date' => $this->faker->date(),

        ];
    }
}
