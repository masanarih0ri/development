//マップの初期状態のセット
function initAutocomplete() {
  var lat = 35.681382;
  var lng = 139.766084;
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: lng},
    zoom: 15,
    scrollwheel: false,
    mapTypeControlOptions: { mapTypeIds: ['style', google.maps.MapTypeId.ROADMAP] }
  });

  function writeinputbox(){
    var mk = markers[ 0 ];
    var lnglat = mk.getPosition();
    var latitude = lnglat.lat(); // 経度 latitude
    var longitude = lnglat.lng(); // 緯度 longitude
    var latdata = document.getElementById('latdata');
    var lngdata = document.getElementById('lngdata');
    var inputdata = document.getElementById('pac-input');
    var serchkeyworddata = document.getElementById('serchkeyworddata');
    var searchkeyword = inputdata.value;

    latdata.value = latitude;
    lngdata.value = longitude;
    serchkeyworddata.value = searchkeyword;
  }

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    //placesに何もなければ処理を終了
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });

    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(10, 10),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        // icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      writeinputbox();
      
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);

      } else {
        bounds.extend(place.geometry.location);
        // bounds.extend(place.geometry.viewport);
      }
    });
    if(bounds === bounds){
      map.fitBounds(bounds);
      map.setZoom(17);
     
    }else{
      map.fitBounds(bounds);
    }
    
  });
  // [END region_getplaces]

  var styleOptions = [
 
/*★★ここからカスタマイズしたデザインのJSONコードを貼り付け！★★*/
    {
    "stylers": [
      { "hue": "#0077ff" }
    ]
  },{
    "featureType": "road.highway",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "administrative",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "poi",
    "stylers": [
      { "visibility": "simplified" }
    ]
  },{
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      { "visibility": "off" }
    ]
  }   
/*★★ここまでカスタマイズしたデザインのJSONコードを貼り付け！★★*/
 
];

  var styledMapOptions = { name: '検索' }/*地図右上のタイトル*/
  var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('style', sampleType);
  map.setMapTypeId('style');
}

