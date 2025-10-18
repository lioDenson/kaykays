<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 'name',
         'company_name',
        'contact_person',
        'phone',
        'email',
        'address',
        'account_id',
     */
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('company_name')->unique();
            $table->string('contact_person');
            $table->string('phone')->unique();
            $table->string('email')->nullable()->unique();
            $table->string('address')->nullable();
            $table->string('description')->nullable();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};
