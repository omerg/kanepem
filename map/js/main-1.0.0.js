//create class for icons
function ngIcon(src_point,
				dst_point,
				className,
				zIndex,
				href,
				icon,
				html){
	this.src_point_ = src_point;
	this.dst_point_ = dst_point;
	this.className_ = className;
	this.zIndex_ = zIndex;
	this.href_=href;
	this.icon_=icon;
	this.html_=html}

//creates img element
//initializes map_, mrk_
ngIcon.prototype.initialize=function(map){
	this.map_=map;
	if(this.icon_){
		var C=document.createElement("img");
		C.src=this.icon_;
		C.style.cursor="pointer";
		C.style.position="absolute";
		C.style.width="15px";
		C.style.height="15px"
	} else {
		var C=document.createElement("a");
		C.className=this.className_;
		if(this.className_ != "marker marker_add_link"){
			C.href=this.href_;
		}
	}
	if(this.html_){
		C.innerHTML=this.html_
	}
	C.style.zIndex=this.zIndex_;
	this.map_.getPane(G_MAP_MARKER_PANE).appendChild(C);
	this.mrk_=C;
	var B=this;
	if(this.icon_){
		 google.maps.event.addDomListener(this.mrk_,"click",function(){
			document.location=B.href_
		})
	}
	if(this.className_ == "marker marker_add_link"){
		 google.maps.event.addDomListener(this.mrk_,"click",function(){
			main.map.gMap.setCenter(B.dst_point_);
			return false;
		})
	} else {	
	}
	 google.maps.event.addDomListener(this.mrk_,"mouseover",function(){
		 google.maps.event.trigger(B,"mouseover")
	});

	 google.maps.event.addDomListener(this.mrk_,"mouseout",function(){
		 google.maps.event.trigger(B,"mouseout")
	})};
ngIcon.prototype.remove=function(){
	this.mrk_.parentNode.removeChild	(this.mrk_)};
ngIcon.prototype.copy=function(){
	return new ngIcon(this.src_point_,
				this.title_,
				this.className_,
				this.width_,
				this.height_)};
ngIcon.prototype.redraw=function(A){
	if(!A){
		return 
	}
	var B=this.map_.fromLatLngToDivPixel(this.src_point_);
	this.mrk_.style.left=(B.x-7)+"px";
	this.mrk_.style.top=(B.y-7)+"px"};
ngIcon.prototype.getIcon=function(){
	return{
		iconAnchor:{x:7,y:7}
	}};
ngIcon.prototype.getPoint=function(){
	return this.src_point_};
	
main = {	
	init:function(){
	main.location.init();
	main.social.init();
	main.map.init();
	main.markers.init();
	main.topList.init();
	main.location.setAddress("Galata, Istanbul");
	}};
main.location = {
	init:function(){
		var A=this;
		$("body").bind("click",function(){A.closeControls()});
		$("#location-navi li")	.bind("mouseover",function(){$(this).addClass("hover")})
								.bind("mouseout",function(){$(this).removeClass("hover")});
		$("#location-navi-city").bind("click",function(B){	
										A.openControls(this,"location-city");
										B.stopPropagation()
									});
		$("#location-city li")	.bind("mouseover",function(){$(this).addClass("hover")})
								.bind("mouseout",function(){$(this).removeClass("hover")
									});
		$("#location-navi-address").bind("click",function(B){
										A.openControls(this,"location-address");
										B.stopPropagation();
		});
		$("#location-navi-current").bind("click",function(B){
								A.showCurrentLocation($(this));
								B.stopPropagation()
							});
		$("#location-address, #location-city").bind("click",function(B){B.stopPropagation()});
		$(".location-close").each(function(){$(this).bind("click",function(){A.closeControls()})});
		$("#address-input").val("Type Address Here").addClass("dimmed").bind("focus",function(){
																					if($(this).is(".dimmed")){
																						$(this).val("");
																						$(this).removeClass("dimmed");
																						$("#address-submit").attr("disabled",false)
																					}
																				});
		$("#address-submit").bind("click",function(){}).attr("disabled",true);
		$("#address-form").bind("submit",function(){
											A.setAddress($("#address-input").val());
											return false
										});
		$("#location-city li").bind("click", function(){
											A.setAddress($(this).attr("id"));
											return false;
										});
		if("geolocation" in navigator){
			$("#location-navi-current").show()
		}
	},
	openControls:function(B,C){
		var A=true;
		if(this.openLocation){
			if(this.openLocation==C){
				A=false
			}
			this.closeControls()
		}
		if(A){
			$("#"+C).show();
			$(B).addClass("active");
			this.openLocation=C
		}
	},
	closeControls:function(){
		$("#"+this.openLocation).hide();
		this.openLocation=null;
		$("#location li").removeClass("active")
	},
	setAddress:function(address){
		var B=this;
		var C=new google.maps.Geocoder();
		var A=address;
		if(A!=""){			
			C.geocode({ 'address': A }, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					main.map.gMap.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: main.map.gMap,
						position: results[0].geometry.location
					});
	
				}else{
					alert("Invalid Address")
				}
			})
		}			
	},
	showCurrentLocation:function(B){
											var B=B||$("#location-navi-current");
											B.addClass("progress");
											navigator.geolocation.getCurrentPosition(function(C){
																			main.map.gMap.setCenter(new google.maps.LatLng(C.coords.latitude,C.coords.longitude),16);
																			B.removeClass("progress");
																			var D=$("#current-location");
																			if(D.length==0){
																				D=$('<div id="current-location" title="Your Location">').appendTo($("#gmap"))
																			}
																			D.show();
																			 google.maps.event.addListener(main.map.gMap,"moveend",function(){D.remove()})
																			B.removeClass("progress");
																		},function(C){A()});
											window.setTimeout(function(){A()},10000);
											var A=function(){
												if(B.hasClass("progress")){
													alert("Su an yeriniz bulunamiyor. Lutfen daha sonra tekrar deneyin.")
												}
												B.removeClass("progress")
											}
										}};
main.map = {
	gMap:null,
	resizeTimer:null,
	allowZoomOut:true,
	controls:{	main:null,
				zoomIn:null,
				zoomOut:null},
	state:{	ready:true,
			lat:0,
			lng:0,
			zoom:15},
	bounds:{nelat:null,
			swlat:null,
			nelng:null,
			swlng:null},
	init:function(){
		var A=this;
		if(A.state.ready){
			var B=$.cookie("pageState");
			if(B){
				A.state=JSON.parse(B)
			}else{
				this.updateCookie(this.state);
			}
			var myLatlng = new google.maps.LatLng(this.state.lat,this.state.lng);
			var myOptions = {
  				zoom: 8,
  				center: myLatlng,
  				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			this.gMap = new google.maps.Map(document.getElementById("map_canvas"),
    		myOptions);
			this.controls.main=$("#map-controls");
			this.controls.zoomIn=$("#map-controls-zoom-in");
			this.controls.zoomOut=$("#map-controls-zoom-out");
			A.updateBounds();
			google.maps.event.addListener(this.gMap,"moveend",function(){
				A.updateBounds();
				main.markers.loadData();
				A.updateState()
			});	
			$("#gmap-zoomalert").html("area.map.error.zoom");
			$("#gmap-loading").html("area.map.message.loading");
			$("#map-controls-up").bind("click",function(){
									A.navigate("up")
								});
			$("#map-controls-down").bind("click",function(){
									A.navigate("down")
								});
			$("#map-controls-left").bind("click",function(){
									A.navigate("left")
								});
			$("#map-controls-right").bind("click",function(){
									A.navigate("right")
								});
			$("#map-controls-zoom-in").bind("click",function(){
									A.zoom("in")
								});
			$("#map-controls-zoom-out").bind("click",function(){
									A.zoom("out")
								});
			$(window).bind("resize",function(C){
								A.resize()
								});
			this.controls.main.css("top",($("#location-navi li:visible").length*25)+15);
			this.controls.main.show();
			if("geolocation" in navigator){
				if(document.location.href.indexOf("showlocation")!=-1){
					main.location.showCurrentLocation()
				}
			}
			this.ready=true
		
		}else{
			window.setTimeout(function(){
							A.init()
						},
						100)
		}
	},
	updateBounds:function(){
		var B=this.gMap.getBounds();
		if(B == null) return;
		var A=B.getSouthWest();
		var C=B.getNorthEast();
		this.bounds={	nelat:C.lat(),
					swlat:A.lat(),
					nelng:C.lng(),
					swlng:A.lng()
				}
	},
	updateState:function(){
		var center=main.map.gMap.getCenter();
		with(this.state){
			ready=true;
			lat=center.lat();
			lng=center.lng();
			zoom=this.gMap.getZoom()
		}
		this.updateCookie(this.state);
	},
	renderState:function(){
		this.gMap.setCenter(new google.maps.LatLng(this.state.lat,this.state.lng),this.state.zoom);
		this.updateCookie(this.state);},
	resize:function(){
		if(this.resizeTimer){
			window.clearTimeout(this.resizeTimer)
		}
		//eat.area.layout.update();
		this.resizeTimer=window.setTimeout(function(){
								main.map.updateBounds();
								//eat.area.filterBar.updateData();
								main.markers.loadData();
								main.map.updateState()
								},
								500)
	},
	navigate:function(A){
		switch(A){
			case"up":
				this.state.lat=parseFloat(this.state.lat)+0.01;
			break;
			case"down":
				this.state.lat=parseFloat(this.state.lat)-0.01;
			break;
			case"right":
				this.state.lng=parseFloat(this.state.lng)+0.03;
			break;
			case"left":
				this.state.lng=parseFloat(this.state.lng)-0.03;break
		}
		this.renderState()
	},
	zoom:function(A){
		var B=null;
		if(A=="in"){
			B=this.state.zoom+1
		}else{
			if(this.allowZoomOut){
				B=this.state.zoom-1
			}
		}
		if(B){
			this.state.zoom=B;
			this.renderState()
		}
	},
	updateCookie:function(state){
		$.cookie("pageState",JSON.stringify(state),{expires:365,path:"/",domain:".localhost"})
	}		};
main.markers = {
	showMarkers:true,
	data:[],
	shownIds:[],
	tooltip:null,
	tooltipTimer:null,
	icons:[],
	cities:[],
	//call load data and init tooltip
	init:function(){
		this.loadData();
		this.initTooltip()
	},
	//collect border constraints and call updateMarkers function
	loadData:function(){
		var A=this;
		$("#gmap-loading").show();
		var B={
			ids:this.shownIds.toString(),
			nelat:main.map.bounds.nelat,
			swlat:main.map.bounds.swlat,
			nelng:main.map.bounds.nelng,
			swlng:main.map.bounds.swlng
		};
		$.post(mySettings.updateMapUrl,
			B,
			function(C){
				A.updateMarkers(C);
				$("#gmap-loading").hide()
			},
			"json");
		this.hideZoomAlert()
	},
	getMarkerClassName:function(C){
		var D="marker marker_"+C;
		return D
	},
	getMarkerIconUrl:function(D,B,E,C){
								var A=D;
								var F;
								if(D!="unknown"&&D!="foreign"){
									if(C){
										A+="_sponsor"
									}else{
										if(B){
											A+="_favorite"
										}else{
											if(E){
												A+="_bookmark"
											}
										}
									}
								}
								if(core.browser.msie6){
									F=".gif"
								}else{
									F=".png"
								}
								return mySettings.iconUrl+A+F
							},
	createMarker:function(G){
						var C=this;
						G.message=(G.msg==0)?null:G.msg;G.sponsor=(G.spr==1)?true:false;
						if(G.type == "add_link"){
							var D= G.dst_lat + ', ' + G.dst_lng;
						} else {
							var D="../item/"+G.id;
						}
						var F=false;
						if(core.browser.msie6){
							var B=new ngIcon(	new google.maps.LatLng(G.lat,G.lng),
												new google.maps.LatLng(G.dst_lat,G.dst_lng),
												false,
												1,
												D,
												this.getMarkerIconUrl(G.sts,G.favorite,G.bookmark,G.sponsor),
												F)
						}else{
							var B=new ngIcon(	new google.maps.LatLng(G.lat,G.lng),
												new google.maps.LatLng(G.dst_lat,G.dst_lng),		
												this.getMarkerClassName(G.type),
												1,
												D,
												false,
												F)
						}
						var E='<div class="tooltip-wrapper">';
						E+='<div class="tooltip '+((G.sponsor)?"sponsor":"")+'" id="tooltip-'+G.id+'">';
						E+='<div class="header">';
						if(G.message){
							E+='<div class="headerMessageWrapper">';
							E+='<div class="headerMessage">';
							E+='<div class="headerMessageHeader"></div>';
							E+='<div class="headerMessageBody">'+G.message+"</div>";
							E+='<div class="headerMessageFooter"></div>';
							E+="</div>";
							E+="</div>"
						}
/*						if(G.rgo){
							E+='<div class="ratingOverall">'+G.rgo+"</div>"
						}*/
						E+='<div class="label">'+G.lbl+"</div>";
						E+="</div>";
						E+='<div class="body">';
						E+='<div class="data">';
						if(G.sts=="foreign"){/*
							E+='<div class="foreign">'+"area.map.tooltip.foreign"+"</div>"
						*/}else{
/*							if(G.wbc==1){

								E+='<div class="willBeClosed">'+"area.map.tooltip.willBeClosed"+"</div>"
							}else{
								E+='<div class="openStatus '+G.sts+'">'+"restaurant.openingStatus."+G.sts+"</div>"
							}*/
/*							E+='<div class="reviews">';
							if(G.rvw==0){
								E+="area.map.tooltip.noReviews"
							}else{
								if(G.rvw==1){
									E+=G.rvw+" "+"area.map.tooltip.review"
								}else{
									E+=G.rvw+" "+"area.map.tooltip.reviews"
								}
							}
							E+="</div>";*/
							E+='<div class="tooltip-features">';
/*							if(G.rgq){
								E+='<div class="ratingEntry">';
								E+='<div class="ratingQuality"><div class="ratingBar" style="width:'+((G.rgq-0.8)*12*1.5)+'px"></div></div>';
								E+='<div class="ratingTitle"><strong>'+G.rgq+"</strong> "+"area.map.tooltip.qualityLabel"+"</div>";
								E+="</div>"
							}
							if(G.rge){
								E+='<div class="ratingEntry">';
								E+='<div class="ratingExperience"><div class="ratingBar" style="width:'+((G.rge-0.8)*12*1.5)+'px"></div></div>';
								E+='<div class="ratingTitle"><strong>'+G.rge+"</strong> "+"area.map.tooltip.experienceLabel"+"</div>";
								E+="</div>"
							}
							if(G.rgp){
								E+='<div class="ratingEntry">';
								E+='<div class="ratingPrice"><div class="ratingBar" style="width:'+((G.rgp-0.8)*12*1.5)+'px"></div></div>';
								E+='<div class="ratingTitle"><strong>'+G.rgp+"</strong> "+"area.map.tooltip.priceLabel"+"</div>";
								E+="</div>"
							}*/
						E += 	'<div class="tooltip-title">Features: </div>';
						E += 	'<div class="tooltip-features-list">';
						E += 		'<ul id="features-list">';
								var myString = new String(G.feat);
								for(var i=0;i < 8;i++){	
									if(myString.charAt(i) == "1"){
						E += 			'<li class="features-list-item" id="feature-small-' + (i + 1) + '"></li>';
									}
								}
						E += 		'</ul>';
						E +=	"</div>"
						E += 	'<div class="tooltip-title">Description: </div>';
						E += 		'<div class="tooltip-description">' + G.dsc + '</div>';
						E +="</div>"
						}
						E+="</div>";
						E+="</div>";
						E+='<div class="footer">';
/*						if(G.sts=="foreign"){
							E+='<div class="foreign-link"><a href="javascript:document.location = \''+mySettings.indexUrl+"?cityId="+G.cty+"&lat="+main.map.state.lat+"&lng="+main.map.state.lng+"&zoom="+main.map.state.zoom+"';\">"+"area.map.tooltip.foreignLink"+" "+this.cities[G.cty]+" �</a></div>"
					}else{
							E+='<div class="category-small-list">';
							for(var A=0;G.cat[A];A++){
							E+='<div class="category-small" id="category-small-'+G.cat[A]+'"><div class="category-label"><label>&nbsp;</label></div></div>'
							}
							E+="</div>";
							if(G.dsc){
								E+='<div class="descr">'+G.dsc+"</div>"
							}
						}*/
						E+="</div>";
						E+="</div>";
						E+="</div>";
						B.tooltip=E;
						B.data=G;
						 google.maps.event.addListener(B,"mouseover",function(){C.showTooltip(B)});
						 google.maps.event.addListener(B,"mouseout",function(){C.hideTooltip()});
						B.href=mySettings.restaurantUrl+"/"+G.id;
						return B
					},
	updateCities:function(B){
					for(var A=0;B[A];A++){
						var C=B[A];
						this.cities[C[0]]=C[1]
					}
			},
	updateMarkers:function(E){
						//this.updateCities(E.cities);
						//1)remove non-visible overlays
						for(var i=0;E.hide[i];i++){
							var C=this.data[E.hide[i]];
							if(C){
								main.map.gMap.removeOverlay(C);
								this.data[E.hide[i]]=null
							}
						}
						var F=[];
						//2)create markers for visible overlays
						for(var i=0;E.show[i];i++){
							var D=this.parseJsonItem(E.show[i]);
							var A=this.createMarker(D);
							main.map.gMap.setMap(A);
							//fill data array
							this.data[D.id]=A;
							this.shownIds.push(D.id)
						}
						
						//3)foll shownID's array
						this.shownIds=$.grep(this.shownIds,function(H,G){
																	if($.inArray(parseInt(H),E.hide)!=-1){
																		return false
																	}
																	return true
						});
						main.topList.update();
	},
	resetMarkers:function(){
					this.loadData()
				},
	showTooltip:function(B){
				window.clearTimeout(this.tooltipTimer);
				var D=main.map.gMap;
				this.tooltip.html(B.tooltip);
				var A=D.getCurrentMapType().getProjection().fromLatLngToPixel(D.fromContainerPixelToLatLng(new GPoint(mySettings.tooltipOffsetX,mySettings.tooltipOffsetY),true),D.getZoom());
				var E=D.getCurrentMapType().getProjection().fromLatLngToPixel(B.getPoint(),D.getZoom());
				var C=B.getIcon().iconAnchor;
				var F=new GControlPosition(G_ANCHOR_TOP_LEFT,new GSize(E.x-A.x-C.x,E.y-A.y-C.y));
				F.apply(this.tooltip[0]);
				$(".tooltip",this.tooltip).bind("mouseover",function(){
													main.markers.onTooltip()
												});
				$(".tooltip",this.tooltip).bind("mouseout",function(){
													main.markers.offTooltip()
												});
				$(".tooltip",this.tooltip).bind("click",function(){
					document.location="../item/"+this.id.split("-")[1]									
				});
				this.tooltip.show()
	},
	hideTooltip:function(){
				window.clearTimeout(this.tooltipTimer)
			
				this.tooltipTimer=window.setTimeout(function(){
					if(core.browser.msie6){
						$(main.markers.tooltip).hide()
					}else{
						$(main.markers.tooltip).fadeOut(100)
					}
				},
				100)
			},
	onTooltip:function(){window.clearTimeout(this.tooltipTimer)},
	offTooltip:function(){
				this.hideTooltip()
			},
	showZoomAlert:function(){
				$("#gmap-zoomalert").show()
			},
	hideZoomAlert:function(){
				$("#gmap-zoomalert").hide()
			},
	showHighlight:function(H){
				var E=main.map.gMap;
				var B=this.data[H];
				if(B){
					var C=$("#gmap-highlight");
					var A=E.getCurrentMapType().getProjection().fromLatLngToPixel(E.fromContainerPixelToLatLng(new GPoint(0,0),true),E.getZoom());
					var F=E.getCurrentMapType().getProjection().fromLatLngToPixel(B.getPoint(),E.getZoom());
					var D=B.getIcon().iconAnchor;
					var G=new GControlPosition(G_ANCHOR_TOP_LEFT,new GSize(F.x-A.x-D.x-6,F.y-A.y-D.y-5));
					G.apply(C[0]);
					C.show()
				}
			},
	hideHighlight:function(A){
				$("#gmap-highlight").hide()
			},
	parseJsonItem:function(B){
				var D={
					id:B[0],
					owner:B[1],
					lat:B[2],
					lng:B[3],
					dst_lat:B[4],
					dst_lng:B[5],
					type:B[6],
					lbl:B[7],
					feat:B[8],
					dsc:B[9],
					cat:String(B[8]),
					rvw:B[10],
					rtg:String(B[11]),
					wbc:B[12],
					spr:B[13],
					msg:B[14]};
				var A=[];
				if(B[7]){
					for(var C=0;C<D.cat.length;C++){
						A.push(D.cat.charAt(C))
					}
				}
				D.cat=A;
				D.rgo=(D.rtg!="0")?D.rtg.charAt(0)+"."+D.rtg.charAt(1):null;
				D.rgq=(D.rtg!="0")?D.rtg.charAt(2)+"."+D.rtg.charAt(3):null;
				D.rge=(D.rtg!="0")?D.rtg.charAt(4)+"."+D.rtg.charAt(5):null;
				D.rgp=(D.rtg!="0")?D.rtg.charAt(6)+"."+D.rtg.charAt(7):null;
				return D
			},
	initTooltip:function(){
				this.tooltip=$('<div id="tooltip"></div>');
				this.tooltip.hide();
				$("#body").append(this.tooltip)
			}};
main.notes = {
	init:function(){
		var A=this;
		if($("#welcome-note").length>0){
			window.setTimeout(function(){
							A.open("welcome-note")
						},
						3000)
		}else{
			if($("#register-note").length>0){
				window.setTimeout(function(){
								A.open("register-note")
							},
							3000)
			}
		}
	},
	open:function(A){
		if(core.browser.msie6){
			$("#"+A).show()
		}else{
			$("#"+A).fadeIn(500)
		}
	},
	close:function(A){
		if(core.browser.msie6){
			$("#"+A).hide()
		}else{
			$("#"+A).fadeOut(500,function(){$("#"+A).remove()})
		}
	}};
main.topList = {
		data:[],
		init:function(){
			var A=this;
			this.data=$("#top-list .data");
		},
		update:function(){
			var A=this;
			var B = main.markers.data;
			var C = main.markers.shownIds;
			var D = "";			
			for (var i = 0;i <C.length; i++)
				{	
					if(B[C[i]].data.type != "add_link") {
						D += '<a id="toplist_entry" class="entry" href="' + '../item/' + B[C[i]].data.id + '">';
						//D += '<div class="rating">' + B[C[i]].data.cty + '</div>';
						D += '<div class="icon"></div>';
						D += '<div class="category" ';
						switch(B[C[i]].data.type){
							case "add_car":
								D += 'id="category-1" ';
							break;
							case "add_home":
								D += 'id="category-2" ';
							break;
							case "req_car":
								D += 'id="category-3" ';
							break;
							case "req_home":
								D += 'id="category-4" ';
							break
						};
						D += '"title="">&nbsp;</div>';
						D += '<div class="label"><span>' + B[C[i]].data.lbl + '</span></div>';
						D += '<div class="descr" title="">Owner: ' + B[C[i]].data.owner + '</div>';
						D += '</a>';
					} else {
						D += '<a id="toplist_entry" class="entry" onClick="main.map.gMap.setCenter(new google.maps.LatLng(' + B[C[i]].data.dst_lat + ',' + B[C[i]].data.dst_lng + '));">';
						//D += '<a id="toplist_entry" class="entry" onClick="alert(&quot;hi&quot;);">';
						//D += '<div class="rating">' + B[C[i]].data.cty + '</div>';
						D += '<div class="icon"></div>';
						D += '<div class="category" ';
						D += 'id="category-5" ';
						D += '"title="">&nbsp;</div>';
						D += '<div class="label"><span>' + B[C[i]].data.lbl + '</span></div>';
						D += '<div class="descr" title="">Owner: ' + B[C[i]].data.owner + '</div>';
						D += '</a>';
					}
				}
			A.data.html(D);
		}
	};
main.social={	dom:{},
				init:function(){
							var A=this;
							this.personal.init();
							this.actions.init();
							this.following.init();
							this.login.init();
							this.news.init();
					},
				personal:{	data:{state:null},
							dom:{},
							init:function(){
													this.dom.core=$("#personal");
													this.data.state=mySettings.personalState;
													},
							render:function(B){
													var A=this;
													if(this.data.state!=B){
														if(B=="loggedin"){
															main.social.login.close(function(){
																							A.dom.core.removeClass("unlogged");
																							A.dom.core.addClass("loggedin")
																						})
														}else{
															A.dom.core.removeClass("loggedin");
															A.dom.core.addClass("unlogged")
														}
													}
												}
						},
				login:{	dom:{},
							data:{	username:null,
									password:null,
									remember:0,
									facebook:0,
									fb_uid:null,
									fb_access_token:null
									},
							init:function(){
									var A=this;
									this.dom.core=$("#login");
									this.dom.form=$("#login form");
									this.dom.progress=$("#login-progress");
									this.dom.usernameInput=$("#login input[name=username]");
									this.dom.passwordInput=$("#login input[name=password]");
									this.dom.rememberInput=$("#login input[name=remember]");
									this.dom.submitInput=$("#login-form-submit input");
									this.dom.form.bind("submit",function(){
																			A.doLogin();
																			return false
																			});
									},
							doLogin:function(){
									var A=this;
									this.data.username=this.dom.usernameInput.val();
									this.data.password=this.dom.passwordInput.val();
									this.data.remember=(this.dom.rememberInput.attr("checked")?1:0);
									this.progress("show",function(){
										A.dom.submitInput.attr("disabled",true);
										$.post(				
											   mySettings.ajaxLoginUrl,
												A.data,
												function(B){
													if(B.success){
														main.social.personal.render("loggedin");
														window.setTimeout(function(){
															$("#facebook-login").hide();
															mySettings.personalState="loggedin";
															mySettings.username=A.data.username;
															var C=header.userbar;
															C.data.username=B.myusername;
															//C.data.profile=B.profile;
															main.social.following.load();
															main.social.actions.load();
															$("#header-link-profile > a").attr('href', '../profile/' + B.myusername);
															$("#header-link-inbox").fadeIn(250);
															$("#header-link-profile").fadeIn(250);
															C.render();
															//main.markers.resetMarkers()
														},
														1100);																
													}else{
														A.progress("hide",function(){
															alert("Login was unsuccessful");
															A.dom.submitInput.attr("disabled",false)
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
							open:function(A){
								this.dom.core.fadeIn(1000,A)
							},
							close:function(A){
								this.dom.core.fadeOut(1000,A)
							}
						},
				actions:{
								dom:{},
								init:function(){
									this.dom.core=$("#actions");
									this.dom.data=$("#actions-data");
									this.dom.footer=$("#actions-footer");
									this.dom.progress=$("#actions-progress");
									$("#actions-add-car, #actions-data-add-car").bind("click",function(){
										this.href = "addItem/index.php?type=add_car&lat=" + main.map.state.lat + "&lng=" + main.map.state.lng;
									});
									$("#actions-add-home, #actions-data-add-home").bind("click",function(){
										this.href = "addItem/index.php?type=add_home&lat=" + main.map.state.lat + "&lng=" + main.map.state.lng;
									});
									$("#actions-req-car, #actions-data-req-car").bind("click",function(){
										this.href = "addItem/index.php?type=req_car&lat=" + main.map.state.lat + "&lng=" + main.map.state.lng;
									});
									$("#actions-req-home, #actions-data-req-home").bind("click",function(){
										this.href = "addItem/index.php?type=req_home&lat=" + main.map.state.lat + "&lng=" + main.map.state.lng;
									});
									$("#actions-data-add-link").bind("click",function(){
										this.href = "addItem/add_link.php?type=add_link&lat=" + main.map.state.lat + "&lng=" + main.map.state.lng;
									});
									
								},
								load:function(B){
															var A=this;
															A.progress("show", function(){
																A.render();
															});
															A.progress("hide");
								},
								render:function(){
									this.dom.data.fadeIn(250)
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
								}	
				},
				following:{
					dom:{},
					init:function(){
						var A = this;
						this.dom.core=$("#following");
						this.dom.carouselList=$("#following-carousel .jcarousel-list");
						this.dom.footer=$("#following-footer");
						this.dom.progress=$("#following-progress");
						if(main.social.personal.data.state=="loggedin"){
						   A.load();
						}
					},
					load:function(){
					
						var A=this;
						A.progress("show");
						A.dom.carouselList.hide();
						$.post(
							mySettings.followingUrl,
							"user="+header.userbar.data.username,
							function(B){
								A.progress("hide",function(){
									A.render(B)
								})
							},
							"json"
						); 	
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
					render:function(B){
						var A = this;
						var D = "";
						for(var C in B){
							var E=B[C];
							if(C%2 == 0){
								D+='<li><a href="../profile/' + E[1] + '"><img src="' + E[2] + '"</img></a>';
							} else {
								D+='<a href="../profile/' + E[1] + '"><img src="' + E[2] + '"</img></a></li>';
							}
						}
						if(D!=""){
							A.dom.carouselList.html(D);
						}
						A.dom.carouselList.fadeIn(200);																								
						jQuery('#following-carousel').jcarousel();
					}
				},
				news:{
					dom:{},
					init:function(){
						var A = this;
						this.dom.progress=$("#news-progress");
						this.dom.newsList=$("#news-data");
						A.load();
					},
					load:function(){			
						var A=this;
						A.progress("show");
						$.post(
							mySettings.loadNewsUrl,
							null,
							function(B){
								A.progress("hide",function(){
									A.render(B)
								})
							},
							"json"
						); 	
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
					render:function(B){
						var A = this;
						var D = '<ul id="news_list">';
						
						//sort news from different categories by their dates
						while(	B["newFriends"].length > 0 	|| 
								B["newItems"].length > 0 	||
								B["newUsers"].length > 0)
						{
							var tmp_date_1 = new Date("October 13, 1899 11:13:00");
							var tmp_date_2 = new Date("October 13, 1899 11:13:00");
							var tmp_date_3 = new Date("October 13,1899 11:13:00");
							var tmp_most_recent_news_category = null;
							if(B["newFriends"].length > 0){
								var tmp_date_1 = new mysqlTimeStampToDate(B["newFriends"][0][3]);
								//alert("date 1: " + tmp_date_1);
							}
							if(B["newItems"].length > 0){
								var tmp_date_2 = new mysqlTimeStampToDate(B["newItems"][0][3]);
								//alert("date2: " + tmp_date_2);
							}
							if(B["newUsers"].length > 0){
								var tmp_date_3 = new mysqlTimeStampToDate(B["newUsers"][0][2]);
								//alert("date3: " + tmp_date_3);
							}
							//compare dates
							if(			dates.compare(tmp_date_1, tmp_date_2) == 1 && 
										dates.compare(tmp_date_1, tmp_date_3) == 1){
								tmp_most_recent_news_category = "newFriends";
							} else if(	dates.compare(tmp_date_2, tmp_date_1) == 1 && 
										dates.compare(tmp_date_2, tmp_date_3) == 1){
								tmp_most_recent_news_category = "newItems";
							} else {
								tmp_most_recent_news_category = "newUsers";
							}
							//alert("most recent category: " + tmp_most_recent_news_category);
							
							//render row
							if(tmp_most_recent_news_category == "newFriends"){
								D += '<li><span><a href="../profile/' + B["newFriends"][B["newFriends"].length-1][5] + '">' + B["newFriends"][B["newFriends"].length-1][5] + '</a>, <a href="../profile/' + B["newFriends"][B["newFriends"].length-1][4] + '">' + B["newFriends"][B["newFriends"].length-1][4] + '</a> tarafindan takip ediliyor.</span></li>';
							} else if(tmp_most_recent_news_category == "newItems"){
								D += '<li><span>' + B["newItems"][B["newItems"].length-1][1];
								switch(B["newItems"][B["newItems"].length-1][2]){
									case"add_car":
										D += ', <a href="../item/' + B["newItems"][B["newItems"].length-1][0] + '">yeni arac payasimi</a> ekledi.</span></li>';
									break;
									case"add_home":
										D += ', <a href="../item/' + B["newItems"][B["newItems"].length-1][0] + '">yeni ev payasimi</a> ekledi.</span></li>';
									break;
									case"req_car":
										D += ', <a href="../item/' + B["newItems"][B["newItems"].length-1][0] + '">yeni arac istegi</a> ekledi.</span></li>';
									break;
									case"req_home":
										D += ', <a href="../item/' + B["newItems"][B["newItems"].length-1][0] + '">yeni ev istegi</a> ekledi.</span></li>';
									break;
									case"add_link":
										D += ', <a href="../item/' + B["newItems"][B["newItems"].length-1][0] + '">yeni tabela</a> ekledi.</span></li>';
									break;
									case"address":
										D += ', adreslerini guncellestirdi.</span></li>';
									break;
								}
							} else if(tmp_most_recent_news_category == "newUsers"){
								D += '<li><span>Yeni bir kullanici aramiza katildi: <a href="../profile/' +  B["newUsers"][B["newUsers"].length -1 ][1] + '">' + B["newUsers"][B["newUsers"].length -1][1] + '.</a></span></li>';
							}

							//alert("preparing to pop " + tmp_most_recent_news_category);
							B[tmp_most_recent_news_category].pop();
						}
						
						D += '</ul>';
						//alert("all arrays are empty now");
						A.dom.newsList.html(D);																							
					}	
				}
			};
				
$(document).ready(function(){
				main.init();
				
				//custom overlay for icons
				ngIcon.prototype=new google.maps.OverlayView();
				
				$("a#signup-button").fancybox({
        			'autoDimensions'	: false,
					'width'         		:435,
					'height'        		:280
				});
				
				$("#actions-header-data, #actions-data").find("a").fancybox({
        			'autoDimensions'	: false,
					'width'         		:800,
					'height'        		:500,
					'margin'				:1,
					'padding'				:1,
					'onClosed'				:function() {main.markers.loadData();}
				});
				
				//set loggedin / unlogged classes dynamically
				document.getElementById("personal").setAttribute("class", mySettings.personalState);});