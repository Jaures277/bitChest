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
        $date = new Carbon();
        foreach ($dealings as $dealing){
            $quotinginfo = Quoting::where('date_quoting', $date->format('Y-m-d'))->first();

            $wallet = Wallet::where('user_id', $dealing->user_id)->first();
            if( ($wallet) && ($dealing->state == 'own') ){
                $Onewallet = Wallet::findOrFail($wallet->id);
                $Onewallet->quantity += $dealing->quantity;
                $Onewallet->sold += ($dealing->quantity * $quotinginfo->rate);
                $Onewallet->save();
            }elseif ( ($wallet) && ($dealing->state == 'sold') ){
                $Onewallet = Wallet::findOrFail($wallet->id);
                $Onewallet->quantity -= $dealing->quantity;
                $Onewallet->sold -= ($dealing->quantity * $quotinginfo->rate);
                $Onewallet->save();
            }elseif ( (!$wallet) && ($dealing->state == 'own') ){
                $wallet = new Wallet();
                $wallet->user_id = $dealing->user_id;
                $wallet->quantity = $dealing->quantity;
                $wallet->currency_id = $quotinginfo->currency_id;
                $wallet->sold = ($dealing->quantity * $quotinginfo->rate);
                $wallet->save();
            }
            /*elseif ( (!$wallet) && ($dealing->state == 'sold') ){

                $wallet = new Wallet();
                $wallet->user_id = $dealing->user_id;
                $wallet->quantity = $dealing->quantity;
                $wallet->currency_id = $quotinginfo->currency_id;
                $wallet->sold = $quotinginfo->rate;
                $wallet->save();
            }*/
        }
    }
}
