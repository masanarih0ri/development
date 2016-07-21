<?php
/*
ここでの作業
使用するテーブルは
placedataとmoneyandplaceのテーブルを結合したもの

idごとの
(済)①usemoneyの合計。usemoneyをidだけで振り分けて表示できれば、それの値を出して足すだけ。文字列を数値変換する必要がある。
(済）②flag=1のものの合計。①のデータからflag1のものだけを表示できれば、それの値を出して足すだけ。
(済)③totalmoneyは別の変数を置いて、moneyandplaceから全て足した値から①を引く
④usemoneyの合計値だが、データを時間や月で分類できるようにする（おそらく、usemoneyのためのデータがあればできるはず。月の文字列、時間の文字列を取得する、ということができれば問題なさそう）
⑤wastemoneyの合計値だが、データを時間や月で分類できるようにする

*/
//割り振りのidを指定
$id = $_GET['id'];
//DBへ接続
try {
	$pdo = new PDO('mysql:dbname=moneylocation_gsacademy;host=mysql528.db.sakura.ne.jp','moneylocation','masa0209');

} catch (PDOException $e) {
  exit('データベースに接続できませんでした。'.$e->getMessage());
}
//文字コードを指定
$stmtlist = $pdo->query('SET NAMES utf8');
if (!$stmtlist) {
  $error = $pdo->errorInfo();
  exit("charError:".$error[2]);
}
//SQL作成
$stmtlist = $pdo->prepare("SELECT moneyandplace.id, placedata.placename, moneyandplace.usemoney, moneyandplace.nowdate, moneyandplace.flag FROM placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place WHERE placedata.id=$id");
//この地点て使ったお金の合計
$calc = $pdo->prepare("SELECT SUM(moneyandplace.usemoney) FROM placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place WHERE placedata.id=$id");
//この地点で使った無駄金の合計
$wastecalc = $pdo->prepare("SELECT SUM(moneyandplace.usemoney) FROM placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place WHERE placedata.id=$id AND moneyandplace.flag = 1");
//全地点で使ったお金
$allcalc = $pdo->prepare("SELECT SUM(moneyandplace.usemoney) FROM placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place");
//この地点で、月ごとに使ったお金のデータ成形用
$monthlycalc = $pdo->prepare("SELECT moneyandplace.usemoney,DATE_FORMAT(moneyandplace.nowdate,'%m') AS month FROM placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place WHERE placedata.id=$id");
//この地点で、時間ごとに使ったお金のデータ成形用
$hourcalc = $pdo->prepare("SELECT moneyandplace.usemoney,DATE_FORMAT(moneyandplace.nowdate,'%H') AS hour FROM placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place WHERE placedata.id=$id");
//この地点で、月ごとに使った無駄金のデータ成形用
$wastemonthlycalc = $pdo->prepare("SELECT moneyandplace.usemoney,DATE_FORMAT(moneyandplace.nowdate,'%m') AS monthwaste FROM placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place WHERE placedata.id=$id AND moneyandplace.flag=1");
//この地点で、時間ごとに使った無駄金のデータ成形用
$wastehourcalc = $pdo->prepare("SELECT moneyandplace.usemoney,DATE_FORMAT(moneyandplace.nowdate,'%H') AS hour FROM placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place WHERE placedata.id=$id AND moneyandplace.flag=1");

$placenamedata = $pdo->prepare("SELECT placedata.placename FROM placedata INNER JOIN moneyandplace ON placedata.id = moneyandplace.place WHERE placedata.id=$id");
//SQL実行
$flaglist = $stmtlist->execute();

$placedatacalc = $calc->execute();

$wastedatacalc = $wastecalc->execute();

$alldatacalc = $allcalc->execute();

$monthlydatacalc = $monthlycalc->execute();

$hourdatacalc = $hourcalc->execute();

$wastemonthlydatacalc = $wastemonthlycalc->execute();

$wastehourdatacalc = $wastehourcalc->execute();
//地点名を表示するためのSQLを実行
$placenameindicate = $placenamedata->execute();

$view = '';

$moneydata =''; 

$monthlyindicatedata = '';

$placedata = '';

$January = 0;
$February = 0;
$March = 0;
$April = 0;
$May = 0;
$June = 0;
$July = 0;
$August = 0;
$September = 0;
$October = 0;
$November = 0;
$December = 0;

$January_w = 0;
$February_w = 0;
$March_w = 0;
$April_w = 0;
$May_w = 0;
$June_w = 0;
$July_w = 0;
$August_w = 0;
$September_w = 0;
$October_w = 0;
$November_w = 0;
$December_w = 0;

$firstterm = 0;      // 0時-2時（2時59分59秒）
$secondterm = 0;     // 3時-5時（5時59分59秒）
$thirdterm = 0;		 // 6時-8時
$fourthterm = 0;	 // 9時-11時
$fifthterm = 0;		 // 12時-14時
$sixthterm = 0;		 // 15時-17時
$seventhterm = 0;	 // 18時-20時
$eighthterm = 0;	 // 21時-23時

$firstterm_w = 0;      // 0時-2時（2時59分59秒）
$secondterm_w = 0;     // 3時-5時（5時59分59秒）
$thirdterm_w = 0;		 // 6時-8時
$fourthterm_w = 0;	 // 9時-11時
$fifthterm_w = 0;		 // 12時-14時
$sixthterm_w = 0;		 // 15時-17時
$seventhterm_w = 0;	 // 18時-20時
$eighthterm_w = 0;	 // 21時-23時

//エラー処理

if($placenameindicate == false){
	// $view ="SQLエラー";
	$error = $placenamedata->errorInfo();
  	exit("ErrorQuery:".$error[2]);
}else{
	$placenameindicatedata = $placenamedata->fetch();
	$PLACENAMEDATA = $placenameindicatedata['placename'];
}


if($flaglist == false){
  // $view = "SQLエラー";
  $error = $stmtlist->errorInfo();
  exit("ErrorQuery:".$error[2]);
}else{

	while($result = $stmtlist->fetch(PDO::FETCH_ASSOC)){
	    // $id = $result["id"];
	    $placename = $result["placename"];
	    $usemoney = $result["usemoney"];
	    $nowdate = $result["nowdate"];
	    $flag = $result["flag"];
	    $moneydata .= '<p><input type="text" value="'.$usemoney.'" id="data'.$id.'"><p><br>';
	}

}

if($placedatacalc == false){
	// $view = "SQLエラー";
	$error = $calc->errorInfo();
  	exit("ErrorQuery:".$error[2]);
}else{
	$placeresultdata = $calc->fetch();
	$placeindicatedata = $placeresultdata['SUM(moneyandplace.usemoney)'];
}

if($wastedatacalc == false){
	// $view = "SQLエラー";
	$error = $wastecalc->errorInfo();
  	exit("ErrorQuery:".$error[2]);
}else{
	$placewastedata = $wastecalc->fetch();
	$placewasteindicatedata = $placewastedata['SUM(moneyandplace.usemoney)'];
}

if($alldatacalc == false){
	// $view = "SQLエラー";
	$error = $allcalc->errorInfo();
  	exit("ErrorQuery:".$error[2]);
}else{
	$placealldata = $allcalc->fetch();
	$placeallindicatedata = $placealldata['SUM(moneyandplace.usemoney)'];
}
$percentage = $placeindicatedata / $placeallindicatedata * 100;

if($monthlydatacalc == false){
	// $view = "SQLエラー";
	$error = $allcalc->errorInfo();
  	exit("ErrorQuery:".$error[2]);
}else{
	
	while($monthlydata = $monthlycalc->fetch(PDO::FETCH_ASSOC)){
	    $month = $monthlydata['month'];
	    if($month == '01'){
	    	$January += $monthlydata['usemoney'];
	    }else if($month == '02'){
	    	$February += $monthlydata['usemoney'];
	    }else if($month == '03'){
	    	$March += $monthlydata['usemoney'];
	    }else if($month == '04'){
	    	$April += $monthlydata['usemoney'];
	    }else if($month == '05'){
	    	$May += $monthlydata['usemoney'];
	    }else if($month == '06'){
	    	$June += $monthlydata['usemoney'];
	    }else if($month == '07'){
   			$July += $monthlydata['usemoney'];
   		}else if($month == '08'){
   			$August += $monthlydata['usemoney'];
   		}else if($month == '09'){
   			$September += $monthlydata['usemoney'];
  		}else if($month == '10'){
   			$October += $monthlydata['usemoney'];
   		}else if($month == '11'){
   			$November += $monthlydata['usemoney'];
  		}else if($month == '12'){
   			$December += $monthlydata['usemoney'];
  		}
	}
}

if($hourdatacalc == false){
	// $view = "SQLエラー";
	$error = $hourcalc->errorInfo();
  	exit("ErrorQuery:".$error[2]);
}else{
	while($hourdata = $hourcalc->fetch(PDO::FETCH_ASSOC)){
		$hour = $hourdata['hour'];
	
		if($hour == '00' || $hour == '01' || $hour == '02'){
			$firstterm += $hourdata['usemoney'];
		}else if($hour == '03' || $hour == '04' || $hour == '05'){
			$secondterm += $hourdata['usemoney'];
		}else if($hour == '06' || $hour == '07' || $hour == '08'){
			$thirdterm += $hourdata['usemoney'];
		}else if($hour == '09' || $hour == '10' || $hour == '11'){
			$fourthterm += $hourdata['usemoney'];
		}else if($hour == '12' || $hour == '13' || $hour == '14'){
			$fifthterm += $hourdata['usemoney'];
		}else if($hour == '15' || $hour == '16' || $hour == '17'){
			$sixthterm += $hourdata['usemoney'];
		}else if($hour == '18' || $hour == '19' || $hour == '20'){
			$seventhterm += $hourdata['usemoney'];
		}else if($hour == '21' || $hour == '22' || $hour == '23'){
			$eighthterm += $hourdata['usemoney'];
		}
	
	}
}

if($wastemonthlydatacalc == false){
	// $view = "SQLエラー";
	$error = $wastemonthlycalc->errorInfo();
  	exit("ErrorQuery:".$error[2]);
}else{
	
	while($wasetemonthlydata = $wastemonthlycalc->fetch(PDO::FETCH_ASSOC)){
	    $monthwaste = $wasetemonthlydata['monthwaste'];
	    if($monthwaste == '01'){
	    	$January_w += $wasetemonthlydata['usemoney'];
	    }else if($monthwaste == '02'){
	    	$February_w += $wasetemonthlydata['usemoney'];
	    }else if($monthwaste == '03'){
	    	$March_w += $wasetemonthlydata['usemoney'];
	    }else if($monthwaste == '04'){
	    	$April_w += $wasetemonthlydata['usemoney'];
	    }else if($monthwaste == '05'){
	    	$May_w += $wasetemonthlydata['usemoney'];
	    }else if($monthwaste == '06'){
	    	$June_w += $wasetemonthlydata['usemoney'];
	    }else if($monthwaste == '07'){
	    	$July_w += $wasetemonthlydata['usemoney'];
	    }else if($monthwaste == '08'){
	    	$August_w += $wasetemonthlydata['usemoney'];
	    }else if($monthwaste == '09'){
	    	$September_w += $wasetemonthlydata['usemoney'];
	    }else if($monthwaste == '10'){
	    	$October_w += $wasetemonthlydata['usemoney'];
	    }else if($monthwaste == '11'){
	    	$November_w += $wasetemonthlydata['usemoney'];
	    }else if($monthwaste == '12'){
	    	$December_w += $wasetemonthlydata['usemoney'];
	    }
	}
}

if($hourdatacalc == false){
	// $view = "SQLエラー";
	$error = $wastehourcalc->errorInfo();
  	exit("ErrorQuery:".$error[2]);
}else{
	while($wastehourdata = $wastehourcalc->fetch(PDO::FETCH_ASSOC)){
		$hourwaste = $wastehourdata['hour'];
	
		if($hourwaste == '00' || $hourwaste == '01' || $hourwaste == '02'){
			$firstterm_w += $wastehourdata['usemoney'];
		} else if($hourwaste == '03' || $hourwaste == '04' || $hourwaste == '05'){
		 	$secondterm_w += $wastehourdata['usemoney'];
		 }else if($hourwaste == '06' || $hourwaste == '07' || $hourwaste == '08'){
		 	$thirdterm_w += $wastehourdata['usemoney'];
		 }else if($hourwaste == '09' || $hourwaste == '10' || $hourwaste == '11'){
			$fourthterm_w += $wastehourdata['usemoney'];
		 }else if($hourwaste == '12' || $hourwaste == '13' || $hourwaste == '14'){
			$fifthterm_w += $wastehourdata['usemoney'];
		 }else if($hourwaste == '15' || $hourwaste == '16' || $hourwaste == '17'){
			$sixthterm_w += $wastehourdata['usemoney'];
		}else if($hourwaste == '18' || $hourwaste == '19' || $hourwaste == '20'){
			$seventhterm_w += $wastehourdata['usemoney'];
		}else if($hourwaste == '21' || $hourwaste == '22' || $hourwaste == '23'){
			$eighthterm_w += $wastehourdata['usemoney'];
		}
	
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
	<link rel="stylesheet" href="./css/reset.css">
	<link rel="stylesheet" href="./css/dataindicate.css">
	<link rel="apple-touch-icon-precomposed" href="https://moneylocation.jp/img/home.png">
	<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
  	<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
  	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.2/Chart.min.js"></script>
	<script src="./js/dataindicate.js"></script>
	<script src="./js/openmenu.js"></script>
	<script>
	  	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  	})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

	  	ga('create', 'UA-77163665-1', 'auto');
	  	ga('send', 'pageview');
	</script>
	<title>データ閲覧ページ</title>
</head>
<body>
<div id="moneydata">
	<div class="nonebox" style="display:none;">
		<!-- ここで使ったお金 -->
		<input type="text" value="<?php echo htmlspecialchars($placeindicatedata,ENT_QUOTES);?>" id="placemoney">
		<!-- 全ての地点で使ったお金 -->
		<input type="text" value="<?php echo htmlspecialchars($placeallindicatedata,ENT_QUOTES);?>" id="allmoney">
		<!-- 1月のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($January,ENT_QUOTES);?>" id="January">
		<!-- 2月のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($February,ENT_QUOTES);?>" id="February">
		<!-- 3月のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($March,ENT_QUOTES);?>" id="March">
		<!-- 4月のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($April,ENT_QUOTES);?>" id="April">
		<!-- 5月のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($May,ENT_QUOTES);?>" id="May">
		<!-- 6月のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($June,ENT_QUOTES);?>" id="June">
		<!-- 7月のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($July,ENT_QUOTES);?>" id="July">
		<!-- 8月のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($August,ENT_QUOTES);?>" id="August">
		<!-- 9月のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($September,ENT_QUOTES);?>" id="September">
		<!-- 10月のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($October,ENT_QUOTES);?>" id="October">
		<!-- 11月のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($November,ENT_QUOTES);?>" id="November">
		<!-- 12月のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($December,ENT_QUOTES);?>" id="December">

		<!-- 0-2時のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($firstterm,ENT_QUOTES);?>" id="firstTerm">
		<!-- 3-5時のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($secondterm,ENT_QUOTES);?>" id="secondTerm">
		<!-- 6-8時のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($thirdterm,ENT_QUOTES);?>" id="thirdTerm">
		<!-- 9-11時のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($fourthterm,ENT_QUOTES);?>" id="fourthTerm">
		<!-- 12-14時のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($fifthterm,ENT_QUOTES);?>" id="fifthTerm">
		<!-- 15-17時のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($sixthterm,ENT_QUOTES);?>" id="sixthTerm">
		<!-- 18-20時のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($seventhterm,ENT_QUOTES);?>" id="seventhTerm">
		<!-- 21-23時のお金 -->
		<input type="text" value="<?php echo htmlspecialchars($eighthterm,ENT_QUOTES);?>" id="eighthTerm">

		<!-- 無駄金1月-12月 -->
		<input type="text" value="<?php echo htmlspecialchars($January_w,ENT_QUOTES);?>" id="January_w">
		<input type="text" value="<?php echo htmlspecialchars($February_w,ENT_QUOTES);?>" id="February_w">
		<input type="text" value="<?php echo htmlspecialchars($March_w,ENT_QUOTES);?>" id="March_w">
		<input type="text" value="<?php echo htmlspecialchars($April_w,ENT_QUOTES);?>" id="April_w">
		<input type="text" value="<?php echo htmlspecialchars($May_w,ENT_QUOTES);?>" id="May_w">
		<input type="text" value="<?php echo htmlspecialchars($June_w,ENT_QUOTES);?>" id="June_w">
		<input type="text" value="<?php echo htmlspecialchars($July_w,ENT_QUOTES);?>" id="July_w">
		<input type="text" value="<?php echo htmlspecialchars($August_w,ENT_QUOTES);?>" id="August_w">
		<input type="text" value="<?php echo htmlspecialchars($September_w,ENT_QUOTES);?>" id="September_w">
		<input type="text" value="<?php echo htmlspecialchars($October_w,ENT_QUOTES);?>" id="October_w">
		<input type="text" value="<?php echo htmlspecialchars($November_w,ENT_QUOTES);?>" id="November_w">
		<input type="text" value="<?php echo htmlspecialchars($December_w,ENT_QUOTES);?>" id="December_w">

		<!-- 無駄金 0時-23時 -->
		<input type="text" value="<?php echo htmlspecialchars($firstterm_w,ENT_QUOTES);?>" id="firstterm_w">
		<input type="text" value="<?php echo htmlspecialchars($secondterm_w,ENT_QUOTES);?>" id="secondterm_w">
		<input type="text" value="<?php echo htmlspecialchars($thirdterm_w,ENT_QUOTES);?>" id="thirdterm_w">
		<input type="text" value="<?php echo htmlspecialchars($fourthterm_w,ENT_QUOTES);?>" id="fourthterm_w">
		<input type="text" value="<?php echo htmlspecialchars($fifthterm_w,ENT_QUOTES);?>" id="fifthterm_w">
		<input type="text" value="<?php echo htmlspecialchars($sixthterm_w,ENT_QUOTES);?>" id="sixthterm_w">
		<input type="text" value="<?php echo htmlspecialchars($seventhterm_w,ENT_QUOTES);?>" id="seventhterm_w">
		<input type="text" value="<?php echo htmlspecialchars($eighthterm_w,ENT_QUOTES);?>" id="eighthterm_w">

		<input type="text" value="<?php echo htmlspecialchars($PLACENAMEDATA,ENT_QUOTES);?>" id="PLACENAMEDATA">



	</div>

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
	<div class="wrapper">
		<div class="dataleft">
			<div class="usemoney">
				<h3>ここで使ったお金</h3>
				<p><span id="usemoney"><?php echo htmlspecialchars($placeindicatedata,ENT_QUOTES);?></span>円</p>
			</div>

			<div class="wastemoney">
				<h3>無駄だったお金</h3>
     			<p><span id="wastemoney"><?php echo htmlspecialchars($placewasteindicatedata,ENT_QUOTES); ?></span>円</p>
			</div>

			<div class="moneydata">
				<h3>全体の出費に占める割合</h3>
				<p><span id="percentage"><?php echo htmlspecialchars(round($percentage,3),ENT_QUOTES); ?></span>%</p>
				<div class="graph" id="graph">
					<canvas id="graph-area" height="240" width="250"></canvas>
      			</div>
			</div>
		</div>
		
		<div class="dataright">
			<div class="usemoneydata">
				<div class="graph" id="graph">
				    <h3>ここで使ったお金（時間帯別・月別）</h3>
				    <canvas id="graph-area2" height="250" width="250"></canvas>
				    <canvas id="graph-area3" height="250" width="250"></canvas>
				</div>
				<div class="graph" id="graph">
				    <h3>無駄だったお金（時間帯別・月別）</h3>
				    <canvas id="graph-area4" height="250" width="250"></canvas>
      				<canvas id="graph-area5" height="250" width="250"></canvas>
				</div>
			</div>

		</div>
	</div>
	<footer>
		<p><small>&copy;2016 Masanar Hori</small></p>
	</footer>
</body>
</html>