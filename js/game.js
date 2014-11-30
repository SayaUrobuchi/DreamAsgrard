
var __DEBUG = true;

var UI = {
	TITLE_PRODUCER_TEXT: "本作品由 沙耶 所製作", 
	TITLE_GAME_TITLE: "未 命 名", 
	TITLE_OPTION_NEW_GAME: "新的淨土", 
	TITLE_OPTION_CONTINUE: "再續霸業", 
	TITLE_OPTION_EXTRA: "回憶相簿", 
	
	TOWN_QUEST_START_BUTTON_TEST: "出☆擊", 
	
	HERO_NEXT_EXP_HEAD: "距離升級尚需經驗：", 
	HERO_HP_HEAD: "生命", 
	HERO_ATK_HEAD: "攻擊", 
	HERO_HEAL_HEAD: "治癒", 
	HERO_DETAIL_STORY_BACK_BUTTON_TEXT: '回列表', 
	
	ADV_AUTO: "自動模式", 
	ADV_SKIP: "快進模式", 
	
	MANA_WIDTH: 50, 
	MANA_HEIGHT: 50, 
	MANA_RELEASE_INTERVAL: 8, 
	MANA_RELEASE_TIME: 400, 
	MANA_APPEAR_TIME: 400, 
	MANA_FALLING_TIME: 200, 
	MANA_FIT_DELAY: 20, 
	MANA_MASK_FADEIN_TIME: 150,  
	MANA_MASK_FADEIN_ALPHA: .6, 
	MANA_MASK_FADEOUT_TIME: 150,
	MANA_MASK_FADEOUT_ALPHA: 0, 
	MANA_DIAG_AREA_RATE: .12, 
	
	BATTLE_TURN_ANIMATE_TIME: 400, 
	BATTLE_COMBO_FADEOUT_TIME: 800, 
	BATTLE_COMBO_ANIMATE_TIME: 150, 
	BATTLE_MANA_COUNT_ANIMATE_TIME: 250, 
	BATTLE_MANA_PLUS_COUNT_ANIMATE_TIME: 200, 
	BATTLE_MANA_PLUS_COUNT_FADEOUT_TIME: 600, 
	
	BATTLE_ENEMY_ACTION_ANIMATE_TIME: 400, 
	BATTLE_ENEMY_ACTION_ANIMATE_SCALE: 1.8, 
	BATTLE_ENEMY_CD_NORMAL_SIZE: 18, 
	BATTLE_ENEMY_CD_WARNING_SIZE: 22, 
	BATTLE_ENEMY_CD_DANGER_SIZE: 28, 
	BATTLE_ENEMY_DAMAGE_ANIMATE_TIME: 400, 
	BATTLE_ENEMY_DAMAGE_STAY_TIME: 600, 
	BATTLE_ENEMY_DAMAGE_FADEOUT_TIME: 600, 
	BATTLE_ENEMY_HP_BAR_HEAL_ANIMATE_TIME: 500, 
	BATTLE_ENEMY_HP_BAR_BACK_HEAL_ANIMATE_TIME: 100, 
	BATTLE_ENEMY_HP_BAR_DAMAGE_ANIMATE_TIME: 100, 
	BATTLE_ENEMY_HP_BAR_BACK_DAMAGE_ANIMATE_TIME: 1200, 
	
	BATTLE_HERO_HP_BAR_DAMAGE_COLOR: '#AA0077', 
	BATTLE_HERO_HP_BAR_HEAL_COLOR: '#00AA77', 
	BATTLE_HERO_HP_BAR_HEAL_ANIMATE_TIME: 800, 
	BATTLE_HERO_HP_BAR_BACK_HEAL_ANIMATE_TIME: 100, 
	BATTLE_HERO_HP_BAR_DAMAGE_ANIMATE_TIME: 100, 
	BATTLE_HERO_HP_BAR_BACK_DAMAGE_ANIMATE_TIME: 800, 
	BATTLE_HERO_HP_MAX_CHANGED_ANIMATE_TIME: 300, 
	BATTLE_HERO_RATE_MSG_FADEOUT_TIME: 1200, 
	BATTLE_HERO_RATE_MSG_ANIMATE_TIME: 300, 
	BATTLE_HERO_ATTACK_INTERVAL: 120, 
	
	TOWN_TEAM_OK_BUTTON: '編制結束', 
	
	TEAM_MEMBER_TABLE: [
		'隊長', 
		'隊員', 
		'隊員', 
		'隊員', 
		'隊員', 
		'候補', 
	], 
};

var MANA = {
	COUNT: 6, 

	NONE: 0, 
	FIRE: 1, 
	WATER: 2, 
	WOOD: 3, 
	LIGHT: 4, 
	DARK: 5, 
	HEART: 6, 
	
	NAME_TABLE: {
		0: '', 
		1: '火', 
		2: '水', 
		3: '木', 
		4: '光', 
		5: '暗', 
		6: '心', 
	}, 
	
	COLOR_TABLE: {
		1: '#FF3030', 
		2: '#4255B6', 
		3: '#37A053', 
		4: '#CC8800', 
		5: '#CC20CC', 
		6: '#DD70A0', 
	}, 
	
	NAME: function (mana)
	{
		return MANA.NAME_TABLE[mana];
	}, 
	
	attack_rate: function (attacker, defender)
	{
		if (attacker >= 4 && defender >= 4 && attacker != defender)
		{
			return game.COLOR_GOOD_RATE;
		}
		else if (attacker <= 3 && defender <= 3)
		{
			if (defender == (attacker)%3+1)
			{
				return game.COLOR_BAD_RATE;
			}
			else if (defender == (attacker+1)%3+1)
			{
				return game.COLOR_GOOD_RATE;
			}
		}
		return game.COLOR_NORMAL_RATE;
	}, 
};

var game = {
	FULL_TITLE: "阿斯嘉特尋夢記", 
	TITLE: "阿斯嘉特尋夢記", 
	SUB_TITLE: "～妲伊的大冒險～", 
	
	UPDATE_INTERVAL: 30, 
	TEXT_DISPLAY_SPEED: 2, 
	NEWLINE_DISPLAY_WIDTH: 4, 
	
	BATTLE_HERO_NUM: 6, 
	
	HERO_SUB_SKILL_NUMBER: 3, 
	HERO_ATTR_NUMBER: 8, 
	
	COMBO_RATE: 30, 
	COLOR_RELEASE_RATE: 30, 
	COLOR_GOOD_RATE: 140, 
	COLOR_NORMAL_RATE: 100, 
	COLOR_BAD_RATE: 70, 
	
	BGM_CHANGED: true, 
	CG_CHANGED: true, 
	TIP_CHANGED: true, 
	
	get_global_save_obj: function ()
	{
	}, 
	
	get_save_obj: function ()
	{
		var ret = {};
		ret.data = data;
		return ret;
	}, 
	
	load_from_save_obj: function (obj)
	{
		data = clone_hash(data, obj);
	}, 
	
	load_global: function ()
	{
		var gdata = localStorage['global'];
		if (gdata)
		{
			try
			{
				global = clone_hash(data, JSON.parse(gdata));
			}
			catch (e)
			{
				log(LOG_ERROR, 'load_global() fail: '+e);
			}
		}
	}, 
	
	load_from_slot: function (slot_id)
	{
		var slot = localStorage['save'+slot_id];
		if (!slot)
		{
			return null;
		}
		try
		{
			return JSON.parse(slot);
		}
		catch (e)
		{
			log(LOG_ERROR, 'load_from_slot('+slot_id+') fail: '+e);
			return null;
		}
	}, 
	
	save_global: function ()
	{
		localStorage['global'] = JSON.stringify(global);
	}, 
	
	save_to_slot: function (slot_id, save)
	{
		localStorage['save'+slot_id] = JSON.stringify(save);
	}, 
};

var data = {
	// ------ 各種遊戲內部數據
	flag: {}, 
	value: {}, 
	scene_id: 0, 
	hero_list: [
	], 
	team_list: [
		// DEBUG: SHOULD NOT INIT HERE
		{
			name: '妲伊義勇軍前鋒', 
			member: [], 
		}, 
	], 
	cur_team: 0, 
};

var global = {
	tip: {}, 
	cg: {}, 
	bgm: {}, 
	config: {}, 
	flag: {}, 
	value: {}, 
};

var temp_data = {
	get_hero: function (id)
	{
		if (!temp_data.hero_cache[id])
		{
			temp_data.hero_cache[id] = Hero(data.hero_list[id]);
		}
		return temp_data.hero_cache[id];
	}, 
	hero_cache: {}, 
};

function add_tip(id)
{
	if (!global.tip[id])
	{
		global.tip[id] = true;
		game.save_global();
		game.TIP_CHANGED = true;
	}
}

function add_cg(id)
{
	if (!global.cg[id])
	{
		global.cg[id] = true;
		game.save_global();
		game.CG_CHANGED = true;
		cg_count_group = {};
	}
}

function add_bgm(id)
{
	if (!global.bgm[id])
	{
		global.bgm[id] = true;
		game.save_global();
		game.BGM_CHANGED = true;
	}
}

function add_flag(flag)
{
	log(LOG_MSG, 'add_flag['+flag+']');
	data.flag[flag] = true;
}

function break_flag(flag)
{
	log(LOG_MSG, 'break_flag['+flag+']');
	delete data.flag[flag];
}

function add_global_flag(flag)
{
	log(LOG_MSG, 'add_global_flag['+flag+']');
	global.flag[flag] = true;
}

function break_global_flag(flag)
{
	log(LOG_MSG, 'break_global_flag['+flag+']');
	delete global.flag[flag];
}

function __change_value(obj, target, op, value)
{
	switch (op)
	{
	case 'ASSIGN':
		obj.value[target] = value;
		break;
	case 'ADD':
		obj.value[target] += value;
		break;
	case 'SUB':
		obj.value[target] -= value;
		break;
	case 'MUL':
		obj.value[target] *= value;
		break;
	case 'DIV':
		if (value != 0)
		{
			obj.value[target] = Math.floor(obj.value[target]/value);
		}
		break;
	case 'MOD':
		if (value != 0)
		{
			obj.value[target] %= value;
		}
		break;
	}
	log(LOG_MSG, 'value['+target+'] change to ['+obj.value[target]+']');
}

function change_value(value)
{
	var target = value.target;
	var op = to_uppercase(value.op);
	var val = value.value;
	log(LOG_MSG, 'change_value['+target+']');
	__change_value(data, target, op, val);
}

function change_global_value(value)
{
	var target = value.target;
	var op = to_uppercase(value.op);
	var val = value.value;
	log(LOG_MSG, 'change_global_value['+target+']');
	__change_value(global, target, op, val);
}

function is_flag(flag)
{
	return data.flag[flag];
}

function is_global_flag(flag)
{
	return global.flag[flag];
}

function __is_value(obj, value)
{
	var compare_list = to_array(value);
	var ret = true;
	for (var i=0; i<compare_list.length&&ret; i++)
	{
		var compare = compare_list[i];
		var target = compare.target;
		var op = to_uppercase(compare.op);
		var val = compare.value;
		var lval = obj.value[target];
		var rval;
		if (is_int(val))
		{
			rval = val;
		}
		else
		{
			rval = obj.value[val];
		}
		switch (op)
		{
		case 'EQ':
			ret = (lval == rval);
			break;
		case 'NEQ':
			ret = (lval != rval);
			break;
		case 'GT':
			ret = (lval > rval);
			break;
		case 'GEQ':
			ret = (lval >= rval);
			break;
		case 'LT':
			ret = (lval < rval);
			break;
		case 'LEQ':
			ret = (lval <= rval);
			break;
		}
	}
	return ret;
}

function is_value(value)
{
	return __is_value(data, value);
}

function is_global_value(value)
{
	return __is_value(global, value);
}

var tip_count = 0;

function get_tip_count()
{
	if (game.TIP_CHANGED)
	{
		tip_count = 0;
		for (var i=0; i<tip_list.length; i++)
		{
			if (global.tip[tip_list[i].id])
			{
				tip_count++;
			}
		}
		game.TIP_CHANGED = false;
	}
	return tip_count;
}

var cg_count = 0;
var cg_total_count;

function get_total_cg_count()
{
	if (is_ndef(cg_total_count))
	{
		cg_total_count = 0;
		for (var i=0; i<cg_list.length; i++)
		{
			cg_total_count += get_cg_group_total_count(i);
		}
	}
	return cg_total_count;
}

function get_cg_count()
{
	if (game.CG_CHANGED)
	{
		cg_count = 0;
		for (var i=0; i<cg_list.length; i++)
		{
			cg_count += get_cg_group_own_count(i);
		}
		game.CG_CHANGED = false;
	}
	return cg_count;
}

var cg_count_group = {};

function get_cg_group_total_count(group)
{
	var ret = 0;
	var key = cg_list[group].key;
	if ($.isArray(key))
	{
		ret = key.length;
	}
	else
	{
		ret = 1;
	}
	return ret;
}

function get_cg_group_own_count(group)
{
	var ret = cg_count_group[group];
	if (is_ndef(ret))
	{
		ret = 0;
		var cg_group = cg_list[group].key;
		if (!$.isArray(cg_group))
		{
			cg_group = [cg_group];
		}
		for (var i=0; i<cg_group.length; i++)
		{
			if (global.cg[cg_group[i]])
			{
				ret++;
			}
		}
		cg_count_group[group] = ret;
	}
	return ret;
}

var bgm_count = 0;

function get_bgm_count()
{
	if (game.BGM_CHANGED)
	{
		bgm_count = 0;
		for (var i=0; i<bgm_list.length; i++)
		{
			if (global.bgm[bgm_list[i].key])
			{
				bgm_count++;
			}
		}
		game.BGM_CHANGED = false;
	}
	return bgm_count;
}

var adv_data = {
	add: function(adv_scene) {
		if (!adv_scene.id || adv_scene.id < 0)
		{
			log(LOG_ERROR, "ADV場景未設定ID");
			return false;
		}
		if (adv_data[adv_scene.id])
		{
			log(LOG_ERROR, "場景ID ["+adv_scene.id+"] 重覆");
			return false;
		}
		adv_data[adv_scene.id] = adv_scene;
		return true;
	}, 
};

var image = {
	__cnt: 0, 
	__preloaded: false, 
	
	get: function (file)
	{
		if (image[file])
		{
			return $(image[file]).clone();
		}
		log(LOG_WARNING, 'image "'+file+'" not preloaded.');
		return $('<img class="image" src="'+file+'">').clone();
	}, 
};

var audio = {
	__cnt: 0, 
	__preloaded: false, 
};

var IMAGE = {
	MONSTER0: "p/吳名士_W2.PNG", 
	MONSTER1: "p/吳名士_W.JPG", 
	
	HEROT0: "p/安夏_H.PNG", 
	HEROT1: "p/恩尼斯_H.PNG", 
	HEROT2: "p/古藤_H.JPG", 
	HEROT3: "p/妲伊_H.JPG", 
	HEROT4: "p/曙葉_H.JPG", 
	HEROT5: "p/小夕_H.PNG", 
	
	BG_CASTLE: "p/BG_Castle.jpg", 
	
	UI_DIALOG_NEXT: "p/ui_dialog_next.png", 
	
	ERROR: "p/吳名士_W.JPG", 
};

var AUDIO = {
	BGM_FANTASY: "m/fanta.mp3", 
};

var cg_list = [
{
	id: 1, 
	name: '犬日子', 
	key: 'CG_DOG_DAYS', 
}, 
];

var bgm_list = [
{
	id: 1, 
	name: '幻想', 
	key: 'BGM_FANTASY', 
}, 
];

var tip_list = [
{
	id: 8, 
	name: '沙耶', 
}, 
];
