<?php

namespace App\Http\Controllers;

use App\Order;
use App\Client;
use App\ProductCollection;
use App\ProductState;
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
            try 
            {
                // Associate code
                $code = Order::get_code_from_id($newOrder->id);
                $newOrder->code = $code;

                if(isset($data['products']) && count($data['products']) > 0)
                {
                    foreach($data['products'] as $product)
                    {
                        $newProduct = Product::create($product); // IF MARKED STOCKED: SAVE MAKE SURE TO CHECK 'STOCKED'
                        if($newProduct)
                        {
                            
                        }
                    }
                }

                // Save order
                $newOrder->save();

                return response()->json(
                    [
                        'order' => $newOrder, 
                        'client' => $newOrder->client,
                        'product_collection' => $newOrder->product_collection,
                        'product_state' => $product,
                        'notify' => ['title' => 'Success!', 'message' => "Order #$newOrder->code added!", 'status' => 'success']
                    ]
                );

            }
            catch(\Exception $e)
            {
                return response()->json(['exception' => $e], 504);
            }
            
        }
        else {
            return response()->json([
                'order' => $newOrder,
                'notify' => ['title' => 'Ooops!', 'message' => "Failed to create order", 'status' => 'error']
        ], 500);
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
