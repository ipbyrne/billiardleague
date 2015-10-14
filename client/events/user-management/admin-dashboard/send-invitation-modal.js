Template.sendInvitationModal.events({
	'submit #send-invite-form': function(e) {
		e.preventDefault();
		var user = {
			email: $('#signup-email').val(),
			password: "password123",
			profile: {
				role: $("#user-roles").find( 'option:selected' ).val(),
				name: $('#signup-name').val(),
				phone: $('#signup-phone').val(),
				address: $('#signup-address').val(),
				city: $('#signup-city').val(),
				state: $('#signup-state').val(),
				zipcode: $('#signup-zipcode').val(),
				country: $('#signup-country').val(),
				skillLevel: $("#skill-level").find( 'option:selected' ).val(),
				balance: "$10"
			}
		}
		var email = $('#signup-email').val();
		if($("#user-roles").find( 'option:selected' ).val() != "" && $('#signup-email').val() != "") {
			Meteor.call("createNewUser", user, function(error) {
				if(error) {
					toastr.error("Failed to Add Member... " + error);
				} else {
					toastr.success("Member Added Successfully");
					// Close Modal
					$("#user-roles").prop('selectedIndex', 0);
					$("#skill-level").prop('selectedIndex', 0);
					$('#signup-email').val("");
					$('#signup-name').val("");
					$('#signup-phone').val("");
					$('#signup-address').val("");
					$('#signup-city').val("");
					$('#signup-state').val("");
					$('#signup-zipcode').val("");
					$('#signup-country').val("");
					$('#send-invitation-modal').modal('toggle');
				}
			});
		} else {
			toastr.error("You must select a user role and fill out all of the user fields.");
		}
	}
});	