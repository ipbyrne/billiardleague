Template.scoreSheetPage.events({
	'click .delete-scoresheet': function(e) {
		e.preventDefault();
		var matchRoute = '/matches/'+this.matchId;
		if(confirm('Are you sure?')) {
			Meteor.call('deleteScoreSheet', this._id, function(error) {
				if(error) {
					toastr.error("Failed to Delete... " + error);
				} else {
					toastr.success("Score Sheet Deleted.");
					window.close();
				}
			});
		}
	}
});