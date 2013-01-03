<?php
// Setting the Content-Type header with charset
header('Content-Type: text/html; charset=utf-8');
session_start();
if(!session_is_registered("abs_path")){
	require_once("../../path.php");
}
require_once($_SESSION['abs_path'] . "/includes/functions.php");
require_once($_SESSION['abs_path'] . "/includes/facebook.php");

$edit_id= $_GET['edit_id'];

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
<script  type="text/javascript"src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;
									key=ABQIAAAA8pY0-3FHi2dH0T1g8nY0xRSiS-y1gTPU5sbcoPnM8EyPYhJoMBSjS6szNmSSayTpA4McbCpn66Rh8g">
</script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js" type="text/javascript"></script>
<script type="text/javascript" src="../../js/timepicker/js/timepicker.js"></script>
<script type="text/javascript" src="../../js/jquery.validationEngine-en.js"></script>
<script type="text/javascript" src="../../js/jquery.validationEngine.js"></script>
<script type="text/javascript" src="js/itemEdit-1.0.0.js"></script>
<script src="js/gmap_draw.js" type="text/javascript"></script>
<script type="text/javascript">
	main.addItem.wizard.data.edit_id = "<?php echo $edit_id;?>";
	main.addItem.mode = "<?php echo $_GET['type']; ?>";
	main.addItem.step = "<?php echo $_GET['step']; ?>"
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
			<div id="content-title"><h2>Location and Contanct Info</h2></div>
			<div id="form-content">
				<input type="hidden" value="<?php echo $_GET['type'];?>" name="type">
				
				<input type="hidden" value="<?php echo $_GET['street_address'];?>" name="street_address">
				<input type="hidden" value="<?php echo $_GET['postcode'];?>" name="postcode">
				<input type="hidden" value="<?php echo $_GET['city'];?>" name="city">
				<input type="hidden" value="<?php echo $_GET['phone'];?>" name="phone">
				<input type="hidden" value="<?php echo $_GET['email'];?>" name="email">
				<input type="hidden" value="<?php echo $_GET['lat'];?>" name="lat">
				<input type="hidden" value="<?php echo $_GET['lng'];?>" name="lng">
				
				<input type="hidden" value="<?php echo $_GET['start_date'];?>" name="start_date">
				<input type="hidden" value="<?php echo $_GET['end_date'];?>" name="end_date">
				
				<input type="hidden" value="<?php echo $_GET['title'];?>" name="title">
				<input type="hidden" value="<?php echo $_GET['description'];?>" name="description">
				<input type="hidden" value="<?php echo $_GET['features'];?>" name="features">
				<div id="add-item-content-step-1" class="content-form"  style="display:none">
					<div class="form-entries">
						<div id="entry-address" class="form-entry form-text">
							<div class="form-label">
								<label class="mandatory">Street address:</label>
							</div>
							<div class="form-input">
								<input class="validate[required]" type="text" maxlength="64" value="" id="street_address" name="street_address">
							</div>
						</div>
						<div id="entry-postcode" class="form-entry form-text">
							<div class="form-label">
								<label class="mandatory">Postal code:</label>
							</div>
							<div class="form-input">
								<input class="validate[required,custom[onlyNumber]]" type="text" maxlength="5" value="" id="post_code" name="post_code">
							</div>
						</div>
						<div id="entry-city" class="form-entry form-text">
							<div class="form-label">
								<label class="mandatory">City:</label>
							</div>
							<div class="form-input">
								<input class="validate[required]" type="text" maxlength="32" value="" id="city" name="city">
							</div>
						</div>
						<div id="entry-phone" class="form-entry form-text">
							<div class="form-label">Phone:</div>
							<div class="form-input">
								<input type="text" maxlength="16" value="" id="phone" name="phone">
							</div>
						</div>
						<div id="entry-email" class="form-entry form-text">
							<div class="form-label">Email:</div>
							<div class="form-input">
								<input class="validate[optional,custom[email]]" type="text" maxlength="128" value="" id="email" name="email">
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
						<div id="form-entry-features">
							<input id="featuredetails" rows="2" type="hidden">
        					<div id="map" style="width: 300px; height: 300px; position: relative; background-color: rgb(229, 227, 223);"></div>				
						</div>
					</div>
				</div>
				<div id="add-item-content-step-2" class="content-form" style="display:none">
					<div class="form-entries">
						<div id="entry-start-date" class="form-entry form-text">
							<div class="form-label">
								<label>Start Date:</label>
							</div>
							<div class="form-input">
								<input type="text" class="validate[required,custom[date]]" maxlength="64" value="" id="start_date" name="start_date">
							</div>
						</div>
						<div id="form-entry-features" style="left:400px;">
							<div id="entry-end-date" class="form-entry form-text">
							<div class="form-label">
								<label>End Date:</label>
							</div>
							<div class="form-input">
								<input type="text" class="validate[required, custom[date]]" maxlength="64" value="" id="end_date" name="end_date">
							</div>
						</div>
						</div>
					</div>
				</div>
				<div id="add-item-content-step-3" class="content-form" style="display:none">
					<div class="form-entries">
						<div id="entry-title" class="form-entry form-text">
							<div class="form-label">
								<label class="mandatory">Title</label>
							</div>
							<div class="form-input form-text">
								<input class="validate[required]" type="text" id="title" name="title">
							</div>
						</div>
						<div id="entry-description" class="form-entry form-textarea">
							<div class="form-label">Description</div>
							<div class="form-input">
								<textarea id="description"></textarea>
							</div>
						</div>
					</div>
				</div>
				<div id="add-item-content-step-4" class="content-form" style="display:none">
					<div class="form-entries">
						<div id="form-entry-features">
							<div class="form-entry form-checkbox">
								<div class="form-label">Features: (you may select multiple if needed)</div>
									<div class="form-input">
										<ul class="category-small-list">
											<li id="category-small-1" class="category-small">
												<div class="category-small-input">
													<input type="checkbox" value="1" id="feature-1" name="feature-1">
												</div>
												<div class="category-small-label">							
													<div class="category-label">
														<label for="category-1">Feature 2</label>
														<div class="category-small-description">Feature Description</div>
													</div>
												</div>
											</li>
											<li id="category-small-2" class="category-small">
												<div class="category-small-input">
													<input type="checkbox" value="1" id="feature-2" name="feature-2">
												</div>
												<div class="category-small-label">							
													<div class="category-label">
														<label for="category-1">Feature 3</label>
														<div class="category-small-description">Feature Description</div>
													</div>
												</div>
											</li>
											<li id="category-small-3" class="category-small">
												<div class="category-small-input">
													<input type="checkbox" value="1" id="feature-3" name="feature-3">
												</div>
												<div class="category-small-label">							
													<div class="category-label">
														<label for="category-1">Feature 4</label>
														<div class="category-small-description">Feature Description</div>
													</div>
												</div>
											</li>
											<li id="category-small-4" class="category-small">
												<div class="category-small-input">
													<input type="checkbox" value="1" id="feature-4" name="feature-4">
												</div>
												<div class="category-small-label">							
													<div class="category-label">
														<label for="category-1">Feature 5</label>
														<div class="category-small-description">Feature Description</div>
													</div>
												</div>
											</li>
											<li id="category-small-5" class="category-small">
												<div class="category-small-input">
													<input type="checkbox" value="1" id="feature-5" name="feature-5">
												</div>
												<div class="category-small-label">							
													<div class="category-label">
														<label for="category-1">Feature 6</label>
														<div class="category-small-description">Feature Description</div>
													</div>
												</div>
											</li>
											<li id="category-small-6" class="category-small">
												<div class="category-small-input">
													<input type="checkbox" value="1" id="feature-6" name="feature-6">
												</div>
												<div class="category-small-label">							
													<div class="category-label">
														<label for="category-1">Feature 7</label>
														<div class="category-small-description">Feature Description</div>
													</div>
												</div>
											</li>
											<li id="category-small-7" class="category-small">
												<div class="category-small-input">
													<input type="checkbox" value="1" id="feature-7" name="feature-7">
												</div>
												<div class="category-small-label">							
													<div class="category-label">
														<label for="category-1">Feature 8</label>
														<div class="category-small-description">Feature Description</div>
													</div>
												</div>
											</li>
											<li id="category-small-8" class="category-small">
												<div class="category-small-input">
													<input type="checkbox" value="1" id="feature-8" name="feature-8">
												</div>
												<div class="category-small-label">							
													<div class="category-label">
														<label for="category-1">Feature 1</label>
														<div class="category-small-description">Feature Description</div>
													</div>
												</div>
											</li>																						
										</ul>
									</div>
								</div>
						</div>
					</div>
				</div>
				<div id="add-item-content-step-5" class="content-form" style="display:none">
					<div class="form-entries">
						<div id="entry-hide" class="form-entry form-textarea">
							<div class="form-label">Hide item from these people:</div>
							<div class="form-input form-text">
								<input class="suggestion-form" type="text" id="hide" name="hide" autocomplete="off" onkeyup="lookup(this.value);">
								<div class="form-actions-entry form-entry form-submit">
									<input type="button" id="block_user" name="block_user" value="Block This User">
									<div id="suggestions" class="suggestionsBox" style="display: none;">
										<img src="../../images/upArrow.png" style="position: relative; top: -12px; left: 30px" alt="upArrow" />
										<div id="autoSuggestionsList" class="suggestionList"></div>
									</div>
								</div>
							</div>
						</div>
						<div id="entry-onlyme" class="form-entry form-textarea">
							<div class="form-label">Only I can see this item:</div>
							<div class="form-input">
								<input type="checkbox" value="1" id="feature-1" name="feature-1">
							</div>
						</div>
						<div id="hide-list-container" style="display:none">
							<div class="form-label">Blocked Users:</div>
							<ul id="hide-list">
							</ul>
						</div>
						<div id="entry-default" class="form-entry form-text">
							<div class="form-label">Make this my default setting:</div>
							<div class="form-input">
								<input type="checkbox" value="1" id="feature-1" name="feature-1">								
							</div>
						</div>
					</div>
				</div>
				<div id="add-item-progress"><img src="../../images/loading_medium.gif"><div id="loading-text">Loading...</div></div>
				<br clear="both">
			</div>			
			<div id="form-actions">
				<div id="form-actions-entries">
					<div class="form-actions-entry form-entry form-submit">
						<input type="button" value="Save" name="submit" style="position:absolute; right:20px;">
					</div>
				</div>
			</div>
			</form>
		</div>
	</div>
<?php include($_SESSION['abs_path'] . "/includes/analytics/analytics.php"); ?>
</body>
</html>