/**
* Script: contextmenu.js
* Written by: Radnen
* Updated: 8/23/2010
**/

function ContextMenu(x, y)
{
	this.x = x || 0; 
	this.y = y || 0;
	this.w = 80; this.h = 0;
	this.time = 0;
	this.msecs = 120;
	this.color = CreateColor(255, 255, 255, 0);
	this.font = System.itemFont;
	this.index = -1;
	this.barColor = Colors.ClearBlue;
	this.items = [];
	this.faded = false;
	this.on = false;
	this.isOpen = false;
	this.cursorInside = false;
	
	this.addItem = function(name, call) {
		this.items.push({name: name, call: call});
		this.h += 18;
	}
	
	this.show = function(x, y) {
		if (this.isOpen) return;
		this.x = x;
		this.y = y;
		this.time = GetTime();
		this.color.alpha = 0;
		this.faded = false;
		this.on = true;
		this.isOpen = true;
	}
	
	this.hide = function() {
		if (!this.isOpen) return;
		this.time = GetTime();
		this.color.alpha = 255;
		this.faded = true;
		this.isOpen = false;
	}
	
	this.draw = function() {
		if (!this.on) return;
		this.cursorInside = Cursor.isWithin(this.x-2, this.y-2, this.w+4, this.h+4);
		System.basicWindow.setColorMask(this.color);
		System.basicWindow.drawWindow(this.x, this.y, this.w, this.h);
		System.basicWindow.setColorMask(Colors.White);
		
		var i = this.items.length;
		if (this.index != -1 && i != 0) {
			if (this.items[this.index].name != "#div")
				System.selected.drawWindow(this.x + 2, this.y + 2 + (this.index * 18), this.w-4, 14);
		}

		System.textFont.setColorMask(this.color);
		while (i--) {
			if (this.items[i].name == "#div")
				Rectangle(this.x+2, this.y+9+i*18, this.w-4, 2, Colors.Gray);
			else System.textFont.drawText(this.x+2, this.y+2+i*18, this.items[i].name);
			
			if (this.cursorInside) {
				if (Cursor.isWithin(this.x, this.y+i*18, this.w, 18)) this.index = i;
			}
		}
		System.textFont.setColorMask(Colors.White);
	
		if (!this.cursorInside) this.index = -1;
		else if (Cursor.onLeftClick()) {
			if (this.items[this.index].name != "#div") {
				this.items[this.index].call();
				this.cursorInside = this.on = false;
			}
		}
		this.updateFade();
	}
	
	this.updateFade = function() {
		if (!this.faded) {
			if (this.time + System.tipFadeTime > GetTime()) {
				this.color.alpha = (GetTime() - this.time) * 255/System.tipFadeTime;
			}
			else if (this.time != 0) {
				this.time = 0;
				this.color.alpha = 255;
			}
		}
		else {
			if (this.time + System.tipFadeTime > GetTime()) {
				this.color.alpha = 255 - (GetTime() - this.time) * 255/System.tipFadeTime;
			}
			else if (this.time != 0) {
				this.time = 0;
				this.color.alpha = 0;
				this.on = false;
			}
		}
	}
	
	this.isCursorInside = function() {
		return this.cursorInside;
	}
}