<?php
//session_start();
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;

$owner_id = $_SESSION['my_id'];

$item_type = $_POST['item_type'];

//data from step 1
$street_address = $_POST['street_address'];
$postcode = $_POST['postcode'];
$city = $_POST['city'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$src_latitude = $_POST['src_latitude'];
$src_longitude = $_POST['src_longitude'];
$dst_latitude = $_POST['dst_latitude'];
$dst_longitude = $_POST['dst_longitude'];
			
//data from step 2
$start_date = $_POST['start_date'] . ':00';
$end_date = $_POST['end_date'] . ':00';
//data from step 3
$title = $_POST['title'];
$description = $_POST['description'];
$features = bindec($_POST['features']);

$sql="INSERT INTO item (owner_id, item_type, street_address, postcode, city, phone, email, src_lat, src_lng, dst_lat, dst_lng, start_date, end_date, title, description, features) VALUES ('" . $owner_id . "', '" . $item_type . "', '" . $street_address . "', '" . $postcode . "', '" . $city . "', '" . $phone . "', '" . $email . "', '" . $src_latitude . "', '" . $src_longitude . "', '" . $dst_latitude . "', '" . $dst_longitude . "', '" . $start_date . "', '" . $end_date . "', '" . $title . "', '" . $description . "', '" . $features . "')";
$a['sql'] = $sql;
$result=mysql_query($sql);
$array=mysql_fetch_array($result);

$a['errormessage'] = mysql_error(); //if theres an error, put it in the error message field

if($a['errormessage']){
	$a['success'] = false;
}

print json_encode($a); //encode in JSON and return to our ext2 application
?>