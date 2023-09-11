<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function dealing()
    {
        return $this->hasMany(Dealing::class, 'user_id');
    }

    public function wallet()
    {
        return $this->hasMany(Wallet::class, 'user_id');
    }

    public function getWallet($id){
        $out = [];

        $currencies = DB::table('transactions')
            ->join('quotations', 'quotations.id', '=', 'transactions.quotation_id')
            ->join('currencies', 'currencies.id', '=', 'transactions.currency_id')
            ->join('users', 'users.id', '=', 'transactions.user_id')
            ->select('currencies.id as id','currencies.name as name', 'currencies.symbol as symbol', 'transactions.quantity as quantity', 'quotations.rate as price')
            ->where('users.id', '=', $id)
            ->where('transactions.state', '=', 'own')
            ->get();
        $date = new Carbon();
        $currencies = $currencies->all();
        for ($i=0; $i < count($currencies) ; $i++) {
            $currency = Currency::find($currencies[$i]->id);
            $quotationToday = $currency->quotation($date->format('Y-m-d'));
            $quotationToday = $quotationToday->all();
            $currencies[$i]->price = $quotationToday[0]->rate * $currencies[$i]->quantity;
            for($j = 0; $j < count($currencies); $j++){
                if($i == $j){
                    continue;
                }

                if($currencies[$i]->id === $currencies[$j]->id){
                    $currencies[$i]->quantity = $currencies[$i]->quantity + $currencies[$j]->quantity;
                    array_splice($currencies, $j, 1);
                }
            }
        }


        $totalSold = DB::table('transactions')
            ->join('quotations', 'quotations.id', '=', 'transactions.quotation_id')
            ->join('users', 'users.id', '=', 'transactions.user_id')
            ->select(DB::raw('sum(quotations.rate * transactions.quantity) as total'))
            ->where('users.id', '=', $id)
            ->where('transactions.state', '=', "sold")
            ->get();

        $totalOwn = DB::table('transactions')
            ->join('quotations', 'quotations.id', '=', 'transactions.quotation_id')
            ->join('users', 'users.id', '=', 'transactions.user_id')
            ->select(DB::raw('sum(quotations.rate * transactions.quantity) as total'))
            ->where('users.id', '=', $id)
            ->where('transactions.state', '=', "own")
            ->get();

        $out = [ 'currencies' => $currencies , 'total' => $totalSold[0]->total - $totalOwn[0]->total ];

        return $out;
    }

    public function getTransactionByCurrencyId($id){

        $transactions = DB::table('dealings')
            //->join('quotings', 'quotings.id', '=', 'transactions.currency_id')
            ->join('quotings', 'quotings.id', '=', 'dealings.quoting_dealings_id')
            ->join('currencies', 'currencies.id', '=', 'quotings.currency_id')
            ->join('users', 'users.id', '=', 'dealings.user_id')
            ->select("dealings.*", "quotings.currency_id", "quotings.rate")
            ->where('users.id', $this->id)
            ->where('dealings.state','own')
            ->get();
        $currency = Currency::find($id);

        $date = new Carbon();
        $transactions = $transactions->all();

        $quotationToday = $currency->quotation($date->format('Y-m-d'));

        foreach($transactions as $transaction){
            $transaction->diff = $quotationToday[0]->rate - $transaction->rate;
        }
        return $transactions;
    }



    public function getAllTransactionByUserId(){

        $dealinginfo = Dealing::where('user_id', $this->id)->first();

        $transactions = DB::table('dealings')
            ->join('quotings', 'quotings.id', '=', 'dealings.quoting_dealings_id')
            ->join('users', 'users.id', '=', 'dealings.user_id')
            ->select("dealings.*", "quotings.currency_id", "quotings.rate")
            ->where('dealings.user_id', $this->id)
            ->get();

        $dealinginfo = Dealing::where('user_id', $this->id)->first();
        $quotinginfo = Quoting::where('id', $dealinginfo->quoting_dealings_id)->first();
        $currency = Currency::find($quotinginfo->currency_id);

        $date = new Carbon();
        $transactions = $transactions->all();

        $quotationToday = $currency->quotation($date->format('Y-m-d'));

        foreach($transactions as $transaction){
            $transaction->diff = $quotationToday[0]->rate - $transaction->rate;
        }
        return $transactions;
    }
}
