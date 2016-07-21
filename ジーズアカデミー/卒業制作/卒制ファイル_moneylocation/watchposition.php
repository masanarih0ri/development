<?php 

//DBへ接続
$pdo = new PDO('mysql:dbname=sample;host=sample.db.sakura.ne.jp','moneylocation','password');

//文字コードを指定
$stmt = $pdo->query('SET NAMES utf8');
//データ登録SQL作成
$stmt = $pdo->prepare("SELECT * FROM placedata");

//SQL実行
$flag = $stmt->execute();


$lat = '';
$lng = '';
$name = '';

//エラー処理
if($flag == false){
  $view = "SQLエラー";
}else{
  while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
    
    $lat .= $result['lat'].',';
    $lng .= $result['lng'].',';
  }
}


?>


<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="mobile-web-app-capable" content="yes">
  <!-- Include manifest file in the page -->
  <link rel="manifest" href="js/manifest.json">
    <link rel="stylesheet" href="css/style.css" >
    <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
  <script src="//maps.googleapis.com/maps/api/js?key=AIzaSyBouRngjBWxP4S7H1wqfShSsPkserg0xBw&libraries=geometry&sensor=false"></script>
  <script src="./js/watchposition.js"></script>
  <script src="./js/pushmain.js" defer></script>
  <title>位置情報</title>
  <style>
    #map{
      width: 500px;
      height: 300px;
    }
  </style>
</head>
<body>
<div id="result"></div>
<div id="map"></div>
<div id="distancetext"></div>

<div style="display:none;">
<p id="latdata"><?php echo $lat;?></p>
<p id="lngdata"><?php echo $lng.'<br>';?></p>
</div>

    <div class="supported">
      <div>
        <h2>プッシュ通知の配信設定</h2>
        <p>下記のトグルを選択してください。</p>
        <form action="">
          <input class='tgl tgl-light' id='pushEnableButton' type='checkbox'>
          <label class='tgl-btn' for='pushEnableButton'></label>
        </form>
      </div>

      <h2>cURLコマンド</h2>
      <p>下記のコマンドをコピーして、Terminalより実行してください。</p>
      <div id="curlCommand"></div>

      <h2></h2>
      <p>
        <a href="chrome://serviceworker-internals" target="_blank">chrome://serviceworker-internals</a>
      </p>
      </div>

    <div class="unsupported"  style="display:none;">
      <p>お使いのブラウザは、プッシュ通知に対応していません。<br>
      最新版のChromeでご利用ください。</p>

    </div>


</body>
</html>