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
$(document).ready(function(){
				$("#header-link-community").addClass("current");
			}
);
</script>
</head>
<body>
<div id="body" class="template-area">
<!--Settings-->
<?php include($_SESSION['abs_path'] . "/load_settings.php"); ?>
<?php include($_SESSION['abs_path'] . "/header.php"); ?>
  <div id="main">
    <div id="content">
		<iframe class="content-iframe" src ="phpBB3/" width="100%">
		</iframe>
    </div>
  </div>
  <?php include($_SESSION['abs_path'] . "/footer.php"); ?>
</div>
</body>
</html>
