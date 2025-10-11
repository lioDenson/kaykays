<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\Customer;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Delivery;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sale>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *'account_id',
        'status',
        'date',
        'total',
        'balance',
        'is_delivery',
        'description',
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_id' => Account::pluck('id')->random(),
            'invoice_number' => fake()->unique()->randomNumber(6),
            'status' => $this->faker->randomElement(['unpaid', 'paid', 'partial','cancelled']),
            'customer_id' => fake()->boolean() ? Customer::pluck('id')->random() : null,
            'delivery_id' => fake()->boolean() ? Delivery::pluck('id')->random() : null,
            'date' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'total' => $this->faker->randomFloat(2, 10, 1000),
            'balance' => $this->faker->randomFloat(2, 0, 500),
            'is_delivery' => $this->faker->boolean(),
            'description' => $this->faker->sentence(),
            'created_by' => User::pluck('id')->random(),
        ];
    }
}
