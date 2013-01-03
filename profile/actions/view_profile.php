<?php
//session_start();
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;
$tbl_name="profile"; // Table name 

// id sent from session variable
$my_id = $_SESSION['my_id'];
$my_username = $_SESSION['myusername'];
$username = $_GET['username'];

$sql="SELECT * FROM $tbl_name WHERE user_id in(SELECT id FROM account WHERE username='$username')";
$result=mysql_query($sql);
$array=mysql_fetch_array($result);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
$a['errormessage'] = mysql_error(); //if theres an error, put it in the error message field

if(!$a['errormessage']){
	// If result matched $my_id, table row must be 1 row
	if($count==1){
		// store values in array a"
		$a['username'] = $_SESSION['myusername'];
		$a['name'] = $array['name'];
		$a['surname'] = $array['surname'];
		$a['description'] = $array['description'];

	} else {
		$a['errormessage'] = "noProfile";
		$a['success'] = false;
	}	
}

$a['username'] = $username;
print json_encode($a); //encode in JSON and return to our ext2 application
?>