
var ENEMY_TEMPLATE = {
	id: 0, 
};

var enemy_table = {
	1: clone_hash(ENEMY_TEMPLATE, {
		id: 1, 
		name: '好人．大☆薯', 
		type: MANA.DARK, 
		full_image: IMAGE.MONSTER1, 
		width: 100, 
		bottom: 0, 
		level: 50, 
		hp: 2160000, 
		def: 4486, 
		atk: 12256, 
		cd: 18000, 
	}), 
	1000: clone_hash(ENEMY_TEMPLATE, {
		id: 1000, 
		name: '大☆叔', 
		type: MANA.LIGHT, 
		full_image: IMAGE.MONSTER0, 
		width: 100, 
		bottom: 0, 
		level: 50, 
		hp: 1048576, 
		def: 4486, 
		atk: 7256, 
		cd: 18000, 
	}), 
};

var ENEMY_TEST = enemy_table[1000];
var ENEMY_GOODMAN = enemy_table[1];
