Template.teamList.helpers({
	teams: function() {
		return Teams.find({},{sort: {submitted: -1}});
	}
});