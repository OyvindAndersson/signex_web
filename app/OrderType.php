<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderType extends Model
{
    protected $fillable = [
        'name', 'description'
    ];

    public function orders()
    {
        return $this->belongsToMany('App\Order', 'order_order_type', 'order_type_id', 'order_id');
    }
}
