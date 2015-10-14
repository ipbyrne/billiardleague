Template.addVisitorPlayerModal2.events({
	'keyup .search-bar2': function() {
		Session.set("user-search-query", $('.search-bar2').val());
	},
	'click .add-player': function(e) {
		e.preventDefault();
		Session.set('visitorPlayer', this.profile.name);
		toastr.success('Home Player Selected');
	},
	'click .load-more':function() {
		usersHandle.loadNextPage();
	}
});