
function SceneMaid ()
{
	var self = {};
	
	self.stack = [];
	self.length = 0;
	
	self.push = function (scene, call_start)
	{
		self.stack.push(scene);
		if (call_start)
		{
			scene.start();
		}
		self.length++;
	}
	
	self.pop = function (call_deinit)
	{
		if (self.length > 0)
		{
			var obj = self.stack.pop();
			if (call_deinit)
			{
				obj.deinit();
			}
			self.length--;
			return obj;
		}
		return null;
	}
	
	self.update = function ()
	{
		for (var i=0; i<self.stack.length; i++)
		{
			self.stack[i].update();
		}
	}
	
	self.current = function ()
	{
		return self.stack[self.length-1];
	}
	
	self.key_up = function (e)
	{
		if (self.current().key_up)
		{
			return self.current().key_up(e);
		}
		return false;
	}
	
	self.key_down = function (e)
	{
		if (self.current().key_down)
		{
			return self.current().key_down(e);
		}
		return false;
	}
	
	self.key_press = function (e)
	{
		if (self.current().key_press)
		{
			return self.current().key_press(e);
		}
		return false;
	}
	
	self.right_click = function (e)
	{
		if (e.button == MOUSE_RIGHT)
		{
			if (self.current().right_click)
			{
				return self.current().right_click(e);
			}
		}
		return false;
	}
	
	return self;
}
