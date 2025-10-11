<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\Batch;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Supplier;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
      'date',
        'expiry_date',
        'type',
        'quantity',
        'reason',
        'description',
        'user_id',
        'is_void',
        'account_id',
        'product_id',
        'account_id',
        'supplier_id',
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date' => $this->faker->date(),
            'batch_id'=> Batch::pluck('id')->random(),
            'type' => $this->faker->randomElement(['in','out']),
            'reason' => $this->faker->randomElement(['sale', 'adjustment', 'return', 'gift', 'addition']),
            'quantity' => $this->faker->numberBetween(1, 100),
            'is_void' => $this->faker->boolean(),
            'description' => $this->faker->sentence(),
            'user_id' => User::pluck('id')->random(),
        ];
    }
}
