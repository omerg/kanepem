<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;

// id sent from session variable
$message_id = $_POST['message_id'];

$sql = "UPDATE message SET readState='read' WHERE id=$message_id";
// execute sql
if (!mysql_query($sql)) {
	//echo mysql_error();
	$a['errormessage'] = mysql_error();
	$a['success'] = false;
}
print json_encode($a);

?>