import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:11
* @route '/credits'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/credits',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:11
* @route '/credits'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:11
* @route '/credits'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:11
* @route '/credits'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:11
* @route '/credits'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:11
* @route '/credits'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::index
* @see app/Http/Controllers/CreditController.php:11
* @route '/credits'
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
* @see \App\Http\Controllers\CreditController::create
* @see app/Http/Controllers/CreditController.php:19
* @route '/credits/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/credits/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CreditController::create
* @see app/Http/Controllers/CreditController.php:19
* @route '/credits/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::create
* @see app/Http/Controllers/CreditController.php:19
* @route '/credits/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::create
* @see app/Http/Controllers/CreditController.php:19
* @route '/credits/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CreditController::create
* @see app/Http/Controllers/CreditController.php:19
* @route '/credits/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::create
* @see app/Http/Controllers/CreditController.php:19
* @route '/credits/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::create
* @see app/Http/Controllers/CreditController.php:19
* @route '/credits/create'
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
* @see \App\Http\Controllers\CreditController::store
* @see app/Http/Controllers/CreditController.php:21
* @route '/credits'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/credits',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CreditController::store
* @see app/Http/Controllers/CreditController.php:21
* @route '/credits'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::store
* @see app/Http/Controllers/CreditController.php:21
* @route '/credits'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CreditController::store
* @see app/Http/Controllers/CreditController.php:21
* @route '/credits'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CreditController::store
* @see app/Http/Controllers/CreditController.php:21
* @route '/credits'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\CreditController::show
* @see app/Http/Controllers/CreditController.php:0
* @route '/credits/{credit}'
*/
export const show = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/credits/{credit}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CreditController::show
* @see app/Http/Controllers/CreditController.php:0
* @route '/credits/{credit}'
*/
show.url = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credit: args }
    }

    if (Array.isArray(args)) {
        args = {
            credit: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credit: args.credit,
    }

    return show.definition.url
            .replace('{credit}', parsedArgs.credit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::show
* @see app/Http/Controllers/CreditController.php:0
* @route '/credits/{credit}'
*/
show.get = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::show
* @see app/Http/Controllers/CreditController.php:0
* @route '/credits/{credit}'
*/
show.head = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CreditController::show
* @see app/Http/Controllers/CreditController.php:0
* @route '/credits/{credit}'
*/
const showForm = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::show
* @see app/Http/Controllers/CreditController.php:0
* @route '/credits/{credit}'
*/
showForm.get = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::show
* @see app/Http/Controllers/CreditController.php:0
* @route '/credits/{credit}'
*/
showForm.head = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\CreditController::edit
* @see app/Http/Controllers/CreditController.php:23
* @route '/credits/{credit}/edit'
*/
export const edit = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/credits/{credit}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CreditController::edit
* @see app/Http/Controllers/CreditController.php:23
* @route '/credits/{credit}/edit'
*/
edit.url = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credit: args }
    }

    if (Array.isArray(args)) {
        args = {
            credit: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credit: args.credit,
    }

    return edit.definition.url
            .replace('{credit}', parsedArgs.credit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::edit
* @see app/Http/Controllers/CreditController.php:23
* @route '/credits/{credit}/edit'
*/
edit.get = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::edit
* @see app/Http/Controllers/CreditController.php:23
* @route '/credits/{credit}/edit'
*/
edit.head = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CreditController::edit
* @see app/Http/Controllers/CreditController.php:23
* @route '/credits/{credit}/edit'
*/
const editForm = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::edit
* @see app/Http/Controllers/CreditController.php:23
* @route '/credits/{credit}/edit'
*/
editForm.get = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\CreditController::edit
* @see app/Http/Controllers/CreditController.php:23
* @route '/credits/{credit}/edit'
*/
editForm.head = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\CreditController::update
* @see app/Http/Controllers/CreditController.php:25
* @route '/credits/{credit}'
*/
export const update = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/credits/{credit}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\CreditController::update
* @see app/Http/Controllers/CreditController.php:25
* @route '/credits/{credit}'
*/
update.url = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credit: args }
    }

    if (Array.isArray(args)) {
        args = {
            credit: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credit: args.credit,
    }

    return update.definition.url
            .replace('{credit}', parsedArgs.credit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::update
* @see app/Http/Controllers/CreditController.php:25
* @route '/credits/{credit}'
*/
update.put = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CreditController::update
* @see app/Http/Controllers/CreditController.php:25
* @route '/credits/{credit}'
*/
update.patch = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\CreditController::update
* @see app/Http/Controllers/CreditController.php:25
* @route '/credits/{credit}'
*/
const updateForm = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CreditController::update
* @see app/Http/Controllers/CreditController.php:25
* @route '/credits/{credit}'
*/
updateForm.put = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CreditController::update
* @see app/Http/Controllers/CreditController.php:25
* @route '/credits/{credit}'
*/
updateForm.patch = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CreditController::destroy
* @see app/Http/Controllers/CreditController.php:27
* @route '/credits/{credit}'
*/
export const destroy = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/credits/{credit}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CreditController::destroy
* @see app/Http/Controllers/CreditController.php:27
* @route '/credits/{credit}'
*/
destroy.url = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { credit: args }
    }

    if (Array.isArray(args)) {
        args = {
            credit: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        credit: args.credit,
    }

    return destroy.definition.url
            .replace('{credit}', parsedArgs.credit.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CreditController::destroy
* @see app/Http/Controllers/CreditController.php:27
* @route '/credits/{credit}'
*/
destroy.delete = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\CreditController::destroy
* @see app/Http/Controllers/CreditController.php:27
* @route '/credits/{credit}'
*/
const destroyForm = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CreditController::destroy
* @see app/Http/Controllers/CreditController.php:27
* @route '/credits/{credit}'
*/
destroyForm.delete = (args: { credit: string | number } | [credit: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const CreditController = { index, create, store, show, edit, update, destroy }

export default CreditController