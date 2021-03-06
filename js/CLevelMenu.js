function CLevelMenu(){
    var _iCurPage;
    var _iHeightToggle;
    var _aLevelButs;
    var _aPointsX;
    var _aContainerPage;
    var _pStartPosSelect;
    var _pStartPosFullscreen;
    
    var _oArrowRight = null;
    var _oArrowLeft = null;
    var _oTextLevel;
    var _oContainer;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    this._init = function(){
        var shape = new createjs.Shape();
        shape.graphics.beginFill("#000000").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        shape.alpha = 0.7;
        if (getItem("level_foosball")!=="undefined"&&getItem("level_foosball")!==null){
            s_iLastLevel = getItem("level_foosball");
        }else{
            s_iLastLevel = 1;
        }
        _iCurPage = 0;
        
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
	_oContainer.addChild(oBg);
        _oContainer.addChild(shape);
        
        _pStartPosSelect = {x:CANVAS_WIDTH/2,y:18};
        _oTextLevel = new createjs.Text(TEXT_SELECT_LEVEL ,"70px "+PRIMARY_FONT, "#fff");
        _oTextLevel.x = _pStartPosSelect.x;
        _oTextLevel.textAlign = "center";
        s_oStage.addChild(_oTextLevel);
                
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
            
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        this._checkBoundLimits();
        
        //FIND X COORDINATES FOR LEVEL BUTS
        _aPointsX = new Array();
        var iWidth = CANVAS_WIDTH - (EDGEBOARD_X*2) ;
        var iOffsetX = Math.floor(iWidth/NUM_COLS_PAGE_LEVEL)/2;
        var iXPos = 0;
        for(var i=0;i<NUM_COLS_PAGE_LEVEL;i++){
            _aPointsX.push(iXPos);
            iXPos += iOffsetX*2;
        }
        
        _aContainerPage = new Array();
        this._createNewLevelPage(0,s_oLevelSettings.getNumLevel());
        
        if(_aContainerPage.length > 1){
            //MULTIPLE PAGES
            for(var k=1;k<_aContainerPage.length;k++){
                _aContainerPage[k].visible = false;
            }

            _oArrowRight = new CGfxButton(CANVAS_WIDTH/2+300 ,CANVAS_HEIGHT/2+350,s_oSpriteLibrary.getSprite('arrow'),s_oStage);
            _oArrowRight.getButtonImage().rotation = 90;
            _oArrowRight.addEventListener(ON_MOUSE_UP, this._onRight, this);
            
            _oArrowLeft = new CGfxButton(CANVAS_WIDTH/2 - 300,CANVAS_HEIGHT/2 + 350,s_oSpriteLibrary.getSprite('arrow'),s_oStage);
            _oArrowLeft.getButtonImage().rotation = -90;
            _oArrowLeft.addEventListener(ON_MOUSE_UP, this._onLeft, this);
        }
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);	
        _oTextLevel.y = _aContainerPage[0].y-(175+(Math.floor(iWidth/NUM_COLS_PAGE_LEVEL)/2));
    };
    
    this.unload = function(){
        for(var i=0;i<_aLevelButs.length;i++){
            _aLevelButs[i].unload();
        }  
                
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.unload();
        }
        
        if(_oArrowLeft !== null){
            _oArrowLeft.unload();
            _oArrowRight.unload();
        }
        
        s_oLevelMenu = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oTextLevel.y = _pStartPosSelect.y + iNewY;
        if (_fRequestFullScreen && inIframe() === false){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }
    };
    
    this._checkBoundLimits = function(){
        var oSprite = s_oSpriteLibrary.getSprite('but_level');
        var iY = 0;
        
        var iHeightBound = CANVAS_HEIGHT - (EDGEBOARD_Y*2) - (_iHeightToggle * 2);
        var iNumRows = 0;

        while(iY < iHeightBound){
            iY += oSprite.height + 20;
            iNumRows++;
        }
        if(NUM_ROWS_PAGE_LEVEL > iNumRows){
            NUM_ROWS_PAGE_LEVEL = iNumRows;
        }
        
        
        var iNumCols = 0;
        var iX = 0;
        var iWidthBounds = CANVAS_WIDTH - (EDGEBOARD_X*2);
        var oSprite = s_oSpriteLibrary.getSprite('but_level'); 

        while(iX < iWidthBounds){
            iX += (oSprite.width/2) + 5;
            iNumCols++;  
        }
        if(NUM_COLS_PAGE_LEVEL > iNumCols){
            NUM_COLS_PAGE_LEVEL = iNumCols;
        }
    };
    
    this._createNewLevelPage = function(iStartLevel,iEndLevel){
        var oContainerLevelBut = new createjs.Container();
        _oContainer.addChild(oContainerLevelBut);
        _aContainerPage.push(oContainerLevelBut);
        
        _aLevelButs = new Array();
        var iCont = 0;
        var iY = 0;
        var iNumRow = 1;
        var bNewPage = false;
        var oSprite = s_oSpriteLibrary.getSprite('but_level');
        for(var i=iStartLevel;i<iEndLevel;i++){
            var oBut = new CLevelBut(_aPointsX[iCont] + oSprite.width/4, iY + oSprite.height/2, i+1,oSprite, (i+1)>s_iLastLevel?false:true,oContainerLevelBut);
            oBut.addEventListenerWithParams(ON_MOUSE_UP, this._onButLevelRelease, this,i);
            _aLevelButs.push(oBut);
            
            iCont++;
            if(iCont === _aPointsX.length && i<iEndLevel-1){
                iCont = 0;
                iY += oSprite.height + 20;
                iNumRow++;
                if(iNumRow > NUM_ROWS_PAGE_LEVEL){
                    bNewPage = true;
                    break;
                }
            }
        }

        oContainerLevelBut.x = CANVAS_WIDTH/2 ;
        oContainerLevelBut.y = CANVAS_HEIGHT/2;
        oContainerLevelBut.regX = oContainerLevelBut.getBounds().width/2;
        oContainerLevelBut.regY = oContainerLevelBut.getBounds().height/2;
        
        if(bNewPage){
            this._createNewLevelPage(i+1,iEndLevel);
        }
        
    };
    
    this._onRight = function(){
        _aContainerPage[_iCurPage].visible = false;
        
        _iCurPage++;
        if(_iCurPage >=  _aContainerPage.length){
            _iCurPage = 0;
        }
        
        _aContainerPage[_iCurPage].visible = true;
    };
    
    this._onLeft = function(){
        _aContainerPage[_iCurPage].visible = false;
        
        _iCurPage--;
        if(_iCurPage <  0){
            _iCurPage =_aContainerPage.length-1;
        }
        
        _aContainerPage[_iCurPage].visible = true;
    };
    
    this._onButLevelRelease = function(iLevel){
        $(s_oMain).trigger("start_level",iLevel);
        s_oLevelSettings.loadLevel(iLevel);
        s_oMain.gotoGame();
        this.unload();
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
    
    this._onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
    };

    s_oLevelMenu = this;
    this._init();
}

var s_oLevelMenu = null;