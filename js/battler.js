
var BATTLE_LOC = {
	HERO: 0, 
	ENEMY: 1, 
	NATURE: 2, 
};

function Battler ()
{
	var self = {};
	
	self.battle_loc = BATTLE_LOC.NATURE;
	self.battle_loc_id = 0;
	
	self.set_battle_loc = function (loc, id)
	{
		self.battle_loc = loc;
		self.battle_loc_id = id;
	}
	
	self.get_base_ability = function ()
	{
		var action = Action();
		action.set_main(self);
		return action;
	}
	
	return self;
}
