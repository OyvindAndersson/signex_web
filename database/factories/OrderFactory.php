<?php

use Faker\Generator as Faker;

$factory->define(App\Order::class, function (Faker $faker) {
    return [
        'client_id' => rand(1,9),
        'user_id' => rand(1,3),
        'is_quote' => $faker->boolean(),
        'due_at' => $faker->dateTimeThisYear($max = 'now', $timezone = date_default_timezone_get()),
        'quote_expires_at' => $faker->dateTimeThisYear($max = 'now', $timezone = date_default_timezone_get()),
        'code' => App\Http\CodeRules::get_code_format_string("order", rand(1,1000))
    ];
});
