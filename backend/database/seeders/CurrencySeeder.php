<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (config('cryptocurrencies_list') as $cuurency => $name) {
            DB::table('currencies')->insert([
                'name'      => $name,
                'image'      => 'img/' . Str::kebab($name) . '.png',
            ]);
        }
    }
}
