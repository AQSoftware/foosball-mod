function CGfxButtonArrow(iXPos,iYPos,oSprite, oParentContainer, iWidth, iHeight){
    
    var _bDisabled;
    
    var _iScaleFactor;
    
    var _iListenerIDMouseDown;
    var _iListenerIDPressUp;
    var _iListenerIDMouseOver;
    
    var _aCbCompleted;
    var _aCbOwner;
    
    var _oButton;
    var _oButtonContainer;
    var _oTween;
    var _oParent;
    var _bMuted;
    
    this._init =function(iXPos,iYPos,oSprite, oParentContainer, iWidth, iHeight){
        _bDisabled = false;
        _bMuted = false;
        _iScaleFactor = .5;
        
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oButton = createBitmap( oSprite);
        _oButton.scaleX =   _oButton.scaleY = _iScaleFactor;                         
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;

        var shape = new createjs.Shape();
        shape.graphics.beginFill("#ff0000").drawRect(0, 0, iWidth, iHeight);
        shape.alpha = 0.01;

        _oButtonContainer = new createjs.Container();
        _oButtonContainer.x = iXPos;
        _oButtonContainer.y = iYPos;
        // _oButtonContainer.regX = iWidth/2;
        // _oButtonContainer.regY = iHeight/2;

        _oButtonContainer.addChild(shape);
        _oButtonContainer.addChild(_oButton);

        _oButton.x = _oButtonContainer.regX;
        _oButton.y = _oButtonContainer.regY;
       
        oParentContainer.addChild(_oButtonContainer);
        
        this._initListener();
    };
    
    this.unload = function(){
        if(s_bMobile){
            _oButtonContainer.off("mousedown", _iListenerIDMouseDown);
            _oButtonContainer.off("pressup" , _iListenerIDPressUp);
        } else {
            _oButtonContainer.off("mousedown", _iListenerIDMouseDown);
            _oButtonContainer.off("mouseover", _iListenerIDMouseOver);
            _oButtonContainer.off("pressup" , _iListenerIDPressUp);
        }
        
       oParentContainer.removeChild(_oButtonContainer);
    };
    
    this.setVisible = function(bVisible){
        _oButtonContainer.visible = bVisible;
    };
    
    this.setClickable = function(bVal){
        _bDisabled = !bVal;
    };
    
    this._initListener = function(){
        if(s_bMobile){
            _iListenerIDMouseDown   = _oButtonContainer.on("mousedown", this.buttonDown);
            _iListenerIDPressUp     = _oButtonContainer.on("pressup" , this.buttonRelease);
        } else {
            _iListenerIDMouseDown   = _oButtonContainer.on("mousedown", this.buttonDown);
            _iListenerIDMouseOver   = _oButtonContainer.on("mouseover", this.buttonOver);
            _iListenerIDPressUp     = _oButtonContainer.on("pressup" , this.buttonRelease);
        }     
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.buttonRelease = function(){
        if(_bDisabled){
            return;
        }
        _oButton.scaleX = _iScaleFactor;
        _oButton.scaleY = _iScaleFactor;

        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };
    
    this.buttonDown = function(){
        if(_bDisabled){
            return;
        }
        _oButton.scaleX = _iScaleFactor*0.9;
        _oButton.scaleY = _iScaleFactor*0.9;
        
        if (!_bMuted){
            playSound("click",1,false);
        }

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.buttonOver = function(evt){
        if(!s_bMobile){
            if(_bDisabled){
                return;
            }
            evt.target.cursor = "pointer";
        }  
    };
    
    this.pulseAnimation = function () {
        _oTween = createjs.Tween.get(_oButton).to({scaleX: _iScaleFactor*0.9, scaleY: _iScaleFactor*0.9}, 850, createjs.Ease.quadOut).to({scaleX: _iScaleFactor, scaleY: _iScaleFactor}, 650, createjs.Ease.quadIn).call(function () {
            _oParent.pulseAnimation();
        });
    };

    this.trembleAnimation = function () {
        _oTween = createjs.Tween.get(_oButton).to({rotation: 5}, 75, createjs.Ease.quadOut).to({rotation: -5}, 140, createjs.Ease.quadIn).to({rotation: 0}, 75, createjs.Ease.quadIn).wait(750).call(function () {
            _oParent.trebleAnimation();
        });
    };
    
    this.setPosition = function(iXPos,iYPos){
         _oButtonContainer.x = iXPos;
         _oButtonContainer.y = iYPos;
    };
    
    this.setX = function(iXPos){
        _oButtonContainer.x = iXPos;
    };
    
    this.setY = function(iYPos){
        _oButtonContainer.y = iYPos;
    };
    
    this.getButtonImage = function(){
        return _oButton;
    };

    this.getX = function(){
        return _oButtonContainer.x;
    };
    
    this.getY = function(){
        return _oButtonContainer.y;
    };
    
    this.setMuted = function(bVal){
        _bMuted = bVal;
    };

    this.setScaleFactor = function(val){
        _iScaleFactor = val;
    };

    _oParent = this;
    this._init(iXPos,iYPos,oSprite, oParentContainer, iWidth, iHeight);
    
    return this;
}