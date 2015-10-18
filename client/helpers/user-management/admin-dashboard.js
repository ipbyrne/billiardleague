Template.adminDashboard.helpers({
	users: function() {
		return Meteor.users.find({},{sort:{"profile.role": 1}});
	},
	usersGamesWon: function() {
		return Meteor.users.find({},{sort:{"profile.gamesWon": -1}});
	},
	usersBreakAndRun: function() {
		return Meteor.users.find({},{sort:{"profile.breakAndRuns": -1}});
	},
	usersEightBall: function() {
		return Meteor.users.find({},{sort:{"profile.eightBallBreaks": -1}});
	},
	usersNineBall: function() {
		return Meteor.users.find({},{sort:{"profile.nineBallBreaks": -1}});
	},
	userRole: function() {
		if(this.profile.role === 'Member' && this.profile.role != 'Admin' ) {
			return "selected"
		}
	},
	teamCount: function() {
		return Teams.find().count();
	},
	divisionCount: function() {
		return Divisions.find().count();
	}
});