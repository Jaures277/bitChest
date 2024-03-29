<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;

    /**
     * Get the user linked to the wallet.
     */
    public function userwallet(){
        return $this->belongsTo(User::class,'user_id');
    }
}
