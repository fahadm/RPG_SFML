/**
* Script: system.js
* Written by: Radnen
* Updated: 8/29/2010
**/

// object types:
const NULL = 0;
const ICON = 1;
const WINDOW = 2;

// docking positions:
const TOP = 1;
const BOTTOM = 2;
const LEFT = 3;
const RIGHT = 4;
const FULL = 5;

System = ({
	textFont    : LoadFont("RadGui/text.rfn"),
	textColor   : Colors.white,
	windowFont  : LoadFont("RadGui/windowtext.rfn"),
	menuWindow  : LoadWindowStyle("RadGui/basicwindow.rws"),
	highlight   : LoadWindowStyle("RadGui/highlight.rws"),
	selected    : LoadWindowStyle("RadGui/selected.rws"),
	basicWindow : LoadWindowStyle("RadGui/basicwindow.rws"),
	bar         : LoadWindowStyle("RadGui/bar.rws"),
	btnup       : LoadWindowStyle("RadGui/btnup.rws"),
	btndn       : LoadWindowStyle("RadGui/btndn.rws"),
	btnov       : LoadWindowStyle("RadGui/btnov.rws"),
	selectSnd   : LoadSound("RadGui/select.wav"),
	cancelSnd   : LoadSound("RadGui/cancel.wav"),
	clickSnd    : LoadSound("RadGui/click.wav"),
	bleepSnd    : LoadSound("RadGui/speakblip.wav"),
	tipFadeTime : 100,
	
	/**
	* drawText(x, y, text [, color]);
	*  - wrapper for font.drawText(x, y, text);
	*  - color: if defined, it will mask the text for only this blit instance.
	**/
	drawText: function(x, y, text, color) {
		if (color) this.textFont.setColorMask(color);
		this.textFont.drawText(x, y, text);
		if (color) this.textFont.setColorMask(this.textColor);
	},
});