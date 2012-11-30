<?php
/* 
 * Author: Omer Gurarslan	<omer.gurarslan@uta.fi>
 * Date:	2010-02-11
 *
 * Copyright © 2010 Omer Gurarslan
 *
 * Copyright Notice:
 * Any redistribution or reproduction of part or all of the contents in any form is prohibited.
 * You may not, except with our express written permission, distribute or commercially exploit
 * the content. Nor may you transmit it or store it in any other website or other form of 
 * electronic retrieval system.
 *
 *@return 	the name of the file
 */

//Global Variables
$DEBUG_MODE = False;

/*! @class debugMode
    @abstract Displays debuging information when switched on
    @discussion A boolean variable named debugMode can be used as a switch
for turning the debug mode on or off. debecho function should be used for debug
echo
*/
function debecho($text) {
	global $DEBUG_MODE;
	if ($DEBUG_MODE) {
		echo $text . "<br>";
	}
}
debecho("Hello debug...");

include 'connect_db.php';

/*! @class get_visible_items
 *@abstract returns an array of items whose coordinates
 *fit into a rectangular area
 */
function get_visible_items($lat_1, $lng_1, $lat_2, $lng_2) {
	debecho("get_visible_items() activated");
	debecho($lat_1);
	$tbl_name = "uniworks.location";

	$query = "CALL getVisible($lat_1, $lng_1, $lat_2, $lng_2)";
		debecho("query is: " . $query);

	$result = mysql_query($query);
	return $result;
	debecho("get_visible_items() deactivated");
}
?>
