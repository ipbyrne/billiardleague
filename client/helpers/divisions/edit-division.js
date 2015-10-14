Template.divisionEditPage.helpers({
	divisionId: function() {
		Session.set('divisionId', this._id);
		return Teams.find();
	}
});