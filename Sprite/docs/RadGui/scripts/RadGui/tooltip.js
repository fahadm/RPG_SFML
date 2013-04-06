/**
* Script: tooltip.js
* Written by: Radnen
* Updated: 8/13/2010
**/

// text is what to show.
// w is width. if width is less than text,
// it'll word-wrap and multi-line. If not
// specified, it'll be the width of the text.
function Tooltip(text, w)
{
	this.x = 0;
	this.y = 0;

	if (w === undefined)
		this.w = System.textFont.getStringWidth(text) + 4;
	else this.w = w;

	this.fh = 0;
	this.h = 16;
	this.textLines = System.textFont.wordWrapString(text, this.w);
	this.color = CreateColor(255, 255, 255, 0);
	this.faded = false;
	this.time = GetTime();
	this.on = false;
	
	// used to set the text, and if so readjust the tooltip width.
	this.setText = function(text, w) {
		if (w === undefined)
			this.w = System.textFont.getStringWidth(text) + 4;
		else this.w = w;
		this.textLines = System.textFont.wordWrapString(text, this.w-4);
	}
	
	// initializes the showing of the tooltip at the specfied location.
	this.show = function(x, y) {
		this.x = x;
		this.y = y;
		this.fh = System.textFont.getHeight();
		this.h = this.fh * this.textLines.length + 4;
		this.time = GetTime();
		this.color.alpha = 0;
		this.faded = false;
		this.on = true;
	}
	
	// shows the tooltip, but with respect to the cursor.
	this.showAtCursor = function() {
		this.show(Cursor.x + System.cursorImg.width+3, Cursor.y+System.cursorImg.height+3);
	}
	
	// initializes the hiding of the tooltip.
	this.hide = function() {
		if (this.color.alpha == 0) return;
		this.time = GetTime();
		this.color.alpha = 255;
		this.faded = true;
	}
	
	this.draw = function() {
		if (!this.on) return;
		System.basicWindow.setColorMask(this.color);
		System.basicWindow.drawWindow(this.x, this.y, this.w, this.h);
		System.basicWindow.setColorMask(Colors.White);
		
		System.textFont.setColorMask(this.color);
		var i = this.textLines.length;
		while (i--) {
			System.textFont.drawText(this.x + 2, this.y + 2 + i * this.fh, this.textLines[i]);
		}
		System.textFont.setColorMask(Colors.White);
		
		this.updateFade();
		if (Cursor.onLeftClick()) this.hide();
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
}