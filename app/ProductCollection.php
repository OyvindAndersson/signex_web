<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductCollection extends Model
{
    public function order()
    {
        return $this->belongsTo('App\Order', 'product_collection_id');
    }

    public function products()
    {
        return $this->hasMany('App\ProductState', 'product_collection_id')
    }
}
