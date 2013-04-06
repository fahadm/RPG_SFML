/**
* Script: dropdown.js
* Written by: Radnen
* Updated: 8/23/2010
**/

function DropDown(parent, x, y, w, h)
{
	this.inherit = Control;
	this.inherit(parent, x, y, w, h);
	
	this.lockWidth = false;
	this.drawDrop = false;
	var fh = 0;
	
	// array of strings:
	this.items = [];
	
	this.update = function() {
		this.updateMouse();
		
		if (this.parentControl == this)
			var fh = System.textFont.getHeight();
	}
	
	this.draw = function() {
		this.x = this.parent.x + this.xx;
		this.y = this.parent.y + this.yy;
		if (this.lockWidth) this.w = this.parent.w - this.ww;
		
		if (this.drawDrop) {
			foreach(this.items, function(item, base) {
				System.textFont.drawText(base.xx, base.yy+i*fh, item);
			}, this);
		}
	}
}