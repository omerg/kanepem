<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;

//message data sent by http variables
$from = $_SESSION['my_id'];
$to = getUserId($_POST['to']);
$subject = $_POST['subject'];
$message = $_POST['message'];

$sql = "INSERT INTO message (from_id, to_id, subject, message) VALUES ('" . $from . "', '" . $to . "', '" . $subject . "', '" . $message . "')";

// execute sql
if (!mysql_query($sql)) {
	//echo mysql_error();
	$a['errormessage'] = mysql_error();
	$a['success'] = false;
}

print json_encode($a); //encode in JSON and return to our ext2 application

?>