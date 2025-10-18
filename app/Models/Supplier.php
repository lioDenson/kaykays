<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    /** @use HasFactory<\Database\Factories\SupplierFactory> */
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'company_name',
        'contact_person',
        'phone',
        'email',
        'address',
        'description'
    ];
    public function account()
    {
        return $this->belongsTo(Account::class);
    }
    public function batch()
    {
        return $this->hasMany(Batch::class);
    }
}
