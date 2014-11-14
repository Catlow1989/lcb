var calendar = {
	
	calendar : null,
	
	init: function(calendarId) {
    	this.calendar = $(calendarId).fullCalendar({
	        //weekends: false,
	        dayClick: function(date, allDay, jsEvent, view) { 
	        	 if (allDay) {
	        	 	console.log('clicked on the entire day '+date);
	        	 	
	        	 	selectedDate = moment(date, 'ddd MMM DD YYYY HH:mm:ss ZZ').format('DD-MM-YYYY');
	        	 } else {
	        	 	console.log('clicked on the slot '+date);
	        	 }
	        },
	        eventClick: function(event) {
	        	selectedEvent = event.id;
	        	$.mobile.changePage('#event_page');
	        }
	        // eventSources: [
		        // // your event source
		        // {
		            // events: [ // put the array in the `events` property
		                // {
		                    // title  : 'event2',
		                    // start  : '2014-03-05 19:00:00',
		                    // end    : '2014-03-05 20:00:00'
		                // },
		            // ],
		            // color: 'black',     // an option!
		            // textColor: 'yellow' // an option!
		        // }
		    // ]
	    })
    },
    
    //
    //
    // Calendar controls
    //
    //
    
    refreshCalendar: function() {
    	this.calendar.fullCalendar('refetchEvents');
    	this.calendar.fullCalendar('rerenderEvents');
    },
        
    addEvent: function(eventId, eventType, title, location, notes, startDate, endDate) {
    	
    	if(this.calendar === null) {
    		return false;
    	}
    	
    	var new_event = [
    		{
    			id 				: eventId,
				title 			: title,
				start 			: startDate,
				end				: endDate,
				textColor 		: this.textColor(eventType),
				backgroundColor : this.backgroundColor(eventType)
			}
    	];
		
		this.calendar.fullCalendar('addEventSource', new_event);
		
		this.refreshCalendar();

    },
    
    removeEvent: function(event) {
    	this.calendar.fullCalendar('removeEvents', event._id);
    },
    
    textColor: function(eventType) {
    	switch(eventType) {
    		default:
    			return '#000000';
    			break;
    	}
    },
    
    backgroundColor: function(eventType) {
    	switch(eventType) {
    		default:
    			return '#ffc408'; //'#fac09e';
    			break;
    	}
    },
    
    //
    //
    // Import native events
    //
    //
    
    importNativeEvents: function(calendar_id, from_date, to_date) {
    	
    }
    
}
