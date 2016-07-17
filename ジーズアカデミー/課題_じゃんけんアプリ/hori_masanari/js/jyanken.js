
//グローバル関数

var handImg = ["img/hand0.png","img/hand1.png","img/hand2.png"]
var resultText = ['WIN','DRAW','LOSE']; 
var startText = ['じゃん','けん','ぽん！'];




    $(function(){

        $(window).load(function(){
            $.magnificPopup.open({
            items: {src: '#popup'},
            type: 'inline', 
            modal: true,
        }, 0);

        });
         $('#popupClose,#popup,body').on('click',function(){
            $.magnificPopup.close();
        });

        var timer;
        function start(r){
            $('.result').text(startText[r]);
            r++;
            if(r<3){
            timer = setTimeout(function(){
                    start(r);
                },700);
            }
        }
        //開始ボタンを押したら、グー、チョキ、パーのボタンを表示・「じゃん・けん・ぽん」のテキストを表示。

       
        $('#btnStart').on('click',function(){
            $('.rpsBtn').show();
            $('#btnStart').hide();
            $('.com').text('?');
            $('.ply').text('?');
            start(0);
        });
    

//グー、チョキ、パーのボタンにマウスオンすると、?のところに画像を表示
    

        // $('#btnR').on('mouseover',function(){
        //     $('.ply').html('<img src="' + handImg[0] + '" width="120" height="120" alt="" />');
        // });

        // $('#btnS').on('mouseover',function(){
        //     $('.ply').html('<img src="' + handImg[1] + '" width="120" height="120" alt="" />');
        // });

        // $('#btnP').on('mouseover',function(){
        //     $('.ply').html('<img src="' + handImg[2] + '" width="120" height="120" alt="" />');
        // });
   


//ボタンを押したら自分の手とコンピューターの手を決める・もう一回ボタンを表示
    
        var r,winSum = 0;
        $('#btnR').on('click',function(){
            r = Math.floor(Math.random() * handImg.length);
            $('.ply').html('<img src="' + handImg[0] + '" width="120" height="120" alt="" />');
            $('.com').html('<img src="' + handImg[r] + '" width="120" height="120" alt="" />');
            $('.rpsBtn').hide();
            $('#btnStart').show().text('もう一回');
        });
        $('#btnS').on('click',function(){
            r = Math.floor(Math.random() * handImg.length);
            $('.ply').html('<img src="' + handImg[1] + '" width="120" height="120" alt="" />');
            $('.com').html('<img src="' + handImg[r] + '" width="120" height="120" alt="" />');
            $('.rpsBtn').hide();
            $('#btnStart').show().text('もう一回');
        });

        $('#btnP').on('click',function(){
            r = Math.floor(Math.random() * handImg.length);
            $('.ply').html('<img src="' + handImg[2] + '" width="120" height="120" alt="" />');
            $('.com').html('<img src="' + handImg[r] + '" width="120" height="120" alt="" />');
            $('.rpsBtn').hide();
            $('#btnStart').show().text('もう一回');
        });

        function judge (r){
            $('.girlImgClass').find('img').css('opacity',(0.05 + r*0.1));
            $('.girlImgClass').find('img').css('width',(60 + r*60)+'px');
            $('.girlImgClass').find('img').css('height',(60 + r*60)+'px');
        };


        $('.rpsBtn').on('click', 'button', function(){
           var youSelect = parseInt($(this).val());
           var result;
           clearTimeout(timer);

           if(r == youSelect){
            result = 1;
           } else if( r == (youSelect + 1) % 3){
            result = 0;
            winSum++;
            judge(winSum);
           }else{
            result = 2;
            winSum--;
            judge(winSum);
           }
           $('.result').text(resultText[result]);
        });
    });

