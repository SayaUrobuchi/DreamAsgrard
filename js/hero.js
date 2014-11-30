
function Hero (hero_data)
{
	var self = {};
	
	self.init = function ()
	{
		self.hero_data = hero_data;
		self.data = hero_table[hero_data.id];
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
	
	self.get_display_rarity = function ()
	{
		return '初階';
	}
	
	self.get_display_level = function ()
	{
		return 'Lv. 50';
	}
	
	self.get_display_type = function ()
	{
		return '光';
	}
	
	self.get_display_relation = function ()
	{
		return '親密';
	}
	
	self.get_display_title = function ()
	{
		return '雷槍的魔御士';
	}
	
	self.get_display_name = function ()
	{
		return '妲伊';
	}
	
	self.get_display_icon = function ()
	{
		return $('<div class="icon"><img class="image" src="p/妲伊_H.JPG"></div>');
	}
	
	self.get_display_whole_body_image = function ()
	{
		return $('<img class="image" src="p/妲伊_W.JPG">');
	}
	
	self.get_current_exp_rate = function ()
	{
		return '70%';
	}
	
	self.get_display_next_exp = function ()
	{
		return 8891;
	}
	
	self.get_display_hp = function ()
	{
		return 36184;
	}
	
	self.get_display_atk = function ()
	{
		return 9193;
	}
	
	self.get_display_heal = function ()
	{
		return -1361;
	}
	
	/*
		<div class="hero_leader_skill_name">義勇剛烈的領袖</div>
		<div class="hero_leader_skill_desc">身先士卒、面對逆風也永不言敗的不屈精神，能使士氣高昂。光屬性角色生命力變成200%，全隊伍攻擊力變成200%。嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟</div>
		<div class="hero_main_skill_name">必殺．雷紋螺貫</div>
		<div class="hero_main_skill_desc">於槍上灌注雷閃之力，將自身連著長槍化為高速旋轉的電鑽猛力突進，貫穿一切！消耗100光魔力，造成12000%光傷害。</div>
		<div class="hero_sub_skill_name">雷瑩槍閃</div>
		<div class="hero_sub_skill_desc">舞動灌注雷閃之力的長槍，毫不留情地連攻目標死角。消除三顆光時發動，攻擊力100%。</div>
		<div class="hero_sub_skill_name">雷翔迅刃</div>
		<div class="hero_sub_skill_desc">將雷閃之力透過長槍，揮出優雅的廣範圍雷斬。消除四顆光時發動，攻擊力80%，攻擊敵全體。</div>
		<div class="hero_sub_skill_name">天雷華舞</div>
		<div class="hero_sub_skill_desc">以雷閃之力激發體能，舞出迅捷華麗、又不失優雅與力道的重擊。消除兩串三顆光時發動，攻擊力180%。</div>
	*/
	
	self.get_display_leader_skill_name = function ()
	{
		return '義勇剛烈的領袖';
	}
	
	self.get_display_leader_skill_desc = function ()
	{
		return '身先士卒、面對逆風也永不言敗的不屈精神，能使士氣高昂。光屬性角色生命力變成200%，全隊伍攻擊力變成200%。嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟';
	}
	
	self.get_display_main_skill_name = function ()
	{
		return '必殺．雷紋螺貫';
	}
	
	self.get_display_main_skill_desc = function ()
	{
		return '於槍上灌注雷閃之力，將自身連著長槍化為高速旋轉的電鑽猛力突進，貫穿一切！消耗100光魔力，造成12000%光傷害。';
	}
	
	self.get_display_sub_skill_name = function (id)
	{
		switch (id)
		{
		case 0:
			return '雷瑩槍閃';
		case 1:
			return '雷翔迅刃';
		case 2:
			return '天雷華舞';
		}
		log(LOG_WARNING, '試圖取得不正確的角色技能名。ID: ['+id+'].');
		return '__UNKNOWN';
	}
	
	self.get_display_sub_skill_desc = function (id)
	{
		switch (id)
		{
		case 0:
			return '舞動灌注雷閃之力的長槍，毫不留情地連攻目標死角。消除三顆光時發動，攻擊力100%。';
		case 1:
			return '將雷閃之力透過長槍，揮出優雅的廣範圍雷斬。消除四顆光時發動，攻擊力80%，攻擊敵全體。';
		case 2:
			return '以雷閃之力激發體能，舞出迅捷華麗、又不失優雅與力道的重擊。消除兩串三顆光時發動，攻擊力180%。';
		}
		log(LOG_WARNING, '試圖取得不正確的角色技能敘述。ID: ['+id+'].');
		return '__UNKNOWN';
	}
	
	self.get_display_attr_name = function (id)
	{
		switch (id)
		{
		case 0:
			return '人類';
		case 1:
			return '傲嬌';
		case 2:
			return '雷紋槍使';
		case 3:
			return '堅毅';
		case 4:
			return '逆風奮起';
		case 5:
			return '越戰越勇';
		case 6:
			return '致命華舞';
		case 7:
			return '雷光庇護';
		}
		log(LOG_WARNING, '試圖取得不正確的角色特性名。ID: ['+id+'].');
		return '__UNKNOWN';
	}
	
	self.get_display_attr_desc = function (id)
	{
		switch (id)
		{
		case 0:
			return '種族為人類，將受到相關效果的影響。';
		case 1:
			return '心口不一的個性。必殺技消耗上升5%，威力上升5%。';
		case 2:
			return '能熟練使用雷紋槍，也是其所認同的主人。攻擊力上升8%。';
		case 3:
			return '有著一顆堅毅不拔的心。生命在一半以下時，受到傷害減少5%。';
		case 4:
			return '即使劣勢也不放棄希望，努力奮鬥！生命在一半以下時，攻擊力上升20%。';
		case 5:
			return '隨著時間經過，不僅毫無衰敗之像，還更加奮勇！每十回合，攻擊力上升5%。';
		case 6:
			return '連擊時也不慌不亂，出手講究且精準。每一連鎖追加攻擊力4%。';
		case 7:
			return '對雷光擁有特別的親和力與抗性。光屬性傷害減少5%。';
		}
		log(LOG_WARNING, '試圖取得不正確的角色特性敘述。ID: ['+id+'].');
		return '__UNKNOWN';
	}
	
	self.get_story_num = function ()
	{
		return 8;
	}
	
	self.get_display_story_name = function (id)
	{
		var name = [
			"角色過往", 
			"拉瑟亞王國", 
			"席爾薩德", 
			"魔御士", 
			"妲伊所嚮往的魔法", 
			"- 尚未解鎖 -", 
			"- 尚未解鎖 -", 
			"- 尚未解鎖 -", 
		];
		return name[id];
	}
	
	self.get_display_story_content = function (id)
	{
		if (id == 0)
		{
			return '妲伊生於魔法王國拉瑟亞的席爾薩德，自小異常嚮往魔法，無奈限於自身資質，潛心苦修下進展卻不甚理想。為了補足缺憾而傻傻地在體術上下功夫，魔法方面卻仍舊沒什麼長進。\n\n'+
					'十六歲成為了以魔法輔助的戰士「魔御士」後，仍不死心地遊歷各地，卻沒能找到那些自由、充滿幻想、實現奇蹟的魔法，只充斥著系統化、實務化而定型的法術系統，每一招都有固定理論與數據。\n\n'+
					'在不斷的失望之中，聽到了自由的阿斯嘉特的傳聞。妲伊決定前往這自由且接納異族的城市，盼能找到內心嚮往已久的、能自在地揮灑內心幻想的、真正的魔法。';
		}
		return 'OAQ';
	}
	
	self.is_story_unlocked = function (id)
	{
		return id <= 4;
	}
	
	self.init();
	
	return self;
}
