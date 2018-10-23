function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
		s_oStage.preventSelection = false;
        createjs.Touch.enable(s_oStage);
		
	// s_bMobile = jQuery.browser.mobile;
	s_bMobile = true;
        if(s_bMobile === false){
            s_oStage.enableMouseOver(FPS);  
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.setFPS(FPS);
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
		
        defaultLifeCycle.setOnResetCallback(this.onReset.bind(this));
    };
    
    this.preloaderReady = function(){
        jQuery.getJSON("level_info.json", this.onLoadedJSON); 
        _bUpdate = true;
    };
    
    this.onLoadedJSON = function(oData){
        s_oLevelSettings = new CLevelSettings(oData);
        try{
            saveItem("ls_available","ok");
        }catch(evt){
            // localStorage not defined
            s_bStorageAvailable = false;
        }
        
	    s_oMain._loadImages();
		
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            s_oMain._initSounds();
        }
    };
    
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);

         if(_iCurResource === RESOURCE_TO_LOAD){
            this._onPreloaderComplete();
         }
    };
    
    this._initSounds = function(){
		
        var aSoundsInfo = new Array();
        aSoundsInfo.push({path: './sounds/',filename:'soundtrack',loop:true,volume:1, ingamename: 'soundtrack'});
        aSoundsInfo.push({path: './sounds/',filename:'ball_kick',loop:true,volume:1, ingamename: 'ball_kick'});
        aSoundsInfo.push({path: './sounds/',filename:'goal',loop:true,volume:1, ingamename: 'goal'});
        aSoundsInfo.push({path: './sounds/',filename:'press_button',loop:true,volume:1, ingamename: 'click'});
        aSoundsInfo.push({path: './sounds/',filename:'game_over',loop:true,volume:1, ingamename: 'game_over'});
        aSoundsInfo.push({path: './sounds/',filename:'ball_kick',loop:true,volume:1, ingamename: 'ball_kick'});
        aSoundsInfo.push({path: './sounds/',filename:'ball_wall',loop:true,volume:1, ingamename: 'ball_wall'});
        aSoundsInfo.push({path: './sounds/',filename:'goal_exultance',loop:true,volume:1, ingamename: 'goal_exultance'});
        aSoundsInfo.push({path: './sounds/',filename:'miss_goal',loop:true,volume:1, ingamename: 'miss_goal'});
        aSoundsInfo.push({path: './sounds/',filename:'applause',loop:true,volume:1, ingamename: 'applause'});
        aSoundsInfo.push({path: './sounds/',filename:'whistle',loop:true,volume:1, ingamename: 'whistle'});
        
        RESOURCE_TO_LOAD += aSoundsInfo.length;
        s_aSounds = new Array();
        for(var i=0; i<aSoundsInfo.length; i++){
            
            s_aSounds[aSoundsInfo[i].ingamename] = new Howl({ 
                                                            src: [aSoundsInfo[i].path+aSoundsInfo[i].filename+'.mp3', aSoundsInfo[i].path+aSoundsInfo[i].filename+'.ogg'],
                                                            autoplay: false,
                                                            preload: true,
                                                            loop: aSoundsInfo[i].loop, 
                                                            volume: aSoundsInfo[i].volume,
                                                            onload: s_oMain.soundLoaded()
                                                        });
                                   
                                                        
        }
    };

    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("ctl_logo","./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_info","./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("but_yes_big","./sprites/but_yes_big.png");
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg"); 
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("ball","./sprites/ball.png");
        s_oSpriteLibrary.addSprite("player_shadow","./sprites/player_shadow.png");
        s_oSpriteLibrary.addSprite("but_p1","./sprites/but_p1.png");
        s_oSpriteLibrary.addSprite("but_p2","./sprites/but_p2.png");
        s_oSpriteLibrary.addSprite("friendly_mode","./sprites/friendly_mode.png");
        s_oSpriteLibrary.addSprite("tournament_mode","./sprites/tournament_mode.png");
        s_oSpriteLibrary.addSprite("arrow","./sprites/arrow.png");
        s_oSpriteLibrary.addSprite("stick","./sprites/stick.png");
        s_oSpriteLibrary.addSprite("field","./sprites/field.png");
        s_oSpriteLibrary.addSprite("player_red","./sprites/player_red.png");
        s_oSpriteLibrary.addSprite("player_blue","./sprites/player_blue.png");
        s_oSpriteLibrary.addSprite("arena","./sprites/arena.png");
        s_oSpriteLibrary.addSprite("score_rod_blue","./sprites/score_rod_blue.png");
        s_oSpriteLibrary.addSprite("score_rod_red","./sprites/score_rod_red.png");
        s_oSpriteLibrary.addSprite("score_cube_blue","./sprites/score_cube_blue.png");
        s_oSpriteLibrary.addSprite("score_cube_red","./sprites/score_cube_red.png");
        s_oSpriteLibrary.addSprite("score_panel","./sprites/score_panel.png");
        s_oSpriteLibrary.addSprite("logo_menu","./sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite("but_restart","./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_home","./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_level","./sprites/but_level.png");
        s_oSpriteLibrary.addSprite("but_next","./sprites/but_next.png");
        s_oSpriteLibrary.addSprite("but_kickoff","./sprites/but_kickoff.png");
        s_oSpriteLibrary.addSprite("goal_text","./sprites/goal_text.png");
        s_oSpriteLibrary.addSprite("but_delete_save","./sprites/but_delete_save.png");
        s_oSpriteLibrary.addSprite("key_w","./sprites/key_w.png");
        s_oSpriteLibrary.addSprite("key_s","./sprites/key_s.png");
        s_oSpriteLibrary.addSprite("key_up","./sprites/key_up.png");
        s_oSpriteLibrary.addSprite("key_down","./sprites/key_down.png");
        s_oSpriteLibrary.addSprite("skip_arrow","./sprites/skip_arrow.png");
        s_oSpriteLibrary.addSprite("skip_arrow_left","./sprites/skip_arrow_left.png");
        s_oSpriteLibrary.addSprite("but_help","./sprites/but_help.png");
        s_oSpriteLibrary.addSprite("but_pause","./sprites/but_pause.png");
        
       
        
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        //console.log("PERC: "+iPerc);
        _oPreloader.refreshLoader(iPerc);
        
        if(_iCurResource === RESOURCE_TO_LOAD){
            this._onPreloaderComplete();
        }
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this._onPreloaderComplete = function(){
        _oPreloader.unload();
            
        // if (!isIOS()) {
        //     s_oSoundtrack = playSound('soundtrack', 1, true);
        // }
        
        this.onReset();

        defaultLifeCycle.informReady();
    };

    this.onReset = function() {
        this.gotoMenu();
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.gotoMenu = function(){
        // _oMenu = new CMenu();
        // _iState = STATE_MENU;

        this.goFriendly();
        // this.goTournament();
    };

    this.goTournament = function() {
        $(s_oMain).trigger("start_session");
        s_bFriendly = false;
        s_oMain.gotoLevelMenu();
    };

    this.goFriendly = function() {
        $(s_oMain).trigger("start_session");
        s_bFriendly = true;
        CPU_SPEED_STICKS = CPU_SPEED_STICK_FRIENDLY;
        POINTS_TO_WIN = NUM_GOAL_FRIENDLY;
        // s_oMain.gotoSelectPlayers();


        /**
         * to compile to ONE/TWO players please swap the comment on the two statements below 
         * */
        // s_b2Players = false;// ONE player
        // s_b2Players = true;// TWO players
        s_b2Players = _oData.aq_api_data.isSinglePlayer == false;

        s_oMain.gotoGame();
    };    

    this.gotoGame = function(){
        _oGame = new CGame(_oData);   						
        _iState = STATE_GAME;
    };
    
    this.gotoSelectPlayers = function(){
       new CSelectPlayers(); 
    };
    
    this.gotoLevelMenu = function(){
       new CLevelMenu();
       _iState = STATE_LEVEL_SELECTION;
    };
    
    this.gotoSelectMode = function(){
       new CSelectMode(); 
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
        Howler.mute(true);
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
        if(s_bAudioActive){
                Howler.mute(false);
        }
    };
    
    this._update = function(event){
		if(_bUpdate === false){
			return;
		}
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;
    ENABLE_FULLSCREEN = oData.fullscreen;
    NUM_ROWS_PAGE_LEVEL = oData.level_menu_rows;
    NUM_COLS_PAGE_LEVEL = oData.level_menu_cols;
    CPU_SPEED_STICK_FRIENDLY = oData.cpu_speed_friendly;
    NUM_GOAL_FRIENDLY = oData.num_goal_friendly;
    _oData = oData;
    
    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = true;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_iLastLevel = 1;
var s_bFullscreen = false;
var s_bStorageAvailable = true;
var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundtrack = null;
var s_oCanvas;
var s_aSounds;

var defaultLifeCycle = window.AQCore.defaultLifeCycle;
var Utils = window.AQCore.Utils;