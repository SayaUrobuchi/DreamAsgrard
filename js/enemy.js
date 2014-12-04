
function Enemy (data)
{
	var self = {};
	
	var CD_DISPLAY_RATE = 100;
	var CD_SAFE_LINE = 5000;
	var CD_DANGER_LINE = 2000;
	
	self.init = function ()
	{
		self.data = data;
		self.dom = $('<div class="enemy"></div>');
		{
			self.cd_num_div = $('<div class="cd_num"></div>');
			self.dom.append(self.cd_num_div);
			
			self.cd_bar_pivot = $('<div class="cd_bar_pivot"></div>');
			{
				self.cd_bar_container = $('<div class="cd_bar_container"></div>');
				{
					self.cd_bar_div = $('<div class="cd_bar"></div>');
					self.cd_bar_container.append(self.cd_bar_div);
				}
				self.cd_bar_pivot.append(self.cd_bar_container);
			}
			self.dom.append(self.cd_bar_pivot);
			
			self.full_image_div = $('<div class="full_image"></div>');
			self.full_image = image.get(self.data.full_image);
			self.full_image_div.append(self.full_image);
			set_css(self.full_image_div, {
				width: self.data.width+'px', 
			});
			self.dom.append(self.full_image_div);
			
			self.hp_pivot = $('<div class="hp pivot"></div>');
			{
				self.hp_container = $('<div class="container"></div>');
				{
					self.hp_bar_back_div = $('<div class="hp_bar_back"></div>');
					self.hp_container.append(self.hp_bar_back_div);
					
					self.hp_bar_div = $('<div class="hp_bar"></div>');
					self.hp_container.append(self.hp_bar_div);
				}
				self.hp_pivot.append(self.hp_container);
			}
			self.dom.append(self.hp_pivot);
			self.hp_display = 0;
			self.hp_max = self.data.hp;
			self.hp = self.hp_max;
			self.set_hp(self.hp);
			set_css(self.hp_pivot, {
				bottom: -20+'px', 
				width: self.data.width+'px', 
			});
		}
		set_css(self.dom, {
			width: self.data.width+'px', 
			height: '100%', 
		});
		
		self.alpha = 1.0;
		self.disappear_speed = 0.05;
		self.is_disappear = false;
		
		self.is_hp_bar_animating = false;
	}
	
	self.width = function ()
	{
		if (!self.__width)
		{
			self.__width = self.full_image_div.width();
		}
		return self.__width;
	}
	
	self.height = function ()
	{
		if (!self.__height)
		{
			self.__height = self.full_image_div.height();
		}
		return self.__height;
	}
	
	self.def = function ()
	{
		return self.data.def;
	}
	
	self.update = function (field)
	{
		if (self.is_dead())
		{
			self.update_disappear(field);
			if (self.is_disappear)
			{
				self.dom.remove();
			}
			return;
		}
		if (!self.next_action)
		{
			self.decide_next_action();
		}
		else
		{
			if (!self.attacking)
			{
				self.cd -= game.UPDATE_INTERVAL;
				if (self.cd <= 0)
				{
					self.cd = 0;
					field.enemy_attack_event.push(self);
					self.attacking = true;
				}
				self.refresh_cd_num();
			}
		}
	}
	
	self.update_attack = function (field)
	{
		if (self.attacking)
		{
			if (!self.attack_anime)
			{
				self.decide_attack_anime(field);
			}
		}
		return self.attacking;
	}
	
	self.update_disappear = function (field)
	{
		if (self.is_hp_bar_animating)
		{
			return ;
		}
		self.alpha -= self.disappear_speed;
		if (self.alpha < 0)
		{
			self.alpha = 0;
		}
		self.dom.css('opacity', self.alpha);
		self.is_disappear = (self.alpha <= 0);
	}
	
	self.decide_next_action = function ()
	{
		// TODO: call AI to decide next action, then decide CD
		self.next_action = true;
		self.cd = floor(self.data.cd*rand(10, 13)/10);
		self.cd_max = self.cd;
		self.refresh_cd_num();
		// TODO: decide cd bar style depends on next action
		var cd_width = 80;
		set_css(self.cd_bar_container, {
			width: cd_width+'px', 
			height: '8px', 
			left: ((self.data.width-cd_width)/2-2)+'px', 
		});
		set_css(self.cd_bar_div, {
			width: '0%', 
			height: '8px', 
			backgroundColor: '#FF00DD', 
		});
	}
	
	self.decide_attack_anime = function (field)
	{
		self.attack_anime = 1;
		self.action_anime = self.full_image_div.clone();
		self.full_image_div.parent().append(self.action_anime);
		var width = self.full_image_div.width();
		var bottom = parseInt(self.full_image_div.css('bottom'));
		var left = 0;
		self.action_anime.animate({
			width: width*UI.BATTLE_ENEMY_ACTION_ANIMATE_SCALE+'px', 
			bottom: (bottom-(width*(UI.BATTLE_ENEMY_ACTION_ANIMATE_SCALE-1)/2))+'px', 
			left: (left-(width*(UI.BATTLE_ENEMY_ACTION_ANIMATE_SCALE-1)/2))+'px', 
			opacity: 0, 
		}, {
			duration: UI.BATTLE_ENEMY_ACTION_ANIMATE_TIME, 
			complete: function ()
			{
				self.attack_anime--;
				if (self.attack_anime <= 0)
				{
					self.action_anime.remove();
					self.action_anime = null;
					self.on_attack_end(field);
				}
			}, 
		});
	}
	
	self.on_attack_end = function (field)
	{
		self.attacking = false;
		self.decide_next_action();
		field.enemy_do_attack(self.data.atk);
	}
	
	self.attacked = function (field, damage)
	{
		shake({
			target: self.full_image, 
			strength: 8, 
			duration: 60, 
		});
		
		// 決定傷害數字顯示位置
		var x = rand(self.width());
		var y = rand(self.height())-20;
		var dmg = $('<div class="damage"></div>');
		var display_value = limit(damage.value-self.def(), 1, Infinity);
		dmg.text(display_value);
		self.dom.append(dmg);
		var font_size = '20px';
		set_css(dmg, {
			color: MANA.COLOR_TABLE[damage.type], 
			left: (x-(dmg.width()/2))+'px', 
			bottom: y+'px', 
			fontSize: font_size, 
		});
		
		// 計算相剋倍率以及顯示動畫
		var rate = MANA.attack_rate(damage.type, self.data.type);
		var real_damage = limit(floor(damage.value*rate/100)-self.def(), 1, Infinity);
		if (rate == game.COLOR_GOOD_RATE)
		{
			font_size = '30px';
		}
		else if (rate == game.COLOR_BAD_RATE)
		{
			font_size = '14px';
		}
		self.set_hp(limit(self.hp-real_damage, 0, Infinity));
		
		dmg.animate({
			bottom: (y+20)+'px', 
		}, {
			duration: UI.BATTLE_ENEMY_DAMAGE_SHOW_TIME, 
			complete: function ()
			{
				dmg.animate({
					fontSize: font_size, 
					left: (x-(dmg.width()/2))+'px', 
				}, {
					duration: UI.BATTLE_ENEMY_DAMAGE_STAY_TIME, 
					step: function (num, tween)
					{
						var value = floor(display_value + (real_damage-display_value)*tween.pos);
						dmg.text(value);
					}, 
					complete: function ()
					{
						dmg.fadeOut(UI.BATTLE_ENEMY_DAMAGE_FADEOUT_TIME, function ()
						{
							dmg.remove();
							delete dmg;
						});
					}
				});
			}, 
		});
	}
	
	self.set_hp = function (hp)
	{
		self.hp = hp;
		var now = self.hp_display;
		self.is_hp_bar_animating = true;
		self.hp_bar_div.stop(false, false).animate({
			width: (hp*100/self.hp_max)+'%', 
		}, {
			duration: UI.BATTLE_ENEMY_HP_BAR_DAMAGE_ANIMATE_TIME, 
		});
		self.hp_bar_back_div.stop(false, false).animate({
			width: (hp*100/self.hp_max)+'%', 
		}, {
			duration: UI.BATTLE_ENEMY_HP_BAR_BACK_DAMAGE_ANIMATE_TIME, 
			complete: function ()
			{
				if (hp == 0)
				{
					//self.set_hp(self.hp_max);
				}
				self.is_hp_bar_animating = false;
			}, 
		});
	}
	
	self.refresh_cd_num = function ()
	{
		if (self.cd > CD_SAFE_LINE)
		{
			var color = "#00BB00";
			set_css(self.cd_num_div, {
				color: color, 
				fontSize: UI.BATTLE_ENEMY_CD_NORMAL_SIZE+'px', 
			});
		}
		else if (self.cd > CD_DANGER_LINE)
		{
			var r = limit01((CD_SAFE_LINE-self.cd-CD_DANGER_LINE)/CD_SAFE_LINE)*20+200;
			var g = limit01((self.cd-CD_DANGER_LINE)/CD_SAFE_LINE)*80+120;
			var rs = (r>>4).toString(16)+(r&15).toString(16);
			var gs = (g>>4).toString(16)+(g&15).toString(16);
			var color = "#"+rs+gs+"00";
			set_css(self.cd_num_div, {
				color: color, 
				fontSize: UI.BATTLE_ENEMY_CD_WARNING_SIZE+'px', 
			});
		}
		else
		{
			var r = limit01((CD_DANGER_LINE-self.cd)/CD_DANGER_LINE)*55+200;
			var g = limit01(self.cd/CD_DANGER_LINE)*80;
			var rs = (r>>4).toString(16)+(r&15).toString(16);
			var gs = (g>>4).toString(16)+(g&15).toString(16);
			var color = "#"+rs+gs+"00";
			set_css(self.cd_num_div, {
				color: color, 
				fontSize: UI.BATTLE_ENEMY_CD_DANGER_SIZE+'px', 
			});
			/*var r = limit01((CD_DANGER_HINT-1000-self.cd)/CD_DANGER_HINT)*196;
			var g = limit01((self.cd-1000)/CD_DANGER_HINT)*196;
			console.log(r+', '+g);
			var rs = (r>>4).toString(16)+(r&15).toString(16);
			var gs = (g>>4).toString(16)+(g&15).toString(16);
			var color = "#"+rs+gs+"00";
			set_css(self.cd_num_div, {
				color: color, 
			});*/
		}
		var display = ceil(self.cd/CD_DISPLAY_RATE);
		self.cd_num_div.text(floor(display/10)+'.'+display%10);
		self.cd_bar_div.stop(false, false).animate({
			width: (1-(self.cd/self.cd_max))*100+'%', 
		}, {
			duration: game.UPDATE_INTERVAL*2, 
		});
	}
	
	self.is_dead = function ()
	{
		return self.hp <= 0;
	}
	
	self.init();
	
	return self;
}
