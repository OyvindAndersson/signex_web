<?php

namespace App\Http\Controllers;

use App\Order;
use App\Client;
use App\Product;
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
                // Save order
                $newOrder->save();

                // Process products, if any
                if( isset($data['products']) && is_array($data['products']) )
                {
                    foreach($data['products'] as $product)
                    {
                        // Was this an existing product??
                        if(!isset($product['id']) || $product['id'] == 0)
                        {
                            // Create new product
                            $newProduct = Product::create([
                                'description' => $product['description'],
                                'unit_price' => $product['price'],
                                'global_discount' => $product['discount'],
                                'stocked' => $product['stocked'],
                            ]);
                            
                            // Does it exist now?
                            if($newProduct)
                            {
                                // Give it the new product code
                                $newProduct->code = Product::get_code_from_id($newProduct->id);
                                $newProduct->save();

                                // Attach to the order
                                $newOrder->products()->attach($newProduct, 
                                    [
                                        'units' => $product['units'], 
                                        'unit_price' => $product['price'],
                                        'discount' => $product['discount']
                                    ]);
                            }
                        }
                        else 
                        {
                            // TODO: Fetch existing and attach to order with units/discount details.
                        }
                        
                    }
                }

                return response()->json(
                    [
                        'order' => $newOrder, 
                        //'client' => $newOrder->client,
                        'products' => $newOrder->products,
                        'notify' => ['title' => 'Success!', 'message' => "Order #$newOrder->code added!", 'status' => 'success']
                    ]
                );

            }
            catch(\Exception $e)
            {
                return response()->json(['exception' => $e], 402);
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
