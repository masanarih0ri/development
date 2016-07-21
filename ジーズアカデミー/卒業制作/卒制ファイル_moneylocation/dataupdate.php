<?php 

$id = $_POST['id'];
$placename = $_POST['placename'];
$usemoney = $_POST['usemoney'];
$nowdate = $_POST['nowdate'];
$moneyflag = $_POST['flag'];

// $id = $_GET['id'];

//DBへ接続
$pdo = new PDO('mysql:dbname=moneylocation_gsacademy;host=mysql528.db.sakura.ne.jp','moneylocation','masa0209');
//文字コードを指定
$update = $pdo->query('SET NAMES utf8');
//データ登録SQL作成
//UPDATE文を使う
// $update = $pdo->prepare("SELECT moneyandplace.id,placedata.placename, moneyandplace.usemoney, moneyandplace.nowdate, moneyandplace.flag FROM placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place WHERE moneyandplace.id=$id");

$update = $pdo->prepare("UPDATE placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place SET moneyandplace.id=:id, placedata.placename=:placename, moneyandplace.usemoney=:usemoney, moneyandplace.nowdate=:nowdate, moneyandplace.flag=:flag WHERE moneyandplace.id=$id");

//データをバインドする
$update->bindvalue(':id',$id);
$update->bindvalue(':placename',$placename);
$update->bindvalue(':usemoney',$usemoney);
$update->bindvalue(':nowdate',$nowdate);
$update->bindvalue(':flag',$moneyflag);

$flag = $update->execute();

header("Location: mainpage.php");
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
<?php 
echo "データを更新しました。"?>
</body>
</html>