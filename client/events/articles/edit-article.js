Template.articleEditPage.events({
	'click button.submit': function(template) {
		var articleId = this._id;
		var articleRoute = '/articles/' + articleId;
		var url = $('#url').val();
		var title = $('#title').val();
		var body = $('.body').code();
		var thumbnailURL = $('#thumbnailURL').val();
		
		Meteor.call('articleUpdate', articleId, title, body, thumbnailURL, function(error) {
			if(error) {
				toastr.error("Failed to Save Article... " + error);
			} else {
				toastr.success("Article Saved.");
				document.getElementById('title').value = '';
				document.getElementById('summernote').value = '';
				document.getElementById('thumbnailURL').value = '';
				Router.go(articleRoute);
			}
		});
	}
});