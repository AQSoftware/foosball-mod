function CInterface(){
    var _oButExit;
    var _oContainer;
    var _oButFullscreen;
    var _oHelpPanel=null;
    var _bMobileInitialized;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oContainerScore;
    var _pStartPosContainerScore; 
    var _pStartPosFullscreen;
    var _oButUpP1;
    var _oButDownP1;
    var _oButUpP2;
    var _oButDownP2;
    var _oButUpP1_W;
    var _oButDownP1_W;
    var _oButUpP2_W;
    var _oButDownP2_W;
    var _pStartPosButUpP1;
    var _pStartPosButDownP1;
    var _pStartPosButUpP2;
    var _pStartPosButDownP2;
    var _oScoreTextBlue;
    var _oScoreTextRed;
    var _oButHelp;
    var _pStartPosButHelp;

    var ARROW_BTN_W = 300;
    var ARROW_BTN_H = 200;    
    
    this._init = function(){  
        _oContainer = new createjs.Container();
        _bMobileInitialized = false;
        s_oStage.addChild(_oContainer);

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && !inIframe()){
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen");
            _pStartPosFullscreen = {x:oSprite.width/4+10,y:oSprite.height/2+10};
            _pStartPosButHelp = {x:oSprite.width/2+10,y:oSprite.height/2+10};
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,_oContainer);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreen,this);
        }else{
            // _pStartPosButHelp = {x:oSprite.width/4+10,y:oSprite.height/2+10};
            _pStartPosButHelp = {x:100,y:100};
        }
                
        _pStartPosContainerScore= {x:CANVAS_WIDTH/2,y:83};
        _oContainerScore = new createjs.Container();
        _oContainer.addChild(_oContainerScore);
        oSprite = s_oSpriteLibrary.getSprite("score_panel");
        var oScorePanelBlue = new createBitmap(oSprite,oSprite.width,oSprite.height);
        oScorePanelBlue.regX = oSprite.width/2;
        oScorePanelBlue.regY = oSprite.height/2;
        _oContainerScore.x = _pStartPosContainerScore.x;
        _oContainerScore.y = _pStartPosContainerScore.y;
        _oScoreTextBlue = new createjs.Text(0," 50px "+PRIMARY_FONT,"#000000");
        _oScoreTextBlue.textAlign = "center";
        _oScoreTextBlue.x = -50;
        _oScoreTextBlue.y = +27;
        _oScoreTextBlue.textBaseline = "alphabetic";
        _oScoreTextRed = new createjs.Text(0," 50px "+PRIMARY_FONT,"#000000");
        _oScoreTextRed.textAlign = "center";
        _oScoreTextRed.x = +50;
        _oScoreTextRed.y = +27;
        _oScoreTextRed.textBaseline = "alphabetic";
        _oContainerScore.addChild(oScorePanelBlue,_oScoreTextBlue,_oScoreTextRed);

        // var shape = new createjs.Shape();
        // shape.graphics.beginFill("#00ff00").drawRect(0, 0, CANVAS_WIDTH, 4);
        // shape.x = 0;
        // shape.y = CANVAS_HEIGHT/2;
        // _oContainer.addChild(shape);

       this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){        
        s_oStage.removeChild(_oContainer);
        if (_fRequestFullScreen && !inIframe()) {
            _oButFullscreen.unload();
        }        

        s_oInterface = null;
    };
    
    this.refreshPlayersScore = function (iScoreP1,iScoreP2){
       _oScoreTextBlue.text =  iScoreP1;
       _oScoreTextRed.text = iScoreP2;
    };
    
    this.initMobileButtons = function(){
        _bMobileInitialized = true;
        _pStartPosButUpP1;
        _pStartPosButDownP1;
        _pStartPosButUpP2;
        _pStartPosButDownP2;
        var oSprite = s_oSpriteLibrary.getSprite("arrow");
        
        if (!s_b2Players){
            _pStartPosButUpP1 = {x: CANVAS_WIDTH/2-800, y:  CANVAS_HEIGHT/2+350};
            _pStartPosButDownP1 = {x: CANVAS_WIDTH/2+800, y: CANVAS_HEIGHT/2+350};
            _oButUpP1 = new CGfxButtonArrow(_pStartPosButUpP1.x,_pStartPosButUpP1.y,oSprite,_oContainer, ARROW_BTN_W, ARROW_BTN_H);
            _oButUpP1.setMuted(true);
            _oButDownP1 = new CGfxButtonArrow(_pStartPosButDownP1.x,_pStartPosButDownP1.y,oSprite,_oContainer, ARROW_BTN_W, ARROW_BTN_H);
            _oButDownP1.setMuted(true);
            _oButDownP1.getButtonImage().rotation= 180;
            
        }else{
            // _pStartPosButUpP1 = {x: CANVAS_WIDTH/2-800, y: CANVAS_HEIGHT/2+240};
            _pStartPosButUpP1 = {x: CANVAS_WIDTH/2-800, y: CANVAS_HEIGHT/2-350};
            _pStartPosButDownP1 = {x: CANVAS_WIDTH/2-800, y: CANVAS_HEIGHT/2+350};
            // _pStartPosButUpP2 = {x: CANVAS_WIDTH/2+800, y: CANVAS_HEIGHT/2+240};
            _pStartPosButUpP2 = {x: CANVAS_WIDTH/2+800, y:  CANVAS_HEIGHT/2-350};
             _pStartPosButDownP2= {x: CANVAS_WIDTH/2+800, y: CANVAS_HEIGHT/2+350};
            _oButUpP1 = new CGfxButtonArrow(_pStartPosButUpP1.x,_pStartPosButUpP1.y,oSprite,_oContainer, ARROW_BTN_W, ARROW_BTN_H);
            _oButUpP1.setMuted(true);
            _oButDownP1 = new CGfxButtonArrow(_pStartPosButDownP1.x,_pStartPosButDownP1.y,oSprite,_oContainer, ARROW_BTN_W, ARROW_BTN_H);
            _oButDownP1.setMuted(true);
            _oButUpP2 = new CGfxButtonArrow(_pStartPosButUpP2.x,_pStartPosButUpP2.y,oSprite,_oContainer, ARROW_BTN_W, ARROW_BTN_H);
            _oButUpP2.setMuted(true);
            _oButDownP2 = new CGfxButtonArrow(_pStartPosButDownP2.x,_pStartPosButDownP2.y,oSprite,_oContainer, ARROW_BTN_W, ARROW_BTN_H);
            _oButDownP2.setMuted(true);
            _oButDownP1.getButtonImage().rotation= 180;
            _oButDownP2.getButtonImage().rotation= 180;
            _oButUpP2.addEventListener(ON_MOUSE_DOWN,function(){s_oGame.setBooleanUp2(true);},this);
            _oButUpP2.addEventListener(ON_MOUSE_UP,function(){s_oGame.setBooleanUp2(false);},this);
            _oButDownP2.addEventListener(ON_MOUSE_DOWN,function(){s_oGame.setBooleanDown2(true);},this);
            _oButDownP2.addEventListener(ON_MOUSE_UP,function(){s_oGame.setBooleanDown2(false);},this);
        }
        _oButUpP1.addEventListener(ON_MOUSE_DOWN,function(){s_oGame.setBooleanUp1(true);},this);
        _oButUpP1.addEventListener(ON_MOUSE_UP,function(){s_oGame.setBooleanUp1(false);},this);
        _oButDownP1.addEventListener(ON_MOUSE_DOWN,function(){s_oGame.setBooleanDown1(true);},this);
        _oButDownP1.addEventListener(ON_MOUSE_UP,function(){s_oGame.setBooleanDown1(false);},this);
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oContainerScore.y = _pStartPosContainerScore.y +iNewY;
        
        if (_fRequestFullScreen && !inIframe()) {
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX-200, _pStartPosFullscreen.y + iNewY);
        }
        
        iNewY = 0;

        if (s_bMobile){
            if (_bMobileInitialized){
                if (!s_b2Players){
                    _oButUpP1.setPosition(_pStartPosButUpP1.x+iNewX,_pStartPosButUpP1.y-iNewY);
                    _oButDownP1.setPosition(_pStartPosButDownP1.x-iNewX,_pStartPosButDownP1.y-iNewY);
                }else{
                    _oButUpP1.setPosition(_pStartPosButUpP1.x+iNewX,_pStartPosButUpP1.y-iNewY);
                    _oButDownP1.setPosition(_pStartPosButDownP1.x+iNewX,_pStartPosButDownP1.y-iNewY);
                    _oButUpP2.setPosition(_pStartPosButUpP2.x-iNewX,_pStartPosButUpP2.y-iNewY);
                    _oButDownP2.setPosition(_pStartPosButDownP2.x-iNewX,_pStartPosButDownP2.y-iNewY);
                }
            }
        }
    };

    this.setOnTop = function(){
       s_oStage.addChildAt(_oContainer,s_oStage.numChildren); 
    };

    this.refreshScore = function(iValue){
        //_oScoreNum.alpha=1;
        //_oScoreNum.text = iValue;
    };

    this._onButHelpRelease = function(){
        _oHelpPanel = new CHelpPanel();
    };
    
    this._onButRestartRelease = function(){
        s_oGame.restartGame();
        $(s_oMain).trigger("restart_level", 1);
    };
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onExit = function(){
        new CAreYouSurePanel(s_oGame.onExit);
    };
    
    this.resetFullscreenBut = function(){
	    if(_oButFullscreen) _oButFullscreen.setActive(s_bFullscreen);
    };


    this._onFullscreen = function(){
        // s_oGame.gameOver();
        // return;

        if(s_bFullscreen) { 
    		_fCancelFullScreen.call(window.document);
	    }else{
		    _fRequestFullScreen.call(window.document.documentElement);
	    }
	
	    sizeHandler();
    };
    
    s_oInterface = this;
    
    this._init();
    
    return this;
}

var s_oInterface = null;