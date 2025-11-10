<?php
namespace App\Services;
use App\Models\Customer;
use Illuminate\Support\Carbon;

class CustomerService
{

    public function __construct() {}
    public static function getCustomerDueDate($bill_cycle)
    {
        $today = Carbon::now();
        $endOfWeek = Carbon::now()->endOf('week');
        $endOfMonth = Carbon::now()->endOf('month');


        $due_date = match ($bill_cycle) {
            'daily' => $today,
            'weekly' => $endOfWeek,
            'monthly' => $endOfMonth,
            default => $today
        };

        return $due_date;
    }
}
