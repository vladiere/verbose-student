<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ThingsController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['auth:sanctum'])->get('/todos/{id}', [ThingsController::class, 'index'])->name('todos');
Route::middleware(['auth:sanctum'])->get('/todo/{id}', [ThingsController::class, 'show'])->name('todo');
Route::middleware(['auth:sanctum'])->get('/filter/{filter}', [ThingsController::class, 'filter'])->name('filter');

Route::middleware(['auth:sanctum'])->post('/add', [ThingsController::class, 'store'])->name('add');
Route::middleware(['auth:sanctum'])->post('/update', [ThingsController::class, 'update'])->name('update');
Route::middleware(['auth:sanctum'])->post('/remove', [ThingsController::class, 'destroy'])->name('remove');
