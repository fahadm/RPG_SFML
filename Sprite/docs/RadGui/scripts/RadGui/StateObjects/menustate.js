/**
* Script: menustate.js
* Written by: Radnen
* Updated: 8/29/2010
**/

/**
* Pre-Defined MenuState code.
*  - name: indexing key for this state.
**/
function MenuState(name, x, y, w, h)
{
	this.inherit = GUIState;
	this.inherit(name, x, y, w, h);

	var panel = this.createBasePanel();	
	
	this.render.add(function() {
		if (!this.active) Rectangle(0, 0, SW, SH, Colors.clearBlack);
	});
		
	var MainList = new ListBox(panel);
	MainList.lockWidth = MainList.lockHeight = true;
	
	this.onEnter.add(function() {
		panel.focusedControl = MainList;
	});
	
	panel.controls.push(MainList);
	panel.focusedControl = MainList;
	
	this.addItem = function(text, callback) {
		MainList.addText(text, callback);
	}
	
	this.doInput = function(key) {
		switch(key) {
			case KEY_ESCAPE: StateManager.purgeStates(); break;
		}
	}
	
	/**
	* addStandardItems();
	*  - adds standard menu related items.
	**/
	this.addStandardItems = function() {
		this.c_holder.h = 88;
		
		if (Game.canContinue())
			this.addItem("Continue", Game.continueGame);
		else this.c_holder.h -= 16;
	
		this.addItem("New Game", Game.begin);
		
		if (Game.canContinue())
			this.addItem("Load Game", Game.load);
		else this.c_holder.h -= 16;
		
		this.addItem("Options", function() {
			//StateManager.push(new OptionsState("Options"));
		});
	
		this.addItem("Quit Game", function() {
			StateManager.purgeStates();
		});
	}
}