<?php

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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

//Route::get('/orders', 'OrderController@index')->name('orders')->middleware('auth');
Route::resource('orders', 'OrderController')->middleware('auth');
Route::resource('clients', 'ClientController')->middleware('auth');
Route::resource('projects', 'ProjectController')->middleware('auth');

Route::post('orderWithProject', 'OrderProjectController@store')->middleware('auth');