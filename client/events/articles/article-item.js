Template.articleItem.events({
	'click .article-item-upvote':function(e) {
		e.preventDefault();
		var articleId = Articles.findOne({_id:this._id});
		if ($.inArray(Meteor.userId(), articleId.likers) !== -1){
			if(confirm('Are you sure you?')) {
				Meteor.call('unlikeArticle', this._id);
			} 
		} else {
			Meteor.call('likeArticle', this._id);
		}	
	}
});