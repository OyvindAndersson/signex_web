<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Order;

class Client extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = [
        'name', 'org_nr',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
