<?php
session_start();
require_once($_SESSION['abs_path'] . "/includes/functions.php");

$a = array(); //main array to encode

//collect http variables
$ids = $_POST['ids'];
$nelat = $_POST['nelat'];
$swlat = $_POST['swlat'];
$nelng = $_POST['nelng'];
$swlng = $_POST['swlng'];

//these arrays will temporarily store locations / ids
$show =array();
$hide =array();
$intersect =array();

$return_array = array("show" => array(), "hide" => array());

//store ids in array
$ids_array = explode(",", $ids);

if(sizeof($ids_array) > 0){
	foreach ($ids_array as $id) {
		if(is_visible($id, $swlat, $swlng, $nelat, $nelng)){
			//it was previously visible too, store it in the intersect array
			array_push($intersect, $id);
		} else {
			//$id = str_replace('"', "", $id);
			array_push($hide, (int)$id);
		}
	}
}

$return_array['hide'] = $hide;
//call the get_visible_items function to store visible items
$result = get_visible_items($swlat, $swlng, $nelat, $nelng, $_SESSION['myusername']);

if (count($result) >= '1')
{
	$tmp_array_1 = array();
	$r=0;
	while ($r < count($result))
	{
		$row = $result[$r];
		if(array_search($row['id'], $intersect) === false){
			$tmp_array_2 = array();
			$row['features'] = decbin($row['features']);
			$row['features'] = substr("00000000",0,8 - strlen($row['features'])) . $row['features'];
			array_push($tmp_array_2, $row['id'], getUsername($row['owner_id']), $row['src_lat'], $row['src_lng'], $row['dst_lat'], $row['dst_lng'],$row['item_type'], $row['title'], $row['features'], $row['description']);
			array_push($tmp_array_1, $tmp_array_2);
			unset($tmp_array_2);
		}
	$r++;
	}
	$return_array['show'] = $tmp_array_1;
	unset($tmp_array_1);
}

print json_encode($return_array);

unset($show);
unset($hide);
unset($intersect);
unset($return_array);

?>