<?php 
/*Include Essential PHP Functions*/
require_once("includes/functions.php");
//require_once("login.php");
?>

<head>
<!-- Include Style Sheets -->
<link rel="stylesheet" type="text/css" media="screen" href="css/myCSS.css">

<!--Include JavaScript -->
<!--Localhost key-->
<script type="text/javascript"
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDnKvm0utXHeIGflYObKlRVpzJvBJ6BWdE&sensor=true">
</script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript" src="js/jquery.form.js"></script>
<script type="text/javascript" src="js/custom-1.0.0.js"></script>
</head>
<body>

<div id="body" class="template-area">
  <div id="header">
    <div id="toplang">
      <ul>
        <li><a href="javascript:loadContent();">Tab 1</a></li>
        <li><a href ="">EN</a></li>
      </ul>
    </div>
    <div id="messagebar">
      <div class="entries"></div>
    </div>
    <div id="userbar">
      <div class="begin">
        <!-- -->
      </div>
      <ul class="loggedin">
        <li id="userbar-profile"><a href="">Profile</a></li>
        <li id="userbar-logout"><a href="logout.php">Logout</a></li>
      </ul>
      <ul class="unlogged"  style="display: none;">
        <li id="userbar-login"><a href="">Log in</a></li>
        <li id="userbar-signup"><a href="">Sign up</a></li>
      </ul>
      <div class="end">
        <!-- -->
      </div>
    </div>
    <div id="header-middle">
      <div id="header-logo">Company<span class="green">Logo</span></div>
      <ul>
        <li class="on"><a href=""><span>Map</span></a></li>
        <li><a href=""><span>Drivers</a></span></li>
        <li><a href=""><span>Hitch-Hikers</span></a></li>
        <li><a href=""><span>Reviews</span></a></li>
        <li><a href=""><span>Community</span></a></li>
      </ul>
      <div id="search"></div>
    </div>
  </div>
  <div id="main">
    <div id="content">
      <div id="content-area">
        <div id="filter-bar">
          <div class="filters">
            <div id="" class="filter">
              <div class="filter-end left"></div>
              <h3>
                <div class="headline-end left"></div>
                <div class="headline-body">Save Settings</div>
                <div class="headline-end right"></div>
              </h3>
              <div class="data"></div>
            </div>
            <div id="" class="filter">
              <div class="filter-end left"></div>
              <h3>
                <div class="headline-end left"></div>
                <div class="headline-body">Car Type</div>
                <div class="headline-end right"></div>
              </h3>
              <div class="data"></div>
            </div>
            <div id="" class="filter">
              <div class="filter-end left"></div>
              <h3>
                <div class="headline-end left"></div>
                <div class="headline-body">Min. Rating</div>
                <div class="headline-end right"></div>
              </h3>
              <div class="data"></div>
            </div>
            <div id="" class="filter">
              <div class="filter-end left"></div>
              <h3>
                <div class="headline-end left"></div>
                <div class="headline-body">Max. Price</div>
                <div class="headline-end right"></div>
              </h3>
              <div class="data"></div>
            </div>
            <div id="" class="filter">
              <div class="filter-end left"></div>
              <h3>
                <div class="headline-end left"></div>
                <div class="headline-body">Date & Time</div>
                <div class="headline-end right"></div>
              </h3>
              <div class="data"></div>
            </div>
          </div>
        </div>
        <div id="area">
          <div id="location">
            <div id="location-navi">
              <ul>
                <li id='location-navi-city' class="">Change City</li>
				<li id="location-navi-address" class="">Go To Address</li>
              </ul>
            </div>
            <div id="location-city" style="display:none;">
              <div class="location-close"></div>
              <div class="data">
                <div id="biggest-cities" class="section">
                  <h3>Available Cities</h3>
                  <div class="section-data">
                    <ul>
                      <li id="istanbul" class=""> <a href="">Istanbul</a> </li>
                      <li id="bursa" class=""> <a href="">Bursa</a> </li>
					  <li id="ankara" class=""> <a href="">Ankara</a> </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
			<div id="location-address" style="display:none;">
				<div class="location-close"</div>
				<div class="data">
					<div class="help">Center map on the following adress: </div>
					<form id="address-form">
						<div class="form-text">
							<input id="address-input" class="dimmed" type="text" name="address">
						</div>
						<div class="form-submit">
							<input id="address-submit" value="Search" type="submit">
						</div>
					</form>					
				</div>
			</div>
          </div>
		  <div id="map">
		  </div>
		</div>
        <div id="social">
          <div id="personal">
            <div id="reccomend"></div>
            <div id="activity"></div>
          </div>
        </div>
		<div id="right-panel">
			<div id="top-list">
			  <h3>Items visible on the map</h3>
			  <div id="top-list-controls" style="display:block"></div>
			  <div class="data">
			  
<!--			  	<a id="toplist_entry_9113" class="entry    open " href="http://eat.fi/eat/restaurant/go/9113">
					<div class="rating">4.6</div>
					<div class="icon"></div>
					<div class="category" id="category-1" title="Asian food">&nbsp;</div>
					<div class="label"><span>New Garden</span></div>
					<div class="descr" title="Kitchen is open"> &nbsp;</div>
				</a>
			  	<a id="toplist_entry_9113" class="entry    open " href="http://eat.fi/eat/restaurant/go/9113">
					<div class="rating">4.6</div>
					<div class="icon"></div>
					<div class="category" id="category-1" title="Asian food">&nbsp;</div>
					<div class="label"><span>New Garden</span></div>
					<div class="descr" title="Kitchen is open"> &nbsp;</div>
				</a>
			  	<a id="toplist_entry_9113" class="entry    open " href="http://eat.fi/eat/restaurant/go/9113">
					<div class="rating">4.6</div>
					<div class="icon"></div>
					<div class="category" id="category-1" title="Asian food">&nbsp;</div>
					<div class="label"><span>New Garden</span></div>
					<div class="descr" title="Kitchen is open"> &nbsp;</div>
				</a>
-->					<div class="entry ending"></div>	
			  </div>
			</div>
			<div id="news">
			  <div class="header">
				<h3>NEWS</h3>
			  </div>
			</div>
		</div>
      </div>
    </div>
  </div>
  <div id="footer"> </div>
</div>
</body>
</html>