<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Http\CodeRules;

class Project extends Model
{
    protected $fillable = [
        'code', 'name', 'body', 'manager_id', 'order_id'
    ];

    public function order()
    {
        return $this->belongsTo(\App\Order::class);
    }

    public static function get_code_from_id($id)
    {
        return CodeRules::get_code_format_string('project', $id);
    }
}
