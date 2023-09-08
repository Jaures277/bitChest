<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCurrencyRequest;
use App\Http\Requests\UpdateCurrencyRequest;
use App\Models\Currency;
use Illuminate\Support\Carbon;

class CurrencyController extends Controller
{
    /**
     * Currencies
     *
     * Return a list of currencies with the latest quotation
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $currencies = Currency::all();

        foreach($currencies as $currency){

            $date = new Carbon();

            $currency->today_quotation = $currency->quotation($date->format('Y-m-d'))[0];

            $yesterday_quotation = $currency->quotation($date->addDays(-1)->format('Y-m-d'))[0];

            $currency->today_quotation->diff = $currency->today_quotation->rate - $yesterday_quotation->rate;
        }
        return response()->json($currencies);
    }

    /**
     * Currency
     *
     * Return a specific currency with quotations 30 days before
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id){
        $currency = Currency::find($id);
        return response()->json(['currency' => $currency, 'quotations' => $currency->quotations ]);
    }
}
