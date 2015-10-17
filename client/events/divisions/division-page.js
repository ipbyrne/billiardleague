Template.divisionPage.events({
	'click .delete-division': function() {
		if(confirm('Are you sure?')) {
			Meteor.call('deleteDivision', this._id, function(error) {
				if(error) {
					toastr.error("Failed to Delete... " + error);
				} else {
					toastr.success("Division Deleted.");
					Router.go('/divisions');
				}
			})
		}
	},
	'click .robin-test': function() {
		var teamNumber = this.teamCount ;
		var roundsNumber = this.roundsNumber;
		var counter = 0;
		var switchCounter = 1;
		var divisionId = this._id;
		var week = 1;
		var date = this.startDate;
		var divisionCounter = 0;
		var switchCounterTwo = 1;
		
		// For response.forEach
		var columnNumbers = teamNumber/2;
		
		if(teamNumber >= 4 && teamNumber <= 10) {
			for(var i = 0; i < roundsNumber; i++ ) {
				Meteor.call('generateSchedule', teamNumber, function(error, response) {
					//if(switchCounter === 1) {
						response.forEach(function (array) {
							if(switchCounterTwo === 1) {
								for(var i = 0; i<columnNumbers; i++) {
									var temp = array[i][0];
									array[i][0] = array[i][1];
									array[i][1] = temp;
								};
							}
							switchCounterTwo *= -1;
						})
					//}
					response.forEach(function (array) {
						for(var i = 0; i<columnNumbers; i++) {
							array[i].push(week);
							array[i].push(date);
							var homeTeam = array[i][0];
							var visitorTeam = array[i][1];
							var match = {
								divisionCounter: counter,
								matchId: Random.id(7),
								divisionId: divisionId,
								week: week,
								matchNumber: i+1,
								matchInfo: [],
								matchDate: date,
								homeTeam: homeTeam,
								visitorTeam: visitorTeam,
								RcC2R3: "",
								RcC2R4: "",
								RcC2R5: "",
								RcC2R6: "",
								RcC2R7: "",
								RcC2R8: "",
								RcC3R4: "",
								RcC3R5: "",
								RcC3R6: "",
								RcC3R7: "",
								RcC3R8: "",
								RcC4R5: "",
								RcC4R6: "",
								RcC4R7: "",
								RcC4R8: "",
								RcC5R6: "",
								RcC5R7: "",
								RcC5R8: "",
								RcC6R7: "",
								RcC6R8: "",
								RcC7R8: "",
								homePoints1: 0,
								homePoints2: 0,
								homePoints3: 0,
								homePoints4: 0,
								homePoints5: 0,
								homePointsTotal: 0,
								homeSkillLevel1: 0,
								homeSkillLevel2: 0,
								homeSkillLevel3: 0,
								homeSkillLevel4: 0,
								homeSkillLevel5: 0,
								homeSkillLevelTotal: 0,
								homePlayerName1:"",
								homePlayerName2:"",
								homePlayerName3:"",
								homePlayerName4:"",
								homePlayerName5:"",
								homeRaceTo1: "",
								homeRaceTo2: "",
								homeRaceTo3: "",
								homeRaceTo4: "",
								homeRaceTo5: "",
								homeCaptainInitials:"",
								homeTeamNotes: "",
								homeTeamBalance: "$50",
								visitorPoints1: 0,
								visitorPoints2: 0,
								visitorPoints3: 0,
								visitorPoints4: 0,
								visitorPoints5: 0,
								visitorPointsTotal: 0,
								visitorSkillLevel1: 0,
								visitorSkillLevel2: 0,
								visitorSkillLevel3: 0,
								visitorSkillLevel4: 0,
								visitorSkillLevel5: 0,
								visitorSkillLevelTotal: 0,
								visitorPlayerName1:"",
								visitorPlayerName2:"",
								visitorPlayerName3:"",
								visitorPlayerName4:"",
								visitorPlayerName5:"",
								visitorRaceTo1: "",
								visitorRaceTo2: "",
								visitorRaceTo3: "",
								visitorRaceTo4: "",
								visitorRaceTo5: "",
								visitorCaptainInitials:"",
								visitorTeamNotes: "",
								visitorTeamBalance: "$50"
							}
							array[i].push(match);
							Meteor.call('createMatch', match, counter);
						};
						week += 1;
						date = new Date(date.setDate(date.getDate() + 7));
					});
					Meteor.call('divisionRoundInsert',divisionId, response, counter);
					counter += 1;
					switchCounter *= -1;
				});	
			}
			toastr.success("Schedule & Matches Generated!");
		} else {
			toastr.error("You must have atleast 4 teams in the division!");
		}
	},
	'click .match-panel':function() {
		console.log(this[4]);
		Session.set('match-info', this[4]);
		Session.set('match-homeTeam', this[0]);
		Session.set('match-visitorTeam', this[1]);
	}
});