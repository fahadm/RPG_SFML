/**
* Script: panel.js
* Written by: Radnen
* Updated: 8/22/2010
**/

/**
* Panel([parent], x, y, w, h);
*  - parent: if null, it will act as a 'base' control whereby other controls can
*            be added to. Nesting a panels parent with another panel is possible.
*  - other params: size and location.
**/
function Panel(parent, x, y, w, h)
{
	this.inherit = Control;
	this.inherit(parent, x, y, w, h);
	
	this.lockWidth = false;
	this.lockHeight = false;

	this.backColor = NULL;   // if not null, will draw this color as a rectangle.
	this.useWindow = false;
	
	this.focusedControl = null;
	this.controls = [];
	
	/**
	* update();
	*  - updates this control along with other sub-controls update methods.
	**/
	this.update = function() {
		this.updateMouse();
		
		if (this.parent.focusedControl == this)
			Utility.call(this.controls, "update");
	}
	
	/**
	* draw();
	*  - handles drawing of this control and its sub-controls.
	**/
	this.draw = function() {
		if (this.parent) {
			this.x = this.parent.x + this.xx;
			this.y = this.parent.y + this.yy;
			if (this.lockWidth) this.w = this.parent.w - this.ww;
			if (this.lockHeight) this.h = this.parent.h - this.hh;			
		}
		
		if (this.useWindow) System.menuWindow.drawWindow(this.x, this.y, this.w, this.h);
		if (this.backColor != NULL) Rectangle(this.x, this.y, this.w, this.h, this.backColor);		
		this.onPaint();
		Utility.call(this.controls, "draw");
	}
}