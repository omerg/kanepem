<?php 

//session_start();
require_once("../includes/start_session.php");
require_once("../includes/functions.php");

//print "hi"; echo $_GET['user']; 
$user_id = getUserId($_GET['user']);
// some basic sanity checks
if(isset($_GET['user'])) { 
	// get the image from the db
	$sql = "SELECT image FROM user_image WHERE id IN (SELECT picture_id FROM profile WHERE user_id = '" . $user_id . "')";
	
	$result = mysql_query($sql);
   	$array = mysql_fetch_assoc($result);
    $bytes = $array['image'];
        header("Content-type: image/jpeg");
        print $bytes;
		exit ();
} else {
	echo 'Please use a real id number';
}

?>