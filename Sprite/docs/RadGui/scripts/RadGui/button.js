/**
* Script: button.js
* Written by: Radnen
* Updated: 8/23/2010
**/

function Button(parent, x, y, img, img2)
{
	this.inherit = Control;
	
	var w = 0, h = 0;
	var down = false;
	var _enabled = true;
	var use_windows = false;
	
	this.text = "";
	if (typeof img == "string") {
		this.text = img;
		w = System.textFont.getStringWidth(img);
		h = System.textFont.getHeight();
		use_windows = true;
	}
	else { w = img.width; h = img.height; }
	
	this.inherit(parent, x, y, w, h);
	
	this.onClick = function() {};
	this.highlight = false;
	this.image = img;
	this.imageOver = img2;
	this.rightAnchor = false;
	this.cursorInside = false;
	this.mask = Colors.White;
	this.checked = false;
	this.canCheck = false;
	this.textOnly = false;
		
	this.__defineGetter__("enabled", function() { return _enabled;});
	this.__defineSetter__("enabled", function(n) {
		_enabled = n;
		if (n) this.mask = Colors.White;
		else this.mask = Colors.DarkGray;
	});
	
	this.draw = function() {
		if (this.rightAnchor) this.x = this.parent.x + this.parent.w + this.xx;
		else this.x = this.parent.x + this.xx;
		
		this.y = this.parent.y + this.yy;
		
		if (this.checked && this.highlight && _enabled)
			System.selected.drawWindow(this.x, this.y, this.w, this.h);
		
		if (this.entered && this.highlight && !this.checked && _enabled)
			System.highlight.drawWindow(this.x, this.y, this.w, this.h);
		
		if (down) {
			if (use_windows) { if (!this.textOnly) System.btndn.drawWindow(this.x, this.y, this.w, this.h); }
			else {
				if (this.imageOver != undefined)
					this.imageOver.blitMask(this.x, this.y, this.mask);
				else this.image.blitMask(this.x, this.y, this.mask);
			}
		} else {
			if (use_windows) {
				if (!this.textOnly) {
					if (this.entered) System.btnov.drawWindow(this.x, this.y, this.w, this.h);
					else System.btnup.drawWindow(this.x, this.y, this.w, this.h);
				}
			}
			else this.image.blitMask(this.x, this.y, this.mask);
		}
		
		if (use_windows) System.textFont.drawText(this.x, this.y, this.text);
	}
	
	this.update = function() {
		this.updateMouse();
		
		if (this.parent.focusedControl == this) {
			down = (Cursor.onLeftHold() && _enabled && this.entered);
		}
	}
		
	this.onMouseUp.add(function() {
		if (_enabled) {
			if (this.canCheck) this.checked = !this.checked;
			down = false;
		}
	});
}