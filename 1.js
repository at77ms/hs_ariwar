
/*********************全局变量*******************************/
var canvasWidth = 480;	//画布的宽
var canvasHeight = 650;	//画布的高

var canvas = document.getElementById('canvas');
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');


const PHASE_DOWNLOADING = 1;	//图片下载阶段
const PHASE_READY = 2;		//就绪阶段
const PHASE_STARTING = 3;	//游戏加载阶段
const PHASE_PLAY = 4;		//游戏进行阶段
const PHASE_PAUSE = 5;		//游戏暂停阶段
const PHASE_GAMEOVER = 6;	//游戏结束阶段

var cur_phase=PHASE_DOWNLOADING;  //游戏当前所在的阶段


var score=0;		 //当前积分
var topscore=0;		//最高分
var c=0;			//判断是否打破记录
var level=1;		//游戏等级
var lives=3;		//玩家剩余的命数
var bigbang=3;		 //大爆炸绝招

//游戏所需的所有图片
var imgBackground;		
var imgBullet1;			//子弹
var imgsEnemy1 = [];	//小号敌机所有图片
var imgsEnemy2 = [];	//中号敌机所有图片
var imgsEnemy3 = [];	//大号敌机所有图片
var imgsGameLoading = [];	//游戏加载中所有图片
var imgGamePauseNor;
var imgsHero = [];		//英雄所有的图片
var imgStart;			//就绪阶段的图片



/******************阶段1：PASE_DOWNLOADING*******************/

download();
function download(){
	var progress = 0; //下载进度：共有33张，每张的进度权重算3，背景图权重算4，权重和为100
	ctx.font = '50px Helvetica'; //加载进度的字体
	ctx.fillStyle = '#666';
	ctx.strokeStyle = '#666';
	ctx.lineWidth=10;
	function drawProgress(){  //每次加载完一张图片，都会重新绘制当前进度
		ctx.clearRect(0,0,canvasWidth,canvasHeight);//清除画布上已有的内容
		var txt = progress+'%';
		var arc=-90+parseInt(progress*3.6); //设置描绘圆弧的结束角度
		ctx.beginPath();	
		var w = ctx.measureText(txt).width;
		ctx.fillText(txt, canvasWidth/2-w/2, canvasHeight/2+50/2);
		ctx.arc(canvasWidth/2,canvasHeight/2+8,80,-90*Math.PI/180,arc*Math.PI/180);	
		ctx.stroke();		
		
		if(progress>=100){  //所有图片加载完成，开始游戏
			startGame();
		}
	}
	imgBackground = new Image();
	imgBackground.src = 'img/background.png';
	imgBackground.onload = function(){
		progress += 4;
		drawProgress();
	}
	imgBullet1 = new Image();
	imgBullet1.src = 'img/bullet1.png';
	imgBullet1.onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[0] = new Image();
	imgsEnemy1[0].src = 'img/enemy1.png';
	imgsEnemy1[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[1] = new Image();
	imgsEnemy1[1].src = 'img/enemy1_down1.png';
	imgsEnemy1[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[2] = new Image();
	imgsEnemy1[2].src = 'img/enemy1_down2.png';
	imgsEnemy1[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[3] = new Image();
	imgsEnemy1[3].src = 'img/enemy1_down3.png';
	imgsEnemy1[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy1[4] = new Image();
	imgsEnemy1[4].src = 'img/enemy1_down4.png';
	imgsEnemy1[4].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[0] = new Image();
	imgsEnemy2[0].src = 'img/enemy2.png';
	imgsEnemy2[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[1] = new Image();
	imgsEnemy2[1].src = 'img/enemy2_down1.png';
	imgsEnemy2[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[2] = new Image();
	imgsEnemy2[2].src = 'img/enemy2_down2.png';
	imgsEnemy2[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[3] = new Image();
	imgsEnemy2[3].src = 'img/enemy2_down3.png';
	imgsEnemy2[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy2[4] = new Image();
	imgsEnemy2[4].src = 'img/enemy2_down4.png';
	imgsEnemy2[4].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[0] = new Image();
	imgsEnemy3[0].src = 'img/enemy3_n1.png';
	imgsEnemy3[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[1] = new Image();
	imgsEnemy3[1].src = 'img/enemy3_n2.png';
	imgsEnemy3[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[2] = new Image();
	imgsEnemy3[2].src = 'img/enemy3_hit.png';
	imgsEnemy3[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[3] = new Image();
	imgsEnemy3[3].src = 'img/enemy3_down1.png';
	imgsEnemy3[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[4] = new Image();
	imgsEnemy3[4].src = 'img/enemy3_down2.png';
	imgsEnemy3[4].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[5] = new Image();
	imgsEnemy3[5].src = 'img/enemy3_down3.png';
	imgsEnemy3[5].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[6] = new Image();
	imgsEnemy3[6].src = 'img/enemy3_down4.png';
	imgsEnemy3[6].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[7] = new Image();
	imgsEnemy3[7].src = 'img/enemy3_down5.png';
	imgsEnemy3[7].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsEnemy3[8] = new Image();
	imgsEnemy3[8].src = 'img/enemy3_down6.png';
	imgsEnemy3[8].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsGameLoading[0] = new Image();
	imgsGameLoading[0].src = 'img/game_loading1.png';
	imgsGameLoading[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsGameLoading[1] = new Image();
	imgsGameLoading[1].src = 'img/game_loading2.png';
	imgsGameLoading[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsGameLoading[2] = new Image();
	imgsGameLoading[2].src = 'img/game_loading3.png';
	imgsGameLoading[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsGameLoading[3] = new Image();
	imgsGameLoading[3].src = 'img/game_loading4.png';
	imgsGameLoading[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgGamePauseNor = new Image();
	imgGamePauseNor.src = 'img/game_pause_nor.png';
	imgGamePauseNor.onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[0] = new Image();
	imgsHero[0].src = 'img/hero1.png';
	imgsHero[0].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[1] = new Image();
	imgsHero[1].src = 'img/hero2.png';
	imgsHero[1].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[2] = new Image();
	imgsHero[2].src = 'img/hero_blowup_n1.png';
	imgsHero[2].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[3] = new Image();
	imgsHero[3].src = 'img/hero_blowup_n2.png';
	imgsHero[3].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[4] = new Image();
	imgsHero[4].src = 'img/hero_blowup_n3.png';
	imgsHero[4].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgsHero[5] = new Image();
	imgsHero[5].src = 'img/hero_blowup_n4.png';
	imgsHero[5].onload = function(){
		progress += 3;
		drawProgress();
	}
	imgStart = new Image();
	imgStart.src = 'img/start.png';
	imgStart.onload = function(){
		progress += 3;
		drawProgress();
	}

}

/******************阶段2：PASE_READY*************************/

var sky;  
var logo;
function startGame(){
	cur_phase=PHASE_READY;
	sky=new Sky(imgBackground);
	logo=new Logo(imgStart);
	
	startEngine();   //启动真正的游戏引擎
}
function Sky(img){    //定义背景图的构造函数，
	
	this.x1=0;
	this.y1=0;
	this.x2=0;
	this.y2=-img.height;
	this.draw=function(){
		ctx.drawImage(img,this.x1,this.y1);
		ctx.drawImage(img,this.x2,this.y2);
	}
	this.move=function(){   //原来：利用两张图循环向下移动
		this.y1++;
		this.y2++;
		if(this.y1>=canvasHeight){
			this.y1=this.y2-img.height;
		}
		if(this.y2>=canvasHeight){
			this.y2=this.y1-img.height;
		}
	}
}
function Logo(img){        //定义加载完成时的logo显示 的构造函数
	this.x=0;
	this.y=0;
	this.draw=function(){
		ctx.drawImage(img,this.x+38,this.y);
	}
	canvas.addEventListener('click',function(){
		if(cur_phase==PHASE_READY){
			cur_phase=PHASE_STARTING;
			loading=new Loading(imgsGameLoading);
		}
	},false);
}



/******************阶段3：PASE_STARTING**********************/

function startEngine(){          //定义游戏核心引擎函数
	setInterval(function(){
		sky.draw();
		sky.move();
		
		switch (cur_phase){      //判断不同的游戏状态
			case PHASE_READY:
				logo.draw();         //画logo
				break;
			case PHASE_STARTING:      //准备开始游戏
				loading.draw();
				loading.move();
				break;
			case PHASE_PLAY:          //开始游戏
				hero.draw();
				hero.move();
				bulletList.draw();
				bulletList.move();
				enemyList.draw();
				enemyList.move();		
				drawScore();			//绘制得分
				break;
			case PHASE_PAUSE:           //暂停状态
				hero.draw();
				bulletList.draw();
				enemyList.draw();
				drawScore();
				drawPause();
				break;
			case PHASE_GAMEOVER:    
				drawGameover();
				again();             //重新开始游戏
				break;
		}
	
	},42);   //每秒钟绘制24次
	
}

/*********************准备开始游戏******************************/
var loading;                  
function Loading(img){
	this.x=0;
	this.y=canvasHeight-img[0].height;
	this.i=0;             //当前图片的下标
	this.draw=function(){
		ctx.drawImage(img[this.i],this.x,this.y);
	}
	this.count=0;         //记录加载图片的次数
	this.move=function(){
		this.count++;
		if(this.count%8===0){   //每过8*42ms才换下一张
			this.i++;
			if(this.i>=img.length){
				cur_phase=PHASE_PLAY;
				hero=new Hero(imgsHero);
				bulletList= new BulletList();
				enemyList= new EnemyList();
			}
		}
	}
}
/*******************游戏开始****************************/
var hero=null;
function Hero(img){
	this.x=canvasWidth/2-img[0].width/2;
	this.y=canvasHeight-img[0].height;
	this.width=img[0].width;
	this.height=img[0].height;
	this.crashed=false;				//是否被敌机碰撞
	this.i=0;                     //待绘制的是数组中的哪个图片
	this.draw=function(){
		ctx.drawImage(img[this.i],this.x,this.y);
	}
	this.count=0;
	this.move=function(){
		this.count++;
		if(this.count%2===0){
			if(!this.crashed){
				if(this.i==0){
					this.i=1;
				}else if(this.i==1){
					this.i=0;
				}
			}else{		//开始撞毁程序
				if(this.i==0||this.i==1){
					this.i=2;
				}else if(this.i<img.length-1){
					this.i++;
				}else{
					lives--;      //减去英雄的性命
					if(lives>0){
						hero=new Hero(imgsHero);
					}else{
						cur_phase = PHASE_GAMEOVER;
					}
				}
			}
		}
		if(this.count%5==0){   ///边移动，边发射子弹  发弹速度
			this.fire();
		}
	
	}
	this.fire=function(){            //让英雄发子弹
		if(level>=1){
			var b=new Bullet(imgBullet1);
			bulletList.add(b);
		}
		if(level>=2){
			var a=new Bullet(imgBullet1);
			bulletList.add(a);
			b.x+=10;
			a.x-=10;
			a.d=0;
		}
		if(level>=3){
			var c=new Bullet(imgBullet1);
			bulletList.add(c);
			c.x+=15;
			c.d=1;
			a.x-=5;
			a.d=-1;
			b.x-=10;
		}
	}
}
/***鼠标控制英雄***/
canvas.addEventListener('mousemove',function(e){
	if(cur_phase==PHASE_PLAY){
		var x=e.offsetX;
		var y=e.offsetY;
		hero.x=x-imgsHero[0].width/2;
		hero.y=y-imgsHero[0].height/2;
	}
},false);

/**************子弹构造函数***************/
function Bullet(img){
	this.x=hero.x+(imgsHero[0].width/2-img.width/2);
	this.y=hero.y-img.height;
	this.d=0;					//子弹发射的方向
	this.width=img.width;
	this.height=img.height;
	this.removable=false;        //是否删除子弹

	this.draw=function(){
		ctx.drawImage(img,this.x,this.y);
	}
	this.move=function(){
		this.y-=8;
		this.x+=this.d;				//改变子弹发射的方向
		if(this.y<=-img.height){
			this.removable=true;
		}
	}
}
/***子弹列表，保存当前所有的子弹*****/
var bulletList=null;
function BulletList(){
	this.arr=[];
	this.add=function(bullet){
		this.arr.push(bullet);
	}
	this.remove=function(i){
		this.arr.splice(i,1);
	}
	this.draw=function(){         //绘制每一颗子弹
		for(var i in this.arr){
			this.arr[i].draw(); //数组中的没个对象都是一个Bullet函数
		}
	}
	this. move=function(){
		for(var i in this.arr ){
			this.arr[i].move();
			if(this.arr[i].removable){
				this.remove(i);
				i--;
			}
		}
	}
}
/******绘制敌机******/
function Enemy1(imgs){     //小敌机
	this.x=Math.random()*(canvasWidth-imgs[0].width);
	this.y=-imgs[0].height;
	this.width= imgs[0].width;
	this.height= imgs[0].height;

	this.index=0;
	this.speed=parseInt(5+level);
	this.removable=false;    //是否删除
	this.blood=1;           //血量
	this.crashed=false;     //判断是否被击毁
	this.count=0;
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.move=function(){
		this.y+=this.speed;
		this.count++;
		this.checkHit();      //碰撞测试
		if( this.crashed && this.count%2==0){
			if(this.index==0){
				this.index=1;
			}else if(this.index<imgs.length-1){
				this.index++;
			}else{
				this.removable=true;
			}
		}
		if(this.y>=canvasHeight){
			this.removable=true;
		}
	}
	this.checkHit=function(){
		for(var i in bulletList.arr ){
			var b=bulletList.arr[i];
			if(              //测试没每个子弹是否击中飞机
				(this.x+this.width>=b.x)
				&& (this.y+this.height>=b.y)
				&&(b.x+b.width>=this.x)
				&&(b.y+b.height>=this.y)
			){
				this.blood--;
				if(this.blood<=0){
					this.crashed=true;
					score+=6;        //击毁敌机加分
				}
				b.removable=true;     //删除子弹
			}
		}
		if(							//检查英雄是否装机敌机
			(this.x+this.width>=hero.x)
			&& (this.y+this.height>=hero.y)
			&& (hero.x+hero.width>=this.x)
			&& (hero.y+hero.height>=this.y)
		){
			hero.crashed=true;
		}
	}
}

function Enemy2(imgs){     //中敌机
	this.x=Math.random()*(canvasWidth-imgs[0].width);
	this.y=-imgs[0].height;

	this.width=imgs[0].width;
	this.height=imgs[0].height;
	this.crashed=false;

	this.index=0;
	this.speed=parseInt(4+level);
	this.removable=false;
	this.blood=3;
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.count=0;
	this.move=function(){
		this.count++;
		this.y+=this.speed;
		this.checkHit();
		if(this.crashed && this.count%2==0){
			if(this.index==0){
				this.index=1;
			}else if(this.index<imgs.length-1){
				this.index++;
			}else{
				this.removable=true;
			}
		}
		if(this.y>=canvasHeight){
			this.removable=true;
		}
	}
	this.checkHit=function(){

		for(var i in bulletList.arr ){
			var b=bulletList.arr[i];
			if( (this.x+this.width>=b.x)
				&&(b.x+b.width>=this.x)
				&&(this.y+this.height>=b.y)
				&&(b.y+b.height>=this.y) ){
				this.blood--;
				if(this.blood<=0){ //没有血格了，开始撞毁进程
					this.crashed = true;
					score+=15;
				}
				b.removable = true;
			}
		}
		if(
			(this.x+this.width>=hero.x)
			&& (this.y+this.height>=hero.y)
			&& (hero.x+hero.width>=this.x)
			&& (hero.y+hero.height>=this.y)
		){
			hero.crashed=true;
		}
	}
}

function Enemy3(imgs){     //大敌机
	this.x=Math.random()*(canvasWidth-imgs[0].width);
	this.y=-imgs[0].height;

	this.width=imgs[0].width;
	this.height=imgs[0].height;
	this.crashed=false;

	this.index=0;
	this.speed=parseInt(2+level);
	this.removable=false;
	this.blood=7;
	this.draw=function(){
		ctx.drawImage(imgs[this.index],this.x,this.y);
	}
	this.count=0;        //记录move()函数的调用次数
	this.move=function(){
		this.count++;
		this.y+=this.speed;
		this.checkHit();
		if(this.count%2==0){
			if (!this.crashed){    //为开始撞毁，只是自己0-1之间变化
				if(this.index==0){
					this.index=1;
				}else if(this.index==1){
					this.index=0;
				}
			}else{
				if(this.index===0||this.index===1){
					this.index=3;
				}else if(this.index<imgs.length-1){
					this.index++;
				}else{ 
					this.removable = true;
				}
			}
		}
		if(this.y>=canvasHeight){
			this.removable=true;
		}
	}
	this.checkHit=function(){
		for(var i in bulletList.arr){
			var b = bulletList.arr[i];
			if( (this.x+this.width>=b.x)
				&&(b.x+b.width>=this.x)
				&&(this.y+this.height>=b.y)
				&&(b.y+b.height>=this.y) ){
				this.blood--;
				if(this.blood<=0){ //没有血格了，开始撞毁进程
					this.crashed = true;
					score+=30;
				}
				b.removable = true;
			}
		}
		if(
			(this.x+this.width>=hero.x)
			&& (this.y+this.height>=hero.y)
			&& (hero.x+hero.width>=this.x)
			&& (hero.y+hero.height>=this.y)
		){
			hero.crashed=true;
		}
	}
}
/*********所有敌机组成的列表***********/
var enemyList;
function EnemyList(){
	this.arr=[];
	this.add=function(enemy){
		this.arr.push(enemy);
	}
	this.remove=function(i){
		this.arr.splice(i,1);
	}
	this.draw=function(){      //绘制所有敌机
		for(var i in this.arr){
			this.arr[i].draw();
		}
	}
	this.move=function(){
		this.generate();            //生成新的敌机 generate:生成
		for(var i in this.arr){
			this.arr[i].move();
			if(this.arr[i].removable){
				this.remove(i);
				i--;            //删除了当前下标的内容后，下一个元素会立即补上，所有结尾要i--；
			}
		}
	}
	this.generate=function(){
		/*敌机生成的要求：
		*何时生成敌机是随机的，不是定时或者连续的
		*小号敌机的概率最大，中号其次，大号最少
		*思路：0~199随机数  小号0/1/2/3/4/5  中号6/7/8  大号9  其它值不生成敌机
		*进一步扩展：可以将6/9/10设置为变量，以增加游戏难度
		*/
		var n=200;
		if(level==2){
			n=150;
		}else if(level==3){
			n=100;
		}else if(level==4){
			n=80;
		}
		var num=Math.floor(Math.random()*n);
		if( num<6 ){
			this.add( new Enemy1(imgsEnemy1) );
		}else if( num <9 ){
			this.add( new Enemy2(imgsEnemy2) );	
		}else if( num <10 ){
			this.add( new Enemy3(imgsEnemy3) );
		}
	}
}

/************绘制英雄性命 与 得分***************/
function drawScore(){
	ctx.font = '25px Helvetica';
	ctx.fillStyle = '#333';
/******更改等级*******/
	if(score>200){
		level=2;
	}
	if(score>500){
		level=3;
	}
	if(score>2000){
		level=4;
	}
	if (score>5000){
		level=5;
	}
	if (score>10000){
		level=6;
	}
	if (score>12000){
		level=7;
	}
	ctx.fillText('Scroe:'+score,10,65);
	ctx.fillText('Bigbang:'+bigbang,353,100);
	ctx.fillText('Level:'+level,385,65);

	var heros = 'Lives: '+lives;
	var w = ctx.measureText(heros).width;
	ctx.fillText(heros,canvasWidth-w-10,35);
//绘制最高分
	var tops=localStorage.getItem('topscore');
	if(tops){
		topscore=tops;
	}
	ctx.fillText('TopScroe:'+topscore,10,35);


}
/*************游戏暂停或开始***********************/
canvas.onmouseout=function(){
	if(cur_phase==PHASE_PLAY){
		cur_phase=PHASE_PAUSE;
	}
}
canvas.onmouseover=function(){
	if(cur_phase==PHASE_PAUSE){
		cur_phase=PHASE_PLAY;
	}
}
function drawPause(){  //绘制暂停提示图标
	var x = canvasWidth/2-imgGamePauseNor.width/2;
	var y = canvasHeight/2-imgGamePauseNor.height/2;
	ctx.drawImage(imgGamePauseNor,x,y);
}

/*************绘制游戏结束********************/
function drawGameover(){
	ctx.font = '50px Helvetica';
	ctx.fillStyle = '#333';
	//ctx.strokeStyle = '#333';
	//ctx.lineWidth=5;
	var txt = 'G A M E  O V E R';
	var w = ctx.measureText(txt).width;
	var x = canvasWidth/2 - w/2;
	var y = canvasHeight/2 + 50/2;
	ctx.fillText(txt, x, y);
	//ctx.strokeText(txt, x , y);
	
	if(score>topscore){                //记录最高分
		topscore=score;
		localStorage.setItem('topscore',topscore);
		c=1;
	}
	if(c==1){
		ctx.fillStyle = 'red';
		ctx.fillText('刷新记录：'+topscore, 80, 500);
	}else{
		ctx.fillStyle = '#333';
		ctx.fillText('得分：'+score, 80, 500);	
	}
}


/************设置bigbang大技能******************/
function big(){
	for(var i in enemyList.arr){
		enemyList.arr[i].crashed=true;
	}
	var t=0;
	var timer=setInterval(function(){
		t++;
		var x = canvasWidth/2-imgsEnemy3[8].width/2;
		var y = canvasHeight/2-imgsEnemy3[8].height/2;
		ctx.drawImage(imgsEnemy3[8],x,y);
		if (t>=10){
			clearInterval(timer);
		}
	},42);
	
	bigbang--;
}
document.onkeydown=function(e){
	switch(e.keyCode){
	case 32:
		if(bigbang>0 && cur_phase==PHASE_PLAY){
			big();
		}
	}
}
	
/****************重新开始游戏*********************/
function again(){
	canvas.onclick=function(){
		if(cur_phase==PHASE_GAMEOVER){
			cur_phase=PHASE_PLAY;
			lives=4;
			bulletList.arr=[];
			enemyList.arr=[];
			score=0;
			bigbang=3;
			level=1;
			drawScore();
			//history.go(0);            //刷新页面
		}
	}
}