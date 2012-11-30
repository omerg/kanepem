<?php
include_once('functions.php');

debecho("this is sidebar");

/*get coordinate values via HTTP variables
$lat_1 = $_GET["lat_1"];
$lng_1 = $_GET["lng_1"];
$lat_2 = $_GET["lat_2"];
$lng_2 = $_GET["lng_2"];
*/

$lat_1 = 0;
$lng_1 = 0;
$lat_2 = 360;
$lng_2 = 360;

//calling the required function
$result_set = get_visible_items($lat_1, $lng_1, $lat_2, $lng_2);

//setting up the loop
$row_count = mysql_numrows($result_set);
$i = 0;
while ($i < $row_count) {

	//create appropriate HTML output
	echo '<a id="toplist_entry" class="entry" href="">
		<div class="rating">' . mysql_result($result_set, $i, "id") . '</div>
		<div class="icon"></div>
		<div class="category" id="category-1" title="">&nbsp;</div>
		<div class="label"><span>' . mysql_result($result_set, $i, "location_name") . '</span></div>
		<div class="descr" title="' . mysql_result($result_set, $i, "address") . '"> &nbsp;</div>
		</a>';
	$i++;
}
?>