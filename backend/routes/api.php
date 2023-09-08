<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\DealingController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/users', "UserController@index"); // DONE
Route::get('/user/{id}', [UserController::class, 'show']); // DONE
Route::post('/user', [UserController::class, 'show']); // DONE
Route::post('/user/{id}', [UserController::class, 'update']); // DONE
Route::delete('/user/{id}', [UserController::class, 'destroy']); // DONE

// Currencies get and show
Route::get('/currencies', [CurrencyController::class, 'index']); // DONE
Route::get('/currency/{id}', [CurrencyController::class, 'show']); // DONE

Route::post('/sell/transaction/{id}', [DealingController::class, 'sell']); // Vendre ?
Route::post('/buy/currency/{id}', [DealingController::class, 'buy']); // Achat ?

Route::middleware('auth:api')->group(function () {
    // Routes protégées par l'authentification
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


