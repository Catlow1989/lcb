
var restAgent = {
	
	syncData: function(callback) {
		
		console.log('Syncing start at '+moment().format('HH:mm:ss'));
		console.log('Last sync time : ' + moment(window.localStorage['LAST_MODIFIED'], 'X').format('YYYY-MM-DD HH:mm:ss') + ', ' + window.localStorage['LAST_MODIFIED'] );
		
		/////
		///// show loading
		/////
		
		app.loading('show', 'syncing data...', true);
		
		app.disableBtnsHomepage();
		
		/////
		///// POST
		/////
		
		var jsonData = {};
		var lll = [], mmm = [];
		var bbb = [];
		
		bbb.push(
			dbManager.getChangesActivityLogs( parseInt(window.localStorage['LAST_MODIFIED']), function(logs) { 
				
				var len = logs.length;
				console.log('Activity log changes : ' + len);
				if(len > 0) {
					for(var i = 0; i < len; i++) {
						lll[i] = logs.item(i);
					}	
				}
				jsonData.activity_log = lll;
				
			} )
		);
		
		bbb.push(
			dbManager.getChangesActivityLogs( parseInt(window.localStorage['LAST_MODIFIED']), function(logs) { 
				
				var len = logs.length;
				console.log('Activity log changes : ' + len);
				if(len > 0) {
					for(var i = 0; i < len; i++) {
						lll[i] = logs.item(i);
					}	
				}
				jsonData.activity_log = lll;
				
			} )
		);
		
		/////
		///// GET
		/////
		
		$.when.apply( $, bbb ).then(function() {
			
			// console.log(JSON.stringify(jsonData));
			
			var sss = [];
			var url = window.localStorage['LOGIN_URL'] + 'sync-all/' + parseInt( window.localStorage['LAST_MODIFIED'] );
			this_modified = utils.getCurrentUnixTime();
			
			$.ajax({
				type: 'POST',
				url: url,
				// data: JSON.stringify(jsonData),
				dataType: 'html',
				statusCode: {
					404: function() {
						
					},
					200: function() {
						
					}
				},
				success: function( data ) {
					
					console.log('sync success');
					console.log( data );
					
					callback( JSON.parse( data ) );
					
				},
				error : function(jqXHR, textStatus, errorThrown) {
					
					console.log('failed, '+jqXHR+'; '+textStatus+'; '+errorThrown);
				
				} 
			});
		});
		
	}
	
};
