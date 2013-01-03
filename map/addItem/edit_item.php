<?php
//session_start();
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;

$owner_id = $_SESSION['my_id'];

//step data
$step = $_POST['step'];

$item_type = $_POST['item_type'];
$item_id = $_POST['edit_id'];

//data from step 1
$street_address = $_POST['street_address'];
$postcode = $_POST['postcode'];
$city = $_POST['city'];
$title = $_POST['title'];
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];
			
//data from step 2
$start_date = $_POST['start_date'] . ':00';
$end_date = $_POST['end_date'] . ':00';
//data from step 3
$title = $_POST['title'];
$description = $_POST['description'];

//data from step 4
$features = bindec($_POST['features']);

switch ($step) {
    case 1:
        $sql="UPDATE item  SET street_address = '$street_address', postcode = '$postcode', city = '$city', title = '$title', latitude = '$latitude', longitude = '$longitude' WHERE id = '$item_id'";
        break;
    case 2:
        $sql="UPDATE item  SET start_date = '$start_date', end_date = '$end_date' WHERE id = '$item_id'";
        break;
    case 3:
        $sql="UPDATE item  SET title = '$title', description = '$description' WHERE id = '$item_id'";
        break;
    case 4:
        $sql="UPDATE item  SET features = '$features' WHERE id = '$item_id'";
        break;
}

$a['sql'] = $sql;
$result=mysql_query($sql);
$array=mysql_fetch_array($result);

$a['errormessage'] = mysql_error(); //if theres an error, put it in the error message field

if($a['errormessage']){
	$a['success'] = false;
}

print json_encode($a); //encode in JSON and return to our ext2 application
?>