<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\Dealing;
use App\Models\Quoting;
use App\Models\User;
use App\Models\Wallet;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class DealingController extends Controller
{


    /**
     * List (transactions)
     *
     * Return all transactions of an users by currency
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(){
        $user = Auth::user();
        $transactions = $user->getAllTransactionByUserId();
        return response()->json( $transactions );
    }

    /**
     * List (Dealing)
     *
     * Return details of transactions of an users connect by iddealing
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function list($id){
        $user = Auth::user();
        $transactions = $user->getTransactionByCurrencyId($id);
        return response()->json( $transactions );
    }


    /**
     * List (Own or Sold)
     *  Return all transactions of a users by state 'own' or 'sold'
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function all(Request $request){
        $user = Auth::user();
        $rules = [
            'state' => 'required',
        ];

        $input = $request->only(
            'state'
        );

        $validator = Validator::make($input, $rules);

        if($validator->fails()) {
            $error = $validator->messages()->toJson();
            return response()->json(['success'=> false, 'error'=> $error]);
        }

        $transactions =  DB::table('dealings')
            //->join('currencies', 'currencies.id', '=', 'dealings.currency_id')
            ->join('users', 'users.id', '=', 'dealings.user_id')
            ->join('quotings', 'quotings.id', '=', 'dealings.quoting_dealings_id')
            ->select("dealings.*","quotings.rate","quotings.currency_id")
            ->where('dealings.state', '=', $request->state)
            ->where('users.id', '=', $user->id)
            ->get();

        $transactions = $transactions->all();

        $date = new Carbon();

        foreach($transactions as $transaction){
            $quoting = Quoting::where('id', $transaction->quoting_dealings_id)->first();
            $currency = Currency::find($quoting->currency_id);
            $quotationToday = $currency->quotation($date->format('Y-m-d'));
            $transaction->diff = $quotationToday[0]->rate - $transaction->rate;
        }
        return response()->json( $transactions );
    }

    /**
     * Sell
     *
     * Update a transaction in state 'sold'
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function sell(Request $request, $id){
        $transaction = Dealing::findOrFail($id);
        if($transaction->state != 'sold'){
            //todo update
            $transaction->state = 'sold';
            $transaction->save();

            if($transaction->save() == true){
                $date = new Carbon();
                $quotinginfo = Quoting::where('date_quoting', $date->format('Y-m-d'))->where('id', $transaction->quoting_dealings_id)->first();

                $walletinfo = Wallet::where('user_id', $transaction->user_id)->first();
                $wallet = Wallet::find($walletinfo->id);
                $wallet->quantity -= $transaction->quantity;
                $wallet->save();
            }

            return response()->json(['success'=> true, 'message'=> 'Vendu !']);
        }else{
            return response()->json(['success'=> false, 'message'=> 'Déjà vendu !']);
        }
    }

    /**
     * Buy
     *
     * Create a transaction in state 'own'
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function buy(Request $request, $id){

            $user = Auth::user();

            $validator = Validator::make($request->only('quantity'), [
                'quantity' => 'required|integer|min:1',
            ]);

            if ($validator->fails()) {
                return response()->json(['success' => false, 'error' => $validator->messages()], 422);
            }

            $currency = Currency::findOrFail($id);

            if($currency){
                $date = new Carbon();
                $quotation = Quoting::where('date_quoting', $date->format('Y-m-d'))->where('currency_id', $currency->id)->first();
                $transaction = new Dealing();
                $transaction->user_id = $user->id;
                $transaction->quantity = $request->quantity;
                $transaction->dealing_date = $date->format('Y-m-d');
                $transaction->quoting_dealings_id = $quotation->id;
                $transaction->save();

                if($transaction->save() == true){
                    $walletinfo = Wallet::where('user_id', $user->id)->first();
                    $wallet = Wallet::find($walletinfo->id);
                    $wallet->quantity += $transaction->quantity;
                    $wallet->sold += ($quotation->rate * $transaction->quantity);
                    $wallet->save();
                }

                return response()->json(['success'=> true, 'message'=> 'Acheté !']);
            }else{
                return response()->json(['success'=> false, 'message'=> "La crypto monnaie demandée n'existe pas"]);
            }

        /*} else {
            // L'utilisateur n'est pas connecté.
        }*/

    }
}
