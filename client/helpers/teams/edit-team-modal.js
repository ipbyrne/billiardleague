Template.editTeamModal.helpers({
	users: function() {
		Session.set('teamId', this._id);
		return Meteor.users.find({},{});
	}
});