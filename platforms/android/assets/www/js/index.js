/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	
    initialize: function() {
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    onDeviceReady: function() {
    	
        console.log('Device is ready.');
        
        //
        // initialize database
        //
        
        dbManager.openDB();
        dbManager.populateDB();
        
        //
        // ifixit
        //
        
        app.iFixIt();
        
        //
        // add event handlers
        //
        
        app.addEventHandler_HomePage();
        
        app.addEventHandler_ActivityPage();
        app.addEventHandler_ActivityLogDetailsPage();
        
        app.addEventHandler_ReviewPageSelectGroup();
        app.addEventHandler_ReviewPageSelectPlayer();
        app.addEventHandler_ReviewPageSelectActivityLog();
        app.addEventHandler_ReviewPage();
        
        app.addEventHandler_TrainingPageSelectSkill();
        app.addEventHandler_TrainingPage();
        
        app.addEventHandler_CriteriaPageSelectGroup();
        app.addEventHandler_CriteriaPage();
        
        app.addEventHandler_CalendarPage();
        app.addEventHandler_CalendarPageAddEvent();
        
        app.addEventHandler_MessageListPage();
        app.addEventHandler_MessageCreatePage();
        app.addEventHandler_MessageDetailsPage();
        
		//
		//
		//
		
		$.mobile.changePage('#home_page');
		
    },
    
    
    
    
    
    
    addEventHandler_HomePage: function() {
    	
    	/////
    	///// page events
    	/////
    	
    	$('#home_page').on('pageinit', function() {
    		
    		setTimeout(function() {
				app.syncData( app.afterSync );
			}, 250);
    		
    	});
    	 
    	$('#home_page').on('pagebeforeshow', function() {
    		
    		app.pageBeforeShow_Clear_HomePage();
    		
    		app.renderLatestMessageList();
    		
    	});
    	
    	$('#home_page').on('pageshow', function() {
    		
    		if( window.localStorage['USER_LOGIN_STATUS'] === '1' ) {
    			
    			// console.log('user login guid : ' + window.localStorage['USER_LOGIN_GUID']);
    			// console.log('user login username : ' + window.localStorage['USER_LOGIN_USERNAME']);
    			// console.log('user login firstname : ' + window.localStorage['USER_LOGIN_FIRSTNAME']);
    			// console.log('user login lastname : ' + window.localStorage['USER_LOGIN_LASTNAME']);
    			// console.log('user login dob : ' + window.localStorage['USER_LOGIN_DOB']);
    			// console.log('user login gender : ' + window.localStorage['USER_LOGIN_GENDER']);
    			// console.log('user login team guid : ' + window.localStorage['USER_LOGIN_TEAMGUID']);
    			// console.log('user login team : ' + window.localStorage['USER_LOGIN_TEAM']);
    			// console.log('user login club guid : ' + window.localStorage['USER_LOGIN_CLUBGUID']);
    			// console.log('user login club : ' + window.localStorage['USER_LOGIN_CLUB']);
    			// console.log('user login role guid : ' + window.localStorage['USER_LOGIN_ROLEGUID']);
    			// console.log('user login role : ' + window.localStorage['USER_LOGIN_ROLE']);
    			// console.log('user login school guid : ' + window.localStorage['USER_LOGIN_SCHOOLGUID']);
    			// console.log('user login school : ' + window.localStorage['USER_LOGIN_SCHOOL']);
    			// console.log('user login coach guid : ' + window.localStorage['USER_LOGIN_COACHGUID']);
    			// console.log('user login coach : ' + window.localStorage['USER_LOGIN_COACH']);
    			// console.log('user login link : ' + window.localStorage['USER_LOGIN_LINK']);
    			
    			loggedin_user_guid 			= window.localStorage['USER_LOGIN_GUID'];
				loggedin_user_username 		= window.localStorage['USER_LOGIN_USERNAME'];
				loggedin_user_firstname 	= window.localStorage['USER_LOGIN_FIRSTNAME'];
				loggedin_user_lastname 		= window.localStorage['USER_LOGIN_LASTNAME'];
				loggedin_user_dob 			= window.localStorage['USER_LOGIN_DOB'];
				loggedin_user_gender 		= window.localStorage['USER_LOGIN_GENDER'];
				loggedin_user_team_guid 	= window.localStorage['USER_LOGIN_TEAMGUID'];
				loggedin_user_team 			= window.localStorage['USER_LOGIN_TEAM'];
				loggedin_user_club_guid 	= window.localStorage['USER_LOGIN_CLUBGUID'];
				loggedin_user_club 			= window.localStorage['USER_LOGIN_CLUB'];
				loggedin_user_role_guid 	= window.localStorage['USER_LOGIN_ROLEGUID'];
				loggedin_user_role 			= window.localStorage['USER_LOGIN_ROLE'];
				loggedin_user_school_guid 	= window.localStorage['USER_LOGIN_SCHOOLGUID'];
				loggedin_user_school 		= window.localStorage['USER_LOGIN_SCHOOL'];
				loggedin_user_coach_guid 	= window.localStorage['USER_LOGIN_COACHGUID'];
				loggedin_user_coach 		= window.localStorage['USER_LOGIN_COACH'];
				loggedin_user_link 			= window.localStorage['USER_LOGIN_LINK'];
				
				//
				// set TODO after login
				// 
				
				//
				$('#user_brief').find('span.user_name').text( loggedin_user_firstname );
				$('#user_brief').find('span.user_team').text( loggedin_user_team==null?'':loggedin_user_team );
				$('#user_brief').find('span.user_club').text( loggedin_user_club );
				
				$('.sync_value').text( moment(window.localStorage['LAST_MODIFIED'], 'X').format('DD-MMM HH:mm:ss') );
				
				$('#home_panel ul li[data-role=list-divider]').show();
				
				$('#login_form').hide();
				$('#user_login').hide();
				$('#user_logout').show();
				$('#sync_data').show();
				
				//
				app.setUserCapabilities( loggedin_user_role );
				
    		}
    		
    	});
    	
    	/////
    	///// buttons
    	/////
    	
    	$('#user_login').on('tap', function() {
    		
    		app.login( app.afterLogin );
    		
    	});
    	
    	$('#sync_data').on('tap', function() {
    		
    		app.syncData( app.afterSync );
    		
    	});
    	
    	$('#user_logout').on('tap', function() {
    		
    		app.logout( loggedin_user_guid, app.afterLogout );
    		
    	});
    	
    },
    
    renderLatestMessageList: function() {
    	
    	/////
    	///// clear
    	/////
    	
    	$('#latest_message_list').empty().listview('refresh');
    	
    	/////
    	///// render
    	/////
    	
    	dbManager.getLatestMessages(function(messages) {
    		
    		//
    		//
    		//
    		
    		var len = messages.length;
    		// console.log('find message : '+messages.length);
    		if(len === 0) {
    			return false;
    		}
    		
    		//
    		//
    		//
    		
    		var li_class = '', 
    			a_class = 'class="ui-btn"';
    		
    		for(var i = 0; i < len; i++) {
    			
    			// li class
    			if(i == 0) {
    				li_class = 'class="ui-first-child"';
    			} else if(i == len - 1) {
    				li_class = 'class="ui-last-child"';
    			}
    			
    			// message
    			var msg = messages.item(i);
    			
    			//
    			// append
    			//
    			
    			$('#latest_message_list').append(
    				'<li ' + li_class + ' id="' + i + '">' +
	    				'<a href="#message_page-details" ' + a_class + '>' + // url
		    				'<div class="message_title">' + 
		    					'<h2>' + msg.title + '</h2>' +
			    				'<p>' + msg.content + '</p>' +
			    				'<p class="ui-li-aside"><span class="creation_date">' + moment(msg.creation_date, 'X').format('DD-MMM-YYYY HH:mm') + '</span></p>' +
			    				'<span class="message_guid" style="display: none;">' + msg.guid + '</span>' +
			    				// '<span class="message_title" style="display: none;">' + msg.title + '</span>' +
			    				// '<span class="message_author" style="display: none;">' + msg.author + '</span>' +
			    				// '<span class="message_content" style="display: none;">' + msg.content + '</span>' +
			    				// '<span class="message_time" style="display: none;">' + msg.creation_date + '</span>' +
			    			'</div>' + 
		    			'</a>' +
		    		'</li>'
    			);
    			
    			//
    			// event
    			//
    			
    			$('#latest_message_list').find('li[id="'+i+'"]').on('tap', function() {
    				
    				selected_message_guid = $(this).find('span.message_guid').text();
    				
    				dbManager.getMessageInfo( selected_message_guid, function(message) {
    					
    					selected_message_guid 	 = message.guid;
	    				selected_message_title 	 = message.title;
	    				selected_message_author  = message.author;
	    				selected_message_content = message.content;
	    				selected_message_time 	 = message.creation_date;
	    				
	    				// console.log('selected message guid : ' + selected_message_guid);
	    				// console.log('selected message title : ' + selected_message_title);
	    				// console.log('selected message author : ' + selected_message_author);
	    				// console.log('selected message content : ' + selected_message_content);
	    				// console.log('selected message time : ' + selected_message_time);
	    				// console.log(JSON.stringify(message));
	    				
	    				// set
	    				$('#message_brief').find('span.message_title').text( selected_message_title );
						$('#message_brief').find('span.message_time').text( moment(parseInt(selected_message_time), 'X').format('DD-MMM-YYYY HH:mm') );
						$('#message_brief').find('span.message_author').text( selected_message_author );
						$('#message_brief').find('span.message_content').text( selected_message_content );
    					
    					//
    					$.mobile.changePage('#message_page-details');
    					
    				} );
    				
    			});
    		}
    		
    	});
    },
    
    
    
    
    
    
    
    
    
    
    
    addEventHandler_TrainingPageSelectSkill: function() { 
    	
    	/////
    	///// page events
    	/////
    	
    	$('#training_page-selectskill').on('pageint', function() {

    	});
    	
    	$('#training_page-selectskill').on('pagebeforeshow', function(event) {
    		
    		app.pageBeforeShow_Clear_TrainingPage();
    		
    	});
    	
    	$('#training_page-selectskill').on('pageshow', function(event) {
    		
    		$('#training_date span.value').text( moment().format('MMM DD') );
    		
    		app.renderTrainingExerciseList();
  		
    	});
    	
    	/////
    	///// buttons
    	/////
    	
    	$('#batting_list_wrapper').on('tap', function() {
    		// clear
    		$('#bowling_list_wrapper h2 a').removeClass('ui-btn-active');
    		$('#fielding_list_wrapper h2 a').removeClass('ui-btn-active');
    		$('#others_list_wrapper h2 a').removeClass('ui-btn-active');
    		
    		$('#batting_list li a').removeClass('ui-btn-active');
    	});
    	
    	$('#bowling_list_wrapper').on('tap', function() {
    		// clear
    		$('#batting_list_wrapper h2 a').removeClass('ui-btn-active');
    		$('#fielding_list_wrapper h2 a').removeClass('ui-btn-active');
    		$('#others_list_wrapper h2 a').removeClass('ui-btn-active');
    		
    		$('#bowling_list li a').removeClass('ui-btn-active');
    	});
    	
    	$('#fielding_list_wrapper').on('tap', function() {
    		// clear
    		$('#batting_list_wrapper h2 a').removeClass('ui-btn-active');
    		$('#bowling_list_wrapper h2 a').removeClass('ui-btn-active');
    		$('#others_list_wrapper h2 a').removeClass('ui-btn-active');
    		
    		$('#fielding_list li a').removeClass('ui-btn-active');
    	});
    	
    	$('#others_list_wrapper').on('tap', function() {
    		// clear
    		$('#batting_list_wrapper h2 a').removeClass('ui-btn-active');
    		$('#bowling_list_wrapper h2 a').removeClass('ui-btn-active');
    		$('#fielding_list_wrapper h2 a').removeClass('ui-btn-active');
    		
    		$('#others_list li a').removeClass('ui-btn-active');
    	});
    	
    },
    
    renderTrainingExerciseList: function() {
    	
    	/////
    	///// clear
    	/////
    	
		$('#batting_list').empty().listview('refresh');
		$('#bowling_list').empty().listview('refresh');
		$('#fielding_list').empty().listview('refresh');
		$('#others_list').empty().listview('refresh');
		
		/////
		///// render
		/////
		
		$('#batting_list_wrapper').find('span.exercise_guid').text( window.localStorage['EXERCISE_BATTING'] );
		$('#bowling_list_wrapper').find('span.exercise_guid').text( window.localStorage['EXERCISE_BOWLING'] );
		$('#fielding_list_wrapper').find('span.exercise_guid').text( window.localStorage['EXERCISE_FIELDING'] );
		$('#others_list_wrapper').find('span.exercise_guid').text( window.localStorage['EXERCISE_OTHERS'] );
		
		dbManager.getSkillsByCriteria( window.localStorage['EXERCISE_BATTING'], loggedin_user_team_guid, function(skills) {
			
			//
			//
			//
			
			var len = skills.length;
			if(len === 0) return false;
			
			//
			//
			//
			var li_class = '', 
				a_class = 'class="ui-btn"';
			
			for(var i = 0; i < len; i++) {
				
				// li class
    			if(i == 0) {
    				li_class = 'class="ui-first-child"';
    			} else if(i == len - 1) {
    				li_class = 'class="ui-last-child"';
    			}
				
				// skill
				var skill = skills.item(i);
				
				//
				// append
				//
				
				$('#batting_list').append(
					'<li ' + li_class + ' id="' + i + '">' +
	    				'<a href="#" ' + a_class + '>' + // url
		    				'<div class="skill_title">' + 
		    					'<h2>' + skill.skill + '</h2>' +
			    			'</div>' +
			    			'<span class="skill_guid" style="display: none;">' + skill.guid + '</span>' + 
			    			'<span class="skill_title" style="display: none;">' + skill.skill + '</span>' +
		    			'</a>' +
		    		'</li>'
				);
				
				//
				// event
				//
				
				$('#batting_list').find('li[id="' + i + '"]').on('tap', function() {
					
					// get
					selected_skill_guid 	= $(this).find('a span.skill_guid').text();
					selected_skill			= $(this).find('a span.skill_title').text();
					
					selected_exercise_guid 	= $(this).parent().parent().find('span.exercise_guid').text();
					selected_exercise	   	= $(this).parent().parent().find('h2').text();
					
					// console.log('--selected skill guid : ' + selected_skill_guid);
					// console.log('--selected skill : ' + selected_skill);
					// console.log('--selected exercise guid : ' + selected_exercise_guid);
					// console.log('--selected exercise : ' + selected_exercise);
					
					//
					$.mobile.changePage('#training_page');
					
				});
				
				if(i == len - 1) {
					$('#batting_list').listview('refresh');
				}
			}
			
		});
		
		dbManager.getSkillsByCriteria( window.localStorage['EXERCISE_BOWLING'], loggedin_user_team_guid, function(skills) {
			
			//
			//
			//
			
			var len = skills.length;
			if(len === 0) return false;
			
			//
			//
			//
			
			var li_class = '', 
				a_class = 'class="ui-btn"';
			
			for(var i = 0; i < len; i++) {
				
				// li class
    			if(i == 0) {
    				li_class = 'class="ui-first-child"';
    			} else if(i == len - 1) { 
    				li_class = 'class="ui-last-child"'; 
    			}
				
				// skill
				var skill = skills.item(i);
				
				//
				// append
				//
				
				$('#bowling_list').append(
					'<li ' + li_class + ' id="' + i + '">' +
	    				'<a href="#" ' + a_class + '>' + // url
		    				'<div class="skill_title">' + 
		    					'<h2>' + skill.skill + '</h2>' +
			    			'</div>' +
			    			'<span class="skill_guid" style="display: none;">' + skill.guid + '</span>' +
			    			'<span class="skill_title" style="display: none;">' + skill.skill + '</span>' + 
		    			'</a>' +
		    		'</li>'
				);
				
				//
				// event
				//
				
				$('#bowling_list').find('li[id="' + i + '"]').on('tap', function() {
					
					// get
					selected_skill_guid = $(this).find('a span.skill_guid').text();
					selected_skill		= $(this).find('a span.skill_title').text();
					
					selected_exercise_guid = $(this).parent().parent().find('span.exercise_guid').text();
					selected_exercise	   = $(this).parent().parent().find('h2').text();
					
					// console.log('--selected skill guid : ' + selected_skill_guid);
					// console.log('--selected skill : ' + selected_skill);
					// console.log('--selected exercise guid : ' + selected_exercise_guid);
					// console.log('--selected exercise : ' + selected_exercise);
					
					//
					$.mobile.changePage('#training_page');
					
				});
				
				if(i == len - 1) {
					$('#bowling_list').listview('refresh');
				}
			}
			
		});
		
		dbManager.getSkillsByCriteria( window.localStorage['EXERCISE_FIELDING'], loggedin_user_team_guid, function(skills) {
			
			//
			//
			//
			
			var len = skills.length;
			if(len === 0) return false;
			
			//
			//
			//
			
			var li_class = '', 
				a_class = 'class="ui-btn"';
			
			for(var i = 0; i < len; i++) {
				
				// li class
    			if(i == 0) { 
    				li_class = 'class="ui-first-child"'; 
    			} else if(i == len - 1) { 
    				li_class = 'class="ui-last-child"'; 
    			}
				
				// skill
				var skill = skills.item(i);
				
				//
				// append
				//
				
				$('#fielding_list').append(
					'<li ' + li_class + ' id="' + i + '">' +
	    				'<a href="#" ' + a_class + '>' + // url
		    				'<div class="skill_title">' + 
		    					'<h2>' + skill.skill + '</h2>' +
			    			'</div>' +
			    			'<span class="skill_guid" style="display: none;">' + skill.guid + '</span>' +
			    			'<span class="skill_title" style="display: none;">' + skill.skill + '</span>' + 
		    			'</a>' +
		    		'</li>'
				);
				
				//
				// events
				//
				
				$('#fielding_list').find('li[id="' + i + '"]').on('tap', function() {
					
					// get
					selected_skill_guid = $(this).find('a span.skill_guid').text();
					selected_skill		= $(this).find('a span.skill_title').text();
					
					selected_exercise_guid = $(this).parent().parent().find('span.exercise_guid').text();
					selected_exercise	   = $(this).parent().parent().find('h2').text();
					
					// console.log('--selected skill guid : ' + selected_skill_guid);
					// console.log('--selected skill : ' + selected_skill);
					// console.log('--selected exercise guid : ' + selected_exercise_guid);
					// console.log('--selected exercise : ' + selected_exercise);
					
					//
					$.mobile.changePage('#training_page');
					
				});
				
				if(i == len - 1) {
					$('#fielding_list').listview('refresh');
				}
			}
			
		});
		
		dbManager.getSkillsByCriteria( window.localStorage['EXERCISE_OTHERS'], loggedin_user_team_guid, function(skills) {
			
			//
			//
			//
			
			var len = skills.length;
			if(len === 0) return false;
			
			//
			//
			//
			
			var li_class = '', 
				a_class = 'class="ui-btn"';
			
			for(var i = 0; i < len; i++) {
				
				// li class
    			if(i == 0) {
    				li_class = 'class="ui-first-child"'; 
    			} else if(i == len - 1) {
    				li_class = 'class="ui-last-child"';
    			}
				
				// skill
				var skill = skills.item(i);
				
				//
				// append
				//
				
				$('#others_list').append(
					'<li ' + li_class + ' id="' + i + '">' +
	    				'<a href="#" ' + a_class + '>' + // url
		    				'<div class="skill_title">' + 
		    					'<h2>' + skill.skill + '</h2>' +
			    			'</div>' +
			    			'<span class="skill_guid" style="display: none;">' + skill.guid + '</span>' + 
			    			'<span class="skill_title" style="display: none;">' + skill.skill + '</span>' + 
		    			'</a>' +
		    		'</li>'
				);
				
				//
				// event
				//
				
				$('#others_list').find('li[id="' + i + '"]').on('tap', function() {
					
					// get
					selected_skill_guid = $(this).find('a span.skill_guid').text();
					selected_skill		= $(this).find('a span.skill_title').text();
					
					selected_exercise_guid = $(this).parent().parent().find('span.exercise_guid').text();
					selected_exercise	   = $(this).parent().parent().find('h2').text();
					
					// console.log('--selected skill guid : ' + selected_skill_guid);
					// console.log('--selected skill : ' + selected_skill);
					// console.log('--selected exercise guid : ' + selected_exercise_guid);
					// console.log('--selected exercise : ' + selected_exercise);
					
					//
					$.mobile.changePage('#training_page');
					
				});
				
				if(i == len - 1) {
					$('#others_list').listview('refresh');
				}
			}
			
		});
    
    },
    
    
    
    
    
    
    
    
    
    addEventHandler_TrainingPage: function() {
    	
    	/////
    	///// page events
    	/////
    	
    	$('#training_page').on('pageinit', function() {
    		
    	});
    	
    	$('#training_page').on('pagebeforeshow', function() {
    		
    		app.pageBeforeShow_Clear_SkillPage();
    		
    	});
    	
    	$('#training_page').on('pageshow', function() {
    		
    		// set width of video
    		var wW = $(window).width();
    		$('#tutorial_video_canvas video').attr('width', wW - 32);
    		$('#tutorial_video_canvas video').attr('height', (wW - 32)*9/16); // 16:9
    		
    		// set skill title
    		$('#skill_title').text( selected_skill );
    		
    	});
    	
    	/////
    	///// buttons
    	/////
    	
    	$('#open_popup_save_log').on('tap', function() {
    		
    		$('#popup_save_log').find('span.date').text( moment( utils.getCurrentUnixTime(), 'X' ).format('DD-MM-YYYY HH:mm') );
    		
    	});
    	
    	$('#save_log').on('tap', function() {
    		
    		app.saveActivityLog();
    		
    	});
    	
    },
    
    saveActivityLog: function() {
    	
    	// get input values
    	var pace  = $('#training_results div.pace input').val();
    	var spin  = $('#training_results div.spin input').val();
    	var score = $('#training_results div.score input').val();
    	var notes = $('#training_results div.notes textarea').val();
    	
    	var last_mod = utils.getCurrentUnixTime();
    	
    	console.log('exercise is saving : ' + selected_exercise_guid);
    	
    	var log = {
    		guid : utils.guid('activity_log'),
    		user_guid : loggedin_user_guid,
    		session_guid : 'ses-abc', // TODO
    		exercise_guid : selected_exercise_guid,
    		skill_guid : selected_skill_guid,
    		pace : pace,
    		spin : spin,
    		score : score,
    		notes : notes,
    		comments : '',
    		comment_author_guid : '',
    		comment_creation_date : 0,
    		deleted : 0,
    		last_modified : last_mod
    	};
    	 
    	console.log('New log added...'); 
    	console.log(JSON.stringify(log));
    	
    	// save values
    	dbManager.insertActivityLog(log, function() {
    		
    		console.log('activity log is inserted');
    		
    		// close popup
    		$('#popup_save_log').popup('close');
    		
    		history.back();
    		// $.mobile.back();

    	});
    	
    },
    
    
    
    
    
    
    
    
    
    
    
    addEventHandler_ActivityPage: function() {
    	
    	/////
    	///// page events
    	/////
    	
    	$('#activity_log_page').on('pageinit', function() {
    		
    	});
    	
    	$('#activity_log_page').on('pagebeforeshow', function() {
    		
    	});
    	
    	$('#activity_log_page').on('pageshow', function() {

			app.renderActivityLogList();

    	});
    	
    	/////
    	///// buttons
    	/////
    	
    	
    },
    
    renderActivityLogList: function() {
    	
    	/////
    	///// clear
    	/////
    	
    	$('#activity_log_list').empty().listview('refresh');
    	
    	/////
    	///// render
    	/////
    	
    	dbManager.getActivityLogsByUser( loggedin_user_guid, function(logs) {
    		
    		//
    		//
    		//
    		
    		var len = logs.length;
    		// console.log('user (' + loggedin_user_guid + ') activity log found : ' + len);
    		if(len == 0) {
    			return false;
    		}
    		
    		//
    		//
    		//
    		
    		var li_class = '',
    			a_class = 'class="ui-btn"';
    			
    		for(var i = 0; i < len; i++) {
    			
    			// li class
    			if(i == 0) {
    				li_class = 'class="ui-first-child"';
    			} else if(i == len - 1) {
    				li_class = 'class="ui-last-child"';
    			}
    			
    			// log
    			var log = logs.item(i);
    			
    			//
    			// append
    			//
    			
    			$('#activity_log_list').append(
    				'<li ' + li_class + ' id="' + i + '">' +
    					'<a href="#activity_log_page-details" ' + a_class + '>' +
    						'<p><span class="log_title">' + log.skill_title + '</span></p>' +
    						'<p><span class="log_time">' + moment( log.last_mod, 'X' ).format('DD-MM-YYYY HH:mm') + '</span></p>' +
    						'<span class="log_guid" style="display: none;">' + log.log_guid + '</span>' +
    						'<span class="exercise" style="display: none;">' + log.exe_title + '</span>' +
    						'<span class="skill" style="display: none;">' + log.skill_title + '</span>' +
    						'<span class="logdate" style="display: none;">' + log.last_mod + '</span>' +
    						'<span class="pace" style="display: none;">' + log.pace + '</span>' +
    						'<span class="spin" style="display: none;">' + log.spin + '</span>' +
    						'<span class="score" style="display: none;">' + log.score + '</span>' +
    						'<span class="notes" style="display: none;">' + log.notes + '</span>' +
    						'<span class="comments" style="display: none;">' + log.comments + '</span>' +
    						'<span class="log_comment_author" style="display: none;">' + log.author_name + '</span>' +
    					'</a>' +
    				'</li>'
    			);
    			
    			//
    			// event
    			//
    			
    			$('#activity_log_list').find('li[id="' + i + '"]').on('tap', function() {
    				
    				// get
    				selected_log_guid 			= $(this).find('span.log_guid').text();
    				selected_log_exercise 		= $(this).find('span.exercise').text();
    				selected_log_skill 			= $(this).find('span.skill').text();
    				selected_log_date 			= $(this).find('span.logdate').text();
    				
    				selected_log_pace 			= $(this).find('span.pace').text();
    				selected_log_spin 			= $(this).find('span.spin').text();
    				selected_log_score 			= $(this).find('span.score').text();
    				selected_log_notes 			= $(this).find('span.notes').text();
    				selected_log_comments 		= $(this).find('span.comments').text();
    				selected_log_comment_author = $(this).find('span.log_comment_author').text();
    				
    				// console.log('selected log guid : ' + selected_log_guid);
    				// console.log('selected log exercise : ' + selected_log_exercise);
    				
    				// set
    				$('#activity_log_brief').find('span.exercise').text( selected_log_exercise );
			    	$('#activity_log_brief').find('span.skill').text( selected_log_skill );
			    	$('#activity_log_brief').find('span.logdate').text( moment( selected_log_date, 'X' ).format('DD-MM-YYYY HH:mm') );
			    	
			    	$('#activity_log_results').find('div.pace').find('input').val( selected_log_pace );
			    	$('#activity_log_results').find('div.spin').find('input').val( selected_log_spin );
			    	$('#activity_log_results').find('div.score').find('input').val( selected_log_score );
			    	$('#activity_log_results').find('div.notes').find('textarea').val( selected_log_notes );
			    	$('#activity_log_results').find('div.comments').find('textarea').val( selected_log_comments );
    				
    				//
    				$.mobile.changePage( '#activity_log_page-details' );
    				
    			});
    		}
    		
    	});
    	
    },
        
    addEventHandler_ActivityLogDetailsPage: function() {
    	
    	/////
    	///// page events
    	/////
    	
    	$('#activity_log_page-details').on('pageinit', function() {
    		
    	});
    	
    	$('#activity_log_page-details').on('pagebeforeshow', function() {
    		
    		app.pageBeforeShow_Clear_LogDetailsPage();
    		
    	});
    	
    	$('#activity_log_page-details').on('pageshow', function() {

    	});
    	
    	/////
    	///// buttons
    	/////
    	
    	
    },
    
    
    
    
    
    
    
    
    addEventHandler_ReviewPage: function() {
    	
    	/////
    	///// page events
    	/////
    	
    	$('#review_page').on('pageinit', function() {
    		
    	});
    	
    	$('#review_page').on('pagebeforeshow', function() {
    		
    	});
    	
    	$('#review_page').on('pageshow', function() {
    		
    	});
    	
    	/////
    	///// button
    	/////
    	
    	$('#save_review').on('tap', function() {
    		
    		app.saveReview();
    		
    	});
    	
    },
    
    
    
    
    
    
    addEventHandler_ReviewPageSelectGroup: function() {
    	
    	/////
    	///// page events
    	/////
    	
    	$('#review_page-selectgroup').on('pageinit', function() {
    		
    	});
    	
    	$('#review_page-selectgroup').on('pagebeforeshow', function() {
    		
    	});
    	
    	$('#review_page-selectgroup').on('pageshow', function() {
    		
    		app.renderSelectGroupReviewList();
    		
    	});
    	
    	/////
    	///// button
    	/////
    	
    	
    },
    
    renderSelectGroupReviewList: function() {
    	
    	/////
    	///// clear
    	/////
    	
    	$('#review_page-grouplist').empty().listview('refresh');
    	
    	/////
    	///// render
    	/////
    	
    	dbManager.getAllTeams( function(teams) {
    		
    		//
    		//
    		//
    		
    		var len = teams.length;
    		if(len <= 0) {
    			return false;
    		}
    		
    		//
    		//
    		//
    		
    		var li_class = '', 
				a_class = 'class="ui-btn"';
    		
    		for(var i = 0; i < len; i++) {
    			
    			// li class
    			if(i == 0) {
    				li_class = 'class="ui-first-child"';
    			} else if(i == len - 1) {
    				li_class = 'class="ui-last-child"';
    			}
    			
    			// team
    			var team = teams.item(i);
    			
    			//
    			// append
    			//
    			
    			$('#review_page-grouplist').append(
					'<li ' + li_class + ' id="' + i + '">' +
	    				'<a href="#" ' + a_class + '>' + // url
		    				'<div class="team_title">' + 
		    					'<h2>' + team.team + '<img class="forward" src="img/forward_w.png" /></h2>' +
			    			'</div>' +
			    			'<span class="team_guid" style="display: none;">' + team.guid + '</span>' + 
			    			'<span class="team_title" style="display: none;">' + team.team + '</span>' + 
		    			'</a>' +
		    		'</li>'
				);
				
				//
				// event
				//
				
				$('#review_page-grouplist').find('li[id="' + i + '"]').on('tap', function() {
					
					// get
					selected_teamgroup_guid = $(this).find('a span.team_guid').text();
					selected_teamgroup		= $(this).find('a span.team_title').text();
					
					// console.log('selected group : '+selected_teamgroup);
					// console.log('selected group_guid : '+selected_teamgroup_guid);
					
					//
					$.mobile.changePage('#review_page-selectplayer');
					
				});
				
				if(i == len - 1) {
					$('#review_page-grouplist').listview('refresh');
				}
				
    		}
    	});
    	
    },
    
    
    
    
    
    
    addEventHandler_ReviewPageSelectPlayer: function() {
    	
    	/////
    	///// page events
    	/////
    	
    	$('#review_page-selectplayer').on('pageinit', function() {
    		
    	});
    	
    	$('#review_page-selectplayer').on('pagebeforeshow', function() {
    		
    	});
    	
    	$('#review_page-selectplayer').on('pageshow', function() {
    		
    		app.renderPlayerList();
    		
    	});
    	
    	/////
    	///// button
    	/////
    	
    	
    },
    
    renderPlayerList: function() {
    	
    	/////
    	///// clear
    	/////
    	
    	$('#review_page-playerlist').empty().listview('refresh');
    	
    	/////
    	///// render
    	/////
    	
    	dbManager.getAllPlayersByTeam( selected_teamgroup_guid, function(players) {
    		
    		//
    		//
    		//
    		
    		var len = players.length;
    		console.log('number of players in this group : ' + len);
    		if(len <= 0) {
    			return false;
    		}
    		
    		//
    		//
    		//
    		
    		var li_class = '', 
				a_class = 'class="ui-btn"';
    		
    		for(var i = 0; i < len; i++) {
    			
    			// li class
    			if(i == 0) {
    				li_class = 'class="ui-first-child"';
    			} else if(i == len - 1) {
    				li_class = 'class="ui-last-child"';
    			}
    			
    			// team
    			var player = players.item(i);
    			
    			//
    			// append
    			//
    			
    			$('#review_page-playerlist').append(
					'<li ' + li_class + ' id="' + i + '">' +
	    				'<a href="#" ' + a_class + '>' + // url
		    				'<div class="player_name">' + 
		    					'<h2>' + player.first_name + ' ' + player.last_name + '<img class="forward" src="img/forward_w.png" /></h2>' +
			    			'</div>' +
			    			'<span class="player_guid" style="display: none;">' + player.guid + '</span>' + 
			    			'<span class="player_firstname" style="display: none;">' + player.first_name + '</span>' + 
			    			'<span class="player_lastname" style="display: none;">' + player.last_name + '</span>' + 
		    			'</a>' +
		    		'</li>'
				);
				
				//
				// event
				//
				
				$('#review_page-playerlist').find('li[id="' + i + '"]').on('tap', function() {
					
					// get
					selected_player_guid = $(this).find('a span.player_guid').text();
					
					// console.log('selected player : ' + selected_player_guid);
					
					//
					$.mobile.changePage('#review_page-selectlog');
					
				});
				
				if(i == len - 1) {
					$('#review_page-playerlist').listview('refresh');
				}
				
    		}
    	});
    	
    },
    
    
    
    
    
    
    addEventHandler_ReviewPageSelectActivityLog: function() {
    	
    	/////
    	///// page events
    	/////
    	
    	$('#review_page-selectlog').on('pageinit', function() {
    		
    	});
    	
    	$('#review_page-selectlog').on('pagebeforeshow', function() {
    		
    	});
    	
    	$('#review_page-selectlog').on('pageshow', function() {
    		
    		app.renderPlayerActivityHistory();
    		
    	});
    	
    	/////
    	///// button
    	///// 
    	
    	
    },
    
    renderPlayerActivityHistory: function() {
    	
    	/////
    	///// clear
    	/////
    	
    	$('#review_page-activityloglist').empty().listview('refresh');
    	
    	/////
    	///// render
    	/////
    	
    	dbManager.getActivityLogsByUser( selected_player_guid, function(logs) {
    		
    		//
    		//
    		//
    		
    		var len = logs.length;
    		// console.log('user (' + loggedin_user_guid + ') activity log found : ' + len);
    		if(len == 0) {
    			return false;
    		}
    		
    		//
    		//
    		//
    		
    		var li_class = '',
    			a_class = 'class="ui-btn"';
    			
    		for(var i = 0; i < len; i++) {
    			
    			// li class
    			if(i == 0) {
    				li_class = 'class="ui-first-child"';
    			} else if(i == len - 1) {
    				li_class = 'class="ui-last-child"';
    			}
    			
    			// log
    			var log = logs.item(i);
    			
    			//
    			// append
    			//
    			
    			$('#review_page-activityloglist').append(
    				'<li ' + li_class + ' id="' + i + '">' +
    					'<a href="#review_page" ' + a_class + '>' +
    						'<p><span class="log_title">' + log.skill_title + '</span></p>' +
    						'<p><span class="log_time">' + moment( log.last_mod, 'X' ).format('DD-MM-YYYY HH:mm') + '</span></p>' +
    						'<span class="log_guid" style="display: none;">' + log.log_guid + '</span>' +
    						'<span class="exercise" style="display: none;">' + log.exe_title + '</span>' +
    						'<span class="skill" style="display: none;">' + log.skill_title + '</span>' +
    						'<span class="logdate" style="display: none;">' + log.last_mod + '</span>' +
    						'<span class="pace" style="display: none;">' + log.pace + '</span>' +
    						'<span class="spin" style="display: none;">' + log.spin + '</span>' +
    						'<span class="score" style="display: none;">' + log.score + '</span>' +
    						'<span class="notes" style="display: none;">' + log.notes + '</span>' +
    						'<span class="comments" style="display: none;">' + log.comments + '</span>' +
    						'<span class="log_comment_author" style="display: none;">' + log.author_name + '</span>' +
    					'</a>' +
    				'</li>'
    			);
    			
    			//
    			// event
    			//
    			
    			$('#review_page-activityloglist').find('li[id="' + i + '"]').on('tap', function() {
    				
    				// get
    				selected_log_guid 			= $(this).find('span.log_guid').text();
    				selected_log_exercise 		= $(this).find('span.exercise').text();
    				selected_log_skill 			= $(this).find('span.skill').text();
    				selected_log_date 			= $(this).find('span.logdate').text();
    				
    				selected_log_pace 			= $(this).find('span.pace').text();
    				selected_log_spin 			= $(this).find('span.spin').text();
    				selected_log_score 			= $(this).find('span.score').text();
    				selected_log_notes 			= $(this).find('span.notes').text();
    				selected_log_comments 		= $(this).find('span.comments').text();
    				selected_log_comment_author = $(this).find('span.log_comment_author').text();
    				
    				// console.log('selected log guid : ' + selected_log_guid);
    				
    				// set
    				$('#review_activity_log_brief').find('span.exercise').text( selected_log_exercise );
			    	$('#review_activity_log_brief').find('span.skill').text( selected_log_skill );
			    	$('#review_activity_log_brief').find('span.logdate').text( moment( selected_log_date, 'X' ).format('DD-MM-YYYY HH:mm') );
			    	
			    	$('#review_activity_log_results').find('div.pace').find('input').val( selected_log_pace );
			    	$('#review_activity_log_results').find('div.pace').find('input').val( selected_log_spin );
			    	$('#review_activity_log_results').find('div.score').find('input').val( selected_log_score );
			    	$('#review_activity_log_results').find('div.notes').find('textarea').val( selected_log_notes );
			    	$('#review_activity_log_results').find('div.comments').find('textarea').val( selected_log_comments );
    				
    				//
    				$.mobile.changePage( '#review_page' );
    				
    			});
    			
    		}
    		
    	});
    	
    },
    
    saveReview: function() { 
    	
    	// get input values
    	var comments = $('#review_activity_log_results').find('div.comments textarea').val();
    	var comment_author_guid = loggedin_user_guid;
    	var comment_creation_date = utils.getCurrentUnixTime();
    	var guid = selected_log_guid;
    	
    	var log = {
    		guid : guid,
    		comments : comments,
    		comment_author_guid : comment_author_guid,
    		comment_creation_date : comment_creation_date,
    		last_modified : comment_creation_date
    	};
    	
    	console.log('New log review added...');
    	console.log(log);
    	
    	// save values
    	dbManager.updateActivityLogReview(log, function() {
    		
    		console.log('new log review saved in local database');
    		
    		// close popup
    		$('#popup_save_review').popup('close');
    		
    		history.back();
    		// $.mobile.back();

    	});
    	
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    addEventHandler_CriteriaPageSelectGroup: function() {
    	
    	/////
    	///// page events
    	/////
    	
    	$('#criteria_page-selectgroup').on('pageinit', function() {
    		
    	});
    	
    	$('#criteria_page-selectgroup').on('pagebeforeshow', function() {
    		
    	});
    	
    	$('#criteria_page-selectgroup').on('pageshow', function() {
    		
    		app.renderGroupList();
    		
    	});
    	
    	/////
    	///// buttons
    	/////
    	
    	
    },
    
    renderGroupList: function() {
    	
    	/////
    	///// clear
    	/////
    	
    	$('#criteria_grouplist').empty().listview('refresh');
    	
    	/////
    	///// render
    	/////
    	
    	dbManager.getAllTeams( function(teams) {
    		
    		//
    		//
    		//
    		
    		var len = teams.length;
    		if(len <= 0) {
    			return false;
    		}
    		
    		//
    		//
    		//
    		
    		var li_class = '', 
				a_class = 'class="ui-btn"';
    		
    		for(var i = 0; i < len; i++) {
    			
    			// li class
    			if(i == 0) {
    				li_class = 'class="ui-first-child"';
    			} else if(i == len - 1) {
    				li_class = 'class="ui-last-child"';
    			}
    			
    			// team
    			var team = teams.item(i);
    			
    			//
    			// append
    			//
    			
    			$('#criteria_grouplist').append(
					'<li ' + li_class + ' id="' + i + '">' +
	    				'<a href="#" ' + a_class + '>' + // url
		    				'<div class="team_title">' + 
		    					'<h2>' + team.team + '<img class="forward" src="img/forward_w.png" /></h2>' +
			    			'</div>' +
			    			'<span class="team_guid" style="display: none;">' + team.guid + '</span>' + 
			    			'<span class="team_title" style="display: none;">' + team.team + '</span>' + 
		    			'</a>' +
		    		'</li>'
				);
				
				//
				// event
				//
				
				$('#criteria_grouplist').find('li[id="' + i + '"]').on('tap', function() {
					
					// get
					selected_teamgroup_guid = $(this).find('a span.team_guid').text();
					selected_teamgroup		= $(this).find('a span.team_title').text();
					
					// console.log('selected group : '+selected_teamgroup);
					// console.log('selected group_guid : '+selected_teamgroup_guid);
					
					//
					$.mobile.changePage('#criteria_page');
				});
				
				if(i == len - 1) {
					$('#criteria_grouplist').listview('refresh');
				}
				
    		}
    	});
    },
    
    
    
    addEventHandler_CriteriaPage: function() {
    	
    	/////
    	///// page events
    	/////
    	
    	$('#criteria_page').on('pageinit', function() {
    		
    	});
    	
    	$('#criteria_page').on('pagebeforeshow', function() {
    		
    		app.pageBeforeShow_Clear_CriteriaPage();
    		
    	});
    	
    	$('#criteria_page').on('pageshow', function() {
    		
    		$('#criteria_page h2.team_title').text(selected_teamgroup);
    		
    		app.renderCriteriaList();
    		
    	});
    	
    	//
    	//
    	// buttons
    	//
    	//
    	
    	$('#btn_back_criteria').on('tap', function() {
    		
    		app.saveCriteria();
    		
    	});
    	
    },
    
    renderCriteriaList: function() {
    	
    	/////
    	///// clear
    	/////
    	
    	$('#c_batting_list').empty();
    	$('#c_bowling_list').empty();
    	$('#c_fielding_list').empty();
    	$('#c_others_list').empty();
    	
    	/////
    	///// render
    	/////
    	
    	dbManager.getSkillsByCriteria( window.localStorage['EXERCISE_BATTING'], selected_teamgroup_guid, function(team_skills) {
    		
    		var teamSkills = [];
    		for(var i = 0; i < team_skills.length; i++) {
    			teamSkills.push( team_skills.item(i).guid );
    		}
    		
    		//
    		//
    		//
    		
    		dbManager.getSkillsByExercise( window.localStorage['EXERCISE_BATTING'], function(skills) {
    			
    			//
    			//
    			//
	    		
	    		var len = skills.length;
	    		// console.log('skills in exercise : ' + skills.length);
	    		if(len <= 0) {
	    			return false;
	    		}
	    		
	    		//
	    		//
	    		//
	    		
	    		var li_class = '', 
					a_class = 'class="ui-btn"';
	    		
	    		for(var i = 0; i < len; i++) {
	    			
	    			// li class
	    			if(i == 0) {
	    				li_class = 'class="ui-first-child"';
	    			} else if(i == len - 1) {
	    				li_class = 'class="ui-last-child"';
	    				}
	    			
	    			// skill
	    			var skill = skills.item(i);
	    			
	    			//
	    			// append
	    			//
	    			
	    			$('#c_batting_list').append(
						// '<li>' +
		    				// '<div class="ui-checkbox" id="' + skill.guid + '">' + 
				    			// '<label for="checkbox-'+i+'" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off">' + skill.skill + '</label>' +
				    			// '<input type="checkbox" name="checkbox-'+i+'" id="checkbox-'+i+'">' + 
				    			// '<span class="skill_guid" style="display: none;">' + skill.guid + '</span>' + 
				    		// '</div>' +
			    		// '</li>'
			    		'<div id="'+skill.guid+'">'+
				    		'<label for="checkbox-'+i+'">' + skill.skill + '</label>' +
			    			'<input type="checkbox" name="checkbox-'+i+'" id="checkbox-'+i+'">' + 
			    			'<span class="skill_guid" style="display: none;">' + skill.guid + '</span>'+
		    			'</div>'
					).trigger('create');
					
					// set check value
					if( teamSkills.indexOf( skill.guid ) > -1 ) {
						$('#c_batting_list').find('div[id="' + skill.guid + '"]').find('label').addClass('ui-checkbox-on');
						// $('#c_batting_list').find('li input[type="checkbox"]').prop('checked', true);
					}
					
					//
					// event
					//
					
					$('#c_batting_list').find('div[id="' + skill.guid + '"]').on('tap', function() {
						
						// if( $(this).find('label').hasClass('ui-checkbox-on') ) {
							// $(this).find('label').removeClass('ui-checkbox-on').addClass('ui-checkbox-off');
						// } else {
							// $(this).find('label').removeClass('ui-checkbox-off').addClass('ui-checkbox-on');
						// }
						
					});
					
					// if(i == len - 1) {
						// $('#c_batting_list').listview('refresh');
					// }
	    		}
	    		
	    	});
    		
    	});
    	
    	dbManager.getSkillsByCriteria( window.localStorage['EXERCISE_BOWLING'], selected_teamgroup_guid, function(team_skills) {
    		    		
    		var teamSkills = [];
    		for(var i = 0; i < team_skills.length; i++) {
    			teamSkills.push( team_skills.item(i).guid );
    		}
    		
    		//
    		//
    		//
    		
    		dbManager.getSkillsByExercise( window.localStorage['EXERCISE_BOWLING'], function(skills) {
	    		
	    		//
	    		//
	    		//
	    		
	    		var len = skills.length;
	    		// console.log('skills in exercise : ' + skills.length);
	    		if(len <= 0) {
	    			return false;
	    		}
	    		
	    		//
	    		//
	    		//
	    		
	    		var li_class = '', 
					a_class = 'class="ui-btn"';
	    		
	    		for(var i = 0; i < len; i++) {
	    			
	    			// li class
	    			if(i == 0) { 
	    				li_class = 'class="ui-first-child"';
	    			} else if(i == len - 1) {
	    				li_class = 'class="ui-last-child"';
	    			}
	    			
	    			// skill
	    			var skill = skills.item(i);
	    			
	    			//
	    			// append
	    			//
	    			
	    			$('#c_bowling_list').append(
						// '<li>' +
		    				// '<div class="ui-checkbox" id="' + skill.guid + '">' + 
				    			// '<label for="checkbox-'+i+'" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off">' + skill.skill + '</label>' +
				    			// '<input type="checkbox" name="checkbox-'+i+'" id="checkbox-'+i+'">' + 
				    			// '<span class="skill_guid" style="display: none;">' + skill.guid + '</span>' + 
				    		// '</div>' +
			    		// '</li>'
			    		'<div id="'+skill.guid+'">'+
				    		'<label for="checkbox-'+i+'">' + skill.skill + '</label>' +
			    			'<input type="checkbox" name="checkbox-'+i+'" id="checkbox-'+i+'">' + 
			    			'<span class="skill_guid" style="display: none;">' + skill.guid + '</span>'+
		    			'</div>'
					).trigger('create');
					
					// set check value
					if( teamSkills.indexOf( skill.guid ) > -1 ) {
						$('#c_bowling_list').find('div[id="' + skill.guid + '"]').find('label').addClass('ui-checkbox-on');
						// $('#c_bowling_list').find('li input[type="checkbox"]').prop('checked', true);
					}
					
					//
					// event
					//
					
					$('#c_bowling_list').find('div[id="' + skill.guid + '"]').on('tap', function() {
						
						// if( $(this).find('label').hasClass('ui-checkbox-on') ) {
							// $(this).find('label').removeClass('ui-checkbox-on').addClass('ui-checkbox-off');
						// } else {
							// $(this).find('label').removeClass('ui-checkbox-off').addClass('ui-checkbox-on');
						// }
						
					});
					
					// if(i == len - 1) {
						// $('#c_bowling_list').listview('refresh');
					// }
	    		}
	    		
	    	});
    		
    	});
    	
    	dbManager.getSkillsByCriteria( window.localStorage['EXERCISE_FIELDING'], selected_teamgroup_guid, function(team_skills) {
    		
    		var teamSkills = [];
    		for(var i = 0; i < team_skills.length; i++) {
    			teamSkills.push( team_skills.item(i).guid );
    		}
    		
    		//
    		//
    		//
    		
    		dbManager.getSkillsByExercise( window.localStorage['EXERCISE_FIELDING'], function(skills) {
	    		
	    		//
	    		//
	    		//
	    		
	    		var len = skills.length;
	    		// console.log('skills in exercise : ' + skills.length);
	    		if(len <= 0) {
	    			return false;
	    		}
	    		
	    		//
	    		//
	    		//
	    		
	    		var li_class = '', 
					a_class = 'class="ui-btn"';
	    		
	    		for(var i = 0; i < len; i++) {
	    			
	    			// li class
	    			if(i == 0) {
	    				li_class = 'class="ui-first-child"';
	    			} else if(i == len - 1) {
	    				li_class = 'class="ui-last-child"';
	    			}
	    			
	    			// skill
	    			var skill = skills.item(i);
	    			
	    			//
	    			// append
	    			//
	    			
	    			$('#c_fielding_list').append(
						// '<li>' +
		    				// '<div class="ui-checkbox" id="' + skill.guid + '">' + 
				    			// '<label for="checkbox-'+i+'" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off">' + skill.skill + '</label>' +
				    			// '<input type="checkbox" name="checkbox-'+i+'" id="checkbox-'+i+'">' + 
				    			// '<span class="skill_guid" style="display: none;">' + skill.guid + '</span>' + 
				    		// '</div>' +
			    		// '</li>'
			    		'<div id="'+skill.guid+'">'+
				    		'<label for="checkbox-'+i+'">' + skill.skill + '</label>' +
			    			'<input type="checkbox" name="checkbox-'+i+'" id="checkbox-'+i+'">' + 
			    			'<span class="skill_guid" style="display: none;">' + skill.guid + '</span>'+
		    			'</div>'
					).trigger('create');
					
					// set check value
					if( teamSkills.indexOf( skill.guid ) > -1 ) {
						$('#c_fielding_list').find('div[id="' + skill.guid + '"]').find('label').addClass('ui-checkbox-on');
						// $('#c_bowling_list').find('li input[type="checkbox"]').prop('checked', true);
					}
					
					//
					// event
					//
					
					$('#c_fielding_list').find('div[id="' + skill.guid + '"]').on('tap', function() {
						
						// if( $(this).find('label').hasClass('ui-checkbox-on') ) {
							// $(this).find('label').removeClass('ui-checkbox-on').addClass('ui-checkbox-off');
						// } else {
							// $(this).find('label').removeClass('ui-checkbox-off').addClass('ui-checkbox-on');
						// }

					});
					
					// if(i == len - 1) {
						// $('#c_fielding_list').listview('refresh');
					// }
	    		}
	    		
	    	});
    		
    	});
    	
    	dbManager.getSkillsByCriteria( window.localStorage['EXERCISE_OTHERS'], selected_teamgroup_guid, function(team_skills) {
    		
    		var teamSkills = [];
    		for(var i = 0; i < team_skills.length; i++) {
    			teamSkills.push( team_skills.item(i).guid );
    		}
    		
    		//
    		//
    		//
    		
    		dbManager.getSkillsByExercise( window.localStorage['EXERCISE_OTHERS'], function(skills) {
	    		
	    		//
	    		//
	    		//
	    		
	    		var len = skills.length;
	    		// console.log('skills in exercise : ' + skills.length);
	    		if(len <= 0) {
	    			return false;
	    		}
	    		
	    		//
	    		//
	    		//
	    		
	    		var li_class = '', 
					a_class = 'class="ui-btn"';
	    		
	    		for(var i = 0; i < len; i++) {
	    			
	    			// li class
	    			if(i == 0) { 
	    				li_class = 'class="ui-first-child"';
	    			} else if(i == len - 1) { 
	    				li_class = 'class="ui-last-child"'; 
	    			}
	    			
	    			// skill
	    			var skill = skills.item(i);
	    			
	    			//
	    			// append
	    			//
	    			
	    			$('#c_others_list').append(
						// '<li>' +
		    				// '<div class="ui-checkbox" id="' + skill.guid + '">' + 
				    			// '<label for="checkbox-'+i+'" class="ui-btn ui-corner-all ui-btn-inherit ui-btn-icon-left ui-checkbox-off">' + skill.skill + '</label>' +
				    			// '<input type="checkbox" name="checkbox-'+i+'" id="checkbox-'+i+'">' + 
				    			// '<span class="skill_guid" style="display: none;">' + skill.guid + '</span>' + 
				    		// '</div>' +
			    		// '</li>'
			    		'<div id="'+skill.guid+'">'+
				    		'<label for="checkbox-'+i+'">' + skill.skill + '</label>' +
			    			'<input type="checkbox" name="checkbox-'+i+'" id="checkbox-'+i+'">' + 
			    			'<span class="skill_guid" style="display: none;">' + skill.guid + '</span>'+
		    			'</div>'
					).trigger('create');
					
					// set check value
					if( teamSkills.indexOf( skill.guid ) > -1 ) {
						$('#c_others_list').find('div[id="' + skill.guid + '"]').find('label').addClass('ui-checkbox-on');
						// $('#c_bowling_list').find('li input[type="checkbox"]').prop('checked', true);
					}
					
					//
					// event
					//
					
					$('#c_others_list').find('div[id="' + skill.guid + '"]').on('tap', function() {
						
						// if( $(this).find('label').hasClass('ui-checkbox-on') ) {
							// $(this).find('label').removeClass('ui-checkbox-on').addClass('ui-checkbox-off');
						// } else {
							// $(this).find('label').removeClass('ui-checkbox-off').addClass('ui-checkbox-on');
						// }

					});
					
					// if(i == len - 1) {
						// $('#c_others_list').listview('refresh');
					// }
	    		}
	    		
	    	});
    		
    	});
    	
    },
    
    saveCriteria: function() {
    	
    	var collection = [];
    	
    	// get checked skills by exercise
    	var exe_arr = [];
    	exe_arr.push( $('#c_batting_list div') );
    	exe_arr.push( $('#c_bowling_list div') );
    	exe_arr.push( $('#c_fielding_list div') );
    	exe_arr.push( $('#c_others_list div') );
    	
    	var last_mod = utils.getCurrentUnixTime();
    	
    	for( var i in exe_arr ) {
    		var exe = exe_arr[i];
    		
    		exe.each( function(idx, div) {

    			var chkbox = $(div).find('label');
    			
    			if( chkbox.hasClass('ui-checkbox-on') ) {
    				
    				var skguid = $(div).find('span.skill_guid').text();
    				
    				collection.push( {
    					team_guid : selected_teamgroup_guid, 
    					skill_guid : skguid,
    					status : 1,
    					deleted : 0,
    					last_modified : last_mod
    				} );
    				
    			} else {
    				
    				var skguid = $(div).find('span.skill_guid').text();
    				
    				collection.push( {
    					team_guid : selected_teamgroup_guid, 
    					skill_guid : skguid,
    					status : 0,
    					deleted : 0,
    					last_modified : last_mod
    				} );
    				
    			}
    			
    		} );
    	}
    	
    	// console.log(JSON.stringify(collection));
    	
    	dbManager.updateAllTeamGroupCriteria(collection, function() {
    		
    		console.log('all group criteria is updated');
     		
    	});
    	
    },
    
    
    
    
    
    
    
    
    
    
    
    addEventHandler_CalendarPage: function() {
    	
    	/////
    	///// page events
    	/////
    	
    	$('#calendar_page').on('pageinit', function(event) {
    		
    	});
    	
    	$('#calendar_page').on('pagebeforeshow', function(event) {
    		
    		$('#calendar_page').find('div[data-role=navbar]').find('a.per_cal').addClass('ui-btn-active');
    		
    	});
    	
    	$('#calendar_page').on('pageshow', function(event) {
    		
    		if(calendar.calendar === null) {
    			calendar.init('#calendar');
    		}
    		
    		calendar.refreshCalendar();
    		
    	});
    	
    	/////
    	///// buttons
    	/////
    	
    	$('#calendar_page').on({
    		'tap': function() { 
    			// console.log('tap');
    			app.openPopup_AddEventPage();
    		},
    		'taphold': function() {
    			// console.log('taphold');
    			isTapHold_CalendarPage = true;
    		}
    	});
    	
    	$('#change_page_to_addevent').on('tap', function() { 
    		
    		app.changePageTo_AddEvent(); 
    		
    	});
    	
    	$('#close_popup_add_event').on('tap', function() { 
    		
    		app.closePopup_AddEvent(); 
    		
    	});
    	
    },
	
	openPopup_AddEventPage: function() {
		
		if(selectedDate !== null && isTapHold_CalendarPage === true) {
			
			$('#popup_add_event .date').text( selectedDate );
			$('#popup_add_event').popup('open');
			
		} else {
			
			isTapHold_CalendarPage = false;
			// selectedDate = null;
			
		}
		
	},
	
    changePageTo_AddEvent: function() {
    	
    	$.mobile.changePage('#calendar_page-addevent');
    	
    	isTapHold_CalendarPage = false;
    	//selectedDate = null;
    	
    },
    
    closePopup_AddEvent: function() {
    	
    	$('#popup_add_event').popup('close');
    	
    	isTapHold_CalendarPage = false;
    	// selectedDate = null;
    	
    },
    
    
    
    
    
    
    
    
    addEventHandler_CalendarPageAddEvent: function() {
    	
    	/////
    	///// page events
    	/////
    	
    	$('#calendar_page-addevent').on('pageinit', function(event) {
    		
    	});
    	
    	$('#calendar_page-addevent').on('pagebeforeshow', function(event) {
    		
    		app.pageBeforeShow_Clear_AddEventPage();
    		
    	});
    	
    	$('#calendar_page-addevent').on('pageshow', function(event) {
    		
    		$('span.event_date').text(selectedDate);
    		
    	});
    	
    	/////
    	///// buttons
    	/////
    	
    	$('#save_event').on('tap', function() {
    		
    		app.saveNewCalendarEvent();
    		
    	});
    	
    },
    
	saveNewCalendarEvent: function() {
		
		var title 	 = $('#event_title').val(),
			location = $('#event_location').val(),
			notes 	 = $('#event_notes').val();	
		
		var from_time = $('#select_fromtime').val(),
			from_ampm = $('#select_fromampm').val(),
			to_time   = $('#select_totime').val(),
			to_ampm   = $('#select_toampm').val();
			
		var from = utils.convertToRealTime(parseInt(from_time), from_ampm),
			to = utils.convertToRealTime(parseInt(to_time), to_ampm);
			
		var y = moment(selectedDate, 'DD-MM-YYYY').format('YYYY');
		var m = moment(selectedDate, 'DD-MM-YYYY').format('MM');
		var d = moment(selectedDate, 'DD-MM-YYYY').format('DD');
		
		var startDate = new Date(y, (m-1), d, parseInt(from), 0, 0, 0, 0);
		var endDate   = new Date(y, (m-1), d, parseInt(to), 0, 0, 0, 0);
		
			console.log(startDate);
			console.log(endDate);
		
		//
		app.createEvent(title, location, notes, startDate, endDate);
		
	},
	
	
	
	
	
	
	
	
	
	addEventHandler_MessageDetailsPage: function() {
		
	},
	
	
	
	
	
	
	addEventHandler_MessageListPage: function() {
		
		/////
		///// page events
		/////
		
		$('#message_list_page').on('pageinit', function(event) {
			
		});
		
		$('#message_list_page').on('pagebeforeshow', function(event) {
			
		});
		
		$('#message_list_page').on('pageshow', function(event) {
			
			app.renderMessageList();
			
		});
		
		/////
		///// buttons
		/////
		
		$('#btn_goback_message_list').on('tap', function() {
			
			$.mobile.changePage('#home_page');
			
		});
		
	},
	
	renderMessageList: function() {
		
		/////
		///// clear
		/////
		
		$('#message_list').empty().listview('refresh');
		
		/////
		///// render
		/////
		
		dbManager.getAllMessages( function(messages) {
			
    		//
    		//
    		//
    		
    		var len = messages.length;
    		// console.log('get all messages, found : '+messages.length);
    		if(len === 0) {
    			return false;
    		}
    		
    		//
    		//
    		//
    		
    		var li_class = '', 
    			a_class = 'class="ui-btn"';
    		var current_start_month = 0;
    		var no_divider = 0;
    		
    		for(var i = 0; i < len; i++) {
    			
    			// li class
    			if(i == 0) {
    				li_class = 'class="ui-first-child"';
    			} else if(i == len - 1) {
    				li_class = 'class="ui-last-child"';
    			}
    			
    			// message
    			var msg = messages.item(i);
    			
    			// list divider
    			var start_month = app.readableMonth(msg.creation_date, 1);
    			if(start_month != current_start_month) {
    				$('#message_list').append(
    					'<li data-role="list-divider" '+li_class+' class="ui-li-divider ui-bar-inherit">' + app.readableMonth(msg.creation_date, 0) + '</li>'
    				);
    				current_start_month = start_month;
    				no_divider++;
    			}
    			
    			//
    			//
    			// append
    			//
    			//
    			$('#message_list').append(
    				'<li ' + li_class + ' id="' + i + '">' +
	    				'<a href="#message_page-details" ' + a_class + '>' + // url
		    				'<div class="message_title">' + 
		    					'<h2>' + msg.title + '</h2>' +
			    				'<p>' + msg.content + '</p>' +
			    				'<p class="ui-li-aside"><span class="creation_date">' + moment(msg.creation_date, 'X').format('DD-MMM HH:mm') + '</span></p>' +
			    				'<span class="message_guid" style="display: none;">' + msg.guid + '</span>' +
			    				// '<span class="message_title" style="display: none;">' + msg.title + '</span>' +
			    				// '<span class="message_author" style="display: none;">' + msg.author + '</span>' +
			    				// '<span class="message_content" style="display: none;">' + msg.content + '</span>' +
			    				// '<span class="message_time" style="display: none;">' + msg.creation_date + '</span>' +
			    			'</div>' + 
		    			'</a>' +
		    		'</li>'
    			);
    			
    			$('#message_list').find('li[id="'+i+'"]').on('tap', function() {
    				
    				selected_message_guid = $(this).find('span.message_guid').text();
    				
    				dbManager.getMessageInfo( selected_message_guid, function(message) {
    					 
    					selected_message_guid 	 = message.guid;
	    				selected_message_title 	 = message.title;
	    				selected_message_author  = message.author;
	    				selected_message_content = message.content;
	    				selected_message_time 	 = message.creation_date;
	    				
	    				// console.log('selected message guid : ' + selected_message_guid);
	    				// console.log('selected message title : ' + selected_message_title);
	    				// console.log('selected message author : ' + selected_message_author);
	    				// console.log('selected message content : ' + selected_message_content);
	    				// console.log('selected message time : ' + selected_message_time);
	    				
	    				// console.log(JSON.stringify(message));
	    				
	    				// set
    				
	    				$('#message_brief').find('span.message_title').text( selected_message_title );
						$('#message_brief').find('span.message_time').text( moment(parseInt(selected_message_time), 'X').format('DD-MMM-YYYY HH:mm') );
						$('#message_brief').find('span.message_author').text( selected_message_author );
						$('#message_brief').find('span.message_content').text( selected_message_content );
    					
    					//
    					$.mobile.changePage('#message_page-details');
    					
    				} );
    				
    			});
    		}
			
		} );
		
	},
	
	
	
	
	
	
	
	addEventHandler_MessageCreatePage: function() {
		
		/////
		///// page events
		/////
		
		$('#message_page-create').on('pageinit', function(event) {
			
		});
		
		$('#message_page-create').on('pagebeforeshow', function(event) {
			
		});
		
		$('#message_page-create').on('pageshow', function(event) {
			
		});
		
		/////
		///// buttons
		/////
		
		$('#save_message').on('tap', function() {
			
			app.saveMessage();
			
		});
		
	},
	
	saveMessage: function() {
		
		/////
		///// get
		/////
		
		var msg_title = $('#message_create_title').val();
		var msg_content = $('#message_create_content').val();
		var msg_creation_date = utils.getCurrentUnixTime();
		var new_msg = {
			guid : utils.guid('message'),
			title : msg_title,
			content : msg_content,
			author_guid : loggedin_user_guid,
			creation_date: msg_creation_date,
			deleted : 0,
			last_modified: msg_creation_date
		};
		
		/////
		/////
		/////
		
		dbManager.insertMessage(new_msg, function() {
			
			// console.log('new message is saved in local database');
			
			$.mobile.changePage('#message_list_page');
			
		});
		
	},
	
	
	
	
	
	
	
    pageBeforeShow_Clear_HomePage: function() {
    	
		$('#latest_message_list a').removeClass('ui-btn-active');
		
		$('#home_page').find('a[href="#activity_log_page"]').removeClass('ui-btn-active');
		$('#home_page').find('a[href="#training_page-selectskill"]').removeClass('ui-btn-active');
		$('#home_page').find('a[href="#calendar_page"]').removeClass('ui-btn-active');
		
    },
    
    pageBeforeShow_Clear_MessagePage: function() {
    	
    },
    
    pageBeforeShow_Clear_ActivityPage: function() {
    	
    },
    
    pageBeforeShow_Clear_LogDetailsPage: function() {
    	
    	$('#activity_log_brief').find('span.exercise').text('');
    	$('#activity_log_brief').find('span.skill').text('');
    	$('#activity_log_brief').find('span.logdate').text('');
    	
    	$('#activity_log_results').find('div.pace').find('input').val('');
    	$('#activity_log_results').find('div.spin').find('input').val('');
    	$('#activity_log_results').find('div.score').find('input').val('');
    	$('#activity_log_results').find('div.notes').find('input').val('');
    	$('#activity_log_results').find('div.comments').find('input').val('');
    	
    },
    
    pageBeforeShow_Clear_SelectGroupPage: function() {
    	
    },
    
    pageBeforeShow_Clear_CriteriaPage: function() {
    	
		$('#c_batting_list_wrapper h2 a').removeClass('ui-btn-active');
		$('#c_bowling_list_wrapper h2 a').removeClass('ui-btn-active');
		$('#c_fielding_list_wrapper h2 a').removeClass('ui-btn-active');
		$('#c_others_list_wrapper h2 a').removeClass('ui-btn-active');
		
		$('#c_batting_list_wrapper').collapsible({collapsed : true});
		$('#c_bowling_list_wrapper').collapsible({collapsed : true});
		$('#c_fielding_list_wrapper').collapsible({collapsed : true});
		$('#c_others_list_wrapper').collapsible({collapsed : true});
		
		$('.ui-collapsible a.ui-btn').removeClass('ui-icon-plus').addClass('ui-nodisc-icon');
		$('.ui-collapsible')
			.collapsible({
				expand : function(event, ui) {
	    			$(this).find('a.ui-btn').removeClass('ui-icon-minus');
	    		}
	    	})
			.collapsible({
				collapse : function(event, ui) {
	    			$(this).find('a.ui-btn').removeClass('ui-icon-plus');
	    		}
	    	});
    	
    },
    
    pageBeforeShow_Clear_TrainingPage: function() {
    	
		$('#batting_list_wrapper h2 a').removeClass('ui-btn-active');
		$('#bowling_list_wrapper h2 a').removeClass('ui-btn-active');
		$('#fielding_list_wrapper h2 a').removeClass('ui-btn-active');
		$('#others_list_wrapper h2 a').removeClass('ui-btn-active');
		
		$('#batting_list_wrapper').collapsible({collapsed : true});
		$('#bowling_list_wrapper').collapsible({collapsed : true});
		$('#fielding_list_wrapper').collapsible({collapsed : true});
		$('#others_list_wrapper').collapsible({collapsed : true});
		
		$('.ui-collapsible a.ui-btn').removeClass('ui-icon-plus').addClass('ui-nodisc-icon');
		$('.ui-collapsible')
			.collapsible({
				expand : function(event, ui) {
	    			$(this).find('a.ui-btn').removeClass('ui-icon-minus');
	    		}
	    	})
			.collapsible({
				collapse : function(event, ui) {
	    			$(this).find('a.ui-btn').removeClass('ui-icon-plus');
	    		}
	    	});
	    	
    },
    
    pageBeforeShow_Clear_SkillPage: function() {
    	
    	$('#training_results div.pace input').val('');
    	$('#training_results div.spin input').val('');
    	$('#training_results div.score input').val('');
    	$('#training_results div.notes textarea').val('');
    	
    },
    
    pageBeforeShow_Clear_CalendarPage: function() {
    	
    },
    
    pageBeforeShow_Clear_EventPage: function() {
    	
    },
    
    pageBeforeShow_Clear_AddEventPage: function() {
    	
    	// clear variables
    	isTapHold_CalendarPage = false;
    	// selectedDate = null;
    	
    	// inputs
    	$('#event_title').text('');
    	$('#event_location').text('');
    	$('#event_from').text('');
    	$('#event_to').text('');
    	$('#event_notes').text('');
    	
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    createEventId: function() {
    	return utils.guid('event');
    },
    
    createEvent: function(title, location, notes, startDate, endDate) {
    	// create event id
    	var eventId = app.createEventId();
    	
    	// create event
    	events.createEvent(title, location, notes, startDate, endDate);
    	
    	// render event in named calendar
    	calendar.addEvent(eventId, title, location, notes, startDate.toString(), endDate.toString());
    },
    
    deleteEvent: function(title, location, notes, startDate, endDate) {
    	// delete event
    	events.deleteEvent(title, location, notes, startDate, endDate);
    	
    	// remove event from named calendar
    	calendar.removeEvent(title, location, notes, startDate.toString(), endDate.toString());
    },
    
    
    
    
    
    
    iFixIt: function() {
    	// for iOS, which is required for AJAX calls to inject pages.
        $.mobile.allowCrossDomainPages = true;
        
        // for iOS, statusbar
        // StatusBar.overlaysWebView(false);
        
        // disable JQM transitions to speed up performance
        $.mobile.defaultPageTransition   = 'none';
        $.mobile.defaultDialogTransition = 'none';
        $.mobile.buttonMarkup.hoverDelay = 0;
        
        // disble Ajax
        $.mobile.ajaxEnabled = false;
        
		// fastclick
        FastClick.attach(document.body);
    },
    
    // refreshPage: function() {
	  // $.mobile.changePage(
	    // window.location.href,
	    // {
	      // allowSamePageTransition : true,
	      // transition              : 'none',
	      // showLoadMsg             : false,
	      // reloadPage              : true
	    // }
	  // );
	// },
	
	loading: function(state, text, textonly) {
    	if(state === 'show') {
    		$.mobile.loading( state, {
	    		text: text, 
	    		textVisible: true, 
	    		theme: 'a', 
	    		html: '',
	    		textonly: textonly
	    	});
    	} else {
    		$.mobile.loading( state );
    	}
    },
	
	disableBtnsHomepage: function() {
		
		// $('#user_login').prop('disable', true);
		// $('#user_logout').prop('disable', true);
		// $('#sync_data').prop('disable', true);
		// $('a[href=#activity_log_page]').prop('disable', true);
		// $('a[href=#review_page-selectgroup]').prop('disable', true);
		// $('a[href=#training_page-selectskill]').prop('disable', true);
		// $('a[href=#criteria_page-selectgroup]').prop('disable', true);
		// $('a[href=#calendar_page]').prop('disable', true);
		
		$('#user_login').addClass('ui-state-disabled');
		$('#user_logout').addClass('ui-state-disabled');
		$('#sync_data').addClass('ui-state-disabled');
		
		$('a[href=#activity_log_page]').addClass('ui-state-disabled');
		$('a[href=#review_page-selectgroup]').addClass('ui-state-disabled');
		$('a[href=#training_page-selectskill]').addClass('ui-state-disabled');
		$('a[href=#criteria_page-selectgroup]').addClass('ui-state-disabled');
		$('a[href=#calendar_page]').addClass('ui-state-disabled');
		
	},
	
	enableBtnsHomepage: function() {
		
		$('#user_login').removeClass('ui-state-disabled');
		$('#user_logout').removeClass('ui-state-disabled');
		$('#sync_data').removeClass('ui-state-disabled');
		
		$('a[href=#activity_log_page]').removeClass('ui-state-disabled');
		$('a[href=#review_page-selectgroup]').removeClass('ui-state-disabled');
		$('a[href=#training_page-selectskill]').removeClass('ui-state-disabled');
		$('a[href=#criteria_page-selectgroup]').removeClass('ui-state-disabled');
		$('a[href=#calendar_page]').removeClass('ui-state-disabled');
		
	},
	
	readableMonth: function(datetime, output_type) {
		datetime = parseInt(datetime) * 1000;
		
    	return (output_type == 1) ? moment(datetime/1000, 'X').format('M') : moment(datetime/1000, 'X').format('MMMM');
    },
	
	setUserCapabilities: function(role) {
		
		switch( role ) {
			case 'player' :
				$('#main_menu_row_1').find('a[href="#activity_log_page"]').show();
				$('#main_menu_row_2').find('a[href="#training_page-selectskill"]').show();
				
				break;
			case 'coach' :
				$('#main_menu_row_1').find('a[href="#review_page-selectgroup"]').show();
				$('#main_menu_row_2').find('a[href="#criteria_page-selectgroup"]').show();
				
				$('#add_message').show();
				break;
			default :
				break;
		}
		
	},
	
	disableButtonsByRole: function() {
		
		$('#main_menu_row_1').find('a[href="#activity_log_page"]').hide();
		$('#main_menu_row_2').find('a[href="#training_page-selectskill"]').hide();
		$('#add_message').hide();
		
		$('#main_menu_row_1').find('a[href="#review_page-selectgroup"]').hide();
		$('#main_menu_row_2').find('a[href="#criteria_page-selectgroup"]').hide();
		
	},
	
	saveUserDataLogin: function() {

		window.localStorage['USER_LOGIN_STATUS'] 		= '1';
		
		window.localStorage['USER_LOGIN_GUID'] 			= loggedin_user_guid;
		window.localStorage['USER_LOGIN_USERNAME'] 		= loggedin_user_username;
		window.localStorage['USER_LOGIN_FIRSTNAME'] 	= loggedin_user_firstname;
		window.localStorage['USER_LOGIN_LASTNAME'] 		= loggedin_user_lastname;
		window.localStorage['USER_LOGIN_DOB'] 			= loggedin_user_dob;
		window.localStorage['USER_LOGIN_GENDER'] 		= loggedin_user_gender;
		window.localStorage['USER_LOGIN_ROLE'] 			= loggedin_user_role;
		window.localStorage['USER_LOGIN_ROLEGUID'] 		= loggedin_user_role_guid;
		window.localStorage['USER_LOGIN_SCHOOL'] 		= loggedin_user_school;
		window.localStorage['USER_LOGIN_SCHOOLGUID'] 	= loggedin_user_school_guid;
		window.localStorage['USER_LOGIN_TEAM'] 			= loggedin_user_team;
		window.localStorage['USER_LOGIN_TEAMGUID'] 		= loggedin_user_team_guid;
		window.localStorage['USER_LOGIN_CLUB'] 			= loggedin_user_club;
		window.localStorage['USER_LOGIN_CLUBGUID'] 		= loggedin_user_club_guid;
		window.localStorage['USER_LOGIN_COACH'] 		= loggedin_user_coach;
		window.localStorage['USER_LOGIN_COACHGUID'] 	= loggedin_user_coach_guid;
		window.localStorage['USER_LOGIN_LINK'] 			= loggedin_user_link;
		
	},
	
	clearUserDataLogout: function() {
		
		window.localStorage['USER_LOGIN_STATUS'] 		= '0';
		
		window.localStorage['USER_LOGIN_GUID'] 			= '';
		window.localStorage['USER_LOGIN_USERNAME'] 		= '';
		window.localStorage['USER_LOGIN_FIRSTNAME'] 	= '';
		window.localStorage['USER_LOGIN_LASTNAME'] 		= '';
		window.localStorage['USER_LOGIN_DOB'] 			= '';
		window.localStorage['USER_LOGIN_GENDER'] 		= '';
		window.localStorage['USER_LOGIN_ROLE'] 			= '';
		window.localStorage['USER_LOGIN_ROLEGUID'] 		= '';
		window.localStorage['USER_LOGIN_SCHOOL'] 		= '';
		window.localStorage['USER_LOGIN_SCHOOLGUID'] 	= '';
		window.localStorage['USER_LOGIN_TEAM'] 			= '';
		window.localStorage['USER_LOGIN_TEAMGUID'] 		= '';
		window.localStorage['USER_LOGIN_CLUB'] 			= '';
		window.localStorage['USER_LOGIN_CLUBGUID'] 		= '';
		window.localStorage['USER_LOGIN_COACH'] 		= '';
		window.localStorage['USER_LOGIN_COACHGUID'] 	= '';
		window.localStorage['USER_LOGIN_LINK'] 			= '';
		
	},
	
	saveTempUserDataLogin: function(user_profile) {
		
		loggedin_user_guid 			= user_profile.guid;
		loggedin_user_username 		= user_profile.username;
		loggedin_user_firstname 	= user_profile.first_name;
		loggedin_user_lastname 		= user_profile.last_name;
		loggedin_user_dob 			= user_profile.dob;
		loggedin_user_gender 		= user_profile.gender;
		loggedin_user_team_guid 	= user_profile.team_guid;
		loggedin_user_team 			= user_profile.team;
		loggedin_user_club_guid 	= user_profile.club_guid;
		loggedin_user_club 			= user_profile.club;
		loggedin_user_role_guid 	= user_profile.role_guid;
		loggedin_user_role 			= user_profile.role;
		loggedin_user_school_guid 	= user_profile.school_guid;
		loggedin_user_school 		= user_profile.school;
		loggedin_user_coach_guid 	= user_profile.coach_guid;
		loggedin_user_coach 		= user_profile.coach;
		loggedin_user_link 			= user_profile.link;
		
	},
	
	clearTempUserDataLogout: function() {
		
		loggedin_user_guid 			= '';
		loggedin_user_username 		= '';
		loggedin_user_firstname 	= '';
		loggedin_user_lastname 		= '';
		loggedin_user_dob 			= '';
		loggedin_user_gender 		= '';
		loggedin_user_team_guid 	= '';
		loggedin_user_team 			= '';
		loggedin_user_club_guid 	= '';
		loggedin_user_club 			= '';
		loggedin_user_role_guid 	= '';
		loggedin_user_role 			= '';
		loggedin_user_school_guid 	= '';
		loggedin_user_school 		= '';
		loggedin_user_coach_guid 	= '';
		loggedin_user_coach 		= '';
		loggedin_user_link 			= '';
		
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	login: function(callback) {
		
		/////
		///// show loading
		/////
		
		app.loading('show', 'logging in...', true);
		
		app.disableBtnsHomepage();
		
		/////
		///// get
		/////
		
		var username = $('#login_username').val();
		var password = $('#login_password').val();
		
		var url = window.localStorage['LOGIN_URL'] + 'login/' + username + '/' + password;
		
		// console.log(url);
		
		/////
		///// login
		/////
		
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			statusCode: {
				404: function() {
					
				},
				200: function() {
					
				}
			},
			success: function( data ) {
				
				// console.log( data );
				
				callback( JSON.parse( data ) );
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				
				console.log('failed, '+jqXHR+'; '+textStatus+'; '+errorThrown);
			
			}
		});
		
	},
	
	afterLogin: function(user_profile) {
		
		var resultCode 		= parseInt( user_profile.resultCode );
		var resultMessage 	= user_profile.resultMessage;
		
		// console.log('resultCode : ' + resultCode); 
		// console.log('resultMessage : ' + resultMessage);
		
		if(resultCode !== 0) {
			
			/////
			///// hide loading
			/////
			
			app.loading('show', 'login failed', true);
			setTimeout(function() {
				app.loading('hide');
			}, 2000);
			
			app.enableBtnsHomepage();
			
			return false;
			
		}

		/////
		/////
		/////
		
		app.saveTempUserDataLogin( user_profile.user_profiles );
		app.saveUserDataLogin();
		window.localStorage['USER_LAST_LOGIN'] = utils.getCurrentUnixTime();
		
		$('#user_brief').find('span.user_name').text( loggedin_user_firstname );
		$('#user_brief').find('span.user_team').text( loggedin_user_team==null?'':loggedin_user_team );
		$('#user_brief').find('span.user_club').text( loggedin_user_club );
		
		$('#home_panel ul li[data-role=list-divider]').show();
		
		$('#login_form').hide();
		$('#user_login').hide();
		$('#user_logout').show();
		$('#sync_data').show();
		
		app.setUserCapabilities( loggedin_user_role );
		
		/////
		///// hide loading
		/////
		
		app.loading('hide');
		
		app.enableBtnsHomepage();
		
	},
	
	logout: function(user_guid, callback) {
		
		/////
		///// show loading
		/////
		
		app.loading('show', 'logging out...', true);
		
		app.disableBtnsHomepage();
		
		/////
		///// logout
		/////
		
		// console.log('user logging out : ' + user_guid);
		
		var url = window.localStorage['LOGIN_URL'] + 'logout/' + user_guid;
		
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			statusCode: {
				404: function() {
					
				},
				200: function() {
					
				}
			},
			success: function( data ) {
				
				// console.log( data );
				
				callback( JSON.parse( data ) );
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				
				console.log('failed, '+jqXHR+'; '+textStatus+'; '+errorThrown);
			
			}
		});
		
	},
	
	afterLogout: function( result ) {
		
		var resultCode = parseInt( result.resultCode );
		var resultMessage = result.resultMessage;
		 
		// console.log('resultCode : ' + resultCode); 
		// console.log('resultMessage : ' + resultMessage);
		
		if(resultCode !== 0) {
			
			/////
			///// hide loading
			/////
			
			app.loading('show', 'logout failed', true);
			setTimeout(function() {
				app.loading('hide');
			}, 2000);
			
			app.enableBtnsHomepage();
			
			return false;
			
		}
		
		/////
		/////
		/////
		
		app.clearTempUserDataLogout();
		app.clearUserDataLogout();
		app.disableButtonsByRole();
		
		$('#user_brief').find('span.user_name').text( '' );
		$('#user_brief').find('span.user_team').text( '' );
		$('#user_brief').find('span.user_club').text( '' );
		
		$('#home_panel ul li[data-role=list-divider]').hide();
		
		$('#login_form').show();
		$('#user_login').show();
		$('#user_logout').hide();
		$('#sync_data').hide();
		
		/////
		///// hide loading
		/////
		
		app.loading('hide');
		
		app.enableBtnsHomepage();
		
	},
	
	
	
	
	
	syncData: function(callback) {
		
		console.log('Syncing start at '+moment().format('HH:mm:ss'));
		console.log('Last sync time : ' + moment(window.localStorage['LAST_MODIFIED'], 'X').format('YYYY-MM-DD HH:mm:ss') + ', ' + window.localStorage['LAST_MODIFIED'] );
		
		/////
		///// show loading
		/////
		
		app.loading('show', 'syncing data...', true);
		
		app.disableBtnsHomepage();
		
		/////
		///// get changes
		/////
		
		var jsonData = {}, bbb = [];
		var lll = [], mmm = [], ccc = [];
		
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
			dbManager.getChangesMessages( parseInt(window.localStorage['LAST_MODIFIED']), function(messages) { 
				
				var len = messages.length;
				console.log('Message changes : ' + len);
				if(len > 0) {
					for(var i = 0; i < len; i++) {
						mmm[i] = messages.item(i);
					}	
				}
				jsonData.messages = mmm;
				
			} )
		);
		
		bbb.push( 
			dbManager.getChangesGroupCriteria( parseInt(window.localStorage['LAST_MODIFIED']), function(criteria) {
				
				var len = criteria.length;
				console.log('Criteria changes : ' + len);
				if(len > 0) {
					for(var i = 0; i < len; i++) {
						ccc[i] = criteria.item(i);
					}
				}
				jsonData.criteria = ccc;
				
			} )
		);
		
		/////
		///// POST
		/////
		
		$.when.apply( $, bbb ).then(function() {
			
			console.log(JSON.stringify(jsonData));
			
			//
			//
			//
			
			var sss = [];
			var url = window.localStorage['LOGIN_URL'] + 'sync-all/' + parseInt( window.localStorage['LAST_MODIFIED'] );
			this_modified = utils.getCurrentUnixTime();
			
			//
			//
			//
			
			$.ajax({
				type: 'POST',
				url: url,
				data: JSON.stringify(jsonData),
				dataType: 'html',
				statusCode: {
					404: function() {
						
					},
					200: function() {
						
					}
				},
				success: function( data ) {
					
					// console.log('sync success');
					console.log( data );
					
					callback( JSON.parse( data ) );
					
				},
				error : function(jqXHR, textStatus, errorThrown) {
					
					console.log('failed, '+jqXHR+'; '+textStatus+'; '+errorThrown);
					
					/////
					///// hide loading
					/////
					
					console.log('Syncing end at '+moment().format('HH:mm:ss'));
					
					//
					app.renderLatestMessageList();
					
					//
					app.loading('hide');
				
					app.enableBtnsHomepage();
						
				} 
			});
		});
		
	},
	
	afterSync: function(data) {
		
		window.localStorage['LAST_MODIFIED'] = this_modified;
		
		/////
		///// set
		/////
		
		$('.sync_value').text( moment(this_modified, 'X').format('DD-MMM HH:mm') );
		
		/////
		///// update
		/////
		
		var roles 			= data.roles;
		var schools 		= data.schools;
		var teams 			= data.teams;
		var clubs 			= data.clubs;
		var sessions 		= data.sessions;
		var exercises 		= data.exercises;
		var skills 			= data.skills;
		var criteria 		= data.criteria;
		var messages 		= data.messages;
		var logs 			= data.activitylogs;
		var userprofiles 	= data.userprofiles;
		
		var printout = '';
		
		if(roles.length > 0) {
			
			dbManager.updateOrInsertRoles(roles, function() {
				// console.log('Table(Roles) is updated');
				printout += 'roles: 0; ';
			}); 
			
		}
		
		if(schools.length > 0) {
			
			dbManager.updateOrInsertSchools(schools, function() {
				// console.log('Table(Schools) is updated');
				printout += 'schools: 0; ';	
			});
			
		}
		
		if(teams.length > 0) {
			
			dbManager.updateOrInsertTeams(teams, function() {
				// console.log('Table(Teams) is updated');	
				printout += 'teams: 0; ';
			});
			
		}
		
		if(clubs.length > 0) {
			 
			dbManager.updateOrInsertRoles(clubs, function() {
				// console.log('Table(Clubs) is updated');	
				printout += 'clubs: 0; ';
			});
			
		}
		
		if(sessions.length > 0) {
			
			dbManager.updateOrInsertSessions(sessions, function() {
				// console.log('Table(Sessions) is updated');	
				printout += 'sessions: 0; ';
			});
			
		}
		
		if(exercises.length > 0) {
			
			dbManager.updateOrInsertExercises(exercises, function() {
				// console.log('Table(Exercises) is updated');	
				printout += 'exercises: 0; ';
			});
			
		}
		
		if(skills.length > 0) {
			
			dbManager.updateOrInsertSkills(skills, function() {
				// console.log('Table(Skills) is updated');
				printout += 'skills: 0; ';	
			});
			
		} 
		 
		if(criteria.length > 0) {
			
			dbManager.updateOrInsertGroupCriteria(criteria, function() {
				// console.log('Table(Criteria) is updated');	
				printout += 'criteria: 0; ';
			});
			
		}
		
		if(messages.length > 0) {
			
			dbManager.updateOrInsertMessages(messages, function() {
				// console.log('Table(Messages) is updated');	
				printout += 'messages: 0; ';
			});
			
		}
		
		if(logs.length > 0) { 
			
			dbManager.updateOrInsertActivityLogs(logs, function() {
				// console.log('Table(Activity logs) is updated');	
				printout += 'act-logs: 0; ';
			});
			
		}
		
		if(userprofiles.length > 0) {
			
			dbManager.updateOrInsertUserProfiles(userprofiles, function() {
				// console.log('Table(User profiles) is updated');	
				printout += 'user-profiles: 0; ';
			});
			
		}
		
		/////
		///// hide loading
		/////
		
		setTimeout(function() {
			
			console.log('Syncing end at '+moment().format('HH:mm:ss'));
			
			//
			app.renderLatestMessageList();
			
			//
			app.loading('hide');
		
			app.enableBtnsHomepage();
			
		}, 1000);
		
	}
	
};  


 


var loggedin_user_guid 			= '',
	loggedin_user_username 		= '',
	loggedin_user_firstname 	= '',
	loggedin_user_lastname 		= '',
	loggedin_user_dob 			= '',
	loggedin_user_gender 		= '',
	loggedin_user_team_guid 	= '',
	loggedin_user_team 			= '',
	loggedin_user_club_guid 	= '',
	loggedin_user_club 			= '',
	loggedin_user_role_guid 	= '',
	loggedin_user_role 			= '',
	loggedin_user_school_guid 	= '',
	loggedin_user_school 		= '',
	loggedin_user_coach_guid 	= '',
	loggedin_user_coach 		= '',
	loggedin_user_link 			= '';
	
var selected_exercise_guid 		= '',
	selected_exercise 			= '';
	
var selected_teamgroup_guid		= '',
	selected_teamgroup			= '';
	
var selected_log_guid 			= '',
	selected_log_exercise 		= '',
	selected_log_skill 			= '',
	selected_log_date 			= '',
	
	selected_log_pace 			= '',
	selected_log_spin 			= '',
	selected_log_score			= '',
	selected_log_notes 			= '',
	selected_log_comments 		= '',
	selected_log_comment_author = '';
	
var selected_calendar_date 		= '';

var selected_message_guid 		= '',
	selected_message_title 		= '',
	selected_message_author 	= '',
	selected_message_content 	= '',
	selected_message_time 		= '';
	
var this_modified 				= 0;
