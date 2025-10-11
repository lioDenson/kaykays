<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Carbon;
use App\Models\Credit;
use Illuminate\Support\Facades\Auth;

class CreditService
{
    /**
     * Create a new class instance.
     */
    public function __construct() {}

    public static function registerCredit(array $data)
    {
        try {
            $data['date'] = Carbon::now();
            $data['account_id'] = 1;
            $data['user_id'] = Auth::id();
            $data['description'] = 'Credit sale';

            Credit::create($data);
        } catch (Exception $e) {
            throw new   Exception($e->getMessage());
        }
    }
}
