
var puzzle_stage_table = {
	1: clone_hash(PUZZLE_TEMPLATE, {
		id: 1, 
		name: '與大叔的親密接觸', 
		desc: '其實就只是四處晃晃，看會不會轉角撞到咬著土司的幼女…\n'+
				'不會有的吧，我想。', 
		round: [
		clone_hash(ENEMY_ROUND_TEMPLATE, {
			enemy: [
				ENEMY_TEST, 
			], 
		}), 
		clone_hash(ENEMY_ROUND_TEMPLATE, {
			enemy: [
				ENEMY_GOODMAN, 
			], 
		}), 
		], 
	}), 
};