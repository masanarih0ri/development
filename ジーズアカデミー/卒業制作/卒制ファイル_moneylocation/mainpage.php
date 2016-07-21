<?php 


//DBへ接続
$pdo = new PDO('mysql:dbname=sample;host=sample.db.sakura.ne.jp','moneylocation','password');

//文字コードを指定
$stmt = $pdo->query('SET NAMES utf8');
//データ登録SQL作成
$stmt = $pdo->prepare("SELECT * FROM placedata");

//SQL実行
$flag = $stmt->execute();

$mapview = '';

$list = '';

$lat = '';
$lng = '';
$name = '';

//エラー処理
if($flag == false){
  $view = "SQLエラー";
}else{
  while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $mapview .='data.push({name:'.'"'.$result['placename'].'"'.',lat:'.$result['lat'].',lng:'.$result['lng'].'});';
    $list .= '<li><a href='.'"dataindicate.php?id='.$result['id'].'">'.$result['placename'].'</a></li>';
    $lat .= $result['lat'].',';
    $lng .= $result['lng'].',';
    $name .= $result['placename'].',';
  }
}


?>

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="default">
	<link rel="apple-touch-icon-precomposed" href="https://moneylocation.jp/img/home.png">
	<title>データ閲覧ページ</title>
	<link rel="stylesheet" href="./css/reset.css">
	<link rel="stylesheet" href="./css/mainpage.css">
	<link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/notosansjapanese.css">
	<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
  	<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
  	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	<script type="text/javascript" src="//maps.googleapis.com/maps/api/js?key=AIzaSyBouRngjBWxP4S7H1wqfShSsPkserg0xBw"></script>
	<script src="./js/mainpage.js"></script>
	<script src="./js/openmenu.js"></script>
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
						<li><a href="#">ホーム</a></li>
						<li><a href="#">使い方</a></li>
						<li><a href="#">問い合わせ</a></li>

					</ul>
				</li>
			</ul>
		</div>
	</header>

	<div class="wrapper">
		<div class="contents">
			<div class="list">
				<ul>
					<?php echo $list; ?>
				</ul>
			</div>
			<div id="map"></div>
			<div class="registerbtn">
				<ul>
					<li><a href="map_register.php"><img src="img/map.png" alt="地図ボタン" width="60" height="60"></a></li>
					<li><a href="sort.phpmoneyregister.php"><img src="img/money.png" alt="お金ボタン" width="60" height="60"></a></li>
					<li><a href="sort.php"><img src="img/plus.png" alt="編集ボタン" width="60" height="60"></a></li>
				</ul>
			</div>
			<div class="registerlist">
				
				<ul>
					<li class="mapbtn"><a href="map_register.php">場所を登録</a></li>
					<li class="moneybtn"><a href="moneyregister.php">お金を記録</a></li>
					<li class="editbtn"><a href="sort.php">データを編集</a></li>
				</ul>
			</div>
			<div class="logoutbtnarea">
				<button onclick="location.href='logout.php'" class="logoutbtn">ログアウト</button>
			</div>
			<div class="latlngdata" style="display:none;">
				<p id="latdata"><?php echo $lat;?></p>
				<p id="lngdata"><?php echo $lng.'<br>';?></p>
				<p id="namedata"><?php echo $name.'<br>';?></p>
			</div>
		</div>
		<footer>
			<p><small>&copy;2016 Masanar Hori</small></p>
		</footer>
	</div>

</body>
</html>