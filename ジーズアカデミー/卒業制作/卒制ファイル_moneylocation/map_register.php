<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <link rel="apple-touch-icon-precomposed" href="https://moneylocation.jp/img/home.png">
    <title>地点検索</title>
    <link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/map_register.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/notosansjapanese.css">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzJwemvClGcDRQeOmMi3QI0cuPnRE1CoY&libraries=places&callback=initAutocomplete"
         async defer></script>
    <script src="./js/map_register.js"></script>
    <script src="./js/openmenu.js"></script>

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-77163665-1', 'auto');
      ga('send', 'pageview');

    </script>
  </head>
  <body>

    <header>
    <div class="logo">
        <h1><img src="img/logo.png" alt="ロゴ"></h1>
    </div>
    <div class="menubtn">
      <ul>
        <li><a href="#" id="menubtn">MENU</a>
          <ul class="menulist">
            <li><a href="index.html">ホーム</a></li>
            <li><a href="#">使い方</a></li>
            <li><a href="#">問い合わせ</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </header>

  <div id="contents">
    <div id="google-maps">
  	    <div id="map"></div>
    </div>
  	<input id="pac-input" class="controls" type="text" placeholder="Search Box">
    <div id="mapregister">
      <form action="mapregister.php" method="post">
          <p><input type="text" id="serchkeyworddata" name="placename" placeholder="地点名が入ります"></p><br>
          <input type="text" id="latdata" name="latdata" placeholder="緯度"><br>
          <input type="text" id="lngdata" name="lngdata" placeholder="経度"><br>
          <button type="submit" id="register">地点を登録する</button><br> 
      </form>
    </div>
    
  </div>
    <footer>
    	<p><small>&copy;2016 Masanar Hori</small></p>
    </footer>
    
    
  </body>
</html>