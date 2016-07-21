		var syncerWatchPosition = {
		count: 0,
		lastTime: 0,
		map: null,
		marker: null
	};

	//成功した時の関数
	function successFunc(position){

		//現在地の緯度経度表示
		var currentlat = position.coords.latitude;
		var currentlng = position.coords.longitude;
		var NOWPOSITION = new google.maps.LatLng(currentlat, currentlng); // 現在地
		//各地変数
		var TOKYO = new google.maps.LatLng(35.681382, 139.76608399999998); // 東京駅
		var OSAKA = new google.maps.LatLng(34.701909, 135.49497700000006); // 大阪駅
		//東京との距離
		var distance = google.maps.geometry.spherical.computeDistanceBetween(TOKYO, NOWPOSITION);
		console.log(distance);
		//マーカーの情報を配列に入れる
		var data = [];
		var distancedata = [];
		var PLACE = [];
		//緯度と経度とurlの情報をdata内に入れる。以下、要編集。
		var lat = document.getElementById('latdata').innerHTML;
		var latarray = lat.split(',');
		latarray.pop();

		var lng = document.getElementById('lngdata').innerHTML;
		var lngarray = lng.split(',');
		lngarray.pop();
		

		for(var i = 0; i < latarray.length; i++){
		  data.push({
		    lat:latarray[i],
		    lng:lngarray[i]
		});
		  //距離計算
		  var PLACE = new google.maps.LatLng(latarray[i],lngarray[i]);
		  // console.log(PLACE);
		  var distancedata = google.maps.geometry.spherical.computeDistanceBetween(PLACE, NOWPOSITION);
		  console.log(distancedata);

		  
		  if(distancedata < 3000){
		  	var distancetext = document.getElementById('distancetext');
		  	

		  	//Ajax
		    $.ajax({
		      type: 'POST', //GET,POST
		      url: 'exec.php', //通信先URL
		      timeout: 3000,
		      dataType: 'html',   //text, html, xml, json, jsonp, script
		      data:{key:"AIzaSyDn3NICsO3JyV2guCAmXM1tE-9UTAEgDKI"},
		        success: function( data ) {
		            //$("#ajax_status").html(data);
		          console.log("PUSH");
		        }
		      });
		  	// serviceworkerはじまり
		  	self.addEventListener('push', function(event) {
				  console.log('Received a push message', event);
				  console.log('プッシュ通知しました');

				  var title = 'Caution!!';
				  var body = '近くに無駄遣いをした場所があります。';
				  var icon = 'caution.png';
				  var tag = 'simple-push-demo-notification-tag';
				  var url = 'https://moneylocation.jp/mainpage.php';

				  //event.waitUntil は Promise をとり、インストールにかかる時間と、与えた処理が成功したかどうかを知るために使われる。

				  event.waitUntil(
				    self.registration.showNotification(title, {
				      body: body,
				      icon: icon,
				      tag: tag,
				      data: {
				        url: url
				      }
				    })
				  );
				});

				self.addEventListener('notificationclick', function(event) {
				  console.log('On notification click: ', event.notification.tag);
				  event.notification.close();

				 var notoficationURL = "/"
				  if (event.notification.data.url) {
				    notoficationURL = event.notification.data.url
				  }
				  

				  event.waitUntil(clients.matchAll({
				    type: 'window'
				  }).then(function(clientList) {
				    for (var i = 0; i < clientList.length; i++) {
				      var client = clientList[i];
				      if (client.url === '/' && 'focus' in client) {
				        return client.focus();
				      }
				    }
				    if (clients.openWindow) {
				      return clients.openWindow(notoficationURL);
				    }
				  }));
				});
		  	// serviceworker終わり 
		 }
		}
		//データの更新
		syncerWatchPosition.count++;
		var nowTime = ~~(new Date() / 1000);
		console.log(nowTime);
		//前回の書き出しから3秒以上経っていたら描写をする
		if(syncerWatchPosition.lastTime + 3 > nowTime){
			return false;
		}
		document.getElementById('result').innerHTML 
		= '<dt>緯度</dt><dd>' + position.coords.latitude + '</dd><dt>軽度</dt><dd>' + position.coords.longitude 
		+ '</dd><dt>高度</dt><dd>' + position.coords.altitude + '</dd><dt>速度</dt><dd>' + position.coords.speed 
		+ '</dd><dt>実行回数</dt><dd>' + syncerWatchPosition.count + '回</dd>'
		+'<dt>東京駅との距離</dt><dd>' + distance + 'm</dd>';
		//位置情報
		var latlng = new google.maps.LatLng(currentlat,currentlng);
		//Google Mapsに書き出し
		if(syncerWatchPosition.map == null){
			syncerWatchPosition.map = new google.maps.Map(document.getElementById('map'), {
				zoom: 17,
				center: latlng
			});
				syncerWatchPosition.marker = new google.maps.Marker({
				map: syncerWatchPosition.map,
				position: latlng
			});
		}else{
			//地図の中心位置を変更
			syncerWatchPosition.map.setCenter(latlng);
			//マーカの位置を変更
			syncerWatchPosition.marker.setPosition(latlng);
		}
	}
	//失敗した時の関数
	function errorFunc(error){
		//エラーコードのメッセージを定義
		var errorMessage = {
			0: "原因不明のエラーが発生しました…。" ,
			1: "位置情報の取得が許可されませんでした…。" ,
			2: "電波状況などで位置情報が取得できませんでした…。" ,
			3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
		};
		//エラーコードに合わせたエラー内容を表示
		alert(errorMessage[error.code]);
	}
	var optionObj = {
		"enableHighAccuracy": false ,
		"timeout": 1000000 ,
		"maximumAge": 0
	};
	//現在位置を取得する
	navigator.geolocation.watchPosition(successFunc,errorFunc,optionObj);


