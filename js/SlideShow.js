var SlideShow = Class.extend({
	init: function (config, commercial){
		this.config = config;
		this.commercial = commercial;
		this.focusID = -1;
		this.intervalID = 0;
		this.intervalTime = 15000;
		this.commercialTime = 0; 
		this.commercialTillShow = 0;
		this.commercialTillShowMax = 2;
		this.build();
		this.loop();
	},
	build: function (){
		for(var i=0;i<this.config.length;i++){
			var name = "thing"+i;
			var insideDiv = "<h3>"+this.config[i].title+"</h3><p>"+this.config[i].description+"</p>";
			var newDiv = $('<div/>', {
			    id: name
			}).addClass("thing");
			newDiv.html(insideDiv);
			newDiv.appendTo('#sidebar');

		}
	},
	loop: function(){
		if(this.commercialTillShow == this.commercialTillShowMax){
			this.commercialTillShow = 0;
			$( "#iFrameCommercial").attr('src', this.commercial[parseInt(this.commercial.length*Math.random())]);
			return;
		}
		$( "#iFrameCommercial").attr('src', "");
		$( "div" ).removeClass( "active" );
		var list= $( ".thing" ).toArray();
		this.focusID = (this.focusID+1)%list.length;
		$( "#thing"+this.focusID).addClass("active");
		$( "#iFrame").attr('src', this.config[this.focusID].url);
		this.commercialTillShow++;

	},
	start: function(){
		this.interval = setInterval(this.loop.bind(this), this.intervalTime);
	},
	stop: function(){
		clearInterval(this.interval);
	}
});