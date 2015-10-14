// Global Helpers.
Template.registerHelper("isAdmin", function () {
    if(Meteor.user().profile.role === 'Admin') {
			return true;
		} else {
			return false;
		}
});

Template.registerHelper("belongsToYou", function () {
    if(this._id === Meteor.userId()) {
			return true
		} else {
			return false
		}
});

Template.registerHelper("itemBelongsToYou", function () {
    if(this.user === Meteor.userId()) {
			return true
		} else {
			return false
		}
});

// Helpers for Load More Buttons to Display.
Template.registerHelper('userLimitReached', function() {
	if(Meteor.users.find().count() >= 10) {
		return true;
	}
});

Template.registerHelper('articleLimitReached', function() {
	if(Articles.find().count() >= 5) {
		return true;
	}
});

Template.registerHelper('commentLimitReached', function() {
	if(Comments.find({articleId: this._id}).count() >= 10) {
		return true;
	}
});

Template.registerHelper('isSelected', function(someValue, otherValue) {
		if(someValue === otherValue) {
			return "selected";
		} else {
			return ""
		}
});