<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Delivery;

class DeliveryService
{
    /**
     * Create a new class instance.
     */
    public function __construct() {}


    public static function getDeliveryId($deliveryId, $riderId, $description, $delivery_fee, $status  = null, $date = null)
    {
        if (isset($deliveryId)) {
            return $deliveryId;
        } else {
            return self::createDelivery([
                'rider_id' => $riderId,
                'description' => $description??'Delivery ',
                'total_fee' => $delivery_fee ?? '0',
            ]);
        }
    }
    public static function createDelivery(array $data): int
    {
        try {
            $data['status'] = 'pending';
            $data['created_by'] = Auth::id();
            $data['account_id'] = 1;
            $data['date'] = Carbon::now();
            $delivery = Delivery::create($data);

            return $delivery->id;
        } catch (\Exception $e) {
            throw $e;
        }
    }
}
