<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
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



Route::middleware('auth:api')->group(function () {
    // Routes protégées par l'authentification
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


