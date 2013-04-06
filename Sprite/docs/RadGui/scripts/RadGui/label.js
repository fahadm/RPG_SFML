/**
* Script: label.js
* Written by: Radnen
* Updated: 8/21/2010
**/

function Label(parent, text)
{
	this.inherit = Control;
	this.inherit(parent, 0, 0, System.textFont.getStringWidth(text), System.textFont.getHeight());
	
	this.text = text || "Label";
	this.fontColor = Colors.white;
	
	this.draw = function() {
		this.x = this.parent.x + this.xx;
		this.y = this.parent.y + this.yy;
		System.drawText(this.x, this.y, this.text, this.fontColor);
	}
	
	this.update = function() {
		this.updateMouse();
	}
	
	this.setText = function(text) {
		this.text = text;
		this.w = System.textFont.getStringWidth(text);
		this.h = System.textFont.getFontHeight();
	}
}