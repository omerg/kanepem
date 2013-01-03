<?php 
/*Include Essential PHP Functions*/
//require_once("includes/functions.php");
require_once("../../includes/start_session.php");
?>
<html>
<head>
<link rel="stylesheet" href="../../css/validationEngine.jquery.css" type="text/css" media="screen" charset="utf-8" />
<link rel="stylesheet" type="text/css" media="screen" href="../../css/globalCSS.css">
<link rel="stylesheet" type="text/css" media="screen" href="css/myCSS.css">
<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript" src="../../js/global-1.0.0.js"></script>
<script type="text/javascript" src="js/itemAdd-1.0.0.js"></script>
<script src="../../js/jquery.validationEngine-en.js" type="text/javascript"></script>
<script src="../../js/jquery.validationEngine.js" type="text/javascript"></script>-->
</head>
<body class="template-iframe">
	<div id="frame body">
		<div id="frame-content">
			<form>
			<div id="content-title"><h2>Title Here</h2></div>
			<div id="form-content">
				<input type="hidden" value="1" name="frame">
				<div id="editItemBasicForm" class="content-form">
					<div class="form-entries">
						<div id="" class="form-entry form-text">
							<div class="form-label">
								<label class="mandatory">Label Here</label>
							</div>
							<div class="form-input form-text">
								<input type="text">
							</div>
						</div>
						<div id="" class="form-entry form-textarea">
							<div class="form-label">Form Label Here</div>
							<div class="form-input">
								<textarea></textarea>
							</div>
						</div>
						<div id="form-entry-types">
							
						</div>
					</div>
				</div>
				<br clear="both">
			</div>			
			<div id="form-actions">
			<div id="form-actions-entries">
				<div class="form-actions-entry form-entry form-submit">
					<input type="button" value="Previous">	
					<input type="button" value="Save and Proceed" style="position:absolute; right:20px;">
				</div>
			</div>
		</div>
			</form>
		</div>
	</div>
</body>
</html>