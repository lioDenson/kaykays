<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->date('date');
            $table->enum('type', ['in', 'out']);
            $table->float('quantity');
            $table->enum('reason', ['sale', 'adjustment', 'return', 'gift', 'addition']);
            $table->boolean('is_void')->default(false);
            $table->string('description');
            $table->foreignId(column: 'batch_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
