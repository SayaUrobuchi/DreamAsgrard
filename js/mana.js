
function Mana(mana_type)
{
	var self = {};
	
	self.type = mana_type;
	self.dom = $('<div class="mana"></div>');
	
	self.reset = function (type)
	{
		self.mark_release = false;
		self.mark_delete = false;
		self.type = type;
		self.dom.text(MANA.NAME(self.type));
		set_css(self.dom, {
			color: MANA.COLOR_TABLE[self.type], 
		});
	}
	
	self.is_empty = function ()
	{
		return self.mark_release || self.mark_delete || self.type == MANA.NONE;
	}
	
	self.reset(mana_type);
	
	return self;
}