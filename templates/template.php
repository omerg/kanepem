<?php 
/*Include Essential PHP Functions*/
//require_once("includes/functions.php");
require_once("../includes/start_session.php");
?>
<head>
<!-- Include Style Sheets -->
<link rel="stylesheet" type="text/css" media="screen" href="../css/globalCSS.css">
<link rel="stylesheet" type="text/css" media="screen" href="css/myCSS.css">
<!--Include JavaScript -->
<!--Localhost key-->
<script type="text/javascript" src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA8pY0-3FHi2dH0T1g8nY0xRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxTZipCQKop4LJA5O2L8frUd1F1ELg"></script>
<!--Sabanci key
<script type="text/javascript" src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA8pY0-3FHi2dH0T1g8nY0xRSiS-y1gTPU5sbcoPnM8EyPYhJoMBSjS6szNmSSayTpA4McbCpn66Rh8g"></script>
-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript" src="../js/global-1.0.0.js"></script>
</head>
<body>
<div id="body" class="template-area">
<!--Settings-->
<?php require_once("../user/load_settings.php"); ?>
  <?php include("../header.php"); ?>
  <div id="main">
    <div id="content">
      <div id="content-area">
      </div>
    </div>
  </div>
  <?php include("../footer.php"); ?>
</div>
</body>
</html>
