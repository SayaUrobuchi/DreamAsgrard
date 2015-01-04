
var SK_COND = {
	NONE: 0, 
	ALWAYS: 1, 
	COMBO: 2, 
};

var SK_TYPE = {
	PASSIVE: 0, // 被動發動的特性
	ATTACK: 1, // 轉珠自動發動技能
	ULTIMATE: 2, // 主動發動的消耗型技能
	LEADER: 3, // 隊伍位置為隊長或輔佐時自動生效
};

var SK_EFFECT = {
	NONE: 0, 
	HP_MUL: 1, 
	ATK_MUL: 2, 
	HEAL_MUL: 3, 
};

var SK_TARGET = {
	NONE: 0, 
	SELF: 1, 
	TEAMMATE: 2, 
	ENEMY: 3, 
	LEADER: 4, 
	SUPPORT: 5, 
	SOLDIER: 6, 
	ALL: 32, 
};

var SK_RANGE = {
	NONE: 0, 
	SINGLE: 1, 
	DOUBLE: 2, 
	TRIPLE: 3, 
	QUADRA: 4, 
	ALL: 32, 
};

var SK_REQUIRE = {
	NONE: 0, 
	MANA: 1, 
};

var SK_UNLOCK = {
	NONE: 0, 
	ALWAYS: 1, 
};

var SK_COST = {
	NONE: 0, 
	MANA: 1, 
};

var SK_ATTACK = {
	NONE: 0, 
	FIRE: MANA.FIRE, 
	WATER: MANA.WATER, 
	WOOD: MANA.WOOD, 
	LIGHT: MANA.LIGHT, 
	DARK: MANA.DARK, 
	HEART: MANA.HEART, 
};

var SK_DAMAGE = {
	NONE: 0, 
	NORMAL: 1, 
	PURE: 8, 
	ABS: 9, 
};

var SK_RACE = {
	NONE: 0, 
	FEMALE: 1, 
	MALE: 2, 
	HUMAN: 16, 
};

var SKILL_DUMMY;

function Skill (id)
{
	var self = {};
	
	self.init = function ()
	{
		self.data = skill_table[id];
	}
	
	self.get_attack_type = function ()
	{
		if (is_def(self.attack_type))
		{
			return self.attack_type;
		}
		for (var i=0; i<self.data.effect.length; i++)
		{
			var e = self.data.effect[i];
			if (e.dmg_type)
			{
				return self.attack_type = e.dmg_type;
			}
		}
		return self.attack_type = SK_ATTACK.NONE;
	}
	
	self.get_rate_base = function ()
	{
		if (is_def(self.rate_base))
		{
			return self.rate_base;
		}
		for (var i=0; i<self.data.effect.length; i++)
		{
			var e = self.data.effect[i];
			if (e.dmg_type)
			{
				return self.rate_base = e.value;
			}
		}
		return self.rate_base = 0;
	}
	
	self.get_attack_around_power = function (field)
	{
		var t = 9999;
		var overload = 0;
		for (var i=0; i<self.data.require.length; i++)
		{
			var req = self.data.require[i];
			var hit = 0;
			if (req.type == SK_REQUIRE.MANA)
			{
				var cnt = 0;
				for (var j=0; j<field.combo; j++)
				{
					var r = field.combo_result.release_table[j];
					if (r.type == req.mana_type && r.count >= req.base)
					{
						cnt++;
						overload += r.count-req.base;
					}
				}
				hit = floor(cnt / req.combo);
			}
			if (hit < t)
			{
				t = hit;
			}
		}
		var ret = self.get_rate_base() * t * self.owner.get_atk() / 100;
		ret = floor(ret * (100 + game.COLOR_RELEASE_RATE*(overload)) / 100);
		return ret;
	}
	
	self.add_buff = function (buff_list)
	{
		buff_list.add(Buff(self));
	}
	
	self.init();
	
	return self;
}
