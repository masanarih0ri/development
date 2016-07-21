<?php

//ログアウト処理はコピペでOK。

//必ずsession_startは最初に記述
session_start();

//SESSIONを初期化（空っぽにする）
$_SESSION = array();

//Cookieに保存してある"SessionIDの保存期間を過去にして破棄
if (isset($_COOKIE[session_name()])) { //session_name()は、セッションID名を返す関数
    setcookie(session_name(), '', time()-42000, '/');
}

//サーバ側での、セッションIDの破棄
session_destroy();

//処理後、index.phpへリダイレクト
header("Location: index.html");
exit();

?>

<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
	<title>ログアウト</title>
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
