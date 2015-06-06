
function fuzz(){
	//Please dont judge me this is old code. -David

	/* Needed Vars for scene */
	var img = new Array();
	var imgLoc = [];
	var screen = null;
	
	var letterS = [1,0, 2,0, 3,0, 0,1, 0,2, 1,2, 2,2, 3,2, 3,3,   2,4, 1,4, 0,4];
	var letterP = [0,0, 1,0, 2,0, 0,1, 0,2, 1,2,2,2, 2,1, 0,3,0,4];
	var letterE = [0,0, 1,0, 2,0, 0,1, 0,2, 1,2, 0,3,0,4,1,4,2,4];
	var letterD = [0,0, 1,0,2,0,  0,1, 0,2, 0,3,0,4,1,4 ,2,4 ,3,1,3,2,3,3];
	
	var letterA = [0,0, 1,0, 2,0, 3,0,2,2, 0,1, 0,2, 1,2, 0,3, 0,4, 3,4,3,1,3,2,3,3];
	var letterC = [0,0, 1,0, 2,0, 0,1, 0,2, 0,3,0,4,1,4,2,4];
	var letterM = [0,0, 2,0,1,0, 0,2, 0,1, 2,1,2,2,2,3,2,4, 4,4,  0,3, 0,4 ,3,0 ,4,1 ,4,2, 4,3, 4,4, 4,4];
	var R1 = 200;
	var G1 = 200;
	var B1 = 200;
	var R2 = 138;
	var G2 = 181;
	var B2 = 255;
	var S1 = Math.random()*500+500;
	var S2 = Math.random()*500+500;
	var S3 = Math.random()*500+500;
	var t = Date.now();
	function ranA(){return Math.random()-.5;} 
		var ar = 1+ranA(), ag = 2+ranA(), ab = 2+ranA();
	
	function setup() {
		
	}

	function refreshRate(){
		return 60;
	}
	
	function start() {
	
	
		return end;
	}

	function render(ctx){
		Color2 = '#A0C8FF';	
		function c(num,a) 
				{return ('0' + Math.floor((num-(num/3))+Math.sin((t*a)*6.28/18000) *(num/3)).toString(16)).substr(-2);}
			
		function l(letter,x,y){
			
			for(var q=0;q<letter.length;q+=2)
				if(letter[q]==x&&letter[q+1]==y) return 80-50*Math.floor(Math.sin(((t*ar+t*ag+t*ab)/3-1)*6.28/18000)); 
			return 0;} 
		function a(num,x,y) 
			{	return num;
			
			}
		function m(num,x,y) 
			{return num - 4+4*Math.sin(12  +(t/S1-y*Math.cos(t/4300)+Math.floor(x*Math.tan(t/4100))))
						 - 4+4*Math.cos(12  +(t/S1-Math.floor(y*Math.tan(t/4300))+x*Math.sin(t/4100)))
						//- 4+4*Math.cos(152 +(t/S2-y*Math.cos(t/4300)+x*Math.sin(t/1200)))//;}
						- 2+Math.floor(2*Math.atan(234 +(t/15-y/x)));}
		function newColor(x,y) 
			{return '#' + c(a(m(R1,x,y),x,y),ar) + c(a(m(G1,x,y),x,y),ag) + c(a(m(B1,x,y),x,y),ab);}	
		
		pixelSize = 30;
		for(var x = 1;x<ctx.width/pixelSize+1;x++)
			for(var y = 1;y<ctx.height/pixelSize+1;y++)
			{
				ctx.fillStyle = newColor(x,y);
				ctx.fillRect(x*pixelSize-pixelSize,y*pixelSize-pixelSize,pixelSize,pixelSize);
			}
	
	}

	function update(delta){
		t += delta;

	}
	
	function end(){
	
	}
	
	return  {
		end : end,
		img : img,
		imgLoc : imgLoc,
		refreshRate : refreshRate,
		update : update,
		render : render,
		start : start,
		setScreen : function(m){screen = m;},
		setup : function(){return setup();},
		run : function(ctx,t){return run(ctx,t);},
		toTitle : function(){return "TV Fuzz";},
		started : true
	};
}
