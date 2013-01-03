<html>
<head>
<link rel="stylesheet" type="text/css" media="screen" href="css/formCSS.css">
<link rel="stylesheet" href="../../css/validationEngine.jquery.css" type="text/css" media="screen" charset="utf-8" />
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
<script src="../../js/jquery.validationEngine-en.js" type="text/javascript"></script>
<script src="../../js/jquery.validationEngine.js" type="text/javascript"></script>
<script src="js/signUp.js" type="text/javascript"></script>
</head>
<body>
<div id="stylized" class="myform">
<form id="form" name="form" method="post" action="index.html">
<h1>Sign-up form</h1>
<p>This is the basic look of my form without table</p>

<label>Name
<span class="small">Add your name</span>
</label>
<input class="validate[required]" type="text" name="name" id="name" />

<label>Email
<span class="small">Add a valid address</span>
</label>
<input class="validate[required,custom[email]]" type="text" name="email" id="email" />

<label>Password
<span class="small">Min. size 6 chars</span>
</label>
<input class="validate[required]" type="text" name="password" id="password" />

<button id="submit-button" type="submit">
	<img id="form-progress" src="css/img/ajax-loader.gif" style="display:none">
	<div id="button-text">Sign-up</div>
	<div id="button-text-loading" style="display:none">Please Wait...</div>
</button>
<div class="spacer"></div>

</form>
</div>
</body>
</html>