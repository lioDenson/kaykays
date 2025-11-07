<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', User::class) ||
            $this->user()->can('update', $this->route('user'));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user');

        $rules = [
            'name' => 'required|string|max:255',
            'email' => [
                'nullable',
                'string',
                'email',
                'max:255',
            ],
            'phone' => [
                'required',
                'string',
                'max:50',
            ],
            // 'role_id' => [
            //     'required',
            //     'exists:roles,id',
            // ],
        ];

        if ($this->isMethod('post')) {
            // store
            $rules['phone'][] = Rule::unique('users', 'phone');
            $rules['email'][] = Rule::unique('users', 'email');
        }

        if ($this->isMethod('put') || $this->isMethod('patch')) {
            // update
            $rules['email'][] = Rule::unique('users', 'email')->ignore($userId);
            $rules['phone'][] = Rule::unique('users', 'phone')->ignore($userId);
        }

        return $rules;
    }

    public function prepareForValidation()
    {
        $user = $this->route('user');
        if ($user === Auth::id() && $this->has('role_id')) {
            $this->merge([
                'role_id' => Auth::user()->roles->first()?->id,
            ]);
        }
    }
}
