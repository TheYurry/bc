<?php

namespace App;

class Place extends \NeoEloquent {

  /**
   * one user to many Places
   */
  public function setData($data) {
    foreach ($data as $key => $val) {
      $this->{$key} = $val;
    }
    return $this;
  }

  public static function findOrCreate($data) {
    $place = static::where('canonicalName', $data->canonicalName)->first();

    if (!$place) {
      $place = new Place();
      $place->setData($data);

      $place->save();

      //dd($place);
        //->save();
    }
    return $place;
  }

  //public function route() {
   // return $this->hasMany('App\Place', 'ROUTE');
  //}

  public function routes() {
    return $this->hasMany('App\Place', 'ROUTES');
  }

  public function queue() {
    return $this->hasMany('App\Place', 'QUEUE');
  }

//  public function segment() {
//    return $this->hasMany('App\Place', 'SEGMENT');
//  }

  public function cache() {
    return $this->hasMany('App\Place', 'CACHE');
  }

  public function followers(){
    return $this->belongsToMany('App\User','FOLLOWS');
  }

}
