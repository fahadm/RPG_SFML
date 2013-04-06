/**
* Script: listbox.js
* Written by: Radnen
* Updated: 8/22/2010
**/

function ListBox(parent)
{
	this.inherit = Control;
	this.inherit(parent, 0, 0, 80, 120);	
	
	this.useWindow = false;
	this.arrow = NULL;
	this.selector = System.highlight;
	
	this.controls = [];
	
	var updated = false;
	this.updatePositions = function() {
		var h = 4;
		Utility.foreach(this.controls, function(control, base) {
			if (base.arrow) control.xx = base.arrow.width;
			else control.xx = 6;
			control.yy = h;
			control.w = base.w-8;
			h += control.h+4;
		}, this);
		updated = true;
	}
	
	this.draw = function() {
		this.x = this.parent.x + this.xx;
		this.y = this.parent.y + this.yy;
		if (this.lockWidth)  this.w = this.parent.w - this.ww;
		if (this.lockHeight) this.h = this.parent.h - this.hh;
		
		if (!this.updated) this.updatePositions();
		
		SetClippingRectangle(this.x, this.y, this.w, this.h);
		if (this.useWindow) System.menuWindow.drawWindow(this.x, this.y, this.w, this.h);
		
		if (this.entered && this.focused) {
			Utility.foreach(this.controls, function(ctrl, base) {
				if (Cursor.isWithin(ctrl.x, ctrl.y, base.w, ctrl.h))
					base.selector.drawWindow(base.x+4, ctrl.y, base.w-8, ctrl.h);
			}, this);
		}
		
		Utility.call(this.controls, "draw");
		
		SetClippingRectangle(0, 0, SW, SH);
	}
	
	this.update = function() {
		this.updateMouse();
		
		if (this.parent.focusedControl == this)
			Utility.call(this.controls, "update");
	}
	
	this.addText = function(text, callback) {
		var label = new Label(this, text);
		label.onMouseUp.add(function() {
			Audio.playSound(System.clickSnd);
		});
		label.onMouseUp.add(callback);
		label.onEnter = function() {
			Audio.playSound(System.selectSnd);
		}
		this.controls.push(label);
	}
	
	this.addButton = function(image1, callback, image2) {
		var button = new Button(this, 0, 0, image1, image2);
		button.onMouseUp.add(callback);
		this.controls.push(button);
	}
}