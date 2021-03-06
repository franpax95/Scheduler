<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('login', 'App\Http\Controllers\API\UserController@login');
Route::post('register', 'App\Http\Controllers\API\UserController@register');
Route::post('logout', 'App\Http\Controllers\API\UserController@logout');

Route::middleware('auth:api')->group(function() {
    Route::get('user', 'App\Http\Controllers\API\UserController@user');

    Route::get('schedules', 'App\Http\Controllers\API\SchedulesController@get');
    Route::get('schedules/date/{date}', 'App\Http\Controllers\API\SchedulesController@getByDate');
    Route::get('schedules/{id}', 'App\Http\Controllers\API\SchedulesController@find');
    Route::post('schedules', 'App\Http\Controllers\API\SchedulesController@store');

    Route::get('tasks/{id}', 'App\Http\Controllers\API\TasksController@get');
    Route::post('tasks', 'App\Http\Controllers\API\TasksController@store');
    Route::post('tasks/{id}', 'App\Http\Controllers\API\TasksController@update');
    Route::post('tasks/reorder/{schedule_id}', 'App\Http\Controllers\API\TasksController@reorder');
    Route::delete('tasks/{id}', 'App\Http\Controllers\API\TasksController@delete');
});
