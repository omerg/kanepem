<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;

// id sent from session variable
$id = $_POST['id'];

$sql = "SELECT * FROM message WHERE id=$id";
$result=mysql_query($sql);
$message_data=mysql_fetch_array($result);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
$a['errormessage'] = mysql_error(); //if theres an error, put it in the error message field

if(!$a['errormessage']){
	// If result matched $id, table row must be 1 row
	if($count==1){
		//get "from" username by using id
		$sql = "SELECT username FROM account WHERE id= '" . $message_data['from_id'] . "'";
		$result=mysql_query($sql);
		$from=mysql_fetch_array($result);
		
		//assign the obtained value to main array
		$a['from'] = $from['username'];
		
		//get "to" username by using id
		$sql = "SELECT username FROM account WHERE id= '" . $message_data['to_id'] . "'";
		$result=mysql_query($sql);
		$to=mysql_fetch_array($result);
		
		//assign the obtained value to main array
		$a['to'] = $to['username'];
		
		//transfer the rest of the variables
		$a['subject'] = $message_data['subject'];
		$a['message'] = $message_data['message'];
	}
}	

print json_encode($a); //encode in JSON and return to our ext2 application

?>