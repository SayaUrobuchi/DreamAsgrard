
var town_main = $('<div id="town_main"></div>');

var LOC_EXIT = -1;

function TownScene (args)
{
	var self = Scene();
	
	var STATE = {
		READY: 0, 
		EXIT: 1, 
		WAIT: 2, 
		SELECT_TEAM: 8, 
		ENTERING_BATTLE: 9, 
		HERO_LIST: 10, 
	};
	
	self.start = function ()
	{
		/*
		<div class="background"><img class="image" src="p/BG_Castle.jpg"></div>
		<div class="town_name font">阿斯嘉特</div><br />
		<div class="area_name font">～法理斯廣場～</div>
		<div class="option">
			<div class="option_container">
				<div class="option_item">城門</div>
				<div class="option_item">旅舍區</div>
				<div class="option_item">商店街</div>
				<div class="option_item">城郊</div>
			</div>
		</div>
		*/
		// 顯示介面初始化
		town_main.empty();
		
		self.background_div = $('<div class="background"></div>');
		town_main.append(self.background_div);
		
		self.town_name_div = $('<div class="town_name font"></div>');
		town_main.append(self.town_name_div);
		
		town_main.append('<br />');
		
		self.area_name_div = $('<div class="area_name font"></div>');
		town_main.append(self.area_name_div);
		
		self.option_div = $('<div class="option"></div>');
		{
			self.option_container_div = $('<div class="option_container"></div>');
			self.option_div.append(self.option_container_div);
		}
		town_main.append(self.option_div);
		
		main_f.html(town_main);
		
		self.init();
	}
	
	self.init = function ()
	{
		// TODO: 應要能指定載入的區域，開發中先寫死
		self.town_id = TOWN_ASGRARD;
		self.area_id = AREA_FALISU;
		
		self.state = LOC_UNKNOWN;
		
		self.enter_place({town_id: self.town_id, area_id: self.area_id, });
	}
	
	self.deinit = function ()
	{
		town_main.remove();
	}
	
	self.update = function ()
	{
		if (scene.current() != self)
		{
			return;
		}
	
		if (!data.flag[F_START_STORY])
		{
			data.scene_id = ADV_C1.START_ID;
			var adv = ADVScene();
			scene.push(adv, true);
		}
		
		switch (self.state)
		{
		// 並不在特定功能場所中，預設為四處走動狀態
		case LOC_UNKNOWN:
			// 等待進入特定功能場所，不做任何事
			break;
		// 進入關卡前，顯示關卡資料與選擇隊伍等
		case LOC_QUEST:
			self.update_quest();
			break;
		// 冒險者隊伍編制
		case LOC_TEAM:
			self.update_team();
			break;
		// 觀看角色詳細情報
		case LOC_HERO_DETAIL:
			self.update_hero_detail();
			break;
		case LOC_EXIT:
			// TODO: waiting for fadeout animation? no fadeout now.
			scene.pop(self.need_deinit);
			scene.push(self.next_scene, self.need_call_start);
			break;
		}
	}
	
	self.update_quest = function ()
	{
		switch (self.sub_state)
		{
		case STATE.READY:
			self.init_quest();
			self.sub_state = STATE.SELECT_TEAM;
		case STATE.SELECT_TEAM:
			// wait!
			break;
		case STATE.ENTERING_BATTLE:
			self.need_deinit = true;
			self.need_call_start = true;
			temp_data.next_stage_id = self.loc_data.stage_id;
			self.next_scene = BattleScene();
			self.state = LOC_EXIT;
			temp_data.back_to_town_data = null;
			break;
		case STATE.EXIT:
			self.quest_deinit();
			self.state = LOC_UNKNOWN;
			break;
		}
	}
	
	self.update_team = function ()
	{
		switch (self.sub_state)
		{
		case STATE.READY:
			self.init_team();
			self.sub_state = STATE.HERO_LIST;
			break;
		case STATE.EXIT:
			self.team_deinit();
			self.state = LOC_UNKNOWN;
			break;
		}
	}
	
	self.update_hero_detail = function ()
	{
		switch (self.sub_state)
		{
		case STATE.READY:
			// TODO: fake data for dev use
			data.hero_list[0] = {
				id: HERO_DAI_2, 
				level: 50, 
				exp: 8990, 
			};
			self.hero_detail_scene = HeroDetailScene({id: 0, });
			scene.push(self.hero_detail_scene, true);
			self.sub_state = STATE.WAIT;
			break;
		case STATE.EXIT:
			self.state = LOC_UNKNOWN;
			break;
		}
	}
	
	self.init_quest = function ()
	{
		/*
		<div id="quest_main">
			<div id="quest_container">
				<div class="quest_name font">甜蜜的邂逅</div>
				<div class="quest_desc font pre">其實就只是四處晃晃，看會不會轉角撞到咬著土司的幼女…
不會有的吧，我想。</div>
				<div class="quest_start_button font">出．擊！</div>
			</div>
		</div>
		*/
		// 建立基本介面
		self.quest_main_div = $('<div id="quest_main"></div>');
		{
			self.quest_container_div = $('<div id="quest_container"></div>');
			{
				self.quest_name_div = $('<div class="quest_name"></div>');
				self.quest_container_div.append(self.quest_name_div);
				
				self.quest_desc_div = $('<div class="quest_desc pre"></div>');
				self.quest_container_div.append(self.quest_desc_div);
				
				self.quest_start_button_div = $('<div class="button"></div>');
				self.quest_container_div.append(self.quest_start_button_div);
			}
			self.quest_main_div.append(self.quest_container_div);
		}
		town_main.append(self.quest_main_div);
		
		// 為介面填上內容
		self.stage = Stage(puzzle_stage_table[self.loc_data.stage_id]);
		self.quest_name_div.text(self.stage.get_display_name());
		self.quest_desc_div.text(self.stage.get_display_desc());
		self.quest_start_button_div.text(self.stage.get_display_start_button_text());
		
		self.quest_start_button_div.click({}, self.click_quest_start);
	}
	
	self.init_team = function ()
	{
		self.init_team_div();
		self.init_hero_list_div();
	}
	
	self.init_team_div = function ()
	{
		/*
		<div id="hero_team_main">
			<div class="hero_team_container">
				<div class="team_name">妲伊親衛第一隊</div>
				<div class="team">
					<div class="hero">
						<div class="role">隊長</div>
						<div class="icon clickable"><img class="image" src="p/妲伊_H.JPG"></div>
					</div><div class="hero">
						<div class="role">隊員</div>
						<div class="icon clickable"><img class="image" src="p/妲伊_H.JPG"></div>
					</div><div class="hero">
						<div class="role">隊員</div>
						<div class="icon clickable"><img class="image" src="p/妲伊_H.JPG"></div>
					</div><div class="hero">
						<div class="role">隊員</div>
						<div class="icon clickable"><img class="image" src="p/妲伊_H.JPG"></div>
					</div><div class="hero">
						<div class="role">隊員</div>
						<div class="icon clickable"><img class="image" src="p/妲伊_H.JPG"></div>
					</div><div class="hero">
						<div class="role">候補</div>
						<div class="icon clickable"><img class="image" src="p/妲伊_H.JPG"></div>
					</div>
				</div>
				<div class="button">編隊完成</div>
			</div>
		</div>
		*/
		self.hero_team_main_div = $('<div id="hero_team_main"></div>');
		{
			self.hero_team_container_div = $('<div class="hero_team_container"></div>');
			{
				self.hero_team_name_div = $('<div class="team_name"></div>');
				self.hero_team_name_div.text(data.team_list[data.cur_team].name);
				self.hero_team_container_div.append(self.hero_team_name_div);
				
				self.hero_team_div = $('<div class="team"></div>');
				{
					self.team_icon_div = [];
					for (var i=0; i<UI.TEAM_MEMBER_TABLE.length; i++)
					{
						var div = $('<div class="hero"></div>');
						var div_temp;

						div_temp = $('<div class="role"></div>');
						div_temp.text(UI.TEAM_MEMBER_TABLE[i]);
						div.append(div_temp);
						
						div_temp = $('<div class="icon clickable"></div>');
						self.team_icon_div.push(div_temp);
						div.append(div_temp);
						
						self.hero_team_div.append(div);
					}
				}
				self.hero_team_container_div.append(self.hero_team_div);
				
				self.hero_team_ok_button_div = $('<div class="button"></div>');
				self.hero_team_ok_button_div.text(UI.TOWN_TEAM_OK_BUTTON);
				self.hero_team_ok_button_div.click({}, self.click_team_ok_button);
				self.hero_team_container_div.append(self.hero_team_ok_button_div);
			}
			self.hero_team_main_div.append(self.hero_team_container_div);
		}
		town_main.append(self.hero_team_main_div);
	}
	
	self.init_hero_list_div = function ()
	{
		/*
		<div id="hero_list_main">
			<div class="hero_list_container">
				<div class="hero_list_item clickable">
					<div class="hero">
						<div class="icon"><img class="image" src="p/妲伊_H.JPG"></div>
						<div class="nickname"></div>
					</div>
					<div class="hero_info">
						<div class="hero_info_r1">
							<div class="rarity">初階</div>
							<div class="level">Lv. 50</div>
							<div class="type">光屬性</div>
							<div class="relation">親密</div>
						</div>
						<div class="hero_info_r2">
							<div class="title pre">雷槍的魔御士．</div>
							<div class="name pre">妲伊一二三五八一三</div>
						</div>
					</div>
				</div>
		*/
		self.hero_list_main_div = $('<div id="hero_list_main"></div>');
		{
			self.hero_list_container_div = $('<div class="hero_list_container"></div>');
			{
				// DEBUG: fake data to test display.
				//var list = data.hero_list;
				var list = [
					{
						id: 1, 
						get_display_rarity: function ()
						{
							return '初階';
						}, 
						get_display_level: function ()
						{
							return 'Lv. 50';
						}, 
						get_display_type: function ()
						{
							return '光';
						}, 
						get_display_relation: function ()
						{
							return '親密';
						}, 
						get_display_title: function ()
						{
							return '雷槍的魔御士';
						}, 
						get_display_name: function ()
						{
							return '妲伊';
						}, 
						get_display_icon: function ()
						{
							return $('<div class="icon"><img class="image" src="p/妲伊_H.JPG"></div>');
						}, 
					}, 
					{
						id: 1, 
						get_display_rarity: function ()
						{
							return '初階';
						}, 
						get_display_level: function ()
						{
							return 'Lv. 50';
						}, 
						get_display_type: function ()
						{
							return '光';
						}, 
						get_display_relation: function ()
						{
							return '親密';
						}, 
						get_display_title: function ()
						{
							return '雷槍的魔御士';
						}, 
						get_display_name: function ()
						{
							return '妲伊';
						}, 
						get_display_icon: function ()
						{
							return $('<div class="icon"><img class="image" src="p/妲伊_H.JPG"></div>');
						}, 
					}, 
				];
				for (var i=0; i<list.length; i++)
				{
					var hero = list[i];
					var id = hero.id;
					var div = $('<div class="hero_list_item clickable"></div>');
					{
						/*
							<div class="hero">
								<div class="icon"><img class="image" src="p/妲伊_H.JPG"></div>
								<div class="nickname"></div>
							</div>
							<div class="hero_info">
								<div class="hero_info_r1">
									<div class="rarity">初階</div>
									<div class="level">Lv. 50</div>
									<div class="type">光屬性</div>
									<div class="relation">親密</div>
								</div>
								<div class="hero_info_r2">
									<div class="title pre">雷槍的魔御士．</div>
									<div class="name pre">妲伊一二三五八一三</div>
								</div>
							</div>
						*/
						var hero_div = $('<div class="hero"></div>');
						hero_div.append(hero.get_display_icon());
						div.append(hero_div);
						
						var hero_info_div = $('<div class="hero_info"></div>');
						{
							var hero_info_r1_div = $('<div class="hero_info_r1">');
							hero_info_div.append(hero_info_r1_div);
							var hero_info_r2_div = $('<div class="hero_info_r2">');
							hero_info_div.append(hero_info_r2_div);
							
							var rarity_div = $('<div class="rarity"></div>');
							rarity_div.text(hero.get_display_rarity());
							hero_info_r1_div.append(rarity_div);
							
							var level_div = $('<div class="level"></div>');
							level_div.text(hero.get_display_level());
							hero_info_r1_div.append(level_div);
							
							var type_div = $('<div class="type"></div>');
							type_div.text(hero.get_display_type());
							hero_info_r1_div.append(type_div);
							
							var relation_div = $('<div class="relation"></div>');
							relation_div.text(hero.get_display_relation());
							hero_info_r1_div.append(relation_div);
							
							var title_div = $('<div class="title pre"></div>');
							title_div.text(hero.get_display_title());
							hero_info_r2_div.append(title_div);
							
							var name_div = $('<div class="name pre"></div>');
							name_div.text(hero.get_display_name());
							hero_info_r2_div.append(name_div);
						}
						div.append(hero_info_div);
					}
					self.hero_list_container_div.append(div);
				}
			}
			self.hero_list_main_div.append(self.hero_list_container_div);
		}
		town_main.append(self.hero_list_main_div);
	}
	
	self.quest_deinit = function ()
	{
		self.quest_main_div.remove();
	}
	
	self.team_deinit = function ()
	{
		self.hero_team_main_div.remove();
		self.hero_list_main_div.remove();
	}
	
	self.enter_place = function (option)
	{
		self.town_id = option.town_id;
		self.area_id = option.area_id;
		self.loc_id = option.loc_id;
		
		if (self.area_id)
		{
			// 載入區域並更新顯示
			self.area = Area(area_table[self.town_id][self.area_id]);
			self.town_name_div.text(self.area.get_town_display_name());
			self.area_name_div.text(self.area.get_area_display_name());
			self.background_div.html(self.area.get_background_display_image());
			
			// 建立可前往場所列表
			self.build_area_option();
		}
		else
		{
			// 進入該特定功能場所
			self.state = option.loc_id;
			self.loc_data = option.data;
			self.sub_state = STATE.READY;
		}
	}
	
	self.build_area_option = function ()
	{
		// TODO: maybe it's better create a cache ..
		var options = self.area.get_options();
		
		var count = 0;
		self.options = [];
		self.option_container_div.empty();
		
		for (var i=0; i<options.length; i++)
		{
			var option = options[i];
			// 如果目前為可通行狀態
			if (option.condition(self))
			{
				var div = $('<div class="option_item"></div>');
				// 獲取顯示名稱
				div.text(self.get_option_name(option));
				// 點選時要做的事
				div.click({id: count++, }, self.click_option);
				
				self.options.push(clone_hash(option, {div: div, }));
				self.option_container_div.append(div);
			}
		}
	}
	
	self.get_option_name = function (option)
	{
		// 如果名字為空，則自動以 id 查表
		var name = option.name;
		if (is_ndef(name))
		{
			// 判斷是區域還是場所
			if (option.area_id)
			{
				name = area_name_table[option.area_id];
			}
			else
			{
				name = loc_name_table[option.loc_id];
			}
		}
		return name;
	}
	
	self.click_option = function (event_data)
	{
		var data = event_data.data;
		
		self.enter_place(self.options[data.id]);
		return false;
	}
	
	self.click_quest_start = function (event_data)
	{
		var data = event_data.data;
		
		self.sub_state = STATE.ENTERING_BATTLE;
		return false;
	}
	
	self.click_team_ok_button = function (event_data)
	{
		self.sub_state = STATE.EXIT;
	}
	
	self.right_click = function (event_data)
	{
		switch (self.state)
		{
		case LOC_QUEST:
		case LOC_TEAM:
			self.sub_state = STATE.EXIT;
			break;
		}
	}
	
	return self;
}