function ngIcon(A,E,F,B,D,C){
	this.zIndex_=F;
	this.point_=A;
	this.className_=E;
	this.href_=B;
	this.icon_=D;
	this.html_=C}
ngIcon.prototype=new GOverlay();
ngIcon.prototype.initialize=function(map){
	this.map_=map;
	if(this.icon_){
		var C=document.createElemen("img");
		C.src=this.icon_;
		C.style.cursor="pointer";
		C.style.position="absolute";
		C.style.width="15px";
		C.style.height="15px"
	} else {
		var C=document.createElement("a");
		C.className=this.className_;
		C.href=this.href_
	}
	if(this.html_){
		C.innerHTML=this.html_
	}
	C.style.zIndex=this.zIndex_;
	this.map_.getPane(G_MAP_MARKER_PANE).appendChild(C);
	this.mrk_=C;
	var B=this;
	if(this.icon_){
		GEvent.addDomListener(this.mrk_,"click",function(){
			document.location=B.href_
		})
	}
	GEvent.addDomListener(this.mrk_,"mouseover",function(){
		GEvent.trigger(B,"mouseover")
	});

	GEvent.addDomListener(this.mrk_,"mouseout",function(){
		GEvent.trigger(B,"mouseout")
	})};
ngIcon.prototype.remove=function(){
	this.mrk_.parentNode.removeChild	(this.mrk_)};
ngIcon.prototype.copy=function(){
	return new ngIcon(this.point_,
				this.title_,
				this.className_,
				this.width_,
				this.height_)};
ngIcon.prototype.redraw=function(A){
	if(!A){
		return 
	}
	var B=this.map_.fromLatLngToDivPixel(this.point_);
	this.mrk_.style.left=(B.x-7)+"px";
	this.mrk_.style.top=(B.y-7)+"px"};
ngIcon.prototype.getIcon=function(){
	return{
		iconAnchor:{x:7,y:7}
	}};
ngIcon.prototype.getPoint=function(){
	return this.point_};

eat.area={	map:{	
				gMap:null,
				resizeTimer:null,
				allowZoomOut:true,
				controls:{	main:null,
							zoomIn:null,
							zoomOut:null},
				state:{	ready:false,
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
						if(GBrowserIsCompatible()){
							var B=$.cookie("eatstate");
							if(B){
								A.state=JSON.parse(B)
							}else{
								$.cookie(	"eatstate",
										JSON.stringify(this.state),
										{expires:365,path:"/",domain:".eat.fi"})
							}
							this.gMap=new GMap2($("#gmap")[0]);
							this.gMap.setCenter(new GLatLng(this.state.lat,this.state.lng),this.state.zoom);
							this.controls.main=$("#map-controls");
							this.controls.zoomIn=$("#map-controls-zoom-in");
							this.controls.zoomOut=$("#map-controls-zoom-out");
							A.updateBounds();
							eat.area.markers.init();
							GEvent.addListener(this.gMap,"moveend",function(){
								eat.area.filterBar.updateData();
								A.updateBounds();
								eat.area.markers.loadData();
								A.updateState()
							});	
							$("#gmap-zoomalert").html(__("area.map.error.zoom"));
							$("#gmap-loading").html(__("area.map.message.loading"));
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
							$(window).unload(function(C){
												GUnload()
												});
	
							this.renderControls();
							this.controls.main.css("top",($("#location-navi li:visible").length*25)+15);
							this.controls.main.show();
							if("geolocation" in navigator){
								if(document.location.href.indexOf("showlocation")!=-1){
									eat.area.location.showCurrentLocation()
								}
							}
							this.ready=true
						}else{
							alert(__("area.map.error"))
						}
					}else{
						window.setTimeout(function(){
										A.init()
									},
									100)
					}
				},
				updateBounds:function(){
					var B=this.gMap.getBounds();
					var A=B.getSouthWest();
					var C=B.getNorthEast();
					this.bounds={	nelat:C.lat(),
								swlat:A.lat(),
								nelng:C.lng(),
								swlng:A.lng()
							}
				},
				updateState:function(){
					var center=eat.area.map.gMap.getCenter();
					with(this.state){ready=true;lat=center.lat();lng=center.lng();zoom=this.gMap.getZoom()}
					$.cookie("eatstate",JSON.stringify(this.state),{expires:365,path:"/",domain:".eat.fi"})
				},
				renderState:function(){
					this.gMap.setCenter(new GLatLng(this.state.lat,this.state.lng),this.state.zoom);
					this.renderControls();
					$.cookie("eatstate",JSON.stringify(this.state),{expires:365,path:"/",domain:".eat.fi"})},
				renderControls:function(){
					if(eat.area.markers.shownIds.length>300){
						this.controls.zoomOut.addClass("disabled");
						this.allowZoomOut=false
					}else{
						this.controls.zoomOut.removeClass("disabled");
						this.allowZoomOut=true
					}
				},
				resize:function(){
					if(this.resizeTimer){
						window.clearTimeout(this.resizeTimer)
					}
					eat.area.layout.update();
					this.resizeTimer=window.setTimeout(function(){
											eat.area.map.updateBounds();
											eat.area.filterBar.updateData();
											eat.area.markers.loadData();
											eat.area.map.updateState()
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
				}
			},
			markers:{
				showMarkers:true,
				data:[],
				shownIds:[],
				tooltip:null,
				tooltipTimer:null,
				icons:[],
				cities:[],
				init:function(){
					this.loadData();
					this.initTooltip()
				},
				loadData:function(){
					var A=this;
					$("#gmap-loading").show();
					var B={ids:this.shownIds.toString(),
						cats:eat.area.filterBar.data.categories.toString(),
						noCat:eat.area.filterBar.data.noCategory,
						feature:eat.area.filterBar.data.feature,
						nelat:eat.area.map.bounds.nelat,
						swlat:eat.area.map.bounds.swlat,
						nelng:eat.area.map.bounds.nelng,
						swlng:eat.area.map.bounds.swlng,
						rating:eat.area.filterBar.data.rating,
						ratingtype:eat.area.filterBar.data.ratingType,
						minprice:eat.area.filterBar.data.minPrice,
						maxprice:eat.area.filterBar.data.maxPrice,
						date:eat.area.filterBar.data.date,
						time:eat.area.filterBar.data.time,
						text:eat.area.filterBar.data.text,
						toplist:((core.browser.msie)?1:0)};
					$.post(eat.settings.areaUrl,
						B,
						function(C){
							A.updateMarkers(C);
							$("#gmap-loading").hide()
						},
						"json");
					this.hideZoomAlert()
					},
				getMarkerClassName:function(C,A,E,B){
											var D="marker marker_"+C;
											var F;
											if(C!="foreign"){
												if(B){
													D+="_sponsor"
												}else{
													if(A){
														D+="_favorite"
													}else{
														if(E){
															D+="_bookmark"
														}
													}
												}
											}
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
											return eat.settings.iconUrl+A+F
										},
				createMarker:function(G){
									var C=this;
									G.favorite=($.inArray(parseInt(G.id),eatFavorites)!=-1)?true:false;
									G.bookmark=($.inArray(parseInt(G.id),eatBookmarks)!=-1)?true:false;
									G.message=(G.msg==0)?null:G.msg;G.sponsor=(G.spr==1)?true:false;
									var D=eat.settings.restaurantUrl+"/"+G.id;var F=false;
									if(core.browser.msie6){
										var B=new ngIcon(	new GLatLng(G.lat,G.lng),
															false,
															((G.sts=="unknown")?1:(G.sts=="closed")?2:1000),
															D,
															this.getMarkerIconUrl(G.sts,G.favorite,G.bookmark,G.sponsor),
															F)
									}else{
										var B=new ngIcon(	new GLatLng(G.lat,G.lng),
															this.getMarkerClassName(G.sts,
															G.favorite,
															G.bookmark,
															G.sponsor
														),
											((G.sts=="unknown")?1:(G.sts=="closed")?2:1000),
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
									if(G.rgo){
										E+='<div class="ratingOverall">'+G.rgo+"</div>"
									}
									E+='<div class="label">'+G.lbl+"</div>";
									E+="</div>";
									E+='<div class="body">';
									E+='<div class="data">';
									if(G.sts=="foreign"){
										E+='<div class="foreign">'+__("area.map.tooltip.foreign")+"</div>"
									}else{
										if(G.wbc==1){
											E+='<div class="willBeClosed">'+__("area.map.tooltip.willBeClosed")+"</div>"
										}else{
											E+='<div class="openStatus '+G.sts+'">'+__("restaurant.openingStatus."+G.sts)+"</div>"
										}
										E+='<div class="reviews">';
										if(G.rvw==0){
											E+=__("area.map.tooltip.noReviews")
										}else{
											if(G.rvw==1){
												E+=G.rvw+" "+__("area.map.tooltip.review")
											}else{
												E+=G.rvw+" "+__("area.map.tooltip.reviews")
											}
										}
										E+="</div>";
										E+='<div class="ratings">';
										if(G.rgq){
											E+='<div class="ratingEntry">';
											E+='<div class="ratingQuality"><div class="ratingBar" style="width:'+((G.rgq-0.8)*12*1.5)+'px"></div></div>';
											E+='<div class="ratingTitle"><strong>'+G.rgq+"</strong> "+__("area.map.tooltip.qualityLabel")+"</div>";
											E+="</div>"
										}
										if(G.rge){
											E+='<div class="ratingEntry">';
											E+='<div class="ratingExperience"><div class="ratingBar" style="width:'+((G.rge-0.8)*12*1.5)+'px"></div></div>';
											E+='<div class="ratingTitle"><strong>'+G.rge+"</strong> "+__("area.map.tooltip.experienceLabel")+"</div>";
											E+="</div>"
										}
										if(G.rgp){
											E+='<div class="ratingEntry">';
											E+='<div class="ratingPrice"><div class="ratingBar" style="width:'+((G.rgp-0.8)*12*1.5)+'px"></div></div>';
											E+='<div class="ratingTitle"><strong>'+G.rgp+"</strong> "+__("area.map.tooltip.priceLabel")+"</div>";
											E+="</div>"}E+="</div>"
										}
									E+="</div>";
									E+="</div>";
									E+='<div class="footer">';
									if(G.sts=="foreign"){
										E+='<div class="foreign-link"><a href="javascript:document.location = \''+eat.settings.indexUrl+"?cityId="+G.cty+"&lat="+eat.area.map.state.lat+"&lng="+eat.area.map.state.lng+"&zoom="+eat.area.map.state.zoom+"';\">"+__("area.map.tooltip.foreignLink")+" "+this.cities[G.cty]+" »</a></div>"
								}else{
										E+='<div class="category-small-list">';
										for(var A=0;G.cat[A];A++){
										E+='<div class="category-small" id="category-small-'+G.cat[A]+'"><div class="category-label"><label>&nbsp;</label></div></div>'
										}
										E+="</div>";
										if(G.dsc){
											E+='<div class="descr">'+G.dsc+"</div>"
										}
									}
									E+="</div>";
									E+="</div>";
									E+="</div>";
									B.tooltip=E;
									B.data=G;
									GEvent.addListener(B,"mouseover",function(){C.showTooltip(B)});
									GEvent.addListener(B,"mouseout",function(){C.hideTooltip()});
									B.href=eat.settings.restaurantUrl+"/"+G.id;
									return B
								},
				updateCities:function(B){
								for(var A=0;B[A];A++){
									var C=B[A];
									this.cities[C[0]]=C[1]
								}
						},
				updateMarkers:function(E){
									this.updateCities(E.cities);
									for(var B=0;E.hide[B];B++){
										var C=this.data[E.hide[B]];
										if(C){
											eat.area.map.gMap.removeOverlay(C);
											this.data[E.hide[B]]=null
										}
									}
									var F=[];
									for(var B=0;E.show[B];B++){
										var D=this.parseJsonItem(E.show[B]);
										if(eat.settings.admin&&D.sts!="foreign"){
											var A=this.createAdminMarker(D)
										}else{
											var A=this.createMarker(D)
										}
										eat.area.map.gMap.addOverlay(A);
										this.data[D.id]=A;
										this.shownIds.push(D.id)
									}
									this.shownIds=$.grep(this.shownIds,function(H,G){
																				if($.inArray(parseInt(H),E.hide)!=-1){
																					return false
																				}
																				return true
																			});
									if(E.topList.length>10){
										eat.area.topList.html=E.topList
									}
									eat.area.topList.update();
									eat.area.map.renderControls()
								},
				resetMarkers:function(){
								this.loadData()
							},
				showTooltip:function(B){
							window.clearTimeout(this.tooltipTimer);
							var D=eat.area.map.gMap;
							this.tooltip.html(B.tooltip);
							var A=D.getCurrentMapType().getProjection().fromLatLngToPixel(D.fromContainerPixelToLatLng(new GPoint(eat.settings.tooltipOffsetX,eat.settings.tooltipOffsetY),true),D.getZoom());
							var E=D.getCurrentMapType().getProjection().fromLatLngToPixel(B.getPoint(),D.getZoom());
							var C=B.getIcon().iconAnchor;
							var F=new GControlPosition(G_ANCHOR_TOP_LEFT,new GSize(E.x-A.x-C.x,E.y-A.y-C.y));
							F.apply(this.tooltip[0]);
							$(".tooltip",this.tooltip).bind("mouseover",function(){
																eat.area.markers.onTooltip()
															});
							$(".tooltip",this.tooltip).bind("mouseout",function(){
																eat.area.markers.offTooltip()
															});
							$(".tooltip",this.tooltip).bind("click",function(){
																if(B.data.sts=="foreign"){
																	document.location=eat.settings.indexUrl+"?cityId="+B.data.cty+"&lat="+eat.area.map.state.lat+"&lng="+eat.area.map.state.lng
																}else{
																	document.location=eat.settings.restaurantUrl+"/"+this.id.split("-")[1]
																}
															});
							this.tooltip.show()
						},
				hideTooltip:function(){
							this.tooltipTimer=window.setTimeout(function(){
								if(core.browser.msie6){
									$(eat.area.markers.tooltip).hide()
								}else{
									$(eat.area.markers.tooltip).fadeOut(100)
								}
							},
							100)
						},
				onTooltip:function(){
							window.clearTimeout(this.tooltipTimer)
						},
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
							var E=eat.area.map.gMap;
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
							var D={id:B[0],lat:B[1],lng:B[2],cty:B[3],lbl:B[4],cat:String(B[5]),dsc:B[6],rvw:B[8],rtg:String(B[9]),wbc:B[10],spr:B[11],msg:B[12]};
							var A=[];
							if(B[5]){
								for(var C=0;C<D.cat.length;C++){
									A.push(D.cat.charAt(C))
								}
							}
							D.cat=A;
							D.rgo=(D.rtg!="0")?D.rtg.charAt(0)+"."+D.rtg.charAt(1):null;
							D.rgq=(D.rtg!="0")?D.rtg.charAt(2)+"."+D.rtg.charAt(3):null;
							D.rge=(D.rtg!="0")?D.rtg.charAt(4)+"."+D.rtg.charAt(5):null;
							D.rgp=(D.rtg!="0")?D.rtg.charAt(6)+"."+D.rtg.charAt(7):null;
							switch(B[7]){
								case 1:
									D.sts="open";
								break;
								case 2:
									D.sts="lunch";
								break;
								case 3:
									D.sts="brunch";
								break;
								case 4:
									D.sts="closed";
								break;
								case 5:
									D.sts="foreign";
								break;
								default:
									D.sts="unknown";
								break
							}
							return D
						},
				initTooltip:function(){
							this.tooltip=$('<div id="tooltip"></div>');
							this.tooltip.hide();
							$("#body").append(this.tooltip)
						}
			},
			notes:{
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
					}
				},
			layout:{
				update:function(){
						if(core.browser.webkit){
							var A=window.innerHeight||document.body.offsetHeight;
							if(A>930){
								$("#gmap").css("height",A-519);
								$("#content-area").css("height",A-444);
								$("#top-list").css("height",A-495);
								$("#top-list .data").css("height",A-549)
							}else{
								$("#gmap").css("height",410);
								$("#content-area").css("height",486);
								$("#top-list").css("height",435);
								$("#top-list .data").css("height",380)
							}
						}
					}
				},
			init:function(){
					eat.area.layout.update();
					eat.area.filterBar.init();
					eat.area.topList.init();
					eat.area.location.init();
					eat.area.map.init();
					eat.area.notes.init()
				}
			};
			
$(document).ready(function(){
						eat.area.init()
						});

eat.area.filterBar={	openFilter:null,
						dateChanged:false,
						data:{	dateDay:null,
								dateMonth:null,
								dateYear:null,
								time:null,
								timeReadable:null,
								minPrice:0,
								maxPrice:1000,
								rating:2,
								ratingType:"overall",
								categories:[1,2,3,4,5,6],
								noCategory:true,
								feature:0,
								text:null},
						init:function(){
								var A=this;
								this.dateChanged=false;
								$("body").bind("click",function(){
											A.closeControls();
											window.setTimeout(function(){
															$(".filter-bar-button-update").addClass("disabled");
															A.renderData()
															},
															500)
											});
								$("#filter-bar .filter").bind("mouseover",function(){$(this).addClass("hover")}).bind("mouseout",function(){$(this).removeClass("hover")});
								$(".filter-bar-button-update").bind("click",function(){
																if(!$(this).is(".disabled")){
																	$("#"+A.openFilter+" .controls").fadeOut(250,function(){
																									A.updateData();
																									if(A.dateChanged){
																										document.location=document.location
																									}else{
																										eat.area.markers.loadData();
																										$(".filter-bar-button-update").addClass("disabled")
																									}
																									A.renderData();
																									A.openFilter=null
																									})
																}
								});
								$("#textfilter-form").bind("submit",function(){
															A.updateData();
															eat.area.markers.loadData();
															$(".filter-bar-button-update").addClass("disabled");
															A.renderData();
															A.closeControls();
															return false});
								$("#textfilter-reset").bind("click",function(){
															A.data.text=null;
															A.renderData();
															$(".filter-bar-button-update").removeClass("disabled");
															$.cookie("eatfilter",JSON.stringify(A.data),{expires:365,path:"/",domain:".eat.fi"});
															$(this).hide()});
								$(".filter-bar-button-close").bind("click",function(){
																			A.closeControls();
																			window.setTimeout(function(){
																								$(".filter-bar-button-update").addClass("disabled");
																								A.renderData()
																							},
																							500)
																			});
								$("#filter-bar .controls").bind("click",function(C){
																C.stopPropagation()
															});
								$("#filter-bar .filter").bind("click",function(C){
																C.stopPropagation();
																A.openControls(this)
															});
								$("#locationfilter").bind("click",function(){
																eat.area.presets.init()
															});
								$("#categoryfilter input[@type=checkbox]").bind("click",function(){
																A.updateCategories();
																$(".filter-bar-button-update").removeClass("disabled")
															});
								$("#categoryfilter input[@type=radio]").bind("click",function(){
																A.updateFeatures();
																$(".filter-bar-button-update").removeClass("disabled")
															});
								$("#pricefilter input[@type=radio]").bind("click",function(){
																$(".filter-bar-button-update").removeClass("disabled")
															});
								$("#ratingfilter input[@type=radio]").bind("click",function(){
																$(".filter-bar-button-update").removeClass("disabled")
															});
								$("#ratingfilter-type").bind("change",function(){
																$(".filter-bar-button-update").removeClass("disabled")
															});
								$("#datefilter input[@type=text]").bind("focus",function(){
																$(".filter-bar-button-update").removeClass("disabled");
																A.dateChanged=true
															});
								$("[@name=datefilter-switch]").bind("click",function(){
																$(".filter-bar-button-update").removeClass("disabled");
																var C=$("#datefilter-switch-custom").is("[@checked]");
																if(core.browser.msie){
																	if(C){
																		$("#datefilter-date-details").show()
																	}else{
																		$("#datefilter-date-details").hide()
																	}
																}else{
																	if(C){
																		$("#datefilter-date-details").slideDown()
																	}else{
																		$("#datefilter-date-details").slideUp()
																	}
																}
																A.dateChanged=true
															});
								$("#datefilter select").bind("change",function(){
																$(".filter-bar-button-update").removeClass("disabled");
																A.dateChanged=true
															});
								$("#textfilter-text").bind("focus",function(){
																$(".filter-bar-button-update").removeClass("disabled");
																$("#textfilter-reset").show()
															});
								var B=$.cookie("eatfilter");
								if(B){
									this.data=JSON.parse(B)
								}
								this.renderData();
								A.updateCategories();
								A.updateFeatures()
							},
						updateData:function(){
										this.data.categories=this.getCategories();
										this.data.noCategory=(($("#no-category[@checked]").length>0)?true:false);
										this.data.feature=this.getFeature();
										this.data.rating=this.getRating();
										this.data.ratingType=this.getRatingType();
										var C=this.getPrice();
										this.data.minPrice=C[0];
										this.data.maxPrice=C[1];
										var A=this.getDate();
										var B=(A)?A.split("."):[null,null,null];
										this.data.date=A;
										this.data.dateDay=B[0];
										this.data.dateMonth=B[1];
										this.data.dateYear=B[2];
										this.data.time=this.getTime();
										this.data.timeReadable=this.getTimeReadable();
										this.data.text=this.getText();
										$.cookie("eatfilter",JSON.stringify(this.data),{expires:365,path:"/",domain:".eat.fi"})
							},
						renderData:function(){
										var A=this;
										if(!A.data.feature){
											A.data.feature=0
										}
										$("#categoryfilter input[@type=checkbox]").each(function(){
																		var C=$(this);
																		var D=C.val();
																		if($.inArray(parseInt(D),A.data.categories)!=-1){
																			C.attr("checked",true)
																		}else{
																			C.attr("checked",false)
																		}
																	});
										var B="";
										for(a in A.data.categories){
											B+='<div class="categoryfilter-category" id="categoryfilter-'+A.data.categories[a]+'" title="'+__("area.filter.categoryFilter.category"+A.data.categories[a])+'">&nbsp;</div>'
										}
										if(A.data.feature==0){
											if(A.data.categories.length==7&&A.data.noCategory){
												$("#categoryfilter .data").html(__("area.filter.category.any")).removeClass("feature").addClass("any dimmed")
											}else{
												$("#categoryfilter .data").html(B).removeClass("feature").removeClass("any dimmed")
											}
										}else{
											$("#categoryfilter .data").html(__("area.filter.categoryFilter.feature"+A.data.feature)).removeClass("any dimmed").addClass("feature")
										}
										if(A.data.noCategory){
											$("#no-category").attr("checked",true)
										}else{
											$("#no-category").attr("checked",false)
										}
										$("#categoryfilter input[@type=radio]").each(function(){
											if($(this).val()==A.data.feature){
												$(this).attr("checked",true)
											}else{
												$(this).attr("checked",false)
											}});
										$("#ratingfilter input[@value="+this.data.rating+"]").attr("checked",true);
										$("#ratingfilter-type").val(this.data.ratingType);
										if(this.data.rating==1){
											$("#ratingfilter .data").html('<span class="ratingfilter-data" id="ratingfilter-data-any">('+__("area.filter.rating."+this.data.ratingType)+")</span>").addClass("dimmed")
										}else{
											$("#ratingfilter .data").html('<span class="ratingfilter-data" id="ratingfilter-data-'+this.data.rating+'">'+__("area.filter.rating."+this.data.ratingType)+"</span>").removeClass("dimmed")
										}
										if(this.data.dateDay&&this.data.dateMonth&&this.data.dateYear&&this.data.time){
											$("#datefilter-date-dd").val(this.data.dateDay);
											$("#datefilter-date-mm").val(this.data.dateMonth);
											$("#datefilter-date-yyyy").val(this.data.dateYear);
											$("#datefilter-time").val(this.data.time);
											$("#datefilter-switch-custom").attr("checked",true);
											$("#datefilter-date-details").show();
											$("#datefilter .data").html(this.data.dateDay+"."+this.data.dateMonth+". "+__("area.filter.date.time")+" "+this.data.timeReadable).removeClass("dimmed")
										}else{
											$("#datefilter-switch-now").attr("checked",true);
											$("#datefilter-date-details").hide();
											$("#datefilter .data").html(__("area.filter.date.now")).addClass("dimmed")
										}
										$("#pricefilter input").each(function(){
											var C=$(this);
											var D=C.val().split("-");
											if(parseInt(D[0])==parseInt(A.data.minPrice)&&parseInt(D[1])==parseInt(A.data.maxPrice)){
												C.attr("checked",true)
											}else{
												C.attr("checked",false)
											}
										});
										if(A.data.maxPrice==1000){
											$("#pricefilter .data").html(__("area.filter.price.nomaximum")).addClass("dimmed")
										}else{
											$("#pricefilter .data").html(__("area.filter.price.maximum")+" <strong>"+A.data.maxPrice+"</strong> &euro;").removeClass("dimmed")
										}
										if(this.data.text){
											$("#textfilter-text").val(this.data.text)
										}else{
											$("#textfilter-text").bind("focus",function(){
																			if($(this).is(".dimmed")){
																				$(this).val("");
																				$(this).removeClass("dimmed")
																			}
																		}).val(__("area.filter.other.example")).addClass("dimmed")
										}
										if(this.data.text){
											$("#otherfilter .data").html("”"+this.data.text+"”");
											$("#otherfilter .data").removeClass("dimmed");
											$("#textfilter-reset").show()
										}else{
											$("#otherfilter .data").html(__("area.filter.other.notused"));
											$("#otherfilter .data").addClass("dimmed")
										}
										this.updateCategories();
										this.updateFeatures()
							},
						openControls:function(B){
								var A=true;
								if(this.openFilter){
									if(this.openFilter==B.id){
										A=false
									}
									this.closeControls()
								}
								if(A){
									if(core.browser.msie6){
										$("#"+B.id+" .controls").show()
									}else{
										$("#"+B.id+" .controls").fadeIn(250)
									}
									this.openFilter=B.id
								}
							},
						closeControls:function(){
								if(core.browser.msie6){
									$("#"+this.openFilter+" .controls").hide()
								}else{
									$("#"+this.openFilter+" .controls").fadeOut(250)
								}
								this.openFilter=null
							},
						getCategories:function(){
								var A=[];
								$("#categoryfilter-categories input[@checked]").each(function(){
																		if(!$(this).is("#no-category")){
																			A.push(parseInt($(this).val()))
																		}
																	});
								return A
							},
						updateCategories:function(){
								$("#categoryfilter input[@type=checkbox]").each(function(){
																	if(!this.checked){
																		$(this).parents(".category-small").addClass("disabled")
																	}else{
																		$(this).parents(".category-small").removeClass("disabled")
																	}
																})
							},
						getFeature:function(){
								return $("#categoryfilter-features input[type=radio][@checked]").val()
							},
						updateFeatures:function(){
								if(core.browser.msie){
									if($("#featurefilter-feature-disabled").attr("checked")){
										$("#categoryfilter-categories").show();
										$("#categoryfilter-feature-info").hide()
									}else{
										$("#categoryfilter-categories").hide();
										$("#categoryfilter-feature-info").show()
									}
								}else{
									if($("#featurefilter-feature-disabled").attr("checked")){
										$("#categoryfilter-feature-info").slideUp(250,function(){
																		$("#categoryfilter-categories").slideDown(500)
																		})
									}else{
										$("#categoryfilter-categories").slideUp(500,function(){
																		$("#categoryfilter-feature-info").slideDown(250)
																		})
									}
								}
							},
						getRating:function(){
								var A=$("#ratingfilter input[@checked]").val();
								return(A!="")?A:0
							},
						getRatingType:function(){
								return $("#ratingfilter-type").val()
							},
						getPrice:function(){
								var A=[];
								$("#pricefilter input[@checked]").each(function(){
															A.push($(this).val())
															}
								);
								return(A.length>0)?[A[0].split("-")[0],A.pop().split("-")[1]]:[0,0]
							},
						getDate:function(){
							var D=$("#datefilter-switch-custom").is("[@checked]");
							var C=$("#datefilter-date-dd").val();
							var B=$("#datefilter-date-mm").val();
							var A=$("#datefilter-date-yyyy").val();
							return(D)?C+"."+B+"."+A:null
						},
						getTime:function(){
							var A=$("#datefilter-switch-custom").is("[@checked]");
							var B=$("#datefilter-time").val();
							return(A)?B:null
						},
						getTimeReadable:function(){
							var A=$("#datefilter-switch-custom").is("[@checked]");
							var C=$("#datefilter-time")[0];
							var B=C.options[C.selectedIndex].text;
							return(A)?B:null
						},
						getText:function(){
							var A=$("#textfilter-text").val();
							return(!$("#textfilter-text").is(".dimmed"))?A:null
						}
					};
			
eat.area.presets={	initialized:false,
					data:[],
					init:function(){
							var A=this;
							if(!this.initialized){
								$("#preset-name").val(__("area.filter.locationFilter.userPresets.nameText")).addClass("dimmed").bind("focus",function(){
																														if($(this).is(".dimmed")){
																															$(this).val("").removeClass("dimmed")
																														}
																													});
								$("#preset-save-form").bind("submit",function(){
																	A.setPreset();
																	return false
																});
								this.update();
								this.initialized=true
							}
					},
					update:function(){
							$("#preset-entries").html("");
							for(var A=0;A<this.data.length;A++){
								$("#preset-entries").append(this.getPresetHTML(A,this.data[A].name))
							}
							if(this.data.length>0){
								$("#presets-no-help").hide();
								$("#preset-entries").show()
							}else{
								$("#presets-no-help").show();
								$("#preset-entries").hide()
							}
						},
					setPreset:function(){
							var A=this;
							var B={	map:eat.area.map.state,
									filter:eat.area.filterBar.data
							};
							if(!$("#preset-name").is(".dimmed")&&$("#preset-name").val().length>1){
								B.name=$("#preset-name").val();
								$.post(	eat.settings.presetsAddUrl,
										{preset:JSON.stringify(B)},
										function(C){
											alert(__("area.filter.locationFilter.userPresets.presetSaved"));
											A.data=C;
											A.update();
											$("#preset-name").val(__("area.filter.locationFilter.userPresets.nameText")).addClass("dimmed")
										},
										"json")
							}else{
								alert(__("area.filter.locationFilter.userPresets.enterName"))
							}
						},
					getPreset:function(C){
									var B=null;
									for(var A=0;this.data[A];A++){
										if(A==C){
											B=this.data[A];
											break
										}
									}
									if(B){
										eat.area.filterBar.closeControls();
										eat.area.map.state=B.map;
										eat.area.filterBar.data=B.filter;
										for(var A=0;eat.area.filterBar.data.categories[A];A++){
											eat.area.filterBar.data.categories[A]=parseInt(eat.area.filterBar.data.categories[A])
										}
										$("#filter-bar .filter .data").fadeOut(50,function(){
																	eat.area.filterBar.renderData()
																	}
										);
										window.setTimeout(function(){
														$("#filter-bar .filter .data").fadeIn(750);
														$("#location-presets-flash").css("opacity",0.8).show().animate({opacity:0},750,function(){
																												$("#location-presets-flash").hide()
																												})
														},100);
										window.setTimeout(function(){
														eat.area.map.renderState()
														},1100)
									}
						},
					getPresetHTML:function(C,A){
							var B="";
							B+='<div class="preset-entry" id="preset-'+C+'">';
							B+='<div class="preset-link">';
							B+="<a href=\"javascript:eat.area.presets.deletePreset('"+C+"');\">"+__("area.filter.locationFilter.userPresets.deleteLink")+"</a>";B+="</div>";
							B+='<div class="preset-text">';
							B+="<a href=\"javascript:eat.area.presets.getPreset('"+C+"');\">"+A+"</a>";
							B+="</div>";B+="</div>";
							return B
						},
					deletePreset:function(B){
							var A=this;
							if(confirm(__("area.filter.locationFilter.userPresets.confirmDelete"))){
								$.post(	eat.settings.presetsDeleteUrl,
										{preset:B},
										function(C){
											A.data=C;
											A.update()
										},
										"json"
								)
							}else{
								eat.area.filterBar.closeControls()
							}
						}
				};
			
eat.area.topList={	data:null,
					html:null,
					hideClosed:0,
					init:function(){
							var A=this;
							this.data=$("#top-list .data");
							var B=$.cookie("eattoplist");
							if(B){
								this.hideClosed=parseInt(B)
							}
							$("#top-list-toggle").bind("click",function(){
														A.hideClosed=($("#top-list-toggle").attr("checked"))?1:0;A.update()
														})
							},
					update:function(){
								var J=this;
								if(this.html){
									this.data.html(this.html)
								}else{
									var C=[];
									var D=[];
									var N=[];
									for(marker in eat.area.markers.data){
										var Q=eat.area.markers.data[marker];
										if(Q){
											var E=Q.data.lbl;
											var M=Q.data.sts;
											var S=Q.data.rvw;
											var K=((S<100&&S>9)?"0"+S:((S<10)?"00"+S:S));
											var G=null;
											switch(eat.area.filterBar.data.ratingType){
												case"overall":
													G=String(Q.data.rgo);
													break;
												case"quality":
													G=String(Q.data.rgq);
													break;
												case"experience":
													G=String(Q.data.rge);
													break;
												case"price":
													G=String(Q.data.rgp);
													break
										}
										if($.inArray(parseInt(marker),eat.area.markers.shownIds)!=-1){
											if(this.hideClosed==1&&M=="closed")
											{}else{
												if(G=="null"){
													C.push("norating"+E+"_"+K+"_"+marker)
												}else{
													if(S<eat.settings.reviewLimit){
														D.push(G+"_"+K+"_"+marker)
													}else{
														N.push(G+"_"+K+"_"+marker)
													}
												}
											}
										}
									}
								}
								C.sort();
								N.sort().reverse();
								D.sort().reverse();
								var O=$.merge(N,D);
								var H=$.merge(O,C);
								var F="";
								var P=null;
								for(var U=0;H[U];U++){
									var V=H[U];
									var L=V.split("_")[2];
									var A=(eat.area.markers.data[L].data.rvw>0)?((eat.area.markers.data[L].data.rvw<eat.settings.reviewLimit)?"lowreviews":""):"noreviews";
									var I=(eat.area.markers.data[L].data.favorite)?"favorite":"";
									var R=(eat.area.markers.data[L].data.bookmark)?"bookmark":"";
									var B=eat.area.markers.data[L].data.sts;
									var T=(eat.area.markers.data[L].data.sponsor)?"sponsor":"";
									var G=null;
									switch(eat.area.filterBar.data.ratingType){
										case"overall":
											G=(eat.area.markers.data[L].data.rgo!=undefined)?eat.area.markers.data[L].data.rgo:"";
											break;
										case"quality":
											G=(eat.area.markers.data[L].data.rgq!=undefined)?eat.area.markers.data[L].data.rgq:"";
											break;
										case"experience":
											G=(eat.area.markers.data[L].data.rge!=undefined)?eat.area.markers.data[L].data.rge:"";
											break;
										case"price":
											G=(eat.area.markers.data[L].data.rgp!=undefined)?eat.area.markers.data[L].data.rgp:"";
											break
									}
									if(A!=P){
										F+='<div class="divider">';
										if(A=="lowreviews"){
											F+="<h4>"+__("area.toplist.lowreviews")+" <small>"+__("area.toplist.title."+eat.area.filterBar.data.ratingType)+"</small></h4>"
										}else{
											if(A=="noreviews"){
												F+="<h4>"+__("area.toplist.noreviews")+" <small>"+__("area.toplist.title."+eat.area.filterBar.data.ratingType)+"</small></h4>"
											}else{
												F+="<h4>"+__("area.toplist.goodreviews")+" <small>"+__("area.toplist.title."+eat.area.filterBar.data.ratingType)+"</small></h4>"
											}
										}
										F+="</div>"
									}
									F+='<a id="toplist_entry_'+L+'" ';
									F+='class="entry '+R+" "+I+" "+A+" "+B+" "+T+'" ';
									F+='href="'+eat.settings.restaurantUrl+"/"+L+'">';
									if(eat.area.markers.data[L].data.msg){
										F+='<div class="ad-message">';
										F+='<div class="ad-message-header"></div>';
										F+='<div class="ad-message-body">'+eat.area.markers.data[L].data.msg+"</div>";
										F+='<div class="ad-message-footer"></div>';
										F+="</div>"
									}
									F+='<div class="rating">'+G+"</div>";
									F+='<div class="icon"></div>';
									if(eat.area.markers.data[L].data.cat){
										for(b=0;b<eat.area.markers.data[L].data.cat.length;b++){
											F+='<div class="category" id="category-'+eat.area.markers.data[L].data.cat[b]+'" title="'+__("area.filter.categoryFilter.category"+eat.area.markers.data[L].data.cat[b])+'">&nbsp;</div>'
										}
									}
									if(eat.area.markers.data[L].data.lbl.length>20){
										F+='<div class="label" title="'+eat.area.markers.data[L].data.lbl+'"><span>'+eat.area.markers.data[L].data.lbl
									}else{
										F+='<div class="label"><span>'+eat.area.markers.data[L].data.lbl
									}
									if(core.settings.debug){
										F+=L
									}
									F+="</span></div>";
									F+='<div class="descr" title="'+__("area.toplist.status."+B)+'">'+((eat.area.markers.data[L].data.dsc)?eat.area.markers.data[L].data.dsc:__("area.toplist.descriptionMissing"))+"&nbsp;</div>";
									F+="</a>";P=A}F+='<div class="entry ending"></div>';
									if(H.length==0){
										F+='<div class="entry-empty">'+__("area.toplist.noOpenRestaurants")+"</div>"
									}
									$("#top-list .data").html(F);
									if(this.hideClosed==1){
										$("#top-list-toggle").attr("checked","checked")
									}else{
										$("#top-list-toggle").attr("checked","")
									}
									$("#top-list-controls").show();
									$.cookie("eattoplist",this.hideClosed,{expires:365,path:"/",domain:".eat.fi"})
								}
								$("#top-list h3 small").html("("+eat.area.markers.shownIds.length+")");
								$("#top-list .data a").bind("mouseover",function(){
															J.showHighlight(this.id.split("_")[2])
														}).bind("mouseout",function(){
																		J.hideHighlight()
																		});
								$("#top-list")[0].scrollTop=0;
								$("#top-list-status").show();
								window.setTimeout(function(){
													$("#top-list-status").fadeOut(1000)
												},
												1000)
							},
					showHighlight:function(A){
										eat.area.markers.showHighlight(A)
							},
					hideHighlight:function(A){
										eat.area.markers.hideHighlight(A)
							}
				};
			
eat.area.location={	openLocation:null,
					init:function(){
								var A=this;
								$("body").bind("click",function(){A.closeControls()});
								$("#location-navi li")	.bind("mouseover",function(){$(this).addClass("hover")})
														.bind("mouseout",function(){$(this).removeClass("hover")});
								$("#location-navi-city").bind("click",function(B){	
																A.openControls(this,"location-city");
																B.stopPropagation()
															});
								$("#location-navi-presets").bind("click",function(B){
																A.openControls(this,"location-presets");
																B.stopPropagation()
															});
								$("#location-navi-current").bind("click",function(B){
																A.showCurrentLocation($(this));
																B.stopPropagation()
															});
								if("geolocation" in navigator){
									$("#location-navi-current").show()
								}
								$("#location-presets li, #location-city li").bind("mouseover",function(){$(this).addClass("hover")})
																			.bind("mouseout",function(){$(this).removeClass("hover")});
								$("#location-navi-address").bind("click",function(B){
									A.openControls(this,"location-address");
									B.stopPropagation()
								});
								$("#location-address, #location-presets, #location-city").bind("click",function(B){B.stopPropagation()});
								$(".location-close").each(function(){$(this).bind("click",function(){A.closeControls()})});
								$("#address-input").val(__("area.location.address.example")).addClass("dimmed").bind("focus",function(){
																								if($(this).is(".dimmed")){
																									$(this).val("");
																									$(this).removeClass("dimmed");
																									$("#address-submit").attr("disabled",false)
																								}
																							});
								$("#address-submit").bind("click",function(){A.setAddress()}).attr("disabled",true);
								$("#address-form").bind("submit",function(){
														A.setAddress();
														return false});
								this.citySearch.init();
								this.otherCities.init()
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
					setPreset:function(C,A,B){
								this.closeControls();
								window.setTimeout(function(){
												eat.area.map.gMap.setCenter(new GLatLng(C,A),B)
											}
											,250)
							},
					setAddress:function(){
								var B=this;
								var C=new GClientGeocoder();
								var A=$("#address-input").val();
								if(A!=""){
									C.getLocations(A,function(D){
													var E=eat.area.map.gMap;
													if(D.Placemark){
														B.closeControls();
														window.setTimeout(function(){
																		var G=D.Placemark[0];
																		var F=new GLatLng(G.Point.coordinates[1],G.Point.coordinates[0]);
																		E.setCenter(F)
																		},250)
													}else{
														alert(__("area.location.address.invalidaddress"))
													}
												})
								}
							},
					showCurrentLocation:function(B){
											var B=B||$("#location-navi-current");
											B.addClass("progress");
											navigator.geolocation.getCurrentPosition(function(C){
																			if(!!C.coords){
																				$.get(eat.settings.areaCityUrl,
																					{lat:C.coords.latitude,
																					lng:C.coords.longitude},
																					function(E){
																						if(!!E.city&&E.city!=eat.area.map.state.city){
																							document.location=eat.settings.indexUrl+"?cityId="+E.city+"&lat="+C.coords.latitude+"&lng="+C.coords.longitude+"&zoom=16&showlocation=1"
																						}else{
																							eat.area.map.gMap.setCenter(new GLatLng(C.coords.latitude,C.coords.longitude),16);
																							B.removeClass("progress");
																							var D=$("#current-location");
																							if(D.length==0){
																								D=$('<div id="current-location" title="'+eat.locale.strings["area.location.navi.currentLocation"]+'">').appendTo($("#gmap"))
																							}
																							D.show();
																							GEvent.addListener(eat.area.map.gMap,"moveend",function(){D.remove()})
																						}
																					},
																					"json")
																			}
																		},function(C){A()});
											window.setTimeout(function(){A()},10000);
											var A=function(){
												if(B.hasClass("progress")){
													alert(eat.locale.strings["area.location.currentLocation.error"])
												}
												B.removeClass("progress")
											}
										},
					recent:{	cities:[],
								city:{name:null,link:null},
								init:function(){
											this.readCookie();
											this.update();
											if(this.cities.length>1){
												$("#recent-locations").show()
											}else{
												$("#recent-locations").hide()
											}
											this.saveCookie();
											this.render()
									},
								update:function(){
											var A=this.city.name+"|"+this.city.link;
											if($.inArray(A,this.cities)==-1){
												this.cities.push(A)
											}
											if(this.cities.length>=eat.settings.recentCities){
												this.cities.splice(0,this.cities.length-eat.settings.recentCities)
											}
									},
								readCookie:function(){
											if($.cookie("eatcities")){
												var A=JSON.parse($.cookie("eatcities"));
												this.cities=A.cities;
												this.isOpen=A.isOpen
											}
									},
								saveCookie:function(){
											$.cookie("eatcities",JSON.stringify({cities:this.cities,isOpen:this.isOpen}),{expires:30,path:"/",domain:".eat.fi"})
									},
								render:function(){
										var D=this.cities.sort();
										var B=$("#latest-cities-select");
										for(var C in D){
											var A=D[C].split("|");
											B[0].options[parseInt(C)+1]=new Option(A[0],A[1])
										}
										B.bind("change",function(){
														document.location=$(this).val()
														}
													)
									}
							},
					citySearch:{init:function(){
											$("#city-search-text").val(__("area.location.citySearch.default")).addClass("dimmed").bind("focus",function(){
																													if($(this).is(".dimmed")){
																														$(this).removeClass("dimmed").val("")
																													}
																												})
											}},
					otherCities:{init:function(){
											$("#other-cities-select").bind("change",function(){
																			document.location=$(this).val()
																			})
											}}
					};
			
eat.area.social={	dom:{},
					init:function(){
							var A=this;
							this.personal.init();
							this.activity.init();
							this.recommend.init();
							this.login.init()
						},
					personal:{	data:{state:null},
								dom:{},
								init:function(){
													this.dom.core=$("#personal");
													this.data.state=eat.settings.personalState
											},
								render:function(B){
													var A=this;
													if(this.data.state!=B){
														if(B=="loggedin"){
															eat.area.social.login.close(function(){
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
									remember:0
									},
							init:function(){
									var A=this;
									this.dom.core=$("#login");
									this.dom.form=$("#login form");
									this.dom.progress=$("#login-progress");
									this.dom.usernameInput=$("#login input[@name=username]");
									this.dom.passwordInput=$("#login input[@name=password]");
									this.dom.rememberInput=$("#login input[@name=remember]");
									this.dom.submitInput=$("#login-form-submit input");
									this.dom.form.bind("submit",function(){
																			A.doLogin();
																			return false
																			})
									},
							doLogin:function(){
									var A=this;
									this.data.username=this.dom.usernameInput.val();
									this.data.password=this.dom.passwordInput.val();
									this.data.remember=(this.dom.rememberInput.attr("checked")?1:0);
									this.progress("show",function(){
																	A.dom.submitInput.attr("disabled",true);
																	$.post(				eat.settings.ajaxLoginUrl,
																						A.data,
																						function(B){
																							if(B.success){
																								if(B.action){
																									switch(B.action){
																										case"redirect":
																											document.location=B.url;
																											break
																									}
																								}else{
																									eat.area.social.personal.render("loggedin");
																									window.setTimeout(function(){
																													eat.area.social.activity.load();
																													eat.area.social.recommend.load();
																													var C=eat.header.userbar;
																													C.data.username=A.data.username;
																													C.data.profile=B.profile;
																													C.render();
																													eat.area.markers.resetMarkers()
																												},
																												1100)
																								}
																							}else{
																								A.progress("hide",function(){alert(__("area.social.login.error"));
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
					activity:{	data:{items:[]},
								dom:{},
								init:function(){
															this.dom.core=$("#activity");
															this.dom.data=$("#activity-data");
															this.dom.footer=$("#activity-footer");
															this.dom.pager=$("#activity-pager");
															this.dom.progress=$("#activity-progress");
															this.pager(this.dom.pager,this.data.pager)
														},
								load:function(B){
															var A=this;
															this.progress("show");
															if(!B){
																var B=eat.settings.activityUrl
															}
															$.post(	B,
																	{type:"personal"},
																	function(C){
																		A.progress("hide",function(){
																						A.data.items=C.items;
																						A.data.empty=C.empty;
																						A.data.pager=C.pager;
																						A.render()
																						})
																	},
																	"json")
														},
								render:function(){
															var B=this;
															var C="";
															if(this.data.items){
																if(this.data.items.length>0){
																	C+='<div class="page">';
																	for(var A in this.data.items){
																		var D=this.data.items[A];
																		C+='<div class="entry entry-'+D.type+'">';
																		C+='<div class="entry-start"></div>';
																		C+='<div class="entry-body">';
																		C+='<div class="entry-image"><img src="'+D.image+'" alt="" /></div>';
																		C+='<div class="entry-text">'+D.text+"</div>";
																		C+='<div class="entry-date">'+D.date+"</div>";
																		C+="</div>";
																		C+='<div class="entry-end"></div>';
																		C+="</div>"
																	}
																	C+="</div>"
																}
															}
															if(this.data.empty){
																C+=this.data.empty
															}
															this.dom.data.append(C);
															this.dom.page=$(".page:last");
															this.pager(this.dom.pager,this.data.pager);
															this.dom.page.fadeIn(1000,function(){
																				B.dom.pager.fadeIn(500)
																				})
														},
								pager:function(C,B){
															var A=this;
															if(B){C.html(B)}
															$("a",C).click(function(D){
																			D.preventDefault();
																			C.fadeOut(500,function(){
																						A.load($("a",C).attr("href"))
																						});
																			return false
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
														}
								},
					recommend:{	data:{items:[]},
											dom:{},
											init:function(){
																	var A=this;
																	this.dom.core=$("#recommend");
																	this.dom.data=$("#recommend-data");
																	this.dom.dataBody=$("#recommend-data-body");
																	this.dom.progress=$("#recommend-progress");
																	this.dom.cards=$("#recommend-cards");
																	this.dom.nextButton=$("#recommend-cards-next");
																	this.dom.prevButton=$("#recommend-cards-prev");
																	if($("a",this.dom.cards).length>0){
																		A.carousel.init()
																	}
																	this.dom.data.bind("mouseover",function(){
																								if($(".recommend-card",A.dom.core).length>0){
																									A.dom.prevButton.show();
																									A.dom.nextButton.show()
																								}
																							}).bind("mouseout",function(){
																											A.dom.prevButton.hide();
																											A.dom.nextButton.hide()
																	});
																	this.dom.nextButton.click(function(B){
																						B.preventDefault();
																						B.stopPropagation();
																						A.carousel.nextCard(true)
															});
																	this.dom.prevButton.click(function(B){
																								B.preventDefault();
																								B.stopPropagation();
																								A.carousel.previousCard(true)
																							})
															},
											load:function(){
																	var A=this;
																	this.progress("show");
																	$.post(	eat.settings.recommendUrl,
																			{type:"personal"},
																			function(B){
																					A.progress("hide",function(){
																									A.data.items=B;
																									A.render()
																									})
																			},
																			"json")
															},
											render:function(){
																	var B=this;
																	this.dom.data.hide();
																	if(this.data.items){
																		if(this.data.items.length>0){
																			var C="";
																			for(var A in this.data.items){
																				var D=this.data.items[A];
																				C+='<a href="'+D.link+'" class="recommend-card" id="recommend-card-'+D.id+'">';
																				if(D.image){
																					C+='<div class="recommend-card-image"><img src="'+D.image+'" alt="" /></div>'}else{
																					C+='<div class="recommend-card-image"><img src="'+eat.settings.noRecommendationImage+'" alt="" /></div>';
																					C+='<div class="recommend-card-image-default">'+__("area.social.recommend.noImage")+"</div>"
																				}
																				C+='<div class="recommend-card-mask">';
																				C+='<div class="recommend-card-mask-image"></div>';
																				C+="</div>";
																				C+='<div class="recommend-card-text">';
																				C+="<h4>"+D.name+"<small>"+D.type+"</small></h4>";
																				C+='<div class="recommend-card-quote">'+D.quote+"</div>";
																				C+="</div>";
																				C+="</a>"
																			}
																			this.dom.cards.html(C);
																			this.dom.data.fadeIn(1000,function(){
																								B.carousel.init()
																								})
																		}else{
																			this.dom.cards.html(__("area.social.recommend.empty"));
																			this.dom.data.fadeIn(1000)
																		}
																	}else{
																		this.dom.cards.html(__("area.social.recommend.empty")).show();
																		this.dom.data.fadeIn(1000)
																	}
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
											carousel:{	timer:null,
														data:{	index:0,
																			total:0,
																			height:220
																	},
														dom:{},
														init:function(){
																			var A=this;
																			this.dom.core=$("#recommend-cards");
																			this.dom.counter=$("#recommend h3 small");
																			this.data.total=$("#recommend-cards a").length;
																			this.render(true);
																			this.timer=window.setTimeout(function(){
																									A.nextCard()
																									},10000)
																	},
														render:function(C,B){
																				var A=this;
																				if(C){
																					this.dom.counter.html((this.data.index+1)+"/"+this.data.total)
																				}else{
																					if(core.browser.msie6||B){
																						A.dom.core.css("top",parseInt("-"+(A.data.index*A.data.height)));
																						this.timer=window.setTimeout(function(){
																														A.nextCard()
																													},10000)
																					}else{
																						this.dom.core.fadeOut(1000,function(){
																													A.dom.core.css("top",parseInt("-"+(A.data.index*A.data.height))).fadeIn(1000,function(){
																																							A.timer=window.setTimeout(function(){A.nextCard()},10000)
																																							})
																										})
																					}
																					A.dom.counter.html((A.data.index+1)+"/"+A.data.total)
																				}
																			},
														nextCard:function(A){
																				clearTimeout(this.timer);
																				this.data.index++;
																				if(this.data.index==this.data.total){
																					this.data.index=0
																				}
																				this.render(false,A)
																	},			
														previousCard:function(A){
																				clearTimeout(this.timer);
																				this.data.index--;
																				if(this.data.index==-1){
																					this.data.index=(this.data.total-1)
																				}
																				this.render(false,A)
																	}
											}
								}
				};
											
$(document).ready(function(){
				eat.area.social.init()
				}
);
