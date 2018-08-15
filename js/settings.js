var CANVAS_WIDTH_ORIG = 1920;
var CANVAS_HEIGHT_ORIG = 1080;

var CANVAS_WIDTH = CANVAS_WIDTH_ORIG;
var CANVAS_HEIGHT = CANVAS_HEIGHT_ORIG;

var EDGEBOARD_X = 256;
var EDGEBOARD_Y = 84;

var PRIMARY_FONT = "comfortaabold";

var FPS           = 30;
var FPS_TIME      = 1000/FPS;
var DISABLE_SOUND_MOBILE = false;

var MIN_PLAYER_FORCE_VEL = 0.1;

var BALL_SPRITE_ANIM_MULTIPLIER = 0.4;

var BALL = 2;
var LEFT_SIDE = 3;
var RIGHT_SIDE = 4;

var MIN_DIST_COLLISION_DETECT = 1000;

var BUT_LEVEL_WIDTH = 95;
var BUT_LEVEL_HEIGHT = 84;

var NUM_ROWS_PAGE_LEVEL;
var NUM_COLS_PAGE_LEVEL;

var s_b2Players;
var s_bFriendly;
var s_bFirstPlay = true;
var s_bFirstMultiPlayer = true;

var BLUE_STICK = 0;
var RED_STICK = 1;
var PLAYER_SPEED_STICKS = 10;
var CPU_SPEED_STICK_FRIENDLY;
var CPU_SPEED_STICKS;
var NUM_GOAL_FRIENDLY;
var POINTS_TO_WIN = 1;
var TIME_GOAL_ANIMATION = 2500;

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;
var STATE_LEVEL_SELECTION = 4;

var ON_MOUSE_DOWN  = 0;
var ON_MOUSE_UP    = 1;
var ON_MOUSE_OVER  = 2;
var ON_MOUSE_OUT   = 3;
var ON_DRAG_START  = 4;
var ON_DRAG_END    = 5;

var PHYSICS_ITERATIONS = 10;

var BALL_START_VELOCITY = 1.5;
var STICK_ACCELLERATION = 1;
var STICK_FRICTION = 0.91;

//EDGES
var HORIZONTAL_LINE_UP = 0;
var HORIZONTAL_LINE_DOWN = 1;
var VERTICAL_LINE_LEFT_UP = 2;
var VERTICAL_LINE_LEFT_DOWN = 3;
var VERTICAL_LINE_RIGHT_UP = 4;
var VERTICAL_LINE_RIGHT_DOWN = 5;
var GOAL_HORIZONTAL_LEFT_UP = 6;
var GOAL_HORIZONTAL_LEFT_DOWN = 7;
var GOAL_HORIZONTAL_RIGHT_UP = 8;
var GOAL_HORIZONTAL_RIGHT_DOWN = 9;

//STICKS
var GOALKEEPER = 0;
var DEFENDER = 1;
var MIDFIELDER = 2;
var STRIKER = 3;

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;


var AD_SHOW_COUNTER;

// AQ
var AQ_END_DELAY_MSECS = 2000;