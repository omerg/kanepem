<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");
require_once($_SESSION['abs_path'] . 'includes/facebook.php');

$a = array(); //main array to encode
$a['success'] = true;

// username and password sent from signup form 
$myusername=$_POST['username']; 
$mypassword=$_POST['password'];
$remember=$_POST['remember'];

//alternatively, collect facebook uid and access token
$facebook=$_POST['facebook'];
$fb_uid=$_POST['fb_uid'];
$fb_access_token=$_POST['fb_access_token'];

//if the login is made through facebook login, process this block
if($facebook == 1){
	$sql="SELECT * FROM account WHERE fb_uid='$fb_uid'";
	$result=mysql_query($sql);
	$array=mysql_fetch_array($result);

	// Mysql_num_row is counting table row
	$count=mysql_num_rows($result);
	
	// If result matched $myusername and $mypassword, table row must be 1 row
	if($count==1){
		// Register $myusername and $my_id
		$_SESSION['myusername'] = $array['username'];
		$_SESSION['my_id'] = $array['id'];
		
		$a['myusername'] = $_SESSION['myusername'];
		$a['my_id'] = $_SESSION['my_id'];
	} 
	//if count was 0, the user is needed to be signed up
	else {
		$user = json_decode(makeRequest("https://graph.facebook.com/" . $fb_uid));
		
		$email = $user->{"email"};
		$username = strtolower($user->{"first_name"} . '_' . $user->{"last_name"});
		
		$sql='INSERT INTO account(username, password, email, activationkey, facebook, fb_uid) VALUES ("' . $username . '", "", "' . $email . '","","' . $facebook . '","' . $fb_uid . '")';

		mysql_query($sql) or $a['success'] = false; //try to submit the form via mysql
		$a['errormessage'] = mysql_error(); //if theres an error, put it in the error message field
		
		// Register $myusername and $my_id
		$_SESSION['myusername'] = $username;
		$_SESSION['my_id'] = mysql_insert_id();
		
		$a['myusername'] = $_SESSION['myusername'];
		$a['my_id'] = $_SESSION['my_id'];
		
		//create a profile for the user
		$sql='INSERT INTO profile (user_id, picture_url, thumbnail_url, name, surname) VALUES(" ' . $a["my_id"] . '", "http://graph.facebook.com/' . $fb_uid . '/picture?type=large", "' . 'http://graph.facebook.com/' . $fb_uid . '/picture' . '", "' . $user->{"first_name"} . '", "' . $user->{"last_name"} . '")';
		if (!mysql_query($sql)) {
			$a['errormessage'] = "profile error: " . mysql_error();
		}
	}
//if the login is not made through facebook login, process this block
} else {
	$sql="SELECT * FROM account WHERE username='$myusername' and password='$mypassword' and status='activated'";
	$result=mysql_query($sql);
	$array=mysql_fetch_array($result);
	
	// Mysql_num_row is counting table row
	$count=mysql_num_rows($result);
	
	// If result matched $myusername and $mypassword, table row must be 1 row
	if($count==1){
		// Register $myusername and $my_id
		$_SESSION['myusername'] = $array['username'];
		$_SESSION['my_id'] = $array['id'];
		
		//if remember is checked, set cookie
		if($remember == 1){
			 $cookie = md5 (
   				$myusername .
    			$mypassword
			);
			
			$expire=time()+60*60*24*30;
			setcookie ("kanepem", $cookie, $expire, "/");
			
			//save the cookie in database as well
			$sql="UPDATE account SET cookie='$cookie' WHERE id='" . $array['id'] . "'";
			mysql_query($sql) or $a['success'] = false; //try to submit the form via mysql
			$a['errormessage'] = mysql_error(); //if theres an error, put it in the error message field
		}
		
		$a['myusername'] = $_SESSION['myusername'];
		$a['my_id'] = $_SESSION['my_id'];
	} else {
		$a['success'] = false;
		$a['errormessage'] = "regular user login was unsuccessful";
	}
}

print json_encode($a); //encode in JSON and return to our ext2 application
?>