<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BatchController;
use App\Http\Controllers\RiderController;
use App\Http\Controllers\CreditController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\StockMovementController;

Route::middleware('admin.exists')->group(function () {
    Route::get('/super-admin', [SuperAdminController::class, 'index'])->name('super-admin.index');
    Route::get('/super-admin/create', [SuperAdminController::class, 'create'])->name('super-admin.create');
    Route::post('/super-admin', [SuperAdminController::class, 'store'])->name('super-admin.store');
});


Route::middleware('installed')->group(function () {
    Route::get('/', function () {
        return Inertia::render('welcome');
    })->name('home');

    Route::middleware(['auth', 'verified'])->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');
        Route::delete('/accounts/{id}/forceDelete', [AccountController::class, 'forceDelete'])->name('accounts.forceDelete');
        Route::patch('/accounts/{id}/restore', [AccountController::class, 'restore'])->name('accounts.restore');
        Route::resource('accounts', AccountController::class);

        Route::resource('products', ProductController::class);
        Route::patch('/products/{id}/restore', [ProductController::class, 'restore'])->name('products.restore');
        Route::delete('/products/{id}/forceDelete', [ProductController::class, 'forceDelete'])->name('products.forceDelete');

        Route::post('/user/roles', [UserController::class, 'userSetRole'])->name('users.setRole');
        Route::get('/users/roles', [UserController::class, 'userRolling'])->name('users.roles');
        Route::get('/users/search', [UserController::class, 'search'])->name('users.search');
        Route::get('/users/type/{type}', [UserController::class, 'index'])->name('users.byType');
        Route::resource('users', UserController::class);
        Route::patch('/users/{id}/restore', [UserController::class, 'restore'])->name('users.restore');
        Route::delete('/users/{id}/forceDelete', [UserController::class, 'forceDelete'])->name('users.forceDelete');

        Route::resource('riders', RiderController::class);
        Route::patch('/riders/{id}/restore', [RiderController::class, 'restore'])->name('riders.restore');
        Route::delete('/riders/{id}/forceDelete', [RiderController::class, 'forceDelete'])->name('riders.forceDelete');


        Route::resource('customers', CustomerController::class);
        Route::patch('/customers/{id}/restore', [CustomerController::class, 'restore'])->name('customers.restore');
        Route::delete('/customers/{id}/forceDelete', [CustomerController::class, 'forceDelete'])->name('customers.forceDelete');

        Route::resource('batches', BatchController::class);
        Route::patch('/batches/{id}/restore', [BatchController::class, 'restore'])->name('batches.restore');
        Route::delete('/batches/{id}/forceDelete', [BatchController::class, 'forceDelete'])->name('batches.forceDelete');

        Route::resource('/sales', SaleController::class);
        Route::get('/deliveries/details',[DeliveryController::class, 'details'])->name('deliveries.details');
        Route::resource('/deliveries', DeliveryController::class);
        Route::resource('/payments', PaymentController::class);
        Route::resource('/transactions', TransactionController::class);
        Route::get('/credits', [CreditController::class, 'index'])->name('credits.index');
        Route::post('/credits', [CreditController::class, 'pay'])->name('credits.pay');
        Route::get('/credits/{credit}/pay', [CreditController::class, 'pay'])->name('credit.pay');
        Route::resource('/suppliers', SupplierController::class);
        Route::patch('/suppliers/{id}/restore', [SupplierController::class, 'restore'])->name('suppliers.restore');
        Route::delete('/suppliers/{id}/forceDelete', [SupplierController::class, 'forceDelete'])->name('suppliers.forceDelete');
    });
});





require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
