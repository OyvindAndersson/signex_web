<?php

namespace App\Http;

class CodeRules
{
    const CODES = [
        'project' => "10",
        'client' => "20",
        'product' => "30",
        'order' => "40"
    ];

    /*
        i.e: 10000017
        [10][0000][17]
        ^    ^    ^
        [Code][Padded Id][Year]
    */
    public static function get_code_format_string($code, $id)
    {
        return self::CODES[$code].str_pad($id, 4, "0", STR_PAD_LEFT).date('y');
    }
}