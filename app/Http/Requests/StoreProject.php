<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProject extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
           // 'code' => 'required|max:16',
            'name' => 'required|max:255',
            'body' => 'nullable',
            'manager_id' => 'exists:users,id',
            'order_id' => 'nullable|exists:orders,id'
        ];
    }
}
