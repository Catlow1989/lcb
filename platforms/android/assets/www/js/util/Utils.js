var utils = {

	convertToRealTime: function(time, ampm) {
		var realtime = time;
		
		switch(ampm) {
			case 'am':
				realtime = realtime;
				break;
			case 'pm':
				realtime = realtime + 12;
				break;
			default:
				break;
		}
		
		// if(realtime == 24) {
			// realtime = 0;
		// }
		
		return realtime;
	},

	getCurrentUnixTime: function() {
		var ut = new Date();
    	ut = parseInt( ut.getTime() / 1000 );
    	
    	return ut;
	},
	
	convertToUnixTime: function(time) {
		return moment(time, 'YYYY-MM-DD HH:mm:ss').format('X');
	},

	getTodayZeroUnixTime: function() {
		var today = moment().format('DD MMMM YYYY');
		return moment(today, 'DD MMMM YYYY').format('X');
	},
	
	guid: function(type) {
		var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
		
		switch(type) {
			case 'user': 			guid = 'usr-' + guid;
				break;
			case 'activity_log': 	guid = 'log-' + guid;
				break;
			case 'message': 		guid = 'msg-' + guid;
				break;
			case 'role': 			guid = 'rle-' + guid;
				break;
			case 'school': 			guid = 'sch-' + guid;
				break;
			case 'team': 			guid = 'tem-' + guid;
				break;
			case 'club': 			guid = 'clb-' + guid;
				break;
			case 'session': 		guid = 'ssn-' + guid;
				break;
			case 'exercise': 		guid = 'exc-' + guid;
				break;
			case 'skill': 			guid = 'skl-' + guid;
				break;
			case 'event': 			guid = 'evt-' + guid;
				break;
			default:
				break;
		}
		
		return guid;
	}

};