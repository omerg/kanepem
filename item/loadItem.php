<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;

//collect http variables
$id = $_POST['item_id'];

$sql="SELECT item.*, profile.thumbnail_url, profile.name, profile.surname, account.username FROM item, profile, account WHERE item.id='$id' AND profile.user_id = item.owner_id AND profile.user_id = account.id";
$result=mysql_query($sql);
$count=mysql_num_rows($result);

if($count==1){
	$return = mysql_fetch_assoc($result);
	//decode features
	$return['features'] = decbin($return['features']);
	$return['features'] = substr("00000000",0,8 - strlen($return['features'])) . $return['features'];
	//return self=true if the query owner and item owner is the same user.
	if($return['username'] == $_SESSION['myusername']){
		$return['self'] = "true";
	} else {
		$return['self'] = "false";
	}
	$a['array'] = $return;
} else {
	$a['success'] = false;
	$a['errormessage'] = mysql_error(); //if theres an error, put it in the error message
	if(!$a['errormessage']){
		$a['errormessage'] = "given id was not matched";
	}
}

print json_encode($a);

?>