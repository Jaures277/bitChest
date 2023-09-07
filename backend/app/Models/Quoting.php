<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quoting extends Model
{
    use HasFactory;

    /**
     * Get the currency linked to the quoting.
     */
    public function currency(){
        return $this->belongsTo(Currency::class,'currency_id');
    }

    public function quotings()
    {
        return $this->hasMany(Dealing::class, 'quoting_dealings_id');
    }

}
