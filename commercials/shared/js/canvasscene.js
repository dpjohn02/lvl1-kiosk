var CanvasScene = Class.extend({
	init: function init(canvasName){
		this.canvasName = canvasName;
		this.canvas = document.getElementById(this.canvasName);
		this.ctx = document.getElementById(this.canvasName).getContext("2d");

		this.ctx.height = parseInt(window.innerHeight);
		this.canvas.height = window.innerHeight;
		this.canvas.style.height = window.innerHeight+'px';

		this.ctx.width = parseInt(window.innerWidth);
		this.canvas.width = window.innerWidth;
		this.canvas.style.width = window.innerWidth+'px';

		this.going = 1;
		this.delta_timer = Date.now();
	},
	update: function(tick){
		
	},
	render: function(ctx){
		
	},
	loop: function(){
		var now = Date.now();
		var delta = now - this.delta_timer;
		//console.log(delta+", "+now+", "+this.delta_timer );
		this.delta_timer = now;
		
		this.update(this.ctx,delta);
		this.render(this.ctx);
		if(this.going == 1)
			window.requestAnimationFrame(this.loop.bind(this));
	},
	start: function(){
		this.going = 1;
		window.requestAnimationFrame(this.loop.bind(this));
		
	},
	stop: function(){
		this.going = 0;
	}
});