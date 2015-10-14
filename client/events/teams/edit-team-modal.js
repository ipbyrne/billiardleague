Template.editTeamModal.events({
	'keyup .search-bar': function() {
		Session.set("user-search-query", $('.search-bar').val());
	},
	'click .add-member': function(e) {
		e.preventDefault();
		var teamId = Session.get('teamId');
		var team = Teams.findOne({_id: teamId});
		var member = {
			name: this.profile.name
		}
		console.log(this._id + "- div."+this._id)
		if(team.memberCount < 8) {
			if($.inArray(this.profile.name, team.membersNames) !== -1) {
				toastr.error("Failed to add member because he is already a member...");
			} else {
				Meteor.call('addTeamMember', team._id, this.profile.name, team.memberCount, function(error) {
					if(error) {
						toastr.error("Failed to add member..." + error);
					} else {
						toastr.success("Member Added");
					}
				});
			};
			$('#'+this._id).addClass("hide");
		} else {
			toastr.error("Team is full or the User is Already a Member!");
		}
	},
	'click .load-more':function() {
		usersHandle.loadNextPage();
	}
});