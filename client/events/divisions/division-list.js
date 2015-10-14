Template.divisionList.events({
	'keyup .search-bar': function() {
		Session.set("division-search-query", $('.search-bar').val());
	}
});