<?php 

//DBへ接続
$pdo = new PDO('mysql:dbname=sample;host=sample.db.sakura.ne.jp','moneylocation','password');
//文字コードを指定
$stmtlist = $pdo->query('SET NAMES utf8');
//データ登録SQL作成
$stmtlist = $pdo->prepare("SELECT moneyandplace.id,placedata.placename, moneyandplace.usemoney, moneyandplace.nowdate, moneyandplace.flag FROM placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place");

//SQL実行
$flaglist = $stmtlist->execute();

$view = '';

$link ='';

$linksp = '';

//エラー処理
if($flaglist == false){
  $view = "SQLエラー";
}else{
  while ($result = $stmtlist->fetch(PDO::FETCH_ASSOC)) {

    $link .= '<tr><td>'.$result['placename'].'</td>'.
    		'<td>'.$result['usemoney'].'円</td>'.
    		'<td>'.$result['nowdate'].'</td>'.
    		'<div class="editbtn"><td><a href="editdata.php?id='.$result['id'].'">編集する</a></td></div></tr>';

    $linksp .='<div class="datasp"><div class="place"><p>'.$result['placename'].'</p></div>'.
    		  '<div class="money"><p>'.$result['usemoney'].'円</p></div>'.
    		  '<div class="time"><p>'.$result['nowdate'].'</p></div>'.
    		  '<div class="editbtn"><a href="editdata.php?id='.$result['id'].'">'.'編集する</a></div></div>';
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
	<link rel="stylesheet" href="./css/sort.css">
	<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
  	<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
  	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	<script src="./js/sort.js"></script>
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
		<h3>これまでの買い物履歴</h3>
		<div class="datatable">
			<table>
				<tr>
					<th>場所</th>
					<th>お金</th>
					<th>時刻</th>
					<th>編集</th>
				</tr>
				<?php echo $link; ?>

			</table>
		</div>
		<div class="datatablesp" style="text-align:center; color:white;">
			<?php echo $linksp; ?>
		</div>
		
	</div>

	<footer>
		<p><small>&copy;2016 Masanar Hori</small></p>
	</footer>
	
</body>
</html>