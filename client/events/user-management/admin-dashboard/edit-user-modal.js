Template.editUserModal.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var userId = this._id;
		var newUserEmail = $('#signup-email'+this._id).val();
		var oldEmail = this.emails[0].address;
		var role = $("#user-roles"+this._id).find( 'option:selected' ).val();
		var name = $('#signup-name'+this._id).val();
		var phone = $('#signup-phone'+this._id).val();
		var address = $('#signup-address'+this._id).val();
		var city = $('#signup-city'+this._id).val();
		var state = $('#signup-state'+this._id).val();
		var zipcode = $('#signup-zipcode'+this._id).val();
		var country = $('#signup-country'+this._id).val()
		var skillLevel = $("#skill-level"+this._id).find( 'option:selected' ).val();
		var balance = $("#balance"+this._id).val();
		
		if(newUserEmail != '') {
			// Close Modal
			$('#edit-user-modal'+this._id).modal('toggle');
			Meteor.call("editUser", userId, newUserEmail, oldEmail, role, name, phone, address, city, state, zipcode, country, skillLevel, balance, function(error) {
				if(error) {
					toastr.error("Failed to Update User... " + error);
				} else {
					toastr.success("Member Updated Successfully");
				}
			});
		} else {
			toastr.error("You can't leave any fields blank");
		}
		
	},
	'click button.reset-password': function() {
		
		Meteor.call('resetUserPassword', this._id, this.emails[0].address, function(error) {
			if(error) {
					toastr.error("Failed to Reset Password... " + error);
				} else {
					toastr.success("Password Reset Email Sent Successfully");
				}
		});
	}
});