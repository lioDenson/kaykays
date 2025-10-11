<?php

namespace App\Listeners;

use App\Events\AppInstalled;
use App\Models\Setting;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class MarkAppAsInstalled
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(AppInstalled $event): void
    {
        $this->setAppInstalled();
    }

    protected function setAppInstalled(): void
    {
        $path = base_path('.env');
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $found = false;
        foreach ($lines as $key => $line) {
            if (strpos($line, 'APP_INSTALLED=') === 0) {
                $found = true;
                $lines[$key] = 'APP_INSTALLED=true';
            }
        }
        if (! $found) {
            $lines[] = 'APP_INSTALLED=true';
        }
        Setting::create([
            'installed' => true
        ]);
        // make the file writable
        chmod($path, 0664);
        file_put_contents($path, implode("\n", $lines));
        // make the file readonly
        chmod($path, 0444);
    }
}
