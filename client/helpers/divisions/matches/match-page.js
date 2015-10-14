Template.matchPage.helpers({
	match: function() {
		return Session.get('match-info');
	},
	matchScoreSheets: function() {
		return Scoresheets.find({matchId: Session.get('match-info').matchId })
	},
	divisionId: function() {
		return Session.get('divisionId2');
	},
	matchFromCollection: function() {
		return Matches.findOne({matchId: Session.get('match-info').matchId });
	}
});