<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Spatie\Searchable\SearchResult;
use Spatie\Searchable\Searchable;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class User extends Authenticatable implements Searchable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    use HasRoles, SoftDeletes;

    public function getSearchResult(): SearchResult
    {

        return new SearchResult(
            $this,
            $this->name, // the field to display in results
            '#'
        );
    }


    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'account_id',
        'password',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected function name(): Attribute
    {
        return Attribute::make(
            set: fn($value) => strtolower($value),
            get: fn($value) => ucwords(strtolower($value)),
        );
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }


    public function accounts()
    {
        return $this->belongsToMany(Account::class, 'account_users', 'user_id', 'account_id')->withTimestamps();
    }

    public function customer(){
        return $this->hasOneThrough(Customer::class, Sale::class);
    }

    public function rider()
    {
        return $this->hasOne(Rider::class);
    }



    public static function boot()
    {
        parent::boot();
        static::created(function ($user) {
            if ($user->hasAnyRole(['admin', 'super-admin'])) {
                $allAccounts = Account::pluck('id');
                $user->account()->syncWithoutDetaching($allAccounts);
            }
        });
    }
}
