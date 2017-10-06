<?php
use App\Client;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

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

// JWT Auth API
Route::post("/login", "ApiAuthController@authenticate");
Route::get("/fetchUser", "ApiAuthController@fetchUser");

Route::group(['middleware' => 'jwt.auth'], function (){
    Route::get('fetchAuthUser', function () {
        return JWTAuth::parseToken()->authenticate();
    });

    Route::get('authUserToken', function () {
        return JWTAuth::parseToken()->authenticate();
    });
});



//--------------------------------------------------

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/clients', function (Request $request) {
    return Client::orderBy('name')->get();
});

Route::get('/client/{id}', function ($id) {
    return Client::find($id);
});

Route::post('/client/store', function(Request $request){
    return $request;
});

Route::get('/orders', function () {
    return App\Order::all();
});
