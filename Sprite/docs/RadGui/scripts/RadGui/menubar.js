/**
* Script: menubar.js
* Written by: Radnen
* Updated: 8/14/2010
**/

function MenuBar(parent)
{
	this.inherit = Control;
	this.inherit(parent, 0, 0, parent.w, 18);
	
	var active = false;

	this.dock = TOP;
	this.items = [];
	
	var test = new MenuBarItem(this, "File");
	test.addSubItem("New", function(){});
	test.addSubItem("Open", function(){});
	test.addSubItem("#div");
	test.addSubItem("Close", function(){ parent.close(); });
	
	this.items.push(test);
	this.items.push(new MenuBarItem(this, "Edit"));
	this.items.push(new MenuBarItem(this, "Help"));
	
	this.name = "menu";
	this.lockWidth = true;
	
	this.onDefocus = function() {
		foreach(this.items, function(item) { item.dropDown.hide(); });
	}
	
	this.draw = function() {
		this.x = this.parent.x + this.xx;
		this.y = this.parent.y + this.yy;
		if (this.lockWidth) this.w = this.parent.w - this.ww;
		
		System.bar.drawWindow(this.x, this.y, this.w, this.h);
		var index = 0;
		foreach(this.items, function(item, me) {
			item.draw(me.x + index * (item.w + 8), me.y);
			index++;
		}, this);
	}
	
	this.update = function() {
		this.updateMouse();
		
		if (this.parent.focusedControl == this) {
			var index = 0;
			foreach(this.items, function(item, me) {
				item.update(me.x + index * (item.w + 8), me.y);
				index++;
			}, this);
		}
	}
}

function MenuBarItem(parent, text)
{
	this.parent = parent;
	this.text = text;
	this.w = System.textFont.getStringWidth(text);
	this.dropDown = new DropDown();
	this.enter = false;
	this.cursorInside = false;
	
	this.addSubItem = function(name, call) {
		this.dropDown.addItem(name, call);
	}
	
	this.draw = function(x, y) {
		if (!this.parent.focused) this.dropDown.hide();

		if (this.dropDown.isOpen)
			System.selected.drawWindow(x+2, y+2, this.w, this.parent.h-6);
		else if (this.cursorInside)
			System.highlight.drawWindow(x+2, y+2, this.w, this.parent.h-6);
	
		System.textFont.drawText(x+2, y+2, this.text);
		this.dropDown.draw();
	}
	
	this.update = function(x, y) {
		this.cursorInside = Cursor.isWithin(x, y, this.w+4, this.parent.h);	
		if (this.cursorInside) {
			if (!this.enter) this.enter = true;
			if (Cursor.onLeftClick()) this.dropDown.show(x, y + this.parent.h);
		}
		else if (this.enter && !this.dropDown.isCursorInside() || !this.parent.focused) {
			if (Cursor.onLeftClick()) { this.enter = false; this.dropDown.hide(); }
		}
	}
}