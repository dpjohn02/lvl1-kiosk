
function removeWhiteFromImage(IMG){
	
	var oldCanvas = document.createElement("canvas");
	
	oldCanvas.width		= IMG.width;
	oldCanvas.height 	= IMG.height;
	var oldCTX = oldCanvas.getContext('2d');
	oldCTX.drawImage(IMG,0,0);
	var imageData = oldCTX.getImageData(0,0,IMG.width,IMG.height);
	
	for(var x=0;x<IMG.width;x++)
		for(var y=0;y<IMG.height;y++)
		{	
			var index = 4 * (x* IMG.height + y );
			//var data = oldCTX.getImageData(x, y, 1, 1);
			if(imageData.data[index+0]==255&&imageData.data[index+1]==255&&imageData.data[index+2]==255){
				imageData.data[index+3]=0;
			

		}
	}
	
	oldCTX.putImageData(imageData, 0, 0);
	var newIMG = new Image(IMG.width,IMG.height);
	newIMG.src = oldCanvas.toDataURL("image/png") ;

	return newIMG;
}

function colorImage(IMG, R, G, B){

	var oldCanvas = document.createElement("canvas");
	
	oldCanvas.width		= IMG.width;
	oldCanvas.height 	= IMG.height;
	var oldCTX = oldCanvas.getContext('2d');
	oldCTX.drawImage(IMG,0,0);
	var imageData = oldCTX.getImageData(0,0,IMG.width,IMG.height);
	var avg = R + G + B;
	for(var x=0;x<IMG.width;x++)
		for(var y=0;y<IMG.height;y++)
		{	
			var index = 4 * (x* IMG.height + y );
			//var data = oldCTX.getImageData(x, y, 1, 1);
			
			imageData.data[index+0]=parseInt(imageData.data[index+0]*(R/avg));
			imageData.data[index+1]=parseInt(imageData.data[index+1]*(G/avg));
			imageData.data[index+2]=parseInt(imageData.data[index+2]*(B/avg));
		}
	
	
	oldCTX.putImageData(imageData, 0, 0);
	var newIMG = new Image(IMG.width,IMG.height);
	newIMG.src = oldCanvas.toDataURL("image/png");

	return newIMG;

}

function colorImage(IMG , COLOR){

	var color = document.createElement("canvas");
	
	color.width		= COLOR.width;
	color.height 	= COLOR.height;
	var oldCTX = color.getContext('2d');
	oldCTX.drawImage(COLOR,0,0);
	var colorImageData = oldCTX.getImageData(0,0,COLOR.width,COLOR.height);
	
	var newCanvas = document.createElement("canvas");
	newCanvas.width		= IMG.width;
	newCanvas.height 	= IMG.height;
	var newCTX = newCanvas.getContext('2d');
	newCTX.drawImage(IMG,0,0);
	
	var imageData  = newCTX.getImageData(0,0,IMG.width,IMG.height);
	var width = parseInt(IMG.width / COLOR.width);
	var height = parseInt(IMG.height / COLOR.height); 	

	for(var x=0;x<COLOR.width;x++)
		for(var y=0;y<COLOR.height;y++)
		{	
			var index = 4 * (x* COLOR.height + y );
			var R = colorImageData.data[index+0];
			var G = colorImageData.data[index+1];
			var B = colorImageData.data[index+2];
			var avg = 255;
			for(var x2=0;x2<width;x2++)
				for(var y2=0;y2<height;y2++)
				{	
					var IMGindex = 4 * ((x2+(x*width)) * IMG.height + y2 +(y*height));
			
					imageData.data[IMGindex+0]=parseInt(imageData.data[IMGindex+0]*(1.0*R/avg));
					imageData.data[IMGindex+1]=parseInt(imageData.data[IMGindex+1]*(1.0*G/avg));
					imageData.data[IMGindex+2]=parseInt(imageData.data[IMGindex+2]*(1.0*B/avg));
				}	
		}
	
	
	newCTX.putImageData(imageData, 0, 0);
	var newIMG = new Image(IMG.width,IMG.height);
	newIMG.src = newCanvas.toDataURL("image/png");

	return newIMG;

}


function mirrorImage(IMG){
	
	var oldCanvas = document.createElement("canvas");
	
	oldCanvas.width		= IMG.width;
	oldCanvas.height 	= IMG.height;
	var oldCTX = oldCanvas.getContext('2d');
	
	oldCTX.translate(0, IMG.height);
	oldCTX.scale(1, -1);
	var size = IMG.width/80-1;
	for(var x=0;x<IMG.width/80;x++)
		for(var y=0;y<IMG.height/80;y++)
		{	
			//oldCTX.translate(80*x, 80*y); 
			
			//oldCTX.rotate(Math.pi); 
			oldCTX.drawImage(IMG,80*(x),80*(size-y),80-.5,80-.5,80*x,80*y,80,80);
		
			
			//oldCTX.translate(0, 0); 
		}
	

	var newIMG = new Image(IMG.width,IMG.height);
	newIMG.src = oldCanvas.toDataURL("image/png") ;

	return newIMG;
}

function flipImage(IMG){
	
	var oldCanvas = document.createElement("canvas");
	
	oldCanvas.width		= IMG.width;
	oldCanvas.height 	= IMG.height;
	var oldCTX = oldCanvas.getContext('2d');
	
	oldCTX.translate(IMG.width, 0);
	oldCTX.scale(-1, 1);
	var size = IMG.width/80-1;
	for(var x=0;x<IMG.width/80;x++)
		for(var y=0;y<IMG.height/80;y++)
		{	
			//oldCTX.translate(80*x, 80*y); 
			
			//oldCTX.rotate(Math.pi); 
			oldCTX.drawImage(IMG,80*(size-x),80*y,80-.5,80-.5,80*x,80*y,80,80);
		
			
			//oldCTX.translate(0, 0); 
		}
	

	var newIMG = new Image(IMG.width,IMG.height);
	newIMG.src = oldCanvas.toDataURL("image/png") ;

	return newIMG;
}

function upscaleImage(IMG,SCALE){ 
	var oldCanvas = document.createElement("canvas");
	var oldCTX = oldCanvas.getContext('2d');
	oldCanvas.width		= IMG.width;
	oldCanvas.height 	= IMG.height;
	
	
	oldCTX.drawImage(IMG,0,0);
	var oldImageData = oldCTX.getImageData(0,0,IMG.width,IMG.height);
	
	var newCanvas = document.createElement("canvas");
	var newCTX = newCanvas.getContext('2d');
	newCanvas.width		= IMG.width*SCALE;
	newCanvas.height 	= IMG.height*SCALE;
	var newImageData = newCTX.createImageData(newCanvas.width, newCanvas.height);
	
	for(var x=0;x<oldCanvas.width;x++)
		for(var y=0;y<oldCanvas.height;y++)
		{
			var index = 4 * (x* oldCanvas.height + y );
			for(var x2=0;x2<SCALE;x2++)
				for(var y2=0;y2<SCALE;y2++)
				{
					var newindex = 4 * (parseInt(x*SCALE + x2) * newCanvas.height + parseInt(y*SCALE + y2));
					newImageData.data[newindex+0] = oldImageData.data[index+0];
					newImageData.data[newindex+1] = oldImageData.data[index+1];
					newImageData.data[newindex+2] = oldImageData.data[index+2];
					newImageData.data[newindex+3] = oldImageData.data[index+3];
				}
		}
	
	newCTX.putImageData(newImageData, 0, 0);
	var newIMG = new Image(IMG.width*SCALE,IMG.height*SCALE);
	newIMG.src = newCanvas.toDataURL("image/png") ;
	return newIMG; 
}



function spriteSheet(IMG, TILE_WIDTH, TILE_HEIGHT){
	this.img = IMG;
	this.img2 = flipImage(IMG);
	this.img3 = mirrorImage(IMG);
	this.img4 = mirrorImage(flipImage(IMG));
	this.width = TILE_WIDTH;
	this.height = TILE_HEIGHT;
	this.numX = IMG.width/TILE_WIDTH;
	this.numY = IMG.height/TILE_HEIGHT;
	this.dir = 1;
	this.drawImage = function(CTX, x,y, posX , posY ){
		var img = this.img;
		if(this.dir == 2)
			img = this.img2;
		if(this.dir == 3)
			img = this.img3;
		if(this.dir == 4)
			img = this.img4;
		CTX.drawImage(img,this.width*posX,this.height*posY,this.width-.5,this.height-.5,x,y,this.width,this.height);
	}
	this.drawImage = function(CTX, x,y, pos ){
		var img = this.img;
		if(this.dir == 2)
			img = this.img2;
		if(this.dir == 3)
			img = this.img3;
		if(this.dir == 4)
			img = this.img4;
		CTX.drawImage(img,this.width*(pos%this.numX),this.height*parseInt(pos/this.numX),this.width-.5,this.height-.5,x,y,this.width,this.height);
	}
	
	
}