<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class SetRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('manage.users') && $this->input('user_id') != Auth::id();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if (!$this->input('user_id')) {
            return [
                'user_id' => 'required',
            ];
        }
        return [
            'user_id' => 'exists:users,id',
            'role_id' => 'required|exists:roles,id',
        ];
    }

    public function messages()
    {
        return [
            'role_id.required' => 'Role mus be selected from here.',
            'user_id.required' => 'Search a user from here to continue.',
            'user_id.exists' => 'User does not exist',
            'role_id.exists' => 'Role does not exist'
        ];
    }
}
