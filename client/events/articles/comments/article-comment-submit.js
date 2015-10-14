Template.articleCommentSubmit.events({
	'click button#submit-article-comment': function() {
		
		var commentBody = $('#article-comment').val();
		
		var comment = {
			body: commentBody,
			articleId: Session.get('articleId'),
			submitted: new Date(),
			likes: 0,
			likers: [],
			user: Meteor.userId(),
			useremail: Meteor.user().emails[0].address
		};
		
    Meteor.call('commentInsert', comment);
		
		document.getElementById('article-comment').value = '';
		console.log(commentBody);
	}
});