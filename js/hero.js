
function Hero (data)
{
	var self = {};
	
	self.init = function ()
	{
		self.data = data;
		self.dom = $('<div class="hero"></div>');
		{
			// ---- self icon
			self.icon_div = $('<div class="icon"></div>');
			self.icon = image.get(self.data.icon);
			self.icon_div.append(self.icon);
			self.dom.append(self.icon_div);
			set_css(self.icon_div, {
				borderColor: MANA.COLOR_TABLE[self.data.type], 
			});
			
			// ---- rate/dmg msg
			self.rate_msg_div = $('<div class="rate_msg"></div>');
			self.dom.append(self.rate_msg_div);
			set_css(self.rate_msg_div, {
				color: MANA.COLOR_TABLE[self.data.type], 
			});
			self.rate_msg_display = 0;
			self.rate = 0;
		}
	}
	
	self.update = function (field)
	{
	}
	
	self.set_rate = function (rate)
	{
		self.rate = rate;
	}
	
	self.set_rate_msg = function (rate, suffix)
	{
		if (is_ndef(suffix))
		{
			suffix = '';
		}
		if (!rate)
		{
			self.rate_msg_div.fadeOut(UI.BATTLE_HERO_RATE_MSG_FADEOUT_TIME);
			self.rate_msg_display = 0;
		}
		else
		{
			var now = self.rate_msg_display;
			var width = self.dom.width();
			set_css(self.rate_msg_div, {
				fontSize: '25px', 
			});
			self.rate_msg_div.stop(false, false).show().animate({
				fontSize: '18px', 
			}, {
				duration: UI.BATTLE_HERO_RATE_MSG_ANIMATE_TIME, 
				step: function (num, tween)
				{
					self.rate_msg_display = floor(now + (rate-now)*tween.pos);
					self.rate_msg_div.text(self.rate_msg_display+suffix);
					var left = (width-self.rate_msg_div.width())/2;
					set_css(self.rate_msg_div, {
						left: left, 
					});
				}, 
			});
		}
	}
	
	self.get_damage = function (field)
	{
		var res = self.data.atk * self.rate / 100;
		res *= (100 + field.combo_result.combo*game.COMBO_RATE) / 100;
		var ret = {
			value: floor(res), 
			type: self.data.type, 
		};
		return ret;
	}
	
	self.check_type = function (type)
	{
		return type == self.data.type;
	}
	
	self.init();
	
	return self;
}
