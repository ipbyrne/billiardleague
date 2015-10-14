Template.addHomePlayerModal2.events({
	'keyup .search-bar': function() {
		Session.set("user-search-query", $('.search-bar').val());
	},
	'click .add-player': function(e) {
		e.preventDefault();
		Session.set('homePlayer', this.profile.name);
		toastr.success('Home Player Selected');
	},
	'click .load-more':function() {
		usersHandle.loadNextPage();
	}
});