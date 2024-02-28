$(document).ready(function(){
	
	var av = new AccountValidator();
	var sc = new SignupController();
	
	$('#account-form').ajaxForm({
		url: '/signup', // Endpoint to handle user signup on the server side
		method: 'POST', // Use POST method to send form data
		beforeSubmit : function(formData, jqForm, options){
			return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(xhr){
			if (xhr.responseJSON && xhr.responseJSON.error) {
				var errorMessage = xhr.responseJSON.error;
				if (errorMessage === 'email-taken'){
					av.showInvalidEmail();
				} else if (errorMessage === 'username-taken'){
					av.showInvalidUserName();
				}
			}
		}
	});
	$('#name-tf').focus();
	
	// Customize the account signup form //
	
	$('#account-form h2').text('Signup');
	$('#account-form #sub').text('Please tell us a little about yourself');
	$('#account-form-btn1').html('Cancel');
	$('#account-form-btn2').html('Submit');
	$('#account-form-btn2').addClass('btn-primary');
	
	// Setup the alert that displays when an account is successfully created //
	$('.modal-alert').modal({ show:false, keyboard : false, backdrop : 'static' });
	$('.modal-alert .modal-header h4').text('Account Created!');
	$('.modal-alert .modal-body p').html('Your account has been created.</br>Click OK to return to the login page.');
});
