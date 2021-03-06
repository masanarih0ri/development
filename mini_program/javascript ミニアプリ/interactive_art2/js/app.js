(function(){
	'use strict';

	var canvas;
	var ctx;
	var Ball;
	var balls = [];
	//オブジェクト
	var Stage;
	//インスタンス
	var stage;

	canvas = document.getElementById('mycanvas');
	if(!canvas || !canvas.getContext){
		return false;
	}

	ctx = canvas.getContext('2d');

	//min~maxの数字の間で乱数を発生させるための関数
	function rand(min,max){
		return min + Math.floor(Math.random() * (max-min+1));
	}

	function adjustPosition(pos,r,max){
		// if(x - r < 0){
		// 	x = r;
		// }
		// if(y - r < 0){
		// 	y = r;
		// }
		// if(x + r > canvas.width){
		// 	x = canvas.width - r;
		// }
		// if(y + r > canvas.height){
		// 	y = canvas.height - r;
		// }
		if(pos - r < 0){
			return r;
		}else if(pos + r > max){
			return max - r;
		}else{
			return pos;
		}
	}

	canvas.addEventListener('click',function(e){
		var rect = e.target.getBoundingClientRect();
		var x = e.clientX - rect.left;
		var y = e.clientY - rect.top;
		var r = rand(0.100) < 20 ? rand(50,80) : rand(10,35);
		// if(x - r < 0){
		// 	x = r;
		// }
		// if(y - r < 0){
		// 	y = r;
		// }
		// if(x + r > canvas.width){
		// 	x = canvas.width - r;
		// }
		// if(y + r > canvas.height){
		// 	y = canvas.height - r;
		// }

		x = adjustPosition(x,r,canvas.width);
		y = adjustPosition(y,r,canvas.height);
		
		balls.push(new Ball(x,y,r));

	});

	Ball = function(x,y,r){
		this.x = x;
		this.y = y;
		this.r = r;

		//x方向の速度、y方向の速度をランダムに設定
		this.vx = rand(-10,10);
		this.vy = rand(-10,10);

		this.color = 'hsla('+ rand(50,100) + ',' + rand(40,80)+ '%,' + rand(50,60) + '%,' + Math.random() + ')';
	};

	Ball.prototype.draw = function(){
		ctx.beginPath();
		//円を描く
		ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.closePath();
		ctx.fill();	
	}

	Ball.prototype.move = function(){
		if(this.x + this.r > canvas.width || this.x - this.r < 0){
			this.vx *= -1;
		}
		if(this.y + this.r > canvas.height || this.y - this.r < 0){
			this.vy *= -1;
		}
		this.x += this.vx;
		this.y += this.vy;
	}

	// var ball = new Ball(rand(100,200),rand(100,200),rand(10,40));
	// ball.draw();

	Stage = function(){
		this.update = function(){
			var i;
			this.clear();
			for(i = 0; i < balls.length; i++){
				balls[i].draw();
				balls[i].move();
			}
			
			//30msごとにupdate関数を繰り返す
			setTimeout(function(){
				this.update();
			}.bind(this),30);
		};

		this.clear = function(){
			//canvas全体を塗りつぶして前の円を消す
			ctx.fillStyle = '#ecf0f1';
			ctx.fillRect(0,0,canvas.width,canvas.height);
		}
	};

	
	stage = new Stage();
	stage.update();

})();


  // (function() {
  //   'use strict';

  //   var canvas;
  //   var ctx;
  //   var Ball;

  //   canvas = document.getElementById('mycanvas');
  //   if (!canvas || !canvas.getContext) return false;
  //   ctx = canvas.getContext('2d');

  //   function rand(min, max) {
  //     // 0-n
  //     // Math.floor(Math.random() * (n + 1))
  //     // min-max
  //     return min + Math.floor(Math.random() * (max - min + 1));
  //   }

  //   Ball = function(x, y, r) {
  //     this.x = x;
  //     this.y = y;
  //     this.r = r;
  //     this.color = 'hsla(120, 80%, 40%, 0.8)';
  //     this.draw = function() {
  //       ctx.beginPath();
  //       ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
  //       ctx.fillStyle = this.color;
  //       ctx.closePath();
  //       ctx.fill();
  //     };
  //   };

  //   var ball = new Ball(rand(100, 200), rand(100, 200), rand(10, 50));
  //   ball.draw();


  // })();
