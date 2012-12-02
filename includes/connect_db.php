<?php
// Setting the Content-Type header with charset
header('Content-Type: text/html; charset=utf-8');

debecho("connect_db.php enter");
require_once('config.php');
$host=DB_HOST; // Host name 
$username=DB_USER; // Mysql username 
$password=DB_PASSWORD; // Mysql password 
$db_name=DB_NAME; // Database name 

// Connect to server and select databse.
mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
mysql_select_db("$db_name")or die("cannot select DB");
debecho("connect_db.php exit");
?>