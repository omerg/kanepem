<?php
session_start();
session_destroy();
print("Logout Successful");
sleep(0.25);
header("location:main_login.php");
?>