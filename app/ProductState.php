<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductState extends Model
{
    protected $fillable = ['state'];
    protected $casts = [
        'state' => 'array',
    ];

    public function collection()
    {
        $this->belongsTo('App\ProductCollection');
    }
}
