Deps.autorun(function() {
	// Code to get user collection count
	Meteor.call('getUserCount', function(err, res){
	 if(!err) Session.set("user-count", res);
	});
	// Subscriptions go here:
	// Sub for admin dashboard
	userSearchKeyword = Session.get('user-search-query');
	usersHandle = Meteor.subscribeWithPagination('users', userSearchKeyword, 10);
	
	// Sub for Articles & Comments
	articleSearchkeyword = Session.get('article-search-query');
	articlesHandle = Meteor.subscribeWithPagination("articles", articleSearchkeyword, 5);
	// Subscribe with Pagination
	//commentsHandle = Meteor.subscribeWithPagination("comments", 10);
	// Subscribe with out Pagination to get comment Counts.
	Meteor.subscribe('comments');
	// Teams
	teamSearchkeyword = Session.get('team-search-query');
	Meteor.subscribe('teams', teamSearchkeyword);
	// Divisions
	divisionSearchkeyword = Session.get('division-search-query');
	Meteor.subscribe('divisions', divisionSearchkeyword);
	// Scoresheets
	scoresheetSearchkeyword = Session.get('scoresheet-search-query');
	Meteor.subscribe('scoreSheets', scoresheetSearchkeyword);
	// Matches
	Meteor.subscribe('matches');
});