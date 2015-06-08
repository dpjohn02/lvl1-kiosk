var Kentucky = CanvasScene.extend({
	init: function init(canvasName){
		init.base.call(this, canvasName);
		this.state = 0;
		this.vines = new Array();
	},
	update: function(tick){
		if(this.state > 20){
      		for(var i =0;i<this.vines.length;i++)
      			this.vines[i].update();
      		for(var i =0;i<this.vines.length;i++)
	      		if(this.vines[i].split==1){
	      			var v = this.vines.splice(i,1)[0];
	      			if((v.lineWidth*.72)<1)continue;
	      			this.vines.push(new Vine(v.lX,v.lY,v.angle-20,~~(v.lineWidth*.72),v.color));
	      			this.vines.push(new Vine(v.lX,v.lY,v.angle+20,~~(v.lineWidth*.72),v.color));
	      		}
      	}
      	
	},
	render: function(ctx){
		var ax = -150;
	    var ay = 95;
	    var multi = ctx.width/1440.0;
	    if(this.state == 0){

	    	ctx.beginPath();
			ctx.rect(0, 0, ctx.width, ctx.height);
			ctx.fillStyle = 'white';
	      	ctx.fill();
	      	var size = 100;
	    	for(var x =0;x< ctx.width/size;x++ ){
	      		for(var y =0;y< ctx.height/size;y++ ){
	      			ctx.fillStyle = "rgb("+(245+~~(10*Math.random()))+","+(245+~~(10*Math.random()))+","+(245+~~(10*Math.random()))+")";
	      			ctx.fillRect(x*size,y*size,size,size);
	      		}
	      	}
	      	ctx.beginPath();
	      	for(var x =0;x< ctx.width/20;x++ ){
	      		for(var y =0;y< ctx.height/20;y++ ){
	      			ctx.rect(~~(20*x*multi-4*Math.sin(y*1000*3)/.5),~~(20*y*multi), 2,2);
				}
			}
			ctx.closePath();
			ctx.fillStyle = '#b9b9b9';
			ctx.fill();
			ctx.strokeStyle="#EEE";
			for(var i =0;i<500;i++){
			  	ctx.lineWidth=Math.random()/5*multi;
				ctx.beginPath();
			    ctx.moveTo(Math.random()*ctx.width, Math.random()*ctx.height);
			    ctx.lineTo(Math.random()*ctx.width, Math.random()*ctx.height);
			 
			    ctx.closePath();
			    ctx.stroke();
			}
			var ax = 0;
			var ay = 0;
			for(var i =0;i< kentuckyPos.point.length;i++ ){
				ax += parseFloat(kentuckyPos.point[i].lng);
				ay += parseFloat(kentuckyPos.point[i].lat);
			}  
			ax /= kentuckyPos.point.length;
			ay /= kentuckyPos.point.length;
			var cx = -80;
			var cy = -80;
			var mx = ctx.width/9+40*ctx.width/ctx.height*.5-25;
			var my = mx+50;
			var pt = [38.2575, 85.753889];
			this.vines.push(new Vine(ctx.width/2+ (+ax-pt[1])*mx+cx, ctx.height/2+(ay-pt[0])*my+cy,Math.random()*360,10));
		    this.vines.push(new Vine(ctx.width/2+ (+ax-pt[1])*mx+cx, ctx.height/2+(ay-pt[0])*my+cy,Math.random()*360,10));
		   // this.vines.push(new Vine(ctx.width/2+ (+ax-pt[1])*mx+cx, ctx.height/2+(ay-pt[0])*my+cy,Math.random()*360,10));
			this.state++;
	    }
	    if(1){//this.state == 1){
	  		ctx.strokeStyle="#888";
	  		ctx.lineWidth=.7;
	  		ctx.beginPath();
		      ctx.moveTo(Math.random()*ctx.width, Math.random()*ctx.height);
		      ctx.lineTo(Math.random()*ctx.width, Math.random()*ctx.height);
		 
		      ctx.closePath();
		      //ctx.stroke();
		      var lpt = null;
		    var ax = 0;
		    var ay = 0;
		    for(var i =0;i< kentuckyPos.point.length;i++ ){
		    	ax += parseFloat(kentuckyPos.point[i].lng);
		    	ay += parseFloat(kentuckyPos.point[i].lat);
		    }  
		    ax /= kentuckyPos.point.length;
		    ay /= kentuckyPos.point.length;
		    var cx = -80;
		    var cy = -80;
		    var mx = ctx.width/9+40*ctx.width/ctx.height*.5-25;
		    var my = mx+50;
		    function buildState(state,color1){
		    	lpt = null;
			    for(var i =0;i< state.point.length;i++ ){
			    	var pt = state.point[i];
			    	if(lpt != null){

			    		ctx.beginPath();
					    ctx.moveTo(~~(ctx.width/2+ (+ax-pt.lng)*mx+cx), ~~(ctx.height/2+(ay-pt.lat)*my+cy));
					    ctx.lineTo(~~(ctx.width/2+ (ax-lpt.lng)*mx+cx),~~( ctx.height/2+(ay-lpt.lat)*my+cy) );
					 	 ctx.strokeStyle="#BBB";
					    ctx.closePath();
					    //ctx.lineWidth=2.4*mx/160;
					    ctx.stroke();
					    ctx.strokeStyle=color1;
						//ctx.lineWidth=.9*mx/160;
					    ctx.stroke();
			    	}
			    	lpt = pt;
			    }
		    }
		   //ctx.lineWidth= 10;
		   // buildState(kentuckyPos,"#EEE");
		   ctx.strokeStyle="#888";
		    
		    ctx.lineWidth=.8;
		    ctx.strokeStyle="#BBB";

		    buildState(indiana,"#BBB");
		    // ctx.lineWidth=.2+Math.random();
		    buildState(ohio,"#BBB");
		     //ctx.lineWidth=.2+Math.random();
		    buildState(westvirginia,"#BBB");
		     //ctx.lineWidth=.2+Math.random();
		     buildState(virginia,"#BBB");
		     // ctx.lineWidth=.2+Math.random();
		     buildState(tennessee,"#BBB");
		      //ctx.lineWidth=.2+Math.random();
		     buildState(illinois,"#BBB")
		     ctx.lineWidth=3;
		     buildState(kentuckyPos,"#666");
		     ctx.fillStyle="#3498db";
		     var pt = [38.2575, 85.753889];
		     ctx.fillRect(~~(ctx.width/2+ (+ax-pt[1])*mx+cx-10), ~~(ctx.height/2+(ay-pt[0])*my+cy-10),20,20);
		     //
	  	    
	  }
	  this.state++;
		var ax = 0;
		var ay = 0;
		for(var i =0;i< kentuckyPos.point.length;i++ ){
			ax += parseFloat(kentuckyPos.point[i].lng);
			ay += parseFloat(kentuckyPos.point[i].lat);
		}  
		ax /= kentuckyPos.point.length;
		ay /= kentuckyPos.point.length;
		var cx = -80;
		var cy = -80;
		var mx = ctx.width/9+40*ctx.width/ctx.height*.5-25;
		var my = mx+50;
		var pt = [38.2575, 85.753889];
		ctx.fillStyle="#3498db";
		ctx.fillRect(ctx.width/2+ (+ax-pt[1])*mx+cx-10, ctx.height/2+(ay-pt[0])*my+cy-10,20,20);
      if(this.state > 30){
      	 ctx.fillStyle="#EEE";
      	 ctx.fillRect(20, 20,825,70);
      	 ctx.fillStyle="#444";
      	ctx.font="80px 'League Script' cursive";
      	ctx.fillText("Louisville Hacker Space",10,70);
	//	ctx.fillText("Welcome",80.2,80.2);
		//this.state++;

      	}
      	if(this.state > 20){
      		for(var i =0;i<this.vines.length;i++)
      			this.vines[i].render(ctx);
      	}
	    
	}
});