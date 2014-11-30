
var hero_detail_main = $('<div id="hero_detail_main"></div>');

function HeroDetailScene (args)
{
	var self = Scene();
	
	var STATE = {
		READY: 0, 
		EXIT: 1, 
		DETAIL: 4, 
	};
	
	var INFO_STATE = {
		READY: -1, 
		SKILL: 0, 
		ATTR: 1, 
		STORY: 2, 
	};
	
	var HERO_MORE_INFO_TABS = [
		// <div class="hero_more_info_tabitem selected">必殺技 (Z)</div><div class="hero_more_info_tabitem clickable">特性 (X)</div><div class="hero_more_info_tabitem clickable">故事 (C)</div>
		{
			name: '必殺技', 
			hot_key: KEY_Z, 
			hot_key_desc: 'Z', 
		}, 
		{
			name: '特性', 
			hot_key: KEY_X, 
			hot_key_desc: 'X', 
		}, 
		{
			name: '故事', 
			hot_key: KEY_C, 
			hot_key_desc: 'C', 
		}, 
	];
	
	var NOT_EXISTS = -1;
	
	self.init = function ()
	{
		hero_detail_main.empty();
	
		self.hero_detail_container_div = $('<div class="hero_detail_container"></div>');
		{
			// 左邊 (圖像、名字、能力值等等)
			self.hero_info_div = $('<div class="hero_info"></div>');
			{
				// 最上頭的等級、名字等等
				self.hero_head_info_div = $('<div class="hero_head_info"></div>');
				{
					self.hero_info_r1_div = $('<div class="hero_info_r1">');
					self.hero_head_info_div.append(self.hero_info_r1_div);
					self.hero_info_r2_div = $('<div class="hero_info_r2">');
					self.hero_head_info_div.append(self.hero_info_r2_div);
					
					self.rarity_div = $('<div class="rarity"></div>');
					self.rarity_div.text(self.hero.get_display_rarity());
					self.hero_info_r1_div.append(self.rarity_div);
					
					self.level_div = $('<div class="level"></div>');
					self.level_div.text(self.hero.get_display_level());
					self.hero_info_r1_div.append(self.level_div);
					
					self.type_div = $('<div class="type"></div>');
					self.type_div.text(self.hero.get_display_type());
					self.hero_info_r1_div.append(self.type_div);
					
					self.relation_div = $('<div class="relation"></div>');
					self.relation_div.text(self.hero.get_display_relation());
					self.hero_info_r1_div.append(self.relation_div);
					
					self.title_div = $('<div class="title pre"></div>');
					self.title_div.text(self.hero.get_display_title());
					self.hero_info_r2_div.append(self.title_div);
					
					self.name_div = $('<div class="name pre"></div>');
					self.name_div.text(self.hero.get_display_name());
					self.hero_info_r2_div.append(self.name_div);
				}
				self.hero_info_div.append(self.hero_head_info_div);
				
				// 全身像
				// <div class="hero_whole_body"><img class="image" src="p/妲伊_W.JPG"></div>
				self.hero_whole_body_div = $('<div class="hero_whole_body"></div>');
				self.hero_whole_body_div.html(self.hero.get_display_whole_body_image());
				self.hero_info_div.append(self.hero_whole_body_div);
				
				// 距離升級所需EXP
				/*
					<div class="hero_exp">
						<div class="hero_exp_bar"></div>
						<div class="hero_exp_head">距離升級尚需經驗：</div><div class="hero_exp_value">8851</div>
					</div>
				*/
				self.hero_exp_div = $('<div class="hero_exp"></div>');
				{
					self.hero_exp_bar_div = $('<div class="hero_exp_bar"></div>');
					self.hero_exp_bar_div.css('width', self.hero.get_current_exp_rate());
					self.hero_exp_div.append(self.hero_exp_bar_div);
					
					self.hero_exp_head_div = $('<div class="hero_exp_head"></div>');
					self.hero_exp_head_div.text(UI.HERO_NEXT_EXP_HEAD);
					self.hero_exp_div.append(self.hero_exp_head_div);
					
					self.hero_exp_value_div = $('<div class="hero_exp_value"></div>');
					self.hero_exp_value_div.text(self.hero.get_display_next_exp());
					self.hero_exp_div.append(self.hero_exp_value_div);
				}
				self.hero_info_div.append(self.hero_exp_div);
				
				// 三圍 (生命、攻擊、回復)
				/*
					<div class="hero_strength_info">
						<div class="hero_hp">
							<div class="hero_hp_head">生命</div><div class="hero_hp_value">2324</div>
						</div><div class="hero_atk">
							<div class="hero_atk_head">攻擊</div><div class="hero_atk_value">1168</div>
						</div><div class="hero_heal">
							<div class="hero_heal_head">治癒</div><div class="hero_heal_value">236</div>
						</div>
					</div>
				*/
				self.hero_strength_info_div = $('<div class="hero_strength_info"></div>');
				{
					self.hero_hp_div = $('<div class="hero_hp"></div>');
					{
						self.hero_hp_head_div = $('<div class="hero_hp_head"></div>');
						self.hero_hp_head_div.text(UI.HERO_HP_HEAD);
						self.hero_hp_div.append(self.hero_hp_head_div);
						
						self.hero_hp_value_div = $('<div class="hero_hp_value"></div>');
						self.hero_hp_value_div.text(self.hero.get_display_hp());
						self.hero_hp_div.append(self.hero_hp_value_div);
					}
					self.hero_strength_info_div.append(self.hero_hp_div);
					
					self.hero_atk_div = $('<div class="hero_atk"></div>');
					{
						self.hero_atk_head_div = $('<div class="hero_atk_head"></div>');
						self.hero_atk_head_div.text(UI.HERO_ATK_HEAD);
						self.hero_atk_div.append(self.hero_atk_head_div);
						
						self.hero_atk_value_div = $('<div class="hero_atk_value"></div>');
						self.hero_atk_value_div.text(self.hero.get_display_atk());
						self.hero_atk_div.append(self.hero_atk_value_div);
					}
					self.hero_strength_info_div.append(self.hero_atk_div);
					
					self.hero_heal_div = $('<div class="hero_heal"></div>');
					{
						self.hero_heal_head_div = $('<div class="hero_heal_head"></div>');
						self.hero_heal_head_div.text(UI.HERO_HEAL_HEAD);
						self.hero_heal_div.append(self.hero_heal_head_div);
						
						self.hero_heal_value_div = $('<div class="hero_heal_value"></div>');
						self.hero_heal_value_div.text(self.hero.get_display_heal());
						self.hero_heal_div.append(self.hero_heal_value_div);
					}
					self.hero_strength_info_div.append(self.hero_heal_div);
				}
				self.hero_info_div.append(self.hero_strength_info_div);
			}
			self.hero_detail_container_div.append(self.hero_info_div);
			
			// 右邊詳細技能、特性、過往資料
			self.hero_more_info_div = $('<div class="hero_more_info"></div>');
			{
				// 頁籤部份
				/*
					<div class="hero_more_info_tabs">
						<div class="hero_more_info_tabitem selected">必殺技 (Z)</div><div class="hero_more_info_tabitem clickable">特性 (X)</div><div class="hero_more_info_tabitem clickable">故事 (C)</div>
					</div>
				*/
				self.hot_key = {};
				self.hero_more_info_tab_list = [];
				self.tab_div = {};
				self.hero_more_info_tabs_div = $('<div class="hero_more_info_tabs"></div>');
				{
					for (var i=0; i<HERO_MORE_INFO_TABS.length; i++)
					{
						var tab = HERO_MORE_INFO_TABS[i];
						var div = $('<div class="hero_more_info_tabitem clickable"></div>');
						div.text(tab.name+' ('+tab.hot_key_desc+')');
						self.hero_more_info_tabs_div.append(div);
						self.hot_key[tab.hot_key] = {
							data: {id: i, }, 
							func: self.select_tab, 
						};
						div.click({id: i, }, self.click_tab);
						self.hero_more_info_tab_list.push(div);
					}
				}
				self.hero_more_info_div.append(self.hero_more_info_tabs_div);
				
				// 角色招式、必殺技
				/*<div class="hero_skill_list" style="display: none;">
						<div class="hero_leader_skill">
							<div class="hero_leader_skill_name">義勇剛烈的領袖</div>
							<div class="hero_leader_skill_desc">身先士卒、面對逆風也永不言敗的不屈精神，能使士氣高昂。光屬性角色生命力變成200%，全隊伍攻擊力變成200%。嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟嘟</div>
						</div>
						<div class="hero_main_skill">
							<div class="hero_main_skill_name">必殺．雷紋螺貫</div>
							<div class="hero_main_skill_desc">於槍上灌注雷閃之力，將自身連著長槍化為高速旋轉的電鑽猛力突進，貫穿一切！消耗100光魔力，造成12000%光傷害。</div>
						</div>
						<div class="hero_sub_skill">
							<div class="hero_sub_skill_name">雷瑩槍閃</div>
							<div class="hero_sub_skill_desc">舞動灌注雷閃之力的長槍，毫不留情地連攻目標死角。消除三顆光時發動，攻擊力100%。</div>
						</div>
						<div class="hero_sub_skill">
							<div class="hero_sub_skill_name">雷翔迅刃</div>
							<div class="hero_sub_skill_desc">將雷閃之力透過長槍，揮出優雅的廣範圍雷斬。消除四顆光時發動，攻擊力80%，攻擊敵全體。</div>
						</div>
						<div class="hero_sub_skill">
							<div class="hero_sub_skill_name">天雷華舞</div>
							<div class="hero_sub_skill_desc">以雷閃之力激發體能，舞出迅捷華麗、又不失優雅與力道的重擊。消除兩串三顆光時發動，攻擊力180%。</div>
						</div>
					</div>
				*/
				self.hero_sub_skill_list = [];
				self.hero_skill_list_div = $('<div class="hero_skill_list"></div>');
				{
					self.hero_leader_skill_div = $('<div class="hero_leader_skill"></div>');
					{
						self.hero_leader_skill_name_div = $('<div class="hero_leader_skill_name"></div>');
						self.hero_leader_skill_name_div.text(self.hero.get_display_leader_skill_name());
						self.hero_leader_skill_div.append(self.hero_leader_skill_name_div);
						
						self.hero_leader_skill_desc_div = $('<div class="hero_leader_skill_desc"></div>');
						self.hero_leader_skill_desc_div.text(self.hero.get_display_leader_skill_desc());
						self.hero_leader_skill_div.append(self.hero_leader_skill_desc_div);
					}
					self.hero_skill_list_div.append(self.hero_leader_skill_div);
					
					self.hero_main_skill_div = $('<div class="hero_main_skill"></div>');
					{
						self.hero_main_skill_name_div = $('<div class="hero_main_skill_name"></div>');
						self.hero_main_skill_name_div.text(self.hero.get_display_main_skill_name());
						self.hero_main_skill_div.append(self.hero_main_skill_name_div);
						
						self.hero_main_skill_desc_div = $('<div class="hero_main_skill_desc"></div>');
						self.hero_main_skill_desc_div.text(self.hero.get_display_main_skill_desc());
						self.hero_main_skill_div.append(self.hero_main_skill_desc_div);
					}
					self.hero_skill_list_div.append(self.hero_main_skill_div);
					
					for (var i=0; i<game.HERO_SUB_SKILL_NUMBER; i++)
					{
						var sub_skill = {};
						sub_skill.hero_sub_skill_div = $('<div class="hero_sub_skill"></div>');
						{
							sub_skill.hero_sub_skill_name_div = $('<div class="hero_sub_skill_name"></div>');
							sub_skill.hero_sub_skill_name_div.text(self.hero.get_display_sub_skill_name(i));
							sub_skill.hero_sub_skill_div.append(sub_skill.hero_sub_skill_name_div);
							
							sub_skill.hero_sub_skill_desc_div = $('<div class="hero_sub_skill_desc"></div>');
							sub_skill.hero_sub_skill_desc_div.text(self.hero.get_display_sub_skill_desc(i));
							sub_skill.hero_sub_skill_div.append(sub_skill.hero_sub_skill_desc_div);
						}
						self.hero_skill_list_div.append(sub_skill.hero_sub_skill_div);
						self.hero_sub_skill_list.push(sub_skill);
					}
				}
				self.hero_more_info_div.append(self.hero_skill_list_div);
				self.hero_skill_list_div.hide();
				self.tab_div[INFO_STATE.SKILL] = self.hero_skill_list_div;
				
				// 角色特性 (種族、個性、…等等)
				/*
					<div class="hero_attr_list" style="display: none;">
						<div class="hero_attr">
							<div class="hero_attr_name">人類</div>
							<div class="hero_attr_desc">種族為人類，將受到相關效果的影響。</div>
						</div>
				*/
				self.hero_attr_list_div = $('<div class="hero_attr_list"></div>');
				{
					self.hero_attr_list = [];
					for (var i=0; i<game.HERO_ATTR_NUMBER; i++)
					{
						var attr_div = {};
						attr_div.hero_attr_div = $('<div class="hero_attr"></div>');
						{
							attr_div.hero_attr_name_div = $('<div class="hero_attr_name"></div>');
							attr_div.hero_attr_name_div.text(self.hero.get_display_attr_name(i));
							attr_div.hero_attr_div.append(attr_div.hero_attr_name_div);
							
							attr_div.hero_attr_desc_div = $('<div class="hero_attr_desc"></div>');
							attr_div.hero_attr_desc_div.text(self.hero.get_display_attr_desc(i));
							attr_div.hero_attr_div.append(attr_div.hero_attr_desc_div);
						}
						self.hero_attr_list_div.append(attr_div.hero_attr_div);
						self.hero_attr_list.push(attr_div);
					}
				}
				self.hero_more_info_div.append(self.hero_attr_list_div);
				self.hero_attr_list_div.hide();
				self.tab_div[INFO_STATE.ATTR] = self.hero_attr_list_div;
				
				// 角色過往與相關資訊
				self.hero_story_list_div = $('<div class="hero_story_list"></div>');
				{
					// 角色過往與相關資訊 (列表部份)
					/*
						<div class="hero_story_index" style="display: none;">
							<div class="hero_story_name clickable">角色過往</div>
							<div class="hero_story_name clickable">拉瑟亞王國</div>
							<div class="hero_story_name clickable">席爾薩德</div>
							<div class="hero_story_name clickable">魔御士</div>
							<div class="hero_story_name clickable">妲伊所嚮往的魔法</div>
							<div class="hero_story_name">- 尚未解鎖 -</div>
							<div class="hero_story_name">- 尚未解鎖 -</div>
							<div class="hero_story_name">- 尚未解鎖 -</div>
						</div>
					*/
					self.hero_story_list = [];
					self.hero_story_index_div = $('<div class="hero_story_index"></div>');
					{
						var story_num = self.hero.get_story_num();
						for (var i=0; i<story_num; i++)
						{
							var story_div = $('<div class="hero_story_name"></div>');
							story_div.text(self.hero.get_display_story_name(i));
							if (self.hero.is_story_unlocked(i))
							{
								story_div.addClass('clickable');
								story_div.click({id: i, }, self.click_story);
							}
							self.hero_story_index_div.append(story_div);
							self.hero_story_list.push(story_div);
						}
					}
					self.hero_story_list_div.append(self.hero_story_index_div);
					self.hero_story_index_div.hide();
					
					// 角色過往與相關資訊 (敘述部份)
					/*
						<div class="hero_story_detail">
							<div class="hero_story_name">角色過往<div class="back clickable">回上層</div></div>
							<div class="hero_story_content pre">妲伊生於魔法王國拉瑟亞的席爾薩德，自小異常嚮往魔法，無奈限於自身資質，潛心苦修下進展卻不甚理想。為了補足缺憾而傻傻地在體術上下功夫，魔法方面卻仍舊沒什麼長進。

十六歲成為了以魔法輔助的戰士「魔御士」後，仍不死心地遊歷各地，卻沒能找到那些自由、充滿幻想、實現奇蹟的魔法，只充斥著系統化、實務化而定型的法術系統，每一招都有固定理論與數據。

在不斷的失望之中，聽到了自由的阿斯嘉特的傳聞。妲伊決定前往這自由且接納異族的城市，盼能找到內心嚮往已久的、能自在地揮灑內心幻想的、真正的魔法。</div>
						</div>
					*/
					self.hero_story_detail_div = $('<div class="hero_story_detail"></div>');
					{
						self.hero_story_detail_name_div = $('<div class="hero_story_name"></div>');
						self.hero_story_detail_div.append(self.hero_story_detail_name_div);
						
						self.hero_story_detail_content_div = $('<div class="hero_story_content pre"></div>');
						self.hero_story_detail_div.append(self.hero_story_detail_content_div);
						
						self.hero_story_detail_back_button = $('<div class="back clickable"></div>');
						self.hero_story_detail_back_button.text(UI.HERO_DETAIL_STORY_BACK_BUTTON_TEXT);
						self.hero_story_detail_back_button.click({}, self.click_story_back);
						self.hero_story_detail_div.append(self.hero_story_detail_back_button);
					}
					self.hero_story_list_div.append(self.hero_story_detail_div);
					self.hero_story_detail_div.hide();
				}
				self.hero_more_info_div.append(self.hero_story_list_div);
				self.hero_story_list_div.hide();
				self.tab_div[INFO_STATE.STORY] = self.hero_story_list_div;
			}
			self.hero_detail_container_div.append(self.hero_more_info_div);
		}
		hero_detail_main.append(self.hero_detail_container_div);
		main_f.append(hero_detail_main);
	}
	
	self.start = function ()
	{
		if (!args)
		{
			args = {};
		}
		self.hero_id = args.id;
		if (is_ndef(self.hero_id))
		{
			self.hero_id = temp_data.hero_detail_id;
		}
		self.hero = temp_data.get_hero(self.hero_id);
		
		self.state = STATE.READY;
		
		self.init();
		
		self.current_tab_id = NOT_EXISTS;
		self.hero_more_info_tab_list[0].click();
	}
	
	self.update = function ()
	{
		if (self.state == STATE.EXIT)
		{
			scene.pop(true);
		}
	}
	
	self.deinit = function ()
	{
		hero_detail_main.remove();
	}
	
	self.back_to_story_index = function ()
	{
		self.hero_story_detail_back_button.click();
	}
	
	self.refresh_tab = function ()
	{
		switch (self.current_tab_id)
		{
		case INFO_STATE.STORY:
			self.back_to_story_index();
			break;
		}
	}
	
	self.select_tab = function (data)
	{
		var id = data.id;
		self.hero_more_info_tab_list[id].click();
	}
	
	self.key_up = function (event_data)
	{
		var key = event_data.which;
		if (is_def(self.hot_key[key]))
		{
			self.hot_key[key].func(self.hot_key[key].data);
			return false;
		}
		return true;
	}
	
	self.right_click = function (event_data)
	{
		switch (self.current_tab_id)
		{
		case INFO_STATE.STORY:
			if (self.state == STATE.DETAIL)
			{
				self.back_to_story_index();
				return;
			}
		default:
			self.state = STATE.EXIT;
		}
	}
	
	self.click_tab = function (event_data)
	{
		var id = event_data.data.id;
		// 如果按同一個就不理它
		if (id == self.current_tab_id)
		{
			return;
		}
		
		// 先處理上次按的，沒有就略過
		var tab = self.hero_more_info_tab_list[self.current_tab_id];
		if (self.current_tab_id != NOT_EXISTS)
		{
			self.tab_div[self.current_tab_id].hide();
			tab.removeClass('selected');
			tab.addClass('clickable');
		}
		
		// 處理這次按的tab
		self.current_tab_id = id;
		tab = self.hero_more_info_tab_list[id];
		tab.removeClass('clickable');
		tab.addClass('selected');
		self.tab_div[self.current_tab_id].show();
		self.refresh_tab();
	}
	
	self.click_story_back = function ()
	{
		self.hero_story_detail_div.hide();
		self.hero_story_index_div.show();
		self.state = STATE.READY;
	}
	
	self.click_story = function (event_data)
	{
		var id = event_data.data.id;
		self.hero_story_detail_name_div.text(self.hero.get_display_story_name(id));
		self.hero_story_detail_content_div.text(self.hero.get_display_story_content(id));
		self.hero_story_detail_div.show();
		self.hero_story_index_div.hide();
		self.state = STATE.DETAIL;
	}
	
	return self;
}
