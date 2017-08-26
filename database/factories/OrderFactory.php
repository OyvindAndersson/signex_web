<?php

use Faker\Generator as Faker;

$factory->define(App\Order::class, function (Faker $faker) {
    return [
        'client_id' => rand(1,10),
        'user_id' => rand(1,3),
        'is_quote' => $faker->boolean(),
        'due_at' => new Carbon\Carbon('next friday'),
    ];
});
