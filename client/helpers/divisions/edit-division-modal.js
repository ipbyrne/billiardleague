Template.editDivisionModal.helpers({
	teams: function() {
		Session.set('divisionId', this._id);
		return Teams.find();
	}
});