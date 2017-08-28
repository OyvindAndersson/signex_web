<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrder extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * @todo Check if user can register orders
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
            'client_id' => 'required|exists:clients,id',
            'client_ref_id' => 'nullable|integer',
            'user_id' => 'required|exists:users,id',
            'is_quote' => 'boolean',
            'status_id' => 'integer',
            'due_at' => 'date|after_or_equal:now'
        ];
    }
}
