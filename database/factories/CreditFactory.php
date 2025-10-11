<?php

namespace Database\Factories;

use App\Models\Sale;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Testing\Fakes\Fake;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Credit>
 */
class CreditFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_id' => 1,
            'sale_id' => Sale::inRandomOrder()->pluck('id')->random(),
            'balance' => $this->faker->randomFloat(2, 10, 1000),
            'user_id' => User::pluck('id')->random(),
            'date' => $this->faker->date(),
            'description' => $this->faker->sentence(),
        ];
    }
}
