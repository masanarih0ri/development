
//mapを描画する
function map_canvas() {
//マーカーの情報を配列に入れる
var data = [];
//緯度と経度とurlの情報をdata内に入れる。以下、要編集。
var lat = document.getElementById('latdata').innerHTML;
var latarray = lat.split(',');
latarray.pop();

var lng = document.getElementById('lngdata').innerHTML;
var lngarray = lng.split(',');
lngarray.pop();

var namedata = document.getElementById('namedata').innerHTML;
var namedataarray = namedata.split(',');
namedataarray.pop();


for(var i = 0; i < latarray.length; i++){
  data.push({
    name:namedataarray[i],
    lat:latarray[i],
    lng:lngarray[i]
  });

}
//初期位置に、上記配列の一番初めの緯度経度を格納
  var latlng = new google.maps.LatLng(data[0].lat, data[0].lng); //データの0番目のlatとlngを初期値に設定

//地図の設定を決める
  var opts = {
    zoom: 12,//地図の縮尺
    center: latlng, //初期位置
    scrollwheel: false,
    // mapTypeId: google.maps.MapTypeId.ROADMAP//地図形態
    mapTypeControlOptions: { mapTypeIds: ['style', google.maps.MapTypeId.ROADMAP] }
    };
 
//地図を表示させるエリアのidを指定し、オプションを設定した地図をmapという変数に入れる
  var map = new google.maps.Map(document.getElementById('map'), opts);
  // var markers = new Array();

  /*アイコン設定▼*/
  var icon = new google.maps.MarkerImage('icon.png',
    new google.maps.Size(30,48),/*アイコンサイズ設定*/
    new google.maps.Point(0,0)/*アイコン位置設定*/
    );

//マーカーを配置するループを実行
  for (i = 0; i < data.length; i++) {
    var markers = new google.maps.Marker({
      position: new google.maps.LatLng(data[i].lat, data[i].lng), //マーカの位置を指定しdataのi番目の緯度と経度をセット
      map: map, //map = new google.maps.Map(document.getElementById('map'),opts)これによってマップを生成。
      icon: icon
    });
   
  }

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

  var styledMapOptions = { name: 'サンプル' }/*地図右上のタイトル*/
  var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('style', sampleType);
  map.setMapTypeId('style');

  var date = new Date();
  var hours = date.getHours(); 
  console.log(hours)

  //地図を条件によって変化させる
  if(hours == 14){
    var styleOptions = [
 
/*★★ここからカスタマイズしたデザインのJSONコードを貼り付け！★★*/
    {
    "stylers": [
      { "hue": "#e0e0e0" }
    ]
  },{
    "featureType": "road.highway",
    "stylers": [
      { "visibility": "off" }
    ]
  }
/*★★ここまでカスタマイズしたデザインのJSONコードを貼り付け！★★*/
 
];

var styledMapOptions = { name: 'サンプル' }/*地図右上のタイトル*/
  var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('style', sampleType);
  map.setMapTypeId('style');
  }

}

//地図描画を実行
google.maps.event.addDomListener(window, 'load', map_canvas); 