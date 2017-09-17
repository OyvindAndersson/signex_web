<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
        * ORDER TYPES
        * An order can be of a specific type, simply for 
        * organizational purposes. Types can be custom made.
        * I.e: "General", "Supplier" etc.
        * 
        */
        Schema::create('order_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 64)->unique();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        /**
        * INSERT STANDARD ORDER TYPES
        */
        App\OrderType::create([
            'name' => 'General',
            'description' => 'Any order type'
        ]);
        App\OrderType::create([
            'name' => 'Vendor only',
            'description' => 'All products come from one or more vendors only. Nothing self-produced.'
        ]);

        /**
        * ORDER -> ORDER_TYPE pivot table
        * Any order can belong to N order types.
        */
        Schema::create('order_order_type', function(Blueprint $table) {
            $table->integer('order_id')->unsigned()->index();
            $table->integer('order_type_id')->unsigned()->index();

            $table->foreign('order_id')->references('id')->on('orders');
            $table->foreign('order_type_id')->references('id')->on('order_types');
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
        Schema::table('order_order_type', function(Blueprint $table){
            $table->dropForeign(['order_type_id']);
            $table->dropForeign(['order_id']);
        });
        Schema::dropIfExists('order_order_type');
        Schema::dropIfExists('order_types');
    }
}
