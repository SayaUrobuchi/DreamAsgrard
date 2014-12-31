
function Stage (data)
{
	var self = Object();
	
	self.data = data;
	
	self.init = function ()
	{
		self.round = data.round;
		self.round_count = data.round_count;
	}
	
	self.get_display_name = function ()
	{
		return self.data.name;
	}
	
	self.get_display_desc = function ()
	{
		return self.data.desc;
	}
	
	self.get_display_start_button_text = function ()
	{
		if (is_def(self.data.start_button_text))
		{
			return self.data.start_button_text;
		}
		return UI.TOWN_QUEST_START_BUTTON_TEST;
	}
	
	self.get_before_story = function ()
	{
		return self.data.before_story;
	}
	
	self.get_win_story = function ()
	{
		return self.data.win_story;
	}
	
	self.get_lose_story = function ()
	{
		return self.data.lose_story;
	}
	
	self.get_mana_weight_table = function ()
	{
		if (self.data.mana_weight_table)
		{
			return clone_hash(self.data.mana_weight_table);
		}
		return clone_hash(DEFAULT_MANA_WEIGHT_TABLE);
	}
	
	self.init();
	
	return self;
}