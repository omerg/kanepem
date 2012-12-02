<?php 
//returns the path to user image

session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$user_id = getUserId($_POST['user']);
// some basic sanity checks
if(isset($_POST['user'])) { 
	// get the image from the db
	$sql = "SELECT account.facebook, account.fb_uid, profile.picture_url FROM account, profile WHERE account.id = '$user_id' AND profile.user_id = '$user_id'";
	
	$result = mysql_query($sql);
   	$array = mysql_fetch_assoc($result);
	
	if($array['picture_url']=== NULL){
		//check if its a facebook profile
		if($array['facebook'] == 1) {
			echo "http://graph.facebook.com/" . $array['fb_uid'] . "/picture?type=large";
		} else {
			echo "../uploads/pics/0.jpg";
		}
	} else {
		echo $array['picture_url'];
	}
}

?>