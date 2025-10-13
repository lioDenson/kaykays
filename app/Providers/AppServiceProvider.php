<?php

namespace App\Providers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\SaleItem;
use App\Observers\ProductObserver;
use App\Observers\SaleItemObserver;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        if(app()->environment('production')){
            URL::forceScheme('https');
        }
        Product::observe(ProductObserver::class);
        SaleItem::observe(SaleItemObserver::class);
        Inertia::share(
            [
                'app' => [
                    'name' => config('app.name'),
                    'version' => config('app.version'),
                    'url' => config('app.url'),
                ],
                'auth' => [
                    'user' => Auth::user(),
                ],
            ]
        );
    }
}
