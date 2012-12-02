<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

// id sent from session variable
$my_id = $_SESSION['my_id'];

$follows_id = getUserId($_POST['user']);
$return = "1";

$sql="SELECT follows_id FROM follow WHERE follower_id='$my_id' AND follows_id='$follows_id'";
$result=mysql_query($sql);
$count=mysql_num_rows($result);

if($count==1){
	$sql="DELETE FROM follow WHERE follower_id='$my_id' AND follows_id='$follows_id'";
	mysql_query($sql) or $return = "0";
} else {
	$sql='INSERT INTO follow (follower_id, follows_id) VALUES ("' . $my_id. '", "' . $follows_id . '")';
	mysql_query($sql) or $return = "0";
}

print json_encode($return);
?>