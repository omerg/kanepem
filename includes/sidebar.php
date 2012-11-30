<?php
include_once('functions.php');

debecho("this is sidebar");

/*POST coordinate values via HTTP variables*/
$lat_1 = $_POST["lat_1"];
$lng_1 = $_POST["lng_1"];
$lat_2 = $_POST["lat_2"];
$lng_2 = $_POST["lng_2"];

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
		<div id="latitude" style="display: none;">' . mysql_result($result_set, $i, "latitude") . '</div>
		<div id="longitude" style="display: none;">' . mysql_result($result_set, $i, "longitude") . '</div>
		</a>';
	$i++;
}
?>