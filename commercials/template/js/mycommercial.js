//I am using base.js which makes object oriented javascript easy! 
var MyCommercial = CanvasScene.extend({
	// INIT FUNCTION : where the preperation happens
	// canvasName : name of the canvas
	init: function init(canvasName){
		// We call the base init which already has the logic to full screen. 
		init.base.call(this, canvasName);
		
		//Initalize variables 
		this.red = 0;
		this.blue = 0;
		this.green = 0;

		this.redSinMultiplier = .7+Math.random();
		this.greenSinMultiplier = .7+Math.random();
		this.blueSinMultiplier = .7+Math.random();

		// create a new box! (Code of the box is in box.js)
		this.box = new Box();

		this.time = 0;

	},
	// UPDATE FUCTION : where all the logic happens
	// delta : is the time since the last time it was called. 
	update: function(ctx, delta){
		this.time += delta;
		//Update the colors
		this.red = 150+100*Math.sin(this.redSinMultiplier*this.time/1000.0);
		//Need to cast the double to an int for the rendering
      	this.red = parseInt(this.red);

      	this.green = 150+100*Math.sin(this.greenSinMultiplier*this.time/1000.0);
      	this.green = parseInt(this.green);

      	this.blue = 150+100*Math.sin(this.blueSinMultiplier*this.time/1000.0);
      	this.blue = parseInt(this.blue);

      	this.box.update(ctx, delta);

	},
	// RENDER FUNCTION : where all the rendering happens
	// ctx : is the context of the canvas which provides methods and properties for drawing 
	//   for more info on drawing on a canvas here is a good start: http://www.w3schools.com/tags/ref_canvas.asp
	render: function(ctx){
		//Set the color to the value to the three colors we have set! 
		ctx.fillStyle="rgb("+this.red+","+this.green+","+this.blue+")";
		//Fill the whole screen to the color we set!
		ctx.fillRect(0,0,ctx.width,ctx.height);
		//Invert the color
		ctx.fillStyle="rgb("+(255-this.red)+","+(255-this.green)+","+(255-this.blue)+")";
		//render the box with the invereted color!
	    this.box.render(ctx);
	}
});