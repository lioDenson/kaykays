<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRiderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('manage.riders');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => [
                'required',
                Rule::exists('users', 'id')->whereNull('deleted_at'), // check only active users
                Rule::unique('riders', 'user_id')
                    ->ignore($this->input('user_id')) // ignore current record when editing
                    ->whereNull('deleted_at'),     // check only active riders
            ],
            'vehicle_number' => [
                'required',
                'string',
                'max:255',
            ],
            'phone' => [
                'required',
                'string',
                'max:50',
                Rule::unique('users', 'phone')
                    ->ignore($this->input('user_id'))->whereNull('deleted_at'),
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')
                    ->ignore($this->input('user_id'))->whereNull('deleted_at'),
            ],
            'name' => [
                'required',
                'string',
                'max:255',
            ]
        ];
    }

    public function messages()
    {
        return [
            'user_id.exists' => 'Rider must be register as a user first.',
        ];
    }
}
