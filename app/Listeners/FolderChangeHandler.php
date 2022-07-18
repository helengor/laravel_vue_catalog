<?php

namespace App\Listeners;

use App\Events\FolderChange;
use App\Jobs\TelegramJob;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Http;

class FolderChangeHandler
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\DocumentNameChange  $event
     * @return void
     */
    public function handle(FolderChange $event)
    {
        $message = 'Папка изменена';

        if($event->type){
            switch($event->type){
                case 'store':
                    $message = 'Была добавлена папка';
                    break;
                case 'update':
                    $message = 'Была изменена папка';
                    break;
            }
        }

        TelegramJob::dispatch($message)->onQueue('telegram');

    }
}
