<?php

use App\Http\Controllers\Api\V1\CatalogController;
use App\Http\Controllers\Api\V1\DocumentController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group( function () {
    Route::get('/user', [UserController::class, 'current'])->name('user.current');

Route::apiResources([
    'catalogs' => CatalogController::class,
    'documents' => DocumentController::class,
]);
});



Route::middleware('log')->group(function(){
    Route::post('login', [LoginController::class, 'login'])->name('user.login');
    Route::post('registration', [RegisterController::class, 'create'])->name('user.new');
    Route::post('logout', [LoginController::class, 'logout'])->name('user.logout');

});

