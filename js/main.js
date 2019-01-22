let background, canvas, c, w, h, w2, h2, elements, boat, farmer, wolf, goat, cabbage, moves, textures, solution,time_out,interval_val;
	let start_button=0;
	let lose=0;
	
function init(){

	let old = document.querySelector('canvas');
	if(old)
		old.remove();
	
	moves = 0;
	solution = [1,3,0,3,0,4,0,4,3,0,3,2,0,2,0,3,0,3,1];
	
	canvas = document.createElement('canvas');
	canvas.width = w = innerWidth;
	canvas.height = h = innerHeight;
	w4 = w/4;
	h4 = h/4;
	canvas.addEventListener('click', getElement );
	
	c = canvas.getContext('2d');
  
	document.body.appendChild(canvas);

	c.shadowColor = 'rgba(0,0,0,0.5)';
	c.shadowBlur = 50;

	background = c.createLinearGradient(0,0,w,0);
	background.addColorStop(0,'green');
	background.addColorStop(0.2,'green');
	background.addColorStop(0.27,'#654321');
	background.addColorStop(0.3,'blue');
	background.addColorStop(0.5,'#00BFFF');
	background.addColorStop(0.7,'blue');
	background.addColorStop(0.73,'#654321');
	background.addColorStop(0.8,'green');
	background.addColorStop(1,'green');
	c.fillStyle = background;
	
	elements = [];

	farmer = new Passenger(textures['img/farmer.png'],w2,h2,'farmer',0,true);
	
	wolf = new Passenger(textures['img/wolf.png'],w2,h2,'wolf',1);
	
	goat = new Passenger(textures['img/goat.png'],w2,h2,'goat',2);
	
	cabbage = new Passenger(textures['img/cabbage.png'],w2,h2,'cabbage',3);

	boat = new Boat(textures['img/boat.png']); 

	elements.push( boat );
	elements.push( farmer );
	elements.push( wolf );
	elements.push( goat );
	elements.push( cabbage );

	/* hack to quick implement a solution's button */
	/*
	let solve = {
		pos: {
			x: w-150,
			y: h-50
		},
		h: 30,
		w: 100,
		
		show: function(){
			c.fillStyle = 'gray';
			c.fillRect(this.pos.x, this.pos.y, this.w, this.h);
			c.fillStyle = 'black';
			c.font = '1.2rem Arial';
			let text = 'Solve';
			let m = c.measureText(text);
			c.fillText(text, this.pos.x+m.width/2, this.pos.y+20);
		},
		
		action: function(){
			init();
			canvas.removeEventListener('click', getElement);
			solveMe();
		}
	};

	elements.push( solve );
*/

let reset1 = {
		pos: {
			x: w-200,
			y: h-50
		},
		h: 30,
		w: 100,
		
		show: function(){
			c.fillStyle = 'gray';
			c.fillRect(this.pos.x, this.pos.y, this.w, this.h);
			c.fillStyle = 'black';
			c.font = '1.2rem Arial';
			let text = 'Reset';
			let m = c.measureText(text);
			c.fillText(text, this.pos.x+m.width/2, this.pos.y+20);
		},
		
		action: function(){
			init();
			canvas.removeEventListener('click', getElement);
			resetMe();
		}
	};

	elements.push( reset1 );
	draw();
}

function solveMe(){
	if( solution.length > 0 ){
		elements[ solution.shift() ].action();
		draw();
		setTimeout( solveMe, 1000 );
	}
}

function resetMe(){
	clearInterval(interval_val);
init();
	
	
}
function draw(){
	c.fillStyle = background;
	c.fillRect(0,0,w,h);
	for(let i = 0; i < elements.length; i++){
		elements[i].show();
	}
	check();
}


//////

/////
function _timer(callback)
{
    var time = 0;     //  The default time of the timer
    var mode = 0;     //   Mode: count up or count down
    var status = 0;    //    Status: timer is running or stoped
    var timer_id;    //    This is used by setInterval function
    
    // this will start the timer ex. start the timer with 1 second interval timer.start(1000) 
    this.start = function(interval)
    {
		start_button=1;
		lose=0;
		time=60;
		init();
        interval = (typeof(interval) !== 'undefined') ? interval : 1000;
 
        if(status == 0)
        {
            status = 1;
            timer_id = setInterval(function()
            {
                switch(mode)
                {
                    default:
                    if(time)
                    {
                        time--;
                        generateTime();
                        if(typeof(callback) === 'function') callback(time);
                    }
                    break;
                    
                    case 1:
                    if(time < 86400)
                    {
                        time++;
                        generateTime();
                        if(typeof(callback) === 'function') callback(time);
                    }
                    break;
                }
            }, interval);
        }
    }
    
    //  Same as the name, this will stop or pause the timer ex. timer.stop()
    this.stop =  function()
    {
		start_button=0;
        if(status == 1)
        {
            status = 0;
            clearInterval(timer_id);
        }
    }
    
    // Reset the timer to zero or reset it to your own custom time ex. reset to zero second timer.reset(0)
    this.reset =  function(sec)
    {
		start_button=0;
        sec = (typeof(sec) !== 'undefined') ? sec : 0;
        time = sec;
        generateTime(time);
    }
    
    // Change the mode of the timer, count-up (1) or countdown (0)
    this.mode = function(tmode)
    {
        mode = tmode;
    }
    
    // This methode return the current value of the timer
    this.getTime = function()
    {
        return time;
    }
    
    // This methode return the current mode of the timer count-up (1) or countdown (0)
    this.getMode = function()
    {
        return mode;
    }
    
    // This methode return the status of the timer running (1) or stoped (1)
    this.getStatus
    {
        return status;
    }
    
    // This methode will render the time variable to hour:minute:second format
    function generateTime()
    {
        var second = time % 60;
        var minute = Math.floor(time / 60) % 60;
        var hour = Math.floor(time / 3600) % 60;
        
        second = (second < 10) ? '0'+second : second;
        minute = (minute < 10) ? '0'+minute : minute;
        hour = (hour < 10) ? '0'+hour : hour;
        
        $('div.timer span.second').html(second);
        $('div.timer span.minute').html(minute);
        $('div.timer span.hour').html(hour);
    }
}
 
// example use
var timer;
 
$(document).ready(function(e) 
{
    timer = new _timer
    (
        function(time)
        {
            if(time == 0)
            {
                timer.stop();
                alert('time out');
                document.getElementById("error").innerHTML="";
                }
			if(time==20)
		{
		document.getElementById("error").innerHTML="Your Time is almost over!";
	
		}
        }
    );
    timer.reset(0);
    timer.mode(0);
	
});
function check(){
	//setTimeout(gameLost, 60000);


	if( farmer.side == 2 && (wolf.side == 0 && goat.side == 0) ||
			farmer.side == 1 && (wolf.side == 3 && goat.side == 3) ||
			farmer.side == 2 && (goat.side == 0 && cabbage.side == 0) ||
			farmer.side == 1 && (goat.side == 3 && cabbage.side == 3 )
	){
		gameOver('You Lose');
		document.getElementById("error").innerHTML="";
	
		lose++;
	}
	if( farmer.side == 3 && wolf.side == 3 && goat.side == 3 && cabbage.side == 3){
		gameOver('You Win');
		document.getElementById("error").innerHTML="";
	
	}
}

let getElement = function(e){
	let x = e.clientX, y = e.clientY;
	let found = null;
	for(let i = 0; i < elements.length; i++){
		let e = elements[i];
		if( x > e.pos.x && x < e.pos.x + e.w &&
				y > e.pos.y && y < e.pos.y + e.h ){
			found = e;
		}
	}
	if(found){
		found.action();
	}
	draw();
	moves+=1;
}

function gameOver(result){

	canvas.removeEventListener('click', getElement);
	setTimeout( function(){
		canvas.addEventListener('click', function(){
			init();
		});
	}, 1500);

	c.fillStyle = "black";
	c.font = "3rem Arial";
	c.fillText(result, (w-c.measureText(result).width)/2, 100);
}

function gameLost() {
 gameOver('You Lose! Time is over!');
}

function loadImages(){
	let total = 0;
	imgSrc = ['img/farmer.png','img/wolf.png','img/goat.png','img/cabbage.png','img/boat.png'];
	textures = {};
	for(name of imgSrc){
		textures[name] = new Image();
		textures[name].src = name;
		textures[name].onload = function(){
			total++;
			if( total == imgSrc.length )
				init();
		}
	}
}

loadImages();

window.onresize = function(){

	init();
};
