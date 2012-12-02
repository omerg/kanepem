<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;

//collect http variables
$username = $_POST['username'];
$item_type = $_POST['item_type'];
$my_username = $_SESSION['myusername'];
$id = getUserId($username);

if($item_type == "add") {
	$sql="SELECT * FROM item WHERE (item_type = 'add_home' OR item_type = 'add_car') AND owner_id ='$id'";
} else if($item_type == "req") {
	$sql="SELECT * FROM item WHERE (item_type = 'req_home' OR item_type = 'req_car') AND owner_id ='$id'";
} else {
	$sql="SELECT * FROM item WHERE item_type = '$item_type' AND owner_id ='$id'";
}
$a['sql'] = $sql;

$result=mysql_query($sql);

$a['data'] = array();

while($row = mysql_fetch_assoc($result)) {
    $a['data'][] = $row;
}

$a['errormessage'] = mysql_error(); //if theres an error, put it in the error message field
if(!$a['errormessage'] == ""){
	$a['success'] = false;
}

print json_encode($a);

?>