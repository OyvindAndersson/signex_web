<?php

namespace App;

use App\Http\CodeRules;
use Illuminate\Database\Eloquent\Model;

/**
* Base Product - contains data about any product
* either stocked, or produced. 
*/
class Product extends Model
{
    protected $table = 'products';
    protected $fillable = [
        'code',
        'name', 
        'description',
        'unit_price',
        'unit_type_id', 
        'custom',
        'supplier_id',
        'margin_override',
        'inventory',
        'category_id',
        'stocked'
    ];

    public function orders()
    {
        return $this->belongsToMany('App\Order', 'order_products', 'product_id', 'order_id');
    }

    public static function get_code_from_id($id)
    {
        return CodeRules::get_code_format_string('product', $id);
    }
}
