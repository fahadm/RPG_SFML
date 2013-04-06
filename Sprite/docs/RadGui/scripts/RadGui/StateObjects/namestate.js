/**
* Script: namestate.js
* Written by: Radnen
* Updated: 8/23/2010
**/

function NameState(name)
{
	this.inherit = GUIState;
	this.inherit(name, SW/2-60, SH/2-28, 120, 56);
	
	this.text = "";
	
	var panel = this.createBasePanel();
	
	var input_box = new InputBox(panel, 8, 16, 104, 16);
	
	var okay_button = new Button(panel, 72, 40, "Okay");

	okay_button.onEnter = function() {
		Audio.playSound(System.selectSnd);
	}
	
	okay_button.onMouseUp.add(function(sender) {
		Audio.playSound(System.clickSnd);
		sender.text = input_box.text;
		StateManager.pop();
		sender.onOkay.execute();
	}, this);
	
	var cancel_button = new Button(panel, 16, 40, "Cancel");
	
	cancel_button.onEnter = function() {
		Audio.playSound(System.selectSnd);
	}
	
	cancel_button.onMouseUp.add(function(sender) {
		Audio.playSound(System.cancelSnd);
		StateManager.pop();
		sender.onCancel.execute();
	}, this);
		
	panel.controls.push(okay_button);
	panel.controls.push(cancel_button);
	panel.controls.push(input_box);
	panel.controls.push(new Label(panel, "Name your hero!"));
	
	this.doInput = function(key) {
		input_box.doInput(key);
	}
	
	this.onEnter.add(function() {
		panel.focusedControl = input_box;
	});
}