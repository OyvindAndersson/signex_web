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
        Schema::create('product_collections', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
        });

        Schema::create('product_collection_product_state_info', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('product_state_info_id')->unsigned();
            $table->integer('product_collection_id')->unsigned();

            $table->foreign('product_state_info_id')
            ->references('id')->on('product_state_infos')
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
        Schema::dropIfExists('product_collection_product_state_info');
        Schema::dropIfExists('product_collections');
    }
}
