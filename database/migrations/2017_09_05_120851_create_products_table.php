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

        /**
        * PRODUCTS
        * Stores info about any type of product.
        * 'attributes' JSON data stores additional, unique
        * info about any given product, and does not have
        * to follow a schema, other than what a Product
        * model defines. I.e: one can have "color" and another
        * can have "size", but both does not have to have it.
        */
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');

            $table->string('code', 16)->unique();
            $table->string('name');
            $table->json('attributes');
            $table->float('profit_margin_override')->nullable(); // Overrides any margin set for product category
            $table->timestamps();
            // Referenced data
            $table->integer('supplier_id')->unsigned()->nullable();
            $table->integer('category_id')->unsigned();
            $table->integer('unit_type_id')->unsigned();
            $table->float('unit_price')->default(0.0);
        });

        /**
        * PRODUCT CATEGORIES
        * A product belongs to a product category
        */
        Schema::create('product_categories', function(Blueprint $table){
            $table->increments('id');
            $table->string('name');
        });

        /**
        * PRODUCT STATES
        * A snapshot of a product's state at a given time.
        * A product state is created from a Product i.e: when an Order 
        * adds a product to its product_collection, because it needs
        * to reflect the state of the product at the given time.
        * All mutable and important time-specific state is copied.
        */
        Schema::create('product_states', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_id')->unsigned()->nullable();
            // State info is stored as JSON data
            $table->json('state');

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
        Schema::dropIfExists('product_states');
        Schema::dropIfExists('product_categories');
        Schema::dropIfExists('products');
    }
}
