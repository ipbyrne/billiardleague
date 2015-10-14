Template.submitScoreSheet2.events({
	'click button.submit': function(template) {
		$("#skill-level").find( 'option:selected' ).val()
		var title = $('#title').val();
		var body = $('.body').code();
		var roundsNumber = $('#rounds').val();
		var startDate = $('#date').val();
		var match = Session.get('match-info');
		
		var rows = [];
		
		var rowCounter = 0;
		for(var i = 0; i < 14; i++) {
			rowCounter += 1;
			var row = {
				gameNumber: $("#game-field-"+rowCounter).val(),
				break: $("#break"+rowCounter).find( 'option:selected' ).val(),
				gd11: $("#game-data1-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd12: $("#game-data2-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd21: $("#game-data2-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd22: $("#game-data2-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd31: $("#game-data3-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd32: $("#game-data3-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd41: $("#game-data4-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd42: $("#game-data4-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd51: $("#game-data5-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd52: $("#game-data5-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd61: $("#game-data6-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd62: $("#game-data6-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd71: $("#game-data7-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd72: $("#game-data7-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd81: $("#game-data8-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd82: $("#game-data8-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd91: $("#game-data9-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd92: $("#game-data9-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd101: $("#game-data10-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd102: $("#game-data10-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd111: $("#game-data11-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd112: $("#game-data11-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd121: $("#game-data12-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd122: $("#game-data12-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd131: $("#game-data13-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd132: $("#game-data13-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd141: $("#game-data14-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd142: $("#game-data14-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd151: $("#game-data15-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd152: $("#game-data15-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd161: $("#game-data16-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd162: $("#game-data16-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd171: $("#game-data17-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd172: $("#game-data17-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd181: $("#game-data18-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd182: $("#game-data18-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd191: $("#game-data19-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd192: $("#game-data19-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd201: $("#game-data20-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd202: $("#game-data20-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd211: $("#game-data21-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd212: $("#game-data21-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd221: $("#game-data22-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd222: $("#game-data22-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd231: $("#game-data23-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd232: $("#game-data23-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd241: $("#game-data24-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd242: $("#game-data24-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd251: $("#game-data25-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd252: $("#game-data25-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd261: $("#game-data26-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd262: $("#game-data26-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd271: $("#game-data27-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd272: $("#game-data27-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd281: $("#game-data28-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd282: $("#game-data28-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd291: $("#game-data29-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd292: $("#game-data29-2-row"+rowCounter).find( 'option:selected' ).val(),
				gd301: $("#game-data30-1-row"+rowCounter).find( 'option:selected' ).val(),
				gd302: $("#game-data30-2-row"+rowCounter).find( 'option:selected' ).val(),
				win1: $("#win-1-row"+rowCounter).find( 'option:selected' ).val(),
				win2: $("#win-2-row"+rowCounter).find( 'option:selected' ).val()
			};
			rows.push(row);
		}
		
		var scoreSheet = {
			matchId: match.matchId,
			game: "9-Ball",
			homePlayer: Session.get('homePlayer'),
			homeRaceTo: $("#home-race").val(),
			visitorPlayer: Session.get('visitorPlayer'),
			visitorRaceTo: $("#visitor-race").val(),
			row: rows,
			submitted: match.matchDate
		}
		
		if(Meteor.user() != null) {
			Meteor.call('scoreSheetInsert', scoreSheet, function(error, response) {
				if(error) {
					toastr.error("Failed to Create Scoresheet... "+error);
				} else {
					var scoreSheetRoute = '/matches/' + response;
					toastr.success("Score Sheet Created!");
					Session.set('divisionId', "");
					Session.set('divisionName', "");
					Session.set('homePlayer', "");
					Session.set('visitorPlayer', "");
					Router.go(scoreSheetRoute);
				}
			});
		}
	}
});