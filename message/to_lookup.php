<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array("success" => true, "errormessage" => "", "show" => array()); //main array to encode 
$show =array();

// Is there a posted query string?
if(isset($_POST["queryString"])) {
	$queryString = $_POST["queryString"];
	// Is the string length greater than 0?
	if(strlen($queryString) >0) {
	// Run the query: We use LIKE ‘$queryString%’
	// The percentage sign is a wild-card, in my example of countries it works like this…
	// $queryString = ‘Uni’;
	// Returned data = ‘United States, United Kindom’;

	$sql = "SELECT account.username 
			FROM account
			WHERE account.username LIKE '$queryString%'
			LIMIT 10";
	$result=mysql_query($sql);
	
        if($result) {
            // While there are results loop through them – fetching an Object (i like PHP5 btw!).
           while ($array = mysql_fetch_array($result)) {
                // Format the results, im using <li> for the list, you can change it.          
                // The onClick function fills the textbox with the result.
				array_push($show, $array['username']);
           }
		   $a['show'] = $show;
        } else {
           $a['errormessage'] = "query result could not be processed";
        }
    }
}
print json_encode($a);
?>