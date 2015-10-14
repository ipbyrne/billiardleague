Template.addScoreSheetDivisionModal.events({
	'keyup .search-bar3': function() {
		Session.set("division-search-query", $('.search-bar3').val());
	},
	'click .add-division': function(e) {
		e.preventDefault();
		Session.set('divisionId', this._id);
		Session.set('divisionName', this.title);
		toastr.success('Division Selected');
	}
});