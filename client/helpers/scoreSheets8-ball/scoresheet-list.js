Template.scoreSheetList.helpers({
	scoreSheets: function() {
		return Scoresheets.find({},{});
	}
});