$(function() {
    // #back-to-topを消す
    $('#back-to-top').hide();  
    // スクロールが十分されたら#back-to-topを表示、スクロールが戻ったら非表示
    $(window).scroll(function() {
        if ($(this).scrollTop() > 60) {
            $('#back-to-top').fadeIn();
        } else {
            $('#back-to-top').fadeOut();
        }
    });
        
    // #back-to-topがクリックされたら上に戻る
        $('#back-to-top a').click(function() {
            $('body,html').animate({
                scrollTop:0
            }, 500);
            return false;
        });
});