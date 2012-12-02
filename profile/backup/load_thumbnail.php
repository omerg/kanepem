<?php 
//returns the path to user image

//session_start();
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$user_id = getUserId($_POST['user']);
// some basic sanity checks
if(isset($_POST['user'])) { 
	// get the image from the db
	$sql = "SELECT picture_id FROM profile WHERE user_id = '$user_id'";
	
	$result = mysql_query($sql);
   	$array = mysql_fetch_assoc($result);
	if($array['picture_id'] != ""){
		echo "../uploads/thumbs/tn_" . $array['picture_id'] . ".jpg";
	} else {
		echo "../uploads/thumbs/tn_missing_photo.png";
	}
} else {
	echo "../uploads/thumbs/tn_missing_photo.png";
}

?>