<?php

namespace Database\Factories;

use App\Models\Rider;
use App\Models\Account;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Delivery>
 */
class DeliveryFactory extends Factory
{
    /**
     * Define the model's default state.
     *'product_id',
        'date',
        'rider_id',
        'total',
        'account_id',
        'description',
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date' => $this->faker->date(),
            'rider_id' => Rider::pluck('id')->random(),
            // todo: remember to change col to charges
            'total_fee' => $this->faker->randomFloat(2, 10, 300), 
            'account_id' => Account::pluck('id')->random(),
            'description' => $this->faker->sentence(),
            'status' => $this->faker->randomElement(['pending', 'in_transit', 'delivered', 'canceled']),
        ];
    }
}
