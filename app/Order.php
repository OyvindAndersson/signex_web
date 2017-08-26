<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Client;

class Order extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
     protected $fillable = [
        'client_id', 'client_ref_id', 'user_id', 'is_quote', 'status_id', 'due_at',
    ];


    public function client()
    {
        return $this->hasOne(Client::class);
    }
}
