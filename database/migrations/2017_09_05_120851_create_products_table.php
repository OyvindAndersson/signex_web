<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        return; // Dont migrate yet.
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 16)->unique();
            $table->string('name');
            
            $table->float('net_cost')->default(0.0);
            $table->integer('vendor_id')->unsigned()->nullable();
            $table->integer('product_category_id')->unsigned();
            $table->float('profit_margin_override')->nullable(); // Overrides any margin set for product category

            $table->timestamps();
        });

        Schema::create('product_state_infos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id')->unsigned()->nullable();
            // Copied state from 'products'
            $table->float('net_cost');
            $table->integer('vendor_id')->unsigned()>nullable();
            $table->integer('product_category_id')->unsigned()->nullable();
            $table->float('profit_margin_override')->nullable();

            
            $table->foreign('product_id')->references('id')->on('products')->onDelete('set null');

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
        Schema::dropIfExists('products');
    }
}
