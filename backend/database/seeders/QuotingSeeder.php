<?php

namespace Database\Seeders;

use App\Models\Currency;
use App\Models\Quoting;
use App\Services\CotationInterface;
use App\Services\CotationServices;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuotingSeeder extends Seeder
{
    protected $CotationServices;

    public function __construct(CotationServices $CotationServices)
    {
        $this->CotationServices = $CotationServices;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $currencies = Currency::all();

        $currencies->each(function($c){
            $firstCotation = $this->CotationServices->getFirstCotation($c->name);
            for ($i=0; $i < 30; $i++) {

                $quotation = new Quoting();
                $quotation->currency_id = $c->id;

                $quotation->rate = $i == 0 ? $firstCotation : $this->CotationServices->getCotationFor($c->name) + $firstCotation;

                $date = new Carbon();
                $date->addDays(-$i);

                $quotation->date_quoting = $date;
                $quotation->save();
            }
        });

    }
}
