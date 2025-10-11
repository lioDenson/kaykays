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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('account_id')->constrained()->cascadeOnDelete();
            $table->foreignId('customer_id')->nullable()->constrained()->cascadeOnDelete();
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->foreignId('delivery_id')->nullable()->constrained()->nullOnDelete();
            $table->string('invoice_number');
            $table->enum('status',['unpaid', 'paid', 'partial', 'cancelled','unknown']);
            $table->string('date');
            $table->string('total');
            $table->float('delivery_fee')->nullable();
            $table->string('balance');
            $table->boolean('is_delivery');
            $table->string('description')->nullable();
            $table->softDeletes();
            $table->index(['customer_id', 'account_id','status','date']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
