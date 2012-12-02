<?

function SendForm() {
  global $PHP_SELF;
  
?>
  <FORM ACTION="<?PHP echo $PHP_SELF."?act=sended"; ?>" METHOD="post">
    <H3>Mesaj Gör</H3>
    Kimden:<BR>
    <INPUT TYPE="text" NAME="sender"    VALUE="" SIZE="50"><BR><BR>
    Kime:<BR>
    <INPUT TYPE="text" NAME="toaddress" VALUE="" SIZE="50"><BR><BR>
    Konu:<BR>
    <INPUT TYPE="text" NAME="subject"   VALUE="" SIZE="50"><BR><BR>
    Mesaj:<BR>
    <TEXTAREA NAME="body" COLS="50" ROWS="10"></TEXTAREA><BR><BR>
    <INPUT TYPE="submit" NAME="Submit" VALUE="Gör">
  </FORM>    
<?

}

//---------------------------------------------------------- begin:  

  if(!isset($act)) $act="send";
  
  switch($act) {
    case "send":
      SendForm();
      break;

    case "sended":
      if(empty($toaddress)) {
        echo "Hata. Mesajýe görileceðelirtilmemiþ...";
        exit;
      }

      if(!isset($subject)) $subject="";
      if(!isset($body))    $body="";      
      empty($sender) ? $otherheaders="" : $otherheaders='From: '.$sender;
      
      $res=mail(
             $toaddress, // kime
             $subject,   // konu
             $body,      // mesaj
             $otherheaders
           );

      if(!$res)
        echo "Hata. Mesajýörirken hata oluþtu...";
      else 
        echo "Mesajýörildi...";
      
      break;

  }

?> 
