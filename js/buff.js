
var BUFF_LVL = {
	NONE: 0, 
	NORMAL: 1, 
	ABSOLUTE: 1024, 
};

var ACTION = {
	NONE: 0, 
	BATTLER_ABILITY: 1, 
	SKILL_CAST: 2, 
};

var ACTION_BATTLER = {
	MAIN: 0, 
	SUB: 1, 
};

function BuffList ()
{
	var self = {};
	
	self.list = {};
	
	self.init = function ()
	{
		for (var key in BUFF_LVL)
		{
			self.list[BUFF_LVL[key]] = [];
		}
	}
	
	self.add = function (buff)
	{
		self.list[buff.level].push(buff);
	}
	
	self.apply = function (action)
	{
		for (var key in self.list)
		{
			var list = self.list[key];
			for (var i=0; i<list.length; i++)
			{
				var buff = list[i];
				buff.apply(action);
			}
		}
		return action;
	}
	
	self.init();
	
	return self;
}

function Buff (skill)
{
	var self = {};
	
	self.level = BUFF_LVL.NONE;
	self.skill = skill;
	self.owner = self.skill.owner;
	
	self.init = function ()
	{
	}
	
	self.apply = function (action)
	{
		for (var i=0; i<action.battler.length; i++)
		{
			self.apply_to(action, action.battler[i]);
		}
		return action;
	}
	
	self.apply_to = function (action, chara)
	{
		for (var i=0; i<self.skill.data.effect.length; i++)
		{
			var effect = self.skill.data.effect[i];
			// TODO: multi cond not implemented
			var cond = effect.cond[0];
			var apply = false;
			var ext = 0;
			var mul = 100;
			switch (cond.type)
			{
			case SK_COND.NONE:
				break;
			case SK_COND.ALWAYS:
				apply = true;
				break;
			case SK_COND.COMBO:
				if (action.type == ACTION.SKILL_CAST)
				{
					var c = action.combo_result.combo;
					if (c >= cond.value)
					{
						apply = true;
						if (is_def(cond.limit) && c > cond.limit)
						{
							c = cond.limit;
						}
						ext = (c-cond.value) * cond.incr;
					}
				}
				break;
			}
			if (apply)
			{
				var take_effect = false;
				var battle_loc = effect.battle_loc;
				var owner = self.skill.owner;
				switch (battle_loc)
				{
				case SK_TARGET.HERO:
					take_effect = (chara.battler.battle_loc == BATTLE_LOC.HERO);
					break;
				case SK_TARGET.ENEMY:
					take_effect = (chara.battler.battle_loc == BATTLE_LOC.ENEMY);
					break;
				case SK_TARGET.TEAMMATE:
					take_effect = (chara.battler.battle_loc == owner.battle_loc);
					break;
				case SK_TARGET.OPPONENT:
					take_effect = (chara.battler.battle_loc != owner.battle_loc);
					break;
				case SK_TARGET.SELF:
					take_effect = (chara.battler.battle_loc == owner.battle_loc && 
						chara.battler.battle_loc_id == owner.battle_loc_id);
					break;
				}
				if (take_effect)
				{
					var affected = true;
					var target = effect.target;
					if (target)
					{
						// TODO: not implemented
					}
					if (affected)
					{
						for (var j=0; j<effect.effect.length; j++)
						{
							var e = effect.effect[j];
							var ev = floor((e.value+ext)*mul/100)
							switch (e.type)
							{
							case SK_EFFECT.HP_MUL:
								chara.hp.mul.push(ev);
								break;
							case SK_EFFECT.ATK_MUL:
								chara.atk.mul.push(ev);
								break;
							case SK_EFFECT.HEAL_MUL:
								chara.heal.mul.push(ev);
								break;
							case SK_EFFECT.HP_RATE:
								chara.hp.rate += ev;
								break;
							case SK_EFFECT.ATK_RATE:
								chara.atk.rate += ev;
								break;
							case SK_EFFECT.HEAL_RATE:
								chara.heal.rate += ev;
								break;
							}
						}
					}
				}
			}
		}
	}
	
	self.init();
	
	return self;
}

// IMPORTANT: DO NOT PUT [] IN TEMPLATE
var ACTION_ABILITY_TEMPLATE = {
	rate: 100, 
	add: 0, 
	base: 0, 
};

function Action ()
{
	var self = {};
	
	self.init = function ()
	{
		self.type = ACTION.NONE;
		self.battler = [];
		self.combo_rate = game.COMBO_RATE;
		self.extra_rate = game.COLOR_RELEASE_RATE;
	}
	
	self.set_type = function (type)
	{
		self.type = type;
	}
	
	self.gen_chara = function (battler)
	{
		var c = {};
		
		c.hp = clone_hash(ACTION_ABILITY_TEMPLATE);
		c.hp.mul = [];
		c.atk = clone_hash(ACTION_ABILITY_TEMPLATE);
		c.atk.mul = [];
		c.heal = clone_hash(ACTION_ABILITY_TEMPLATE);
		c.heal.mul = [];
	
		c.hp.base = battler.get_hp();
		c.atk.base = battler.get_atk();
		c.heal.base = battler.get_heal();
		
		c.battler = battler;
		
		return c;
	}
	
	self.set_battler = function (loc, battler)
	{
		self.battler[loc] = self.gen_chara(battler);
	}
	
	self.set_main = function (battler)
	{
		self.set_battler(ACTION_BATTLER.MAIN, battler);
	}
	
	self.set_sub = function (battler)
	{
		self.set_battler(ACTION_BATTLER.SUB, battler);
	}
	
	self.calc_final_ability = function (ability)
	{
		var res = (ability.base + ability.add);
		console.log(ability);
		for (var i=0; i<ability.mul.length; i++)
		{
			res *= ability.mul[i] / 100;
		}
		res = floor(res * ability.rate / 100);
		return res;
	}
	
	self.get_final_hp = function (loc)
	{
		if (!loc)
		{
			loc = ACTION_BATTLER.MAIN;
		}
		return self.calc_final_ability(self.battler[loc].hp);
	}
	
	self.get_final_atk = function (loc)
	{
		if (!loc)
		{
			loc = ACTION_BATTLER.MAIN;
		}
		return self.calc_final_ability(self.battler[loc].atk);
	}
	
	self.get_final_heal = function (loc)
	{
		if (!loc)
		{
			loc = ACTION_BATTLER.MAIN;
		}
		return self.calc_final_ability(self.battler[loc].heal);
	}
	
	self.init();
	
	return self;
}
