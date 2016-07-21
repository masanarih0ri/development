
$(function(){
  $('#sub li').on('mouseover',function(){
    $(this).css({
      'background-color': '#f8d815',
      'letter-spacing':'3px'
    });
    $(this).find('a').css('color','#0068a7');
  });
  $('#sub li').on('mouseout',function(){
    $(this).css({
      'background-color': '#0068a7',
      'letter-spacing':'2px'
    });
    $(this).find('a').css('color','#fff');
  });

});

function map_canvas() {
//マーカーの情報を配列に入れる
  var data = new Array();
//緯度と経度とurlの情報をdata内に入れる。以下、要編集。

//R-STORE OFFICE
    data.push({
      name:'R-STORE',
      lat: '35.629343', //緯度
      lng: '139.715401', //経度
      content: 'R-STORE',
      url: 'http://www.r-store.jp/' //リンク先
    });
//代々木公園 立地と配置
    data.push({
      name:'代々木公園 立地と配置',
      lat: '35.6690733000',
      lng: '139.6904072000',
      url: 'http://www.r-store.jp/room/82030'
  });
//中目黒 ウイスキーが、お好きでしょ
    data.push({
      name:'中目黒 ウイスキーが、お好きでしょ',
      lat: '35.6497423000',
      lng: '139.6913938000',
      url: 'http://www.r-store.jp/room/81985'
  });

//綱島 住めば都の綱島ライフ(withペット) 
    data.push({
      name:'綱島 住めば都の綱島ライフ(withペット)',
      lat: '35.5329647000',
      lng: '139.6578051000',
      url: 'http://www.r-store.jp/room/81922'
  });

//巣鴨  キッチンびいき
    data.push({
      name:'巣鴨  キッチンびいき',
      lat: '35.7408057000',
      lng: '139.7289094000',
      url: 'http://www.r-store.jp/room/82592'
  });

//狛江　イイトコドリレトロ
    data.push({
      name:'狛江　イイトコドリレトロ',
      lat: '35.6388657000',
      lng: '139.5746126000',
      url: 'http://www.r-store.jp/room/81264'
  });

//等々力 白と無垢のデザイナーズ
    data.push({
      name:'等々力 白と無垢のデザイナーズ',
      lat: '35.6084687000',
      lng: '139.6432802000',
      url: 'http://www.r-store.jp/room/82516'
  });
//緑が丘 1DK+土間
    data.push({
      name:'緑が丘 1DK+土間',
      lat: '35.6079441000',
      lng: '139.6779240000',
      url: 'http://www.r-store.jp/room/20466'
  });
//祐天寺 コンパクトカフェ
    data.push({
      name:'祐天寺 コンパクトカフェ',
      lat: '35.6401289000',
      lng: '139.6899808000',
      url: 'http://www.r-store.jp/room/79980'
  });
//目黒 ゴージャスバスタイム
    data.push({
      name:'目黒 ゴージャスバスタイム',
      lat: '35.6351919000',
      lng: '139.7043180000',
      url: 'http://www.r-store.jp/room/80734'
  });
    //10終わり

//初期位置に、上記配列の一番初めの緯度経度を格納
  var latlng = new google.maps.LatLng(data[0].lat, data[0].lng); //データの0番目のlatとlngを初期値に設定

//地図の設定を決める
  var opts = {
    zoom: 13,//地図の縮尺
    center: latlng, //初期位置
    scrollwheel: false,
    // mapTypeId: google.maps.MapTypeId.ROADMAP//地図形態
    mapTypeControlOptions: { mapTypeIds: ['style', google.maps.MapTypeId.ROADMAP] }
    };
 
//地図を表示させるエリアのidを指定し、オプションを設定した地図をmapという変数に入れる
  var map = new google.maps.Map(document.getElementById('map'), opts);
  // var markers = new Array();

//マーカーを配置するループを実行
  for (i = 0; i < data.length; i++) {
    var markers = new google.maps.Marker({
      position: new google.maps.LatLng(data[i].lat, data[i].lng), //マーカの位置を指定しdataのi番目の緯度と経度をセット
      map: map //map = new google.maps.Map(document.getElementById('map'),opts)これによってマップを生成。
    });

    var contentsdetail = '<p>' + data[i].name + '</p>'
    // console.log(data[i].name)
    var infowindow = new google.maps.InfoWindow({
      content: contentsdetail
    });
  
    showwindow();
   
  }

  function showwindow(){
    markers.addListener('click', function() {
      infowindow.open(map, markers);
    });
    console.log(markers);
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


function count_time(){
      var timer = document.getElementById('time');
      var date = new Date();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      timer.innerHTML = date.toLocaleString();
    }
window.onload = function(){
      setInterval(count_time,1000);
    }


//地図描画を実行
google.maps.event.addDomListener(window, 'load', map_canvas);

$(".tiny-toggle").tinyToggle();
