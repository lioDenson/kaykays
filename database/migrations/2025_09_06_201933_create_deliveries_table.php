<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('date');
            $table->foreignId('rider_id')->constrained();
            $table->integer('total_fee');
            $table->foreignId('account_id')->constrained();
            $table->string('description');
            $table->enum('status', [
                'pending',
                'in_transit',
                'delivered',
                'cancelled',
                'hold'
            ]);
            $table->softDeletes();
            $table->index(['rider_id', 'account_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliveries');
    }
};
