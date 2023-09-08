<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Currency extends Model
{
    use HasFactory;

    public function quoting()
    {
        return $this->hasMany(Quoting::class, 'currency_id');
    }

    public function walletCurrencies()
    {
        return $this->hasMany(Wallet::class, 'currency_id');
    }

    public function quotation($date){
        $quotation = DB::table('quotings')->where('date_quoting', $date)->where('currency_id', $this->id)->get();
        return $quotation;
    }
}
