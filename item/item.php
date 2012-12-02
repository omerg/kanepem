<?php
// Setting the Content-Type header with charset
header('Content-Type: text/html; charset=utf-8');

session_start();
if(!session_is_registered("abs_path")){
	require_once("../path.php");
}
require_once($_SESSION['abs_path'] . "/includes/facebook.php");
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
<link rel="Stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/start/jquery-ui.css"/>
<link rel="Stylesheet" type="text/css" href="../js/rating/jquery.rating.css"/>
<link rel="stylesheet" type="text/css" media="screen" href="css/myCSS.css">
<script type="text/javascript" src="../js/timepicker/js/timepicker.js"></script>
<script src="http://static.ak.fbcdn.net/connect.php/js/FB.Share" type="text/javascript"></script>
<script type="text/javascript" src="../js/rating/jquery.rating.js"></script>
<script type="text/javascript" src="js/item.js"></script>
<script type="text/javascript">
var item_id=<?php echo $_GET['item']; ?>;
</script>
</head>
<body class="item-page">
<div id="body" class="template-area">
<!--Settings-->
<?php include($_SESSION['abs_path'] . "/load_settings.php"); ?>
<?php include($_SESSION['abs_path'] . "/header.php"); ?>
  <div id="main">
    <div id="content">
		<div id="queried_item_id" style="display:none"><?php echo $_GET["item"]; ?></div>
      	<div id="content-header">
			<div id="content-header-left-sqr" class="content-header-left-sqr content-box">
				<div id="content-header-map-snapshot">	
				</div>
			</div>
			<div id="content-header-data" class="content-box">
				<div id="description-info-header-actions-edit" class="info-header-actions editlink" style="display:none; float:right; margin:5px"></div>
				<div id="content-header-item-data">
					<div id="content-header-item-name"><span class="item-title">Item Name </span></div>
					<div id="content-header-item-features"><span class="item-title">Features </span></div>
				</div>
				<div id="description-data">
					<span class="item-title">Description: </span>
					<div id="item-description">
					</div>
				</div>
			</div>
		</div>
		<div id="content-data">
			<div id="content-sidebar" class="content-sidebar-left content-box">
				<div id="content-navigation">
					<div id="content-navigation">
						<a name="fb_share" type="button_count" href="http://www.facebook.com/sharer.php">Share</a>
						<!--<ul class="category-small-list">
							<li>
								<h3>Love It</h3>
							</li>
							<li id="loved-small" class="loved-small on">
								<a href=""><div class="loved-label">Love It</div></a>
							</li>
						</ul>-->
						<ul class="category-small-list">
							<li>
								<h3>Rate It</h3>
							</li>
							<li id="rate-small" class="rate-small">
								<div class="rate">
									Quality
									<div class="rate-stars">
										<form>
										<input name="star1" type="radio" class="star"/>
										<input name="star1" type="radio" class="star"/>
										<input name="star1" type="radio" class="star"/>
										<input name="star1" type="radio" class="star"/>
										<input name="star1" type="radio" class="star"/>
										</form>
									</div>
								</div>
							</li>
							<li id="rate-small" class="rate-small">
								<div class="rate">
									Price
									<div class="rate-stars">
										<form>
										<input name="star1" type="radio" class="star"/>
										<input name="star1" type="radio" class="star"/>
										<input name="star1" type="radio" class="star"/>
										<input name="star1" type="radio" class="star"/>
										<input name="star1" type="radio" class="star"/>
										</form>
									</div>
								</div>
							</li>
							<li id="rate-small" class="rate-small">
								<div class="rate">
									Hospitality
									<div class="rate-stars">
										<form>
										<input name="star1" type="radio" class="star"/>
										<input name="star1" type="radio" class="star"/>
										<input name="star1" type="radio" class="star"/>
										<input name="star1" type="radio" class="star"/>
										<input name="star1" type="radio" class="star"/>
										</form>
									</div>
								</div>
							</li>
						</ul>
						<ul class="category-small-list">
							<li>
								<h3>Apply For It</h3>
							</li>
							<li id="category-small-all" class="category-small on">
								<a href=""><div class="category-label">Apply</div></a>
							</li>
							<li id="category-small-1" class="category-small ">
								<a href=""><div class="category-label">Send Message</div></a>
							</li>
							<li id="category-small-2" class="category-small ">
						</ul>
						<div id="item-remove-link">
							<a href="">Report Item for Removal</a>
						</div>
					</div>
				</div>
			</div>
			<div id="content-main" class="content-main content-box">
				<div id="pagelet-userinfo">
					<div class="info-section">
						<div class="info-section-header">
							<div class="info-header-title">Features</div>
							<div class="info-header-actions">
								<div id="features-info-header-actions-edit" class="info-header-actions editlink" style="display:none">
								</div>
								<div id="features-info-header-actions-cancel" class="info-header-actions cancel-link" style="display:none">Cancel</div>
							</div>
						</div>
						<div class="info-section-content">
							<div id="info-section-1-message" class="message" style="display:none"></div>
							<small id="content-header-editlink"></small>
							<div id="profile">
								<div id="features-data">
									<span class="item-title">Type: </span><div id="item-type"></div>
									<div id="item-features"></div>
								</div>
							</div>
							<div id="edit-profile" style="display:none">
							</div>									
						</div>
					</div>
				</div>		
				<div id="pagelet-user-dates">
					<div class="info-section">
						<div class="info-section-header">
							<div class="info-header-title">Dates</div>
							<div class="info-header-actions">
								<div id="dates-info-header-actions-edit" class="info-header-actions editlink">
								</div>
							</div>
						</div>
						<div class="info-section-content">
							<div id="info-section-2-message" class="message" style="display:none"></div>
							<div id="item-data">
								<span class="item-title">Start Date: </span><div id="start-date"></div>
								<span class="item-title">End Date: </span><div id="end-date"></div>
							</div>
						</div>
					</div>
				</div>
				<div id="options-section">
					<div id="options-section-item-actions">
						<div id="item-actions-edit-privacy" class="info-header-actions editlink">
							<a href="" class="iframe">Edit Privacy</a>
						</div>
						<div id="item-actions-delete" class="info-header-actions removelink">
							<a href="">Delete Item</a>
						</div>
						<div id="item-actions-report" class="info-header-actions removelink">
							<a href="">Report For Removal</a>
						</div>
					</div>
				</div>
				<div id="content-scrollable">
					<div id="content-element">
						<div id="item-users">
						</div>
					</div>
<!--					<div id="content-element">
						<div id="item-wall">
							Wall Posts goes here
						</div>
					</div>-->
					<div id="content-element">
						<!--<div id="item-comment">
							<form id="comment-form" action="#">		
								<p>				
								<label>Name</label>
								<input type="text" size="30" value="Your Name" name="dname">
								<label>Email</label>
								<input type="text" size="30" value="Your Email" name="demail">
								<label>Your Comments</label>
								<textarea cols="5" rows="5"></textarea>
								<br>	
								<input type="submit" class="button">	
								</p>			
							</form>
						</div>-->
						<fb:comments xid="<?php echo $_GET['item']; ?>"></fb:comments>
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