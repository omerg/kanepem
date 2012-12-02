<?php
// Setting the Content-Type header with charset
header('Content-Type: text/html; charset=utf-8');

debecho("config.php enter");
// ** MySQL settings ** //
/** The name of the database*/
define('DB_NAME', 'kanepem');

/** MySQL database username */
define('DB_USER', 'kanepeUser');

/** MySQL database password */
define('DB_PASSWORD', 'abc');

/** MySQL hostname */
define('DB_HOST', 'localhost');
debecho("config.php exit");
?>