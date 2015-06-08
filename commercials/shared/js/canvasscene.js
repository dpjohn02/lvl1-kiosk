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

		this.loop();
		this.going = 1;
		this.time;
	},
	update: function(tick){
		
	},
	render: function(ctx){
		
	},
	loop: function(){
		var now = new Date().getTime(),
		delta = now - (this.time | now);
		this.time = now;
		this.update(delta);
		this.render(this.ctx);
		if(this.going == 1)
		if ( !window.requestAnimationFrame ) 
			window.setTimeout(this.loop.bind(this), 1000 / 60 );
		else
			window.requestAnimationFrame(this.loop.bind(this));
	},
	start: function(){
		this.going = 1;
		this.loop();
		
	},
	stop: function(){
		this.going = 0;
	}
});