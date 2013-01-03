<html>
<body>
<div id="fb-root"></div>
<?php
// Setting the Content-Type header with charset
header('Content-Type: text/html; charset=utf-8');
session_start();
session_destroy();

require_once("../../includes/facebook.php");

// unset kanepem cookie
$expire=time()-60*60*24*30;
setcookie ("kanepem", "", $expire, "/");
unset($_COOKIE['kanepem']);

//expire facebook session
//setcookie ("fbs_" . FACEBOOK_APP_ID, "", $expire, "/");
//unset($_COOKIE["fbs_" . FACEBOOK_APP_ID]);
?>
<script src="http://connect.facebook.net/en_US/all.js"></script>
<script>
FB.init({appId: '<?= FACEBOOK_APP_ID ?>', status: true,
		   cookie: true, xfbml: true},"../includes/xd_receiver.htm");
FB.logout();
</script>

<?php
header("location:../../index.php");
?>
</body>
</html>