Template.divisionList.helpers({
	divisions: function() {
		return Divisions.find({},{sort: {submitted: -1}});
	}
});