Template.submitArticle.events({
	'click button.submit': function(template) {
		var title = $('#title').val();
		var body = $('.body').code();
		var thumbnailURL = $('#thumbnailURL').val();
		
		
		if(Meteor.user() != null) {
			Meteor.call('articleInsert', title, body, thumbnailURL, function(error) {
				if(error) {
					toastr.error("Failed to Publish Article... "+error);
				} else {
					toastr.success("Article Published!");
					document.getElementById('title').value = '';
					document.getElementById('summernote').value = '';
					document.getElementById('thumbnailURL').value = '';
					Router.go('/articles');
				}
			});
		}
	}
});