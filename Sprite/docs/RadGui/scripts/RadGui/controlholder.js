/**
* Script: controlholder.js
* Written by: Radnen
* Updated: 8/23/2010
**/

/**
* Control Holder Object:
*  - holds gui components within its bounds.
*    you generally only need it once per "menu".
**/
function ControlHolder(x, y, w, h)
{
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	
	this.controls = [];
	
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
	
	this.update = function() {
		Utility.call(this.controls, "update");
	}
	
	this.draw = function() {
		Utility.call(this.controls, "draw");
	}
}