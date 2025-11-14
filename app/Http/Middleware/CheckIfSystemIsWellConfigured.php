<?php

namespace App\Http\Middleware;

use App\Models\Setting;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use PHPUnit\Event\Telemetry\System;
use Symfony\Component\HttpFoundation\Response;

class CheckIfSystemIsWellConfigured
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Setting::first()->value('installed')) {
            return redirect()->route('home');
        } 
        return $next($request);
    }
}
