<?php

use Faker\Generator as Faker;

$factory->define(App\Client::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'org_nr' => $faker->randomNumber()
    ];
});
