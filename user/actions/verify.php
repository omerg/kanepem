<?php
session_start();
require_once("../../includes/functions.php");

$queryString = $_SERVER['QUERY_STRING'];

$sql="SELECT activationkey, id FROM account";
$result=mysql_query($sql);

while($row = mysql_fetch_array($result)){
    if ($queryString == $row["activationkey"]){
		$sql="UPDATE account SET activationkey = '', status='activated' WHERE (id = " . $row[id]. ")";
		// execute sql
		if (!mysql_query($sql)) {
			//echo mysql_error();
			echo "Activation Error: " . mysql_error();
		} else {
			$sql="INSERT INTO profile (user_id) VALUES('$row[id]')";
			if (!mysql_query($sql)) {
				//echo mysql_error();
				echo "Activation Error: " . mysql_error();
			} else {
				header( 'Location:../login.php?type=verify_success' );
			}
		}
	}
}
?>

