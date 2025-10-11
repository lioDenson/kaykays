<?php

namespace Database\Factories;

use App\Models\Account;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     * '
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::pluck('id')->random(),
            'bill_cycle' => $this->faker->randomElement(['monthly', 'weekly', 'daily']),
            'estate' => $this->faker->word(),
            'street' => $this->faker->streetName(),
            'description' => $this->faker->sentence(),
            'house_number' => $this->faker->buildingNumber(),
        ];
    }
}
