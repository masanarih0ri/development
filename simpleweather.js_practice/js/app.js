$(document).ready(function() {
	$.simpleWeather({
    	//初期設定
	    location: 'Tokyo, JP',
	    woeid: '',
	    unit: 'c',
	    
	    //正常に実行された時の処理
	    success: function(weather) {
	    
	    //アイコンと気温の表示
	    html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'℃'+'</h2>';
	            
	   	//地名の表示
	    html += '<ul><li>'+weather.city+'</li>';
	            
	    //現在の気象状態
	    html += '<li class="currently">'+weather.currently+'</li>';
	            
	    //風向きと風速
	    html += '<li>'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
	  
	    $("#weather").html(html);
	    },

	    //エラー処理
	    
	    error: function(error) {
	      $("#weather").html('<p>'+error+'</p>');
	    }
	});
});