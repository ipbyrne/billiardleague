Template.articlePage.events({
	'click .article-item-upvote':function(e) {
		e.preventDefault();
		var articleId = Articles.findOne({_id:this._id});
		if ($.inArray(Meteor.userId(), articleId.likers) !== -1){
			if(confirm('Are you sure you?')) {
				Meteor.call('unlikeArticle', this._id, function(error) {
					if(error) {
						toastr.error("Failed to UnLike Article... " + error);
					} else {
						toastr.warning("Article UnLiked.");
					}
				});
			} 
		} else {
			Meteor.call('likeArticle', this._id, function(error){
				if(error) {
						toastr.error("Failed to Like Article... " + error);
					} else {
						toastr.success("Article Liked.");
					}
			});
		}	
	},
	'click .load-more':function() {
		commentsHandle.loadNextPage();
	},
	'click .edit-article': function() {
		console.log('test');
	},
	'click .delete-article': function() {
		if(confirm('Are you sure?')) {
			Meteor.call('deleteArticle', this._id, function(error) {
				if(error) {
					toastr.error("Failed to Delete... " + error);
				} else {
					toastr.success("Article Deleted.");
					Router.go('/articles');
				}
			})
		}
	}
});