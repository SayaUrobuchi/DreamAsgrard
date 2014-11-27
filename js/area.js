
function Area(data)
{
	var self = Object();
	
	self.init = function ()
	{
		self.data = data;
	}
	
	self.get_town_display_name = function ()
	{
		return town_name_table[self.data.town_id];
	}
	
	self.get_area_display_name = function ()
	{
		return '～'+area_name_table[self.data.area_id]+'～';
	}
	
	self.get_background_display_image = function ()
	{
		return image.get(self.data.background_image);
	}
	
	self.get_options = function ()
	{
		return self.data.options;
	}
	
	// 區塊: 城鎮、區塊、背景、通往何處(以及地名? 可指定/繼承?)
	
	self.init();
	
	return self;
}
