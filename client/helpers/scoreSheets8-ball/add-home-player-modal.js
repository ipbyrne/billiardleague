Template.addHomePlayerModal.helpers({
	users: function() {
		return Meteor.users.find({},{});
	}
});