Template.teamEditPage.helpers({
	isCaptain: function() {
		var teamId = Session.get('teamId');
		var team = Teams.findOne({_id: teamId});
		if(this.name === team.captain) {
			return true;
		} else {
			return false;
		}
	},
	skillLevel: function() {
		var user = Meteor.users.findOne({"profile.name": this.name});
		return user.profile.skillLevel;
	}
});