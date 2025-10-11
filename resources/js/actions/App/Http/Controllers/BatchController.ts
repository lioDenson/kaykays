import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BatchController::index
* @see app/Http/Controllers/BatchController.php:18
* @route '/batches'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/batches',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BatchController::index
* @see app/Http/Controllers/BatchController.php:18
* @route '/batches'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BatchController::index
* @see app/Http/Controllers/BatchController.php:18
* @route '/batches'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BatchController::index
* @see app/Http/Controllers/BatchController.php:18
* @route '/batches'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BatchController::index
* @see app/Http/Controllers/BatchController.php:18
* @route '/batches'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BatchController::index
* @see app/Http/Controllers/BatchController.php:18
* @route '/batches'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BatchController::index
* @see app/Http/Controllers/BatchController.php:18
* @route '/batches'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\BatchController::create
* @see app/Http/Controllers/BatchController.php:27
* @route '/batches/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/batches/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BatchController::create
* @see app/Http/Controllers/BatchController.php:27
* @route '/batches/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BatchController::create
* @see app/Http/Controllers/BatchController.php:27
* @route '/batches/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BatchController::create
* @see app/Http/Controllers/BatchController.php:27
* @route '/batches/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BatchController::create
* @see app/Http/Controllers/BatchController.php:27
* @route '/batches/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BatchController::create
* @see app/Http/Controllers/BatchController.php:27
* @route '/batches/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BatchController::create
* @see app/Http/Controllers/BatchController.php:27
* @route '/batches/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\BatchController::store
* @see app/Http/Controllers/BatchController.php:38
* @route '/batches'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/batches',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BatchController::store
* @see app/Http/Controllers/BatchController.php:38
* @route '/batches'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\BatchController::store
* @see app/Http/Controllers/BatchController.php:38
* @route '/batches'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BatchController::store
* @see app/Http/Controllers/BatchController.php:38
* @route '/batches'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BatchController::store
* @see app/Http/Controllers/BatchController.php:38
* @route '/batches'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\BatchController::show
* @see app/Http/Controllers/BatchController.php:52
* @route '/batches/{batch}'
*/
export const show = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/batches/{batch}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BatchController::show
* @see app/Http/Controllers/BatchController.php:52
* @route '/batches/{batch}'
*/
show.url = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { batch: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { batch: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            batch: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        batch: typeof args.batch === 'object'
        ? args.batch.id
        : args.batch,
    }

    return show.definition.url
            .replace('{batch}', parsedArgs.batch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BatchController::show
* @see app/Http/Controllers/BatchController.php:52
* @route '/batches/{batch}'
*/
show.get = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BatchController::show
* @see app/Http/Controllers/BatchController.php:52
* @route '/batches/{batch}'
*/
show.head = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BatchController::show
* @see app/Http/Controllers/BatchController.php:52
* @route '/batches/{batch}'
*/
const showForm = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BatchController::show
* @see app/Http/Controllers/BatchController.php:52
* @route '/batches/{batch}'
*/
showForm.get = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BatchController::show
* @see app/Http/Controllers/BatchController.php:52
* @route '/batches/{batch}'
*/
showForm.head = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\BatchController::edit
* @see app/Http/Controllers/BatchController.php:61
* @route '/batches/{batch}/edit'
*/
export const edit = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/batches/{batch}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BatchController::edit
* @see app/Http/Controllers/BatchController.php:61
* @route '/batches/{batch}/edit'
*/
edit.url = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { batch: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { batch: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            batch: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        batch: typeof args.batch === 'object'
        ? args.batch.id
        : args.batch,
    }

    return edit.definition.url
            .replace('{batch}', parsedArgs.batch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BatchController::edit
* @see app/Http/Controllers/BatchController.php:61
* @route '/batches/{batch}/edit'
*/
edit.get = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BatchController::edit
* @see app/Http/Controllers/BatchController.php:61
* @route '/batches/{batch}/edit'
*/
edit.head = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BatchController::edit
* @see app/Http/Controllers/BatchController.php:61
* @route '/batches/{batch}/edit'
*/
const editForm = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BatchController::edit
* @see app/Http/Controllers/BatchController.php:61
* @route '/batches/{batch}/edit'
*/
editForm.get = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\BatchController::edit
* @see app/Http/Controllers/BatchController.php:61
* @route '/batches/{batch}/edit'
*/
editForm.head = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\BatchController::update
* @see app/Http/Controllers/BatchController.php:74
* @route '/batches/{batch}'
*/
export const update = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/batches/{batch}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\BatchController::update
* @see app/Http/Controllers/BatchController.php:74
* @route '/batches/{batch}'
*/
update.url = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { batch: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { batch: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            batch: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        batch: typeof args.batch === 'object'
        ? args.batch.id
        : args.batch,
    }

    return update.definition.url
            .replace('{batch}', parsedArgs.batch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BatchController::update
* @see app/Http/Controllers/BatchController.php:74
* @route '/batches/{batch}'
*/
update.put = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\BatchController::update
* @see app/Http/Controllers/BatchController.php:74
* @route '/batches/{batch}'
*/
update.patch = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\BatchController::update
* @see app/Http/Controllers/BatchController.php:74
* @route '/batches/{batch}'
*/
const updateForm = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BatchController::update
* @see app/Http/Controllers/BatchController.php:74
* @route '/batches/{batch}'
*/
updateForm.put = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BatchController::update
* @see app/Http/Controllers/BatchController.php:74
* @route '/batches/{batch}'
*/
updateForm.patch = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\BatchController::destroy
* @see app/Http/Controllers/BatchController.php:81
* @route '/batches/{batch}'
*/
export const destroy = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/batches/{batch}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BatchController::destroy
* @see app/Http/Controllers/BatchController.php:81
* @route '/batches/{batch}'
*/
destroy.url = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { batch: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { batch: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            batch: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        batch: typeof args.batch === 'object'
        ? args.batch.id
        : args.batch,
    }

    return destroy.definition.url
            .replace('{batch}', parsedArgs.batch.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BatchController::destroy
* @see app/Http/Controllers/BatchController.php:81
* @route '/batches/{batch}'
*/
destroy.delete = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\BatchController::destroy
* @see app/Http/Controllers/BatchController.php:81
* @route '/batches/{batch}'
*/
const destroyForm = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BatchController::destroy
* @see app/Http/Controllers/BatchController.php:81
* @route '/batches/{batch}'
*/
destroyForm.delete = (args: { batch: number | { id: number } } | [batch: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\BatchController::restore
* @see app/Http/Controllers/BatchController.php:0
* @route '/batches/{id}/restore'
*/
export const restore = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: restore.url(args, options),
    method: 'patch',
})

restore.definition = {
    methods: ["patch"],
    url: '/batches/{id}/restore',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\BatchController::restore
* @see app/Http/Controllers/BatchController.php:0
* @route '/batches/{id}/restore'
*/
restore.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return restore.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BatchController::restore
* @see app/Http/Controllers/BatchController.php:0
* @route '/batches/{id}/restore'
*/
restore.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: restore.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\BatchController::restore
* @see app/Http/Controllers/BatchController.php:0
* @route '/batches/{id}/restore'
*/
const restoreForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BatchController::restore
* @see app/Http/Controllers/BatchController.php:0
* @route '/batches/{id}/restore'
*/
restoreForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: restore.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

restore.form = restoreForm

/**
* @see \App\Http\Controllers\BatchController::forceDelete
* @see app/Http/Controllers/BatchController.php:0
* @route '/batches/{id}/forceDelete'
*/
export const forceDelete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: forceDelete.url(args, options),
    method: 'delete',
})

forceDelete.definition = {
    methods: ["delete"],
    url: '/batches/{id}/forceDelete',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\BatchController::forceDelete
* @see app/Http/Controllers/BatchController.php:0
* @route '/batches/{id}/forceDelete'
*/
forceDelete.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return forceDelete.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BatchController::forceDelete
* @see app/Http/Controllers/BatchController.php:0
* @route '/batches/{id}/forceDelete'
*/
forceDelete.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: forceDelete.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\BatchController::forceDelete
* @see app/Http/Controllers/BatchController.php:0
* @route '/batches/{id}/forceDelete'
*/
const forceDeleteForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: forceDelete.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BatchController::forceDelete
* @see app/Http/Controllers/BatchController.php:0
* @route '/batches/{id}/forceDelete'
*/
forceDeleteForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: forceDelete.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

forceDelete.form = forceDeleteForm

const BatchController = { index, create, store, show, edit, update, destroy, restore, forceDelete }

export default BatchController