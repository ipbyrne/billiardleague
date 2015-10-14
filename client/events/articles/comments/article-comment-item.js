Template.articleCommentItem.events({
	'click .article-item-upvote':function(e) {
		e.preventDefault();
		var commentId = Comments.findOne({_id:this._id});
		if ($.inArray(Meteor.userId(), commentId.likers) !== -1){
			if(confirm('Are you sure you?')) {
				Meteor.call('unlikeComment', this._id);
			} 
		} else {
			Meteor.call('likeComment', this._id);
		}	
	},
	'click button.delete-comment': function() {
		if(confirm('Are you sure?')) {
			Meteor.call('deleteComment', this._id, function(error) {
				if(error) {
					toastr.error("Failed to Delete... " + error);
				} else {
					toastr.success("Comment Deleted.");
				}
			})
		}
	}
});