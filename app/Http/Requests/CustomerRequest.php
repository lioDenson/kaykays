<?php

namespace App\Http\Requests;

use App\Models\Customer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('manage.customers', $this->route('customer'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|exists:users,email',
            'phone' => 'required|string|max:50',
            'bill_cycle' => 'required|string|in:daily,weekly,monthly',
            'street' => 'required|string|max:100',
            'estate' => 'required|string|max:100',
            'house_number' => 'required|string|max:20',
            'description' => 'nullable|string|max:255',
            'is_edit' => 'required|boolean',
            'id'=>'sometimes|exists:customers,id',
            'user_id' => [
                'required',
                'exists:users,id',
                Rule::unique('customers', 'user_id')->ignore(optional($this->route('customer'))->id),
            ],
        ];
    }

}
