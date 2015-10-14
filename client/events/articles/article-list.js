Template.articleList.events({
	'keyup .search-bar': function() {
		Session.set("article-search-query", $('.search-bar').val());
	},
	'click .load-more':function() {
		articlesHandle.loadNextPage();
	}
});