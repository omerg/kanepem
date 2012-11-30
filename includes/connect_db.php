<?php

require_once('config.php');
debecho("connect_db.php enter");
$host=DB_HOST; // Host name 
$username=DB_USER; // Mysql username 
$password=DB_PASSWORD; // Mysql password 
$db_name=DB_NAME; // Database name 


// Connect to server and select databse.
mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name")or die("cannot select DB" . DB_NAME);
debecho("connect_db.php exit");
?>