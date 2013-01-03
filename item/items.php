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
<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/start/jquery-ui.css"type="text/css" rel="Stylesheet" />
<link rel="stylesheet" type="text/css" media="screen" href="css/myCSS.css">
<script type="text/javascript" src="js/items.js"></script>
<script type="text/javascript" src="../js/timepicker/js/timepicker.js"></script>
<script type="text/javascript" src="../js/rating/jquery.rating.js"></script>
<script type="text/javascript" src="../js/quickpager.jquery.js"></script>
<!--<script type="text/javascript" src='http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js'></script>-->
<link href="../js/rating/jquery.rating.css" type="text/css" rel="Stylesheet" />
<script type="text/javascript">
var type="<?php echo $_GET['type']; ?>";
$(document).ready(function(){
	if(type == "car") {
		$("#header-link-cars").addClass("current");
	} else {
		$("#header-link-homes").addClass("current");
	}
});
</script>
</head>
<body class="has-right-column">
	<script type="text/javascript">
	$(function() {
		$("#content-header-left-sqr").datepicker();
	});
	</script>

<div id="body" class="template-area">
<!--Settings-->
<?php include($_SESSION['abs_path'] . "/load_settings.php"); ?>
<?php include($_SESSION['abs_path'] . "/header.php"); ?>
  <div id="main">
    <div id="content">
      	<div id="content-header">
			<div id="content-header-left-sqr" class="content-header-left-sqr content-box">
			</div>
			<div id="content-header-data"  class="content-header-data content-box">
			</div>
		</div>
		<div id="content-data">
			<div id="content-sidebar-left" class="content-sidebar-left content-box">
				<div id="content-navigation">
					<ul class="category-small-list">
						<li>
							<h3>Filter By Feature</h3>
						</li>
						<li id="feature-small-all" class="feature-small on">
							<a href=""><div class="feature-label">All categories</div></a>
						</li>
						<li id="feature-small-1" class="feature-small ">
							<a href=""><div class="feature-label">Bed</div></a>
						</li>
						<li id="feature-small-2" class="feature-small ">
							<a href="/en/tampere/restaurants/european-food"><div class="feature-label">Shower</div></a>
						</li>
						<li id="feature-small-3" class="feature-small ">
							<a href="/en/tampere/restaurants/other-ethnic-food"><div class="feature-label">Internet</div></a>
						</li>
						<li id="feature-small-5" class="feature-small ">
							<a href="/en/tampere/restaurants/fine-dining"><div class="feature-label">Kitchen</div></a>
						</li>
						<li id="feature-small-6" class="feature-small ">
							<a href="/en/tampere/restaurants/cafes"><div class="feature-label">No Smoking</div></a>
						</li>
						<li id="feature-small-4" class="feature-small ">
							<a href="/en/tampere/restaurants/barpub-food"><div class="feature-label">TV</div></a>
						</li>
						<li id="feature-small-7" class="feature-small ">
							<a href="/en/tampere/restaurants/fast-food"><div class="feature-label">Telephone</div></a>
						</li>
					</ul>
					<ul class="category-small-list">
						<li>
							<h3>Filter By Category</h3>
						</li>
						<li id="category-small-all" class="category-small on">
							<a href=""><div class="category-label">All categories</div></a>
						</li>
						<li id="category-small-1" class="category-small ">
							<a href=""><div class="category-label">Category</div></a>
						</li>
						<li id="category-small-2" class="category-small ">
							<a href="/en/tampere/restaurants/european-food"><div class="category-label">European food</div></a>
						</li>
						<li id="category-small-3" class="category-small ">
							<a href="/en/tampere/restaurants/other-ethnic-food"><div class="category-label">Other ethnic food</div></a>
						</li>
						<li id="category-small-5" class="category-small ">
							<a href="/en/tampere/restaurants/fine-dining"><div class="category-label">Fine dining</div></a>
						</li>
						<li id="category-small-6" class="category-small ">
							<a href="/en/tampere/restaurants/cafes"><div class="category-label">Caf�s</div></a>
						</li>
						<li id="category-small-4" class="category-small ">
							<a href="/en/tampere/restaurants/barpub-food"><div class="category-label">Bar/pub food</div></a>
						</li>
						<li id="category-small-7" class="category-small ">
							<a href="/en/tampere/restaurants/fast-food"><div class="category-label"> Fast food/chains</div></a>
						</li>
					</ul>
				</div>
			</div>
			<div id="content-main" class="content-main has-right-column content-box">
				<div id="pager-container" class="pager-container"></div>
			</div>		
			<div id="right-panel"  class="content-box">
				<div id="content-navigation">
			</div>
			</div>
		</div>
    </div>
  </div>
  <?php include($_SESSION['abs_path'] . "/footer.php"); ?>
</div>
</body>
</html>