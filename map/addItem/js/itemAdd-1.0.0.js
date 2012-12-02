var main = {};
main.addItem={
	mode:null,
	init:function(){
		this.wizard.init();
	},
	wizard:{
		dom:{},
		data:{
			item_type:null,
			
			//data from step 1
			street_address:null,
			postcode:null,
			city:null,
			phone:null,
			email:null,
			src_latitude:null,
			src_longitude:null,
			dst_latitude:null,
			dst_longitude:null,
			
			//data from step 2
			start_date:null,
			end_date:null,
			
			//data from step 3
			title:null,
			description:null,
			features:0,
			
			//data from step 4
			//blocked[]
		},
		activeStep:null,
		init:function(){
			var A=this;
			this.dom.core = $("#frame-content");
			this.dom.form=$("#frame-content form");
			this.dom.progress=$("#add-item-progress");
			this.data.item_type = $("#frame-content input[name=type]").val();
			this.selectStep(1,true);
			$("#form-actions-entries input[name=submit]").bind("click",function(){
																				A.selectStep(A.activeStep + 1);
																				});
			$("#form-actions-entries input[name=previous]").bind("click",function(){
																				  A.selectStep(A.activeStep - 1, true);
																				  $.validationEngine.closePrompt('.formError',true)
																				  });
			$("#entry-hide input[name=hide]").bind("keyup",function(e){
																				if(e.which == 188){
																					//crop comma
																					var myStr = $("#entry-hide input[name=hide]").val();
																					var strLen = myStr.length;
																					myStr = myStr.slice(0,strLen-1); 
																					A.addToBlockList(myStr);
																				 }
																				  });			
			$("#block_user").bind("click",function(){
																				  A.addToBlockList($("#entry-hide input[name=hide]").val());
																				  });
		},
		selectStep:function(A, B){
			var C=this.activeStep;
			if(this.validateStep(C)|| B){
				this.collectStepData(C);
				this.showStep(A)
			}
		},
		showStep:function(A){
			var B =this;
			if (main.addItem.mode == "add_link") {
				if(A != 0) {
					 if(A == 3) {
						 $("#form-entry-features").fadeOut(500);
						 $("#add-item-content-step-2").fadeOut(500,function(){
						 B.submitForm()});
					 } else {
						if(B.activeStep){
							$("#content-title h2").fadeOut(500, function(){
								if(A == 1){
									$("#content-title h2").html("Tabela Yeri Belirle").fadeIn(500);
								} else if(A == 2){
									$("#content-title h2").html("Tabelanin Gösterecegi Yer").fadeIn(500);
								}
							});
							$("#add-item-content-step-1").fadeOut(500,function(){$("#add-item-content-step-2").fadeIn(500)});
							$("#restaurant-add-step-content-"+A).show()
						}
						$("add-item-content-step-1").addClass("active");
						this.activeStep=A
					 }
				}
			} else {
				if(A != 0){
					 if(A == 5) {
						 $("#add-item-content-step-"+this.activeStep).fadeOut(500,function(){
						 B.submitForm()});
					 } else {
						if(this.activeStep){	
							$("#content-title h2").fadeOut(500, function(){
								if(A == 1){
									$("#content-title h2").html("Location and Contact Info").fadeIn(500);
								} else if(A == 2){
									$("#content-title h2").html("Applicable Times").fadeIn(500);
								} else if(A ==3){
									$("#content-title h2").html("Description").fadeIn(500);
								} else if(A ==4){
									$("#content-title h2").html("Privacy Settings").fadeIn(500);
								}
							});
							$("#add-item-content-step-"+this.activeStep).fadeOut(500,function(){$("#add-item-content-step-"+A).fadeIn(500)});
							$("#restaurant-add-step-content-"+A).show()
						}
						$("add-item-content-step-"+A).addClass("active");
						this.activeStep=A
					 }
				}
			}
		},
		validateStep:function(C){
			var A = this;
			var B=true;
			if(C==1){
				if(main.addItem.mode != "add_link") {
					if(
						$.validationEngine.loadValidation("#street_address") ||
						$.validationEngine.loadValidation("#post_code") ||
						$.validationEngine.loadValidation("#city") ||
						$.validationEngine.loadValidation("#email") 
						)
					{
						return false;
					}
				} else {
					if(	$.validationEngine.loadValidation("#title") ) {
						return false;
					}
				}
				if(cur_lat == null || cur_lng == null){
					alert("Please select a location from the map");
					return false;
				}
			}
			else if(C==2){
				if(main.addItem.mode != "add_link") {
					if(	$.validationEngine.loadValidation("#start_date") ||
						$.validationEngine.loadValidation("#end_date") ) {
						return false;
					}
				} else {
					if(cur_lat == null || cur_lng == null){
						alert("Please select a location from the map");
					return false;
				}
				}
			}
			else if(C==3){
				if(	$.validationEngine.loadValidation("#title") ) {
					return false;
				}
			}
			return B
		},
		collectStepData:function(C){
			var A = this;
			if(C==1){
				if (main.addItem.mode == "add_link") {
					A.data.title=$("#entry-title input").val();
					A.data.description=$("#entry-description textarea").val();
				} else {
					A.data.street_address=$("#entry-address input").val();
					A.data.postcode=$("#entry-postcode input").val();
					A.data.city=$("#entry-city input").val();
					A.data.phone=$("#entry-phone input").val();
					A.data.email=$("#entry-email input").val();
				}
				A.data.src_latitude = cur_lat;
				A.data.src_longitude = cur_lng;
				
				cur_lat = null;
				cur_lng = null;
			}
			else if(C==2){
				if (main.addItem.mode == "add_link") {
					A.data.dst_latitude = cur_lat;
					A.data.dst_longitude = cur_lng;
					A.data.street_address=$("#entry-address input").val();
					A.data.postcode=$("#entry-postcode input").val();
					A.data.city=$("#entry-city input").val();
				} else {
					A.data.start_date=$("#entry-start-date input").val();
					A.data.end_date=$("#entry-end-date input").val();
				}
			}
			else if(C==3){
				A.data.title=$("#entry-title input").val();
				A.data.description=$("#entry-description textarea").val();
				var tmp_1 = ($("#form input[name=feature-1]").attr("checked")?10000000:0);
				var tmp_2 = ($("#form input[name=feature-2]").attr("checked")?1000000:0);
				var tmp_3 = ($("#form input[name=feature-3]").attr("checked")?100000:0);
				var tmp_4 = ($("#form input[name=feature-4]").attr("checked")?10000:0);
				var tmp_5 = ($("#form input[name=feature-5]").attr("checked")?1000:0);
				var tmp_6 = ($("#form input[name=feature-6]").attr("checked")?100:0);
				var tmp_7 = ($("#form input[name=feature-7]").attr("checked")?10:0);
				var tmp_8 = ($("#form input[name=feature-8]").attr("checked")?1:0);
				A.data.features = tmp_1 + tmp_2 + tmp_3 + tmp_4 + tmp_5 + tmp_6 + tmp_7 + tmp_8;
				delete tmp_1, tmp_2, tmp_3, tmp_4, tmp_5, tmp_6, tmp_7, tmp_8;
			}
			else {}
		},
		submitForm:function(){
			var A =this;
			this.progress("show", function(){
				$.post(				
					mySettings.addItemUrl,
					A.data,
					function(B){
						if(B.success){
								window.setTimeout(function(){
									A.progress("hide",function(){
										alert("Adding item was succesfull");
										if(parent.$.fancybox){
											parent.$.fancybox.close();
										}
									})
								},1100);		
						}else{
							A.progress("hide",function(){
													alert("Adding item was not succesfull"); 
													alert(B.errormessage);
						})
					}
					},
					"json")
})
			},
		progress:function(C,B){
			var A=this;
			if(C=="show"){
				this.dom.progress.fadeIn(250,B)
			}else{
				window.setTimeout(function(){
					A.dom.progress.fadeOut(250,B)
								},1000)
			}
		},
		findAddress:function(){
			if(this.activeStep == 1) {
				var A=$("#entry-address input").val();
				var B=$("#entry-postcode input").val();
				var C=$("#entry-city input").val();
				var address = A +", " + B + ", " + C;
			} else {
				var A=$("#entry-address-step-2 input").val();
				var B=$("#entry-postcode-step-2 input").val();
				var C=$("#entry-city-step-2 input").val();
				var address = A +", " + B + ", " + C;	
			}
			this.resolveAddress(address)
		},
		resolveAddress:function(B){
			var A=this;
			var C=new GClientGeocoder();
			if(B!=""){
				C.getLocations(B,function(D){
					 if(D.Placemark){
						var place=D.Placemark[0];
						var point=new GLatLng(place.Point.coordinates[1],place.Point.coordinates[0]);		
						setMarkerIcon(point);
						map.clearOverlays();
    					map.addOverlay(marker);
						map.setCenter(point,16);
						var color = getColor(true);
						//var cells = addFeatureEntry("Placemark " + (++markerCounter_), color);
      					updateMarker(marker);
					} else {
						alert("Address not found");
					}
				})
			}
		},
		showCurrentLocation:function(B){
			navigator.geolocation.getCurrentPosition(function(C){
				var point=new GLatLng(C.coords.latitude,C.coords.longitude);		
				setMarkerIcon(point);
				map.clearOverlays(); 
    			map.addOverlay(marker);
				map.setCenter(point,16);
			},
			function(C){A()});
			window.setTimeout(function(){A()},10000);
			var A=function(){}
		},
		addToBlockList:function(inputString){
   			if(inputString.length != 0) {
				$.post(
					mySettings.toLookUpUrl,
					{queryString: ""+inputString+""},
					function(data){
						if(data.success && data.show.length == 1) {
							$("#hide-list-container").fadeIn(200);
							var content = "<li>" + inputString + "</li>";
							$(content).hide().appendTo("#hide-list").fadeIn();
						}
						$("#entry-hide input[name=hide]").val("");
					},
					"json"
				);
			}
		},		
	}
};
	
$(document).ready(function(){
	main.addItem.init();
});

$(function() {
	if($('#end_date, #start_date').length) {
		$('#end_date, #start_date').datepicker({
			duration: '',
			dateFormat: 'yy-mm-dd',
			showTime: true,
			constrainInput: false,
			stepMinutes: 1,
			stepHours: 1,
			altTimeField: '',
			time24h: true
		 });
	}
});