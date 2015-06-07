
function islands(){
	var img = new Array();
	var imgLoc = ['http://davidjokinen.github.io/lvl1-kiosk/img/logo-white@2x.png'];
	var screen = null;
	var mycanvas = document.createElement('canvas');
	var mycontext = mycanvas.getContext('2d');
	var cx = parseInt(500*Math.random());
	var cy = parseInt(500*Math.random());
	var yellow = new Array();
	var green = new Array();
	var orange = new Array();
	for(var q = 0;q< 16;q++){
		yellow[q] = randomColor({hue: 'yellow'});
		green[q] = randomColor({hue: 'green'});
		orange[q] = randomColor({hue: 'orange'});
	}
	
	var noiceGen = new perlinNoise(1);
	var count = 0;
	var pixelSize = 1024;
	var scale = 1;
	var pos = 0;
	var list ;
	var noiseScale = 64 + 64*Math.random();
	var noiseMulti = .5 + Math.random();
	var noiseAdd = -.2 + Math.random();
	var width = 0;
	var maxSize	= 0;
	var t=0;		
	function reset() {cx = parseInt(500*Math.random());
	    cy = parseInt(250*Math.random());noiceGen = new perlinNoise(1);count = 0;pixelSize = 1024;pos = 0;scale=1;noiseScale = 64 + 64*Math.random(); noiseMulti = .5 + Math.random();noiseAdd = -.2 + Math.random();}
	
	function buildList() {
		width = parseInt(screen.getWidth()/pixelSize+2);
		maxSize	= parseInt(screen.getWidth()/pixelSize+2)*parseInt(screen.getHeight()/pixelSize+2);
		var list= new Array();
		for(var x = 0;x<maxSize;x++)
			list[x] = x;
		
		for(var x = 0;x<maxSize;x++){
			var pos1 = parseInt(maxSize*Math.random());
			var temp = list[pos1];
			list[pos1] = list[x];
			list[x] = temp;
		}
		return list;
	}
	
	var count = 0;

	function drawList(ctx){
		for(var q = pos;q<pos+count;q++)
		{
		
			var test;
			var x =  parseInt(list[q]%width);
			var y =  parseInt(list[q]/width);
			mycontext.drawImage(img[0], 0, 0 );
			//var myData = mycontext.getImageData(0, 0, img.width, img.height);
			if(x/2*pixelSize>cx&&x/2*pixelSize-pixelSize-cx<img[0].width&&y/2*pixelSize>cy&&y/2*pixelSize-cy<img[0].height){
				var data= mycontext.getImageData(x/2*pixelSize-pixelSize/2/scale-cx, y/2*pixelSize-pixelSize/2/scale-cy, 1, 1).data;
				if(data[3]!=0){
					test ='#FFF';
					ctx.fillStyle = test;
			ctx.fillRect(parseInt((x)*pixelSize-pixelSize),parseInt((y)*pixelSize-pixelSize),pixelSize,pixelSize);
					continue;
				}
			}
			var h = noiceGen.getHeight(x*noiseScale/scale-pixelSize/2/scale,y*noiseScale/scale-pixelSize/2/scale)*noiseMulti+noiseAdd;
			if(h<0)
				test ='#00435b';
			else if(h<.3)
				test ='#007BA7';
			else if(h<.39)
				test ='#00b3f4';
			else if(h<.48){
				
				test = yellow[q%16];
			}else if(h<.80){
		
				test = green[q%16];
			}else{
			
				test =orange[q%16];
			}	
				
			ctx.fillStyle = test;
			ctx.fillRect(parseInt((x)*pixelSize-pixelSize),parseInt((y)*pixelSize-pixelSize),pixelSize,pixelSize);
			
		}
		pos+=count;
		if(pos>=list.length)
		{
			if(pixelSize<5){
				reset();
				list = buildList();
			}
			else{
				pixelSize =parseInt( pixelSize/2);
				scale *= 2;
				list = buildList();
				
				pos = 0;
			}
		}
	}
	
	function setup() {
		
		noiceGen = new perlinNoise(1);
	}

	function refreshRate(){
		return 60;
	}
	
	function start() {
		reset();
		list = buildList();
		
		return end;
	}

	function render(ctx){
		drawList(ctx);
		//ctx.drawImage(img[0],10,10);
	}
	
	function update(delta){
		t += delta;
		if(t > 30){
			count = 4*scale;
			t = 0;
		}
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
		toTitle : function(){return "Pixel Islands";},
		started : true
	};
	
	
}

