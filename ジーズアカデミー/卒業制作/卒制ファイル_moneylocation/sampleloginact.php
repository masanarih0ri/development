<?php
session_start();
// include('func.php'); //外部ファイル読み込み（関数群の予定）

$lid = $_POST['lid'];
$lpw = $_POST['lpw'];


//1. 接続します
try {
  $pdo = new PDO('mysql:dbname=sample;host=sample.db.sakura.ne.jp','moneylocation','password');
} catch (PDOException $e) {
  exit('DbConnectError:'.$e->getMessage());
}

//2. DB文字コードを指定
$stmt = $pdo->query('SET NAMES utf8');
if (!$stmt) {
  $error = $pdo->errorInfo();
  exit($error[2]);
}


//３．データ登録SQL作成
$stmt = $pdo->prepare("SELECT * FROM nameandpass WHERE name=:lid AND password=:lpw");
$stmt->bindValue(':lid', $lid);
$stmt->bindValue(':lpw', $lpw);

$res = $stmt->execute();
//SQL実行時にエラーがある場合
if($res==false){
  $error = $stmt->errorInfo();
  exit("QueryError:".$error[2]);
}

//５．抽出データ数を取得
//$count = $stmt->fetchColumn(); //SELECT COUNT(*)で使用可能()
$val = $stmt->fetch(); //これは1レコードだけの情報を取得する方法


//6. 該当レコードがあればSESSIONに値を代入
if( $val["id"] != "" ){
  //ここでセッションを使い$_SESSION[]変数の中に値を入れる。
  $_SESSION["chk_ssid"]  = session_id();
  $_SESSION["name"]      = $val['name'];
  header("Location: mainpage.php");
}else{
  //logout処理を経由して前画面へ
  header("Location: logout.php");
}

// exit();

?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>ログイン認証</title>
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
  
</body>
</html>

