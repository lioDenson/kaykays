<?php

namespace Database\Factories;

use App\Models\Sale;
use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_id' => Account::factory(),
            'sale_id' => Sale::factory(),
            'amount' => $this->faker->randomFloat(2, 10, 1000),
            'date' => $this->faker->date(),
            'balance' => $this->faker->randomFloat(2, 0, 200),
            'description' => $this->faker->sentence(),
            'user_id' => User::pluck('id')->random(),
            'method' => $this->faker->randomElement(['cash', 'mpesa']),
        ];
    }
}
