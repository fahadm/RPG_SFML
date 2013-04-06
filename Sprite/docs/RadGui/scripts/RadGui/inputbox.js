/**
* Script: inputbox.js
* Written by: Radnen
* Updated: 8/23/2010
**/

function InputBox(parent, x, y, w, h)
{
	this.inherit = Control;
	this.inherit(parent, x, y, w, h);
	
	this.text = "";
	
	var draw_cursor = false;
	this.draw = function() {
		this.x = this.parent.x + this.xx;
		this.y = this.parent.y + this.yy;
		
		Rectangle(this.x, this.y, this.w, this.h, Colors.white);
		
		if (this.focused)
			OutlinedRectangle(this.x, this.y, this.w, this.h, Colors.blue);
		else
			OutlinedRectangle(this.x, this.y, this.w, this.h, Colors.black);
		
		System.textFont.drawText(this.x+2, this.y+1, this.text);
		
		if (draw_cursor) {
			var time = new Date();
			if (time.getMilliseconds() > 500)
				System.textFont.drawText(this.x+System.textFont.getStringWidth(this.text)+2, this.y+1, "|");
		}
	}
	
	this.update = function() {
		this.updateMouse();
		
		draw_cursor = (this.parent.focusedControl == this);
	}
	
	this.doInput = function(key) {
		if (this.parent.focusedControl == this) {
			switch (key) {
				case KEY_BACKSPACE: this.text = this.text.substr(0, this.text.length-1); break;
				default:
					if (System.textFont.getStringWidth(this.text + 15) > this.w) return;
					this.text += GetKeyString(key, IsKeyPressed(KEY_SHIFT));
				break;
			}
		}
	}
}