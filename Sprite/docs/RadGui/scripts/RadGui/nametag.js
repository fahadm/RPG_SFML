/* NameTag Object */

function NameTag(parent, text, width)
{
	this.parent = parent;
	this.text = text;
	this.lines = [];
	this.w = 0;
	this.h = 0;
	this.edit;
	this.onEdit = function() {};
	
	// draws multi-line, look at drawLine for non-multi.
	this.draw = function(x, y, center) {
		var time = new Date();
		time = time.getMilliseconds();
		var sw = 0;
		var i = this.lines.length;
		if (this.edit) OutlinedRectangle((center) ? x - this.w/2 : x, y, this.w, this.h, Colors.Black);
		while(i--) {
			if (center) sw = System.textFont.getStringWidth(this.lines[i])/2;
			System.textFont.drawText(x-sw, y+i*16, this.lines[i]);
			if (this.edit && i == this.lines.length-1) {
				if (time >= 500) System.textFont.drawText(x+sw, y+i*16, "|");
			}
		}
		
		this.update(x, y, this.w, this.h);
	}
	
	// same as draw but not multi-line.
	this.drawLine = function(x, y) {
		var time = new Date();
		var sw = System.textFont.getStringWidth(this.text);
		if (this.edit) OutlinedRectangle(x, y, sw+6, 16, Colors.Black);
		System.textFont.drawText(x, y, this.text);
		if (time.getMilliseconds() > 500 && this.edit) System.textFont.drawText(x+1+sw, y, "|");
		this.update(x, y, sw, 16);
	}
	
	this.drawGhost = function(x, y, center) {
		var sw;
		System.textFont.setColorMask(Colors.Clear);
		for (var i = 0; i < this.lines.length; ++i) {
			if (center) sw = System.textFont.getStringWidth(this.lines[i])/2;
			System.textFont.drawText(x-sw, y+i*16, this.lines[i]);
		}
		System.textFont.setColorMask(Colors.White);	
	}
	
	this.update = function(x, y, w, h) {
		if (this.edit) {
			while(AreKeysLeft()) {
				var key = GetKey();
				switch (key) {
					case KEY_ENTER: this.edit = false; break;
					case KEY_BACKSPACE: this.text = this.text.substr(0, this.text.length-1); break;
					default: this.text += GetKeyString(key, IsKeyPressed(KEY_SHIFT)); break;
				}
				
				this.setText(this.text, this.w);
			}
		}
		
		if (Cursor.isWithin(x, y, w, h))
			if (Cursor.onSlowLeftDblClick()) this.edit = true;
		if (Cursor.onLeftClick()) this.edit = false;	
	}
	
	this.setText = function(text, w) {
		this.text = text;
		if (w) this.w = w;
		else this.w = System.textFont.getStringWidth(text);
		this.lines = System.textFont.wordWrapString(text, this.w);
		this.h = this.lines.length*16;
		this.onEdit();
	}

	this.setText(text, width);
}