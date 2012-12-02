<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

// id sent from session variable
$my_id = $_SESSION['my_id'];

$follower_id = getUserId($_POST['queried_user']);
if($follower_id != ""){

	$tbl_name="follow"; // Table name

	$sql="SELECT follower_id FROM $tbl_name WHERE follower_id='$my_id' AND follows_id=" . $follower_id;
	$result=mysql_query($sql);
	$count=mysql_num_rows($result);

	if($count==1){
		print json_encode("true");
	} else {
		print json_encode("false");
	}
} else {
	print json_encode("false");
}
?>
