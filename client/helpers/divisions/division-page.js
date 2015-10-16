Template.divisionPage.helpers({
	teamsInDivision: function() {
		Session.set('divisionId2', this._id);
		var teams = Divisions.findOne({_id: this._id}).teams;
		return _.sortBy(teams, function(team) { return -team.points});
	},
	colSpan:function() {
		return this.teamCount/2;
	}
});