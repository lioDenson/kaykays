<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rider>
 */
class RiderFactory extends Factory
{
    /**
     * Define the model's default state.
     * 'name',
        'phone',
        'vehicle_number',
        'account_id',
        'status',
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'vehicle_number' => strtoupper($this->faker->bothify('??##??')),
            'user_id' => User::pluck('id')->unique()->random(),
            'status' => $this->faker->randomElement(['active', 'inactive', 'suspended']),  
        ];
    }
}
