$(function(){

	var ctx,
    balls = [];
 
	var canvas = document.getElementById('mycanvas');
	    if (!canvas || !canvas.getContext) return false;
	    ctx = canvas.getContext('2d');

	//ボールについての変数
	var Ball = function(x,y,r){
		this.x = x;
		this.y = y;
		this.r = r;
		this.vx = rand(-40,40);
		this.vy = rand(-20,20);
		this.color = "rgba("+rand(0,255)+","+rand(0,255)+","+rand(0,255)+","+Math.random()+")";

		//ボールを描画する
		this.draw = function(){
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0 , Math.PI * 2);
			ctx.fillStyle = this.color;
			ctx.closePath();
			ctx.fill();
		};

		this.move = function(){
			if(this.x + this.r > canvas.width || this.x - this.r < 0){
				this.vx = -1 * this.vx; 
			}

			if(this.y + this.r > canvas.height || this.y - this.r < 0){
				this.vy = -1 * this.vy; 
			}
			this.x += this.vx;
			this.y += this.vy;

		};

	};

	var b = new Ball(100,100,30);
	b.draw();


	function rand(min,max){
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	$('#mycanvas').on('click',function(e){
		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top;
		var r = rand(1,55);
		if(x - r < 0){
			x = r;
		}
		if(x + r > canvas.width){
			x = canvas.width - r;
		}
		if(y - r < 0){
			y = r;
		}
		if(y + r > canvas.height){
			y = canvas.height - r;
		}
		balls.push(new Ball(x,y,r));
	});

	

	function clearStage(){
		ctx.fillStyle = '#ecf0f1';

		ctx.fillRect(0,0,canvas.width,canvas.height);
	}

	function update(){
		clearStage();
		for(var i = 0; i < balls.length; i++){
			balls[i].draw();
			balls[i].move();
		}

		setTimeout(function(){
			update();
		},30);
	}

	update();

	
	
});


