
var town_name_table = {
};

var area_name_table = {
};

var loc_name_table = {
};

/*
	TOWN -> 城鎮（大地點）
	AREA -> 地區（連接用小區域）
	LOC  -> 地點（特定功能場所）
*/
	
// 城鎮
var TOWN_UNKNOWN = 0;
town_name_table[TOWN_UNKNOWN] = '未知的城鎮';
	
var TOWN_ASGRARD = 1;
town_name_table[TOWN_ASGRARD] = '阿斯嘉特';

// 地區
var AREA_UNKNOWN = 0;
area_name_table[AREA_UNKNOWN] = '未知的領域';

var AREA_FALISU = 1;
area_name_table[AREA_FALISU] = '法理斯廣場';

var AREA_BUSINESS = 2;
area_name_table[AREA_BUSINESS] = '商業區';

var AREA_GUILD = 3;
area_name_table[AREA_GUILD] = '冒險者公會';

// 場所
var LOC_UNKNOWN = 0;
loc_name_table[LOC_UNKNOWN] = '未知的場所';

var LOC_QUEST = 1;
loc_name_table[LOC_QUEST] = '委託';

var LOC_TEAM = 2;
loc_name_table[LOC_TEAM] = '隊伍編成';

var AREA_TEMPLATE = {
	town_id: TOWN_UNKNOWN, 
	area_id: AREA_UNKNOWN, 
	background_image: IMAGE.ERROR, 
};

var AREA_OPTION_TEMPLATE = {
	town_id: TOWN_UNKNOWN, 
	area_id: AREA_UNKNOWN, 
	condition: ALWAYS_RETURN(false), // function condition (town_scene) {}
};

var LOC_OPTION_TEMPLATE = {
	town_id: TOWN_UNKNOWN, 
	loc_id: LOC_UNKNOWN, 
	condition: ALWAYS_RETURN(false), // function condition (town_scene) {}
	data: {}, 
};

var area_table = {
	// 阿斯嘉特
	1: {
		// 法理斯廣場
		1: clone_hash(AREA_TEMPLATE, {
			town_id: TOWN_ASGRARD, 
			area_id: AREA_FALISU, 
			background_image: IMAGE.BG_CASTLE, 
			options: [
				// 通往商業區
				clone_hash(AREA_OPTION_TEMPLATE, {
					town_id: TOWN_ASGRARD, 
					area_id: AREA_BUSINESS, 
					condition: ALWAYS_RETURN(true), 
				}), 
				// 通往冒險者公會
				clone_hash(AREA_OPTION_TEMPLATE, {
					town_id: TOWN_ASGRARD, 
					area_id: AREA_GUILD, 
					condition: ALWAYS_RETURN(true), 
				}), 
				// 測試戰鬥
				clone_hash(LOC_OPTION_TEMPLATE, {
					town_id: TOWN_ASGRARD, 
					loc_id: LOC_QUEST, 
					name: '與大叔的親密接觸', 
					condition: ALWAYS_RETURN(true), 
					data: {
						stage_id: 1, 
					}, 
				}), 
				// DEBUG: 隊伍編成
				clone_hash(LOC_OPTION_TEMPLATE, {
					town_id: TOWN_ASGRARD, 
					loc_id: LOC_TEAM, 
					name: '隊伍編制', 
					condition: ALWAYS_RETURN(true), 
				}), 
			], 
		}), 
		// 商業區
		2: clone_hash(AREA_TEMPLATE, {
			town_id: TOWN_ASGRARD, 
			area_id: AREA_BUSINESS, 
			background_image: IMAGE.BG_CASTLE, 
			options: [
				// 通往法理斯廣場
				clone_hash(AREA_OPTION_TEMPLATE, {
					town_id: TOWN_ASGRARD, 
					area_id: AREA_FALISU, 
					name: '回到廣場', 
					condition: ALWAYS_RETURN(true), 
				}), 
			], 
		}), 
		// 冒險者公會
		3: clone_hash(AREA_TEMPLATE, {
			town_id: TOWN_ASGRARD, 
			area_id: AREA_GUILD, 
			background_image: IMAGE.BG_CASTLE, 
			options: [
				// 隊伍編成
				clone_hash(LOC_OPTION_TEMPLATE, {
					town_id: TOWN_ASGRARD, 
					loc_id: LOC_TEAM, 
					name: '隊伍編制', 
					condition: ALWAYS_RETURN(true), 
				}), 
				// 通往法理斯廣場
				clone_hash(AREA_OPTION_TEMPLATE, {
					town_id: TOWN_ASGRARD, 
					area_id: AREA_FALISU, 
					name: '回到廣場', 
					condition: ALWAYS_RETURN(true), 
				}), 
			], 
		}), 
	}, 
};
