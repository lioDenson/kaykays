<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Support\Facades\DB;

use function Laravel\Prompts\table;

class StoreSaleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can(['manage.sales']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'products' => ['required'],
            'products.*.id' => ['required', 'integer', 'exists:batches,id'],
            'products.*.quantity' => ['required', 'min:0.1'],
            'customer' => [
                'required_if:isDelivery,true',
                'sometimes',
                function ($attribute, $value, $fail) {
                    if ($value == null && $this->input('balance') > 0) {
                        $fail('Select a customer for credit sale.');
                    }
                    if ($value != null) {
                        if (!DB::table('customers')->where('id', $value)->exists()) {
                            $fail('Selected customer does not exist.');
                        }
                    }
                },
            ],
            'total' => ['required', 'numeric', 'min:0'],
            'totalPaid' => ['required', 'numeric', 'min:0'],
            'isDelivery' => ['required', 'boolean'],
            'deliveryFee' => ['required_if:isDelivery,true', 'numeric', 'min:0'],
            'deliveryData' => [
                'required_if:isDelivery,true',
                function ($attribute, $value, $fail) {
                    if (!isset($value['rider_id']) && !isset($value['delivery_id'])) {
                        $fail('Crate a delivery or attach to a delivery.');
                    } else {
                        if (isset($value['rider_id'])) {
                            if (!DB::table('riders')->where('id', $value['rider_id'])->exists()) {
                                $fail('Selected rider does not exist.');
                            }
                        } elseif (isset($value['delivery_id'])) {
                            if (!Db::table('deliveries')->where('id', $value['delivery_id'])->exists()) {
                                $fail('Selected delivery does not exist.');
                            }
                        }
                    }
                }
            ],
            'balance' => ['required', 'min:0'],
            'mpesa' => ['numeric', 'nullable'],
            'cash' => ['numeric', 'nullable'],
            'description' => 'nullable|string|max:255',
            'rider_id' => ['nullable', 'integer', 'exists:riders,id'],
            'delivery_id' => ['nullable', 'integer', 'exists:deliveries,id']
        ];
    }
    public function attributes()
    {
        $attributes = [];

        if ($this->input('products') != null) {
            foreach ($this->input('products', []) as $index => $product) {
                $position = $index + 1;
                $attributes["products.$index.id"] = "Product No $position";
                $attributes["products.$index.quantity"] = "Quantity No $position";
            }
        } else {
            $attributes['products'] = 'Product';
        }
        return $attributes;
    }

    public function messages()
    {
        return [
            'products.required' => 'Select a  product.',
            'customer.required_if' => 'Select a customer to deliver to.',
        ];
    }



    protected function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if ($this->input('products') != null) {
                foreach ($this->input('products', []) as $index => $product) {
                    if (empty($product['quantity'])) {
                        $position = $index + 1; // human-friendly position
                        $validator->errors()->add(
                            "products.$index.quantity", // use position instead of index
                            "Enter Quantity."
                        );
                    }
                }
            }
        });
    }



    public function prepareForValidation()
    {

        if ($this->has(['products'])) {
            $cleanedProduct = collect($this->input('products'))
                ->map(fn($products) => Arr::only($products, ['index', 'id', 'subTotal', 'quantity']))->toArray();

            $this->merge(['products' => $cleanedProduct]);
        }

        if ($this->has(['customer'])) {
            $cleanedCustomer = Arr::only($this->input('customer'), ['value']);
            $this->merge(['customer' => $cleanedCustomer['value']]);
        }


        $products = $this->input('products');

        if (!isset($products[0]['id'])) {
            $this->merge(['products' => null]);
        }

        $this->merge([
            'customer' => $this->input('customer', null),
        ]);


        if ($this->input('isDelivery')) {
            if (isset($this->input('deliveryFee')['raw'])) {
                $this->merge(['deliveryFee' => $this->input('deliveryFee')['raw']]);
            }
            $riderId = isset($this->input('deliveryData')['rider_id']) ? $this->input('deliveryData')['rider_id'] : null;
            $deliveryId = isset($this->input('deliveryData')['delivery_id']) ? $this->input('deliveryData')['delivery_id'] : null;
            $this->merge([
                'rider_id' => $riderId,
                'delivery_id' => $deliveryId,
            ]);
        } else {
            $this->merge([
                'rider_id' => null,
                'delivery_id' => null,
            ]);
        }


        // dd($this->all());
    }
}
