<?php
// Setting the Content-Type header with charset
header('Content-Type: text/html; charset=utf-8');
session_start();
if(!session_is_registered("abs_path")){
	require_once("../path.php");
}
require_once($_SESSION['abs_path'] . "/includes/functions.php");
require_once($_SESSION['abs_path'] . "/includes/facebook.php");
//message to
$message_to = $_GET['message_to'];
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
<script type="text/javascript" src="../js/quickpager.jquery.js"></script>
<script type="text/javascript" src="js/messaging.js"></script>
<script type="text/javascript">
$(document).ready(function(){
				$("#header-link-inbox").addClass("current");
			}
);
</script>
</head>
<body>
<!--Settings-->
<?php include($_SESSION['abs_path'] . "/load_settings.php"); ?>
<div id="body" class="template-area">
  <?php include($_SESSION['abs_path'] . "/header.php"); ?>
  <div id="main">
  	<div id ="content">
	<div id="queried_username" style="display:none"><?php echo $_GET["user"]; ?></div>
		<div id="content-header">
			<div id="content-header-data">
				<div id="content-header-data-view" style="display:none">
					<label>To: </label><div id="view-to"></div>					
					<label>Subject: </label><div id="view-from"></div>
					<label>Message: </label><div id="view-message"></div>
				</div>
				<div id="content-header-data-message" style="display:none"></div>
			  <small id="content-header-editlink" style="display:none"></small>
			</div>
		</div>
		<div id="content-data">
			<div id="content-sidebar-left" class="content-sidebar-left">
				<div id="content-sidebar-controls"  class="content-box">
				<div id="controls-compose" class="button">
					<div class="button-start"></div>
					<div class="button-body">
						<div class="button-data">Compose</div>
					</div>
					<div class="button-end"></div>        
              	</div>
				<div id="controls-inbox" class="button">
					<div class="button-start"></div>
					<div class="button-body">
						<div class="button-data">Inbox</div>
					</div>
					<div class="button-end"></div>        
              	</div>
				<div id="controls-sent" class="button">
					<div class="button-start"></div>
					<div class="button-body">
						<div class="button-data">Sent</div>
					</div>
					<div class="button-end"></div>        
              	</div>
			</div>
			</div>
			<div id="content-main"  class="content-main content-box">
				<div id="content-data-inbox" style="display:none">
					<div id="content-data-inbox-controller">
						<input type="button" disabled="disabled" id="pager-controller-mark-as-read" class="pager-controller-button" value="Mark As Read">
						<input type="button" disabled="disabled" id="pager-controller-report-spam" class="pager-controller-button" value="Report Spam">
						<input type="button" disabled="disabled" id="pager-controller-delete" class="pager-controller-button" value="Delete">
					</div>
					<div id="pager-container" class="pager-container"></div>
				</div>
				<div id="content-data-compose">
					<div class="composer-container" id="stylized">
						<form id="message-form">
						<label>To: </label>
						<input id="form-to" class="suggestion-form" autocomplete="off" onkeyup="lookup(this.value);" value="<?php echo $message_to; ?>">
						<div id="suggestions" class="suggestionsBox" style="display: none;">
      						<img src="../images/upArrow.png" style="position: relative; top: -12px; left: 30px" alt="upArrow" />
							<div id="autoSuggestionsList" class="suggestionList">							</div>
						</div>
						<label>Subject: </label>
						<input id="form-subject">
						<label>Message: </label>
						<textarea id="form-message"></textarea>
						<button id="submit">Submit</button>
						</form>
			 		</div>
				</div>
			</div>
		</div>
	</div>
	</div>
  <?php include($_SESSION['abs_path'] . "/footer.php"); ?>
</div>
</body>
</html>