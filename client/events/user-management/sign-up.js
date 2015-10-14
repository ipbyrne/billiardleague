Template.signUp.events({
	'submit .sign-up-form': function(e) {
		e.preventDefault();
		
		var email = $('#signup-email').val();
		var name = $('#signup-name').val();
		var phone = $('#signup-phone').val();
		var address = $('#signup-address').val();
		var city = $('#signup-city').val();
		var state = $('#signup-state').val();
		var zipcode = $('#signup-zipcode').val();
		var country = $('#signup-country').val()
		var skillLevel = $("#skill-level").find( 'option:selected' ).val();

		var userCount = Session.get("user-count");
		console.log(Session.get("user-count"));
		
		if(userCount > 0) {
			var memberUser = {
				email: $('#signup-email').val(),
				password: $('#signup-password').val(),
				profile: {
				role: "Member",
				name: $('#signup-name').val(),
				phone: $('#signup-phone').val(),
				address: $('#signup-address').val(),
				city: $('#signup-city').val(),
				state: $('#signup-state').val(),
				zipcode: $('#signup-zipcode').val(),
				country: $('#signup-country').val(),
				skillLevel: $("#skill-level").find( 'option:selected' ).val()
				}
			};
			
			Accounts.createUser(memberUser, function(error) {
				if(error) {
					toastr.error("Sign Up Failed... " + error);
				} else {
					toastr.success("Signed Up Successfully");
					Router.go('/');
				}
			});
		
		} else {
			var adminUser = {
				email: $('#signup-email').val(),
				password: $('#signup-password').val(),
				profile: {
				role: "Admin",
				name: $('#signup-name').val(),
				phone: $('#signup-phone').val(),
				address: $('#signup-address').val(),
				city: $('#signup-city').val(),
				state: $('#signup-state').val(),
				zipcode: $('#signup-zipcode').val(),
				country: $('#signup-country').val(),
				skillLevel: $("#skill-level").find( 'option:selected' ).val()
				}
			};
			
			Accounts.createUser(adminUser, function(error) {
				if(error) {
					toastr.error("Sign Up Failed... " + error);
				} else {
					toastr.success("Signed Up Successfully");
					Router.go('/');
				}
			});
		}
	}
});