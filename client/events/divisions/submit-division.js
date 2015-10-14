Template.submitDivision.events({
	'click button.submit': function(template) {
		var title = $('#title').val();
		var body = $('.body').code();
		var roundsNumber = $('#rounds').val();
		var startDate = $('#date').val();
		
		if(Meteor.user() != null) {
			Meteor.call('divisionInsert', title, body, roundsNumber, startDate, function(error, response) {
				if(error) {
					toastr.error("Failed to Create Division... "+error);
				} else {
					var divisionRoute = '/divisions/' + response;
					toastr.success("Division Created!");
					document.getElementById('title').value = '';
					document.getElementById('summernote').value = '';
					Router.go(divisionRoute);
				}
			});
		}
	}
});