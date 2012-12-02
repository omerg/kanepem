$(document).ready(function() {
	$("#form").validationEngine({
		promptPosition: "topLeft",
		success:function(){
				$("#form-progress").show();
				$("#button-text").hide();
				$("#button-text-loading").show();
				var name = $("input#name").val();
				var email = $("input#email").val();
				var password = $("input#password").val();
				var dataString = 'name='+ name + '&email=' + email + '&password=' + password;
				$.post("signup.php",
						dataString,
						function(data){
						$('#form').html("<div id='message' style='display:none'></div>");
							if(data.success){							  
								$('#message').html("<h2>Contact Form Submitted!</h2>")  
								.append("<p>Please check your mailbox for your activation key</p>");
								$('#message').append("<img id='checkmark' src='css/img/check.png' />");
								$('#message').append("<button onClick='javascript:parent.$.fancybox.close();'>Close</button>");
								$('#message').fadeIn(1500);
							}else{
								$('#message').html('<span>' + data.errormessage + '</span>');
								$('#message').fadeIn(1500);
							}
						},
						"json");
				return false
		}
	})
})