/**
* Script: radgui.js
* Written by: Radnen
* Updated: 8/23/2010
**/

/**
* Rad-GUI extention library for RadLib game library.
*  - You only need to require this one script to use the full gui library.
*
*  - Rad-GUI must be used alongside radlib and has
*    to be loaded after radlib.
*
*  - Rad-GUI gives you the ultimate power in general UI designing.
*		 Control every aspect of the look and feel - and behavior of
*    your game! The API emulates the .NET style making you feel
*    comfortable in the building process while not being restricted
*    in what you can or cannot do.
**/

/* Require the base system object: */
RequireScript("RadGui/system.js");

/* Require the individual components for gui building: */
RequireScript("RadGui/button.js");
RequireScript("RadGui/contextmenu.js");
RequireScript("RadGui/control.js");
RequireScript("RadGui/controlholder.js");
RequireScript("RadGui/dropdown.js");
RequireScript("RadGui/iconview.js");
RequireScript("RadGui/inputbox.js");
RequireScript("RadGui/label.js");
RequireScript("RadGui/listbox.js");
RequireScript("RadGui/menubar.js");
RequireScript("RadGui/nametag.js");
RequireScript("RadGui/panel.js");
RequireScript("RadGui/statusbar.js");
RequireScript("RadGui/toolbar.js");
RequireScript("RadGui/tooltip.js");

/* The following are used alongside RadLib's game state handler: */
RequireScript("RadGui/StateObjects/guistate.js");
RequireScript("RadGui/StateObjects/menustate.js");
RequireScript("RadGui/StateObjects/namestate.js");
RequireScript("RadGui/StateObjects/yesnostate.js");