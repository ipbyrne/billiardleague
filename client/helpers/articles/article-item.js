Template.articleItem.helpers({
	gravatarImgUrl: function () {
		//Need to return article author email inorder to retrieve gravatar code.
		var userImageUrl = Gravatar.imageUrl($('#user').text());
		return userImageUrl;
	},
	commentCount: function() {
		return Comments.find({articleId: this._id}).count();
	}
});