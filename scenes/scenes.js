
var main;



function Screen(WIDTH, HEIGHT, CANVAS){

	var isPercentWidth  = (WIDTH+"").indexOf('%') === -1 ? false : true;
	var isPercentHeight = (HEIGHT+"").indexOf('%') === -1 ? false : true;
	var percentWidth = parseInt(WIDTH);
	var percentHeight = parseInt(HEIGHT);
	var width = parseInt(WIDTH);
	var height = parseInt(HEIGHT);
	var c = CANVAS;
	var ctx = c.getContext("2d");
	
	if(isPercentWidth || isPercentHeight)
		window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();
	
	
	
    function resizeCanvas() {
		if(isPercentWidth){
			ctx.width = parseInt(window.innerWidth*(percentWidth/100.0));
			width = ctx.width;
			c.width = ctx.width;
		}
		else{
			ctx.width = width;
			c.width = width;
		}
		if(isPercentHeight){
			ctx.height = parseInt(window.innerHeight*(percentHeight/100.0));
			height = ctx.height;
			c.height = ctx.height;
		}
		else{
			ctx.height = height;
			c.height =height;
		}
		//main.refresh();
    }
	
	function setWidth(WIDTH){
		isPercentWidth  = (WIDTH+"").indexOf('%') === -1 ? false : true;
		percentWidth = parseInt(WIDTH);
		width = parseInt(WIDTH);
		resizeCanvas();
	}
	
	function setHeight(HEIGHT){
		isPercentHeight  = (HEIGHT+"").indexOf('%') === -1 ? false : true;
		percentHeight = parseInt(HEIGHT);
		height = parseInt(HEIGHT);
		resizeCanvas();
	}
	
	return  {
		getWidth : function(){return width;},
		getHeight : function(){return height;},
		setWidth : setWidth,
		setHeight : setHeight,
		getCTX : function(){return ctx;},
		getCanvas : function(){return c;}
	};
}



function backgrounds(inSCREEN){	
	var end=null, last=null, last=null, temp=null; 
	var activeScreen = inSCREEN;
	var ctx = activeScreen.getCTX();
	var date = new Date();
	var list = new Array();
	var listTime = new Array();
	var startTime = null;
	var startSceneTime = null;
	var endSceneTime = null;
	var difSceneTime = -1;
	var activeScene=0;
	var activeThread = -1;
	var nextThreadWait = -1;
	
	
	var timeoutSceneLoopID = null, timeoutSceneID = null;

	
	function addScene(time, refreshCallback) {
		refreshCallback.setScreen( activeScreen);
		
		list[list.length] = refreshCallback;
		listTime[listTime.length] = time;
	}
	
	function start() {	
		
		var pos = 0;
		startTime = date.getTime();
		sceneLoop(null,pos);
	}
	
	function sceneLoop(last,pos){
		clearInterval(nextThreadWait);
		runScene(last, pos%list.length, (pos+1)%list.length);
		timeoutSceneLoopID = window.setTimeout(function(){	
			nextThreadWait = window.setInterval(function() {
				if(difSceneTime == -1 && Date.now() > endSceneTime){
					sceneLoop(pos, (pos+1)%list.length);
					clearInterval(nextThreadWait);
				}
			}, 16); 	
			
		}, getSceneTime(pos));
	}
	
	function runScene(LAST, CUR, NEXT){
		
		//timeoutSceneID = window.setTimeout(function(){	
			if(LAST != null){
				getScene(LAST).end();
				clearInterval(activeThread);
			}
			else{
				getScene(CUR).setup();
				preLoadImg(getScene(CUR));
			}
			
			getScene(CUR).start();
			activeThread = window.setInterval(function() {
					if(getScene(CUR).started ){
						getScene(CUR).update(getScene(activeScene).refreshRate());
						getScene(CUR).render(ctx);
					}
				}, getScene(CUR).refreshRate()); 	
			
			activeScene = CUR;
			startSceneTime = Date.now();
			endSceneTime = Date.now()+getSceneTime(CUR);	
			if(getScene(NEXT)!=null)
			{
				getScene(NEXT).setup();
				preLoadImg(getScene(NEXT));
			}	
		//}, getSceneTime(CUR));
	}
	
	function pause() {
		if(difSceneTime == -1)
		{
		
			difSceneTime = Date.now()-startSceneTime;
			clearInterval(activeThread);
			activeThread = window.setInterval(function() {
					
					getScene(activeScene).render(ctx);
			
				}, getScene(activeScene).refreshRate()); 	
		}
		else
		{
			clearInterval(activeThread);
			endSceneTime = Date.now()+getSceneTime(activeScene);		
			startSceneTime = Date.now()-difSceneTime;
			activeThread = window.setInterval(function() {
					getScene(activeScene).update(getScene(activeScene).refreshRate());
					getScene(activeScene).render(ctx);
				}, getScene(activeScene).refreshRate()); 	
			
			
			difSceneTime = -1;
		}
	}
	
	
	
	function getScene(POS){
		
		return list[POS];
	}
	
	function getSceneTime(POS){
		return listTime[POS];
	}
	
	
	function preLoadImg(refreshCallback){
		for (i=0;i<refreshCallback.imgLoc.length;i++) 
		{
			if(refreshCallback.img[i]==null){
				refreshCallback.img[i] = new Image();
				//if(refreshCallback.loading!=null)
				//	refreshCallback.loading += 1;
				refreshCallback.img[i].onload = function() {
					//if(refreshCallback.loading!=null)
					//	refreshCallback.loading -= 1;
					console.log ( 'Image loaged' );
				};
				refreshCallback.img[i].src = refreshCallback.imgLoc[i] ;
			}
		}
	}
	function refresh(){
		if(getScene(activeScene)!== undefined)
			getScene(activeScene).render(ctx);
	}
	function getDone(){
		if(difSceneTime == -1)
		return 100-100.0*(Date.now()-startSceneTime)/(endSceneTime-startSceneTime);
		else
		return 100-100.0*(difSceneTime)/(endSceneTime-startSceneTime);
	}
	function getList(){
		var send = new Array();
		for(var i = 0;i< list.length;i++){
			send[send.length] = list[i];
		}
		return send;
	}
	function getActive(){
		return activeScene;
	}
	
	function playScene(num){
		alert(num);
		clearInterval(timeoutSceneLoopID);
		sceneLoop(activeScene,(num)%list.length);
	}
	
	function nextScene(){
		clearInterval(timeoutSceneLoopID);
		sceneLoop(activeScene,(activeScene+1)%list.length);
	}
	function backScene(){
		clearInterval(timeoutSceneLoopID);
		if(Date.now()-startSceneTime<500)
		{
			var next = activeScene-1;
			if(next<0)next=list.length-1;
			sceneLoop(activeScene,next);
		}
		else
			sceneLoop(activeScene,activeScene);
	}
	function changeOrder(OLD, NEW){
		if(OLD<NEW){
			for(var i =0;i<Math.abs(OLD-NEW);i++){
				var tempObj = list[OLD+i];
				var tempTime = listTime[OLD+i];
				list[OLD+i] = list[OLD+i+1];
				listTime[OLD+i] = listTime[OLD+i+1];
				list[OLD+i+1] = tempObj;
				listTime[OLD+i+1] = tempTime;
			}
		}
		else{
			for(var i =Math.abs(OLD-NEW);i>0;i--){
				var tempObj = list[NEW+i-1];
				var tempTime = listTime[NEW+i-1];
				list[NEW+i-1] = list[NEW+i];
				listTime[NEW+i-1] = listTime[NEW+i];
				list[NEW+i] = tempObj;
				listTime[NEW+i] = tempTime;
			}
		}
		if(OLD == activeScene)activeScene = NEW;
		else if(OLD >= activeScene&& NEW <= activeScene)activeScene++;
		else if(OLD <= activeScene&& NEW >= activeScene)activeScene--;
		
	}
	
	return  {
		backScene : backScene,
		addScene : addScene,
		changeOrder : changeOrder,
		nextScene : nextScene,
		getScene : getScene,
		playScene : playScene,
		pause : pause,
		start : start,
		refresh : refresh,
		getDone : getDone,
		getList : getList,
		getCtx : function(){return ctx;},
		getActive : getActive
	};
}

