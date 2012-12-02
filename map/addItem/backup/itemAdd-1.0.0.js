main.addItem={
	mode:null,
	init:function(){
		this.location.init();
		this.controls.init();
	},
	controls:{
		dom:{
			send:null,
			cancel:null
		},
		init:function(){
			var A = this;
			this.dom.send=$("#submit");
			this.dom.cancel=$("#cancel");
			this.dom.send.bind("click",function(){A.sendItem();});
		},
		sendItem:function(){
		$("#form").validationEngine({
			promptPosition: "topLeft",
			success:function(){
				$("#form").bind("submit",function(){
					var name = $("input#location-name").val();
					var lat = main.addItem.location.latitude;
					var lng = main.addItem.location.longitude;
					var dataString = 'name='+ name + '&lat=' + lat + '&lng=' + lng;
					alert(dataString);
					$.post(	settings.addItemUrl,
							dataString,
							function(data){
								if(data.success){							  
									$('#message').html("<h2>Item Submitted!</h2>");
								}else{
									alert("error: " + data.errormessage);
									$('#message').html(data.errormessage);
								}
							},
							"json");
				return false});}
			})
		}
	},
	location:{
		map:null,
		address:null,
		latitude:null,
		longitude:null,
		marker:null,
		init:function(){
			var A=this;
			if(GBrowserIsCompatible()&&$("#gmap").length>0){
				this.map=new GMap2($("#gmap")[0]);
				this.map.addControl(new GSmallMapControl());
				this.map.setCenter(new GLatLng(this.latitude,this.longitude),15);
				
				//------------------create marker---------------------
				
				//first, create the icon
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
					this.marker=new GMarker(new GLatLng(this.latitude,this.longitude),{
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
					this.marker=new GMarker(new GLatLng(this.latitude,this.longitude),{
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
					this.marker=new GMarker(new GLatLng(this.latitude,this.longitude),{
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
					this.marker=new GMarker(new GLatLng(this.latitude,this.longitude),{
										icon:myIcon,
										draggable:true,
										clickable:true});
					break;
				default:
					this.marker=new GMarker(new GLatLng(this.latitude,this.longitude),{
										draggable:true,
										clickable:true});
				}								

				this.map.addOverlay(this.marker);
				GEvent.addListener(this.map,"click",function(C,B){if(!C){
																	A.updatePosition(B);
																	A.marker.setPoint(B)
																}});
				GEvent.addListener(this.marker,"dragend",function(){
																  main.addItem.location.updatePosition(main.addItem.location.marker.getPoint())
																  });
				$(window).unload(function(B){
										  GUnload()
										  })
			}
		},
		moveAndCenter:function(){
			var A=new GLatLng(	this.latitude,
								this.longitude);
			this.marker.setPoint(A);
			this.map.setCenter(A)},
		updatePosition:function(A){
				var B=this;
				this.latitude = A.lat();
				this.longitude = A.lng();
				window.setTimeout(function(){
										   B.moveAndCenter()
										   },100)
			},
		resolveAddress:function(B){
				var A=this;
				var C=new GClientGeocoder();
				if(this.address!=""){
					C.getLocations(this.address,function(D){
														 var E=A.map;
														 if(D.Placemark){
															 place=D.Placemark[0];
															 point=new GLatLng(place.Point.coordinates[1],place.Point.coordinates[0]);
															 E.setCenter(point);
															 $("#latitude").val(place.Point.coordinates[1]);
															 $("#longitude").val(place.Point.coordinates[0]);
															 A.init();
															 if(B=="city"){
																 alert(__("Item.add.location.address.invalidaddress"))
															 }
														}else{
															if(B=="city"){
																E.setCenter(new GLatLng(60.1659,24.9382),13);
																alert(__("Item.add.location.address.invalidcity"))
															}else{
																A.address=$("input[name=city]").val()+", Finland";
																A.resolveAddress("city")
															}
														}
													})
				}
			}
	}
};
	
$(document).ready(function(){
	main.addItem.init()
});