<?php
session_start();

// Setting the Content-Type header with charset
header('Content-Type: text/html; charset=utf-8');

require_once("functions.php");

debecho("facebook.php enter");


define('FACEBOOK_APP_ID', '162140380468960');
define('FACEBOOK_SECRET', 'a6a017414c36de62af2d0d1a8a57e1a7');

function get_facebook_cookie($app_id, $application_secret) {
  $args = array();
  parse_str(trim($_COOKIE['fbs_' . $app_id], '\\"'), $args);
  ksort($args);
  $payload = '';
  foreach ($args as $key => $value) {
    if ($key != 'sig') {
      $payload .= $key . '=' . $value;
    }
  }
  if (md5($payload . $application_secret) != $args['sig']) {
    return null;
  }
  return $args;
}

//get username from fb user id
function fb_getUsername($fb_uid) {
	$myName = "";
	$sql="SELECT username FROM account WHERE fb_uid='$fb_uid'";
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

/**
* Makes an HTTP request. This method can be overriden by subclasses if
* developers want to do fancier things or use something other than curl to
* make the request.
*
* @param String $url the URL to make the request to
* @param Array $params the parameters to use for the POST body
* @param CurlHandler $ch optional initialized curl handle
* @return String the response text
*/
function makeRequest($url, $params, $ch=null) {
	debecho("makeRequest enter");
	if (!function_exists('curl_init')) {
		return "makeRequest function cannot operate because curl_init doesnt exist";
	}
    if (!$ch) {
      $ch = curl_init();
    }
	$cookie = get_facebook_cookie(FACEBOOK_APP_ID, FACEBOOK_SECRET);
	
	$params['access_token'] = $cookie['access_token'];
	$params['method'] = "GET";

	/**
	* Default options for curl.
	*/
	$CURL_OPTS = array(
		CURLOPT_CONNECTTIMEOUT => 10,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_TIMEOUT        => 60,
		CURLOPT_USERAGENT      => 'facebook-php-2.0',
	);

    $opts = $CURL_OPTS;
   	$opts[CURLOPT_POSTFIELDS] = http_build_query($params, null, '&');

    $opts[CURLOPT_URL] = $url;

    curl_setopt_array($ch, $opts);
	$result = curl_exec($ch);
	debecho($result);
    if ($result== false) { 
		debecho(curl_error($ch) . "<br>"); 
	}

	// Check for curl errors
	if ( $error = curl_error($ch) ) {
		debecho('ERROR: ' . $error);
	}
    curl_close($ch);
	debecho("makeRequest exit");
	return $result;
}

debecho("facebook.php exit");
?>