<?php
// Setting the Content-Type header with charset
header('Content-Type: text/html; charset=utf-8');
session_start();
if(!session_is_registered("abs_path")){
	require_once("../path.php");
}
require_once($_SESSION['abs_path'] . "/includes/facebook.php");		
$cookie = get_facebook_cookie(FACEBOOK_APP_ID, FACEBOOK_SECRET);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html 	xmlns="http://www.w3.org/1999/xhtml" 
		xmlns:fb="http://www.facebook.com/2008/fbml"
		xml:lang="en" lang="en"> 
<head> 
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/> 
<meta name="title" content="Kanepe"/>
<meta name="description" content="A Google Maps-based university network connecting users with members of local communities, who offer either accommodation or ride-sharing or want to meet new people."/>
<link rel="image_src" href="../images/logo.png"/>
<title>Kanepem</title>
<!--Include Global JavaScript & CSS -->
<?php include($_SESSION['abs_path'] . "/head_js.php"); ?>
<!--Include Local JavaScript & CSS -->
<link rel="stylesheet" type="text/css" media="screen" href="css/myCSS.css">
<link rel="stylesheet" href="../css/validationEngine.jquery.css" type="text/css" media="screen" charset="utf-8" />
<script src="../js/jquery.validationEngine-en.js" type="text/javascript"></script>
<script src="../js/jquery.validationEngine.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function() {

var type="<?php echo $_GET['type']; ?>";

if(type == "verify_success"){
	$("#message").html("Congratulations! You are now the proud new owner of a uniWorks.com account. You can now log in with your username and password.");
} else {
	$("#message").html(" Log in with your username and password. If you don't have an account yet, you can sign up <a id='signup-button' class='iframe' href='signup'>here.</a>");
}

$("a#signup-button").fancybox({
	'autoDimensions'	: false,
	'width'         		:435,
	'height'        		:280
});

$("#form").validationEngine({
	promptPosition: "topLeft",
	success:function(){
		var username = $("#login-form input[name=username]").val();
		var password = $("#login-form input[name=password]").val();
		var remember = $("#login-form input[name=remember]").attr("checked")?1:0;
		var dataString = 'username='+ username + '&password=' + password + '&remember=' + remember;
		$.post(
			"actions/login.php",
			dataString,
			function(data){
				if(data.success){
					window.location = "../map";		
				} else {
					$("#message").html("Incorrect Authorization Data.");
				}
			},
			"json");
			return false;
	},
	unbindEngine:false
	})
})
</script>
</head>
<body>
<div id="body" class="template-area">
<!--Settings-->
<?php include($_SESSION['abs_path'] . "/load_settings.php"); ?>
<?php include($_SESSION['abs_path'] . "/header.php"); ?>
  <div id="main">
    <div id="content">
      <div id="content-area">
	  	<div id="content-main">
  <form id="form" action="" method="post">
    <div id="content-title">
      <h2>Log in</h2>
    </div>
    <div id="form-content">
      <div id="login-form" class="content-form">
        <div id="message" class="form-helptext"></div>
        <div class="form-entries">
          <div class="form-entry form-text">
            <div class="form-label"> Username: </div>
            <div class="form-input">
              <input class="validate[required]" type="text" value="" id="username" name="username">
            </div>
          </div>
          <div class="form-entry">
            <div class="form-label form-password"> Password: </div>
            <div class="form-input form-text">
              <input class="validate[required]" type="password" value="" id="password" name="password">
            </div>
            <div class="form-help"><a href="/en/user/request_password" target="_parent">Forgot your password?</a></div>
          </div>
          <div class="form-entry form-checkbox">
            <div class="form-input">
              <input type="checkbox" value="1" id="remember" name="remember">
              <label for="remember">Remember me</label>
            </div>
          </div>
          <div class="form-entry form-submit">
            <div class="form-input">
              <input type="submit" value="Submit" name="commit">
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
      </div>
    </div>
  </div>
  <?php include($_SESSION['abs_path'] . "/footer.php"); ?>
</div>
</body>
</html>
