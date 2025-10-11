<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class RiderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('manage.riders', $this->route('rider'));
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
                    ->ignore($this->route('rider')) // ignore current record when editing
                    ->whereNull('deleted_at'),     // check only active riders
            ],
            'vehicle_number' => [
                'required',
                'string',
                'max:255',
            ],
        ];
    }

    public function messages()
    {
        return [
            'user_id.exists' => 'Search a user first to convert to a rider',
        ];
    }
}
