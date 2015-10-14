
Template.articlePage.helpers({
	comments: function() {
		Session.set('articleId', this._id);
		return Comments.find({}, {sort:{submitted: 1}});
	},
	commentCount: function() {
		return Comments.find({articleId: this._id}).count();
	},
	gravatarImgUrl: function () {
		//Need to return article author email inorder to retrieve gravatar code.
		var userImageUrl = Gravatar.imageUrl($('#user').text());
		return userImageUrl;
	}
});
