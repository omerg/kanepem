/***********global variables*************/
//debug mode switch
var DEBUG_MODE = new Boolean(true);

//google map and geocoder elements are global
var map = null;
var geocoder = null; 

/*******Debugging Utils******************/
	
// simple logger
function log(message) {
	if(DEBUG_MODE == true) {
		if(window.console) {
     		console.debug(message);
  		} else {
     		alert(message);
  		}
 	}
};
	
//simple utility to display elapsed time
//in an encapsulated code block
function benchmark(s,d) {
	log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
}

//var processTime = new Date(); 
//benchmark("Data sent, processed, received: ", processTime);

/******endOf: Debugging Utils ***********/

jQuery(document).ready(function() {
	
//load google map
gmap_init(); 	

//update sidebar on move event
google.maps.event.addListener(map, "moveend", function() {
											
	//remove all existing markers
	map.clearOverlays(); 
														
	//get map bounds
	var bounds = map.getBounds();
	var southWest = bounds.getSouthWest();
	var northEast = bounds.getNorthEast();

	log("lat_1:" + northEast.lat());
	log("lng_1:" + southWest.lng());
	log("lat_2:" + southWest.lat());
	log("lng_2:" + northEast.lng());
		
	//load content
	$("#top-list").children(".data").load("includes/sidebar.php", { 
            'lat_1':northEast.lat(), 
            'lng_1':southWest.lng(), 
            'lat_2':southWest.lat(), 
            'lng_2':northEast.lng()});
	
	var node = $('#top-list').children(".data").children();
	log("nr of child nodes= " + node.length);
	
	jQuery.each(node, function() {
		log($(this).children("#latitude").text());
		log($(this).children("#longitude").text());
		
		var lat = $(this).children("#latitude").text();
		var lng = $(this).children("#longitude").text();
		
		var point = new google.maps.LatLng(lat, lng);
		map.addOverlay(new google.maps.Marker(point));
	});

});

//select cities
//TODO: traverse DOM instead of switch
$("#location-city").find("li").click(function() {
	var button_id = $(this).attr("id");
	var mypoint;
	log(button_id);
	switch(button_id)
		{
			case "istanbul":
				showAddress("istanbul");
			break;
			case "bursa":
				showAddress("bursa");
			break;
			case "ankara":
				showAddress("ankara");
			break;
			default:
				showAddress("istanbul");
		}
	return false;
	});

//toggle navigation-city panel
$("#location-navi-city").toggle(function() {
		$('#location-city').attr('style', 'display:block;'); 
	}, function() {
		$('#location-city').attr('style', 'display:none;'); 
	});

//toggle navigation-adress panel
$("#location-navi-address").toggle(function() {
		$('#location-address').attr('style', 'display:block;'); 
	}, function() {
		$('#location-address').attr('style', 'display:none;'); 
	});
	
//process adress-form data	
$("#address-form").ajaxForm(function() { 
		log("form data is being processed...");
		var address = document.getElementById("address-input").value;
		log("Address is: " + address);
		showAddress(address);
	}); 
});

$(window).unload(function() {
	log('Handler for .unload() called.');	
	//unload google map
	google.maps.Unload();
});

//initilaize Google Map
function gmap_init() {
    
    var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(-33, 151),
    panControl: false,
    zoomControl: false,
    scaleControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

    //initialize google map
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //initialize geocoder
        geocoder = new google.maps.Geocoder();

    showAddress("istanbul");

    //cancel default controls
    //map.setUIToDefault();
}

function showAddress(address) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            ParseLocation(results[0].geometry.location);

        }
        else
          alert('error: ' + status);
    });
 }

function ParseLocation(location) {

      var lat = location.lat().toString().substr(0, 12);
      var lng = location.lng().toString().substr(0, 12);

}