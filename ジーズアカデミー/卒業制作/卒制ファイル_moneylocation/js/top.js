$(document).ready(function(){
			$('body').fadeIn(1000);// ページ読み込み時に実行したい処理
		});

$(function(){
	$('#menubtn').on('click',function(){
		$('.menulist').slideToggle();
	});
});