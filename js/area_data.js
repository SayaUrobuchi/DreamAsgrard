
var town_name_table = {
};

var TOWN = {
};

var area_name_table = {
};

var AREA = {
};

var loc_name_table = {
};

var LOC = {
};

/*
	TOWN -> 城鎮（大地點）
	AREA -> 地區（連接用小區域）
	LOC  -> 地點（特定功能場所）
*/
	
// 城鎮
town_name_table[TOWN.UNKNOWN = 0] = '未知的城鎮';
town_name_table[TOWN.ASGARD = 1] = '阿斯嘉特';

// 地區
area_name_table[AREA.UNKNOWN = 0] = '未知的領域';
area_name_table[AREA.FALISU = 1] = '法理斯廣場';
area_name_table[AREA.BUSINESS = 2] = '商業區';
area_name_table[AREA.GUILD = 3] = '冒險者公會';

// 場所
loc_name_table[LOC.UNKNOWN = 0] = '未知的場所';
loc_name_table[LOC.QUEST = 1] = '委託';
loc_name_table[LOC.TEAM = 2] = '隊伍編成';
loc_name_table[LOC.HERO_DETAIL = 3] = '角色詳細';

var AREA_TEMPLATE = {
	town_id: TOWN.UNKNOWN, 
	area_id: AREA.UNKNOWN, 
	background_image: IMAGE.ERROR, 
};

var AREA_OPTION_TEMPLATE = {
	town_id: TOWN.UNKNOWN, 
	area_id: AREA.UNKNOWN, 
	condition: ALWAYS_RETURN(false), // function condition (town_scene) {}
};

var LOC_OPTION_TEMPLATE = {
	town_id: TOWN.UNKNOWN, 
	loc_id: LOC.UNKNOWN, 
	condition: ALWAYS_RETURN(false), // function condition (town_scene) {}
	data: {}, 
};

var area_table = {};


// 阿斯嘉特
area_table[TOWN.ASGARD] = {};
{
	// 法理斯廣場
	area_table[TOWN.ASGARD][AREA.FALISU] = clone_hash(AREA_TEMPLATE, {
		town_id: TOWN.ASGARD, 
		area_id: AREA.FALISU, 
		background_image: IMAGE.BG_CASTLE, 
		options: [
			// 通往商業區
			clone_hash(AREA_OPTION_TEMPLATE, {
				town_id: TOWN.ASGARD, 
				area_id: AREA.BUSINESS, 
				condition: ALWAYS_RETURN(true), 
			}), 
			// 通往冒險者公會
			clone_hash(AREA_OPTION_TEMPLATE, {
				town_id: TOWN.ASGARD, 
				area_id: AREA.GUILD, 
				condition: ALWAYS_RETURN(true), 
			}), 
			// 測試戰鬥
			clone_hash(LOC_OPTION_TEMPLATE, {
				town_id: TOWN.ASGARD, 
				loc_id: LOC.QUEST, 
				name: '與大叔的親密接觸', 
				condition: ALWAYS_RETURN(true), 
				data: {
					stage_id: 1001, 
				}, 
			}), 
			// DEBUG: 隊伍編成
			clone_hash(LOC_OPTION_TEMPLATE, {
				town_id: TOWN.ASGARD, 
				loc_id: LOC.TEAM, 
				name: '隊伍編制', 
				condition: ALWAYS_RETURN(true), 
			}), 
			// DEBUG: 角色詳細
			clone_hash(LOC_OPTION_TEMPLATE, {
				town_id: TOWN.ASGARD, 
				loc_id: LOC.HERO_DETAIL, 
				name: '角色詳細', 
				condition: ALWAYS_RETURN(true), 
			}), 
		], 
	});
	// 商業區
	area_table[TOWN.ASGARD][AREA.BUSINESS] = clone_hash(AREA_TEMPLATE, {
		town_id: TOWN.ASGARD, 
		area_id: AREA.BUSINESS, 
		background_image: IMAGE.BG_CASTLE, 
		options: [
			// 通往法理斯廣場
			clone_hash(AREA_OPTION_TEMPLATE, {
				town_id: TOWN.ASGARD, 
				area_id: AREA.FALISU, 
				name: '回到廣場', 
				condition: ALWAYS_RETURN(true), 
			}), 
		], 
	});
	// 冒險者公會
	area_table[TOWN.ASGARD][AREA.GUILD] = clone_hash(AREA_TEMPLATE, {
		town_id: TOWN.ASGARD, 
		area_id: AREA.GUILD, 
		background_image: IMAGE.BG_CASTLE, 
		options: [
			// 隊伍編成
			clone_hash(LOC_OPTION_TEMPLATE, {
				town_id: TOWN.ASGARD, 
				loc_id: LOC.TEAM, 
				name: '隊伍編制', 
				condition: ALWAYS_RETURN(true), 
			}), 
			// 通往法理斯廣場
			clone_hash(AREA_OPTION_TEMPLATE, {
				town_id: TOWN.ASGARD, 
				area_id: AREA.FALISU, 
				name: '回到廣場', 
				condition: ALWAYS_RETURN(true), 
			}), 
		], 
	});
}
