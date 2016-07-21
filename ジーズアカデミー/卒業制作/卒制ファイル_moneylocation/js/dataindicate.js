
// ▼グラフの中身

   

   // ▼上記のグラフを描画するための記述
   window.onload = function(){
    // 使ったお金の変数
    var placemoney = document.getElementById('placemoney').value;
    var allmoney = document.getElementById('allmoney').value;
    //場所の名前
    var placedata = document.getElementById('PLACENAMEDATA').value;
    // 月別のデータ変数
    var January = document.getElementById('January').value;
    var February = document.getElementById('February').value;
    var March = document.getElementById('March').value;
    var April = document.getElementById('April').value;
    var May = document.getElementById('May').value;
    var June = document.getElementById('June').value;
    var July = document.getElementById('July').value;
    var August = document.getElementById('August').value;
    var September = document.getElementById('September').value;
    var October = document.getElementById('October').value;
    var November = document.getElementById('November').value;
    var December = document.getElementById('December').value;

    var firstTerm = document.getElementById('firstTerm').value;
    var secondTerm = document.getElementById('secondTerm').value;
    var thirdTerm = document.getElementById('thirdTerm').value;
    var fourthTerm = document.getElementById('fourthTerm').value;
    var fifthTerm = document.getElementById('fifthTerm').value;
    var sixthTerm = document.getElementById('sixthTerm').value;
    var seventhTerm = document.getElementById('seventhTerm').value;
    var eighthTerm = document.getElementById('eighthTerm').value;

    var January_w = document.getElementById('January_w').value;
    var February_w = document.getElementById('February_w').value;
    var March_w = document.getElementById('March_w').value;
    var April_w = document.getElementById('April_w').value;
    var May_w = document.getElementById('May_w').value;
    var June_w = document.getElementById('June_w').value;
    var July_w = document.getElementById('July_w').value;
    var August_w = document.getElementById('August_w').value;
    var September_w = document.getElementById('September_w').value;
    var October_w = document.getElementById('October_w').value;
    var November_w = document.getElementById('November_w').value;
    var December_w = document.getElementById('December_w').value;

    var firstterm_w = document.getElementById('firstterm_w').value;
    var secondterm_w = document.getElementById('secondterm_w').value;
    var thirdterm_w = document.getElementById('thirdterm_w').value;
    var fourthterm_w = document.getElementById('fourthterm_w').value;
    var fifthterm_w = document.getElementById('fifthterm_w').value;
    var sixthterm_w = document.getElementById('sixthterm_w').value;
    var seventhterm_w = document.getElementById('seventhterm_w').value;
    var eighthterm_w = document.getElementById('eighthterm_w').value;


    var pieData = [
      {
         value: placemoney,            // 値
         color:"#F7464A",       // 色
         highlight: "#FF5A5E",  // マウスが載った際の色
         label: placedata     // ラベル
      },
      {
         value: allmoney,
         color: "#4D5360",
         highlight: "#616774",
         label: "その他"
      }

   ];

    var barChartData = {
      labels : ["0-2時","3時-5時","6時-8時","9時-11時","12時-14時","15時-17時","18時-20時","21時-23時"],
      datasets : [
         {
            fillColor : "rgba(240,128,128,0.6)",    // 塗りつぶし色
            strokeColor : "rgba(240,128,128,0.9)",  // 枠線の色
            highlightFill: "rgba(255,64,64,0.75)",  // マウスが載った際の塗りつぶし色
            highlightStroke: "rgba(255,64,64,1)",   // マウスが載った際の枠線の色
            data : [ firstTerm, secondTerm, thirdTerm, fourthTerm, fifthTerm, sixthTerm, seventhTerm, eighthTerm ]    // 各棒の値(カンマ区切りで指定)

         }
      ]

   }

   var lineChartData = {
      labels : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      datasets : [
         {
            label: "緑データ",
            fillColor : "rgba(92,220,92,0.2)", // 線から下端までを塗りつぶす色
            strokeColor : "rgba(92,220,92,1)", // 折れ線の色
            pointColor : "rgba(92,220,92,1)",  // ドットの塗りつぶし色
            pointStrokeColor : "white",        // ドットの枠線色
            pointHighlightFill : "yellow",     // マウスが載った際のドットの塗りつぶし色
            pointHighlightStroke : "green",    // マウスが載った際のドットの枠線色
            data : [ January, February, March, April, May, June, July, August, September, October, November, December ]       // 各点の値
         }
      ]

   }

   var barChartData2 = {
      labels : ["0-2時","3時-5時","6時-8時","9時-11時","12時-14時","15時-17時","18時-20時","21時-23時"],
      datasets : [
         {
            fillColor : "rgba(240,128,128,0.6)",    // 塗りつぶし色
            strokeColor : "rgba(240,128,128,0.9)",  // 枠線の色
            highlightFill: "rgba(255,64,64,0.75)",  // マウスが載った際の塗りつぶし色
            highlightStroke: "rgba(255,64,64,1)",   // マウスが載った際の枠線の色
            data : [ firstterm_w, secondterm_w, thirdterm_w, fourthterm_w, fifthterm_w, sixthterm_w , seventhterm_w, eighthterm_w]     // 各棒の値(カンマ区切りで指定)
         }
      ]

   }

   var lineChartData2 = {
      labels : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
      datasets : [
         {
            label: "緑データ",
            fillColor : "rgba(92,220,92,0.2)", // 線から下端までを塗りつぶす色
            strokeColor : "rgba(92,220,92,1)", // 折れ線の色
            pointColor : "rgba(92,220,92,1)",  // ドットの塗りつぶし色
            pointStrokeColor : "white",        // ドットの枠線色
            pointHighlightFill : "yellow",     // マウスが載った際のドットの塗りつぶし色
            pointHighlightStroke : "green",    // マウスが載った際のドットの枠線色
            data : [ January_w, February_w, March_w, April_w, May_w, June_w, July_w, August_w, September_w, October_w, November_w, December_w ]       // 各点の値
         }
      ]

   }
    
    //円グラフ
      var ctx = document.getElementById("graph-area").getContext("2d");
      window.myPie = new Chart(ctx).Pie(pieData);
      //棒グラフ
      var ctx = document.getElementById("graph-area2").getContext("2d");
      window.myBar = new Chart(ctx).Bar(barChartData);
      //折れ線グラフ
      var ctx = document.getElementById("graph-area3").getContext("2d");
      window.myLine = new Chart(ctx).Line(lineChartData);

       //棒グラフ
      var ctx = document.getElementById("graph-area4").getContext("2d");
      window.myBar = new Chart(ctx).Bar(barChartData2);
      //折れ線グラフ
      var ctx = document.getElementById("graph-area5").getContext("2d");
      window.myLine = new Chart(ctx).Line(lineChartData2);
   };

   // jQuery
   $(function(){
      var usemoney = $('#usemoney').text();
      var wastemoney = $('#wastemoney').text();
      $({count: 0}).animate({count: usemoney}, {
          duration: 1200,
          easing: 'linear',
          progress: function() { 
              $('#usemoney').text(Math.ceil(this.count)); 
          }
      });
      $({count: 0}).animate({count: wastemoney}, {
          duration: 1200,
          easing: 'linear',
          progress: function() { 
              $('#wastemoney').text(Math.ceil(this.count)); 
          }
      });
   });

  
   