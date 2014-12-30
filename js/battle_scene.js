
var battle_main = $('<div id="battle_main"></div>');

var __DEBUG_USING_TEST_TEAM = true;
var __DEBUG_SKIP_ADV = true;
var __DEBUG_INIT_HP_RATE = 20;

function BattleScene()
{
	var self = Scene();
	
	var STATE = {
		READY: 0, 
		EXIT: 1, 
		BEFORE_STORY: 2, 
		WIN_STORY: 3, 
		LOSE_STORY: 4, 
		
		ROUND_START: 10, 
		PREPARE: 11, 
		CALC_RESULT: 12, 
		ATTACK: 13, 
		ROUND_END: 14, 
		STAGE_END: 32, 
	}
	
	var FALLING_STATE = {
		READY: 0, 
		RELEASE: 1, 
		TIGHT: 2, 
		FIT: 3, 
		FINISH: 4, 
	}
	
	var ATTACKING_STATE = {
		READY: 0, 
		SHOW_BONUS: 1, 
		DO_ATTACK: 2, 
		WAIT_ATTACK: 3, 
		FINISH: 4, 
	}
	
	var ROUND_END_STATE = {
		READY: 0, 
		WAIT_ENEMY_DISAPPEAR: 1, 
		WAIT_ENEMY_APPEAR: 2, 
		FINISH: 16, 
	}
	
	self.state = STATE.READY;
	
	self.start = function ()
	{
		battle_main.empty();
		battle_main.mousemove(self.mmove);
		battle_main.mouseup(self.mup);
		
		// split into two area, left battle field, right mana board
		self.battle_field_div = $('<div id="battle_field"></div>');
		{
			self.battle_field_container = $('<div class="container"></div>');
			{
				self.battle_ground_div = $('<div id="battle_ground"></div>');
				{
					self.battle_enemy_div = $('<div id="battle_enemy"></div>');
					self.battle_ground_div.append(self.battle_enemy_div);
				}
				self.battle_field_container.append(self.battle_ground_div);
				
				self.hero_area_pivot = $('<div class="hero_area pivot"></div>');
				{
					self.hero_area_container = $('<div class="container"></div>');
					{
						self.hero_icon_pivot = $('<div class="hero_icon pivot"></div>');
						{
							self.hero_icon_container = $('<div class="container"></div>');
							self.hero_icon_pivot.append(self.hero_icon_container);
						}
						self.hero_area_container.append(self.hero_icon_pivot);
					
						self.hero_hp_pivot = $('<div class="hero_hp pivot"></div>');
						{
							self.hero_hp_container = $('<div class="container"></div>');
							{
								self.hero_hp_bar_back_div = $('<div class="hp_bar_back"></div>');
								self.hero_hp_container.append(self.hero_hp_bar_back_div);
								
								self.hero_hp_bar_div = $('<div class="hp_bar"></div>');
								self.hero_hp_container.append(self.hero_hp_bar_div);
								
								self.hero_hp_now_div = $('<div class="hp_now"></div>');
								self.hero_hp_container.append(self.hero_hp_now_div);
								
								self.hero_hp_max_div = $('<div class="hp_max"></div>');
								self.hero_hp_container.append(self.hero_hp_max_div);
								
								self.hero_hp_heal_div = $('<div class="hp_heal"></div>');
								self.hero_hp_container.append(self.hero_hp_heal_div);
							}
							self.hero_hp_pivot.append(self.hero_hp_container);
						}
						self.hero_area_container.append(self.hero_hp_pivot);
					}
					self.hero_area_pivot.append(self.hero_area_container);
				}
				self.battle_field_container.append(self.hero_area_pivot);
			}
			self.battle_field_div.append(self.battle_field_container);
		}
		battle_main.append(self.battle_field_div);
		
		self.board_div = $('<div id="board"></div>');
		{
			self.board_container = $('<div class="container"></div>');
			{
				self.board_area_div = $('<div class="board_area"></div>');
				{
					self.board_area_container = $('<div class="container"></div>');
					{
						self.board_mask_div = $('<div class="mask"></div>');
						self.board_area_container.append(self.board_mask_div);
					}
					self.board_area_div.append(self.board_area_container);
				}
				self.board_container.append(self.board_area_div);
				
				self.mana_count_container_div = $('<div id="mana_count_container"></div>');
				{
					self.mana_count_container = $('<div class="container"></div>');
					{
						self.mana_count_div = [];
						self.mana_plus_count_div = [];
						for (var i=1; i<=6; i++)
						{
							self.mana_count_div[i] = $('<div class="mana_count"></div>');
							set_css(self.mana_count_div[i], {
								top: i*40+'px', 
								color: MANA.COLOR_TABLE[i], 
							});
							self.mana_count_container.append(self.mana_count_div[i]);
							self.mana_plus_count_div[i] = $('<div class="mana_plus_count"></div>');
							set_css(self.mana_plus_count_div[i], {
								top: i*40+'px', 
								left: '120px', 
								color: MANA.COLOR_TABLE[i], 
							});
							self.mana_count_container.append(self.mana_plus_count_div[i]);
						}
					}
					self.mana_count_container_div.append(self.mana_count_container);
				}
				self.board_container.append(self.mana_count_container_div);
				
				self.turn_div = $('<div id="turn"></div>');
				self.board_container.append(self.turn_div);
				
				self.combo_div = $('<div id="combo"></div>');
				self.board_container.append(self.combo_div);
			}
			self.board_div.append(self.board_container);
		}
		battle_main.append(self.board_div);
		
		main_f.append(battle_main);
		
		self.init();
	}
	
	self.init = function ()
	{
		// mana / info related
		self.set_turn(1);
		self.mana_count_table = [];
		self.mana_count_display = [];
		for (var i=1; i<=6; i++)
		{
			self.mana_count_display[i] = 0;
			self.set_mana_count(i, 0);
		}
		self.mana_plus_count_table = [];
		self.mana_plus_count_display = [];
		for (var i=1; i<=6; i++)
		{
			self.mana_plus_count_display[i] = 0;
			self.set_mana_plus_count(i, 0);
		}
		self.combo = 0;
		self.combo_div.hide();
		self.set_combo(0);
		
		// events
		self.enemy_attack_event = [];
		
		// hero related
		self.hero = temp_data.current_battle_team;
		if (!self.hero || __DEBUG_USING_TEST_TEAM)
		{
			log(LOG_WARNING, "未設定戰鬥用隊伍！自動採用測試隊伍。");
			self.hero = {
				0: Hero({id: 1001}), 
				1: Hero({id: 1002}), 
				2: Hero({id: 1003}), 
				3: Hero({id: 1004}), 
				4: Hero({id: 1005}), 
				5: Hero({id: 1006}), 
			};
		}
		self.hero_leader = self.hero[0];
		self.hero_helper = self.hero[5];
		self.hero_hp_max = 0;
		self.hero_heal = 0;
		for (var i=0; i<game.BATTLE_HERO_NUM; i++)
		{
			if (self.hero[i])
			{
				self.hero_icon_container.append(self.hero[i].dom);
				if (self.hero[i] == self.hero_helper)
				{
					self.hero[i].dom.addClass('helper');
				}
				self.hero_hp_max += self.hero[i].data.hp;
				self.hero_heal += self.hero[i].data.heal;
			}
		}
		self.hero_hp = self.hero_hp_max;
		self.hero_hp_display = 0;
		self.hero_hp_heal_display = 0;
		var now_hp = self.hero_hp;
		if (__DEBUG_INIT_HP_RATE > 0)
		{
			now_hp = floor(now_hp*__DEBUG_INIT_HP_RATE/100.0);
		}
		self.set_hero_hp(now_hp);
		self.set_hero_hp_max(self.hero_hp_max);
		self.set_heal_visible(false);
		
		// enemy related
		self.enemy_defeat = false;
		self.enemy = [];
		
		// board
		self.board_width = 6;
		self.board_height = 6;
		self.init_board();
		
		// stage related
		self.round = 0;
		self.stage_id = temp_data.next_stage_id;
		if (!self.stage_id)
		{
			log(LOG_WARNING, "未指定關卡ID便跳至戰鬥！");
			self.stage_id = 1001;
		}
		self.stage = Stage(puzzle_stage_table[self.stage_id]);
	}
	
	self.deinit = function ()
	{
		battle_main.remove();
	}
	
	// 主循環
	self.update = function ()
	{
		if (scene.current() != self)
		{
			return;
		}
		
		// if not pre-loaded, do it.
		if (!image.__preloaded || !audio.__preloaded)
		{
			if (!self.loading_scene)
			{
				self.loading_scene = LoadingScene();
				scene.push(self.loading_scene, true);
				return;
			}
		}
		
		// update states
		switch (self.state)
		{
		case STATE.READY:
			self.set_board_mask(false);
			self.fit_board();
			self.state = STATE.BEFORE_STORY;
			break;
		case STATE.EXIT:
			// TODO: maybe have fadeout animation?
			scene.pop(true);
			scene.push(TownScene(), true);
			break;
		case STATE.BEFORE_STORY:
			var id = self.stage.get_before_story();
			self.insert_adv(id);
			self.state = STATE.ROUND_START;
			return;
			break;
		case STATE.WIN_STORY:
			var id = self.stage.get_win_story();
			self.insert_adv(id);
			self.state = STATE.EXIT;
			return;
			break;
		case STATE.LOSE_STORY:
			var id = self.stage.get_lose_story();
			self.insert_adv(id);
			self.state = STATE.EXIT;
			return;
			break;
		case STATE.ROUND_START:
			self.round++;
			if (self.is_stage_clear())
			{
				self.state = STATE.STAGE_END;
				break;
			}
			// monster
			var round = self.stage.round[self.round-1];
			var width = 0;
			for(var i=0; i<round.enemy.length; i++)
			{
				var enemy = Enemy(enemy_table[round.enemy[i]]);
				self.enemy.push(enemy);
				width += enemy.data.width;
				self.battle_enemy_div.append(enemy.dom);
				set_css(enemy.dom, {
					left: '0px', 
				});
			}
			set_css(self.battle_enemy_div, {
				width: width, 
			});
			
			self.state = STATE.PREPARE;
			self.enemy_countdown = true;
			self.enemy_attack = true;
			self.enemy_defeat = false;
			break;
		case STATE.PREPARE:
			if (self.enemy_defeat)
			{
				self.state = STATE.ROUND_END;
				self.moving_state = ROUND_END_STATE.READY;
				self.enemy_attack = false;
			}
			else if (self.mask)
			{
				self.set_board_mask(false);
				self.enemy_attack = true;
			}
			break;
		case STATE.CALC_RESULT:
			if (!self.mana_animating)
			{
				self.calculate_combo();
			}
			else
			{
				self.update_falling();
			}
			break;
		case STATE.ATTACK:
			self.update_attacking();
			break;
		case STATE.ROUND_END:
			// 前進下一關
			// 確認敵人消失 => 顯示下一波敵人
			//console.log("i'm in STATE.ROUND_END");
			switch (self.moving_state)
			{
			case ROUND_END_STATE.READY:
				self.moving_state = ROUND_END_STATE.WAIT_ENEMY_DISAPPEAR;
				break;
			case ROUND_END_STATE.WAIT_ENEMY_DISAPPEAR:
				for (var i=0; i<self.enemy.length; i++)
				{
					var enemy = self.enemy[i];
					if (enemy.is_disappear)
					{
						var e = self.enemy.pop();
						if (i > 0 && i <= self.enemy.length)
						{
							self.enemy[i] = e;
						}
					}
				}
				if (self.enemy.length <= 0)
				{
					self.state = STATE.ROUND_START;
					self.enemy_countdown = false;
				}
				break;
			}
			break;
		case STATE.STAGE_END:
			self.enemy_countdown = false;
			self.enemy_attack = false;
			self.set_board_mask(true);
			// 關卡結束，可能是敵全滅或玩家陣亡
			// 如果是玩家陣亡
			if (self.is_game_over())
			{
				// lose
				log(LOG_MSG, 'LOSE..');
				// TODO: maybe need to add gameover scene
				self.state = STATE.LOSE_STORY;
			}
			// 否則理論上是敵全滅
			else if (self.is_stage_clear())
			{
				// win
				log(LOG_MSG, 'WIN!!!');
				// TODO: maybe need to add winning and result analytics scene
				self.state = STATE.WIN_STORY;
			}
			break;
		}
		
		// update events
		if (self.enemy_countdown)
		{
			for (var i=0; i<self.enemy.length; i++)
			{
				var enemy = self.enemy[i];
				enemy.update(self);
			}
		}
		if (self.enemy_attack && self.enemy_attack_event.length > 0)
		{
			var attacker = self.enemy_attack_event[0];
			var res = attacker.update_attack(self);
			if (res)
			{
				self.enemy_attack_event.shift();
			}
		}
		/* undead test mode
		if (self.hero_hp_display == 0)
		{
			self.set_hero_hp(self.hero_hp_max);
		}
		*/
		if (self.is_game_over())
		{
			self.state = STATE.STAGE_END;
		}
	}
	
	// 消落珠時的狀態刷新
	self.update_falling = function ()
	{
		switch (self.falling_state)
		{
		case FALLING_STATE.READY:
			self.fcnt = 0;
			self.release_ptr = 0;
			self.fade_finish_count = 0;
			self.falling_state = FALLING_STATE.RELEASE;
			break;
		case FALLING_STATE.RELEASE:
			self.fcnt--;
			if (self.fcnt <= 0)
			{
				if (self.release_ptr >= self.combo_result.release_mana.length)
				{
					if (self.fade_finish_count >= self.release_ptr)
					{
						self.tight_board();
						self.falling_state = FALLING_STATE.TIGHT;
					}
				}
				else
				{
					var release_target = self.combo_result.release_mana[self.release_ptr];
					var release_data = self.combo_result.release_table[self.combo];
					var type = release_data.type;
					var len = release_data.count;
					self.set_mana_plus_count(type, self.mana_plus_count_table[type]+len);
					for (var i=0; i<len; i++)
					{
						var x = release_target[i].x;
						var y = release_target[i].y;
						self.board[x][y].dom.fadeOut(UI.MANA_RELEASE_TIME, function ()
						{
							self.fade_finish_count++;
						});
					}
					self.fcnt = UI.MANA_RELEASE_INTERVAL;
					self.release_ptr++;
					self.set_combo(self.combo+1);
					if (type == MANA.HEART)
					{
						self.set_heal(self.heal+limit(
							floor(self.hero_heal*(100+game.COLOR_RELEASE_RATE*(len-3))/100), 
							0, Infinity));
					}
					else
					{
						for (var i=0; i<game.BATTLE_HERO_NUM; i++)
						{
							var hero = self.hero[i];
							for (var j=0; j<game.HERO_ATTACK_SKILL_NUMBER; j++)
							{
								if (hero.is_attack_skill_unlock(j))
								{
									var dmg_round = hero.get_attack_skill_around_power(j, self);
									if (dmg_round)
									{
										hero.set_rate_msg(j, dmg_round, '');
									}
								}
							}
						}
					}
				}
			}
			break;
		case FALLING_STATE.TIGHT:
			if (self.tight_count >= self.tight_total)
			{
				self.fade_finish_count = 0;
				self.fit_board();
				self.falling_state = FALLING_STATE.FIT;
			}
			break;
		case FALLING_STATE.FIT:
			if (self.fade_finish_count >= self.fit_total)
			{
				self.falling_state = FALLING_STATE.FINISH;
			}
			break;
		case FALLING_STATE.FINISH:
			self.mana_animating = false;
			break;
		}
	}
	
	// 己方攻擊時的狀態刷新
	self.update_attacking = function ()
	{
		switch (self.attacking_state)
		{
		case ATTACKING_STATE.READY:
			if (!self.mask)
			{
				self.set_board_mask(true);
				self.enemy_attack = false;
			}
			self.before_hero_attack();
			self.attacking_state = ATTACKING_STATE.SHOW_BONUS;
			break;
		case ATTACKING_STATE.SHOW_BONUS:
			for (var i=0; i<self.hero_attack_queue.length; i++)
			{
				var hero = self.hero_attack_queue[i];
				for (var j=0; j<game.HERO_ATTACK_SKILL_NUMBER; j++)
				{
					hero.set_rate_msg(j, hero.get_damage(j, self).value);
				}
			}
			self.attacking_state = ATTACKING_STATE.DO_ATTACK;
			break;
		case ATTACKING_STATE.DO_ATTACK:
			self.attack_wait = self.hero_attack_queue.length;
			complete_template = function (damage)
			{
				return function ()
				{
					self.attack_wait--;
					for (var i=0; i<damage.length; i++)
					{
						self.enemy[0].attacked(self, damage[i]);
					}
				};
			};
			for (var i=0; i<self.hero_attack_queue.length; i++)
			{
				var hero = self.hero_attack_queue[i];
				var damage = hero.get_all_damage(self);
				jump({
					target: hero.dom, 
					delay: UI.BATTLE_HERO_ATTACK_INTERVAL*i, 
					on_complete: complete_template(damage), 
				});
			}
			var heal = floor(self.heal * (100+game.COMBO_RATE*self.combo_result.combo)/100);
			if (heal)
			{
				self.set_heal(heal);
				self.set_hero_hp(limit(self.hero_hp+heal, 0, self.hero_hp_max));
			}
			self.attacking_state = ATTACKING_STATE.WAIT_ATTACK;
			break;
		case ATTACKING_STATE.WAIT_ATTACK:
			if (self.attack_wait <= 0)
			{
				self.attacking_state = ATTACKING_STATE.FINISH;
			}
			break;
		case ATTACKING_STATE.FINISH:
			for (var i=0; i<self.hero_attack_queue.length; i++)
			{
				var hero = self.hero_attack_queue[i];
				hero.reset_rate_msg();
				hero.set_rate(0);
			}
			self.check_enemy_defeat();
			self.state = STATE.PREPARE;
			self.set_turn(self.turn+1);
			self.set_combo(0);
			for (var i=1; i<=6; i++)
			{
				self.set_mana_count(i, self.mana_count_table[i]+self.mana_plus_count_table[i]);
				self.set_mana_plus_count(i, 0);
			}
			self.set_heal_visible(false, UI.BATTLE_HERO_HP_HEAL_WAIT_TIME);
			break;
		}
	}
	
	// 己方攻擊前置處理
	// BUG
	self.before_hero_attack = function ()
	{
		self.hero_attack_queue = [];
		for (var i=0; i<game.BATTLE_HERO_NUM; i++)
		{
			if (self.hero[i].get_all_damage(self).length > 0)
			{
				self.hero_attack_queue.push(self.hero[i]);
			}
		}
	}
	
	// 檢查是否敵全滅
	self.check_enemy_defeat = function ()
	{
		for (var i=0; i<self.enemy.length; i++)
		{
			if (!self.enemy[i].is_dead())
			{
				return ;
			}
		}
		self.enemy_defeat = true;
	}
	
	// 插入ADVScene
	self.insert_adv = function (id)
	{
		if (id && !__DEBUG_SKIP_ADV)
		{
			data.scene_id = id;
			var adv = ADVScene();
			scene.push(adv, true);
		}
	}
	
	// 改變己方目前血量
	self.set_hero_hp = function (hp)
	{
		self.hero_hp = hp;
		var now = self.hero_hp_display;
		// heal
		if (hp > now)
		{
			set_css(self.hero_hp_bar_back_div, {
				backgroundColor: UI.BATTLE_HERO_HP_BAR_HEAL_COLOR, 
			});
			self.hero_hp_bar_div.stop(false, false).animate({
				width: (hp/self.hero_hp_max)*100+'%', 
			}, {
				duration: UI.BATTLE_HERO_HP_BAR_HEAL_ANIMATE_TIME, 
				step: function (num, tween)
				{
					self.hero_hp_display = floor(now + (hp-now)*tween.pos);
					self.hero_hp_now_div.text(self.hero_hp_display);
				}, 
			});
			self.hero_hp_bar_back_div.stop(false, false).animate({
				width: (hp/self.hero_hp_max)*100+'%', 
			}, {
				duration: UI.BATTLE_HERO_HP_BAR_BACK_HEAL_ANIMATE_TIME, 
			});
		}
		// damage
		else
		{
			set_css(self.hero_hp_bar_back_div, {
				backgroundColor: UI.BATTLE_HERO_HP_BAR_DAMAGE_COLOR, 
			});
			self.hero_hp_bar_div.stop(false, false).animate({
				width: (hp/self.hero_hp_max)*100+'%', 
			}, {
				duration: UI.BATTLE_HERO_HP_BAR_DAMAGE_ANIMATE_TIME, 
			});
			self.hero_hp_bar_back_div.stop(false, false).animate({
				width: (hp/self.hero_hp_max)*100+'%', 
			}, {
				duration: UI.BATTLE_HERO_HP_BAR_BACK_DAMAGE_ANIMATE_TIME, 
				step: function (num, tween)
				{
					self.hero_hp_display = floor(now + (hp-now)*tween.pos);
					self.hero_hp_now_div.text(self.hero_hp_display);
				}, 
			});
		}
	}
	
	// 改變己方最大血量
	self.set_hero_hp_max = function (mhp)
	{
		var now = self.hero_hp_max;
		self.hero_hp_max = mhp;
		self.hero_hp_max_div.text('/'+self.hero_hp_max);
		set_css(self.hero_hp_max_div, {
			fontSize: '25px', 
		});
		self.hero_hp_max_div.animate({
			fontSize: '15px', 
		}, {
			duration: UI.BATTLE_HERO_HP_MAX_CHANGED_ANIMATE_TIME, 
			complete: function ()
			{
				if (self.hero_hp > self.hero_hp_max)
				{
					self.set_hero_hp(self.hero_hp_max);
				}
			}, 
		});
	}
	
	// 顯示治癒量
	self.set_heal = function (amount)
	{
		var now = self.hero_hp_heal_display;
		self.heal = amount;
		self.set_heal_visible(true);
		self.hero_hp_heal_div.text('+'+now);
		set_css(self.hero_hp_heal_div, {
			fontSize: '25px', 
		});
		self.hero_hp_heal_div.stop(false, false).animate({
			fontSize: '15px', 
		}, {
			duration: UI.BATTLE_HERO_HP_HEAL_ANIMATE_TIME, 
			step: function (num, tween)
			{
				self.hero_hp_heal_display = floor(now + (amount-now)*tween.pos);
				self.hero_hp_heal_div.text('+'+self.hero_hp_heal_display);
			}, 
		});
	}
	
	self.set_heal_visible = function (visible, waiting)
	{
		if (!visible)
		{
			if (!waiting)
			{
				waiting = 0;
			}
			self.hero_hp_heal_div.delay(waiting).fadeOut(UI.BATTLE_HERO_HP_HEAL_FADEOUT_TIME);
		}
		else
		{
			self.hero_hp_heal_div.show();
		}
	}
	
	// 初始化盤面
	// TODO: 初始盤面應該要是 0 combo?
	self.init_board = function ()
	{
		self.board = create_2d_array(self.board_height, self.board_width);
		for (var i=0; i<self.board_width; i++)
		{
			for (var j=0; j<self.board_height; j++)
			{
				self.board[i][j] = Mana(MANA.NONE);
				var dom = self.board[i][j].dom;
				self.board_area_container.append(dom);
				set_css(dom, {left: i*UI.MANA_WIDTH, bottom: j*UI.MANA_HEIGHT});
				dom.mousedown({x: i, y: j}, self.mdown_on_mana);
			}
		}
		set_css(self.board_area_div, {
			height: self.board_height*UI.MANA_HEIGHT, 
			width: self.board_width*UI.MANA_WIDTH, 
		});
		self.fit_board();
	}
	
	// 隨機生成珠子
	// TODO: using weight instead.
	self.generate_new_mana = function ()
	{
		var dice = rand(6)+1;
		return dice;
	}
	
	// 讓盤面因消除而浮空的珠子落下
	self.tight_board = function ()
	{
		self.tight_total = 0;
		self.tight_count = 0;
		for (var i=0; i<self.board_width; i++)
		{
			for (var j=0; j<self.board_height; j++)
			{
				if (self.board[i][j].is_empty())
				{
					var is_all_empty = true;
					for (var k=j+1; k<self.board_height; k++)
					{
						if (!self.board[i][k].is_empty())
						{
							self.tight_total++;
							var temp = self.board[i][j];
							self.board[i][j] = self.board[i][k];
							self.board[i][k] = temp;
							self.board[i][j].dom.animate({
								left: i*UI.MANA_WIDTH, 
								bottom: j*UI.MANA_HEIGHT, 
							}, {
								duration: UI.MANA_FALLING_TIME, 
								complete: function ()
								{
									self.tight_count++;
								}, 
							});
							is_all_empty = false;
							break;
						}
					}
					if (is_all_empty)
					{
						break;
					}
				}
			}
		}
	}
	
	// 將盤面空缺補滿
	self.fit_board = function ()
	{
		self.fit_total = 0;
		for (var i=0; i<self.board_width; i++)
		{
			for (var j=0; j<self.board_height; j++)
			{
				var mana = self.board[i][j];
				if (mana.is_empty())
				{
					mana.reset(self.generate_new_mana());
					set_css(mana.dom, {left: i*UI.MANA_WIDTH, bottom: j*UI.MANA_HEIGHT});
					mana.dom.hide();
					mana.dom.delay(self.fit_total*UI.MANA_FIT_DELAY).fadeIn(UI.MANA_APPEAR_TIME, function ()
					{
						self.fade_finish_count++;
					});
					self.fit_total++;
				}
			}
		}
	}
	
	// 計算連鎖結果
	self.calculate_combo = function ()
	{
		var st = new Date();
		self.combo_result.calc_result(self.board);
		var ed = new Date();
		self.mana_animating = true;
		if (self.combo_result.release_mana.length == 0)
		{
			self.state = STATE.ATTACK;
			self.attacking_state = ATTACKING_STATE.READY;
		}
		else
		{
			self.falling_state = FALLING_STATE.READY;
		}
	}
	
	// 顯示回合改變動畫
	self.set_turn = function (turn)
	{
		self.turn = turn;
		self.turn_div.text(self.turn+UI.BATTLE_TURN_TEXT);
		set_css(self.turn_div, {
			fontSize: '50px', 
		});
		self.turn_div.animate({
			fontSize: '30px', 
		}, {
			duration: UI.BATTLE_TURN_ANIMATE_TIME, 
		});
	}
	
	// 顯示魔力值與動畫
	self.set_mana_count = function (type, num)
	{
		var now = self.mana_count_display[type];
		self.mana_count_table[type] = num;
		self.mana_count_div[type].stop(false, false);
		set_css(self.mana_count_div[type], {
			fontSize: '30px', 
		});
		self.mana_count_div[type].animate({
			fontSize: '30px', 
		}, {
			duration: UI.BATTLE_MANA_COUNT_ANIMATE_TIME, 
			step: function (cur, tween)
			{
				self.mana_count_display[type] = Math.floor(now + (num-now)*tween.pos);
				self.mana_count_div[type].text(MANA.NAME_TABLE[type]+
					': '+self.mana_count_display[type]);
			}, 
		});
	}
	
	// 顯示魔力改變值與動畫
	self.set_mana_plus_count = function (type, num)
	{
		if (num > 0)
		{
			var now = self.mana_plus_count_display[type];
			self.mana_plus_count_table[type] = num;
			self.mana_plus_count_div[type].show();
			self.mana_plus_count_div[type].stop(false, false);
			set_css(self.mana_plus_count_div[type], {
				fontSize: '50px', 
			});
			self.mana_plus_count_div[type].animate({
				fontSize: '30px', 
			}, {
				duration: UI.BATTLE_MANA_PLUS_COUNT_ANIMATE_TIME, 
				step: function (cur, tween)
				{
					self.mana_plus_count_display[type] = Math.floor(now + (num-now)*tween.pos);
					self.mana_plus_count_div[type].text(' +'+self.mana_plus_count_display[type]);
				}, 
			});
		}
		else
		{
			self.mana_plus_count_table[type] = 0;
			self.mana_plus_count_display[type] = 0;
			self.mana_plus_count_div[type].fadeOut(UI.BATTLE_MANA_PLUS_COUNT_FADEOUT_TIME, function ()
			{
				self.mana_plus_count_div[type].text(' +0');
			});
		}
	}
	
	// 顯示 combo 字樣
	self.set_combo = function (combo)
	{
		self.combo = combo;
		if (combo > 0)
		{
			self.combo_div.show();
			self.combo_div.text(combo+UI.BATTLE_COMBO_TEXT);
			if (is_animating(self.combo_div))
			{
				self.combo_div.stop(false, false);
			}
			var size = (25+(self.combo*3));
			var val = 255-combo*16;
			if (val < 0)
			{
				val = 0;
			}
			var s = Math.floor(val/16).toString(16)+(val%16).toString(16);
			var color = '#FF'+s+s;
			set_css(self.combo_div, {
				fontSize: (size*1.5)+'px', 
				color: color, 
			});
			self.combo_div.animate({
				fontSize: size+'px', 
			}, {
				duration: UI.BATTLE_COMBO_ANIMATE_TIME, 
			});
		}
		else
		{
			self.combo_div.fadeOut(UI.BATTLE_COMBO_FADEOUT_TIME);
		}
	}
	
	// 設定盤面是否可動作。傳入 true 時強制結束拖曳並鎖死盤面
	self.set_board_mask = function (mask)
	{
		self.mask = mask;
		if (is_animating(self.board_mask_div))
		{
			self.board_mask_div.stop(false, false);
		}
		if (mask)
		{
			self.mup();
			self.board_mask_div.fadeTo(UI.MANA_MASK_FADEIN_TIME, UI.MANA_MASK_FADEIN_ALPHA);
		}
		else
		{
			self.board_mask_div.fadeOut(UI.MANA_MASK_FADEOUT_TIME);
		}
	}
	
	// 敵攻擊時的處理
	self.enemy_do_attack = function (dmg)
	{
		self.set_hero_hp(limit(self.hero_hp-dmg, 0, self.hero_hp_max));
		shake({
			target: battle_main, 
			strength: 16, 
			duration: 60, 
			times: 1, 
		});
	}
	
	// 判斷是否己方全滅
	self.is_game_over = function ()
	{
		return self.hero_hp <= 0;
	}
	
	// 判斷是否已通過所有關卡
	self.is_stage_clear = function ()
	{
		return self.round > self.stage.round_count;
	}
	
	// 滑鼠移動callback
	self.mmove = function (event)
	{
		// 正在拖曳時才關心滑鼠移動
		if (self.dragging)
		{
			var tx = event.pageX-self.orig_page_x;
			var ty = event.pageY-self.orig_page_y;
			var new_x = self.start_x+tx;
			var new_y = self.start_y-ty;
			// 讓珠子跟隨滑鼠位置
			set_css(self.dragging.dom, {left: new_x, bottom: new_y, });
			new_x += UI.MANA_WIDTH/2;
			new_y += UI.MANA_HEIGHT/2;
			var dx = 0;
			var dy = 0;
			// 計算是否該和其它珠子交換、以及和誰交換
			if (self.current_x > 0
				&& new_x < self.range_x - UI.MANA_WIDTH*UI.MANA_DIAG_AREA_RATE)
			{
				dx = -1;
			}
			else if (self.current_x < self.board_width-1
				&& new_x > self.range_x + UI.MANA_WIDTH*(1+UI.MANA_DIAG_AREA_RATE))
			{
				dx = 1;
			}
			if (dx != 0)
			{
				// 斜轉判定：在 x 達標時若 y 超過較鬆懈的斜轉判定線，就認定為斜轉成功
				if (self.current_y > 0 
					&& new_y < self.range_y)
				{
					dy = -1;
				}
				else if (self.current_y < self.board_height-1 
					&& new_y > self.range_y + UI.MANA_HEIGHT)
				{
					dy = 1;
				}
			}
			else
			{
				if (self.current_y > 0 
					&& new_y < self.range_y - UI.MANA_HEIGHT*UI.MANA_DIAG_AREA_RATE)
				{
					dy = -1;
				}
				else if (self.current_y < self.board_height-1 
					&& new_y > self.range_y + UI.MANA_HEIGHT*(1+UI.MANA_DIAG_AREA_RATE))
				{
					dy = 1;
				}
				// 斜轉補判：在 y 達標時若 x 超過較鬆懈的斜轉判定線，就認定為斜轉成功
				if (dy != 0)
				{
					if (self.current_x > 0 
						&& new_x < self.range_x)
					{
						dx = -1;
					}
					else if (self.current_x < self.board_width-1 
						&& new_x > self.range_x + UI.MANA_WIDTH)
					{
						dx = 1;
					}
				}
			}
			// 如果有交換判定的話，進行交換的動畫與處理
			if (dx || dy)
			{
				self.drag_moved = true;
				tx = self.current_x+dx;
				ty = self.current_y+dy;
				self.board[tx][ty].dom.animate({
					left: self.range_x+'px', 
					bottom: self.range_y+'px', 
				}, {
					duration: 150, 
				});
				self.board[self.current_x][self.current_y] = self.board[tx][ty];
				self.board[tx][ty] = self.dragging;
				self.current_x += dx;
				self.current_y += dy;
				self.range_x += UI.MANA_WIDTH * dx;
				self.range_y += UI.MANA_HEIGHT * dy;
			}
		}
	}
	
	// 滑鼠於珠子上按下時的callback
	self.mdown_on_mana = function (event)
	{
		if (self.state == STATE.PREPARE)
		{
			var x = parseInt($(event.target).css('left'))/UI.MANA_WIDTH;
			var y = parseInt($(event.target).css('bottom'))/UI.MANA_HEIGHT;
			self.dragging = self.board[x][y];
			self.start_x = x*UI.MANA_WIDTH;
			self.start_y = y*UI.MANA_HEIGHT;
			self.current_x = x;
			self.current_y = y;
			self.range_x = x*UI.MANA_WIDTH;
			self.range_y = y*UI.MANA_HEIGHT;
			self.orig_page_x = event.pageX;
			self.orig_page_y = event.pageY;
			self.drag_moved = false;
		}
	}
	
	// 滑鼠拖曳放開時的callback
	self.mup = function (event)
	{
		if (self.dragging)
		{
			self.heal = 0;
			set_css(self.dragging.dom, {
				left: self.current_x*UI.MANA_WIDTH, 
				bottom: self.current_y*UI.MANA_HEIGHT, 
			});
			self.dragging = null;
			if (self.drag_moved)
			{
				self.combo_result = ComboResult();
				self.state = STATE.CALC_RESULT;
				self.mana_animating = false;
			}
		}
	}
	
	return self;
}
