<?php

if($_GET['item']) {
	$item = $_GET['item'];
	include 'item.php';
} else {
	include 'items.php';	
}
?>