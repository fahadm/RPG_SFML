/**
* Script: control.js
* Written by: Radnen
* Updated: 8/24/2010
**/

/**
* Abstract base Control object:
**/
function Control(parent, x, y, w, h) {
	// parent control reference:
	this.parent = parent;
	
	// events:
	this.onResize    = function(){};
	this.onPaint     = function(){};
	this.onClick     = function(){};
	this.onMouseUp   = new Event(this);
	this.onMouseMove = function(){};
	this.onMouseHold = function(){};
	this.onEnter     = function(){};
	this.onLeave     = function(){};
	this.onFocus     = function(){};
	this.onDefocus   = function(){};
	
	// position:
	this.x = 0;
	this.y = 0;
	
	var _w = w;
	var _h = h;
	this.__defineGetter__("w", function() { return _w; });
	this.__defineSetter__("w", function(n) { _w = n; this.onResize(); });
	this.__defineGetter__("h", function() { return _h; });
	this.__defineSetter__("h", function(n) { _h = n; this.onResize(); });
	
	// offset:
	this.xx = x;
	this.yy = y;
	this.ww = 0;
	this.hh = 0;
	
	this.name = "";
	
	// focus:
	this.focused = false;
	this.entered = false;
	var _focused_control = null;
	this.__defineGetter__("focusedControl", function() { return _focused_control; });
	this.__defineSetter__("focusedControl", function(a) {
		if (a === null && _focused_control != null) {
			_focused_control.focused = false;
			_focused_control.focusedControl = null;
		}
		else if (a !== null) {
			_focused_control = a;
			a.focused = true;
		}
	});
	
	this.updateMouse = function() {
		if (Cursor.isWithin(this.x, this.y, _w, _h)) {
			if (Cursor.onLeftClick() && !this.focused)
			{
				this.focused = true;
				if (this.parent != null)
					this.parent.focusedControl = this;
				this.onFocus();
			}
			
			if (!this.entered) {
				this.entered = true;
				this.onMouseMove();
				this.onEnter();
			}
			
			if (Cursor.onMove()) this.onMouseMove();
			
			if (!this.focused) return;
			if (Cursor.onLeftClick()) this.onClick();
			if (Cursor.onLeftHold()) this.onMouseHold();
			if (Cursor.onLeftUp()) this.onMouseUp.execute();
		}
		else if (this.entered) { this.entered = false; this.onLeave(); }
		else if (Cursor.onLeftClick() && this.focused) { this.focused = false; this.onDefocus(); }
	}
}