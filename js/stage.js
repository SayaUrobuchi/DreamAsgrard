
function Stage (data)
{
	var self = Object();
	
	self.data = data;
	
	self.init = function ()
	{
		self.round = data.round;
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
	
	self.init();
	
	return self;
}