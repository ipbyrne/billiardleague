Template.divisionPage.helpers({
	teamsInDivision: function() {
		Session.set('divisionId2', this._id);
		return Teams.find({divisions: this.title},{sort: {title: 1}});
	},
	colSpan:function() {
		return this.teamCount/2;
	}
});