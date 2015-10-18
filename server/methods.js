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
	addDivisionTeam: function(divisionId, teamName, memberCount, teamCount, hotspotBar, hotspotAddress, hotspotCity, hotspotState, hotspotPhone, captain,) {
		var team = {
								name: teamName, 
								points:0,
								hotspotBar: hotspotBar,
								hotspotAddress: hotspotAddress,
								hotspotCity: hotspotCity,
								hotspotState: hotspotState,
								hotspotPhone: hotspotPhone,
								captain: captain
							 };
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
		var scoreSheet = Scoresheets.findOne({_id: scoreSheetId});
		
		scoreSheet.row.forEach(function(row){
			//Home
			// If Home player break is "8" update eightBall Breaks
			if(row.break1 == 9) {
				Meteor.users.update({"profile.name": scoreSheet.homePlayer}, {$inc: {"profile.nineBallBreaks": -1 }});
			}
			// If home player win is "check" update games one
			if(row.win1 == "&#x2713;") {
				Meteor.users.update({"profile.name": scoreSheet.homePlayer}, {$inc: {"profile.gamesWon": -1 }});
			}

			// If home player win is "BR" update breakAndRuns
			if(row.win1 == "BR") {
				Meteor.users.update({"profile.name": scoreSheet.homePlayer}, {$inc: {"profile.breakAndRuns": -1, "profile.gamesWon": -1 }});
			}

			//Visitor
			// If Visitor player break is "8" update eightBall Breaks
			if(row.break2 == 9) {
				Meteor.users.update({"profile.name": scoreSheet.visitorPlayer}, {$inc: {"profile.nineBallBreaks": -1 }});
			}
			// If Visitor player win is "check" update games one
			if(row.win2 == "&#x2713;") {
				Meteor.users.update({"profile.name": scoreSheet.visitorPlayer}, {$inc: {"profile.gamesWon": -1 }});
			}

			// If Visitor player win is "BR" update breakAndRuns
			if(row.win2 == "BR") {
				Meteor.users.update({"profile.name": scoreSheet.visitorPlayer}, {$inc: {"profile.breakAndRuns": -1, "profile.gamesWon": -1 }});
			}
		});
		Scoresheets.remove({_id: scoreSheetId});
	},
	updateUserStats: function(row, homePlayer, visitorPlayer) {
		// Home
		// If Home player break is "8" update eightBall Breaks
		if(row.break1 == 8) {
			Meteor.users.update({"profile.name": homePlayer}, {$inc: {"profile.eightBallBreaks": 1 }});
		}
		// If home player win is "check" update games one
		if(row.win1 == "&#x2713;") {
			Meteor.users.update({"profile.name": homePlayer}, {$inc: {"profile.gamesWon": 1 }});
		}
		
		// If home player win is "BR" update breakAndRuns
		if(row.win1 == "BR") {
			Meteor.users.update({"profile.name": homePlayer}, {$inc: {"profile.breakAndRuns": 1, "profile.gamesWon": 1 }});
		}
		
		//Visitor
		// If Visitor player break is "8" update eightBall Breaks
		if(row.break2 == 9) {
			Meteor.users.update({"profile.name": visitorPlayer}, {$inc: {"profile.eightBallBreaks": 1 }});
		}
		// If Visitor player win is "check" update games one
		if(row.win2 == "&#x2713;") {
			Meteor.users.update({"profile.name": visitorPlayer}, {$inc: {"profile.gamesWon": 1 }});
		}
		
		// If Visitor player win is "BR" update breakAndRuns
		if(row.win2 == "BR") {
			Meteor.users.update({"profile.name": visitorPlayer}, {$inc: {"profile.breakAndRuns": 1, "profile.gamesWon": 1 }});
		}
	},
	updateUserStats2: function(row, homePlayer, visitorPlayer) {
		//Home
		// If Home player break is "8" update eightBall Breaks
		if(row.break1 == 9) {
			Meteor.users.update({"profile.name": homePlayer}, {$inc: {"profile.nineBallBreaks": 1 }});
		}
		// If home player win is "check" update games one
		if(row.win1 == "&#x2713;") {
			Meteor.users.update({"profile.name": homePlayer}, {$inc: {"profile.gamesWon": 1 }});
		}
		
		// If home player win is "BR" update breakAndRuns
		if(row.win1 == "BR") {
			Meteor.users.update({"profile.name": homePlayer}, {$inc: {"profile.breakAndRuns": 1, "profile.gamesWon": 1 }});
		}
		
		//Visitor
		// If Visitor player break is "8" update eightBall Breaks
		if(row.break2 == 9) {
			Meteor.users.update({"profile.name": visitorPlayer}, {$inc: {"profile.nineBallBreaks": 1 }});
		}
		// If Visitor player win is "check" update games one
		if(row.win2 == "&#x2713;") {
			Meteor.users.update({"profile.name": visitorPlayer}, {$inc: {"profile.gamesWon": 1 }});
		}
		
		// If Visitor player win is "BR" update breakAndRuns
		if(row.win2 == "BR") {
			Meteor.users.update({"profile.name": visitorPlayer}, {$inc: {"profile.breakAndRuns": 1, "profile.gamesWon": 1 }});
		}
	},
	// Match Methods
	createMatch: function(match) {
		Matches.insert(match);
	},
	updateMatchIncrease: function(match, divisionId, originalHTotal, originalVTotal) {
		Matches.update({matchId: match.matchId}, match);
		var division = Divisions.findOne({_id: divisionId});
		var homeTeamIndex = Number(match.homeTeam) -1;
		var visitorTeamIndex = Number(match.visitorTeam) -1;
		
		if(visitorTeamIndex === 0) {
			if(match.visitorPointsTotal != originalVTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.0.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.0.points": match.visitorPointsTotal}});
			}
		}
		
		if(visitorTeamIndex === 1) {
			if(match.visitorPointsTotal != originalVTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.1.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.1.points": match.visitorPointsTotal}});
			}
		}
		
		if(visitorTeamIndex === 2) {
			if(match.visitorPointsTotal != originalVTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.2.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.2.points": match.visitorPointsTotal}});
			}
		}
		
		if(visitorTeamIndex === 3) {
			if(match.visitorPointsTotal != originalVTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.3.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.3.points": match.visitorPointsTotal}});
			}
		}
		
		if(visitorTeamIndex === 4) {
			if(match.visitorPointsTotal != originalVTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.4.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.4.points": match.visitorPointsTotal}});
			}
		}
		
		if(visitorTeamIndex === 5) {
			if(match.visitorPointsTotal != originalVTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.5.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.5.points": match.visitorPointsTotal}});
			}
		}
		
		if(visitorTeamIndex === 6) {
			if(match.visitorPointsTotal != originalVTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.6.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.6.points": match.visitorPointsTotal}});
			}
		}
		
		if(visitorTeamIndex === 7) {
			if(match.visitorPointsTotal != originalVTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.7.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.7.points": match.visitorPointsTotal}});
			}
		}
		
		if(visitorTeamIndex === 8) {
			if(match.visitorPointsTotal != originalVTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.8.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.8.points": match.visitorPointsTotal}});
			}
		}
		
		if(visitorTeamIndex === 9) {
			if(match.visitorPointsTotal != originalVTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.9.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.9.points": match.visitorPointsTotal}});
			}
		}
		
		if(homeTeamIndex === 0) {
			if(match.homePointsTotal != originalHTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.0.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.0.points": match.homePointsTotal}});
			}
		}
		
		if(homeTeamIndex === 1) {
			if(match.homePointsTotal != originalHTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.1.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.1.points": match.homePointsTotal}});
			}
		}
		
		if(homeTeamIndex === 2) {
			if(match.homePointsTotal != originalHTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.2.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.2.points": match.homePointsTotal}});
			}
		}
		
		if(homeTeamIndex === 3) {
			if(match.homePointsTotal != originalHTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.3.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.3.points": match.homePointsTotal}});
			}
		}
		
		if(homeTeamIndex === 4) {
			if(match.homePointsTotal != originalHTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.4.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.4.points": match.homePointsTotal}});
			}
		}
		
		if(homeTeamIndex === 5) {
			if(match.homePointsTotal != originalHTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.5.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.5.points": match.homePointsTotal}});
			}
		}
		
		if(homeTeamIndex === 6) {
			if(match.homePointsTotal != originalHTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.6.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.6.points": match.homePointsTotal}});
			}
		}
		
		if(homeTeamIndex === 7) {
			if(match.homePointsTotal != originalHTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.7.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.7.points": match.homePointsTotal}});
			}
		}
		
		if(homeTeamIndex === 8) {
			if(match.homePointsTotal != originalHTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.8.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.8.points": match.homePointsTotal}});
			}
		}
		
		if(homeTeamIndex === 9) {
			if(match.homePointsTotal != originalHTotal) {
				Divisions.update({ _id: divisionId}, {$set: {"teams.9.points": 0}});
				Divisions.update({ _id: divisionId}, {$inc: {"teams.9.points": match.homePointsTotal}});
			}
		}
	},
	updateMatchDecrease: function(match, divisionId, originalHTotal, originalVTotal) {
		var homeTeamIndex = Number(match.homeTeam) -1;
		var visitorTeamIndex = Number(match.visitorTeam) -1;
		
		if(visitorTeamIndex === 0) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.0.points":-originalVTotal}});
		}
		
		if(visitorTeamIndex === 1) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.1.points":-originalVTotal}});
		}
		
		if(visitorTeamIndex === 2) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.2.points":-originalVTotal}});
		}
		
		if(visitorTeamIndex === 3) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.3.points":-originalVTotal}});
		}
		
		if(visitorTeamIndex === 4) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.4.points":-originalVTotal}});
		}
		
		if(visitorTeamIndex === 5) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.5.points":-originalVTotal}});
		}
		
		if(visitorTeamIndex === 6) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.6.points":-originalVTotal}});
		}
		
		if(visitorTeamIndex === 7) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.7.points":-originalVTotal}});
		}
		
		if(visitorTeamIndex === 8) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.8.points":-originalVTotal}});
		}
		
		if(visitorTeamIndex === 9) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.9.points":-originalVTotal}});
		}
		
		if(homeTeamIndex === 0) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.0.points":-originalHTotal}});
		}
		
		if(homeTeamIndex === 1) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.1.points":-originalHTotal}});
		}
		
		if(homeTeamIndex === 2) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.2.points":-originalHTotal}});
		}
		
		if(homeTeamIndex === 3) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.3.points":-originalHTotal}});
		}
		
		if(homeTeamIndex === 4) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.4.points":-originalHTotal}});
		}
		
		if(homeTeamIndex === 5) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.5.points":-originalHTotal}});
		}
		
		if(homeTeamIndex === 6) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.6.points":-originalHTotal}});
		}
		
		if(homeTeamIndex === 7) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.7.points":-originalHTotal}});
		}
		
		if(homeTeamIndex === 8) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.8.points":-originalHTotal}});
		}
		
		if(homeTeamIndex === 9) {
			Divisions.update({ _id: divisionId}, {$inc: {"teams.9.points":-originalHTotal}});
		}
	}
});