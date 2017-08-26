<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('client_id')->unsigned();       // Client
            $table->integer('client_ref_id')->unsigned()->nullable();   // Client who ordered (if registered)
            $table->integer('user_id')->unsigned()->nullable();         // User who took/registered order
            $table->boolean('is_quote')->default(1);        // Is it an Order or a Quote that could possibly become an order?
            $table->integer('status_id')->unsigned()->default(1);       // Reference to order_statuses table (pivot)
            $table->dateTime('due_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
