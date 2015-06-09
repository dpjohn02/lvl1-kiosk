var Box = Class.extend({
	init: function init(x,y){
		this.x = -1;
		this.y = -1;
		this.vX = 15;
		this.vY = 15;
		this.size = 70;

	},
	update: function(ctx,delta){
		//init the position to be a random location on the canvas. 
		if(this.x == -1){
			this.x = parseInt((ctx.width-this.size)*Math.random());
			this.y = parseInt((ctx.height-this.size)*Math.random());
		}

		var dx = this.vX;
		var dy = this.vY;
		//Check for collision with the wall.
		if(this.x+dx < 0)
			this.vX = -this.vX;
		if(this.y+dy < 0)
			this.vY = -this.vY;
		if(this.x+dx >= ctx.width-this.size)
			this.vX = -this.vX;
		if(this.y+dy >= ctx.height-this.size)
			this.vY = -this.vY;

		//add the velocity to the position!
		this.x += dx;
		this.y += dy;
	},
	render: function(ctx){
		//draw the rect
		ctx.fillRect(this.x,this.y,this.size,this.size);
	}
});