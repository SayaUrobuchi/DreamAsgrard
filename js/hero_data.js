
var HERO_TEMPLATE = {
	id: 0, 
	type: MANA.DARK, 
	name: "不願具名的英雄", 
	icon: IMAGE.HEROT0, 
	hp: 1, 
	atk: 1, 
	heal: 0, 
};

/* 資訊：
id: 1
title: 赤黑之月
姓名: 紗夜
屬性: 闇
icon: xxx_h
image: xxx_w
start/final_hp: 1351/2148
start/final_atk: 976/1525
start/final_heal: 97/167
exp_rate: 32 (/10)
skill: [闇影箭, 闇影矛, 赤痕血爪, 闇影魔砲]
lead_skill: 闇夜之主
sp_skill: [暗抗性, 暗親和, 世界的TK者]
effort_hp/atk/heal: 500/400/300
desc/story/related_dict_item
*/
/* 儲存訊息
id
level
exp
skill_wakeup/sp_skill_wakeup
effort
*/

var NO_HERO = clone_hash(HERO_TEMPLATE, {
	id: 0, 
});

var hero_table = {
	1001: clone_hash(HERO_TEMPLATE, {
		id: 1, 
		type: MANA.DARK, 
		name: "安夏", 
		icon: IMAGE.HEROT0, 
		hp: 17763, 
		atk: 6325, 
		heal: 471, 
	}), 
	1002: clone_hash(HERO_TEMPLATE, {
		id: 2, 
		type: MANA.LIGHT, 
		name: "恩尼斯", 
		icon: IMAGE.HEROT1, 
		hp: 8581, 
		atk: 6142, 
		heal: 885, 
	}), 
	1003: clone_hash(HERO_TEMPLATE, {
		id: 3, 
		type: MANA.FIRE, 
		name: "古藤", 
		icon: IMAGE.HEROT2, 
		hp: 10112, 
		atk: 7777, 
		heal: 777, 
	}), 
	1004: clone_hash(HERO_TEMPLATE, {
		id: 4, 
		type: MANA.WATER, 
		name: "妲伊", 
		icon: IMAGE.HEROT3, 
		hp: 3531, 
		atk: 16235, 
		heal: 353, 
	}), 
	1005: clone_hash(HERO_TEMPLATE, {
		id: 5, 
		type: MANA.WOOD, 
		name: "曙葉", 
		icon: IMAGE.HEROT4, 
		hp: 10143, 
		atk: 5566, 
		heal: 1247, 
	}), 
	1006: clone_hash(HERO_TEMPLATE, {
		id: 6, 
		type: MANA.DARK, 
		name: "小夕", 
		icon: IMAGE.HEROT5, 
		hp: 19126, 
		atk: 9144, 
		heal: 8, 
	}), 
};

// 妲伊初始
var HERO_DAI_0 = 1;
hero_table[HERO_DAI_0] = clone_hash({
	id: 1, 
	type: MANA.LIGHT, 
	name: "妲伊", 
	icon: IMAGE.HEROT3, 
	hp: 3531, 
	atk: 16235, 
	heal: 353, 
});
