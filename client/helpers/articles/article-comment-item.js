Template.articleCommentItem.helpers({
	gravatarImgUrl: function () {
		//Need to return article author email inorder to retrieve gravatar code.
		var userImageUrl = Gravatar.imageUrl($('#user').text());
		return userImageUrl;
	}
});