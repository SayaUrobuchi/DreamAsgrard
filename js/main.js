
var body;
var main_f = $('<div id="main"></div>');
var err_msg = '';
var scene;

var START = {
	NORMALLY: 0, 
	ADVTEST: 1, 
	SKIP_OP: 2, 
	BATTLE_TEST: 3, 
	TOWN_TEST: 4, 
};
//var START_FLAG = START.NORMALLY;
//var START_FLAG = START.ADVTEST;
//var START_FLAG = START.SKIP_OP;
var START_FLAG = START.BATTLE_TEST;
//var START_FLAG = START.TOWN_TEST;

$(document).ready(dai_main);

function dai_init ()
{
	log(LOG_MSG, "女僕更衣中..");
	if(is_ndef(Storage))
	{
		log(LOG_ERROR, "無法存檔！");
		alert("女僕回報: 您的瀏覽器無法存檔！請選用支持local storage的瀏覽器，如 Chrome、Firefox。");
		return false;
	}
	body = $(document.body);
	document.oncontextmenu = ALWAYS_RETURN(false);
	// setup environment
	body.append($('<div id="title">'+game.TITLE+'</div>'));
	body.append($('<div id="sub_title">'+game.SUB_TITLE+'</div>'));
	body.append(main_f);
	dai_preload();
	scene = SceneMaid();
	$(document).keyup(scene.key_up);
	$(document).keydown(scene.key_down);
	$(document).keypress(scene.key_press);
	$(document).mousedown(scene.right_click);
	log(LOG_MSG, "女僕準備完畢！");
	return true;
}

function dai_preload ()
{
	var cnt = 0;
	for (var key in IMAGE)
	{
		cnt++;
		if (!image[key])
		{
			var img = new Image();
			img.addEventListener("load", dai_preload_image_callback, true);
			img.src = IMAGE[key];
			image[key] = img;
		}
	}
	image.__max_cnt = cnt;
	
	cnt = 0;
	for (var key in AUDIO)
	{
		cnt++;
		if (!audio[key])
		{
			var sound = new Audio();
			sound.addEventListener("canplaythrough", dai_preload_audio_callback, true);
			sound.preload = 'auto';
			sound.src = AUDIO[key];
			audio[key] = sound;
		}
	}
	audio.__max_cnt = cnt;
}

function dai_preload_image_callback ()
{
	image.__cnt++;
}

function dai_preload_audio_callback ()
{
	audio.__cnt++;
}

function dai_start ()
{
	log(LOG_MSG, "人外樂園、盛宴開始！");
	switch (START_FLAG)
	{
	case START.NORMALLY:
		log(LOG_MSG, "選擇了正常路線！");
		scene.push(TitleScene(), true);
		break;
	case START.ADVTEST:
		log(LOG_MSG, "精彩的故事模式");
		scene.push(TitleScene(), true);
		break;
	case START.SKIP_OP:
		log(LOG_MSG, "捷徑直達快車");
		scene.push(TitleScene(), true);
		break;
	case START.BATTLE_TEST:
		log(LOG_MSG, "無止盡的戰鬥");
		temp_data.next_stage_id = STAGE.BEFORE_ENTER_ASGARD;
		temp_data.current_battle_team = {0: Hero(hero_table[HERO.DAI_0])};
		scene.push(BattleScene(), true);
		break;
	case START.TOWN_TEST:
		log(LOG_MSG, "巨大的阿斯嘉特");
		scene.push(TownScene(), true);
		break;
	default:
		log(LOG_ERROR, "未知的路線！");
		break;
	}
	game.load_global();
	setInterval(dai_update, game.UPDATE_INTERVAL);
}

function dai_update ()
{
	if (scene)
	{
		scene.update();
	}
}

function dai_main ()
{
	dai_init();
	dai_start();
}
