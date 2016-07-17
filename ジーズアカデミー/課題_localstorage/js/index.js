$(function(){
		var myname = localStorage.getItem('name');
		var myusername = localStorage.getItem('username');

		function text(){
			$('#abouttextline1').fadeIn(1500);
			$('#abouttextline2').fadeIn(1600);
			$('#abouttextline3').fadeIn(1700);
			$('#abouttextline4').fadeIn(1800);
			$('#abouttextline5').fadeIn(1900);
			$('#abouttextline6').fadeIn(2000);
			$('#abouttextline7').fadeIn(2100);
			$('#abouttextline8').fadeIn(2200);
			$('#abouttextline9').fadeIn(2300);
			$('#abouttextline10').fadeIn(2400);
			$('#abouttextline11').fadeIn(2500);
		}

		if(myname == null || myusername == null){
			$('.myrealname').hide();
			$('.myusername').hide();
			$('.logininfo').hide();
		}else{
			$('.myrealname').text('User Name:' + myname).show();
			$('.myusername').text('User ID:' + myusername).show();
			$('.logininfo').show();
			$('#myname').val(myname);
			$('#myusername').val(myusername)
		}

		text();



	$('#editinfobutton').on('click',function(){
		$('#mainscreenpopout').fadeIn();
	});
	$('#cancelinfochange').on('click',function(){
		$('#mainscreenpopout').fadeOut();
	});
	$('#submitinfochange').on('click',function(){
		var myname = $('#myname').val();
		var myusername = $('#myusername').val();
		var mypassword = $('#mypassword').val();

		$('.myrealname').text('User Name:' + myname).show();
		$('.myusername').text('User ID:' + myusername).show();
		$('.logininfo').text('ログイン情報').show();
		localStorage.setItem('name',myname);
		localStorage.setItem('username',myusername);
		localStorage.setItem('password',mypassword);
		$('#mainscreenpopout').fadeOut();
	});

	$('#editinfobutton2').on('click',function(){
		localStorage.clear();
		$('.myrealname').hide();
		$('.myusername').hide();
		$('.logininfo').text('ログアウトしました').fadeOut(3000);
	});

});