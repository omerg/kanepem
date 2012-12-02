<?php

//session_start();
require_once("../includes/start_session.php");
require_once("../includes/functions.php");

$a = array(); //main array to encode
$a['success'] = true;

function createThumbs( $srcImage, $pathToThumbs, $thumbWidth )
{
	// open the directory
	$pathToImages = dirname($srcImage);
	$fname = basename($srcImage);
	// parse path for the extension
    $info = pathinfo($pathToImages . $fname);
	// continue only if this is a JPEG pr PNG image
    if ( strtolower($info['extension']) == 'jpg' || strtolower($info['extension']) == 'jpeg')
    {
		$img = imagecreatefromjpeg($pathToImages. "/" . $fname);
	} else if ( strtolower($info['extension']) == 'png' ) {
		$img = imagecreatefrompng($pathToImages. "/" . $fname);
	} else {
		return false;
	}
	$width = imagesx( $img );
	$height = imagesy( $img );

	// calculate thumbnail size
	$new_width = $thumbWidth;
	$new_height = floor( $height * ( $thumbWidth / $width ) );

	// create a new temporary image
	$tmp_img = imagecreatetruecolor( $new_width, $new_height );

	// copy and resize old image into new image
	imagecopyresized( $tmp_img, $img, 0, 0, 0, 0, $new_width, $new_height, $width, $height );

	$tmbname = "tn_" . $fname;

	// save thumbnail into a file
	imagejpeg( $tmp_img, "{$pathToThumbs}{$tmbname}" );
	return  true;}

//profile information sent from signup form 
$user_id = $_SESSION['my_id'];
$name=$_POST['name'];
$surname=$_POST['surname'];
$description=$_POST['description'];

//****************if exists, update. else, insert**********************
$sql="SELECT id FROM profile WHERE user_id='$user_id'";
$result=mysql_query($sql);
$array=mysql_fetch_array($result);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);

// If result matched $myusername and $mypassword, table row must be 1 row
if($count==1){
	$sql="UPDATE profile SET name='$name', surname='$surname', description='$description' WHERE user_id='$user_id'";
} else {
	$sql="INSERT INTO profile (user_id, name, surname, description) VALUES('$user_id', '$name', '$surname', '$description')";
}

// execute sql
if (!mysql_query($sql)) {
	//echo mysql_error();
	$a['errormessage'] = mysql_error();
	$a['success'] = false;
}
//**********************************************************************

//**********************insert photo************************************
if (isset($_FILES['upload']) && $_FILES['upload']['size'] > 0) { 
	
	//get the size of the image in bytes
	//$_FILES['image']['tmp_name'] is the temporary filename of the file in which the uploaded file was stored on the server
	$size=filesize($_FILES['upload']['tmp_name']);
	
	//we will give an unique name, for example the id of user
	$image_name=$user_id.'.jpg';
	
	//the new name will be containing the full path where will be stored (images folder)
	$newname="../uploads/pics/".$image_name;
	
	$copied = copy($_FILES['upload']['tmp_name'], $newname);
	if (!$copied)
	{
		$a['errormessage'] = "Copy unsuccessfull";
		$a['success'] = false;
	}

	//create a thumbnail
	if(!createThumbs("../uploads/pics/" .$image_name,"../uploads/thumbs/",100)) {
		$a['errormessage'] = "Create thumbs error";
		$a['success'] = false;
	}
//************************************************************************
	
	// Temporary file name stored on the server
	$tmpName  = $_FILES['upload']['tmp_name'];  
	
	// Read the file 
	$fp      = fopen($tmpName, 'r');
	$image = fread($fp, filesize($tmpName));
	$image = addslashes($image);
	fclose($fp);
	
	$img_type = $_FILES['upload']['type'];
	$img_size = $_FILES['upload']['size'];
	$img_name = $_FILES['upload']['tmp_name'];
	
	// Create the query and insert
	// into our database.
	$sql = "INSERT INTO user_image ";
	$sql .= "(user_id, image_type, image, image_size, image_name) VALUES ('$user_id', '$img_type', '$image', '$img_size', '$img_name')";

	// execute sql
	if (!mysql_query($sql)) {
		//echo mysql_error();
		$a['errormessage'] = mysql_error();
		$a['success'] = false;
	} else {
		//add photo id to that person's profile
		
		$sql="UPDATE profile, user_image SET profile.picture_id = user_image.id WHERE user_image.id = " . mysql_insert_id();
      	if (!mysql_query($sql)) {
			//echo mysql_error();
			$a['errormessage'] = mysql_error();
			$a['success'] = false;
		}
	}
} else {
  $a['errormessage'] = "No image selected/uploaded";
  //$a['success'] = false;
}
print json_encode($a); //encode in JSON and return to our ext2 application
?>