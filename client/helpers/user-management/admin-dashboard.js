Template.adminDashboard.helpers({
	users: function() {
		return Meteor.users.find({},{sort:{"profile.role": 1}});
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