<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Dealing extends Model
{
    use HasFactory;

    /**
     * Get the currency linked to the transaction.
     */
    public function userDealing(){
        return $this->belongsTo(User::class,'user_id');
    }

    /**
     * Get the quoting_dealings selling or purshase.
     */
    public function quoting_dealings(){
        return $this->belongsTo(Quoting::class,'quoting_dealings_id');
    }

    public function getTransactionByState($state, $id){
        $transactions = DB::table('dealings')
            ->join('quotings', 'quotings.id','dealings.quoting_dealings_id')
            ->join('users', 'users.id', '=', 'dealings.user_id')
            ->select("dealings.*, quotings.*")
            ->where('dealings.state', '=', $state)
            ->where('users.id', '=', $id)
            ->get();

        return $transactions;
    }
}
