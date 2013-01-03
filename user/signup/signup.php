<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;

$name = stripslashes(strip_tags($_POST['name']));
$password = stripslashes(strip_tags($_POST['password']));
$email = stripslashes(strip_tags($_POST['email']));

$activationKey =  mt_rand() . mt_rand() . mt_rand() . mt_rand() . mt_rand();

$sql='INSERT INTO account(username, password, email, activationkey) VALUES ("' . $name .'", "' . $password . '","' . $email . '","' . $activationKey . '")';

//send activation email
$to      = $email;
$subject = " uniWorks Registration";
$message = "Welcome to our website!\r\rYou, or someone using your email address, has completed registration at uniWorks. You can complete registration by clicking the following link:\r" . $_SESSION['abs_url'] . "user/actions/verify.php?$activationKey\r\rIf this is an error, ignore this email and you will be removed from our mailing list.\r\rRegards,\ uniWorks Team";

if (smtpmailer($to, $subject, $message)) {
	// do something
}
if (!empty($error)) {
	$a['mailStatus'] = $error;
}

mysql_query($sql) or $a['success'] = false; //try to submit the form via mysql
$a['errormessage'] = mysql_error(); //if theres an error, put it in the error message field

print json_encode($a); //encode in JSON and return to our ext2 application

?>