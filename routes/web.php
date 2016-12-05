<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/home', 'HomeController@index');
Route::get('/', 'HomeController@index');

Route::get('place/crawl','PlaceController@crawl');
Route::post('place/{id}','PlaceController@destroy');
Route::resource('place','PlaceController');

Route::resource('settings','settingsController');

Route::get('backend', function()
{
    return View::make('backend', array());
});


Auth::routes();