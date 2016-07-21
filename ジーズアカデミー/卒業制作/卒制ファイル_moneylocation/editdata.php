<?php 

// ここでやるべきこと
// 各リンクごとのデータをinputタグで表示。更新するボタンでデータを更新することができるようにする。
$id = $_GET['id'];
//DBへ接続
try{
	$pdo = new PDO('mysql:dbname=sample;host=sample.db.sakura.ne.jp','moneylocation','password');
}
catch (PDOException $e) {
  	exit('データベースに接続できませんでした。'.$e->getMessage());
}
//文字コードを指定
$stmtlist = $pdo->query('SET NAMES utf8');
if (!$stmtlist) {
  $error = $pdo->errorInfo();
  exit("charError:".$error[2]);
}
//データ登録SQL作成
$stmtlist = $pdo->prepare("SELECT moneyandplace.id,placedata.placename, moneyandplace.usemoney, moneyandplace.nowdate, moneyandplace.flag FROM placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place WHERE moneyandplace.id=$id");

//SQL実行
$flaglist = $stmtlist->execute();

$view = '';

$editdata ='';

//エラー処理
if($flaglist == false){
  $view = "SQLエラー";
}else{

	while($result = $stmtlist->fetch(PDO::FETCH_ASSOC)){
	    $id = $result["id"];
	    $placename = $result["placename"];
	    $usemoney = $result["usemoney"];
	    $nowdate = $result["nowdate"];
	    $flag = $result["flag"];
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

	<title>仕分けページ</title>
	<link rel="stylesheet" href="./css/reset.css">
	<link rel="stylesheet" href="./css/editdata.css">
	<link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/notosansjapanese.css">
	<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
  	<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
  	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	<script src="./js/sort.js"></script>
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
	<div class="contents">
		<h3>データを編集する</h3>
		<form action="dataupdate.php" method="post">
			<label style="display:none;">id:<input type="text" name="id" value="<?=$id?>" class="moneyid"></label><br>
	    	<label><input type="text" name="placename" value="<?=$placename?>" class="placename" size="30"></label><br>
	    	<label><input type="text" name="usemoney" value="<?=$usemoney?>" class="usemoney">円</label><br>
	    	<label><input type="text" name="nowdate" value="<?=$nowdate?>" class="nowdate"></label><br>
	    	<label class="checklabel">無駄遣いかどうか<input type="checkbox" class="my-checkbox"></label><br>
	    	<label style="display:none;">無駄遣いフラグ:<input type="text" name="flag" value="<?=$flag?>" class="flag"></label>
	    	<button type="submit" class="updatebtn">データを更新する</button>
	    	
		</form>
	</div>

	<footer>
		<p><small>&copy;2016 Masanar Hori</small></p>
	</footer>
	
</body>
</html>