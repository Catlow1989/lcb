var selectedEvent 			= null;
var selectedDate  			= null;
var isTapHold_CalendarPage 	= false;


window.localStorage['DATABASE_NAME'] 				= 'lancashirecricketboard_db';
window.localStorage['DATABASE_DISPLAYNAME'] 		= 'Lancashire Cricket Board Database';
window.localStorage['DATABASE_VERSION'] 			= 1.0;
window.localStorage['DATABASE_SIZE'] 				= 200000;

window.localStorage['LOGIN_URL'] 					= 'http://leisuremobile.com/lccc/api_v1/';

window.localStorage['EXERCISE_BATTING']  			= 'exc-00000000-0000-4000-y000-000000000000';
window.localStorage['EXERCISE_BOWLING']  			= 'exc-00000000-0000-4000-y000-000000000001';
window.localStorage['EXERCISE_FIELDING'] 			= 'exc-00000000-0000-4000-y000-000000000002';
window.localStorage['EXERCISE_OTHERS']   			= 'exc-00000000-0000-4000-y000-000000000003';

/////
/////
/////
/////
/////

if( window.localStorage['APP_RUN_TIMES'] === undefined ) {
	
	window.localStorage['APP_RUN_TIMES'] 			= 0;
	
}

// if( window.localStorage['LAST_MODIFIED'] === undefined ) {
	
	window.localStorage['LAST_MODIFIED'] 			= 0;
	
// }

if( window.localStorage['USER_LAST_LOGIN'] === undefined ) {
	
	window.localStorage['USER_LAST_LOGIN'] 			= '';
	
}

if( window.localStorage['USER_LOGIN_STATUS'] === undefined ) {
	
	window.localStorage['USER_LOGIN_STATUS'] 		= 0;
	
}

if( window.localStorage['USER_LOGIN_GUID'] === undefined ) {
	
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
	
}
