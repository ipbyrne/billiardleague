Meteor.methods({
	// Admin Dashboard
	getUserCount: function () {
		count = Meteor.users.find().count();
		return count;
	},
	setUserRole: function(userId, role) {
		Meteor.users.update({_id: userId}, {$set: {"profile.role": role}});
	},
	editUser: function(userId, newEmail, oldEmail, role, name, phone, address, city, state, zipcode, country, skillLevel, balance) {
		Accounts.addEmail(userId, newEmail, false);
		Accounts.removeEmail(userId, oldEmail);
		Meteor.users.update({_id: userId}, {$set: {
																							"profile.role": role,
																							"profile.name": name,
																							"profile.phone": phone,
																							"profile.address": address,
																							"profile.city": city,
																							"profile.state": state,
																							"profile.zipcode": zipcode,
																							"profile.country": country,
																							"profile.skillLevel": skillLevel,
																							"profile.balance": balance
																							}
																			 });
	},
	resetUserPassword: function(userId, email) {
		Accounts.sendResetPasswordEmail(userId, email);
	},
	resetNewUserPassword: function(email) {
		var user = Accounts.findUserByEmail(email);
		var userId = user._id;
		Accounts.sendResetPasswordEmail(userId, email);
	},
	createNewUser: function(user) {
		Accounts.createUser(user);
	},
	deleteUser: function(userId) {
		Meteor.users.remove(userId);
	},
	// Article Methods
	articleInsert: function(title, body, thumnailURL) {
		var articleId = Articles.insert({
			title: title,
			body: body,
			thumb: thumnailURL,
			likes: 0,
			likers: [],
			comments: [],
			submitted: new Date(),
			user: Meteor.userId(),
			useremail: Meteor.user().emails[0].address
		});
	},
	articleUpdate: function(articleId, title, body, thumbnailURL) {
		Articles.update({_id: articleId}, {$set: {
			title:title,
			body:body,
			thumb: thumbnailURL}
		});
	},
	likeArticle: function(articleId) {
		Articles.update({_id:articleId}, {$inc: {likes: 1}});
		Articles.update({_id:articleId}, {$addToSet: {likers: Meteor.userId()}});
	},
	unlikeArticle: function(articleId) {
		Articles.update({_id:articleId}, {$inc: {likes: -1}});
		Articles.update({_id:articleId}, {$pull: {likers: Meteor.userId()}});
	},
	deleteArticle: function(articleId) {
		Articles.remove({_id:articleId});
		Comments.remove({articleId: articleId});
	},
	// Comment Methods
	commentInsert: function(comment) {
		Comments.insert(comment);
	},
	likeComment: function(commentId) {
		Comments.update({_id:commentId}, {$inc: {likes: 1}});
		Comments.update({_id:commentId}, {$addToSet: {likers: Meteor.userId()}});
	},
	unlikeComment: function(commentId) {
		Comments.update({_id:commentId}, {$inc: {likes: -1}});
		Comments.update({_id:commentId}, {$pull: {likers: Meteor.userId()}});
	},
	deleteComment: function(commentId) {
		Comments.remove({_id: commentId});
	},
	// Team Methods
	teamInsert: function(title, body, bar, phone, address, city, state, zipcode, country) {
		var teamId = Teams.insert({
			title: title,
			body: body,
			memberCount: 0,
			membersNames: [],
			members: [],
			captain: "",
			divisions: [],
			hotspotBar: bar,
			hotspotPhone: phone,
			hotspotAddress: address,
			hotspotCity: city,
			hotspotState: state,
			hotspotZipcode: zipcode,
			hotspotCountry: country,
			submitted: new Date(),
			user: Meteor.userId(),
		});
		var team = Teams.findOne({title: title})
		return team._id;
	},
	addTeamMember: function(teamId, memberName, memberCount) {
		var teamMember = {name: memberName}
		Teams.update({_id:teamId}, {$inc: {memberCount: 1}});
		Teams.update({_id:teamId}, {$addToSet: {members: teamMember}});
		Teams.update({_id:teamId}, {$addToSet: {membersNames: memberName}});
		if(memberCount === 0) {
			Teams.update({_id:teamId}, {$set: {captain: memberName}});
		}
	},
	removeTeamMember: function(teamId, memberName) {
		var teamMember = {name: memberName}
		Teams.update({_id:teamId}, {$inc: {memberCount: -1}});
		Teams.update({_id:teamId}, {$pull: {members: teamMember}});
		Teams.update({_id:teamId}, {$pull: {membersNames: memberName}});
	},
	decreaseTeamWins: function(teamId) {
		Teams.update({_id:teamId}, {$inc: {wins: -1}});
	},
	increaseTeamWins: function(teamId) {
		Teams.update({_id:teamId}, {$inc: {wins: 1}});
	},
	decreaseTeamLosses: function(teamId) {
		Teams.update({_id:teamId}, {$inc: {losses: -1}});
	},
	increaseTeamLosses: function(teamId) {
		Teams.update({_id:teamId}, {$inc: {losses: 1}});
	},
	promoteTeamCaptain: function(teamId, memberName) {
		Teams.update({_id:teamId}, {$set: {captain: memberName}});
	},
	updateTeam: function(teamId, title, body, bar, phone, address, city, state, zipcode, country) {
		Teams.update({_id:teamId}, {$set: {title: title}});
		Teams.update({_id:teamId}, {$set: {body: body}});
		Teams.update({_id:teamId}, {$set: {hotspotBar: bar}});
		Teams.update({_id:teamId}, {$set: {hotspotPhone: phone}});
		Teams.update({_id:teamId}, {$set: {hotspotAddress: address}});
		Teams.update({_id:teamId}, {$set: {hotspotCity: city}});
		Teams.update({_id:teamId}, {$set: {hotspotState: state}});
		Teams.update({_id:teamId}, {$set: {hotspotZipcode: zipcode}});
		Teams.update({_id:teamId}, {$set: {hotspotCountry: country}});
	},
	deleteTeam: function(teamId) {
		Teams.remove({_id: teamId});
	},
	// Division Methods
	divisionInsert: function(title, body, roundsNumber, startDate) {
		var divisionId = Divisions.insert({
			title: title,
			body: body,
			teamCount: 0,
			teamNames: [],
			teams: [],
			rounds: [],
			roundsNumber: roundsNumber,
			startDate: new Date(startDate),
			submitted: new Date(),
			user: Meteor.userId(),
		});
		var division = Divisions.findOne({title: title})
		return division._id;
	},
	updateDivision: function(divisionId, title, body, roundsNumber, startDate) {
		Divisions.update({_id:divisionId}, {$set: {title: title}});
		Divisions.update({_id:divisionId}, {$set: {body: body}});
		Divisions.update({_id:divisionId}, {$set: {roundsNumber: roundsNumber}});
		Divisions.update({_id:divisionId}, {$set: {startDate: new Date(startDate)}});
	},
	generateSchedule: function(teamsNumber) {
		var robin = Meteor.npmRequire('roundrobin');
		console.log(robin(teamsNumber));
		return robin(teamsNumber);
	},
	addDivisionTeam: function(divisionId, teamName, memberCount, teamCount) {
		var team = {name: teamName, points:0};
		var division = Divisions.findOne({_id: divisionId});
		Divisions.update({_id:divisionId}, {$inc: {teamCount: 1}});
		Divisions.update({_id:divisionId}, {$addToSet: {teams: team}});
		Divisions.update({_id:divisionId}, {$addToSet: {teamNames: teamName}});
		Teams.update({title: teamName},{$addToSet: {divisions: division.title}})
	},
	removeDivisionTeam: function(divisionId, teamName, memberCount) {
		var team = {name: teamName};
		var division = Divisions.findOne({_id: divisionId});
		Divisions.update({_id:divisionId}, {$inc: {teamCount: -1}});
		Divisions.update({_id:divisionId}, {$pull: {teams: team}});
		Divisions.update({_id:divisionId}, {$pull: {teamNames: teamName}});
		Teams.update({title: teamName},{$pull: {divisions: division.title}})
	},
	divisionRoundInsert: function (divisionId,round, counter) {
		var roundObject = {name: "round"+counter,
											week: counter + 1,
											matches: round};
		Divisions.update({_id:divisionId}, {$addToSet: {rounds: roundObject }});
	},
	deleteDivision: function(divisionId) {
		var division = Divisions.findOne({_id: divisionId});
		Divisions.remove({_id: divisionId});
	},
	// Scoresheet Methods
	scoreSheetInsert: function(scoreSheet) {
		var scoreSheetId = Scoresheets.insert(scoreSheet);
		var findScoreSheet = Scoresheets.findOne(scoreSheet)
		return findScoreSheet.matchId;
	},
	deleteScoreSheet: function(scoreSheetId) {
		Scoresheets.remove({_id: scoreSheetId});
	},
	// Match Methods
	createMatch: function(match) {
		Matches.insert(match);
	},
	updateMatch: function(match) {
		Matches.update({matchId: match.matchId}, match);
	}
});