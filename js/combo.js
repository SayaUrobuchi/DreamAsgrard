
function ComboResult ()
{
	var self = {};
	
	CONNECT_TABLE = [
		{x: 0, y: -1, }, 
		{x: 0, y: 1, }, 
		{x: -1, y: 0, }, 
		{x: 1, y: 0, }, 
	];
	
	self.combo = 0;
	self.combo_table = {
		1: 0, 
		2: 0, 
		3: 0, 
		4: 0, 
		5: 0, 
		6: 0, 
	};
	self.mana_release_table = clone_hash(self.combo_table);
	self.max_mana_release_table = clone_hash(self.combo_table);
	self.color_combo_table = {};
	for (var i=1; i<=6; i++)
	{
		self.color_combo_table[i] = [];
	}
	
	self.calc_result = function (board)
	{
		var height = board.length;
		var width = board[0].length;
		// mark first, do not floodfill now!! (avoid bug
		for (var i=0; i<height; i++)
		{
			for (var j=0; j<width; j++)
			{
				if (j+2 < width 
					&& board[i][j].type == board[i][j+1].type 
					&& board[i][j].type == board[i][j+2].type)
				{
					for (var k=j; k<width; k++)
					{
						if (board[i][k].type != board[i][j].type)
						{
							break;
						}
						board[i][k].mark_release = true;
					}
				}
				if (i+2 < height 
					&& board[i][j].type == board[i+1][j].type 
					&& board[i][j].type == board[i+2][j].type)
				{
					for (var k=i; k<height; k++)
					{
						if (board[k][j].type != board[i][j].type)
						{
							break;
						}
						board[k][j].mark_release = true;
					}
				}
			}
		}
		self.release_mana = [];
		var combo = 0;
		// floodfill all mark
		for (var i=0; i<height; i++)
		{
			for (var j=0; j<width; j++)
			{
				if (board[i][j].mark_release && !board[i][j].mark_delete)
				{
					combo++;
					var queue = [{x: i, y: j, }];
					board[i][j].mark_delete = combo;
					var type = board[i][j].type;
					for (var p=0; p<queue.length; p++)
					{
						var x = queue[p].x;
						var y = queue[p].y;
						for (var k=0; k<CONNECT_TABLE.length; k++)
						{
							var tx = x+CONNECT_TABLE[k].x;
							var ty = y+CONNECT_TABLE[k].y;
							if (tx >= 0 && tx < height
								&& ty >= 0 && ty < width)
							{
								if (board[tx][ty].type == type 
									&& board[tx][ty].mark_release
									&& !board[tx][ty].mark_delete)
								{
									board[tx][ty].mark_delete = combo;
									queue.push({x: tx, y: ty, });
								}
							}
						}
					}
					var release = queue.length;
					self.release_mana.push(queue);
					self.combo_table[type]++;
					self.color_combo_table[type].push(release);
					self.mana_release_table[type] += release;
					self.max_mana_release_table[type] = max(self.max_mana_release_table[type], release);
				}
			}
		}
		self.combo += combo;
		//log(LOG_DEV, self.combo);
		//console.log(self.combo_table);
		//console.log(self.mana_release_table);
	}
	
	return self;
}
