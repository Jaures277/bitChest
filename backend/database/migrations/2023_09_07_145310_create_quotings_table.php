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
        Schema::create('quotings', function (Blueprint $table) {
            $table->id();

            $table->float('rate');
            $table->date('date_quoting');

            $table->bigInteger('currency_id')->unsigned()->nullable();
            $table->unique(array('date_quoting','currency_id'));
            $table->foreign('currency_id')->references('id')->on('currencies')->onDelete('CASCADE');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotings');
    }
};
