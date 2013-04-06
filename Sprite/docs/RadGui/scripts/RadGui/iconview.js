/* Icon View Control */

function IconView(parent)
{
	this.inherit = Panel;
	this.inherit(parent);
	this.icons = [];
	this.sel = -1;
	this.cursorInside = false; // used for draw loop
	this.cursorWithin = false; // used for update loop
	this.left = false;
	this.enter = false;
	this.lineColor = CreateColor(65, 150, 190);
	
	this.draw = function() {
		this.x = this.parent.x + this.xx;
		this.y = this.parent.y + this.yy;
		if (this.lockWidth) this.w = this.parent.w - this.ww;
		if (this.lockHeight) this.h = this.parent.h - this.hh;
		
		this.cursorInside = Cursor.isWithin(this.x, this.y, this.w, this.h);
		SetClippingRectangle(this.x, this.y, this.w, this.h);
		
		if (this.parent.focusedControl == this) OutlinedRectangle(this.x, this.y, this.w, this.h, this.lineColor);
		
		if (this.icons.length > 0) {
			Line(this.x, this.y, this.x+this.w, this.y, this.lineColor);
			if (this.parent.focusedControl == this && this.sel != -1)
				Rectangle(this.x, this.y+this.sel*36, this.w, 37, Colors.ClearBlue);
		}
		
		var i = this.icons.length;
		var d = 0;
		while(i--) {
			this.icons[i].image.blit(this.x+2, this.y+2+(d = i*36));
			this.icons[i].nameTag.drawLine(this.x+36, this.y+12+d);
			Line(this.x, this.y+36+d, this.x+this.w, this.y+36+d, this.lineColor);			
		}
		
		if (this.cursorInside) {
			if (!this.enter) { this.left = false; this.enter = true; Cursor.dropable = true; }
			if (Cursor.onLeftUp() && Cursor.drop) {
				Cursor.dropable = false;
				this.icons.push(Desktop.currentObj);
				Desktop.currentObj = NULL;
			}
		}
		else if (!this.left) { this.enter = false; this.left = true; Cursor.dropable = false; }
		SetClippingRectangle(0, 0, SW, SH);
	}
	
	this.update = function() {
		this.updateMouse();
		
		if (this.parent.focusedControl == this) {
			var i = this.icons.length;
			this.sel = -1;
			while(i--)
				if (Cursor.isWithin(this.x, this.y+i*36, this.w, 36)) this.sel = i;
			
			if (Cursor.onLeftDoubleClick() && this.sel >= 0)
				this.icons[this.sel].onLeftDoubleClick();
		}
	}
}