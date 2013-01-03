
var COLORS = [["red", "#ff0000"], ["orange", "#ff8800"], ["green","#008000"],
              ["blue", "#000080"], ["purple", "#800080"]];
var options = {};
var lineCounter_ = 0;
var shapeCounter_ = 0;
var markerCounter_ = 0;
var colorIndex_ = 0;
var featureTable_;
var map;
var marker;

function select(buttonId) {
  document.getElementById("hand_b").className="unselected";
  /*document.getElementById("shape_b").className="unselected";
  document.getElementById("line_b").className="unselected";*/
  document.getElementById("placemark_b").className="unselected";
  document.getElementById(buttonId).className="selected";
}

function stopEditing() {
  select("hand_b");
}

function getColor(named) {
  return COLORS[(colorIndex_++) % COLORS.length][named ? 0 : 1];
}

function getIcon(color) {
  var icon = new GIcon();
  icon.image = "http://google.com/mapfiles/ms/micons/" + color + ".png";
  icon.iconSize = new GSize(32, 32);
  icon.iconAnchor = new GPoint(15, 32);
  return icon;
}

function startShape() {
  select("shape_b");
  var color = getColor(false);
  var polygon = new GPolygon([], color, 2, 0.7, color, 0.2);
  startDrawing(polygon, "Shape " + (++shapeCounter_), function() {
    var cell = this;
    var area = polygon.getArea();
    cell.innerHTML = (Math.round(area / 10000) / 100) + "km<sup>2</sup>";
  }, color);
}

function startLine() {
  select("line_b");
  var color = getColor(false);
  var line = new GPolyline([], color);
  startDrawing(line, "Line " + (++lineCounter_), function() {
    var cell = this;
    var len = line.getLength();
    cell.innerHTML = (Math.round(len / 10) / 100) + "km";
  }, color);
}

function startDrawing(poly, name, onUpdate, color) {
  map.addOverlay(poly);
  poly.enableDrawing(options);
  poly.enableEditing({onEvent: "mouseover"});
  poly.disableEditing({onEvent: "mouseout"});
  GEvent.addListener(poly, "endline", function() {
    select("hand_b");
    GEvent.bind(poly, "lineupdated", cells.desc, onUpdate);
    GEvent.addListener(poly, "click", function(latlng, index) {
      if (typeof index == "number") {
        poly.deleteVertex(index);
      } else {
        var newColor = getColor(false);
        cells.color.style.backgroundColor = newColor
        poly.setStrokeStyle({color: newColor, weight: 4});
      }
    });
  });
}

function placeMarker() {
	select("placemark_b");
		var listener = GEvent.addListener(map, "click", function(overlay, latlng) {
			if (latlng) {
				select("hand_b");
				GEvent.removeListener(listener);
		  
				//------------------create marker---------------------		
				setMarkerIcon(latlng);
				map.clearOverlays();
				map.addOverlay(marker);
				//----------------------------------------------------	  
	
				updateMarker(marker);
				GEvent.addListener(marker, "dragend", function() {
					updateMarker(marker);
				});
				GEvent.addListener(marker, "click", function() {
					updateMarker(marker);
				});
			}
		});
	}

function setMarkerIcon(latlng) {
	//create the icon
	switch(main.addItem.mode)
	{
	case "add_car":
		var myIcon = new GIcon();
		myIcon.image = '../images/markers/car/image.png';
		myIcon.shadow = '../images/markers/car/shadow.png';
		myIcon.iconSize = new GSize(20,18);
		myIcon.shadowSize = new GSize(29,18);
		myIcon.iconAnchor = new GPoint(10,18);
		myIcon.infoWindowAnchor = new GPoint(10,0);
		myIcon.printImage = '../images/markers/car/printImage.gif';
		myIcon.mozPrintImage = '../images/markers/car/mozPrintImage.gif';
		myIcon.printShadow = '../images/markers/car/printShadow.gif';
		myIcon.transparent = '../images/markers/car/transparent.png';
		myIcon.imageMap = [14,0,17,1,18,2,19,3,19,4,19,5,19,6,19,7,19,8,19,9,19,10,19,11,19,12,19,13,19,14,19,15,19,16,16,17,3,17,1,16,0,15,0,14,0,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,0,4,0,3,1,2,2,1,5,0];
		marker=new GMarker(latlng ,{
							icon:myIcon,
							draggable:true,
							clickable:true});
	break;
	case "add_home":
		var myIcon = new GIcon();
		myIcon.image = '../images/markers/home/image.png';
		myIcon.shadow = '../images/markers/home/shadow.png';
		myIcon.iconSize = new GSize(20,18);
		myIcon.shadowSize = new GSize(29,18);
		myIcon.iconAnchor = new GPoint(10,18);
		myIcon.infoWindowAnchor = new GPoint(10,0);
		myIcon.printImage = '../images/markers/home/printImage.gif';
		myIcon.mozPrintImage = '../images/markers/home/mozPrintImage.gif';
		myIcon.printShadow = '../images/markers/home/printShadow.gif';
		myIcon.transparent = '../images/markers/home/transparent.png';
		myIcon.imageMap = [14,0,17,1,18,2,19,3,19,4,19,5,19,6,19,7,19,8,19,9,19,10,19,11,19,12,19,13,19,14,19,15,19,16,16,17,3,17,1,16,0,15,0,14,0,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,0,4,0,3,1,2,2,1,5,0];
		marker=new GMarker(latlng ,{
							icon:myIcon,
							draggable:true,
							clickable:true});
	break;
	case "req_car":
		var myIcon = new GIcon();
		myIcon.image = '../images/markers/hitchhike/image.png';
		myIcon.shadow = '../images/markers/hitchhike/shadow.png';
		myIcon.iconSize = new GSize(20,18);
		myIcon.shadowSize = new GSize(29,18);
		myIcon.iconAnchor = new GPoint(10,18);
		myIcon.infoWindowAnchor = new GPoint(10,0);
		myIcon.printImage = '../images/markers/hitchhike/printImage.gif';
		myIcon.mozPrintImage = '../images/markers/hitchhike/mozPrintImage.gif';
		myIcon.printShadow = '../images/markers/hitchhike/printShadow.gif';
		myIcon.transparent = '../images/markers/hitchhike/transparent.png';
		myIcon.imageMap = [14,0,17,1,18,2,19,3,19,4,19,5,19,6,19,7,19,8,19,9,19,10,19,11,19,12,19,13,19,14,19,15,19,16,16,17,3,17,1,16,0,15,0,14,0,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,0,4,0,3,1,2,2,1,5,0];
		marker=new GMarker(latlng ,{
							icon:myIcon,
							draggable:true,
							clickable:true});
	break;
	case "req_home":
		var myIcon = new GIcon();
		myIcon.image = '../images/markers/baggage/image.png';
		myIcon.shadow = '../images/markers/baggage/shadow.png';
		myIcon.iconSize = new GSize(20,18);
		myIcon.shadowSize = new GSize(29,18);
		myIcon.iconAnchor = new GPoint(10,18);
		myIcon.infoWindowAnchor = new GPoint(10,0);
		myIcon.printImage = '../images/markers/baggage/printImage.gif';
		myIcon.mozPrintImage = '../images/markers/baggage/mozPrintImage.gif';
		myIcon.printShadow = '../images/markers/baggage/printShadow.gif';
		myIcon.transparent = '../images/markers/baggage/transparent.png';
		myIcon.imageMap = [14,0,17,1,18,2,19,3,19,4,19,5,19,6,19,7,19,8,19,9,19,10,19,11,19,12,19,13,19,14,19,15,19,16,16,17,3,17,1,16,0,15,0,14,0,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,0,4,0,3,1,2,2,1,5,0];
		marker=new GMarker(latlng ,{
							icon:myIcon,
							draggable:true,
							clickable:true});
	break;
	default:
		marker=new GMarker(latlng ,{
							draggable:true,
							clickable:true});
	}	
}

function updateMarker(marker, cells, opt_changeColor) {
  if (opt_changeColor) {
    var color = getColor(true);
    marker.setImage(getIcon(color).image);
    //cells.color.style.backgroundColor = color;
  }
  var latlng = marker.getPoint();
  main.addItem.wizard.data.latitude = latlng.lat();
  main.addItem.wizard.data.longitude = latlng.lng();
 // cells.desc.innerHTML = "(" + Math.round(latlng.y * 100) / 100 + ", " +
 // Math.round(latlng.x * 100) / 100 + ")";
}

function initialize() {
  if (GBrowserIsCompatible()) {
    map = new GMap2(document.getElementById("map"));
	lat = $("#frame-content input[name=lat]").val();
	lng = $("#frame-content input[name=lng]").val();
    map.setCenter(new GLatLng(lat, lng), 15);
    map.addControl(new GSmallMapControl());
    map.addControl(new GMapTypeControl());
		
    map.clearOverlays();
    featureTable_ = document.getElementById("featuretbody");
    select("hand_b");
  }
}
  
$(document).ready(function(){
	initialize();						
});