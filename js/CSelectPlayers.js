function CSelectPlayers (){
    
    var _oContainer;
    var _oButP1;
    var _oButP2;
    var _oText;
    var _pStartPosFullscreen;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _iHeightToggle;
    
    this.init = function(){
        s_oSelectPlayers=this;
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite("bg_menu");
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#000000").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        shape.alpha = 0.7;
        var oBg = new createBitmap(oSprite,oSprite.width,oSprite.height);
        _oContainer.addChild(oBg);
        _oContainer.addChild(shape);
        oSprite = s_oSpriteLibrary.getSprite("but_p1");
        _oButP1 = new CGfxButton(CANVAS_WIDTH/2-225,CANVAS_HEIGHT/2,oSprite,_oContainer);
        _oButP1.addEventListener(ON_MOUSE_DOWN,function(){this.onSelectPlayer(false);},this);
        oSprite = s_oSpriteLibrary.getSprite("but_p2");
        _oButP2 = new CGfxButton(CANVAS_WIDTH/2+225,CANVAS_HEIGHT/2,oSprite,_oContainer);
        _oButP2.addEventListener(ON_MOUSE_DOWN,function(){this.onSelectPlayer(true);},this);
        _oText = new createjs.Text(TEXT_SELECT_PLAYERS_MENU,"72px "+PRIMARY_FONT,"#FFFFFF");
        _oText.y = CANVAS_HEIGHT/2-300;
        _oText.x = CANVAS_WIDTH/2;
        _oText.textAlign = "center";
        _oContainer.addChild(_oText);
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && inIframe() === false){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x: oSprite.width/4 + 10,y:(oSprite.height/2)+10};

            _iHeightToggle = oSprite.height;

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,_oContainer);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
        
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX-200,_pStartPosFullscreen.y + iNewY);
        }
    };
    
    this.onSelectPlayer = function(bVal){
        s_b2Players = bVal;
        this.unload();
        s_oMain.gotoGame();
    };
    
    this.unload = function(){
       s_oStage.removeChild(_oContainer); 
       s_oSelectPlayers;
    };
    
    this.resetFullscreenBut = function(){
	_oButFullscreen.setActive(s_bFullscreen);
    };

    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    this.init();
}

var s_oSelectPlayers = null;
