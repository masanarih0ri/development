<?php 
$flagdata = $_POST['flag'];

//DBへ接続
$pdo = new PDO('mysql:dbname=moneylocation_gsacademy;host=mysql528.db.sakura.ne.jp','moneylocation','masa0209');
//文字コードを指定
$stmt = $pdo->query('SET NAMES utf8');
//データ登録SQL作成
$update = $pdo->prepare("UPDATE moneyandplace SET flag=:flag WHERE id=:id");
$update->bindValue(':flag',$flagdata);
//SQL実行

$flag = $update->execute();

?>

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
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
	データ更新しました。
</body>
</html>