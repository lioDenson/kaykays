<?php

namespace App\Enums\Enum;

enum DeliveryEnums: string
{
    case Pending = 'pending';
    case InTransit = 'in_transit';
    case Delivered = 'delivered';
    case Cancelled = 'cancelled';
    case Hold = 'hold';
}
