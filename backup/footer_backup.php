<div id="footer">
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

var session_is_registered = "<?php if (session_is_registered("myusername")) { echo "1"; } else { echo "0";} ?>";
var isset_kanepem_cookie = "<?php if(isset($_COOKIE['kanepem'])){ echo "1"; } else { echo "0"; } ?>";
var isset_fb_cookie = "<?php if ($cookie) {echo "1";} else { echo "0";} ?>";

if(session_is_registered == "1"){
	mySettings.personalState = 'loggedin';
	mySettings.username = "<?php echo $_SESSION['myusername']; ?>";
	alert("if");
} else if ( isset_kanepem_cookie == "1") {
	if ("<?php 	echo checkRemembered($_COOKIE['kanepem']); ?>" == "true"){
		<?php setSession($_COOKIE['kanepem']); ?>
	alert("elseif_1");
		mySettings.personalState = "loggedin";
		mySettings.username = "<?php echo $_SESSION['myusername']; ?>";
	} else {
		mySettings.personalState = 'unlogged';
		mySettings.username = null;
	}
} else if ( isset_fb_cookie == "1"){
		alert("elseif_2");
	mySettings.personalState = 'loggedin';
	mySettings.username = "<?php echo fb_getUsername($cookie['uid']); ?>";
} else {
	alert("else_3");
	mySettings.personalState = 'unlogged';
	mySettings.username = null;
}
</script>