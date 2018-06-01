function CEndPanel(oSpriteBg,iWinner){
    
    var _oBg;
    var _oGroup;
    
    var _oMsgTextBack;
    var _oMsgText;
    var _oScoreTextBack;
    var _oScoreText;
    var _iScore;
    var _oButRestart;
    var _oButHome;
    var _oRestartList;
    var _oHomeList;
    var _oButNext;
    var _iWinner;
    var _oEndSound;
    var _iGlobalScore;
    
    this._init = function(oSpriteBg,iWinner){
        s_oGame.setPause(true);
        _iWinner = iWinner;
        var oShape = new createjs.Shape();
        oShape.graphics.beginFill("#000").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        oShape.alpha = 0.5;
        oShape.on("mousedown",this.onMouseDown,this);
        
        _oBg = createBitmap(oSpriteBg);
        var oBgInfo = _oBg.getBounds();
        _oBg.regX = oBgInfo.width/2;
        _oBg.regY = oBgInfo.height/2;
        _oBg.x = CANVAS_WIDTH/2;
        _oBg.y = CANVAS_HEIGHT/2;
        
	_oMsgTextBack = new createjs.Text(""," 52px "+PRIMARY_FONT, "#000");
        _oMsgTextBack.x = CANVAS_WIDTH/2 +1;
        _oMsgTextBack.y = (CANVAS_HEIGHT/2)-140;
        _oMsgTextBack.textAlign = "center";
        _oMsgTextBack.textBaseline = "alphabetic";
        _oMsgTextBack.lineWidth = 550;

        _oMsgText = new createjs.Text(""," 52px "+PRIMARY_FONT, "#ffffff");
        _oMsgText.x = CANVAS_WIDTH/2;
        if (s_bFriendly===true){
            _oMsgText.y = (CANVAS_HEIGHT/2)-108;
        }else{
            _oMsgText.y = (CANVAS_HEIGHT/2)-138;
        }
        _oMsgText.textAlign = "center";
        _oMsgText.textBaseline = "alphabetic";
        _oMsgText.lineWidth = 550;
        
        _oScoreTextBack = new createjs.Text(""," 37px "+PRIMARY_FONT, "#000");
        _oScoreTextBack.x = CANVAS_WIDTH/2 +1;
        _oScoreTextBack.y = (CANVAS_HEIGHT/2) + 30;
        _oScoreTextBack.textAlign = "center";
        _oScoreTextBack.textBaseline = "alphabetic";
        _oScoreTextBack.lineWidth = 550;
        
        _oScoreText = new createjs.Text(""," 37px "+PRIMARY_FONT, "#ffffff");
        _oScoreText.x = CANVAS_WIDTH/2;
        _oScoreText.y = (CANVAS_HEIGHT/2) + 28;
        _oScoreText.textAlign = "center";
        _oScoreText.textBaseline = "alphabetic";
        _oScoreText.lineWidth = 550;
        

        _oGroup = new createjs.Container();
        _oGroup.alpha = 0;
        _oGroup.visible=false;
        
        
        _oGroup.addChild(oShape,_oBg, _oScoreTextBack,_oScoreText,_oMsgTextBack,_oMsgText);

        s_oStage.addChild(_oGroup);
        var oSprite = s_oSpriteLibrary.getSprite("but_restart");
        _oButRestart = new CGfxButton(CANVAS_WIDTH/2+100,CANVAS_HEIGHT/2+150,oSprite,_oGroup);
        
        oSprite = s_oSpriteLibrary.getSprite("but_home");
        _oButHome = new CGfxButton(CANVAS_WIDTH/2-100,CANVAS_HEIGHT/2+150,oSprite,_oGroup);
        
        if (s_bFriendly===false&&s_oLevelSettings.getCurrentLevel()!==s_oLevelSettings.getNumLevel()-1){
            if (_iWinner!==0&&s_oLevelSettings.getCurrentLevel()>=s_iLastLevel-1){
            }else{
                _oButRestart.setX(CANVAS_WIDTH/2);
                _oButHome.setX(_oButRestart.getX()-200);
                oSprite = s_oSpriteLibrary.getSprite("but_next");
                _oButNext = new CGfxButton(CANVAS_WIDTH/2+200,CANVAS_HEIGHT/2+150,oSprite,_oGroup);
                _oButNext.addEventListener(ON_MOUSE_DOWN,this.onButNext,this);
            }
        };
    };
    
    this.onButNext = function(){
        stopSound("applause");
        stopSound("game_over");
       s_oGame.unload();
       s_oLevelSettings.nextLevel();
       s_oMain.gotoGame();
       s_oStage.removeChild(_oGroup);
       if (!s_bFriendly){
            var szImg = "200x200.jpg";
            var szTitle = "Congratulations!";
            var szMsg = "You collected <strong>" + _iScore + " points</strong>!<br><br>Share your score with your friends!";
            var szMsgShare = "My score is " + _iScore + " points! Can you do better?";        
            $(s_oMain).trigger("share_event",_iScore, szImg, szTitle, szMsg, szMsgShare);
        }
        
    };
    
    this.unload = function(){
        
    };
    
    this.onMouseDown = function(){
        
    };
    
    this._initListener = function(){
        _oButHome.addEventListener(ON_MOUSE_DOWN,this._onExit,this);
        _oButRestart.addEventListener(ON_MOUSE_DOWN,this._onRestart, this);
    };
    
    this.show = function(iScore,iWinner){
        _iGlobalScore = 0;
        if (iWinner===0||s_b2Players){
	_oEndSound = playSound("applause",1,false);
        }else{
              _oEndSound =  playSound("game_over",1,false);
        }
        _iScore = iScore;
        
        var iPlayerWin = iWinner + 1;
        
        if (iWinner===0){
            _oMsgTextBack.text = TEXT_GAMEOVER;
            _oMsgText.text = TEXT_GAMEOVER;
            //_oMsgText.y = (CANVAS_HEIGHT/2)-30;
            //_oMsgTextBack.y = (CANVAS_HEIGHT/2)-28;
        }else{
            iScore = 0;
            _iScore = 0;
            _oMsgTextBack.text = TEXT_LOSE+iPlayerWin+TEXT_LOSE2;
            _oMsgText.text = TEXT_LOSE+iPlayerWin+TEXT_LOSE2;
        }
        
        if (s_b2Players===true){
            _oMsgTextBack.text = TEXT_WIN_2PLAYERS+iPlayerWin+TEXT_WIN_2PLAYERS_2;
            _oMsgText.text = TEXT_WIN_2PLAYERS+iPlayerWin+TEXT_WIN_2PLAYERS_2;
        }
        
        if (!s_bFriendly){
            $(s_oMain).trigger("end_level",s_oLevelSettings.getCurrentLevel());
            _oScoreTextBack.text = TEXT_SCORE +": "+iScore;
            _oScoreText.text = TEXT_SCORE +": "+iScore;
            
            if (s_oLevelSettings.getCurrentLevel()===s_oLevelSettings.getNumLevel()-1){
                _oMsgText.text = TEXT_WIN_TOURNAMENT;
                _oMsgTextBack.text = TEXT_WIN_TOURNAMENT;
            }
            
        }
        
        _oGroup.visible = true;
        
        var oParent = this;
        createjs.Tween.get(_oGroup).to({alpha:1 }, 500).call(function() {oParent._initListener();});
        
        for (var i=0;i<s_oLevelSettings.getNumLevel();i++){
            if (getItem("score_foosball_"+i)!==null&&getItem("score_foosball_"+i)!==null&&getItem("score_foosball_"+i)!==0){
                _iGlobalScore+=parseInt(getItem("score_foosball_"+i));
            }
        }
        if (!s_bFriendly){
            $(s_oMain).trigger("save_score",_iGlobalScore);  
            $(s_oMain).trigger("show_interlevel_ad");
            $(s_oMain).trigger("end_session");
        }
    };
    
    this._onExit = function(){
        stopSound("applause");
        stopSound("game_over");
        
        if (!s_bFriendly){
            var szImg = "200x200.jpg";
            var szTitle = "Congratulations!";
            var szMsg = "You collected <strong>" + _iScore + " points</strong>!<br><br>Share your score with your friends!";
            var szMsgShare = "My score is " + _iScore + " points! Can you do better?";        
            $(s_oMain).trigger("share_event",_iScore, szImg, szTitle, szMsg, szMsgShare);
        }
        
        _oGroup.off("mousedown",this._onExit);
        s_oStage.removeChild(_oGroup);
        
        
        
        s_oGame.unload();
        s_oMain.gotoMenu();
    };
    
    this._onRestart = function(){
        stopSound("applause");
        stopSound("game_over");
       s_oGame.unload();
       s_oMain.gotoGame();
       s_oStage.removeChild(_oGroup);
       if (!s_bFriendly){
            var szImg = "200x200.jpg";
            var szTitle = "Congratulations!";
            var szMsg = "You collected <strong>" + _iScore + " points</strong>!<br><br>Share your score with your friends!";
            var szMsgShare = "My score is " + _iScore + " points! Can you do better?";        
            $(s_oMain).trigger("share_event",_iScore, szImg, szTitle, szMsg, szMsgShare);
        }
        
       
    };
    
    this._init(oSpriteBg,iWinner);
    
    return this;
}
