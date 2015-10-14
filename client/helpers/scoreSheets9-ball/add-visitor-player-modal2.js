Template.addVisitorPlayerModal2.helpers({
	users: function() {
		return Meteor.users.find({},{});
	}
});