<?php

use App\User;
use Tymon\JWTAuth\Facades\JWTAuth;
//use JavaScript;
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
Route::get('/', function(){
    return view('index');
});

/**
 * Catchall web requests.
 * JS Handles client-side routing and auth callbacks.
 * Pass in any useful from-server bootstrap to JS here, in JavaScript::put
 * i.e: data to hydrate redux state, etc.
 */
Route::any( '{catchall}', function ( $page ) {
    
    JavaScript::put([
        'humanDateFormat' => "DD.MM.Y H:mm"
    ]);

    return view('index');
} )->where('catchall', '(.*)');

// Auth::routes()