<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;

//collect http variables
$type = $_POST['type'];

if($type == "car"){
	$sql='SELECT item.*, account.username, account.facebook, account.fb_uid, profile.thumbnail_url FROM item, account, profile WHERE (item_type="add_car" OR item_type="req_car") AND account.id = item.owner_id AND account.id = profile.user_id';
} else if($type=="house") {
	$sql='SELECT item.*, account.username, account.facebook, account.fb_uid, profile.thumbnail_url FROM item, account, profile WHERE (item_type="add_home" OR item_type="req_home") AND account.id = item.owner_id AND account.id = profile.user_id';
} else {
	$sql='SELECT item.*, account.username, account.facebook, account.fb_uid, profile.thumbnail_url FROM item, account, profile WHERE account.id = item.owner_id AND account.id = profile.user_id';
}
$result=mysql_query($sql);

$a['array'] = array();

while($row = mysql_fetch_assoc($result)) {
    $a['array'][] = $row;
}

$a['errormessage'] = mysql_error(); //if theres an error, put it in the error message field
if(!$a['errormessage'] == ""){
	$a['success'] = false;
}

print json_encode($a);

?>