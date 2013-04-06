/**
* Script: toolbar.js
* Written by: Radnen
* Updated: 8/17/2010
**/

function ToolStrip(parent)
{
	this.parent = parent;
	this.xx = 0;
	this.yy = 0;
	
	this.w = parent.w;
	this.h = 24;
	
	var x = this.parent.x + this.xx;
	var y = this.parent.y + this.yy;
	
	this.linkWidth = true;
	this.backColor = CreateColor(222, 226, 228);
	
	this.controls = [];
	
	this.addButton = function(name, image, callback) {
		var btn = new Button(this, 4+ this.controls.length*24, 4, image);
		btn.onMouseUp.add(callback);
		btn.highlight = true;
		btn.canCheck = true;
		this.controls.push(btn);
		return btn;
	}
	
	this.draw = function() {
		this.x = this.parent.x + this.xx;
		this.y = this.parent.y + this.yy;
		if (this.linkWidth) this.w = this.parent.w;
		
		Rectangle(this.x, this.y, this.w, this.h, this.backColor);
		Call(this.controls, "draw");
	}
	
	this.update = function() {		
		Call(this.controls, "update");
	}
	
	this.select = function(num) {
		this.controls[num].selected = true;
	}
	
	// deselects a range of controls, or all of not specified.
	this.deselect = function(array) {
		if (array != undefined) {
			foreach(array, function(i, base) {
				base.controls[i].checked = false;
			}, this);
		}
		else {
			foreach(this.controls, function(item) {
				item.checked = false;
			});
		}
	}
}