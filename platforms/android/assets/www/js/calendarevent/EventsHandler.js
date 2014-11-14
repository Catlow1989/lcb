var events = {
	
	// test: function() {
		// // prep some variables
		// var startDate = new Date(2014,2,1,0,0,0,0,0); // beware: month 0 = january, 11 = december
		// var endDate = new Date(2014,2,5,0,0,0,0,0);
		// var title = "My nice event";
		// var location = "Home";
		// var notes = "Some notes about this event.";
		// //var success = function(message) { alert("Success: " + JSON.stringify(message)); };
		// //var error = function(message) { alert("Error: " + message); };
		
		// //this.createEvent(title, location, notes, startDate, endDate, success, error);
		// //this.findEvent('', '', '', startDate, endDate, success, error);
	// },
	
	/*
	 * 
	 * for Android
	 * 
	 */
	
	createEvent: function(title, location, notes, startDate, endDate) {
		// create an event silently (on Android < 4 an interactive dialog is shown)
		window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,this.success,this.error);
		
		// // create an event interactively (only supported on Android)
		// window.plugins.calendar.createEventInteractively(title,location,notes,startDate,endDate,success,error);
	},
	
	deleteEvent: function(title, location, notes, startDate, endDate) {
		// delete an event (you can pass nulls for irrelevant parameters, note that on Android `notes` is ignored)
		window.plugins.calendar.deleteEvent(title,location,notes,startDate,endDate,this.success,this.error);
	},
	
	findEvent: function(title, location, notes, startDate, endDate) {
		// find events
		window.plugins.calendar.findEvent(title,location,notes,startDate,endDate,this.success,this.error);
	},
	
	/*
	 * 
	 * for iOS
	 * 
	 */
	
	createCalendariOS: function(calendarName) {
		// create a calendar (iOS only for now)
		window.plugins.calendar.createCalendar(calendarName,this.success,this.error);
	},
	
	deleteCalendariOS: function(calendarName) {
		// delete a calendar (iOS only for now)
		window.plugins.calendar.deleteCalendar(calendarName,this.success,this.error);
	},
	
	createEventiOS: function(title, location, notes, startDate, endDate, calendarName) {
		// create an event in a named calendar (iOS only for now)
		window.plugins.calendar.createEventInNamedCalendar(title,location,notes,startDate,endDate,calendarName,this.success,this.error);
	},
	
	deleteEventiOS: function(title, location, notes, startDate, endDate) {
		// delete an event (you can pass nulls for irrelevant parameters, note that on Android `notes` is ignored)
		window.plugins.calendar.deleteEvent(newTitle,location,notes,startDate,endDate,this.success,this.error);
	},
	
	findEventiOS: function(title, location, notes, startDate, endDate) {
		window.plugins.calendar.findEvent(title,location,notes,startDate,endDate,this.success,this.error);
	},
	
	findAllEventsiOS: function(calendarName) {
		// find all events in a named calendar (iOS only for now)
		window.plugins.calendar.findAllEventsInNamedCalendar(calendarName,this.success,this.error);
	},
	
	changeEventiOS: function(title, location, notes, startDate, endDate, newTitle, newLocation, newNotes, newStartDate, newEndDate) {
		// change an event (iOS only for now)
		var newTitle = "New title!";
		window.plugins.calendar.modifyEvent(title,location,notes,startDate,endDate,newTitle,location,notes,startDate,endDate,this.success,this.error);
	},
	
	success: function(message) { 
		// alert("Success: " + JSON.stringify(message));
		
		app.loading('show', 'New event saved', true);
		setTimeout(function() {
			app.loading('hide');
		}, 2000); 
	},
	
	error: function(message) { 
		// alert("Error: " + message); 
		
		app.loading('show', 'New event failed to save', true);
		setTimeout(function() {
			app.loading('hide');
		}, 2000); 
	}
	
}
