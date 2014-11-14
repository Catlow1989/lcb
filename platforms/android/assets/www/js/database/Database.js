
var db = null,
	database_name 			= window.localStorage['DATABASE_NAME'],
	database_displayname 	= window.localStorage['DATABASE_DISPLAYNAME'],
	database_version 		= window.localStorage['DATABASE_VERSION'],
	database_size 			= window.localStorage['DATABASE_SIZE'];

var dbManager = {
	
	openDB: function() {
		db = window.openDatabase(database_name, database_version, database_displayname, database_size);
	},
	
	populateDB: function() {
		db.transaction(function(tx) {
			//if(window.localStorage['APP_RUN_TIMES'] <= 0) {
				dbManager.dropAllTables(tx);
			//}
			dbManager.createAllTables(tx);
		}, this.transactionError, function() {
			console.log('Info: database is created');
			//window.localStorage['is_database_created'] = true;
		});
	},
	
	dropAllTables: function(tx) {
		
		tx.executeSql('DROP TABLE IF EXISTS login_credentials');
		tx.executeSql('DROP TABLE IF EXISTS user_profiles');
		tx.executeSql('DROP TABLE IF EXISTS activity_logs');
		tx.executeSql('DROP TABLE IF EXISTS messages');
		tx.executeSql('DROP TABLE IF EXISTS roles');
		tx.executeSql('DROP TABLE IF EXISTS schools');
		tx.executeSql('DROP TABLE IF EXISTS teams');
		tx.executeSql('DROP TABLE IF EXISTS clubs');
		tx.executeSql('DROP TABLE IF EXISTS sessions');
		tx.executeSql('DROP TABLE IF EXISTS exercises');
		tx.executeSql('DROP TABLE IF EXISTS skills');
		tx.executeSql('DROP TABLE IF EXISTS group_criteria');
		
	},
	
	createAllTables: function(tx) {
		
		//
		// Login info
		//
		tx.executeSql('CREATE TABLE IF NOT EXISTS login_credentials' + 
					  ' (' + 
				  		'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
				  		//'guid INTEGER, ' +
				  		'username TEXT, ' +
				  		'password TEXT, ' +
				  		'register_date TEXT, ' +
				  		'last_login_date TEXT, ' +
				  		'user_guid TEXT, ' +
				  		'deleted INTEGER, ' + 
				  		'last_modified INTEGER, ' +
				  		'UNIQUE (user_guid), ' + 
				  		'FOREIGN KEY (user_guid) REFERENCES user_profiles(guid)' + 
				  	   ')');
		
		//////
		////// Personal info
		//////
		tx.executeSql('CREATE TABLE IF NOT EXISTS user_profiles' + 
					  ' (' + 
				  		'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
				  		'guid TEXT, ' +
				  		'first_name TEXT, ' +
				  		'last_name TEXT, ' +
				  		'dob TEXT, ' +  
				  		'gender TEXT, ' +
				  		'role_guid TEXT, ' +
				  		'school_guid TEXT, ' +
				  		'team_guid TEXT, ' +
				  		'coach_guid TEXT, ' +
				  		'club_guid TEXT, ' + 
				  		'link TEXT, ' +
				  		'deleted INTEGER, ' + 
				  		'last_modified INTEGER, ' +
				  		'UNIQUE (guid), ' + 
				  		'FOREIGN KEY (role_guid) REFERENCES roles(guid), ' +
				  		'FOREIGN KEY (school_guid) REFERENCES schools(guid), ' +
				  		'FOREIGN KEY (team_guid) REFERENCES teams(guid), ' + 
				  		'FOREIGN KEY (coach_guid) REFERENCES user_profiles(guid), ' +
				  		'FOREIGN KEY (club_guid) REFERENCES clubs(guid)' +         
				  	   ')');
		// tx.executeSql('INSERT INTO user_profiles (guid, first_name, last_name, dob, gender, role_guid, school_guid, team_guid, coach_guid, club_guid, link, deleted, last_modified) ' +
						// 'VALUES ("30485309485", "Tom", "Hardy", "2000-01-01", "f", "40000000000", "50000000000", "60000000000", "30485309486", "70000000000", "http://url.com", 0, 1394323200)');
		// tx.executeSql('INSERT INTO user_profiles (guid, first_name, last_name, dob, gender, role_guid, school_guid, team_guid, coach_guid, club_guid, link, deleted, last_modified) ' +
						// 'VALUES ("30485309486", "Will", "Bamford", "2000-01-01", "m", "40000000001", "0", "60000000001", "0", "70000000003", "", 0, 1394323200)');

		//////
		////// Roles
		//////
		tx.executeSql('CREATE TABLE IF NOT EXISTS roles' + 
					  ' (' + 
				  		'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
				  		'guid TEXT, ' +
				  		'role TEXT, ' +  
				  		'deleted INTEGER, ' + 
				  		'last_modified INTEGER, ' +
				  		'UNIQUE (guid)' +
				  	   ')');
		// tx.executeSql('INSERT INTO roles (guid, role, deleted, last_modified) VALUES ("40000000000", "player", 0, 1394323200)'); 			// 1
		// tx.executeSql('INSERT INTO roles (guid, role, deleted, last_modified) VALUES ("40000000001", "coaches", 0, 1394323200)'); 			// 2
		// tx.executeSql('INSERT INTO roles (guid, role, deleted, last_modified) VALUES ("40000000002", "professionals", 0, 1394323200)'); 	// 3
		// tx.executeSql('INSERT INTO roles (guid, role, deleted, last_modified) VALUES ("40000000003", "academy", 0, 1394323200)'); 			// 4
		// tx.executeSql('INSERT INTO roles (guid, role, deleted, last_modified) VALUES ("40000000004", "epp", 0, 1394323200)'); 				// 5
		// tx.executeSql('INSERT INTO roles (guid, role, deleted, last_modified) VALUES ("40000000005", "age groups", 0, 1394323200)'); 		// 6
		// tx.executeSql('INSERT INTO roles (guid, role, deleted, last_modified) VALUES ("40000000006", "admin", 0, 1394323200)'); 			// 7
		
		//////
		////// Schools
		//////
		tx.executeSql('CREATE TABLE IF NOT EXISTS schools' + 
					  ' (' + 
				  		'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
				  		'guid TEXT, ' +
				  		'school TEXT, ' +  
				  		'deleted INTEGER, ' + 
				  		'last_modified INTEGER, ' +
				  		'UNIQUE (guid)' +
				  	   ')');
		// tx.executeSql('INSERT INTO schools (guid, school, deleted, last_modified) VALUES ("50000000000", "University of Cambridge", 0, 1394323200)');
		// tx.executeSql('INSERT INTO schools (guid, school, deleted, last_modified) VALUES ("50000000001", "University of Oxford", 0, 1394323200)');
		// tx.executeSql('INSERT INTO schools (guid, school, deleted, last_modified) VALUES ("50000000002", "University of Lancaster", 0, 1394323200)');
		// tx.executeSql('INSERT INTO schools (guid, school, deleted, last_modified) VALUES ("50000000003", "University of Manchester", 0, 1394323200)');
		
		//////
		////// Teams
		//////
		tx.executeSql('CREATE TABLE IF NOT EXISTS teams' + 
					  ' (' + 
				  		'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
				  		'guid TEXT, ' +
				  		'team TEXT, ' +  
				  		'deleted INTEGER, ' + 
				  		'last_modified INTEGER, ' +
				  		'UNIQUE (guid)' +
				  	   ')');
		// tx.executeSql('INSERT INTO teams (guid, team, deleted, last_modified) VALUES ("60000000000", "Team Under 15", 0, 1394323200)');
		// tx.executeSql('INSERT INTO teams (guid, team, deleted, last_modified) VALUES ("60000000001", "Team Under 16", 0, 1394323200)');
		// tx.executeSql('INSERT INTO teams (guid, team, deleted, last_modified) VALUES ("60000000002", "Team Under 17", 0, 1394323200)');
		// tx.executeSql('INSERT INTO teams (guid, team, deleted, last_modified) VALUES ("60000000003", "Team Under 18", 0, 1394323200)');
		
		//////
		////// Clubs
		//////
		tx.executeSql('CREATE TABLE IF NOT EXISTS clubs' + 
					  ' (' + 
				  		'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
				  		'guid TEXT, ' +
				  		'club TEXT, ' +  
				  		'deleted INTEGER, ' + 
				  		'last_modified INTEGER, ' +
				  		'UNIQUE (guid)' +
				  	   ')');
		// tx.executeSql('INSERT INTO clubs (guid, club, deleted, last_modified) VALUES ("70000000000", "Club A", 0, 1394323200)');
		// tx.executeSql('INSERT INTO clubs (guid, club, deleted, last_modified) VALUES ("70000000001", "Club B", 0, 1394323200)');
		// tx.executeSql('INSERT INTO clubs (guid, club, deleted, last_modified) VALUES ("70000000002", "Club C", 0, 1394323200)');
		// tx.executeSql('INSERT INTO clubs (guid, club, deleted, last_modified) VALUES ("70000000003", "Club D", 0, 1394323200)');
		
		//
		// Activity log
		//
		tx.executeSql('CREATE TABLE IF NOT EXISTS activity_logs' + 
					  ' (' + 
				  		'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
				  		'guid TEXT, ' +
				  		'user_guid TEXT, ' + 
				  		'session_guid TEXT, ' +
				  		'exercise_guid TEXT, ' + 
				  		'skill_guid TEXT, ' +
				  		'pace INTEGER, ' +
				  		'spin INTEGER, ' +
				  		'score INTEGER, ' +
				  		'notes TEXT, ' +
				  		'comments TEXT, ' +
				  		'comment_author_guid TEXT, ' +
				  		'comment_creation_date INTEGER, ' +
				  		'deleted INTEGER, ' + 
				  		'last_modified INTEGER, ' +
				  		'UNIQUE (guid), ' +
				  		'FOREIGN KEY (user_guid) REFERENCES user_profiles(guid), ' +
				  		'FOREIGN KEY (session_guid) REFERENCES sessions(guid), ' +
				  		'FOREIGN KEY (exercise_guid) REFERENCES exercises(guid), ' + 
				  		'FOREIGN KEY (skill_guid) REFERENCES skills(guid)' +      
				  	   ')');
		// tx.executeSql('INSERT INTO activity_logs (guid, user_guid, session_guid, exercise_guid, skill_guid, pace, spin, score, notes, comments, comment_author_guid, comment_creation_date, deleted, last_modified) ' +
						// 'VALUES ("10000000000", "30485309485", "903284oipo", "b10000000000", "c10000000000", 1, 2, 3, "test", "review1", "30485309486", 1394323200, 0, 1394323200)');
		// tx.executeSql('INSERT INTO activity_logs (guid, user_guid, session_guid, exercise_guid, skill_guid, pace, spin, score, notes, comments, comment_author_guid, comment_creation_date, deleted, last_modified) ' +
						// 'VALUES ("10000000001", "30485309485", "903284oipo", "b10000000000", "c10000000001", 4, 5, 6, "test", "review2", "30485309486", 1394323200, 0, 1394323200)');
		// tx.executeSql('INSERT INTO activity_logs (guid, user_guid, session_guid, exercise_guid, skill_guid, pace, spin, score, notes, comments, comment_author_guid, comment_creation_date, deleted, last_modified) ' +
						// 'VALUES ("10000000002", "30485309485", "903284oipo", "b10000000001", "c10000000021", 7, 9, 4, "test", "review3", "30485309486", 1394323200, 0, 1394323200)');
						
		//////
		////// Sessions
		//////
		tx.executeSql('CREATE TABLE IF NOT EXISTS sessions' + 
					  ' (' + 
				  		'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
				  		'guid TEXT, ' +
				  		'session TEXT, ' + 
				  		'deleted INTEGER, ' + 
				  		'last_modified INTEGER, ' +
				  		'UNIQUE (guid)' +
				  	   ')');
		// tx.executeSql('INSERT INTO sessions (guid, session, deleted, last_modified) VALUES ("a10000000000", "Cricket Session", 0, 1394323200)');
		// tx.executeSql('INSERT INTO sessions (guid, session, deleted, last_modified) VALUES ("a10000000001", "Hockey Session", 0, 1394323200)');
		// tx.executeSql('INSERT INTO sessions (guid, session, deleted, last_modified) VALUES ("a10000000002", "Gym Session", 0, 1394323200)');
		// tx.executeSql('INSERT INTO sessions (guid, session, deleted, last_modified) VALUES ("a10000000003", "EPP Session", 0, 1394323200)');
		
		//////
		////// Exercises
		//////
		tx.executeSql('CREATE TABLE IF NOT EXISTS exercises' + 
					  ' (' + 
				  		'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
				  		'guid TEXT, ' +
				  		'exercise TEXT, ' + 
				  		'deleted INTEGER, ' + 
				  		'last_modified INTEGER, ' +
				  		'UNIQUE (guid)' +
				  	   ')');
		// tx.executeSql('INSERT INTO exercises (guid, exercise, deleted, last_modified) VALUES ("b10000000000", "Batting", 0, 1394323200)');
		// tx.executeSql('INSERT INTO exercises (guid, exercise, deleted, last_modified) VALUES ("b10000000001", "Bowling", 0, 1394323200)');
		// tx.executeSql('INSERT INTO exercises (guid, exercise, deleted, last_modified) VALUES ("b10000000002", "Fielding", 0, 1394323200)');
		// tx.executeSql('INSERT INTO exercises (guid, exercise, deleted, last_modified) VALUES ("b10000000003", "WK", 0, 1394323200)');
		// tx.executeSql('INSERT INTO exercises (guid, exercise, deleted, last_modified) VALUES ("b10000000004", "Behaviour", 0, 1394323200)');
		// tx.executeSql('INSERT INTO exercises (guid, exercise, deleted, last_modified) VALUES ("b10000000005", "Physical", 0, 1394323200)');
		// tx.executeSql('INSERT INTO exercises (guid, exercise, deleted, last_modified) VALUES ("b10000000006", "Performance attributes", 0, 1394323200)');
		
		//////
		////// Skills
		//////
		tx.executeSql('CREATE TABLE IF NOT EXISTS skills' + 
					  ' (' + 
				  		'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
				  		'guid TEXT, ' +
				  		'exercise_guid TEXT, ' +
				  		'skill TEXT, ' + 
				  		'deleted INTEGER, ' + 
				  		'last_modified INTEGER, ' +
				  		'UNIQUE (guid)' +
				  	   ')');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000000", "b10000000000", "Ability to hit the ball hard/natural timing", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000001", "b10000000000", "Dynamic balance", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000002", "b10000000000", "Ability to rotate the strike/control the bat face", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000003", "b10000000000", "Scores runs effectively (Front foot)", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000004", "b10000000000", "Scores runs effectively (Back foot)", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000005", "b10000000000", "Ability to play late", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000006", "b10000000000", "Effective method to account for conditions", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000007", "b10000000000", "Effective footwork", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000008", "b10000000000", "Boundary options", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000009", "b10000000000", "Sweep options (Orthodox)", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000010", "b10000000000", "Sweep options (Reverse)", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000011", "b10000000000", "Power play (Starting innings)", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000012", "b10000000000", "Power play (Mid/End innings)", 0, 1394323200)');
		
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000021", "b10000000001", "Lateral movement", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000022", "b10000000001", "Ability to generate bounce through action", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000023", "b10000000001", "Consistency of line/length", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000024", "b10000000001", "Repeatable action", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000025", "b10000000001", "Deception", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000026", "b10000000001", "Appropriate pace for bowling type", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000027", "b10000000001", "Energy", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000028", "b10000000001", "Strike rate higher than economy", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000029", "b10000000001", "Ability to adapt", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000299", "b10000000001", "1 day format", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000298", "b10000000001", "2 day format", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000297", "b10000000001", "Effective method to account for conditions", 0, 1394323200)');
		
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000031", "b10000000002", "Speed across the ground", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000032", "b10000000002", "Mobility/aggressive", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000033", "b10000000002", "Throwing", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000034", "b10000000002", "22 yards flat", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000035", "b10000000002", "Accurate", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000036", "b10000000002", "50 yards flat", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000037", "b10000000002", "Accurate", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000038", "b10000000002", "Consistent catching method", 0, 1394323200)');

		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000041", "b10000000003", "Quick reactions", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000042", "b10000000003", "Natural ability to catch left", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000043", "b10000000003", "Natural ability to catch right", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000044", "b10000000003", "Extremely brave", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000045", "b10000000003", "Natrual timing in line with body", 0, 1394323200)');
		
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000051", "b10000000004", "Brave decision maker", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000052", "b10000000004", "Commitment", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000053", "b10000000004", "Wanting to be challenged under pressure", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000054", "b10000000004", "High level of self awareness", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000055", "b10000000004", "Controlled aggression", 0, 1394323200)');
		
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000061", "b10000000005", "Yoyo", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000062", "b10000000005", "Sprint", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000063", "b10000000005", "Plank - front", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000064", "b10000000005", "Plank side", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000065", "b10000000005", "Lunge", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000066", "b10000000005", "Squat", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000067", "b10000000005", "Jump Height", 0, 1394323200)');
		
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000071", "b10000000006", "Tactical understanding of the game", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000072", "b10000000006", "Understands role in the game", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000073", "b10000000006", "Willingness to accept and improve", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000074", "b10000000006", "Consistently has an influence of the winning of games", 0, 1394323200)');
		// tx.executeSql('INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES ("c10000000075", "b10000000006", "Has a point of difference from similar players", 0, 1394323200)');
		
		//
		// Message board
		//
		tx.executeSql('CREATE TABLE IF NOT EXISTS messages' + 
					  ' (' + 
				  		'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
				  		'guid TEXT, ' +
				  		'title TEXT, ' + 
				  		'content TEXT, ' +
				  		'author_guid TEXT, ' + 
				  		'creation_date INTEGER, ' +
				  		'deleted INTEGER, ' + 
				  		'last_modified INTEGER, ' +
				  		'UNIQUE (guid), ' +
				  		'FOREIGN KEY (author_guid) REFERENCES user_profiles(guid)' +
				  	   ')');
		// tx.executeSql('INSERT INTO messages (guid, title, content, author_guid, creation_date, deleted, last_modified) VALUES ("msg1098203919", "Match Man vs Pres", "everyone is welcome", "usr-00000000-0000-4000-y001-000000000000", 1394323200, 0, 1394323200)');
		// tx.executeSql('INSERT INTO messages (guid, title, content, author_guid, creation_date, deleted, last_modified) VALUES ("msg1098203910", "Training cancelled", "23rd Mar training cancelled due to heavy rain", "usr-00000000-0000-4000-y001-000000000000", 1394323200, 0, 1394323200)');
		// tx.executeSql('INSERT INTO messages (guid, title, content, author_guid, creation_date, deleted, last_modified) VALUES ("msg1098203911", "Health check", "all team under 15 players are required to come and have annual health check", "usr-00000000-0000-4000-y001-000000000000", 1394323200, 0, 1394323200)');
		// tx.executeSql('INSERT INTO messages (guid, title, content, author_guid, creation_date, deleted, last_modified) VALUES ("msg1098203912", "Coach Frank retired", "Coach Frank is retired and please come and send your cards", "usr-00000000-0000-4000-y001-000000000000", 1394323200, 0, 1394323200)');
		
		//
		// Group criteria 
		//
		tx.executeSql('CREATE TABLE IF NOT EXISTS group_criteria' + 
					  ' (' + 
				  		'id INTEGER PRIMARY KEY AUTOINCREMENT,' + 
				  		'team_guid TEXT, ' +
				  		'skill_guid TEXT, ' + 
				  		'status INTEGER, ' +
				  		'deleted INTEGER, ' + 
				  		'last_modified INTEGER, ' +
				  		'UNIQUE (team_guid, skill_guid), ' +
				  		'FOREIGN KEY (team_guid) REFERENCES teams(guid), ' +
				  		'FOREIGN KEY (skill_guid) REFERENCES skills(guid)' +
				  	   ')');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000000", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000001", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000002", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000003", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000004", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000005", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000006", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000007", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000008", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000009", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000010", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000011", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000012", 0, 0, 1394323200)');
		
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000021", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000022", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000023", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000024", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000025", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000026", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000027", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000028", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000029", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000299", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000298", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000297", 0, 0, 1394323200)');
		
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000031", 1,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000032", 1,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000033", 1,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000034", 1,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000035", 1,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000036", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000037", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000038", 0,0, 1394323200)');
		
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000041", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000042", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000043", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000044", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000045", 0,0, 1394323200)');
		
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000051", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000052", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000053", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000054", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000055", 0,0, 1394323200)');
		
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000061", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000062", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000063", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000064", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000065", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000066", 0,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000067", 0,0, 1394323200)');
		
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000071", 1,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000072", 1,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000073", 1,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000074", 1,0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000000", "c10000000075", 1,0, 1394323200)');
		
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000000", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000001", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000002", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000003", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000004", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000005", 1, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000006", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000007", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000008", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000009", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000010", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000011", 0, 0, 1394323200)');
		// tx.executeSql('INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES ("60000000001", "c10000000012", 0, 0, 1394323200)');
	},








	retrieveUser: function(username, callback) {
		db.transaction(function(tx) {
			var sql = 'SELECT * FROM user_profiles WHERE username = "' + username + '" LIMIT 1';
			tx.executeSql(sql, [], function(tx, results) {
				callback( results.rows.item(0) );
			}, this.queryErr);
		}, this.transactionError, function() {});
	},
	
	getLatestMessages: function(callback) {
		db.transaction(function(tx) {
			var sql = 'SELECT msg.guid, msg.title, msg.content, up.first_name AS author, msg.creation_date FROM messages AS msg '+
					'LEFT JOIN user_profiles AS up ON up.guid = msg.author_guid '+
					'ORDER BY msg.creation_date DESC LIMIT 3';
			tx.executeSql(sql, [], function(tx, results) {
				callback( results.rows );
			}, this.queryErr); 
		}, this.transactionError, function() {});
	},
	
	getAllMessages: function(callback) {
		db.transaction(function(tx) {
			var sql = 'SELECT messages.guid, title, content, up.first_name AS author, creation_date FROM messages '+
					'LEFT JOIN user_profiles AS up ON up.guid = messages.author_guid '+
					'ORDER BY creation_date DESC LIMIT 10';
			tx.executeSql(sql, [], function(tx, results) {
				callback(results.rows);
			}, this.queryErr);
		}, this.transactionError, function() {
			
		});
	},
	
	getMessageInfo: function(message_guid, callback) {
		db.transaction(function(tx) {
			var sql = 'SELECT msg.guid, msg.title, msg.content, up.first_name AS author, msg.creation_date FROM messages AS msg '+
					'LEFT JOIN user_profiles AS up ON up.guid = msg.author_guid '+
					'WHERE msg.guid = ?';
			var params = [message_guid];
			tx.executeSql(sql, params, function(tx, results) {
				callback( results.rows.item(0) );
			}, this.queryErr);
		}, this.transactionError, function() {
			
		});
	},






	getActivityLogsByUser: function(user_guid, callback) {
		db.transaction(function(tx) {
			var sql = 'SELECT '+
					'al.guid AS log_guid, '+
					'user_guid, '+
					'session_guid, '+
					'al.exercise_guid AS exe_guid, '+
					'skill_guid, '+
					'pace, '+
					'spin, '+
					'score, '+
					'notes, '+
					'comments, '+
					'comment_author_guid, '+
					'comment_creation_date, '+
					'al.last_modified AS last_mod, '+
					'exe.exercise AS exe_title, '+
					'skl.skill AS skill_title, '+
					'usp.first_name AS author_name '+
				'FROM activity_logs AS al ' +
				'LEFT JOIN exercises AS exe ON exe.guid = al.exercise_guid ' +
				'LEFT JOIN skills AS skl ON skl.guid = al.skill_guid ' +
				'LEFT JOIN user_profiles AS usp ON usp.guid = al.user_guid ' +
				'WHERE user_guid = "' + user_guid + '" ' +
				'ORDER BY al.last_modified DESC';
			tx.executeSql(sql, [], function(tx, results) {
				callback( results.rows );
			}, this.queryErr);
		}, this.transactionError, function() {
			
		});
	},
	
	getSkillsByCriteria: function(exercise_guid, team_guid, callback) {
		db.transaction(function(tx){
			// var sql = 'SELECT * FROM skills WHERE exercise_guid = "' + exercise_guid + '" ORDER BY skill ASC';
			// var sql = 'SELECT * FROM skills WHERE exercise_guid = "' + exercise_guid + '"';
			
			var sql = 'SELECT * FROM skills WHERE exercise_guid = "' + exercise_guid + '" AND guid IN '+
				'(SELECT skill_guid FROM group_criteria WHERE team_guid = "' + team_guid + '" AND status = 1) ORDER BY skill ASC';
			// var sql = 'SELECT skill_guid FROM group_criteria WHERE team_guid = "' + team_guid + '" AND status = ';
				
			//console.log(sql);
			tx.executeSql(sql, [], function(tx, results) {
				// console.log('exercise-skills found : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		}, this.transactionError, function() {

		});
	}, 
	
	getSkillsByExercise: function(exercise_guid, callback) {
		db.transaction(function(tx) {
			var sql = 'SELECT * FROM skills WHERE exercise_guid = "' + exercise_guid + '" ORDER BY skill ASC';
			tx.executeSql(sql, [], function(tx, results) {
				callback( results.rows ); 
			}, this.queryErr);
		}, this.transactionError, function() {
			
		});
	},
	
	getActivityLogs: function(user_guid, exercise_guid, callback) {
		db.transaction(function(tx){
			var sql = 'SELECT id, user_guid, session_guid, exercise_guid, skill_guid, pace, spin, score, notes, comments, comment_author_guid, comment_creation_date FROM activity_logs WHERE user_guid = "' + user_guid + '" AND exercise_guid = "' + exercise_guid + '" ORDER BY creation_date ASC';
			tx.executeSql(sql, [], function(tx, results) {
				// console.log('user\'s exercise-skills found : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		}, this.transactionError, function() {

		});
	},
	
	getActivityLogsByPlayer: function(user_guid, callback) {
		db.transaction(function(tx){
			var sql = 'SELECT * FROM activity_logs WHERE user_guid = "' + user_guid + '" ORDER BY last_modified ASC';
			tx.executeSql(sql, [], function(tx, results) {
				// console.log('user\'s exercise-skills found : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		}, this.transactionError, function() {

		});
	},

	getTodayActivityLogs: function(user_guid, exercise_guid, callback) {
		db.transaction(function(tx) {
			var sql = 'SELECT id, user_guid, session_guid, exercise_guid, skill_guid, pace, spin, score, notes, comments, comment_author_guid, comment_creation_date FROM activity_logs WHERE user_guid = "' + user_guid + '" AND exercise_guid = "' + exercise_guid + '" AND creation_date > ' + utils.getTodayZeroUnixTime() + ' ORDER BY creation_date ASC';
			tx.executeSql(sql, [], function(tx, results) {
				console.log('user\'s exercise-skills found : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		}, this.transactionError, function() {

		});
	},
	
	getUserProfile: function(user_guid, callback) {
		db.transaction(function(tx) {
			var sql = 'SELECT user_profiles.guid AS user_guid, first_name, last_name, dob, gender, team_guid, school_guid, club_guid, role_guid, team, school, club, role FROM user_profiles ' +
					  'LEFT JOIN teams ON teams.guid = user_profiles.team_guid ' +
					  'LEFT JOIN clubs ON clubs.guid = user_profiles.club_guid ' +
					  'LEFT JOIN schools ON schools.guid = user_profiles.school_guid ' +
					  'LEFT JOIN roles ON roles.guid = user_profiles.role_guid ' +
					  'WHERE user_profiles.guid = "' + user_guid + '"';
			tx.executeSql(sql, [], function(tx, results) {
				callback(results.rows.item(0));
			}, this.queryErr);
		}, this.transactionError, function() {
			
		});
	},
	
	getAllTeams: function(callback) {
		db.transaction(function(tx) {
			var sql = 'SELECT * FROM teams';
			tx.executeSql(sql, [], function(tx, results) {
				callback(results.rows);
			}, this.queryErr);
		}, this.transactionError, function() {
			
		});
	},
	
	getAllPlayersByTeam: function(team_guid, callback) {
		db.transaction(function(tx) {
			var sql = 'SELECT * FROM user_profiles WHERE team_guid = "' + team_guid + '"';
			tx.executeSql(sql, [], function(tx, results) {
				callback(results.rows);
			}, this.queryErr);
		}, this.transactionError, function() {
			
		});
	},
	
	
	
	
	/*getSkillsByGroup: function(team_guid, callback) {
		db.transaction(function(tx) {
			var sql = 'SELECT team_guid, skill_guid FROM group_criteria WHERE team_guid = "' + team_guid + '"';
			tx.executeSql(sql, [], function(tx, results) {
				callback(results.rows);
			}, this.queryErr);
		}, this.transactionError, function() {
			
		});
	},*/











	
	/*insertTeamGroupCriteria: function(criteria, callback) {
		db.transaction(function(tx) {
			var sql = 'INSERT INTO group_criteria (team_guid, skill_guid, deleted, last_modified) VALUES (?, ?, ?, ?)';
			var params = [criteria.team_guid, criteria.skill_guid, criteria.deleted, criteria.last_modified];
			tx.executeSql(sql, params, function(tx, results) {
				if(!results.rowsAffected) {
					console.log('team group criteria insert failed');
				} else {
					console.log('team group criteria is inserted : ' + criteria.team_guid + ';' + criteria.skill_guid);
					callback();
				}
			}, this.queryErr);
		}, this.transactionError, function() {
			
		});
	},*/
	  
	updateAllTeamGroupCriteria: function(group_criteria, callback) {
		db.transaction(function(tx) {
			for( var i in group_criteria ) {
				var criteria = group_criteria[i];
				
				var sql = 'INSERT OR REPLACE INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES (?, ?, ?, ?, ?)';
				var params = [criteria.team_guid, criteria.skill_guid, criteria.status, criteria.deleted, criteria.last_modified];
				tx.executeSql(sql, params, function(tx, results) {
					if(!results.rowsAffected) {
						console.log('criteria insert/replace fail : ' + results.insertId);
					} else {
						console.log('criteria insert/replace success : ' + results.insertId);
					}
				}, this.queryErr);
			}
			
			// for( var i in group_criteria ) {
				// var criteria = group_criteria[i];
				// var sql = 'UPDATE group_criteria SET status = ?, last_modified = ? WHERE team_guid = ? AND skill_guid = ?';
				// var params = [criteria.status, criteria.last_modified, criteria.team_guid, criteria.skill_guid];
			
				// tx.executeSql(sql, params, function(tx, results) {
					// if(!results.rowsAffected) {
						// console.log('team group criteria update failed : ' + self.params[3]);
						
						// // try inserting new record
						// var sql2 = 'INSERT INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES (?, ?, ?, ?, ?)';
						// var params2 = [criteria.team_guid, criteria.skill_guid, criteria.status, criteria.deleted, criteria.last_modified];
		 			
						// tx.executeSql(sql2, params2, function(tx, results) {
							// //console.log(params2);
			 				
							// if(!results.rowsAffected) {
								// console.log('team group criteria insert failed');
							// } else {
								// console.log('team group criteria is inserted');
							// }
						// }, this.queryErr);
					// } else {
						// console.log('team group criteria is updated : ' + criteria.skill_guid);
					// }
				// }, this.queryErr);
			// }
		}, this.transactionError, function() {
			callback();
		});
	},
	
	updateTeamGroupCriteria: function(criteria, callback) {
		db.transaction(function(tx) {
			var sql = 'UPDATE group_criteria SET status = ?, last_modified = ? WHERE team_guid = ? AND skill_guid = ?';
			var params = [criteria.status, criteria.last_modified, criteria.team_guid, criteria.skill_guid];
			tx.executeSql(sql, params, function(tx, results) {
				if(!results.rowsAffected) {
					console.log('team group criteria update failed');
				} else {
					console.log('team group criteria is updated : ' + criteria.skill_guid);
					callback();
				}
			}, this.queryErr);
		}, this.transactionError, function() {
			
		});
	},
	
	insertActivityLog: function(log, callback) {
		db.transaction(function(tx) {
			var sql = 'INSERT INTO activity_logs (guid, user_guid, session_guid, exercise_guid, skill_guid, pace, spin, score, notes, comments, comment_author_guid, comment_creation_date, deleted, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
			var params = [log.guid, log.user_guid, log.session_guid, log.exercise_guid, log.skill_guid, log.pace, log.spin, log.score, log.notes, log.comments, log.comment_author_guid, log.comment_creation_date, log.deleted, log.last_modified];
			tx.executeSql(sql, params, function(tx, results) {
				if(!results.rowsAffected) {
					console.log('activity log insert failed : ' + results.insertId);
				} else {
					console.log('activity log is inserted : ' + results.insertId);
					callback();
				}
			}, this.queryErr);
		}, this.transactionError, function() {

		});
	},
	
	updateActivityLogReview: function(log, callback) {
		db.transaction(function(tx) {
			var sql = 'UPDATE activity_logs SET comments = ?, comment_author_guid = ?, comment_creation_date = ?, last_modified = ? WHERE guid = ?';
			var params = [log.comments, log.comment_author_guid, log.comment_creation_date, log.last_modified, log.guid];
			tx.executeSql(sql, params, function(tx, results) {
				if(!results.rowsAffected) {
					console.log('activity log update failed ');
				} else {
					console.log('activity log is updated ');
					callback();
				}
			}, this.queryErr);
		}, this.transactionError, function() {

		});
	},

	/*updateActivityLog: function(log, callback) {
		db.transaction(function(tx) {
			var sql = 'UPDATE activity_logs SET guid = ?, user_guid = ?, session_guid = ?, exercise_guid = ?, skill_guid = ?, pace = ?, spin = ?, score = ?, notes = ?, comments = ?, comment_author_guid = ?, comment_creation_date = ?, deleted = ?, last_modified = ?';
			var params = [log.guid, log.user_guid, log.session_guid, log.exercise_guid, log.skill_guid, log.pace, log.spin, log.score, log.notes, log.comments, log.comment_author_guid, log.comment_creation_date, log.deleted, log.last_modified];
			tx.executeSql(sql, params, function(tx, results) {
				if(!results.rowsAffected) {
					console.log('activity log update failed');
				} else {
					console.log('activity log is updated : ' + log.skill_guid);
					callback();
				}
			}, this.queryErr);
		}, this.transactionError, function() {

		});
	},*/

	insertMessage: function(message, callback) {
		db.transaction(function(tx) {
			var sql = 'INSERT INTO messages (guid, title, content, author_guid, creation_date, deleted, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?)';
			var params = [message.guid, message.title, message.content, message.author_guid, message.creation_date, message.deleted, message.last_modified];
			tx.executeSql(sql, params, function(tx, results) {
				if(!results.rowsAffected) {
					console.log('message insert failed');
				} else {
					console.log('message is inserted : ' + message.title);
					callback();
				}
			}, this.queryErr);
		}, this.transactionError, function() {

		});
	},

	/*updateMessage: function(message, callback) {
		db.transaction(function(tx) {
			var sql = 'UPDATE messages SET guid = ?, title = ?, content = ?, author_guid = ?, creation_date = ?, deleted = ?, last_modified = ?';
			var params = [message.guid, message.title, message.content, message.author_guid, message.creation_date, message.deleted, message.last_modified];
			tx.executeSql(sql, params, function(tx, results) {
				if(!results.rowsAffected) {
					console.log('message update failed');
				} else {
					console.log('message is updated : ' + message.title);
					callback();
				}
			}, this.queryErr);
		}, this.transactionError, function() {

		});
	},*/












	/////
	/////
	///// Synchronization
	/////
	/////

	updateOrInsertLoginCredentials: function(login_credentials, last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
			
			for(var i = 0; i < login_credentials.length; i++) {
				
				var login_credential = login_credentials[i];
			
				var sql = 'UPDATE login_credentials SET username = ?, password = ?, register_date = ?, last_login_date = ?, user_guid = ?, deleted = ?, last_modified = ? WHERE user_guid = "' + login_credential.user_guid + '"';
				var params = [login_credential.username, login_credential.password, login_credential.register_date, login_credential.last_login_date, login_credential.user_guid, login_credential.deleted, last_modified];
				
				tx.executeSql(sql, params, function(tx, results) {
					if(!results.rowsAffected) {
						console.log('Update fail, cannot find login credential record, try insert it...');
						
						var sql = 'INSERT INTO login_credentials (username, password, register_date, last_login_date, user_guid, deleted, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?)';
						tx.executeSql(sql, params, function(tx, results) {
							console.log('LoginCredentials: ' + login_credential.username + ' is inserted');
						}, this.queryErr);
					} else {
						console.log('LoginCredentials: ' + login_credential.username + ' is updated');
					}
				}, this.queryErr);
				
			}
			
		}, this.transactionError, function() {
			console.log('LoginCredentials: are updated or inserted');
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},
	
	updateOrInsertUserProfiles: function(profiles, last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
			
			for(var i = 0; i < profiles.length; i++) {
				
				var profile = profiles[i];
			
				// var sql = 'UPDATE user_profiles SET guid = ?, first_name = ?, last_name = ?, dob = ?, gender = ?, role_guid = ?, school_guid = ?, team_guid = ?, coach_guid = ?, club_guid = ?, link = ?, deleted = ?, last_modified = ? WHERE guid = "' + profile.guid + '"';
				// var params = [profile.guid, profile.first_name, profile.last_name, profile.dob, profile.gender, profile.role_guid, profile.school_guid, profile.team_guid, profile.coach_guid, profile.club_guid, profile.link, profile.deleted, last_modified];
				// tx.executeSql(sql, params, function(tx, results) {
					// if(!results.rowsAffected) {
						// console.log('Update fail, cannot find user profile record, try insert it...');
						// var sql = 'INSERT INTO user_profiles (guid, first_name, last_name, dob, gender, role_guid, school_guid, team_guid, coach_guid, club_guid, link, deleted, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
						// tx.executeSql(sql, params, function(tx, results) {
							// console.log('UserProfiles: ' + profile.first_name + ' ' + profile.last_name + ' is inserted');
						// }, this.queryErr);
					// } else {
						// console.log('UserProfiles: ' + profile.first_name + ' ' + profile.last_name + ' is updated');
					// }
				// }, this.queryErr);
				
				var sql = 'REPLACE INTO user_profiles (guid, first_name, last_name, dob, gender, role_guid, school_guid, team_guid, coach_guid, club_guid, link, deleted, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
				var params = [profile.guid, profile.first_name, profile.last_name, profile.dob, profile.gender, profile.role_guid, profile.school_guid, profile.team_guid, profile.coach_guid, profile.club_guid, profile.link, profile.deleted, profile.last_modified];
				tx.executeSql(sql, params, function(tx, results) {
					// callback();
				}, this.queryErr);
				
			}
			
		}, this.transactionError, function() {
			console.log('Table(User profiles): are updated or inserted');
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},
	
	updateOrInsertActivityLogs: function(logs, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
			
			for(var i = 0; i < logs.length; i++) {
				
				var log = logs[i];
			
				// var sql = 'UPDATE activity_logs SET guid = ?, user_guid = ?, session_guid = ?, exercise_guid = ?, skill_guid = ?, pace = ?, spin = ?, score = ?, notes = ?, comments = ?, comment_author_guid = ?, comment_creation_date = ?, deleted = ?, last_modified = ? WHERE guid = "' + log.guid + '"';
				// var params = [log.guid, log.user_guid, log.session_guid, log.exercise_guid, log.skill_guid, log.pace, log.spin, log.scroe, log.notes, log.comments, log.comment_author_guid, log.comment_creation_date, log.deleted, last_modified];
				// tx.executeSql(sql, params, function(tx, results) {
					// if(!results.rowsAffected) {
						// console.log('Update fail, cannot find activity log record, try insert it...');
						// var sql = 'INSERT INTO activity_logs (guid, user_guid, session_guid, exercise_guid, skill_guid, pace, spin, score, notes, comments, comment_author_guid, comment_creation_date, deleted, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
						// tx.executeSql(sql, params, function(tx, results) {
							// console.log('ActivityLogs: ' + log.skil_guid + ' is inserted');
						// }, this.queryErr);
					// } else {
						// console.log('ActivityLogs: ' + log.skil_guid + ' is updated');
					// }
				// }, this.queryErr);
				
				var sql = 'REPLACE INTO activity_logs (guid, user_guid, session_guid, exercise_guid, skill_guid, pace, spin, score, notes, comments, comment_author_guid, comment_creation_date, deleted, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
				var params = [log.guid, log.user_guid, log.session_guid, log.exercise_guid, log.skill_guid, log.pace, log.spin, log.score, log.notes, log.comments, log.comment_author_guid, log.comment_creation_date, log.deleted, utils.convertToUnixTime(log.last_modified)];
				tx.executeSql(sql, params, function(tx, results) {
					// callback();
				}, this.queryErr);
				
			}
			
		}, this.transactionError, function() {
			console.log('Table(Activity logs): are updated or inserted');
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},
	
	updateOrInsertMessages: function(messages, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
			
			for(var i = 0; i < messages.length; i++) {
				
				var message = messages[i];
			
				// var sql = 'UPDATE messages SET guid = ?, title = ?, content = ?, author_guid = ?, creation_date = ?, deleted = ?, last_modified = ? WHERE guid = "' + message.guid + '"';
				// var params = [message.guid, message.title, message.content, message.author_guid, message.creation_date, message.deleted, last_modified];
				// tx.executeSql(sql, params, function(tx, results) {
					// if(!results.rowsAffected) {
						// console.log('Update fail, cannot find message record, try insert it...');
						// var sql = 'INSERT INTO messages (guid, title, content, author_guid, creation_date, deleted, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?)';
						// tx.executeSql(sql, params, function(tx, results) {
							// console.log('Message: ' + message.title + ' is inserted');
						// }, this.queryErr);
					// } else {
						// console.log('Message: ' + message.title + ' is updated');
					// }
				// }, this.queryErr);
				
				var sql = 'REPLACE INTO messages (guid, title, content, author_guid, creation_date, deleted, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?)';
				var params = [message.guid, message.title, message.content, message.author_guid, utils.convertToUnixTime(message.creation_date), message.deleted, utils.convertToUnixTime(message.last_modified)];
				tx.executeSql(sql, params, function(tx, results) {
					// callback();
				}, this.queryErr);
				
			}
			
		}, this.transactionError, function() {
			console.log('Table(Message): are updated or inserted');
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},
	
	updateOrInsertRoles: function(roles, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
			
			for(var i = 0; i < roles.length; i++) {

				var role = roles[i];

				// var sql = 'UPDATE roles SET guid = ?, role = ?, deleted = ?, last_modified = ? WHERE guid = "' + role.guid + '"';
				// var params = [role.guid, role.role, role.deleted, last_modified];
				// tx.executeSql(sql, params, function(tx, results) {
					// if(!results.rowsAffected) {
						// console.log('Update fail, cannot find role record, try insert it...');
						// var sql = 'INSERT INTO roles (guid, role, deleted, last_modified) VALUES (?, ?, ?, ?)';
						// tx.executeSql(sql, params, function(tx, results) {
							// console.log('Roles: ' + role.role + ' is inserted');
						// }, this.queryErr);
					// } else {
						// console.log('Roles: ' + role.role + ' is updated');
					// }
				// }, this.queryErr);
				
				var sql = 'REPLACE INTO roles (guid, role, deleted, last_modified) VALUES (?, ?, ?, ?)';
				var params = [role.guid, role.role, role.deleted, utils.convertToUnixTime(role.last_modified)];
				tx.executeSql(sql, params, function(tx, results) {
					// callback();
				}, this.queryErr);

			}
			
		}, this.transactionError, function() {
			console.log('Table(Roles): are updated or inserted');
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},
	
	updateOrInsertSchools: function(schools, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
			
			for(var i = 0; i < schools.length; i++) {
				
				var school = schools[i];
			
				// var sql = 'UPDATE schools SET guid = ?, school = ?, deleted = ?, last_modified = ? WHERE guid = "' + school.guid + '"';
				// var params = [school.guid, school.school, school.deleted, last_modified];
				// tx.executeSql(sql, params, function(tx, results) {
					// if(!results.rowsAffected) {
						// console.log('Update fail, cannot find school record, try insert it...');
						// var sql = 'INSERT INTO schools (guid, school, deleted, last_modified) VALUES (?, ?, ?, ?)';
						// tx.executeSql(sql, params, function(tx, results) {
							// console.log('Schools: ' + school.school + ' is inserted');
						// }, this.queryErr);
					// } else {
						// console.log('Schools: ' + school.school + ' is updated');
					// }
				// }, this.queryErr);
				
				var sql = 'REPLACE INTO schools (guid, school, deleted, last_modified) VALUES (?, ?, ?, ?)';
				var params = [school.guid, school.school, school.deleted, utils.convertToUnixTime(school.last_modified)];
				tx.executeSql(sql, params, function(tx, results) {
					// callback();
				}, this.queryErr);
				
			}
			
		}, this.transactionError, function() {
			console.log('Table(Schools): are updated or inserted');
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},
	
	updateOrInsertTeams: function(teams, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
			
			for(var i = 0; i < teams.length; i++) {
				
				var team = teams[i];
			
				// var sql = 'UPDATE teams SET guid = ?, team = ?, deleted = ?, last_modified = ? WHERE guid = "' + team.guid + '"';
				// var params = [team.guid, team.team, team.deleted, last_modified];
				// tx.executeSql(sql, params, function(tx, results) {
					// if(!results.rowsAffected) {
						// console.log('Update fail, cannot find team record, try insert it...');
						// var sql = 'INSERT INTO teams (guid, team, deleted, last_modified) VALUES (?, ?, ?, ?)';
						// tx.executeSql(sql, params, function(tx, results) {
							// console.log('Teams: ' + team.team + ' is inserted');
						// }, this.queryErr);
					// } else {
						// console.log('Teams: ' + team.team + ' is updated');
					// }
				// }, this.queryErr);
				
				var sql = 'REPLACE INTO teams (guid, team, deleted, last_modified) VALUES (?, ?, ?, ?)';
				var params = [team.guid, team.team, team.deleted, utils.convertToUnixTime(team.last_modified)];
				tx.executeSql(sql, params, function(tx, results) {
					// callback();
				}, this.queryErr);
				
			}
			
		}, this.transactionError, function() {
			console.log('Table(Teams): are updated or inserted');
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},
	
	updateOrInsertClubs: function(clubs, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
			
			for(var i = 0; i < clubs.length; i++) {
				
				var club = clubs[i];
			
				// var sql = 'UPDATE clubs SET guid = ?, club = ?, deleted = ?, last_modified = ? WHERE guid = "' + club.guid + '"';
				// var params = [club.guid, club.club, club.deleted, last_modified];
				// tx.executeSql(sql, params, function(tx, results) {
					// if(!results.rowsAffected) {
						// console.log('Update fail, cannot find club record, try insert it...');
						// var sql = 'INSERT INTO clubs (guid, club, deleted, last_modified) VALUES (?, ?, ?, ?)';
						// tx.executeSql(sql, params, function(tx, results) {
							// console.log('Clubs: ' + club.club + ' is inserted');
						// }, this.queryErr);
					// } else {
						// console.log('Clubs: ' + club.club + ' is updated');
					// }
				// }, this.queryErr);
				
				var sql = 'REPLACE INTO clubs (guid, club, deleted, last_modified) VALUES (?, ?, ?, ?)';
				var params = [club.guid, club.club, club.deleted, utils.convertToUnixTime(club.last_modified)];
				tx.executeSql(sql, params, function(tx, results) {
					// callback();
				}, this.queryErr);
				
			}
			
		}, this.transactionError, function() {
			console.log('Table(Clubs): are updated or inserted');
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},
	
	updateOrInsertSessions: function(sessions, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
			
			for(var i = 0; i < sessions.length; i++) {
				
				var session = sessions[i];
			
				// var sql = 'UPDATE sessions SET guid = ?, session = ?, deleted = ?, last_modified = ? WHERE guid = "' + session.guid + '"';
				// var params = [session.guid, session.session, session.deleted, last_modified];
				// tx.executeSql(sql, params, function(tx, results) {
					// if(!results.rowsAffected) {
						// console.log('Update fail, cannot find session record, try insert it...');
						// var sql = 'INSERT INTO sessions (guid, session, deleted, last_modified) VALUES (?, ?, ?, ?)';
						// tx.executeSql(sql, params, function(tx, results) {
							// console.log('Sessions: ' + session.session + ' is inserted');
						// }, this.queryErr);
					// } else {
						// console.log('Sessions: ' + session.session + ' is updated');
					// }
				// }, this.queryErr);
				
				var sql = 'REPLACE INTO sessions (guid, session, deleted, last_modified) VALUES (?, ?, ?, ?)';
				var params = [session.guid, session.session, session.deleted, utils.convertToUnixTime(session.last_modified)];
				tx.executeSql(sql, params, function(tx, results) {
					// callback();
				}, this.queryErr);
				
			}
			
		}, this.transactionError, function() {
			console.log('Table(Sessions): are updated or inserted');
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},
	
	updateOrInsertExercises: function(exercises, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
			
			for(var i = 0; i < exercises.length; i++) {
				
				var exercise = exercises[i];
			
				// var sql = 'UPDATE exercises SET guid = ?, exercise = ?, deleted = ?, last_modified = ? WHERE guid = "' + exercise.guid + '"';
				// var params = [exercise.guid, exercise.exercise, exercise.deleted, last_modified];
				// tx.executeSql(sql, params, function(tx, results) {
					// if(!results.rowsAffected) {
						// console.log('Update fail, cannot find exercise record, try insert it...');
						// var sql = 'INSERT INTO exercises (guid, exercise, deleted, last_modified) VALUES (?, ?, ?, ?)';
						// tx.executeSql(sql, params, function(tx, results) {
							// console.log('Exercises: ' + exercise.exercise + ' is inserted');
						// }, this.queryErr);
					// } else {
						// console.log('Exercises: ' + exercise.exercise + ' is updated');
					// }
				// }, this.queryErr);
				
				var sql = 'REPLACE INTO exercises (guid, exercise, deleted, last_modified) VALUES (?, ?, ?, ?)';
				var params = [exercise.guid, exercise.exercise, exercise.deleted, utils.convertToUnixTime(exercise.last_modified)];
				tx.executeSql(sql, params, function(tx, results) {
					// callback();
				}, this.queryErr);
				
			}
			
		}, this.transactionError, function() {
			console.log('Table(Exercises): are updated or inserted');
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},
	
	updateOrInsertSkills: function(skills, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
			
			for(var i = 0; i < skills.length; i++) {
				
				var skill = skills[i];
			
				// var sql = 'UPDATE skills SET guid = ?, exercise_guid = ?, skill = ?, deleted = ?, last_modified = ? WHERE guid = "' + skill.guid + '"';
				// var params = [skill.guid, skill.exercise_guid, skill.skill, skill.deleted, last_modified];
				// tx.executeSql(sql, params, function(tx, results) {
					// if(!results.rowsAffected) {
						// console.log('Update fail, cannot find skill record, try insert it...');
						// var sql = 'INSERT INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES (?, ?, ?, ?)';
						// tx.executeSql(sql, params, function(tx, results) {
							// console.log('Skills: ' + skill.skill + ' is inserted');
						// }, this.queryErr);
					// } else {
						// console.log('Skills: ' + skill.skill + ' is updated');
					// }
				// }, this.queryErr);
				
				var sql = 'REPLACE INTO skills (guid, exercise_guid, skill, deleted, last_modified) VALUES (?, ?, ?, ?, ?)';
				var params = [skill.guid, skill.exercise_guid, skill.skill, skill.deleted, utils.convertToUnixTime(skill.last_modified)];
				tx.executeSql(sql, params, function(tx, results) {
					// callback();
				}, this.queryErr);
				
			}
			
		}, this.transactionError, function() {
			console.log('Table(Skills): are updated or inserted');
			dfd.resolve(); // deferred.resolve
		}); 
		 
		return dfd.promise(); // deferred.promise
	},
	
	updateOrInsertGroupCriteria: function(criterias, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
			
			for(var i = 0; i < criterias.length; i++) {
				
				var criteria = criterias[i];
			
				// var sql = 'UPDATE group_criteria SET guid = ?, team_guid = ?, skill_guid = ?, deleted = ?, last_modified = ? WHERE guid = "' + criterias.guid + '"';
				// var params = [criteria.guid, criteria.team_guid, criteria.skill_guid, criteria.deleted, last_modified];
				// tx.executeSql(sql, params, function(tx, results) {
					// if(!results.rowsAffected) {
						// console.log('Update fail, cannot find criteria record, try insert it...');
						// var sql = 'INSERT INTO group_criteria (guid, team_guid, skill_guid, deleted, last_modified) VALUES (?, ?, ?, ?, ?)';
						// tx.executeSql(sql, params, function(tx, results) {
							// console.log('Group criteria: ' + criteria.guid + ' is inserted');
						// }, this.queryErr);
					// } else {
						// console.log('Group criteria: ' + criteria.guid + ' is updated');
					// }
				// }, this.queryErr);
				
				var sql = 'REPLACE INTO group_criteria (team_guid, skill_guid, status, deleted, last_modified) VALUES (?, ?, ?, ?, ?)';
				var params = [criteria.team_guid, criteria.skill_guid, criteria.status, criteria.deleted, utils.convertToUnixTime(criteria.last_modified)];
				tx.executeSql(sql, params, function(tx, results) {
					// callback();
				}, this.queryErr);
				
			}
			
		}, this.transactionError, function() {
			console.log('Table(Group criteria): are updated or inserted');
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},






	getChangesLoginCredentials: function(last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
		
			var sql = 'SELECT * FROM login_credentials WHERE last_modified > "' + last_modified + '"';
			
			tx.executeSql(sql, [], function(tx, results) {
				console.log('get changes of login credentials : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		
		}, this.transactionError, function() {
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},
	
	getChangesUserProfiles: function(last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
		
			var sql = 'SELECT * FROM user_profiles WHERE last_modified > "' + last_modified + '"';
			
			tx.executeSql(sql, [], function(tx, results) {
				console.log('get changes of user profiles : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		
		}, this.transactionError, function() {
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},

	getChangesActivityLogs: function(last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
		
			var sql = 'SELECT * FROM activity_logs WHERE last_modified > "' + last_modified + '"';
			
			tx.executeSql(sql, [], function(tx, results) {
				//console.log('number of activity log changed : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		
		}, this.transactionError, function() {
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},

	getChangesMessages: function(last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
		
			var sql = 'SELECT * FROM messages WHERE last_modified > "' + last_modified + '"';
			
			tx.executeSql(sql, [], function(tx, results) {
				//console.log('get changes of messages : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		
		}, this.transactionError, function() {
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},

	getChangesRoles: function(last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
		
			var sql = 'SELECT * FROM roles WHERE last_modified > "' + last_modified + '"';
			
			tx.executeSql(sql, [], function(tx, results) {
				console.log('get changes of roles : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		
		}, this.transactionError, function() {
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},
	
	getChangesSchools: function(last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
		
			var sql = 'SELECT * FROM schools WHERE last_modified > "' + last_modified + '"';
			
			tx.executeSql(sql, [], function(tx, results) {
				console.log('get changes of schools : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		
		}, this.transactionError, function() {
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},

	getChangesTeams: function(last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
		
			var sql = 'SELECT * FROM teams WHERE last_modified > "' + last_modified + '"';
			
			tx.executeSql(sql, [], function(tx, results) {
				console.log('get changes of teams : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		
		}, this.transactionError, function() {
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},

	getChangesClubs: function(last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
		
			var sql = 'SELECT * FROM clubs WHERE last_modified > "' + last_modified + '"';
			
			tx.executeSql(sql, [], function(tx, results) {
				console.log('get changes of clubs : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		
		}, this.transactionError, function() {
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},

	getChangesSessions: function(last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
		
			var sql = 'SELECT * FROM sessions WHERE last_modified > "' + last_modified + '"';
			
			tx.executeSql(sql, [], function(tx, results) {
				console.log('get changes of sessions : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		
		}, this.transactionError, function() {
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},

	getChangesExercises: function(last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
		
			var sql = 'SELECT * FROM exercises WHERE last_modified > "' + last_modified + '"';
			
			tx.executeSql(sql, [], function(tx, results) {
				console.log('get changes of exercises : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		
		}, this.transactionError, function() {
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},

	getChangesSkills: function(last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
		
			var sql = 'SELECT * FROM skills WHERE last_modified > "' + last_modified + '"';
			
			tx.executeSql(sql, [], function(tx, results) {
				console.log('get changes of skills : ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		
		}, this.transactionError, function() {
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},

	getChangesGroupCriteria: function(last_modified, callback) {
		var dfd = $.Deferred();
		
		db.transaction(function(tx) {
		
			var sql = 'SELECT * FROM group_criteria WHERE last_modified > "' + last_modified + '"';
			
			tx.executeSql(sql, [], function(tx, results) {
				console.log('get changes of group_criteria: ' + results.rows.length);
				callback( results.rows );
			}, this.queryErr);
		
		}, this.transactionError, function() {
			dfd.resolve(); // deferred.resolve
		});
		
		return dfd.promise(); // deferred.promise
	},






	transactionError: function(error) {
		alert("Error processing transaction: " + error.message);
	},
	
	queryErr: function(error) {
		alert("Error processing SQL: " + error.message);
	},
	
};
