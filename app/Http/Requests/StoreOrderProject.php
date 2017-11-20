<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderProject extends FormRequest
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
            'order.client_id' => 'required|exists:clients,id',
            'order.client_ref_id' => 'nullable|integer',
            'order.user_id' => 'required|exists:users,id',
            'order.description' => 'string',
            'order.is_quote' => 'boolean',
            'order.status_id' => 'integer',
            'order.due_at' => 'date' //|after_or_equal:now
        ];
    }
}
