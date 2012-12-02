<?php

//session_start();
require_once("../../includes/start_session.php");
require_once("../../includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;

$name = $_POST['name'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];

$sql="INSERT INTO location (location_name, latitude, longitude) VALUES ('" . $name . "', '" . $lat . "', '" . $lng . "')";
$result=mysql_query($sql);
$array=mysql_fetch_array($result);

$a['errormessage'] = mysql_error(); //if theres an error, put it in the error message field

if($a['errormessage']){
	$a['success'] = false;
}

print json_encode($a); //encode in JSON and return to our ext2 application
?>