<div id="footer" class="content-box">
<?php include($_SESSION['abs_path'] . "/includes/analytics/analytics.php"); ?>
<div id="fb-root"></div>
<script>
  FB.init({appId: '<?= FACEBOOK_APP_ID ?>', status: true,
		   cookie: true, xfbml: true},"../includes/xd_receiver.htm");
  FB.Event.subscribe('auth.login', function(response) {
  	var A=main.social.login;
	A.data.facebook = 1;
	A.data.fb_uid = FB.getSession().uid;
	A.data.fb_access_token = FB.getSession().access_token;
	A.doLogin();
	header.userbar.dom.facebookLogin.hide();
});

<?php 
if(session_is_registered("myusername")){
	echo "mySettings.personalState = 'loggedin';";
	echo "mySettings.username = '" . $_SESSION['myusername'] . "';";
} else if (isset($_COOKIE['kanepem'])){
	if (checkRemembered($_COOKIE['kanepem']) == "true"){
		setSession($_COOKIE['kanepem']);
		echo 'mySettings.personalState = "loggedin";';
		echo 'mySettings.username = "' . $_SESSION["myusername"] . '";';
	} else {
		echo "mySettings.personalState = 'unlogged';";
		echo "mySettings.username = null;";
	}
} else if ($cookie == "1"){
	echo "mySettings.personalState = 'loggedin';";
	echo 'mySettings.username = fb_getUsername($cookie["uid"]);';
} else {
	echo "mySettings.personalState = 'unlogged';";
	echo "mySettings.username = null;";
}
?>

</script>