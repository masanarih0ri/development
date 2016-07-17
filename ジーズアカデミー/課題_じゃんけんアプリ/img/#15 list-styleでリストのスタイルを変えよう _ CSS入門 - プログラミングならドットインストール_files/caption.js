$(function() {
    var reversedCaptionRows
      , enableAutoScrollCaption = false;

    if (HMHM.cookie.get('caption_height')) {
        $('#caption').height(HMHM.cookie.get('caption_height'));
    }

    // toggle caption
    $('#toggle_text').click(function() {
        if ($('#caption_wrapper').is(':visible')) {
            $('#caption_wrapper').slideUp();
            $('#toggle_text_label').text('表示する');
            HMHM.cookie.set('display_caption', 0, 86400*90*1000, '/lessons/');
        } else {
            $('#caption_wrapper').slideDown();
            $('#toggle_text_label').text('閉じる');
            HMHM.cookie.set('display_caption', 1, 86400*90*1000, '/lessons/');
        }
        setHeightOfCaptionBottomSpacew();
    });

    // popover show left if popcaption is multiple line.
    $('.popcaption').each(function() {
        var el = $(this).get(0);
        if (typeof el.getClientRects !== 'function' || el.getClientRects().length === 1) {
            $(this).popover({
                trigger: 'click',
                placement: 'top'
            });
        } else {
            $(this).popover({
                trigger: 'click',
                placement: 'left'
            });
        }
    });

    $('.cinfo-link').click(function(e) {
        e.preventDefault();

        var sec = (function(t) {
            var sTime = t.split(':');
            return sTime[0] * 60 + sTime[1] * 1;
        })( $(this).parents('.caption-row').data('time') );

        HMHM.movie.ytplayer.seekTo(sec, true);
        HMHM.movie.ytplayer.playVideo();
    });

    $('.caption-row').click(function(e) {
        var sec = (function(t) {
            var sTime = t.split(':');
            return sTime[0] * 60 + sTime[1] * 1;
        })( $(this).data('time') );

        HMHM.movie.ytplayer.seekTo(sec, true);
        HMHM.movie.ytplayer.playVideo();
    });

    // popover 内がクリックされたか
    function isClickedInnerPopover(el) {
        while (el = el.parentNode) {
            if ($(el).hasClass('popover')) {
                return true;
            }
        }
        return false;
    }

    // popover 内のリンクがクリックされたか
    function isLinkClickedInnerPopover(el) {
        if (el.nodeName.toLowerCase() !== 'a') {
            return false;
        }

        return isClickedInnerPopover(el);
    }

    // popoverの位置を調整
    function adjustPopover($popcaption) {
        var $popover = $popcaption.next('.popover');

        $popover.find('img').on('load', function() {
            $popcaption.popover('show');
        });

        var popcaption = $popcaption.get(0);
        if (typeof popcaption.getClientRects !== 'function') {
            return false;
        }

        if (popcaption.getClientRects().length === 2) {
            var $el = $('<i />').css('display', 'inline').insertBefore(popcaption);
            var pos = $el.offset();
            $el.remove();
            var currentLeft = $popover.offset().left;
            $popcaption.next('.popover').offset({
                top: $popover.hasClass('in') ? $popover.offset().top - 10 : $popover.offset().top,
                left: pos.left - $popover.width() - 16
            });
        }
    }

    // 開いてる .popover を閉じる
    $('body').on('click', function(e) {
        // .popcaption のリンクをクリックした場合は何もしない
        if ($(e.target).hasClass('popcaption')) {
            $('.popover').each(function() {
                if ($(this).prev('.popcaption').get(0) != $(e.target).get(0)) {
                    $(this).prev('.popcaption').popover('hide');
                } else {
                    adjustPopover($(e.target));
                }
            });
            return false;
        }

        // popover 内のリンクは通常動作をするように
        if (isLinkClickedInnerPopover(e.target)) {
            return true;
        }

        // .popover 内をクリックした場合も何もしない
        if (isClickedInnerPopover(e.target)) {
            return false;
        }

        // 開いている .popover すべてについて
        $('.popover').each(function() {
            $(this).prev('.popcaption').popover('hide');
        });
    });

    var enableCaptionHeightChange = false;
    var mouseY;

    function supportSelectstart() {
        return "onselectstart" in document.createElement( "div" );
    }

    function disableSelection() {
        var eventName = supportSelectstart() ? 'selectstart' : 'mousedown';
        $('body').bind(eventName + '.disableSelection', function(e) {
            e.preventDefault();
        });
    }
    function enableSelection() {
        var eventName = supportSelectstart() ? 'selectstart' : 'mousedown';
        $('body').unbind(eventName + '.disableSelection');
    }

    $('#caption_handle').on('mousedown', function(e) {
        enableCaptionHeightChange = true;
        disableSelection();
        mouseY = e.clientY;
    });

    // update caption height by drag
    $('body').on('mouseup', function() {
        enableCaptionHeightChange = false;
        enableSelection();
    }).on('mousemove', function(e) {
        if (enableCaptionHeightChange) {
            var amount = e.clientY - mouseY;
            mouseY = e.clientY;
            var newHeight = $('#caption').height() + amount;
            if (newHeight < 0) {
                newHeight = 0;
            }
            if (newHeight > $('#caption').get(0).scrollHeight) {
                newHeight = $('#caption').get(0).scrollHeight;
            }
            HMHM.cookie.set('caption_height', newHeight, 86400*90*1000, '/lessons/');
            $('#caption').height(newHeight);

            // last row can be scrolled to top.
            setHeightOfCaptionBottomSpacew();
        }
    });

    // hide popover if caption is scrolled.
    $('#caption').on('scroll', function() {
        $('.popcaption').popover('hide');
    })

    // disabled auto scroll if mouseover
    $('.caption-row').on('mouseover', function() {
        enableAutoScrollCaption = false;
        if (!$(this).find('.iconSound').hasClass('on')) {
            $(this).find('.iconSound').addClass('mouseover');
        }
    }).on('mouseout', function() {
        enableAutoScrollCaption = true;
        if (!$(this).find('.iconSound').hasClass('on')) {
            $(this).find('.iconSound').removeClass('mouseover');
        }
    });

    if ($('.caption-row').length > 0) {
        enableAutoScrollCaption = true;
        reversedCaptionRows = $('.caption-row').get().reverse();
        setHeightOfCaptionBottomSpacew();
    }

    function setHeightOfCaptionBottomSpacew() {
        var height = $('#caption').height() - $('.caption-row:last').height() - $('#caption_handle').height() + 3;
        $('#caption_bottom_space').height(height);
    }

    function getCaptionBaseTop() {
        var baseTop = $('#caption_base_top').offset().top;
        if ($('#caption_base_top').data('is-premium') === false) {
            baseTop += $('.explain_premium').height();
        }
        return baseTop;
    }

    function scrollCaption() {
        setTimeout(function() {
            if (HMHM.movie.ytplayer && HMHM.movie.ytplayer.getPlayerState() === 1) {
                doAutoScrollCaption();
                highLightCurrentCaptionRow();
            }

            scrollCaption();
        }, 500);
    }

    function doAutoScrollCaption() {
        if (!enableAutoScrollCaption) {
            return false;
        }

        seekCurrentCaptionRow(function($row, expectedScrollTop) {
            enableAutoScrollCaption = false;

            $('#caption').animate({
                scrollTop: expectedScrollTop
            }, 500, function() {
                enableAutoScrollCaption = true;
            });
        });
    }

    function highLightCurrentCaptionRow() {
        seekCurrentCaptionRow(function($row, _) {
            $('.caption-row').removeClass('active');
            $row.addClass('active');

            $('.caption-row').find('.iconSound').removeClass('on');
            $row.find('.iconSound').removeClass('mouseover').addClass('on');
        });
    }

    function seekCurrentCaptionRow(callback) {
        var expectedScrollTop = 0
          , currentTime = ~~HMHM.movie.ytplayer.getCurrentTime()
          , $row
          , rowSec
          , i
          , j;

        // 最後の行からたどる
        for (i = 0; i < reversedCaptionRows.length; i++) {
            $row = $(reversedCaptionRows[i]);

            rowSec = $row.data('time').substr(0, 1) * 60 + $row.data('time').substr(2, 3) * 1;

            // 現在の再生時間が初めて行の再生時間を超える -> その行がスクロールの目標
            if (rowSec <= currentTime) {
                // 残りの行の height 等を加算してスクロール量を決定
                for (var j = i + 1; j < reversedCaptionRows.length; j++) {
                    expectedScrollTop += $(reversedCaptionRows[j]).height() + 15;
                }
                callback($row, expectedScrollTop);
                break;
            }
        }
    }

    // start caption auto scroll
    if ($('#caption').length === 1) {
        scrollCaption();
    }
});
