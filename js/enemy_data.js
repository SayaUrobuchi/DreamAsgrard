
var ENEMY_TEMPLATE = {
	id: 0, 
	full_image: IMAGE.ERROR, 
};

var enemy_table = {
	1001: clone_hash(ENEMY_TEMPLATE, {
		id: 1001, 
		name: '好人．大☆薯', 
		type: MANA.DARK, 
		full_image: IMAGE.W_WUMINSI, 
		width: 100, 
		bottom: 0, 
		level: 50, 
		hp: 2160000, 
		def: 4486, 
		atk: 12256, 
		cd: 18000, 
	}), 
	1002: clone_hash(ENEMY_TEMPLATE, {
		id: 1002, 
		name: '大☆叔', 
		type: MANA.LIGHT, 
		full_image: IMAGE.W_WUMINSI2, 
		width: 100, 
		bottom: 0, 
		level: 50, 
		hp: 1048576, 
		def: 4486, 
		atk: 7256, 
		cd: 18000, 
	}), 
};

var ENEMY = {};

ENEMY.TEST = 1002;
ENEMY.TEST_GOODMAN = 1001;

enemy_table[ENEMY.HIYOKO0_LV0 = 1] = clone_hash(ENEMY_TEMPLATE, {
	id: ENEMY.HIYOKO0_LV0, 
	name: '雞雛', 
	type: MANA.LIGHT, 
	full_image: IMAGE.E_HIYOKO, 
	width: 240, 
	bottom: 0, 
	level: 0, 
	hp: 1111122, 
	def: 10, 
	atk: 8, 
	cd: 1400, 
});

enemy_table[ENEMY.BAT0_LV0 = 2] = clone_hash(ENEMY_TEMPLATE, {
	id: ENEMY.BAT0_LV0, 
	name: '小蝙蝠', 
	type: MANA.DARK, 
	full_image: IMAGE.E_BAT, 
	width: 240, 
	bottom: 0, 
	level: 0, 
	hp: 91, 
	def: 0, 
	atk: 16, 
	cd: 8000, 
});

enemy_table[ENEMY.WOLF0_LV0 = 3] = clone_hash(ENEMY_TEMPLATE, {
	id: ENEMY.WOLF0_LV0, 
	name: '幼狼', 
	type: MANA.WATER, 
	full_image: IMAGE.E_WOLF, 
	width: 240, 
	bottom: 0, 
	level: 0, 
	hp: 256, 
	def: 12, 
	atk: 24, 
	cd: 10000, 
});
