<?php

namespace App\Http\Requests;

use App\Models\Supplier;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SupplierRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('manage.suppliers', Supplier::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'company_name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('suppliers', 'company_name')->ignore($this->input('supplier_id', null), 'supplier_id')
            ],
            'phone' => [
                'required',
                'string',
                'max:50',
                Rule::unique('suppliers', 'phone')->ignore($this->input('supplier_id', null), 'supplier_id')
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('suppliers', 'email')->ignore($this->input('supplier_id', null), 'supplier_id')
            ],
            'contact_person' => 'required|string|max:50',
            'address' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ];
    }
}
