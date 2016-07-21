
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>新規登録</title>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <link rel="apple-touch-icon-precomposed" href="https://moneylocation.jp/img/home.png">
    <link rel="stylesheet" href="./css/reset.css">
    <link rel="stylesheet" href="./css/newuser.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/notosansjapanese.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
    <script src="./js/newuser.js"></script>

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
                <li><a href="#">お問い合わせ</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </header>
      <div class="register">
        <h3>ユーザー情報を登録する</h3>
        <form action="userregister.php" method="post">
            <input type="text" id="username" name="username" placeholder="ユーザーID"><br>
            <input type="password" id="password" name="password" placeholder="パスワード"><br>
            <button type="submit" id="register">登録する</button><br>
        </form>
      </div>

      <footer>
          <p><small>&copy;2016 Masanar Hori</small></p>
      </footer>
  

 
  </body>
</html>