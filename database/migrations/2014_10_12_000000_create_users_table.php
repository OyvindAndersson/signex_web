<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\User;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });

        User::create([
            'name' => 'Øyvind Andersson',
            'email' => 'oyvind@metroreklame.no',
            'password' => bcrypt('eptq339')
        ]);
        User::create([
            'name' => 'Gianni Rebaudo',
            'email' => 'gianni@metroreklame.no',
            'password' => bcrypt('eptq339')
        ]);
        User::create([
            'name' => 'Kristinn "Stinny" Atlason',
            'email' => 'stinni@metroreklame.no',
            'password' => bcrypt('eptq339')
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
