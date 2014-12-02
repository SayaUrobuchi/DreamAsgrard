
var ENEMY_TEMPLATE = {
	id: 0, 
};

var enemy_table = {
	1001: clone_hash(ENEMY_TEMPLATE, {
		id: 1001, 
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
	1002: clone_hash(ENEMY_TEMPLATE, {
		id: 1002, 
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

var ENEMY = {};

ENEMY.TEST = 1002;
ENEMY.TEST_GOODMAN = 1001;


