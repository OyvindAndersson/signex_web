<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
        * CLIENTS
        * A client, generally assigned to Orders.
        */
        Schema::create('clients', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('org_nr')->unique();
            $table->timestamps();
        });

        /**
        * Now that clients table has been created, we can
        * create the foreign constraint to clients, on the orders table.
        */
        Schema::table('orders', function (Blueprint $table) {
            $table->foreign('client_id')->references('id')->on('clients');
        });

        // Insert a "general" client, for private clients
        App\Client::create([
            'name' => 'Privat',
            'org_nr' => ''
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['client_id']);
        });
        Schema::dropIfExists('clients');
    }
}
