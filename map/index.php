<?php 
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
<link rel="stylesheet" type="text/css" media="screen" href="css/myCSS.css"/>
<link rel="stylesheet" type="text/css" href="../js/jcarousel/lib/jquery.jcarousel.css"/>
<link rel="stylesheet" type="text/css" href="../js/jcarousel/skins/tango/skin.css"/>
<script type="text/javascript" src="js/main-1.0.0.js"></script>
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?v=2&key=AIzaSyDnKvm0utXHeIGflYObKlRVpzJvBJ6BWdE&sensor=false"></script>
<script type="text/javascript" src="../js/jcarousel/lib/jquery.jcarousel.pack.js"></script>
<script type="text/javascript">
      function initialize() {
        var myOptions = {
          center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);
      }
</script>
<script type="text/javascript">
$(document).ready(function(){
				$("#header-link-map").addClass("current");
			}
);
</script>
<?php
//Settings
include($_SESSION['abs_path'] . "/load_settings.php");
?>
</head>
<body onload="initialize()">
<div id="body" class="template-area">
<?php include($_SESSION['abs_path'] . "/header.php"); ?>
  <div id="main">
    <div id="content">
	  	<div id="actions-header">
		  <div class="body">
			<div class="personal-data" id="actions-header-data">
				<ul>
					<li class="content-box"><a id="actions-add-car" class="iframe" href=""><div class="action-img"><img src="../images/car_mini.png"></div>araba paylas</a></li>
					<li class="content-box"><a id="actions-add-home" class="iframe" href=""><div class="action-img"><img src="../images/home_mini.png"></div>ev paylas</a></li>
					<li class="content-box"><a id="actions-req-car" class="iframe" href=""><div class="action-img"><img src="../images/hitchhike_mini.png"></div>araba talep et</a></li>
					<li class="content-box"><a id="actions-req-home" class="iframe" href=""><div class="action-img"><img src="../images/baggage_mini.png"></div>ev talep et</a></li>				
				</ul>
			</div>
		  </div>
		</div>
		<div id="right-panel" class="content-box">
			  <div id="top-list">
				<h3>haritadakiler</h3>
				<div id="top-list-data" class="data">
				  <div class="entry ending"></div>
				</div>
				<!--<div id="top-list-controls" style="display:block"></div>-->
			  </div>
			</div>			
		<div id="content-area">
		<!--<div id="filter-bar">
			  <div class="filters">
				<div id="" class="filter">
				  <div class="filter-end left"></div>
				  <h3>
					<div class="headline-end left"></div>
					<div class="headline-body">Save Settings</div>
					<div class="headline-end right"></div>
				  </h3>
				  <div class="data"></div>
				</div>
				<div id="" class="filter">
				  <div class="filter-end left"></div>
				  <h3>
					<div class="headline-end left"></div>
					<div class="headline-body">Car Type</div>
					<div class="headline-end right"></div>
				  </h3>
				  <div class="data"></div>
				</div>
				<div id="" class="filter">
				  <div class="filter-end left"></div>
				  <h3>
					<div class="headline-end left"></div>
					<div class="headline-body">Min. Rating</div>
					<div class="headline-end right"></div>
				  </h3>
				  <div class="data"></div>
				</div>
				<div id="" class="filter">
				  <div class="filter-end left"></div>
				  <h3>
					<div class="headline-end left"></div>
					<div class="headline-body">Max. Price</div>
					<div class="headline-end right"></div>
				  </h3>
				  <div class="data"></div>
				</div>
				<div id="" class="filter">
				  <div class="filter-end left"></div>
				  <h3>
					<div class="headline-end left"></div>
					<div class="headline-body">Date & Time</div>
					<div class="headline-end right"></div>
				  </h3>
				  <div class="data"></div>
				</div>
			  </div>
			</div>-->
			<div id="area" class="content-box">
			  <div id="location">
				<div id="location-navi">
				  <ul>
					<li id='location-navi-city' class="">sehir degistir</li>
					<li id="location-navi-address" class="">adres gir</li>
					<li id="location-navi-current" style="display:none;" class="">yerimi bul</li>
				  </ul>
				</div>
				<div id="location-city" style="display:none;">
				  <div class="location-close"></div>
				  <div class="data">
					<div id="biggest-cities" class="section">
					  <h3>sehirler</h3>
					  <div class="section-data">
						<ul>
						  <li id="istanbul" class=""><a href="">Istanbul</a> </li>
						  <li id="bursa" class=""><a href="">Bursa</a> </li>
						  <li id="ankara" class=""><a href="">Ankara</a> </li>
						</ul>
					  </div>
					</div>
				  </div>
				</div>
				<div id="location-address" style="display:none;">
				  <div class="location-close"></div>
				  <div class="data">
					<div class="help">Adresi Haritada Göster: </div>
					<form id="address-form">
					  <div class="form-text">
						<input id="address-input" class="dimmed" type="text" name="address">
					  </div>
					  <div class="form-submit">
						<input id="address-submit" value="Search" type="button">
					  </div>
					</form>
				  </div>
				</div>
			  </div>
			  <div id="map-controls" style="display: block;">
				<div id="map-controls-left">
				  <!-- -->
				</div>
				<div id="map-controls-right">
				  <!-- -->
				</div>
				<div id="map-controls-up">
				  <!-- -->
				</div>
				<div id="map-controls-down">
				  <!-- -->
				</div>
				<div id="map-controls-zoom-in">
				  <!-- -->
				</div>
				<div id="map-controls-zoom-out">
				  <!-- -->
				</div>
			  </div>
			  <div id="gmap-container">
				<div id="map_canvas" style="width:100%; height:100%"></div>
			  </div>
			</div>
			<div id="news" class="content-box">
				<div class="header">
					<h3>NEWS</h3>
				</div>
				<div class="personal-progress" id="news-progress">Loading...</div>
				<div id="news-data"></div>
			</div>
	   		<div id="social" class="content-box">
			  <div id="personal" class="unlogged">
				<div id="actions" class="actions-box">
				  <div class="header">
					<h3>Islemler</h3>
				  </div>
				  <div class="body">
					<div class="personal-data" id="actions-data">
					<ul>
						<li><a id="actions-data-add-car" class="iframe" href=""><img src="../images/car_mini.png">araba paylas</a></li>
						<li><a id="actions-data-add-home" class="iframe" href=""><img src="../images/home_mini.png">ev paylas</a></li>
						<li><a id="actions-data-req-car" class="iframe" href=""><img src="../images/hitchhike_mini.png">araba talep et</a></li>
						<li><a id="actions-data-req-home" class="iframe" href=""><img src="../images/baggage_mini.png">ev talep et</a></li>
						<br />
						<li><a id="actions-data-add-link" class="iframe" href=""><img src="../images/label_mini.png">tabela ekle</a></li>				
					</ul>
					</div>
					<div class="personal-footer" id="actions-footer">
					  <div class="personal-progress" id="actions-progress">Loading...</div>
					</div>
				  </div>
				</div>
				<!--<div id="actions" class="actions-box">
				  <div class="header">
					<h3>Ek Islemler</h3>
				  </div>
				  <div class="body">
					<div class="personal-data" id="actions-data">
					<a id="" class="iframe" href=""><img src="../images/baggage_mini.png">ek islem tanimla</a>
					</div>
					<div class="personal-footer" id="actions-footer">
					  <div class="personal-progress" id="actions-progress">Loading...</div>
					</div>
				  </div>
				</div>-->
				<div id="following" class="actions-box">
				  <div class="header">
					<h3>Arkadaslar</h3>
				  </div>
				  <div class="body">
					<div class="personal-data" id="following-data">
						<div id="following-carousel" class=" jcarousel-skin-tango">
						  <div class="jcarousel-container">
							<div disabled="disabled" class="jcarousel-prev jcarousel-prev-disabled"></div>
							<div class="jcarousel-next"></div>
							<div class="jcarousel-clip">
							  <ul class="jcarousel-list">
								<li>
								</li>				
							  </ul>
							</div>
						  </div>
						</div>
					</div>
					<div class="personal-footer" id="following-footer">
					  <div class="personal-progress" id="following-progress">Loading...</div>
					</div>
				  </div>
				</div>
				<div id="login" class="social">
				  <div class="start"></div>
				  <div class="body"> <a class="iframe" id="signup-button" href="../user/signup/">
					<div class="button-signup-start"></div>
					<div class="button-signup-body">
					  <div class="button-signup-data">Register as a user</div>
					</div>
					<div class="button-signup-end"></div>
					</a>
					<h3>Log in</h3>
					<div class="data">
					  <div id="login-form" class="content-form">
						<form action="" method="post">
						  <div class="form-entries">
							<div id="login-form-username" class="form-entry form-text">
							  <div class="form-label"> Username: </div>
							  <div class="form-input">
								<input tabindex="1" type="text" value="" id="username" name="username">
							  </div>
							  <div class="form-help">
								<input tabindex="3" type="checkbox" value="1" id="remember" name="remember">
								<label for="remember">Remember me</label>
							  </div>
							</div>
							<div id="login-form-password" class="form-entry">
							  <div class="form-label form-password"> Password: </div>
							  <div class="form-input form-text">
								<input tabindex="2" type="password" value="" id="password" name="password">
							  </div>
							  <div class="form-help"><a href="" target="_parent">Forgot your password?</a></div>
							</div>
							<br clear="both">
							<div id="login-form-submit" class="form-entry form-submit">
							  <div class="form-input">
								<input tabindex="4" type="submit" value="Log In" name="commit">
							  </div>
							  <div id="login-progress">Logging in...</div>
							</div>
						  </div>
						</form>
					  </div>
					</div>
				  </div>
				  <div class="end"></div>
				</div>
			  </div>
			</div>
		<!--<div style="display: block;" class="map-note" id="welcome-note">
	<div class="data">
		<h3>Welcome to Kanepem.org!</h3>

		<p>
</p><p>Find people who are either sharing or requesting accomodation or transport:</p>

		
		<div class="legend">
            <ul>
              <li class="legend_add_home">Home Shared</li>
              <li class="legend_req_home">Home Needed</li>
              <li class="legend_add_car">Car Shared</li>
              <li class="legend_req_car">Hitch-Hiker</li>
              <li class="legend_unknown">Unknown status</li>
            </ul>
		</div>
		
		<p>
</p><p>To find out more, please take a <a href="javascript:core.frame.open("");">tour</a>.</p>

	</div>
	
	<div class="close-link">
        <a href="javascript:main.notes.close('welcome-note');">Close this</a>
	</div>
</div>-->
      </div>
    </div>
  </div>
<?php include($_SESSION['abs_path'] . "/footer.php"); ?>
</div>
</body>
</html>
