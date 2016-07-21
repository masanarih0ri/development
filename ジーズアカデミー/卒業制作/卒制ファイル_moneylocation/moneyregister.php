<?php 
//DBへ接続
$pdo = new PDO('mysql:dbname=sample;host=sample.db.sakura.ne.jp','moneylocation','password');//文字コードを指定
$stmt = $pdo->query('SET NAMES utf8');
//データ登録SQL作成
$stmt = $pdo->prepare("SELECT * FROM placedata");

//SQL実行
$flag = $stmt->execute();

$select = '';

//エラー処理
if($flag == false){
	$view = "SQLエラー";
}else{
	while ($result = $stmt->fetch(PDO::FETCH_ASSOC)) {
		$select .= '<option value="'.$result['id'].'">'.$result['placename'].'</option>';
				
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
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
  	<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
  	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
	<title>今日使ったお金を登録する</title>
	<link rel="stylesheet" href="./css/reset.css">
	<link rel="stylesheet" href="./css/money_register.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	<script src="./js/money_register.js"></script>
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

	<div class="moneydata">
		<h3>今日使ったお金</h3>
		<div class="inputform">
			<form action="moneyregister_do.php" method="post">
				<p class="usemoney"><input type="text" name="usemoney" class="usemoneyinput">円</p><br>
				
				<!-- <select name="placename" id="placename" class="placename"> -->
				<select name="select" id="placename" class="placename">
					<optgroup label="">
						<option value="">選択</option>
						<?php echo $select; ?>
					</optgroup>
				</select><br>
				<button type="submit" class="submit">送信する</button>
			</form>
		</div>
	</div>

	<footer>
		<p><small>&copy;2016 Masanar Hori</small></p>
	</footer>
</body>
</html>