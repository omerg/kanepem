<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

// id sent from session variable
$my_id = $_SESSION['my_id'];
$my_username = $_SESSION['myusername'];

$user_id = getUserId($_POST['user']);

$a_main = array(); //main array to encode
$a_tuple = array(); //main array to encode

$tbl_name="follow"; // Table name

$sql="SELECT follows_id FROM $tbl_name WHERE follower_id='$user_id'";
$result=mysql_query($sql);

while($row=mysql_fetch_array($result)){
	$id = $row['follows_id'];
	$sql="SELECT profile.user_id, account.username, profile.thumbnail_url FROM profile, account WHERE profile.user_id = '$id' AND account.id = '$id'";
	$result_2=mysql_query($sql);
	$row_2= mysql_fetch_array($result_2);
	array_push($a_tuple, $row_2['user_id'], $row_2['username'], $row_2['thumbnail_url']);
	array_push($a_main, $a_tuple);
	array_pop($a_tuple);
	array_pop($a_tuple);
	array_pop($a_tuple);
}

print json_encode($a_main); //encode in JSON and return to our ext2 application
?>