
function lighting(){
	this.img = new Array();
	this.imgLoc = ['http://davidjokinen.github.io/lvl1-kiosk/img/logo-white@2x.png'];
	this.screen = null;
	this.mx=0; this.my=0;
	this.cx = 0;
	this.cy = 0;
	this.timer = 0;

	this.noiceGen;
	this.houseCount = 0;
	this.time = Date.now();
	
	this.faceList = new Array();
	this.lightList = new Array();
	this.started = true;
	function mouseMove(event) {
		this.mx = event.pageX;
		this.my = event.pageY;
	}
	
	function point3D(X,Y,Z){
		var x = X;
		var y = Y;
		var z = Z;

		return  {
			setX : function(a){x=a},
			setY : function(a){y=a},
			setZ : function(a){z=a},
			getX :  function(){return x;},
			getY :  function(){return y;},
			getZ :  function(){return z;},
			sub :  function(pnt){x -= pnt.getX();y -= pnt.getY();z -= pnt.getZ();},
			add :  function(pnt){x += pnt.getX();y += pnt.getY();z += pnt.getZ();},
			mul :  function(pnt){x *= pnt.getX();y *= pnt.getY();z *= pnt.getZ();},
			getSub :  function(pnt){return new point3D(x - pnt.getX(),y - pnt.getY(),z - pnt.getZ());},
			getAdd :  function(pnt){return new point3D(x + pnt.getX(),y + pnt.getY(),z + pnt.getZ());},
			getCross :  function(pnt){return new point3D(y*pnt.getZ()-pnt.getY()*z,z*pnt.getX()-pnt.getZ()*x,x*pnt.getY()-pnt.getX()*y);},
			getNormal :  function(){var len = Math.sqrt(x*x+y*y+z*z);return new point3D(x/len,y/len,z/len);},
			getLength :  function(){var len = Math.sqrt(x*x+y*y+z*z);return len;},
			getDot :  function(pnt){return x*pnt.getX()+y*pnt.getY()+z*pnt.getZ();}
		};
	}
	
	function face(colorSet,INVERTED){
		var list = new Array();
		var color = colorSet;
		var inverted = INVERTED | false;
		var render = function(ctx){
			var x = list[list.length-1].getX(),
				y = list[list.length-1].getY();
			ctx.beginPath();	
			ctx.moveTo(x,y);
			for (var i = 0; i < list.length ; i++) {
				x = list[i].getX();
				y = list[i].getY();
				ctx.lineTo(x,y);
			}
			ctx.closePath();
			ctx.strokeStyle = "#CCCCCC";
		//	ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
		}
		var lightSource = function(pnt1,pnt2,pnt3){
			var x = 0,
				y = 0,
				z = 0;
			for (var i = 0; i < 3 ; i++) {
				x += list[i].getX();
				y += list[i].getY();
				z += list[i].getZ();
			}
			x /= 3;y /= 3;z /= 3;
			var sumPnt = new point3D(x,y,z);
		
			var normal1 = list[1].getSub(list[0]).getCross(list[2].getSub(list[0])).getNormal();
			var normal2 = pnt1.getSub(sumPnt).getNormal();
			var normal3 = pnt2.getSub(sumPnt).getNormal();
			var normal4 = pnt3.getSub(sumPnt).getNormal();
			var distance1 = pnt1.getSub(sumPnt).getLength();
			var distance2 = pnt2.getSub(sumPnt).getLength();
			var distance3 = pnt3.getSub(sumPnt).getLength();

			var num1 = normal1.getDot(normal2)*(800/distance1)+.2;
			var num2 = normal1.getDot(normal3)*(800/distance2)+.2;
			var num3 = normal1.getDot(normal4)*(800/distance3)+.2;
			if(inverted)
				color = "rgb("+parseInt((1-num1)*255)+","+parseInt((1-num2)*255)+","+parseInt((1-num3)*255)+")";
			else		
			color = "rgb("+parseInt(num1*255)+","+parseInt(num2*255)+","+parseInt(num3*255)+")";
		}
		return  {
			add  : function(i){list[list.length]=i;},
			get  : function(i){return list[i];},
			render : function(ctx){ render(ctx);},
			lightSource : function(pnt1,pnt2,pnt3){ lightSource(pnt1,pnt2,pnt3);},
			size :  function(i){return list.length;}
		};
	}
		
	this.setup = function() {
		noiceGen = new perlinNoise(1);
	}

	this.refreshRate= function() {
		return 32;
	}
	
	this.start= function()  {
		window.addEventListener("mousemove", mouseMove, false);
		var size = 80;
		var noiceMul =90;
		var noiceScale = 6;
		var width = this.screen.getWidth()/size+1;
		var height = 15;

		for(var x = 0;x<width;x++){
			for(var y = 0;y<height;y++){
				this.faceList[(x*height+y)*2] = face("#DDDDDD", false);
				this.faceList[(x*height+y)*2].add(point3D(x*size,y*size,noiceMul*noiceGen.getHeight(x*noiceScale,y*noiceScale)));
				this.faceList[(x*height+y)*2].add(point3D(x*size+size,y*size,noiceMul*noiceGen.getHeight(x*noiceScale+noiceScale,y*noiceScale)));
				this.faceList[(x*height+y)*2].add(point3D(x*size+size,y*size+size,noiceMul*noiceGen.getHeight(x*noiceScale+noiceScale,y*noiceScale+noiceScale)));
				this.faceList[(x*height+y)*2+1] = face("#DDDDDD",  false);
				
				this.faceList[(x*height+y)*2+1].add(point3D(x*size+size,y*size+size,noiceMul*noiceGen.getHeight(x*noiceScale+noiceScale,y*noiceScale+noiceScale)));
				this.faceList[(x*height+y)*2+1].add(point3D(x*size,y*size+size,noiceMul*noiceGen.getHeight(x*noiceScale,y*noiceScale+noiceScale)));
				this.faceList[(x*height+y)*2+1].add(point3D(x*size,y*size,noiceMul*noiceGen.getHeight(x*noiceScale,y*noiceScale)));
			}
		}

		
		
		this.lightList[0] = point3D(300,300,1000);
		this.lightList[1] = point3D(200,800,1000);
		this.lightList[2] = point3D(700,300,1000);
		return this.end;
	}

	this.render= function(ctx){
		for(var i = 0;i<this.faceList.length;i++)
			this.faceList[i].render(ctx);
		ctx.drawImage(this.img[0],this.cx,this.cy);
	}

	this.update= function(delta){
		this.time += delta;
		this.lightList[0].setX( 700+600*Math.sin(-this.time/1400+12000));
		this.lightList[0].setY( 700+400*Math.cos(-this.time/1400+12000));
		this.lightList[1].setX( 700+500*Math.sin(this.time/2200));
		this.lightList[1].setY( 700+500*Math.cos(this.time/2200));
		this.lightList[2].setX( 900+800*Math.sin(this.time/1000+17000));
		this.lightList[2].setY( 500+400*Math.cos(this.time/1000+17000));
		if(this.timer++%30==0){
			this.cx = parseInt(Math.random()*1000);
			this.cy = parseInt(Math.random()*500);
		}
		
		for(var i = 0;i<this.faceList.length;i++)
			this.faceList[i].lightSource(this.lightList[0],this.lightList[1],this.lightList[2]);
		
	}
	
	this.end= function(){
		window.removeEventListener("mousemove", mouseMove, false);
	}
	
	this.setScreen = function(m){this.screen = m;}
	this.toTitle = function(){return "Lighting";}
	
}