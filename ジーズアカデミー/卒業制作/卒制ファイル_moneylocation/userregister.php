<?php 
$username = $_POST['username'];
$password = $_POST['password']; 


//DBへ接続
$pdo = new PDO('mysql:dbname=moneylocation_userdata;host=mysql528.db.sakura.ne.jp','moneylocation','masa0209');
//文字コードを指定
$stmt = $pdo->query('SET NAMES utf8');
//データ登録SQL作成
$stmt = $pdo->prepare("INSERT INTO nameandpass(id,name,password,nowdate)VALUES(NULL,:username,:password,sysdate())");
$stmt->bindValue(':username',$username);
$stmt->bindValue(':password',$password);

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
	<style>
		body{
			font-family: 'Noto Sans Japanese', serif;
		}
	</style>
</head>
<body>
	
	<?php 
	echo "データを登録しました！";
	?>
</body>
</html>