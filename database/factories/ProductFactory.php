<?php

namespace Database\Factories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->word(),
            'code' => strtoupper($this->faker->unique()->bothify('??##??')),
            'price' => $this->faker->randomFloat(2, 20, 90),
            'unit' => $this->faker->randomElement(['kg', 'liters', 'pieces']),
            'description' => $this->faker->sentence(),
            'account_id' => $this->faker->randomElement(Account::pluck('id')->toArray()),
        ];
    }
}
