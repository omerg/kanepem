<?php

$mode = $_GET['mode'];
$lat = $_GET['lat'];
$lng = $_GET['lng'];

function printHeader($mode){
	switch ($mode) {
		case "add_car":
			echo "Car";
			break;
		case "add_home":
			echo "Home";
			break;
		case "req_car":
			echo "Car Request";
			break;
		case "req_home":
			echo "Home Request";
			break;
		default:
		   echo "Item";
	}
}
?>
<html>
<head>
<!--Include JavaScript -->
<!--Localhost key-->
<script type="text/javascript" src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA8pY0-3FHi2dH0T1g8nY0xRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxTZipCQKop4LJA5O2L8frUd1F1ELg"></script>
<!--Sabanci key
<script type="text/javascript" src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA8pY0-3FHi2dH0T1g8nY0xRSiS-y1gTPU5sbcoPnM8EyPYhJoMBSjS6szNmSSayTpA4McbCpn66Rh8g"></script>
-->

<link rel="stylesheet" href="../../css/validationEngine.jquery.css" type="text/css" media="screen" charset="utf-8" />
<link rel="stylesheet" type="text/css" media="screen" href="css/myCSS.css">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript" src="../../js/global-1.0.0.js"></script>
<script type="text/javascript" src="js/itemAdd-1.0.0.js"></script>
<script src="../../js/jquery.validationEngine-en.js" type="text/javascript"></script>
<script src="../../js/jquery.validationEngine.js" type="text/javascript"></script>

<script type="text/javascript">
	main.addItem.location.latitude = <?php echo $lat;?>;
	main.addItem.location.longitude = <?php echo $lng;?>;
	main.addItem.mode = "<?php echo $mode;?>";
</script>
</head>
<body>
<div id="main">
	<div id="content">
		<h3>Add New <?php printHeader($mode); ?></h3>
		<div id="helptext"></div>
		<div id="gmap"></div>
		<div id="controls">
		<label id="location-name-label">Location Name: </label>
			<form id="form" action="">
				<input id="location-name" class="validate[required]"/>
				<button id="submit" type="submit">Submit</button>
			</form>
		<button id="cancel" onClick='javascript:parent.$.fancybox.close();'>Cancel</button>
		</div>
		<div id="message"></div>
	</div>
</div>
</body>
</html>