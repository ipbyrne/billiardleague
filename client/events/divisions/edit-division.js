Template.divisionEditPage.events({
	'click .remove-team':function() {
		var divisionId = Session.get('divisionId');
		var division = Divisions.findOne({_id: divisionId});
		console.log(this.name);
		if(confirm('Are you sure?')) {
			Meteor.call('removeDivisionTeam', divisionId, this.name, this.memberCount, function(error) {
				if(error) {
					toastr.error('Failed to Remove Team... '+error);
				} else {
					toastr.success('Team Removed!');
				}
			});
		}
	},
	'click .save-division':function(e) {
		e.preventDefault();
		
		var divisionId = Session.get('divisionId');
		var divisionRoute = '/divisions/' + divisionId;
		var title = $('#title').val();
		var body = $('#summernote').code();
		var roundsNumber = $('#rounds').val();
		var startDate = $('#date').val();
		
		Meteor.call('updateDivision', divisionId, title, body, roundsNumber, startDate, function(error) {
			if(error) {
				toastr.error('Failed to Update Division... '+error);
			} else {
				toastr.success('Division Updated!');
				Router.go(divisionRoute);
			}
		});
	}
});