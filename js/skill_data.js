
var skill_table = {
};

var SKILL = {
};

var SKILL_TEMPLATE = {
	id: 0, 
	effect: [], 
};

var L_SKILL_TEMPLATE = clone_hash(SKILL_TEMPLATE, {
	name: '未知的領袖技', 
	type: SK_TYPE.LEADER, 
});

var U_SKILL_TEMPLATE = clone_hash(SKILL_TEMPLATE, {
	name: '未知的奧義', 
	type: SK_TYPE.ULTIMATE, 
	require: [], 
	cost: [], 
});

var A_SKILL_TEMPLATE = clone_hash(SKILL_TEMPLATE, {
	name: '未知的絕招', 
	type: SK_TYPE.ATTACK, 
	require: [], 
});

var P_SKILL_TEMPLATE = clone_hash(SKILL_TEMPLATE, {
	name: '未知的特性', 
	type: SK_TYPE.PASSIVE, 
});

var SKE_ATTACK_BASE_TEMPLATE = {
	type: SK_EFFECT.ATK_MUL, 
	dmg_type: SK_DAMAGE.NORMAL, 
};

var SKE_ATTACK_TEMPLATE = {
	FIRE: clone_hash(SKE_ATTACK_BASE_TEMPLATE, {
		atk_type: SK_ATTACK.FIRE, 
	}), 
	WATER: clone_hash(SKE_ATTACK_BASE_TEMPLATE, {
		atk_type: SK_ATTACK.WATER, 
	}), 
	WOOD: clone_hash(SKE_ATTACK_BASE_TEMPLATE, {
		atk_type: SK_ATTACK.WOOD, 
	}), 
	LIGHT: clone_hash(SKE_ATTACK_BASE_TEMPLATE, {
		atk_type: SK_ATTACK.LIGHT, 
	}), 
	DARK: clone_hash(SKE_ATTACK_BASE_TEMPLATE, {
		atk_type: SK_ATTACK.DARK, 
	}), 
};

skill_table[SKILL.DUMMY = 0] = clone_hash(SKILL_TEMPLATE, {
	effect: [], 
	require: [], 
	cost: [], 
});

SKILL_DUMMY = Skill(SKILL.DUMMY);

// #LS 領袖技
skill_table[SKILL.L_SINSAN = 2] = clone_hash(L_SKILL_TEMPLATE, {
	id: SKILL.L_SINSAN, 
	name: '迅閃連擊', 
	desc: '迅速、連環又不失精確的打擊。三連鎖以上時，全隊攻擊威力變為200%。', 
	effect: [
		{
			cond: [
				{
					type: SK_COND.COMBO, 
					value: 3, 
					incr: 0, 
					limit: 3, 
				}, 
			], 
			effect: [
				{
					type: SK_EFFECT.ATK_MUL, 
					value: 200, 
				},
			], 
			battle_loc: SK_TARGET.TEAMMATE, 
		}, 
	], 
});
skill_table[SKILL.L_KINNIKU = 3] = clone_hash(L_SKILL_TEMPLATE, {
	id: SKILL.L_KINNIKU, 
	name: '筋肉YAYA', 
	desc: '筋肉就是一切！筋肉旋風！筋肉最高──！HP提升200%！', 
	effect: [
		{
			cond: [
				{
					type: SK_COND.ALWAYS, 
				}, 
			], 
			effect: [
				{
					type: SK_EFFECT.HP_MUL, 
					value: 200, 
				},
			], 
			battle_loc: SK_TARGET.TEAMMATE, 
		}, 
	], 
});

// #US 必殺技
skill_table[SKILL.U_REIBU = 1026] = clone_hash(U_SKILL_TEMPLATE, {
	id: SKILL.U_REIBU, 
	name: '雷旋舞', 
	desc: '快如閃電、卻不失優雅的單對多魔武技。消耗50光魔力，造成全體3000%光傷害。', 
	effect: [
		{
			cond: [
			], 
			effect: [
				clone_hash(SKE_ATTACK_TEMPLATE.LIGHT, {
					value: 3000, 
				}),
			], 
			target: [
				{
					type: SK_TARGET.ENEMY, 
					range: SK_RANGE.ALL, 
				}, 
			], 
		}, 
	], 
	require: [
		{
			type: SK_REQUIRE.MANA, 
			mana_type: MANA.LIGHT, 
			value: 50, 
		}, 
	], 
	cost: [
		{
			type: SK_COST.MANA, 
			mana_type: MANA.LIGHT, 
			value: 50, 
		}, 
	], 
});

// #AS 一般技
skill_table[SKILL.A_REIIN = 2049] = clone_hash(A_SKILL_TEMPLATE, {
	id: SKILL.A_REIIN, 
	name: '雷瑩槍閃', 
	desc: '舞動灌注雷閃之力的長槍，毫不留情地連攻目標死角。消除三顆光時發動，造成100%光傷害。', 
	require: [
		{
			type: SK_REQUIRE.MANA, 
			mana_type: MANA.LIGHT, 
			combo: 1, 
			base: 3, 
		}, 
	], 
	effect: [
		clone_hash(SKE_ATTACK_TEMPLATE.LIGHT, {
			value: 100, 
		}),
	], 
});
skill_table[SKILL.A_REISYAN = 2050] = clone_hash(A_SKILL_TEMPLATE, {
	id: SKILL.A_REISYAN, 
	name: '雷翔迅刃', 
	desc: '將雷閃之力透過長槍，揮出優雅的廣範圍雷斬。消除四顆光時發動，造成敵全體80%光傷害。', 
	require: [
		{
			type: SK_REQUIRE.MANA, 
			mana_type: MANA.LIGHT, 
			combo: 1, 
			base: 4, 
		}, 
	], 
	effect: [
		clone_hash(SKE_ATTACK_TEMPLATE.LIGHT, {
			value: 80, 
		}),
	], 
});
skill_table[SKILL.A_TENREI = 2051] = clone_hash(A_SKILL_TEMPLATE, {
	id: SKILL.A_TENREI, 
	name: '天雷華舞', 
	desc: '以雷閃之力激發體能，舞出迅捷華麗、又不失優雅與力道的重擊。消除兩串三顆光時發動，造成180%光傷害。', 
	require: [
		{
			type: SK_REQUIRE.MANA, 
			mana_type: MANA.LIGHT, 
			combo: 2, 
			base: 3, 
		}, 
	], 
	effect: [
		clone_hash(SKE_ATTACK_TEMPLATE.LIGHT, {
			value: 180, 
		}),
	], 
});

// #PS 被動技
skill_table[SKILL.P_WOMAN = 8192] = clone_hash(P_SKILL_TEMPLATE, {
	id: SKILL.P_WOMAN, 
	name: '人類．女', 
	desc: '人類女性。將受到以人類或女性為目標之技能所影響。', 
	effect: [
		{
			cond: [
				{
					type: SK_COND.ALWAYS, 
				}, 
			], 
			effect: [
				{
					type: SK_EFFECT.RACE_APPEND, 
					value: [SK_RACE.HUMAN, SK_RACE.FEMALE, ], 
				},
			], 
			battle_loc: SK_TARGET.TEAMMATE, 
		}, 
	], 
});
skill_table[SKILL.P_TANKY = 8193] = clone_hash(P_SKILL_TEMPLATE, {
	id: SKILL.P_TANKY, 
	name: '筋肉之美', 
	desc: '由於筋肉的關係，耐力非同尋常！', 
	effect: [
		{
			cond: [
				{
					type: SK_COND.ALWAYS, 
				}, 
			], 
			effect: [
				{
					type: SK_EFFECT.HP_MUL, 
					value: 50, 
				},
			], 
			battle_loc: SK_TARGET.TEAMMATE, 
		}, 
	], 
});
