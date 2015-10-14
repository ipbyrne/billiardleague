Meteor.publish("users", function (userSearchKeyword, limit) {
		// Publish Collection Count
		Counts.publish(this, 'users', Meteor.users.find(), { noReady: true });
		userSearchQuery = new RegExp( userSearchKeyword, 'i' );
    return Meteor.users.find({$or: [{"emails.address": userSearchQuery},{"profile.name":userSearchQuery},{"profile.phone":userSearchQuery}, {"profile.address":userSearchQuery}, {"profile.city":userSearchQuery},{"profile.state":userSearchQuery}, {"profile.country":userSearchQuery},{"profile.skillLevel":userSearchQuery},{"profile.role":userSearchQuery}]}, {limit: limit});
});

Meteor.publish("articles", function (articleSearchKeyword, limit) {
	// Publish Collection Count
	Counts.publish(this, 'articles', Articles.find(), { noReady: true });
	
	articleSearchQuery = new RegExp( articleSearchKeyword, 'i' );
	return Articles.find({$or: [{body: articleSearchQuery}, {_id: articleSearchQuery}, {title: articleSearchQuery}, {submitted: articleSearchQuery}, {useremail: articleSearchQuery}]}, {limit:limit});
});

Meteor.publish("comments", function() {
	return Comments.find({},{});
});

Meteor.publish("teams", function(teamSearchKeyword) {
	teamSearchQuery = new RegExp( teamSearchKeyword, 'i' );
	return Teams.find({$or: [{body: teamSearchQuery}, {title: teamSearchQuery}, {submitted: teamSearchQuery}, {members: teamSearchQuery}, {captain: teamSearchQuery}, {divisions: teamSearchQuery}]},{});
});

Meteor.publish("divisions", function(divisionSearchKeyword) {
	divisionSearchQuery = new RegExp( divisionSearchKeyword, 'i' );
	return Divisions.find({$or: [{body: divisionSearchQuery}, {title: divisionSearchQuery}, {submitted: divisionSearchQuery}, {teams: divisionSearchQuery}, {teamNames: divisionSearchQuery}, {games: divisionSearchQuery}]},{}); 
});

Meteor.publish("scoreSheets", function(scoresheetSearchKeyword) {
	scoresheetSearchKeyword = new RegExp( scoresheetSearchKeyword, 'i' );
	return Scoresheets.find();
	/*
	return Divisions.find({$or: [{body: divisionSearchQuery}, {title: divisionSearchQuery}, {submitted: divisionSearchQuery}, {teams: divisionSearchQuery}, {teamNames: divisionSearchQuery}, {games: divisionSearchQuery}]},{}); 
	*/
});

Meteor.publish("matches", function() {
	return Matches.find();
});