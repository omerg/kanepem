<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

// id sent from session variable
$my_username = $_SESSION['myusername'];

if (isset($_POST['offset'])){
	$offset = $_POST['offset'];
} else {
	$offset = 0;
}
if (isset($_POST['nrOfRows'])){
	$nrOfRows = $_POST['nrOfRows'];
} else {
	$nrOfRows = 10;
}

//these arrays will temporarily store locations / ids
$newFriends =array();
$newItems =array();
$newUsers =array();

$return_array = array("newFriends" => array(), "newItems" => array(), "newUsers" => array()); // main array to encode

$return_array['success'] = true;

//************ get new friendships ************

$sql="SELECT  f.*, a1.username AS follower_name, a2.username AS follows_name FROM follow f, account a1, account a2 WHERE f.follower_id = a1.id AND f.follows_id = a2.id LIMIT $offset, $nrOfRows";

$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
$return_array['errormessage'] = mysql_error(); //if theres an error, put it in the error message field

if(!$return_array['errormessage']){
	while($row = mysql_fetch_assoc($result)) {
		$tmp_array = array();
		array_push($tmp_array, $row['id'],$row['follower_id'], $row['follows_id'], $row['tm'], $row['follower_name'], $row['follows_name']);
		array_push($newFriends, $tmp_array);
		unset($tmp_array);
	}
} else {
	$return_array['success'] = false;
}

//************ get new items ************

$sql="SELECT i.id, a.username, i.item_type, i.tm FROM item i, account a WHERE i.owner_id = a.id LIMIT $offset, $nrOfRows";
$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
$return_array['errormessage'] = mysql_error(); //if theres an error, put it in the error message field

if(!$return_array['errormessage']){	
	while($row = mysql_fetch_assoc($result)) {
		$tmp_array = array();
		array_push($tmp_array, $row['id'],$row['username'], $row['item_type'], $row['tm']);
		array_push($newItems, $tmp_array);
		unset($tmp_array);
	}	
} else {
	$return_array['success'] = false;
}


//************ get new users ************

$sql="SELECT id, username, tm FROM account LIMIT $offset, $nrOfRows";
$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
$return_array['errormessage'] = mysql_error(); //if theres an error, put it in the error message field

if(!$return_array['errormessage']){
	while($row = mysql_fetch_assoc($result)) {
		$tmp_array = array();
		array_push($tmp_array, $row['id'],$row['username'],$row['tm']);
		array_push($newUsers, $tmp_array);
		unset($tmp_array);
	}
} else {
	$return_array['success'] = false;
}


$return_array['newFriends'] = $newFriends;
$return_array['newItems'] = $newItems;
$return_array['newUsers'] = $newUsers;

print json_encode($return_array);

unset($newFriends);
unset($newItems);
unset($newUsers);
unset($return_array);

?>