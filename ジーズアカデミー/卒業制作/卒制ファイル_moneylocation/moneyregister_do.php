<?php 
$usemoney = $_POST['usemoney'];
$placeid = $_POST['select'];//placeidを取得

$flag = 0;

//DBへ接続
$pdo = new PDO('mysql:dbname=sample;host=sample.db.sakura.ne.jp','moneylocation','password');
//文字コードを指定
$stmt = $pdo->query('SET NAMES utf8');
//データ登録SQL作成
$stmt = $pdo->prepare("INSERT INTO moneyandplace(id,usemoney,place,flag,nowdate)VALUES(NULL,:usemoney,:place,:flag,sysdate())");
$stmt->bindValue(':usemoney',$usemoney);
$stmt->bindValue(':place',$placeid);
$stmt->bindValue(':flag',$flag);

//SQL実行

$flag = $stmt->execute();
header("Location: mainpage.php");
?>

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/notosansjapanese.css">
	<script>
	    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	    ga('create', 'UA-77163665-1', 'auto');
	    ga('send', 'pageview');

	</script>
	<style>
		body{
			font-family: 'Noto Sans Japanese', serif;
		}
	</style>
</head>
<body>

	<?php 
	echo "データを挿入しました。";
	?>
</body>
</html>