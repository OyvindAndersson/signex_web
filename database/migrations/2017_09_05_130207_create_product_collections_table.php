<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductCollectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        return;

        /**
        * PRODUCT COLLECTIONS 
        * These collections are attached to orders and other models that
        * utilizes an array of products.
        */
        Schema::create('product_collections', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
        });

        /**
        * PIVOT TABLE FOR product_collections AND product_states
        * A product collection has many prodoct states in it. 
        */
        Schema::create('product_collection_product_state', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_state_id')->unsigned();
            $table->integer('product_collection_id')->unsigned();

            $table->foreign('product_state_id')
            ->references('id')->on('product_states')
            ->onDelete('cascade');

            $table->foreign('product_collection_id')
            ->references('id')->on('product_collections')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_collection_product_state');
        Schema::dropIfExists('product_collections');
    }
}
