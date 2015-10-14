Template.addHomePlayerModal2.helpers({
	users: function() {
		return Meteor.users.find({},{});
	}
});