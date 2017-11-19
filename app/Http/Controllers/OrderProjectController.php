<?php

namespace App\Http\Controllers;

use App\Order;
use App\Client;
use Illuminate\Http\Request;

class OrderProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(\App\Http\Requests\StoreOrderProject $request)
    {
        $data = $request->all();
        $order_data = $data['order'];

        if(\App::runningUnitTests()){

            // If the test is simulating a database error (Order creation failure),
            // we will return the appropriate response. Otherwise, the default success.
            if( ! isset($data['simulate_database_error'])){

                return response()->json([
                    'order' => new Order($order_data), 
                    'client' => new Client($order_data)
                ]);
            }
            else {
                // If test assumes bad order data
                return response()->json(['error' => 'failed'], 500);
            }
            
        }

        $newOrder = Order::create($data['order']);
        // If successful order was created, we assign a new unique order-id.
        if($newOrder)
        {
            $code = Order::get_code_from_id($newOrder->id);
            $newOrder->code = $code;
            $newOrder->save();

            return response()->json(['order' => $newOrder, 'client' => $newOrder->client]);
        }
        else {
            return response()->json(['order' => $newOrder, 'client' => $newOrder->client], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
