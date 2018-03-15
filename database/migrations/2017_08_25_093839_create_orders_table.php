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
        /**
        * ORDERS
        * An Order is the base entity for registering work.
        * An order belong to a Client, and a User. The basic
        * info needed for an invoice or quote, is available
        * in an order.
        */
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 16)->default('null');
            $table->text('description')->nullable();

            $table->integer('client_id')->unsigned();       // Client
            $table->integer('client_ref_id')->unsigned()->nullable(); // Client who ordered (if registered)
            $table->integer('user_id')->unsigned()->nullable();  // User who took/registered order

            $table->boolean('is_quote')->default(1); // Is it an Order or a Quote that could possibly become an order?
            $table->dateTime('quote_expires_at')->nullable(); // When this - as a quote - expires
            //$table->integer('product_collection_id')->unsigned()->nullable(); // Collection of product state infos.

            $table->integer('type_id')->unsigned()->default(1); // Reference on pivot table for multiple order types
            $table->integer('status_id')->unsigned()->default(1); // Reference to order_statuses table (pivot)

            $table->dateTime('due_at')->nullable();
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
