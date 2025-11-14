<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasAnyRole(['super-admin', 'admin']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'required|string|max:255',
        ];
    }

    public function messages()
    {
        return [
            'name.unique' => 'Category already exists.',
            'name.required' => 'Name is required.',
            'description.required' => 'Description is required.',
            'description.string' => 'Description must be a string.',
            'description.max:255' => 'Description must be less than 255 characters.',
        ];
    }
}
