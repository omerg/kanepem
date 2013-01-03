<?php
session_start();
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
<?php require_once($_SESSION['abs_path'] . "/load_settings.php"); ?>
  <?php include($_SESSION['abs_path'] . "/header.php"); ?>
  <div id="main">
    <div id="content">
      <div id="content-area">
	  	<div id="content-main">
  <form action="/user/login" method="post">
    <div id="content-title">
      <h2>Log in</h2>
    </div>
    <div id="form-content">
      <div id="login-form" class="content-form">
        <div class="form-helptext"> Log in with your username and password. If you don't have an account yet, you can sign up <a href="/signup">here.</a> </div>
        <div class="form-entries">
          <div class="form-entry form-text">
            <div class="form-label"> Username: </div>
            <div class="form-input">
              <input type="text" value="" id="username" name="username">
            </div>
          </div>
          <div class="form-entry">
            <div class="form-label form-password"> Password: </div>
            <div class="form-input form-text">
              <input type="password" value="" id="password" name="password">
            </div>
            <div class="form-help"><a href="/en/user/request_password" target="_parent">Forgot your password?</a></div>
          </div>
          <div class="form-entry form-checkbox">
            <div class="form-input">
              <input type="checkbox" value="1" id="remember" name="remember">
              <label for="remember">Remember me</label>
            </div>
          </div>
          <div class="form-entry form-submit">
            <div class="form-input">
              <input type="submit" value="Submit" name="commit">
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</div>
      </div>
    </div>
  </div>
  <?php include($_SESSION['abs_path'] . "/footer.php"); ?>
</div>
</body>
</html>
