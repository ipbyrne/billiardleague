Template.matchPage.events({
	'click .save-match': function() {
		console.log(Number($('#home-points1').val())+Number($('#home-points2').val())+Number($('#home-points3').val())+Number($('#home-points4').val())+Number($('#home-points5').val()));
		var originalHTotal = Number($('#home-points1').val())+Number($('#home-points2').val())+Number($('#home-points3').val())+Number($('#home-points4').val())+Number($('#home-points5').val());
		var originalVTotal = Number($('#visitor-points1').val())+ Number($('#visitor-points2').val())+ Number($('#visitor-points3').val())+ Number($('#visitor-points4').val())+ Number($('#visitor-points5').val());
		var match = {
								matchId: Session.get('match-info').matchId,
								week: Session.get('match-info').week,
								matchNumber: Session.get('match-info').matchNumber,
								matchInfo: Session.get('match-info').matchInfo,
								matchDate: Session.get('match-info').matchDate,
								homeTeam: Session.get('match-info').homeTeam,
								visitorTeam: Session.get('match-info').visitorTeam,
								RcC2R3: $('#rc-c2-r3').val(),
								RcC2R4: $('#rc-c2-r4').val(),
								RcC2R5: $('#rc-c2-r5').val(),
								RcC2R6: $('#rc-c2-r6').val(),
								RcC2R7: $('#rc-c2-r7').val(),
								RcC2R8: $('#rc-c2-r8').val(),
								RcC3R4: $('#rc-c3-r4').val(),
								RcC3R5: $('#rc-c3-r5').val(),
								RcC3R6: $('#rc-c3-r6').val(),
								RcC3R7: $('#rc-c3-r7').val(),
								RcC3R8: $('#rc-c3-r8').val(),
								RcC4R5: $('#rc-c4-r5').val(),
								RcC4R6: $('#rc-c4-r6').val(),
								RcC4R7: $('#rc-c4-r7').val(),
								RcC4R8: $('#rc-c4-r8').val(),
								RcC5R5: $('#rc-c5-r5').val(),
								RcC5R6: $('#rc-c5-r6').val(),
								RcC5R7: $('#rc-c5-r7').val(),
								RcC5R8: $('#rc-c5-r8').val(),
								RcC6R7: $('#rc-c6-r7').val(),
								RcC6R8: $('#rc-c6-r8').val(),
								RcC7R8: $('#rc-c7-r8').val(),
								homePoints1: $('#home-points1').val(),
								homePoints2: $('#home-points2').val(),
								homePoints3: $('#home-points3').val(),
								homePoints4: $('#home-points4').val(),
								homePoints5: $('#home-points5').val(),
								homePointsTotal: Number($('#home-points1').val())+Number($('#home-points2').val())+Number($('#home-points3').val())+Number($('#home-points4').val())+Number($('#home-points5').val()),
								homeSkillLevel1: $('#home-skilllevel1').val(),
								homeSkillLevel2: $('#home-skilllevel2').val(),
								homeSkillLevel3: $('#home-skilllevel3').val(),
								homeSkillLevel4: $('#home-skilllevel4').val(),
								homeSkillLevel5: $('#home-skilllevel5').val(),
								homeSkillLevelTotal: ( Number($('#home-skilllevel1').val())+ Number($('#home-skilllevel2').val())+ Number($('#home-skilllevel3').val())+ Number($('#home-skilllevel4').val())+ Number($('#home-skilllevel5').val()))/5,
								homePlayerName1:$('#home-player-name1').val(),
								homePlayerName2:$('#home-player-name2').val(),
								homePlayerName3:$('#home-player-name3').val(),
								homePlayerName4:$('#home-player-name4').val(),
								homePlayerName5:$('#home-player-name5').val(),
								homeRaceTo1: $('#home-raceto1').val(),
								homeRaceTo2: $('#home-raceto2').val(),
								homeRaceTo3: $('#home-raceto3').val(),
								homeRaceTo4: $('#home-raceto4').val(),
								homeRaceTo5: $('#home-raceto5').val(),
								homeCaptainInitials:$('#home-captain-initials').val(),
								homeTeamNotes: $('#home-team-notes').val(),
								homeTeamBalance: $('#home-team-balance').val(),
								visitorPoints1: $('#visitor-points1').val(),
								visitorPoints2: $('#visitor-points2').val(),
								visitorPoints3: $('#visitor-points3').val(),
								visitorPoints4: $('#visitor-points4').val(),
								visitorPoints5: $('#visitor-points5').val(),
								visitorPointsTotal:  Number($('#visitor-points1').val())+ Number($('#visitor-points2').val())+ Number($('#visitor-points3').val())+ Number($('#visitor-points4').val())+ Number($('#visitor-points5').val()),
								visitorSkillLevel1: $('#visitor-skilllevel1').val(),
								visitorSkillLevel2: $('#visitor-skilllevel2').val(),
								visitorSkillLevel3: $('#visitor-skilllevel3').val(),
								visitorSkillLevel4: $('#visitor-skilllevel4').val(),
								visitorSkillLevel5: $('#visitor-skilllevel5').val(),
								visitorSkillLevelTotal: (Number($('#visitor-skilllevel1').val())+ Number($('#visitor-skilllevel2').val())+ Number($('#visitor-skilllevel3').val())+ Number($('#visitor-skilllevel4').val())+ Number($('#visitor-skilllevel5').val()))/5,
								visitorPlayerName1:$('#visitor-player-name1').val(),
								visitorPlayerName2:$('#visitor-player-name2').val(),
								visitorPlayerName3:$('#visitor-player-name3').val(),
								visitorPlayerName4:$('#visitor-player-name4').val(),
								visitorPlayerName5:$('#visitor-player-name5').val(),
								visitorRaceTo1: $('#visitor-raceto1').val(),
								visitorRaceTo2: $('#visitor-raceto2').val(),
								visitorRaceTo3: $('#visitor-raceto3').val(),
								visitorRaceTo4: $('#visitor-raceto4').val(),
								visitorRaceTo5: $('#visitor-raceto5').val(),
								visitorCaptainInitials:$('#visitor-captain-initials').val(),	
								visitorTeamNotes: $('#visitor-team-notes').val(),
								visitorTeamBalance: $('#visitor-team-balance').val()
							}
		
		//Meteor.call('updateMatchDecrease', match, Session.get('divisionId2'), originalHTotal, originalVTotal);
		Meteor.call('updateMatchIncrease', match, Session.get('divisionId2'), originalHTotal, originalVTotal, function(error) {
			if(error) {
				toastr.error("Failed to update match... " +error);
			} else {
				toastr.success("Match Updated");
			}
		});
		
		
	}
});