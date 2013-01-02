<?php
/* 
 * Author: Omer Gurarslan	<omer.gurarslan@obss.com.tr>
 * Date:	2010-02-11
 *
 * Copyright � 2010 Omer Gurarslan
 *
 * Copyright Notice:
 * Any redistribution or reproduction of part or all of the contents in any form is prohibited.
 * You may not, except with our express written permission, distribute or commercially exploit
 * the content. Nor may you transmit it or store it in any other website or other form of 
 * electronic retrieval system.
 *
 *@return 	the name of the file
 */
 
 // Setting the Content-Type header with charset
header('Content-Type: text/html; charset=utf-8');

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

require_once('connect_db.php');

//data related to phpMailer
require_once('PHPMailer/class.phpmailer.php');
define('GUSER', 'kanepem.org@gmail.com'); // Gmail username
define('GPWD', 'qwe321123'); // Gmail password

/*! @class get_visible_items
 *@abstract returns an array of items whose coordinates
 *fit into a rectangular area
 */
function get_visible_items($lat_1, $lng_1, $lat_2, $lng_2, $username) {

	if($lat_1 < $lat_2 && $lng_1 < $lng_2) {		
		$sql = "SELECT * FROM item WHERE src_lat BETWEEN $lat_1 AND $lat_2 AND src_lng BETWEEN $lng_1 AND $lng_2";
	} else if($lat_1 < $lat_2 && $lng_1 > $lng_2){
		$sql = "SELECT * FROM item WHERE src_lat BETWEEN $lat_1 AND l$at_2 AND src_lng NOT BETWEEN $lng_1 AND $lng_2";
	} else if ($lat_1 > $lat_2 && $lng_1 < $lng_2){
		$sql = "SELECT * FROM item WHERE src_lat NOT BETWEEN $lat_1 AND $lat_2 AND src_lng BETWEEN $lng_1 AND $lng_2";
	} else if($lat_1 > $lat_2 && $lng_1 > $lng_2){
		$sql = "SELECT * FROM item WHERE src_lat BETWEEN $lat_1 AND $lat_2 AND src_lng BETWEEN $lng_1 AND $lng_2";
	} else {
		$sql = "SELECT * FROM item WHERE src_lat = $lat_1 AND src_lng = $lng_1";
	}
	$result = mysql_query($sql);
	$result = filter_blocked($result, $_SESSION['myusername']);
	return $result;
}

/*! @class filter_blocked
 *@abstract given a mysql query result set, this function
 * filters items that are blocked to everyone
 * if given username is not null, it filters the items
 * that are blocked for the given user as well
 */
 function filter_blocked($result, $username) {
    $table_result=array();
    $r=0;
    while($row = mysql_fetch_assoc($result)){
        $arr_row=array();
        $c=0;
        while ($c < mysql_num_fields($result)) {       
            $col = mysql_fetch_field($result, $c);   
            $arr_row[$col -> name] = $row[$col -> name];           
            $c++;
        }

		$blocklist_array = explode(",", $arr_row['block']);
		if(array_search('all', $blocklist_array) === false && array_search($username, $blocklist_array) === false){
			array_push($table_result, $arr_row);
		}
        $r++;
    }   
    return $table_result;
 }
 

/*! @class is_visible
 *@abstract returns true if the item with given id is visible within given coordinates
 */
function is_visible($id, $lat_1, $lng_1, $lat_2, $lng_2) {

	if($lat_1 < $lat_2 && $lng_1 < $lng_2) {		
		$sql = "SELECT id FROM item WHERE id=$id AND src_lat BETWEEN $lat_1 AND $lat_2 AND src_lng BETWEEN $lng_1 AND $lng_2";
	} else if($lat_1 < $lat_2 && $lng_1 > $lng_2){
		$sql = "SELECT id FROM item WHERE id=$id AND src_lat BETWEEN $lat_1 AND l$at_2 AND src_lng NOT BETWEEN $lng_1 AND $lng_2";
	} else if ($lat_1 > $lat_2 && $lng_1 < $lng_2){
		$sql = "SELECT id FROM item WHERE id=$id AND src_lat NOT BETWEEN $lat_1 AND $lat_2 AND src_lng BETWEEN $lng_1 AND $lng_2";
	} else if($lat_1 > $lat_2 && $lng_1 > $lng_2){
		$sql = "SELECT id FROM item WHERE id=$id AND src_lat BETWEEN $lat_1 AND $lat_2 AND src_lng BETWEEN $lng_1 AND $lng_2";
	} else {
		$sql = "SELECT id FROM item WHERE id=$id AND src_lat = $lat_1 AND src_lng = $lng_1";
	}
	$result = mysql_query($sql);
	$count = mysql_num_rows($result);
	if($count > 0) {
		return true;
	} else {
		return false;
	}
}

/*! @class get_item
 *@abstract returns a result set for the found item with given id
 */
function get_item($id){
	$sql = "SELECT * FROM location WHERE id=$id";
	$result = mysql_query($sql);
	return $result;
}

/*! @class getUserId
 *@abstract returns the user id that matches
 * the given username
 * returns empty if given usernameis not matched
 */
function getUserId($username) {
	$myId = "";
	
	$sql="SELECT id FROM account WHERE username='$username'";
	$result=mysql_query($sql);
	
	$array=mysql_fetch_array($result);
	
	// Mysql_num_row is counting table row
	$count=mysql_num_rows($result);
	
	// If result matched, table row must be 1 row
	if($count==1){
		$myId = $array['id'];
	}	
	return $myId;
}

/*! @class getUserId
 *@abstract returns the user name that matches
 * the given user id
 * returns empty if given userid is not matched
 */
function getUsername($userId) {
	$myName = "";
	$sql="SELECT username FROM account WHERE id='$userId'";
	$result=mysql_query($sql);
	
	$array=mysql_fetch_array($result);
	
	// Mysql_num_row is counting table row
	$count=mysql_num_rows($result);
	
	// If result matched, table row must be 1 row
	if($count==1){
		$myName = $array['username'];
	}	
	return $myName;
}

/*alternative to json_encode*/
if (!function_exists('json_encode'))
{
  function json_encode($a=false)
  {
    if (is_null($a)) return 'null';
    if ($a === false) return 'false';
    if ($a === true) return 'true';
    if (is_scalar($a))
    {
      if (is_float($a))
      {
        // Always use "." for floats.
        return floatval(str_replace(",", ".", strval($a)));
      }

      if (is_string($a))
      {
        static $jsonReplaces = array(array("\\", "/", "\n", "\t", "\r", "\b", "\f", '"'), array('\\\\', '\\/', '\\n', '\\t', '\\r', '\\b', '\\f', '\"'));
        return '"' . str_replace($jsonReplaces[0], $jsonReplaces[1], $a) . '"';
      }
      else
        return $a;
    }
    $isList = true;
    for ($i = 0, reset($a); $i < count($a); $i++, next($a))
    {
      if (key($a) !== $i)
      {
        $isList = false;
        break;
      }
    }
    $result = array();
    if ($isList)
    {
      foreach ($a as $v) $result[] = json_encode($v);
      return '[' . join(',', $result) . ']';
    }
    else
    {
      foreach ($a as $k => $v) $result[] = json_encode($k).':'.json_encode($v);
      return '{' . join(',', $result) . '}';
    }
  }
}

/*alternative to json_decode*/
if ( !function_exists('json_decode') ){
    function json_decode($content, $assoc=false){
                require_once 'JSON.php';
                if ( $assoc ){
                    $json = new Services_JSON(SERVICES_JSON_LOOSE_TYPE);
        } else {
                    $json = new Services_JSON;
                }
        return $json->decode($content);
    }
}

/*alternative to curl_setopt*/
if (!function_exists('curl_setopt_array')) {
   function curl_setopt_array(&$ch, $curl_options)
   {
       foreach ($curl_options as $option => $value) {
           if (!curl_setopt($ch, $option, $value)) {
               return false;
           } 
       }
       return true;
   }
}

//alternative to http build query
if (!function_exists('http_build_query')) {
    function http_build_query($data, $prefix='', $sep='', $key='') {
        $ret = array();
        foreach ((array)$data as $k => $v) {
            if (is_int($k) && $prefix != null) {
                $k = urlencode($prefix . $k);
            }
            if ((!empty($key)) || ($key === 0))  $k = $key.'['.urlencode($k).']';
            if (is_array($v) || is_object($v)) {
                array_push($ret, http_build_query($v, '', $sep, $k));
            } else {
                array_push($ret, $k.'='.urlencode($v));
            }
        }
        if (empty($sep)) $sep = ini_get('arg_separator.output');
        return implode($sep, $ret);
    }// http_build_query
}//if 

//check if given cookie matches the cookie stored in the database
function checkRemembered($cookie) {
	if ($cookie != ""){
		$sql="SELECT id FROM account WHERE cookie='$cookie'";
		$result=mysql_query($sql);
		
		// Mysql_num_row is counting table row
		$count=mysql_num_rows($result);
		
		// If result matched $myusername and $mypassword, table row must be 1 row
		if($count==1){
			echo "true";
		} else {
			echo "false";
		}
	}else{
		echo "false";
	}
}

//set sesssion for given cookie
//given cookile must store md5 encrypted username and password
function setSession($cookie) {
	$sql="SELECT id, username FROM account WHERE cookie='$cookie'";
	$result=mysql_query($sql);
	
	// Mysql_num_row is counting table row
	$count=mysql_num_rows($result);
	if($count==1){
		$array=mysql_fetch_array($result);
	} else {
		return false;
	}
	$_SESSION['my_id'] = $array['id'];	
	$_SESSION['myusername'] = $array['username'];
}

function smtpmailer($to, $subject, $body) { 
	global $error;
	$mail = new PHPMailer();  // create a new object
	$mail->IsSMTP(); // enable SMTP
	$mail->SMTPDebug = 0;  // debugging: 1 = errors and messages, 2 = messages only
	$mail->SMTPAuth = true;  // authentication enabled
	$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
	$mail->Host = 'smtp.gmail.com';
	$mail->Port = 465; 
	$mail->Username = 'kanepem.org@gmail.com';  
	$mail->Password = 'qwe321123';           
	//$mail->SetFrom($from, $from_name);
	$mail->SetFrom("nor'eply@kanepem.org" , "kanepem.org");
	$mail->Subject = $subject;
	$mail->Body = $body; 
	$mail->AddAddress($to);
	if(!$mail->Send()) {
		$error = 'Mail error: '.$mail->ErrorInfo; 
		return false;
	} else {
		$error = 'Message sent!';
		return true;
	}
}
?>
