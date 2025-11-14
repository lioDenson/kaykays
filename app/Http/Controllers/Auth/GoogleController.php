<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\DB;

class GoogleController extends Controller
{
    public function redirect(Request $request)
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(Request $request)
    {
        $googleUSer = Socialite::driver('google')->user();

        try {
            DB::transaction(function () use ($googleUSer) {

                Setting::where('id', 1)->update(['installed' => true]);

                $user = User::updateOrCreate(
                    [
                        'google_id' => $googleUSer->id,
                        'name' => $googleUSer->name,
                    ],
                    [
                        'avatar' => $googleUSer->picture,
                        'name' => $googleUSer->name,
                        'email' => $googleUSer->email,
                        'google_token' => $googleUSer->token,
                        'email_verified_at' => now(),
                    ]
                );
                if (!User::role('super-admin')->exists() && Setting::first()->value('installed') && User::count() == 1) {
                    $user->assignRole('super-admin');
                }
                Auth::login($user);
            });

            return redirect()->route('dashboard');
        } catch (\Exception $e) {
            dd($e->getMessage());
            return redirect()->back()->with('error', "A problem ocurred when logging in with google {$e->getMessage()}");
        }
    }
}
