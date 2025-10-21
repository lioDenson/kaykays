<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class RiderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('manage.riders', $this->route('rider'));
    }

    public function rules(): array
    {
        // Detect if we’re updating (edit) or creating (store)
        $riderId = $this->route('rider')?->id;
        // ?? $this->route('rider');

        return [
            'user_id' => [
                'required',
                Rule::exists('users', 'id')->whereNull('deleted_at'),
                Rule::unique('riders', 'user_id')
                    ->ignore($riderId)
                    ->whereNull('deleted_at'),
            ],
            'vehicle_number' => [
                'required',
                'string',
                'max:255',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.exists' => 'Search a user first to convert to a rider',
        ];
    }
}
