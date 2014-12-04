
var HERO_TEMPLATE = {
	id: 0, 
	type: MANA.DARK, 
	name: "不願具名的英雄", 
	icon: IMAGE.ANSYA, 
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

var hero_table = {
	0: clone_hash(HERO_TEMPLATE, {
		id: 0, 
	}), 
	1001: clone_hash(HERO_TEMPLATE, {
		id: 1001, 
		type: MANA.DARK, 
		name: "安夏", 
		icon: IMAGE.W_ANSYA, 
		hp: 17763, 
		atk: 6325, 
		heal: 471, 
	}), 
	1002: clone_hash(HERO_TEMPLATE, {
		id: 1002, 
		type: MANA.LIGHT, 
		name: "恩尼斯", 
		icon: IMAGE.W_ENNISU, 
		hp: 8581, 
		atk: 6142, 
		heal: 885, 
	}), 
	1003: clone_hash(HERO_TEMPLATE, {
		id: 1003, 
		type: MANA.FIRE, 
		name: "古藤", 
		icon: IMAGE.W_FURUBUJI, 
		hp: 10112, 
		atk: 7777, 
		heal: 777, 
	}), 
	1004: clone_hash(HERO_TEMPLATE, {
		id: 1004, 
		type: MANA.WATER, 
		name: "妲伊", 
		icon: IMAGE.W_DAI, 
		hp: 3531, 
		atk: 16235, 
		heal: 353, 
	}), 
	1005: clone_hash(HERO_TEMPLATE, {
		id: 1005, 
		type: MANA.WOOD, 
		name: "曙葉", 
		icon: IMAGE.W_SYUE, 
		hp: 10143, 
		atk: 5566, 
		heal: 1247, 
	}), 
	1006: clone_hash(HERO_TEMPLATE, {
		id: 1006, 
		type: MANA.DARK, 
		name: "小夕", 
		icon: IMAGE.W_SICHAN, 
		hp: 19126, 
		atk: 9144, 
		heal: 8, 
	}), 
};

var HERO = {
	NONE: 0, 
};

// 妲伊初始
hero_table[HERO.DAI_0 = 1] = clone_hash({
	id: HERO.DAI_0, 
	type: MANA.LIGHT, 
	name: "妲伊", 
	icon: IMAGE.W_DAI, 
	hp: 241, 
	atk: 44, 
	heal: 19, 
});
// 妲伊三階
hero_table[HERO.DAI_2 = 3] = clone_hash({
	id: HERO.DAI_2, 
	type: MANA.LIGHT, 
	name: "妲伊", 
	icon: IMAGE.W_DAI, 
	hp: 3531, 
	atk: 16235, 
	heal: 353, 
});
