Template.submitTeam.events({
	'click button.submit': function(template) {
		var title = $('#title').val();
		var body = $('.body').code();
		var bar = $('#signup-bar').val();
		var phone = $('#signup-phone').val();
		var address = $('#signup-address').val();
		var city = $('#signup-city').val();
		var state = $('#signup-state').val();
		var zipcode = $('#signup-zipcode').val();
		var country = $('#signup-country').val();
		
		
		if(Meteor.user() != null) {
			Meteor.call('teamInsert', title, body, bar, phone, address, city, state, zipcode, country,  function(error, response) {
				if(error) {
					toastr.error("Failed to Create Team... "+error);
				} else {
					var teamRoute = '/teams/' + response;
					toastr.success("Team Created!");
					document.getElementById('title').value = '';
					document.getElementById('summernote').value = '';
					Router.go(teamRoute);
				}
			});
		}
	}
});