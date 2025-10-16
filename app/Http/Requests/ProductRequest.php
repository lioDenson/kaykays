<?php

namespace App\Http\Requests;

use App\Models\Product;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Product::class) ||
            $this->user()->can('update', $this->route('product'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products', 'name')
                    ->ignore($this->route('product'))->whereNull('deleted_at'),
            ],
            'description' => 'nullable|string|max:255',
            'price' => 'required|numeric|min:1',
            'unit' => 'required|string|max:20',
            'account_id' => 'required|integer|exists:accounts,id'
        ];
    }

    public function messages()
    {
        return [
            'name.unique' => 'Product already exists.',
            'price.min:1' => 'Price must be at least 1Ksh',
        ];
    }
}
