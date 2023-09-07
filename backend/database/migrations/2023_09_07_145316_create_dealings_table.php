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
        Schema::create('dealings', function (Blueprint $table) {

            $table->id();

            $table->dateTime('dealing_date')->nullable();
            $table->integer('quantity');
            $table->enum('state', ['sold', 'own'])->default('own');

            $table->bigInteger('quoting_dealings_id')->unsigned()->nullable();
            $table->foreign('quoting_dealings_id')->references('id')->on('quotings')->onDelete('CASCADE');
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('CASCADE');


            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dealings');
    }
};
