<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Client;
use App\Http\CodeRules;

/**
* Defines the absolute needed information for an Order
* that can be directly utilized in creating an invoice
* Projects and products can be attached to orders
*/
class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = [
        'client_id', 'client_ref_id', 'user_id', 'is_quote', 'status_id', 'due_at', 'description'
    ];

    public function registrar()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function projects()
    {
        return $this->hasMany(\App\Project::class);
    }

    public function types()
    {
        return $this->belongsToMany('App\OrderType', 'order_order_type', 'order_id', 'order_type_id');
    }

    public function status()
    {
        return $this->belongsTo(\App\OrderStatus::class);
    }

    public function products()
    {
        return $this->hasMany('App\Product', 'order_products', 'order_id', 'product_id');
    }

    public static function get_code_from_id($id)
    {
        return CodeRules::get_code_format_string('order', $id);
    }
}
