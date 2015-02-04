
var puzzle_stage_table = {
	1001: clone_hash(PUZZLE_TEMPLATE, {
		id: 1001, 
		name: '與大叔的親密接觸', 
		desc: '其實就只是四處晃晃，看會不會轉角撞到咬著土司的幼女…\n'+
				'不會有的吧，我想。', 
		round: [
			clone_hash(ENEMY_ROUND_TEMPLATE, {
				enemy: [
					ENEMY.TEST, 
				], 
			}), 
			clone_hash(ENEMY_ROUND_TEMPLATE, {
				enemy: [
					ENEMY.TEST_GOODMAN, 
				], 
			}), 
		], 
		round_count: 2, 
	}), 
};

var STAGE = {};

puzzle_stage_table[STAGE.BEFORE_ENTER_ASGARD = 1] = clone_hash(PUZZLE_TEMPLATE, {
	id: STAGE.BEFORE_ENTER_ASGARD, 
	name: '前往阿斯嘉特之路', 
	desc: '阿斯嘉特逐夢行。城郊…不大和平呢。', 
	round: [
		clone_hash(ENEMY_ROUND_TEMPLATE, {
			enemy: [
				ENEMY.HIYOKO0_LV0, 
				ENEMY.HIYOKO0_LV0, 
				ENEMY.HIYOKO0_LV0, 
			], 
		}), 
		clone_hash(ENEMY_ROUND_TEMPLATE, {
			enemy: [
				ENEMY.BAT0_LV0, 
			], 
		}), 
		clone_hash(ENEMY_ROUND_TEMPLATE, {
			enemy: [
				ENEMY.WOLF0_LV0, 
			], 
		}), 
	], 
	round_count: 3, 
	before_story: STORY.BEFORE_ENTER_ASGARD_0, 
	win_story: STORY.BEFORE_ENTER_ASGARD_1, 
});
