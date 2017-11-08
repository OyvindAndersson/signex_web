<?php
use App\Client;
use App\User;
use App\Order;
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
Route::post("/login", "ApiAuthController@login");


Route::group(['middleware' => 'jwt.auth'], function (){
    Route::get('authUserToken', "ApiAuthController@authUserToken");
    Route::get('users/{id?}', function($id = null) {
        $users = User::all();
        return response()->json([ 'users' => $users ]);
    });
    Route::get('clients/{id?}', function($id = null) {
        $clients = Client::orderBy('name')->get();
        return response()->json(['clients' => $clients]);
    });
    Route::post('clients/create', "ClientController@store");

    Route::get('orders/{id?}', function($id = null) {
        $orders = Order::orderBy('created_at')->with(['client', 'registrar'])->get();
        return response()->json(['orders' => $orders]);
    });
});



//--------------------------------------------------
/*
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
*/