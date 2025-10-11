<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
trait HandlesUniqueRestore
{
    /**
     * Handle the unique restore.
     *
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */

     /* unique restore attributes */
    public static function bootHandlesUniqueRestore()
    {
        static::restoring(function (Model $model) {
            $errors = [];

            foreach ($model->uniqueRestoreAttributes as $attribute) {
                $conflict = $model->newQuery()
                    ->where($attribute, $model->{$attribute})
                    ->whereNull('deleted_at') // check only active records
                    ->exists();

                if ($conflict) {
                    $errors[$attribute] = "The {Str::ucfirst($attribute)} '{Str::ucfirst($model->{$attribute})}' is already taken and prevents restoring.";
                }
            }

            if (!empty($errors)) {
                // Create a fake validator just to throw a ValidationException
                $validator = Validator::make([], []);
                throw new ValidationException($validator, response()->json([
                    'message' => 'Restore failed due to unique constraint.',
                    'errors' => $errors,
                ], 422));
            }
        });
    }


    /* check if restoring would cause conflict with an active record */
    protected function checkUniqueConflict(string $attribute): bool
    {
        return static::where($attribute,$this->getAttribute($attribute))->whereNull('deleted_at')->exists();
    }
}
