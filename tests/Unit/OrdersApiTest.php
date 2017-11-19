<?php

namespace Tests\Unit;
use JWTAuth;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class OrdersApiTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testCreateOrderSuccess()
    {
        //$this->withoutMiddleware();
        $this->be(\App\User::first());
        $token = JWTAuth::attempt(['email' => 'oyvind@metroreklame.no', 'password' => 'eptq339']);
        //var_dump($token);

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token" 
        ])->json('POST', 'api/orders/create', [
            'order' => [
                'user_id' => 1,
                'client_id' => 1
            ]
        ]);

        $d = $response->getData();
        print_r($d);
        
        $response->assertStatus(200);
    }
}
