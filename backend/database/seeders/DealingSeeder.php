<?php

namespace Database\Seeders;

use Database\Factories\DealingFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DealingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DealingFactory::new()->count(10)->create();


    }
}
