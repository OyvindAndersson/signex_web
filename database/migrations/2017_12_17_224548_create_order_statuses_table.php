<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_statuses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 64)->unique();
            $table->string('description')->nullable();
            $table->timestamps();
        });
        
        Schema::table('orders', function(Blueprint $table){
            $table->foreign('status_id')->references('id')->on('order_statuses');
        });

        /**
        * INSERT STANDARD ORDER TYPES
        */
        App\OrderStatus::create([
            'name' => 'Quote',
            'description' => 'An acitve quote/offer'
        ]);
        App\OrderStatus::create([
            'name' => 'Registered',
            'description' => 'The order has been registered'
        ]);
        App\OrderStatus::create([
            'name' => 'In progress',
            'description' => 'The order is in progress (under production or otherwise)'
        ]);
        App\OrderStatus::create([
            'name' => 'Finished / Sent',
            'description' => 'The order has been finished and/or posted, awaiting invoice to finalize/archive.'
        ]);
        App\OrderStatus::create([
            'name' => 'Archived',
            'description' => 'The order is finalized and archived.'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function(Blueprint $table){
            $table->dropForeign('orders_status_id_foreign');
        });
        Schema::dropIfExists('order_statuses');
    }
}
