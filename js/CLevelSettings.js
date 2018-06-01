function CLevelSettings (oData){
    var _oData;
    var _iCurrentLevel;
    var _iSavedLevel;
    var _oContainerMsgBox;
    
    this.init = function(oData){
        _iCurrentLevel = 0;
        _oData = oData;
        s_oLevelSettings = this;
        if (getItem("level_foosball")===null||getItem("level_foosball")==="undefined"){
            _iSavedLevel = 0;
        }else{
            _iSavedLevel = getItem("level_foosball");
        }
    };
    
    this.loadLevel = function(iLevel){
        _iCurrentLevel = iLevel;
        POINTS_TO_WIN = _oData[iLevel].points_to_win;
        CPU_SPEED_STICKS = _oData[iLevel].cpu_speed_sticks;
    };
    
    this.nextLevel = function(){
       if (_iCurrentLevel<_oData.length){
           _iCurrentLevel++;
           this.loadLevel(_iCurrentLevel);
       } 
    };
    
    this.saveLevel = function(){
        if (_iSavedLevel<_iCurrentLevel+1){
                saveItem("level_foosball",_iCurrentLevel+1);
            }
    };
    
    this.getNextLevel = function(){
       if (_iCurrentLevel<_oData.length){
            return _iCurrentLevel+2;
       }else{
           return _iCurrentLevel+1;
       }
    };
    
    this.getCurrentLevel = function(){
       return _iCurrentLevel; 
    };
    
    this.getNumLevel = function(){
       return _oData.length; 
    };
    
    this.deleteSaveData = function(){
       var oSprite = s_oSpriteLibrary.getSprite("msg_box");
       var _oContainerMsgBox = new createjs.Container();
       var oMsgBox = new createBitmap(oSprite,oSprite.width,oSprite.height);
       oMsgBox.regX = oSprite.width/2;
       oMsgBox.regY = oSprite.height/2;
       var oText = new createjs.Text(TEXT_DELETE_SAVE," 40px "+PRIMARY_FONT,"#FFFFFF");
       oText.y = -180;
       oText.textAlign = "center";
       oText.lineWidth = 800;
       _oContainerMsgBox.x = CANVAS_WIDTH/2;
       _oContainerMsgBox.y = CANVAS_HEIGHT/2;
       _oContainerMsgBox.alpha = 0;
       var oShape = new createjs.Shape();
       oShape.graphics.beginFill("#000000").drawRect(-CANVAS_WIDTH/2,-CANVAS_HEIGHT/2,CANVAS_WIDTH,CANVAS_HEIGHT);
       oShape.alpha = 0.5;
       oShape.on("mousedown",function(){},this);
       s_oStage.addChild(_oContainerMsgBox);
       _oContainerMsgBox.addChild(oShape,oMsgBox,oText);
       var oButYes = new CGfxButton(-100,+150,s_oSpriteLibrary.getSprite("but_yes_big"),_oContainerMsgBox);
       var oButNo = new CGfxButton(+100,+150,s_oSpriteLibrary.getSprite("but_exit"),_oContainerMsgBox);
       oButNo.pulseAnimation();
       oButNo.addEventListener(ON_MOUSE_UP,function(){
           new createjs.Tween.get(_oContainerMsgBox).to({alpha: 0},500).call(function(){s_oStage.removeChild(_oContainerMsgBox)});
       },this);
       oButYes.addEventListener(ON_MOUSE_UP,function(){
           localStorage.removeItem("level_foosball");
           for (var i=0;i<s_oLevelSettings.getNumLevel();i++){
            if (getItem("score_foosball_"+i)!==null&&getItem("score_foosball_"+i)!==null&&getItem("score_foosball_"+i)!==0){
                setItem("score_foosball_"+i,0);
            }
        }
           new createjs.Tween.get(_oContainerMsgBox).to({alpha: 0},500).call(function(){s_oStage.removeChild(_oContainerMsgBox)});
       },this);
       new createjs.Tween.get(_oContainerMsgBox).to({alpha: 1},500);
    };
    
    this.init(oData);
}

s_oLevelSettings = null;