<?php

namespace Database\Seeders;

use App\Models\Currency;
use App\Models\Dealing;
use App\Models\Quoting;
use App\Models\Wallet;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WalletSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dealings = Dealing::all();
        foreach ($dealings as $dealing){

            $wallet = Wallet::where('user_id', $dealing->user_id)->first();
            if($wallet){
                $Onewallet = Wallet::findOrFail($wallet->id);
                $Onewallet->quantity += $dealing->quantity;
                $Onewallet->sold += $wallet->sold;
                $Onewallet->save();
            }elseif(!$wallet){
                $wallet = new Wallet();
                $wallet->user_id = $dealing->user_id;
                $wallet->quantity = fake()->numberBetween($min = 1, $max = 100);
                $wallet->sold = fake()->numberBetween($min = 200, $max = 500);
                $wallet->save();
            }


        }
    }
}
