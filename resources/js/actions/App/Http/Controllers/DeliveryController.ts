import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DeliveryController::index
* @see app/Http/Controllers/DeliveryController.php:12
* @route '/deliveries'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/deliveries',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryController::index
* @see app/Http/Controllers/DeliveryController.php:12
* @route '/deliveries'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryController::index
* @see app/Http/Controllers/DeliveryController.php:12
* @route '/deliveries'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryController::index
* @see app/Http/Controllers/DeliveryController.php:12
* @route '/deliveries'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryController::index
* @see app/Http/Controllers/DeliveryController.php:12
* @route '/deliveries'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryController::index
* @see app/Http/Controllers/DeliveryController.php:12
* @route '/deliveries'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryController::index
* @see app/Http/Controllers/DeliveryController.php:12
* @route '/deliveries'
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
* @see \App\Http\Controllers\DeliveryController::create
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/deliveries/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryController::create
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryController::create
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryController::create
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryController::create
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryController::create
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryController::create
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/create'
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
* @see \App\Http\Controllers\DeliveryController::store
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/deliveries',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DeliveryController::store
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryController::store
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryController::store
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryController::store
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\DeliveryController::show
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
export const show = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/deliveries/{delivery}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryController::show
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
show.url = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { delivery: args }
    }

    if (Array.isArray(args)) {
        args = {
            delivery: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        delivery: args.delivery,
    }

    return show.definition.url
            .replace('{delivery}', parsedArgs.delivery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryController::show
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
show.get = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryController::show
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
show.head = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryController::show
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
const showForm = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryController::show
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
showForm.get = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryController::show
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
showForm.head = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DeliveryController::edit
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}/edit'
*/
export const edit = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/deliveries/{delivery}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DeliveryController::edit
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}/edit'
*/
edit.url = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { delivery: args }
    }

    if (Array.isArray(args)) {
        args = {
            delivery: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        delivery: args.delivery,
    }

    return edit.definition.url
            .replace('{delivery}', parsedArgs.delivery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryController::edit
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}/edit'
*/
edit.get = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryController::edit
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}/edit'
*/
edit.head = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DeliveryController::edit
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}/edit'
*/
const editForm = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryController::edit
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}/edit'
*/
editForm.get = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DeliveryController::edit
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}/edit'
*/
editForm.head = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DeliveryController::update
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
export const update = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/deliveries/{delivery}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DeliveryController::update
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
update.url = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { delivery: args }
    }

    if (Array.isArray(args)) {
        args = {
            delivery: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        delivery: args.delivery,
    }

    return update.definition.url
            .replace('{delivery}', parsedArgs.delivery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryController::update
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
update.put = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DeliveryController::update
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
update.patch = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DeliveryController::update
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
const updateForm = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryController::update
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
updateForm.put = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryController::update
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
updateForm.patch = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DeliveryController::destroy
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
export const destroy = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/deliveries/{delivery}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DeliveryController::destroy
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
destroy.url = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { delivery: args }
    }

    if (Array.isArray(args)) {
        args = {
            delivery: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        delivery: args.delivery,
    }

    return destroy.definition.url
            .replace('{delivery}', parsedArgs.delivery.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DeliveryController::destroy
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
destroy.delete = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DeliveryController::destroy
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
const destroyForm = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DeliveryController::destroy
* @see app/Http/Controllers/DeliveryController.php:0
* @route '/deliveries/{delivery}'
*/
destroyForm.delete = (args: { delivery: string | number } | [delivery: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const DeliveryController = { index, create, store, show, edit, update, destroy }

export default DeliveryController