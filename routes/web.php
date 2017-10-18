<?php

use App\User;
use Tymon\JWTAuth\Facades\JWTAuth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/{path?}', function () {
    return view('index');
});*/
Route::get('/', function(){
    return view('index');
});
Route::any( '{catchall}', function ( $page ) {
    return view('index');
} )->where('catchall', '(.*)');

Auth::routes();
/*
//Route::get('/orders', 'OrderController@index')->name('orders')->middleware('auth');
Route::resource('orders', 'OrderController')->middleware('auth');
Route::resource('clients', 'ClientController')->middleware('auth');
Route::resource('projects', 'ProjectController')->middleware('auth');

Route::post('orderWithProject', 'OrderProjectController@store')->middleware('auth');*/