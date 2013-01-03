<?php

// Setting the Content-Type header with charset
header('Content-Type: text/html; charset=utf-8');

session_start();

/** Define ABSPATH as this files directory */
$_SESSION['abs_path'] = dirname(__FILE__) . '/';

$abs_url = $_SERVER['HTTP_HOST'] . "/kanepem2/";
$abs_url = "http://" . $abs_url;
$_SESSION['abs_url'] = $abs_url;

?>