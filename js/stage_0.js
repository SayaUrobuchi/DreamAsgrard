
var PUZZLE_TEMPLATE = {
	id: 0, 
	name: '未命名的關卡', 
	round: [], 
	round_count: 0, 
};

var ENEMY_ROUND_TEMPLATE = {
	enemy: [ENEMY.TEST], 
};

var MANA_WEIGHT_TABLE_TEMPLATE = {
	0: 0, 
	1: 0, 
	2: 0, 
	3: 0, 
	4: 0, 
	5: 0, 
	6: 0, 
	7: 0, 
	8: 0, 
	9: 0, 
};

var DEFAULT_MANA_WEIGHT_TABLE = clone_hash(MANA_WEIGHT_TABLE_TEMPLATE, {
	1: 100, 
	2: 100, 
	3: 100, 
	4: 100, 
	5: 100, 
	6: 100, 
});
