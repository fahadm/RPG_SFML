/**
* Script: guistate.js
* Written by: Radnen
* Updated: 8/23/2010
**/

function GUIState(name, x, y, w, h)
{
	this.inherit = State;
	this.inherit(name);
	
	this.c_holder = new ControlHolder(x, y, w, h);
	
	this.onOkay = new Event(this);
	this.onCancel = new Event(this);
	
	/**
	* Creates a pre-formatted panel for menu use.
	*  - locks width and height and enables windows.
	**/
	this.createBasePanel = function() {
		var panel = new Panel(this.c_holder, 0, 0, 0, 0);
		panel.lockWidth = panel.lockHeight = true;
		panel.useWindow = true;
		this.c_holder.controls.push(panel);
		this.c_holder.focusedControl = panel;
		return panel;
	}
	
	this.update.add(function() {
		this.c_holder.update(); // updates all controls
	});
	
	this.render.add(function() {
		this.c_holder.draw(); // draws all controls.
	});
	
	this.onEnter.add(function() {
		this.c_holder.focusedControl = this.c_holder.controls[0];
	});
	
	this.onLeave.add(function() {
		this.c_holder.focusedControl = null;
	});
}