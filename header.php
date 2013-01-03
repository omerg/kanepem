<a href="../map"><div id="header-logo"></div></a>
<div id="header">
    <div id="messagebar">
      <div class="entries">
	  </div>
    </div>
    <div id="userbar">
		<div id="facebook-login">
			<p><fb:login-button perms="email"></fb:login-button></p>
		</div>
      <ul class="loggedin" style="display: none;">
        <li id="userbar-profile">Profile</li>
        <li id="userbar-logout"><a href="">Logout</a></li>
      </ul>
      <ul style="" class="unlogged">
        <li id="userbar-login"><a href="../user/login.php">Log in</a></li>
        <li id="userbar-signup"><a id="header-signup-button" class="iframe" href="../user/signup/">Sign up</a></li>
      </ul>
      <div class="end">
      </div>
    </div>
    <div id="header-middle">
	  <div id="header-links"  class="content-box-header">
      <ul>
        <li id="header-link-map"><a href="../map"><span>harita</span></a></li>
        <li id="header-link-homes"><a href="../item/home"><span>evler</span></a></li>
        <li id="header-link-cars"><a href="../item/car"><span>arabalar</span></a></li>
        <li id="header-link-community"><a href="../community"><span>forum</span></a></li>
		<!--<li id="header-link-events"><a href="../events"><span>etkinlikler</span></a></li>-->
		<li id="header-link-profile"><a href="../profile/<?php echo $_SESSION['myusername'];?>"><span>profilim</span></a></li>
        <li id="header-link-inbox" style="display:none"><a href="../message"><span>mesajlar</span></a></li>
      </ul>
	  </div>
      <div id="search"></div>
    </div>
  </div>