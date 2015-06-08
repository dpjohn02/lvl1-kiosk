var Vine = Class.extend({
	init: function init(x,y,angle,lineWidth, color){
		this.x = x;
		this.y = y;
		this.lX = x;
		this.lY = y;
		this.dX = 0;
		this.dY = 0;
		this.angle = angle;
		var r = (Math.random() > .4) ? 240 : 140;
		var g = (Math.random() > .4) ? 240 : 140;
		var b = (Math.random() > .4) ? 240 : 140;
		var ncolor = "rgb("+r+","+g+","+b+")"
		this.color =  color || ncolor;
		this.growth = lineWidth/2+5;
		this.split = 0;
		this.lineWidth = lineWidth;
		this.t = 10000*Math.random();
	},
	update: function(){
		this.lX = this.x;
		this.lY = this.y;
		this.dX =  ~~(this.growth*Math.cos(this.angle*0.0174532925));
		this.dY =  ~~(this.growth*Math.sin(this.angle*0.0174532925));
		this.x += this.dX;
		this.y += this.dY;
		this.dX *= 1.0/this.growth;
		this.dY *= 1.0/this.growth;
		var dif = 20;
		this.angle += 10*Math.sin(this.t + Date.now())+dif*Math.random()-dif/2;
		if(Math.random()>1-this.lineWidth/60.0)this.split = 1;

	},
	render: function(ctx){
		ctx.lineWidth= this.lineWidth;
		ctx.beginPath();
        ctx.moveTo(this.x+this.dX, this.y+this.dY);
        ctx.lineTo(this.lX-this.dX, this.lY-this.dY);
        ctx.closePath();
        ctx.strokeStyle=this.color;
        ctx.stroke();

	}
});