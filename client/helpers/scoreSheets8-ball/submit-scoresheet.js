Template.submitScoreSheet.helpers({
	users: function() {
		return Meteor.users.find();
	},
	homePlayer: function() {
		return Session.get('homePlayer');
	},
	visitorPlayer: function() {
		return Session.get('visitorPlayer');
	},
	divisionName: function() {
		return Session.get('divisionName');
	},
	match: function() {
		return Session.get('match-info');
	}
});