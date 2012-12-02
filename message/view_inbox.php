<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode

// id sent from session variable
$my_id = $_SESSION['my_id'];

$sql = mysql_query("SELECT message.* ,account.username AS username, profile.thumbnail_url
					FROM message, account, profile
					WHERE account.id = message.from_id
					AND message.to_id=$my_id
					AND profile.user_id = account.id");
$rows = array();
while($r = mysql_fetch_assoc($sql)) {
    $rows[] = $r;
}
print json_encode($rows);

?>