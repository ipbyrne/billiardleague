Template.addVisitorPlayerModal.helpers({
	users: function() {
		return Meteor.users.find({},{});
	}
});