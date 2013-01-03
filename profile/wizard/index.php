<?php
// Setting the Content-Type header with charset
header('Content-Type: text/html; charset=utf-8');
session_start();
if(!session_is_registered("abs_path")){
	require_once("../../path.php");
}
require_once($_SESSION['abs_path'] . "/includes/functions.php");
require_once($_SESSION['abs_path'] . "/includes/facebook.php");
//item type
$mode = $_GET['type'];
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
<link rel="stylesheet" type="text/css" media="screen" href="../../css/globalCSS.css"/>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" ></script>
<!--<script type="text/javascript" src='http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js'></script>-->
<script src="http://connect.facebook.net/en_US/all.js"></script>
<!--Include Local JavaScript & CSS -->
<link rel="stylesheet" type="text/css" media="screen" href="../../css/validationEngine.jquery.css" charset="utf-8" />
<link rel="stylesheet" type="text/css" media="screen" href="css/myCSS.css">
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js" type="text/javascript"></script>
</head>
<body class="template-iframe">
<?php
//Settings
include($_SESSION['abs_path'] . "/load_settings.php");
?>
	<div id="frame body">
		<div id="frame-content">
			<form id="form">
			<div id="content-title"><h2>Profile Type</h2></div>
			<div id="form-content">
				<div id="add-item-content-step-1" class="content-form"  style="display:block">
					<div id="content-message">
						<div class="form-label">
							Select profile type
						</div>
					</div>
					<div id="profile-types-box">
						<a href="house/">
							<div id="profile-type-container">
								<div id="profile-type-img">Image Here</div>
								<div id="profile-type-text">Home Sharing</div>
							</div>
						</a>
						<a href="">
							<div id="profile-type-container">
								<div id="profile-type-img">Image Here</div>
								<div id="profile-type-text">Car Sharing</div>
							</div>
						</a>
					</div>
				</div>
			</div>			
			<div id="form-actions">
				<div id="form-actions-entries">
					<div class="form-actions-entry form-entry form-submit">
					</div>
				</div>
			</div>
			</form>
		</div>
	</div>
<?php include($_SESSION['abs_path'] . "/includes/analytics/analytics.php"); ?>
</body>
</html>