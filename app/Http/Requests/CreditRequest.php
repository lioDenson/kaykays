<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreditRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }



    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'credit_id' => ['required', 'exists:credits,id'],
            'sale_id' => ['required', 'exists:sales,id'],
            'due_balance' => 'required|numeric',
            'mpesa' => 'nullable|numeric',
            'cash' => 'nullable|numeric'
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $mpesa = $this->input('mpesa');
            $cash = $this->input('cash');
            $dueBalance = $this->input('due_balance');
            $id = $this->input('credit_id');
            $saleId = $this->input('sale_id');



            $mpesa = !empty($mpesa) ? (float) $mpesa : 0;
            $cash = !empty($cash) ? (float) $cash : 0;
            $dueBalance = !empty($dueBalance) ? (float) $dueBalance : 0;



            if (!isset($id)) {
                $validator->errors()->add("form_", 'Credit record is invalid.');
            }

            if (!isset($saleId)) {
                $validator->errors()->add("form_$id", 'Sale is invalid.');
            }


            if ($dueBalance <= 0) {
                $validator->errors()->add("form_$id", 'The bill is already paid.');
            }
            if (!($mpesa > 0 || $cash > 0)) {
                $validator->errors()->add("form_$id", 'Enter payment amount.');
            }
        });
    }
}
