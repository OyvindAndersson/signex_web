<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
* Base Product - contains data about any product
* either stocked, or produced. 
*/
class Product extends Model
{
    protected $table = 'products';
    protected $fillable = [
        'name', 
        'attributes', 
        'profit_margin_override',
        'category_id', 
        'unit_type_id', 
        'unit_price'
    ];
}
