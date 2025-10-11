<?php

namespace Database\Seeders;

use App\Models\Batch;
use App\Models\Sale;
use App\Models\Delivery;
use App\Models\SaleItem;
use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class SaleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sale::factory(10)->create()->each(function ($sale) {
            // Attach random deliveries to the sale
            // $deliveries = Delivery::inRandomOrder()->take(rand(1, 3))->pluck('id');
            // $sale->delivery()->attach($deliveries);

            // Create sale items for the sale
            $itemsCount = rand(1, 3);
            for ($i = 0; $i < $itemsCount; $i++) {
                $stock = Transaction::inRandomOrder()->first();
                $batch = Batch::inRandomOrder()->first();
                if ($stock) {
                    SaleItem::factory()->create([
                        'sale_id' => $sale->id,
                        'batch_id' => $batch->id,
                        'transaction_id' => $stock->id,
                        'account_id' => $sale->account_id,
                        'quantity' => rand(0, 1),
                        'total' => rand(10, 200),
                    ]);
                }
            }
        });
    }
}
