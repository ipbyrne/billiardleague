Template.editDivisionModal.events({
	'keyup .search-bar': function() {
		Session.set("team-search-query", $('.search-bar').val());
	},
	'click .add-team': function(e) {
		e.preventDefault();
		var divisionId = Session.get('divisionId');
		var division = Divisions.findOne({_id: divisionId});
		if($.inArray(this.title, division.teamNames) !== -1) {
			toastr.error("Failed to add team because he is already in the division...");
		} else {
			Meteor.call('addDivisionTeam', division._id, this.title, this.memberCount, division.teamCount, function(error) {
				if(error) {
					toastr.error("Failed to add team..." + error);
				} else {
					toastr.success("Team Added");
				}
			});
		};
		$('#'+this._id).addClass("hide");
	},
	'click .load-more':function() {
		usersHandle.loadNextPage();
	}
});