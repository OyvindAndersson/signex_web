<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
        * PROJECTS
        * Can, optionally, be attached to an Order.
        * If an Order requires a lot of work, i.e, then a project
        * is a good way to organize tasks, conversations etc.
        */
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code', 16)->default('null'); // The project code/number
            $table->string('name', 128);
            $table->string('body');
            $table->integer('manager_id')->unsigned();
            $table->integer('order_id')->unsigned();
            $table->timestamps();

            // @todo Do NOT cascade if manager dies.
            $table->foreign('manager_id')->references('id')->on('users'); 
            $table->foreign('order_id')->references('id')->on('orders');
        });
        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projects');
    }
}
