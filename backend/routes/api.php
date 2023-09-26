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

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    //Route::get('/user', [AuthController::class, 'user']);
    Route::get('/logout', [AuthController::class, 'logout']);

    Route::get('/users', [UserController::class, 'index']); // DONE
    Route::get('/user/{id}', [UserController::class, 'show']); // DONE
    Route::post('/user', [UserController::class, 'store']); // DONE
    Route::put('/user/{id}', [UserController::class, 'update']); // DONE
    Route::delete('/user/{id}', [UserController::class, 'destroy']); // DONE

    // Currencies get and show
    Route::get('/currencies', [CurrencyController::class, 'index']); // DONE
    Route::get('/currency/{id}', [CurrencyController::class, 'show']); // DONE

    // Client
    Route::get('/wallet', [UserController::class, 'wallet']); // porte feuille ?
    Route::get('/wallet/client', [UserController::class, 'walletInfo']); // porte feuille ?
    Route::get('/currency/{id}/transactions', [DealingController::class, 'list']); //
    Route::post('/dealings', [DealingController::class, 'all']); //
    Route::get('/all/dealings/user', [DealingController::class, 'show']); //

    Route::post('/sell/transaction/{id}', [DealingController::class, 'sell']); // Vendre ?
    Route::post('/buy/currency/{id}', [DealingController::class, 'buy']); // Achat ?

});


Route::middleware('auth:api')->group(function () {
    // Routes protégées par l'authentification
});



