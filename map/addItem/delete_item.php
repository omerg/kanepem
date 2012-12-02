<?php
//session_start();
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;

$item_id = $_POST['delete_id'];

$sql="DELETE FROM item  WHERE id = '$item_id'";

$result=mysql_query($sql);
$array=mysql_fetch_array($result);

$a['errormessage'] = mysql_error(); //if theres an error, put it in the error message field

if($a['errormessage']){
	$a['success'] = false;
}

print json_encode($a); //encode in JSON and return to our ext2 application
?>