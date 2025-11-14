<?php

use App\Http\Middleware\UserHasARole;
use Illuminate\Foundation\Application;
use App\Http\Middleware\CheckSuperAdmin;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\SuperAdminExists;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\CheckIfSystemIsInstalled;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\CheckIfSystemIsWellConfigured;
use App\Http\Middleware\EnsureSystemNotMarkedAsInstalled;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'installed' => CheckIfSystemIsInstalled::class,
            'configured' => CheckIfSystemIsWellConfigured::class,
            'user.has.role' => UserHasARole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
