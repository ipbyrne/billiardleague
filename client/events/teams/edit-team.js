Template.teamEditPage.events({
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
	'click .save-team':function(e) {
		e.preventDefault();
		
		var teamId = Session.get('teamId');
		var teamRoute = '/teams/' + teamId;
		var title = $('#title').val();
		var body = $('.body').code();
		var bar = $('#signup-bar').val();
		var phone = $('#signup-phone').val();
		var address = $('#signup-address').val();
		var city = $('#signup-city').val();
		var state = $('#signup-state').val();
		var zipcode = $('#signup-zipcode').val();
		var country = $('#signup-country').val();
		
		Meteor.call('updateTeam', teamId, title, body, bar, phone, address, city, state, zipcode, country, function(error) {
			if(error) {
				toastr.error('Failed to Update Team... '+error);
			} else {
				toastr.success('Team Updated!');
				Router.go(teamRoute);
			}
		});
	}
});