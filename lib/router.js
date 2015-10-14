// Global Routes
Router.route('/', {layoutTemplate: 'divisionList'});
Router.route('/sign-in', {layoutTemplate: 'signIn'});
Router.route('/sign-up', {layoutTemplate: 'signUp'});
Router.route('/reset-password', {layoutTemplate: 'resetPassword'});
Router.route('/recover-password', {layoutTemplate: 'recoverPassword'});
// User Routes
// Coming Soon...
// Admin Routes
Router.route('/dashboard', {layoutTemplate: 'dashboard'});
// Article Routes
Router.route('/articles', {layoutTemplate: 'articleList'});
Router.route('/submit-article', {layoutTemplate: 'submitArticle'});
Router.route('/articles/:_id', {
	name: 'articlePage',
	layoutTemplate: 'articlePage',
	data: function() {
		return Articles.findOne(this.params._id);
	}
});
Router.route('/articles/edit/:_id', {
	name: 'articleEditPage',
	layoutTemplate: 'articleEditPage',
	data: function() {
		return Articles.findOne(this.params._id);
	}
});
// Team Routes
Router.route('/teams', {layoutTemplate: 'teamList'});
Router.route('/submit-team', {layoutTemplate: 'submitTeam'});
Router.route('/teams/:_id', {
	name: 'teamPage',
	layoutTemplate: 'teamPage',
	data: function() {
		return Teams.findOne(this.params._id);
	}
});
Router.route('/teams/edit/:_id', {
	name: 'teamEditPage',
	layoutTemplate: 'teamEditPage',
	data: function() {
		return Teams.findOne(this.params._id);
	}
});
// Division Routes
Router.route('/divisions', {layoutTemplate: 'divisionList'});
Router.route('/submit-division', {layoutTemplate: 'submitDivision'});
Router.route('/divisions/:_id', {
	name: 'divisionPage',
	layoutTemplate: 'divisionPage',
	data: function() {
		return Divisions.findOne(this.params._id);
	}
});
Router.route('/divisions/edit/:_id', {
	name: 'divisionEditPage',
	layoutTemplate: 'divisionEditPage',
	data: function() {
		return Divisions.findOne(this.params._id);
	}
});
// Division Match Rountes
Router.route('/matches/:matchId', {
	name: 'matchPage',
	layoutTemplate: 'matchPage',
	data: function() {
		return Divisions.findOne(this.params.matchId)
	}
});
// 8-Ball Scoresheet Routes
Router.route('/scoresheets', {layoutTemplate: 'scoreSheetList'});
Router.route('/submit-scoresheet', {layoutTemplate: 'submitScoreSheet'});
Router.route('/scoresheets/:_id', {
	name: 'scoreSheetPage',
	layoutTemplate: 'scoreSheetPage',
	data: function() {
		return Scoresheets.findOne(this.params._id);
	}
});
Router.route('/scoresheets/edit/:_id', {
	name: 'scoreSheetsEditPage',
	layoutTemplate: 'scoreSheetsEditPage',
	data: function() {
		return Scoresheets.findOne(this.params._id);
	}
});
// 9-Ball Scoresheet Routes
Router.route('/scoresheets2', {layoutTemplate: 'scoreSheetList2'});
Router.route('/submit-scoresheet2', {layoutTemplate: 'submitScoreSheet2'});
Router.route('/scoresheets2/:_id', {
	name: 'scoreSheetPage2',
	layoutTemplate: 'scoreSheetPag2e',
	data: function() {
		return Scoresheets.findOne(this.params._id);
	}
});
Router.route('/scoresheets2/edit/:_id', {
	name: 'scoreSheetsEditPage2',
	layoutTemplate: 'scoreSheetsEditPage2',
	data: function() {
		return Scoresheets.findOne(this.params._id);
	}
});