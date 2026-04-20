<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\ApplicationController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/offers', [OfferController::class, 'index']);
Route::get('/offers/{id}', [OfferController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/offers', [OfferController::class, 'store']); // Only for companies
    Route::post('/apply', [ApplicationController::class, 'store']); // Only for students
    Route::get('/applications', [ApplicationController::class, 'index']);
});
