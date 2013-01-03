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
	<script type="text/javascript" src="../../js/global-1.0.0.js"></script>
	<!--<script type="text/javascript" src='http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js'></script>-->
	<script type="text/javascript" src="../../js/json2.js"></script>
	<script src="http://connect.facebook.net/en_US/all.js"></script>
	<!--Include Local JavaScript & CSS -->
	<link rel="stylesheet" type="text/css" media="screen" href="../../css/validationEngine.jquery.css" charset="utf-8" />
	<link rel="stylesheet" type="text/css" media="screen" href="css/myCSS.css">
	<link rel="stylesheet" type="text/css" media="screen" href="css/gmap_draw.css">
	<link rel="stylesheet" type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/themes/start/jquery-ui.css"/>
	<link rel="stylesheet" type="text/css" media="screen" href="../../css/validationEngine.jquery.css" charset="utf-8" />
	<!--<script  type="text/javascript"src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;
										key=ABQIAAAA8pY0-3FHi2dH0T1g8nY0xRSiS-y1gTPU5sbcoPnM8EyPYhJoMBSjS6szNmSSayTpA4McbCpn66Rh8g">-->
	<script  type="text/javascript"src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;									
										key=ABQIAAAAwEFyRBKZwB9uU_EathJDbBQLtchEANYBCXlhrRLyiggMLkC4cRQgzFqiVpwwfuSBchMKMPTL1s7QXw">
	<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="../../js/jquery.validationEngine-en.js"></script>
	<script type="text/javascript" src="../../js/jquery.validationEngine.js"></script>
	<script type="text/javascript" src="http://github.com/malsup/corner/raw/master/jquery.corner.js?v2.06"></script>
	<script type="text/javascript" src="js/itemAdd-1.0.0.js"></script>
	<script src="js/gmap_draw.js" type="text/javascript"></script>
	<script type="text/javascript">
		main.addItem.mode = "<?php echo $mode;?>";
		iframe=true;
	</script>
	</head>
	<body class="template-iframe">
	<?php
	//Settings
	include($_SESSION['abs_path'] . "/load_settings.php");
	?>
		<div id="frame body">
			<div id="frame-content">
				<form id="form">
				<div id="content-title"><h2>Tabela Yeri Belirle</h2></div>
				<div id="form-content">
					<input type="hidden" value="<?php echo $_GET['type'];?>" name="type">
					<input type="hidden" value="<?php echo $_GET['lat'];?>" name="lat">
					<input type="hidden" value="<?php echo $_GET['lng'];?>" name="lng">
					<div id="add-item-content-step-1" class="content-form" style="display:block">
						<div class="form-entries">
							<div id="entry-title" class="form-entry form-text">
								<div class="form-label">
									<label class="mandatory">Title</label>
								</div>
								<div class="form-input form-text">
									<input class="validate[required]" type="text" id="title" name="title">
								</div>
							</div>
							<div id="entry-description" class="form-entry form-textarea" style="height:120px">
								<div class="form-label">Description</div>
								<div class="form-input">
									<textarea id="description"></textarea>
								</div>
							</div>
							<div id="entry-address" class="form-entry form-text">
								<div class="form-label">
									<label class="">Street address:</label>
								</div>
								<div class="form-input">
									<input class="" type="text" maxlength="64" value="" id="street_address" name="street_address">
								</div>
							</div>
							<div id="entry-label" class="form-entry form-text">
								<div class="form-label">
									<label class="mandatory">Location on map:</label>
								</div>
								<div style="font-weight:normal; font-size:10px">
									Place the marker with one of the following options:<br /><br />									
									<div id="map-hand-controls">		
										<div class="selected" id="hand_b" onClick="stopEditing()"></div>
										<div class="unselected" id="placemark_b" onClick="placeMarker()"></div>
										<!--<div class="unselected" id="line_b" onClick="startLine()"></div>
										<div class="unselected" id="shape_b" onClick="startShape()"></div>-->
									</div>							
									<b>1) </b>Drag the marker to where it should be.<br />	
									<b>2) </b><a href="javascript:main.addItem.wizard.findAddress();">Click here to place it on its street address.</a><br />
									<div id="geocloator-link">
										<b>3) </b><a href="javascript:main.addItem.wizard.showCurrentLocation();">Click here to place it on your current location.</a><br />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div id="add-item-content-step-2" class="content-form"  style="display:none">
						<div class="form-entries">
							<div id="entry-address-step-2" class="form-entry form-text">
								<div class="form-label">
									<label class="">Street address:</label>
								</div>
								<div class="form-input">
									<input class="" type="text" maxlength="64" value="" id="street_address" name="street_address">
								</div>
							</div>
							<div id="entry-postcode-step-2" class="form-entry form-text">
								<div class="form-label">
									<label class="">Postal code:</label>
								</div>
								<div class="form-input">
									<input class="" type="text" maxlength="5" value="" id="post_code" name="post_code">
								</div>
							</div>
							<div id="entry-city-step-2" class="form-entry form-text">
								<div class="form-label">
									<label class="">City:</label>
								</div>
								<div class="form-input">
									<input class="" type="text" maxlength="32" value="" id="city" name="city">
								</div>
							</div>
							<div id="entry-label" class="form-entry form-text">
								<div class="form-label">
									<label class="mandatory">Location on map:</label>
								</div>
								<div style="font-weight:normal; font-size:10px">
									Place the marker with one of the following options:<br /><br />									
									<div id="map-hand-controls">		
										<div class="selected" id="hand_b" onClick="stopEditing()"></div>
										<div class="unselected" id="placemark_b" onClick="placeMarker()"></div>
										<!--<div class="unselected" id="line_b" onClick="startLine()"></div>
										<div class="unselected" id="shape_b" onClick="startShape()"></div>-->
									</div>							
									<b>1) </b>Drag the marker to where it should be.<br />	
									<b>2) </b><a href="javascript:main.addItem.wizard.findAddress();">Click here to place it on its street address.</a><br />
									<div id="geocloator-link">
										<b>3) </b><a href="javascript:main.addItem.wizard.showCurrentLocation();">Click here to place it on your current location.</a><br />
									</div>
								</div>
							</div>
							<div id="featuretbody" style="display:none"></div>
						</div>
					</div>
					<div id="form-entry-features">
						<div id="map" style="width: 300px; height: 300px; position: relative; background-color: rgb(229, 227, 223);"></div>				
					</div>
					<div id="add-item-progress"><img src="../../images/loading_medium.gif"><div id="loading-text">Loading...</div></div>
					<br clear="both">
				</div>			
				<div id="form-actions">
					<div id="form-actions-entries">
						<div class="form-actions-entry form-entry form-submit">
							<input type="button" value="Previous" name="previous">	
							<input type="button" value="Save and Proceed" name="submit" style="position:absolute; right:20px;">
						</div>
					</div>
				</div>
				</form>
			</div>
		</div>
	<?php include($_SESSION['abs_path'] . "/includes/analytics/analytics.php"); ?>
	</body>
	</html>