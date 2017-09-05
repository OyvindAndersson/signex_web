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
        Schema::create('order_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 64)->unique();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        App\Order::create([
            'name' => 'General',
            'description' => 'Any order type'
        ]);
        App\Order::create([
            'name' => 'Vendor only',
            'description' => 'All products come from one or more vendors only. Nothing self-produced.'
        ]);

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
        Schema::dropIfExists('order_order_types');
        Schema::dropIfExists('order_types');
    }
}
