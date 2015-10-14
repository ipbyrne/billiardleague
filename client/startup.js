Meteor.startup(function () {
	Session.set("user-search-query", '');
	Session.set("article-search-query", '');
	Session.set("team-search-query", '');
	Session.set("division-search-query", '');
	Session.set("scoresheet-search-query", '');
});