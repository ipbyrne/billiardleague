Template.teamList.events({
	'keyup .search-bar': function() {
		Session.set("team-search-query", $('.search-bar').val());
	}
});