/* Statusbar Control */

function StatusBar(parent)
{
	this.inherit = Control;
	this.inherit(parent, 0, 0, 0, 20);

	this.dock = BOTTOM;
	this.controls = [];
	
	this.lockWidth = true;
	this.anchorBottom = true;
	var resize = false;
	
	this.name = "status";
	
	this.draw = function() {
		this.x = parent.x + this.xx;
		this.y = parent.y + this.yy;
		
		if (this.lockWidth) this.w = this.parent.w - this.ww;
		if (this.anchorBottom) this.yy = this.parent.h - this.h;
		
		System.bar.drawWindow(this.x, this.y, this.w, this.h);
		System.barHandle.blit(this.x+this.w-20, this.y);
		
		SetClippingRectangle(this.x, this.y, this.w-24, this.h);
		Call(this.controls, "draw");
		SetClippingRectangle(0, 0, SW, SH);
	}
	
	this.update = function() {
		this.updateMouse();
		
		if (this.parent.focusedControl != this) return;
		if (Cursor.isWithin(this.x+this.w-20, this.y, 20, 20) || resize) {
			if (Cursor.onLeftHold()) {
				this.parent.resize(Cursor.x+10, Cursor.y+10);
				resize = true;
			}
			else resize = false;
		}
		Call(this.controls, "update");
	}
}