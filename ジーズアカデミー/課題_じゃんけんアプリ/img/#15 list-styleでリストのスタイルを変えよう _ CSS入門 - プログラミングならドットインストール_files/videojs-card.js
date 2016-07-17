/**
 * Video.js Card
 *
 * This plugin for Video.js adds a card on player
 */

(function(window, videojs) {
    'use strict';

    /**
     * Normal Card Component
     */
    function createNormalCard(player, cardOptions) {
        var cardClassNames
          , cardEl
          , card;

        function _createLinkElement(options) {
            var a = document.createElement('a');

            a.href = options.url;
            a.target = '_blank';

            a.appendChild(document.createTextNode(options.text));

            return a;
        }

        function _createTextElement(options) {
            var span = document.createElement('span');

            span.appendChild(document.createTextNode(options.text));

            return span;
        }

        function _parseTimeStr(str) {
            var ms;

            if (typeof str !== 'string') {
                return str;
            }

            if (ms = str.match(/^([012]):(\d\d)$/)) {
                return ms[1] * 1 * 60 + ms[2] * 1;
            }

            return str;
        }

        cardClassNames = [
            'vjs-card',
            'vjs-normal-card'
        ];

        // position
        if (cardOptions.hasOwnProperty('position')) {
            $.each(cardOptions.position.split(' '), function(i, pos) {
                switch (pos) {
                case 'top':
                case 'bottom':
                case 'left':
                case 'right':
                    cardClassNames.push('vjs-card-' + pos);
                    break;
                }
            });
        } else {
            cardClassNames.push('vjs-card-top');
            cardClassNames.push('vjs-card-right');
        }

        cardEl = videojs.Component.prototype.createEl(null, {
            className: cardClassNames.join(' ')
        });

        switch (cardOptions.type) {
        case 'link':
            cardEl.appendChild(_createLinkElement(cardOptions));
            break;
        case 'text':
            cardEl.appendChild(_createTextElement(cardOptions));
            break;
        }

        card = new videojs.Card(player, {
            el: cardEl,
            type: 'normal',
            start: _parseTimeStr(cardOptions.start),
            end: _parseTimeStr(cardOptions.end)
        });

        return card;
    }

    /**
     * create card for comment
     */
    function createCommentCard(player, commentCount) {
        var cardEl
          , closeBtn
          , card;

        cardEl = videojs.Component.prototype.createEl(null, {
            className: 'vjs-card vjs-comment-card'
        });

        closeBtn = document.createElement('a');
        closeBtn.innerHTML = 'x';
        closeBtn.className = 'vjs-card-close';
        closeBtn.onclick = function() {
            player.Card.comment.closed = true;
            $(this).parent().fadeOut();
        };

        cardEl.appendChild(closeBtn)

        cardEl.appendChild(document.createTextNode(
            'このレッスンには ' + commentCount + ' 件の補足情報があります。動画下の「補足情報」タブも確認しましょう。'
        ));

        card = new videojs.Card(player, {
            el: cardEl,
            type: 'comment',
            comment_count: commentCount,
            closed: false
        });

        return card;
    }

    function createSummaryCard(player) {
        var cardEl
          , card
          , title
          , summary;

        cardEl = videojs.Component.prototype.createEl(null, {
            className: 'vjs-card vjs-summary-card vjs-hidden'
        });

        title = document.createElement('h4');
        title.className = 'title';
        title.appendChild(document.createTextNode('今回のまとめ'));

        summary = document.getElementById('lesson_summary');

        cardEl.appendChild(title);
        cardEl.appendChild(document.createElement('ul'));

        for (var i = 0; i < summary.children.length; i++) {
            var li = document.createElement('li');
            li.innerHTML = summary.children[i].innerHTML;
            cardEl.lastChild.appendChild(li);
        }

        card = new videojs.Card(player, {
            el: cardEl,
            type: 'summary'
        });

        return card;
    }

    /**
     * Card constructor
     */
    videojs.Card = videojs.Component.extend({
        /** @constructor */
        init: function(player, options) {
            // Call the parent constructor
            videojs.Component.call(this, player, options);

            switch (options.type) {
            case 'normal':
                // for normal card
                player.on('timeupdate', videojs.bind(this, function() {
                    if (player.currentTime() >= this.options().start && player.currentTime() < this.options().end) {
                        this.addClass('vjs-card-show');
                        this.removeClass('vjs-card-hidden');
                    } else {
                        this.removeClass('vjs-card-show');
                        this.addClass('vjs-card-hidden');
                    }
                }));

                break;
            /*case 'summary':
                player.on('ended', function() {
                    if ("summary" in player.Card) {
                        player.Card.summary.removeClass('vjs-hidden');
                        player.Card.summary.addClass('vjs-card-show');
                    }
                });

                break;*/
            }

            /*if (options.type === 'comment') {
                player.on('timeupdate', function() {
                    if ("comment" in player.Card && !player.Card.comment.closed) {
                        this.addClass('vjs-card-show');
                    }
                }.bind(this));
            }
            */
        }
    });

    /**
     * CardMarker
     */
    videojs.CardMarker = videojs.Component.extend({
        init: function(player, options) {
            videojs.Component.call(this, player, options);
        }
    });

    /***********************************************************************************
     * Register the plugin with videojs, main plugin function
     ***********************************************************************************/
    videojs.plugin('Card', function(options) {
        var player = this
          , normalCard
          , commentCard
          , summaryCard
          , id
          , lessonId = $('#lesson_id').val();

        function _addCardMarker(player, card) {
            var marker;

            player.on('loadedmetadata', function() {
                // card.start + (seek handle width)
                var left = Math.round((card.start + 1) * 1000 / player.duration()) / 10;

                marker = new videojs.CardMarker(player, {
                    el: videojs.Component.prototype.createEl(null, {
                        className: 'vjs-card-marker'
                    })
                });

                marker.el().style.left = left + '%';

                player.controlBar.progressControl.seekBar.addChild(marker);
            });
        }

        function _addNormalCard(player, card) {
            var i;

            if (card instanceof Array) {
                for (i = 0; i < card.length; i++) {
                    _addNormalCard(player, card[i]);
                }
            } else {
                player.Card.normal[id] = player.addChild(
                    createNormalCard(player, card)
                );

                _addCardMarker(player, card);
            }
        }

        player.Card = {
            normal: []
        };

        if (typeof Dotinstall !== 'undefined' && Dotinstall.video && Dotinstall.video.cards && lessonId > 0) {
            for (id in Dotinstall.video.cards) {
                if (Dotinstall.video.cards.hasOwnProperty(id) && id === lessonId) {
                    _addNormalCard(player, Dotinstall.video.cards[id]);
                }
            }
        }

        /*if (options.comment_count > 0) {
            commentCard = createCommentCard(player, options.comment_count);
            player.Card.comment = player.addChild(commentCard);
        }*/

        /*summaryCard = createSummaryCard(player);
        player.Card.summary = player.addChild(summaryCard);*/
    });

})(window, window.videojs);
