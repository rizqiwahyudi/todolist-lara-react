<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => 'api'], function(){
    Route::get('todos/trash',                    [TodoController::class, 'getDeletedTodos']);
    Route::get('todos/restore/{id}',             [TodoController::class, 'restoreTodo']);
    Route::get('todos/restore',                  [TodoController::class, 'restoreTodos']);
    Route::delete('todos/delete-permanent/{id}', [TodoController::class, 'deletePermanentTodo']);
    Route::delete('todos/delete-permanent',      [TodoController::class, 'deletePermanentTodos']);
    Route::delete('todos/destroy-all',           [TodoController::class, 'destroyAllTodos']);
    Route::resource('todos',                     TodoController::class);
});
