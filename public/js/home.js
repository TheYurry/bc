(function () {
  ('use strict');
    document.addEventListener("DOMContentLoaded", function(event) {
      initSearchBar();
      loadScript('https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js',initMap);
    });


    function initSearchBar(){
      $(document).ready(function() {
        var r2rAutocomplete = new Bloodhound({
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          remote: {
            url: 'https://www.rome2rio.com/api/1.2/json/autocomplete?query=%QUERY&resultType=r2r',
            wildcard: '%QUERY',
            filter: function(response) {
              return response.places;
            }
          }
        });
        $('#search-bar').typeahead({ hint: true,
          highlight: true,
          minLength: 1
        }, {
          name: 'best-pictures',
          displayKey: function(countries) {
            return countries.longName;
          },
          source: r2rAutocomplete
        }).on('typeahead:selected', function(event, data){
          console.log(data);
          $('#search-data').val(JSON.stringify(data));
        });
      })
    }

    function makeGeoJSON(data){
       var geojson = {
        type: 'FeatureCollection',
        features: []
      };
      var features = [];
      console.log(
        data
      );
      data.forEach(function(item){
        features.push({
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [item.lng,item.lat]
          },
          "properties": {
            "title": "Mapbox SF",
            "description": "155 9th St, San Francisco",
            'marker-color': '#f86767',
            'marker-size': 'large',
            'marker-symbol': 'star',
          }
        })
      })
      geojson.features = features;

      return geojson;
    }

    function initMap(){
      L.mapbox.accessToken = 'pk.eyJ1IjoidGhleXVycnkiLCJhIjoiY2lvOHRmMTZtMDA2c3Z5bHlicTNwZm9qaCJ9.TQBntaKZdYrhFkB2E7Zu7g';

      var map =  L.mapbox.map('main_map','mapbox.streets');

      var geojson = makeGeoJSON($('#main_map').data('map').places);

      map.featureLayer.setGeoJSON(geojson);

    }

    function loadScript(src, callback){
      var s,
          r,
          t;
      r = false;
      s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = src;
      s.onload = s.onreadystatechange = function() {
        //console.log( this.readyState ); //uncomment this line to see which ready states are called.
        if ( !r && (!this.readyState || this.readyState == 'complete') )
        {
          r = true;
          callback();
        }
      };
      t = document.getElementsByTagName('script')[0];
      t.parentNode.insertBefore(s, t);
    }



}());
