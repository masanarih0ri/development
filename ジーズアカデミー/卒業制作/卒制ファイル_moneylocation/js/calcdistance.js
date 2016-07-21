	google.maps.event.addDomListener(window, "load", function() {
		if(navigator.geolocation){
		//成功した時の関数
		function successFunc(position){
			//緯度表示
			var currentlat = position.coords.latitude;
			var currentlng = position.coords.longitude;
			// console.log(position.coords.latitude);
			//経度を表示
			// console.log(position.coords.longitude);
			var currentposition = [currentlat,currentlng];
			console.log(currentposition);
			var TOKYO = new google.maps.LatLng(35.681382, 139.76608399999998); // 東京駅
			var OSAKA = new google.maps.LatLng(34.701909, 135.49497700000006); // 大阪駅
			// var DEJIHARI = new google.maps.LatLng(35.700308, 139.762347); // デジハリ
			var NOWPOSITION = new google.maps.LatLng(currentlat, currentlng); // 現在地
			// 距離
			var distance = google.maps.geometry.spherical.computeDistanceBetween(TOKYO, OSAKA);
			// var distance2 = google.maps.geometry.spherical.computeDistanceBetween(TOKYO, DEJIHARI);
			// var distance3 = google.maps.geometry.spherical.computeDistanceBetween(OSAKA, DEJIHARI);
			var distance4 = google.maps.geometry.spherical.computeDistanceBetween(OSAKA, NOWPOSITION);
			var distances = [distance,distance4];

			var map = new google.maps.Map(document.getElementById('map'), {
				center: new google.maps.LatLng(34.77, 138.015),
				zoom: 7,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
			
			console.log(distances);
			for(var i = 0; i < distances.length; i++){
				if(distances[i] < 3000){
					alert(distances[i]);
				}
			}
			//終わり
		}
		function errorFunc(error){
			//エラーメッセージ
			var errorMessage = {
				0:"原因不明のエラーが発生しました",
				1:"位置情報の取得が許可されませんでした…。",
				2:"電波状況などで位置情報が取得できませんでした…。",
				3:"位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
			}
			//エラーコードに基づいた内容を表示
			alert(errorMessage[error.code]);
		}
		var optionObj = {
			"enableHighAccuracy": false,
			"timeout": 8000,
			"maximumAge": 5000
		};
		navigator.geolocation.getCurrentPosition(successFunc,errorFunc,optionObj);
	}else{
		alert("あなたの端末では、現在位置を取得することができません。");
	}
	
});

