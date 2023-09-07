<?php

namespace Database\Factories;

use App\Models\Currency;
use App\Models\Quoting;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dealing>
 */
class DealingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $currencies = Currency::pluck('id')->all();
        $currencyId = fake()->randomElement($currencies);

        $date = new Carbon();
        $date = $date->addDays('-'.fake()->numberBetween(0,29))->format('Y-m-d');
        $quotation = Quoting::where('date_quoting', $date)->where('currency_id', $currencyId)->first();
        //var_dump($currencyId.'----'.$date.'----'.$quotation); die();
        $users = User::where('status','=','client')->get();
        $users = $users->pluck('id')->all();


        return [
            'user_id' => fake()->randomElement($users),
            'quantity' => fake()->numberBetween($min = 1, $max = 100),
            'quoting_dealings_id' => $quotation->id,
            'state' => fake()->randomElement(['own', 'sold']),
            'dealing_date' => $date,
        ];
    }
}
