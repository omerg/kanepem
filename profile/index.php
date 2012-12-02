<?php
session_start();
if(!session_is_registered("abs_path")){
	require_once("../path.php");
}
require_once($_SESSION['abs_path'] . "/includes/facebook.php");
require_once($_SESSION['abs_path'] . "/includes/functions.php");

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
<script type="text/javascript" src="../js/jquery.form.js"></script>
<script type="text/javascript" src="js/view_profile.js" ></script>
<script type="text/javascript" src="js/profile.js" ></script>
<script type="text/javascript">
$.fn.corner.defaults.useNative = false;

$(document).ready(function(){

	$("#header-link-profile").addClass("current");
	$(".img-container").corner("15px").parent();
	$("#tabs").tabs({ fxFade: true, fxSpeed: 'fast' });

});
<?php 
if($_GET["user"] == $_SESSION["myusername"]){
	echo "main.viewProfile.profile.data.self = true";
} 
?>
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
			<div id="content-header-left-sqr" class="content-header-left-sqr content-box">
				<div class="img-container"><img id="user-image" height="140px" width="180px" src=""></div>
				<div id="content-header-username"></div>
				<div id="content-header-user-actions">
					<div id="sidebar-follow-buttons" style="">
						<div id="sidebar-follow-progress" style="display:none">Saving...</div>
						<div class="button-follow follow-add sidebar-button" id="follow-<?php echo $_GET["user"]; ?>">
							<img src="images/follow.png" />
						</div>
						<div class="button-follow follow-remove sidebar-button" id="follow-<?php echo $_GET["user"]; ?>">
							<img src="images/unfollow.png" />      
						</div>
						<div class="sidebar-button"><a href="../message/index.php?message_to=<?php echo $_GET["user"]; ?>"><img src="images/send_message.png" /></a></div>
					</div>
				</div>
			</div>
			<div id="content-header-data" class="content-box">
				<div id="tabs">
				<div class="info-section-header">
					<div class="horizontal">
						<ul>
							<li><a href="#fragment-1"><div id="title-1" class="info-header-title">kisisel bilgiler</div></a></li>
							<li><a href="#fragment-2"><div id="title-2" class="info-header-title">adresler</div></a></li>
							<li><a href="#fragment-3"><div id="title-3" class="info-header-title">paylasimlar</div></a></li>
							<li><a href="#fragment-4"><div id="title-4" class="info-header-title">istekler</div></a></li>
							<li><a href="#fragment-5"><div id="title-5" class="info-header-title">tabelalar</div></a></li>
						</ul>
					</div>
					<div id="fragment-1">
						<div id="pagelet-userinfo">
					<div class="info-section">
						<div class="info-section-header">
							<div class="info-header-actions">
								<div id="profile-info-header-actions-edit" class="info-header-actions editlink" style="display:none">
								</div>
								<div id="profile-info-header-actions-cancel" class="info-header-actions cancel-link" style="display:none">Cancel</div>
							</div>
						</div>
						<div class="info-section-content">
							<div id="info-section-1-message" class="message" style="display:none"></div>
							<small id="content-header-editlink" style="display:none"></small>
							<div id="profile">
								<div id="profile-data" style="display:none">
									<label>isim: </label><div id="content-header-name" class="data"></div>
									<label>cinsiyet: </label><div class="data">Erkek</div>
									<label>dogum tarihi: </label><div class="data">20-04-1986k</div>
									<label>sehir: </label><div class="data">Istanbul</div>
									<label>okul/meslek: </label><div class="data">Bilgisayar Muhendisi</div>
									<label>web sayfasi: </label><div class="data" style="color:#B0FE46">www.omeryus.com</div>
									<label>sevdikleri: </label><div class="data">seyahat etmek, bira</div>
									<label>kullanma amaci: </label><div class="data">ev paylasimi</div>
								</div>
							</div>
							<div id="edit-profile" style="display:none">
								<form id="edit-form" class="content-form" action="actions/edit_profile.php" method="post" enctype="multipart/form-data">
								<div>
									<div class="form-entry form-text">
										<div id="edit-form-username">
										  <div class="form-label"> Name: </div>
										  <div class="form-input">
											<input type="text" value="" id="name" name="name">
										  </div>
										</div>
									</div>
									<div class="form-entry form-text">
										<div id="edit-form-username">
										  <div class="form-label"> Surname: </div>
										  <div class="form-input">
											<input type="text" value="" id="surname" name="surname">
										  </div>
										</div>
									</div>
									<div class="form-entry form-textarea">
										<div id="edit-form-description">
										  <div class="form-label"> Description: </div>
										  <div class="form-input">
											<textarea id="description" name="description" ></textarea>
										  </div>
										</div>
									</div>
									<div class="form-entry form-file">
										<div id="edit-form-photo">
										  <div class="form-label"> Photo: </div>
										  <div class="form-input">
											<input name="MAX_FILE_SIZE" value="102400" type="hidden">
											<input id="upload" name="upload" type="file">
										  </div>
										</div>
									</div>
									<div id="edit-form-submit">
									  <div class="form-input">
										<input type="submit" value="Submit" name="submit-form">
									  </div>
									  <div id="login-progress" style="display:none">Saving...</div>
									</div>
								  </div>
								</form>
							</div>
							<div class="share-buttons">
								<span class="st_facebook_large"></span>
								<span class="st_twitter_large"></span>
								<span class="st_myspace_large"></span>
								<span class="st_email_large" ></span>
								
								<script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
								<script type="text/javascript">
										stLight.options({
												publisher:'12345'
										});
								</script>
							</div>								
						</div>
					</div>
				</div>
					</div>
					<div id="fragment-2">
						<div id="pagelet-user-address">
							<div class="info-section">
								<div class="info-section-header">
									<div class="info-header-actions">
										<div id="address-info-header-actions-edit" class="info-header-actions editlink">
										</div>
									</div>
								</div>
								<div class="info-section-content">
									<div id="info-section-2-message" class="message" style="display:none"></div>
									<div id="info-section-2-pager-container" class="pager-container"></div>
								</div>
							</div>
						</div>
					</div>
					<div id="fragment-3">
						<div id="pagelet-user-shares">
							<div class="info-section">
								<div class="info-section-header">
									<div class="info-header-actions">
										<div id="shares-info-header-actions-edit" class="info-header-actions editlink">
										</div>
									</div>
								</div>
								<div class="info-section-content">
									<div id="info-section-3-message" class="message" style="display:none"></div>
									<div id="info-section-3-pager-container" class="pager-container"></div>
								</div>
							</div>
						</div>
					</div>
					<div id="fragment-4">
						<div id="pagelet-user-homes">
							<div class="info-section">
								<div class="info-section-header">
									<div class="info-header-actions">
										<div id="cars-info-header-actions-edit" class="info-header-actions editlink">
										</div>
									</div>
								</div>
								<div class="info-section-content">
									<div id="info-section-4-message" class="message" style="display:none"></div>
									<div id="info-section-4-pager-container" class="pager-container"></div>
								</div>
							</div>
						</div>
					</div>
					<div id="fragment-5">
						<div id="pagelet-user-homes">
							<div class="info-section">
								<div class="info-section-header">
									<div class="info-header-actions">
										<div id="links-info-header-actions-edit" class="info-header-actions editlink">
										</div>
									</div>
								</div>
								<div class="info-section-content">
									<div id="info-section-5-message" class="message" style="display:none"></div>
									<div id="info-section-5-pager-container" class="pager-container"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="content-data">
			<div id="content-sidebar" class="content-sidebar-left content-box">
				<div class="social loggedin" id="sidebar-follow">
					<div class="sidebar-header">
					</div>
					<div class="sidebar-tabs">
						<ul>
							<li id="sidebar-tabs-followers" class="on">takip edenler</li>
							<li id="sidebar-tabs-following">takip ettikleri</li>
						</ul>
        			</div>
					<div class="sidebar-content">
						<div class="userlist" id="sidebar-follow-userlist">
							<div id="sidebar-follow-userlist-data">
								<div class="userlist-header"></div>
								
								<div class="userlist-footer"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="content-main" class="content-main content-box">
			</div>
		</div>
	</div>
	</div>
	  <?php include($_SESSION['abs_path'] . "/footer.php"); ?>
  </div>
</div>
</body>
</html>