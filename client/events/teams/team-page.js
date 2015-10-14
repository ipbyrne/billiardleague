Template.teamPage.events({
	'click .delete-team': function() {
		if(confirm('Are you sure?')) {
			Meteor.call('deleteTeam', this._id, function(error) {
				if(error) {
					toastr.error("Failed to Delete... " + error);
				} else {
					toastr.success("Team Deleted.");
					Router.go('/teams');
				}
			})
		}
	},
	'click .promote-member':function() {
		var teamId = Session.get('teamId');
		Meteor.call('promoteTeamCaptain', teamId, this.name, function(error) {
			if(error) {
				toastr.error('Failed to Promote Member... '+error);
			} else {
				toastr.success('Member Promoted!');
			}
		});
	},
	'click .remove-member':function() {
		
		var teamId = Session.get('teamId');
		var team = Teams.findOne({_id: teamId});
		if(confirm('Are you sure?')) {
			Meteor.call('removeTeamMember', teamId, this.name, function(error) {
				if(error) {
					toastr.error('Failed to Remove Member... '+error);
				} else {
					toastr.success('Member Removed!');
				}
			});
		}
	}
});