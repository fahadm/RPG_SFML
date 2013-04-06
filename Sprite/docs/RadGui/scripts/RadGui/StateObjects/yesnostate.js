/**
* Script: yesnostate.js
* Written by: Radnen
* Updated: 8/24/2010
**/

/**
* YesNoState:
*  - obj should be a control to view with the menu.
*    if undefined, a generic label will take its place.
**/
function YesNoState(name, obj)
{
	this.inherit = GUIState;
	this.inherit(name, SW/2-50, SH/2-24, 100, 48);
	
	var panel = this.createBasePanel();
	if (!obj) obj = new Label(panel, "Are you sure?");
	else {
		obj.parent = panel;
		this.c_holder.x = SW/2-obj.w/2;
		this.c_holder.y = SH/2-obj.h/2-16;
		this.c_holder.w = obj.w;
		this.c_holder.h = obj.h+32;
	}
	
	var yes_button = new Button(panel, this.c_holder.w-40, this.c_holder.h-16, "Yes");
	yes_button.onEnter = function() {
		Audio.playSound(System.selectSnd);
	}
	yes_button.onMouseUp.add(function(sender) {
		Audio.playSound(System.clickSnd);
		sender.text = "test";
		StateManager.pop();
		sender.onOkay.execute();
	}, this);
	
	var no_button = new Button(panel, 16, this.c_holder.h-16, "No");
	no_button.onEnter = function() {
		Audio.playSound(System.selectSnd);
	}
	no_button.onMouseUp.add(function(sender) {
		Audio.playSound(System.cancelSnd);
		StateManager.pop();
		sender.onCancel.execute();
	}, this);
	
	panel.controls.push(obj);
	panel.controls.push(yes_button);
	panel.controls.push(no_button);
}