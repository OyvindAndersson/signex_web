<?php
use App\Client;
use App\User;
use App\Order;
use App\OrderType;
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

Route::group(['middleware' => ['api']/*, 'namespace' => 'App\Http\Controllers', 'prefix' => 'auth'*/ ], function ($router) 
{
    Route::post('login', 'ApiAuthController@login');
    Route::post('logout', 'ApiAuthController@logout');
    Route::post('refresh', 'ApiAuthController@refresh');
    Route::post('verifyCookie', 'ApiAuthController@verifyCookie');
    Route::post('me', 'ApiAuthController@me');

    /** Fetch user resource */
    Route::get('users/{id?}', function($id = null) 
    {
        if(!$id)
        {
            $users = User::orderBy('id')->get();
            return response()->json([ 'users' => $users]);
        }
        else if(is_numeric($id))
        {
            $user = User::find($id)->first();
            return response()->json([ 'user' => $user]);
        }
        else
        {
            return response()->json(['error' => 'Invalid request'], 402);
        }
    });

    /** Fetch client resource */
    Route::get('clients/{id?}', function($id = null) 
    {
        if(!$id)
        {
            $clients = Client::orderBy('name')->get();
            return response()->json(['clients' => $clients, 'count' => count($clients)]);
        }
        else if(is_numeric($id))
        {
            $client = Client::find($id)->first();
            return response()->json(['client' => $client]);
        }
        else
        {
            return response()->json(['error' => 'Invalid request'], 402);
        }
    });
    
    /** Fetch order resource */
    Route::get('orders/{id?}', function($id = null) 
    {
		
        $orders = Order::orderBy('due_at')->with(['products'])->get();
        return response()->json(['orders' => $orders]);

        if(!$id)
        {
            $orders = Order::orderBy('due_at')->get(); //->with(['client', 'registrar', 'status'])->get();
            return response()->json(['orders' => $orders, 'count' => count($orders)]);
        }
        else if(is_numeric($id))
        {
            $order = Order::find($id)->first();
            return response()->json(['order' => $order]);
        }
        else
        {
            return response()->json(['error' => 'Invalid request'], 402);
        }
    });
	
	/** Fetch ordertype resource */
    Route::get('ordertypes/{id?}', function($id = null) 
    {
        $ordertypes = OrderType::orderBy('name')->get();
        return response()->json(['ordertypes' => $ordertypes]);
    });

    /** Persist resources */
    Route::post('clients/create', "ClientController@store");
    Route::post('orders/create', "OrderProjectController@store");
});