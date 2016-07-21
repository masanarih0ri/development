
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="UTF-8">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <link rel="apple-touch-icon-precomposed" href="https://moneylocation.jp/img/home.png">
	<title>ログインページ</title>
	<link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/login.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/notosansjapanese.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
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
    <div class="logincheck">
    <h3>ログイン情報を入力</h3>
		<form name="form1" action="sampleloginact.php" method="post">
			<input type="text" name="lid" class="lid" placeholder="IDを入力"><br>
			<input type="password" name="lpw" class="lpw" placeholder="パスワードを入力"><br>
			<input type="submit" value="ログインする" class="submitdata" id="submitdata"><br>
		</form>
	</div>

	<footer>
		<p><small>&copy;2016 Masanar Hori</small></p>
	</footer>
</body>
</html>



