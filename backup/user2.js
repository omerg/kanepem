eat.user={
	init:function(){
		eat.user.basic.init();
		eat.user.category.init();
		eat.user.location.init();
		eat.user.settings.init();
		eat.user.timetable.init();
		eat.user.lunchUrlValidation.init()
	},
	sidebar:{init:function(){},showNewRestaurantForm:function(){$("#restaurant-new-control").hide();$("#restaurant-new-form").show()}},
	basic:{init:function(){$("#user-restaurant-description input").bind("keyup",function(){$(this).val($(this).val().toLowerCase())});$("#comments_disabled").bind("click",function(){if(core.browser.msie){if($(this).attr("checked")){$("#disable-comments-info").show()}else{$("#disable-comments-info").hide()}}else{if($(this).attr("checked")){$("#disable-comments-info").slideDown()}else{$("#disable-comments-info").slideUp()}}});if($("#comments_disabled").attr("checked")){$("#disable-comments-info").show()}}},
	category:{init:function(){var A=this;this.update();if($("#user-restaurant-description").length>0){$("#restaurant_form input[type=checkbox]").bind("click",function(){A.update()})}},update:function(){if($(".category-small input[type=checkbox]:checked").length==3){$(".category-small input[type=checkbox]").each(function(){if(!this.checked){$(this).attr("disabled","disabled");$(this).parents(".category-small").addClass("disabled")}})}else{$(".category-small input[type=checkbox]").each(function(){if(!this.checked){$(this).removeAttr("disabled");$(this).parents(".category-small").removeClass("disabled")}})}}},
	location:{
		map:null,
		address:null,
		latitude:null,
		longitude:null,
		marker:null,
		init:function(){
			var A=this;if($("#gmap").length>0&&GBrowserIsCompatible()){this.latitude=$("#latitude").val();this.longitude=$("#longitude").val();this.map=new GMap2($("#gmap")[0]);this.map.addControl(new GSmallMapControl());if(this.latitude!=""||this.longitude!=""){this.map.setCenter(new GLatLng(this.latitude,this.longitude),15)}else{this.map.setCenter(new GLatLng(60.1659,24.9382),13)}this.marker=new GMarker(new GLatLng(this.latitude,this.longitude),{draggable:true,clickable:true});this.map.addOverlay(this.marker);GEvent.addListener(this.map,"click",function(C,B){if(!C){A.updatePosition(B);A.marker.setPoint(B)}});GEvent.addListener(this.marker,"dragend",function(){A.updatePosition(A.marker.getPoint())});$(window).unload(function(B){GUnload()})}},
		moveAndCenter:function(){var A=new GLatLng($("#latitude").val(),$("#longitude").val());this.marker.setPoint(A);this.map.setCenter(A)},
		updatePosition:function(A){var B=this;$("#latitude").val(A.lat());$("#longitude").val(A.lng());window.setTimeout(function(){B.moveAndCenter()},100)},
		findAddress:function(){
			var B=$("input[name=street_address]").val();
			var A=$("input[name=city]").val();
			this.address=B+", "+A;
			this.resolveAddress("address")
		},
		resolveAddress:function(B){
			var A=this;
			var C=new GClientGeocoder();
			if(this.address!=""){
				C.getLocations(this.address,function(D){
													 var E=eat.user.location.map;
													 if(D.Placemark){
														 place=D.Placemark[0];
														 point=new GLatLng(place.Point.coordinates[1],place.Point.coordinates[0]);
														 E.setCenter(point);
														 $("#latitude").val(place.Point.coordinates[1]);
														 $("#longitude").val(place.Point.coordinates[0]);
														 A.init();
														 if(B=="city"){
															 alert(__("user.editRestaurant.address.invalidaddress"))
														}
													}
													else{
														if(B=="city"){
															E.setCenter(new GLatLng(60.1659,24.9382),13);
															alert(__("user.editRestaurant.address.invalidcity"))
														}else{
															A.address=$("input[name=city]").val()+", Finland";
															A.resolveAddress("city")
														}
													}
				})
			}
		}
	},
	timetable:{init:function(){var A=this;if(!core.browser.msie6){$("#timetable input[type=checkbox]").bind("click",function(){A.updateEntries(this)});$("#timetable .timetable-block-open input[type=checkbox]").bind("click",function(){A.updateDays(this)});$("#timetable .timetable-block-active input[type=checkbox]").bind("click",function(){A.updateDays(this)});$("#timetable .timetable-set-description input[type=checkbox]").bind("click",function(){A.updateSets(this)});$("#timetable .timetable-block-data-input input").bind("focus",function(){$(this).addClass("focus");this.select()}).bind("blur",function(){$(this).removeClass("focus");if($(this).val().match(new RegExp("[0-9][0-9]?"))){var B=$(this).val().replace(":",".");var C=$.format("{a:.2f}",{a:B}).replace(".",":");if(C.length==4){C="0"+C}$(this).val(C)}}).bind("keyup",function(E){var B=(E)?E:(window.event)?window.event:null;if(B){if(!B.ctrlKey&&!B.altKey&&!B.metaKey){var C=(B.charCode)?B.charCode:((B.keyCode)?B.keyCode:((B.which)?B.which:0));if(C==91){this.select()}else{if(C==9||C==16||C==17){}else{if($(this).val().match(new RegExp("[0-9][0-9][0-9][0-9]"))){var D=$(this).val();$(this).val(D.charAt(0)+D.charAt(1)+":"+D.charAt(2)+D.charAt(3))}$(this).val($(this).val().replace(/[\.|;|,]/,":").replace(/^:|[^0-9:]/,"").replace(/::/g,":"))}}}}});$(".timetable-set").each(function(){var B=this.id;$(".timetable-block",this).each(function(){var C=0;$(".timetable-block-data-entry",this).each(function(){$(this).addClass(B+C);C++})})});if($(".date-pick").length>0){$(".date-pick").datePicker({createButton:true,showYearNavigation:false})}Date.format="dd.mm.yyyy";$("#summer-start-date").bind("dpClosed",function(C,B){var D=B[0];if(D){D=new Date(D);$("#summer-end-date").dpSetStartDate(D.addDays(1).asString())}});$("#summer-end-date").bind("dpClosed",function(C,B){var D=B[0];if(D){D=new Date(D);$("#summer-start-date").dpSetEndDate(D.addDays(-1).asString())}});$("#closing-start-date").bind("dpClosed",function(C,B){var D=B[0];if(D){D=new Date(D);$("#closing-end-date").dpSetStartDate(D.addDays(1).asString())}});$("#closing-end-date").bind("dpClosed",function(C,B){var D=B[0];if(D){D=new Date(D);$("#closing-start-date").dpSetEndDate(D.addDays(-1).asString())}});$("#user-restaurant-times form").bind("submit",function(){A.validateDays();A.validateTimes();if($("#timetable .error").length>0){alert("Please check the inputs marked with red.");return false}});$("#timetable input[type=text],.dp-choose-date").bind("focus",function(){$("input[type=text]",$(this).parent()).removeClass("error")});this.updateSets();this.updateDays()}},validateTimes:function(){var A=new RegExp("[0-9][0-9]:[0-9][0-9]");$(".timetable-block-data-entry").each(function(){var D=true;var E=$("input[type=checkbox]",this);var F=$(".timetable-block-data-input input[type=text]",this);if(F.length>0){if(!F.parent().eq(0).is(".closed")&&(E.length==0||E[0].checked)){var C=parseInt(F.eq(0).val().replace(":",""));var B=parseInt(F.eq(1).val().replace(":",""));if(!F.eq(0).val().match(A)||!F.eq(1).val().match(A)){D=false}}}if(D){$("input[type=text]",this).removeClass("error")}else{$("input[type=text]",this).addClass("error")}})},validateDays:function(){var A=new RegExp("[0-9][0-9].[0-9][0-9].[0-9][0-9][0-9][0-9]");$("#timetable .date-pick").each(function(){var B=true;if(!this.disabled){if(!$(this).val().match(A)){B=false}if(B){$(this).removeClass("error")}else{$(this).addClass("error")}}})},updateSets:function(A){var B=(A)?$(A).parents(".timetable-set"):$("#timetable");$(".timetable-set-description input[type=checkbox]",B).each(function(){var E=$(this).parents(".timetable-set");var D=$(".timetable-set-data",E);var C=$("input[type=text]",E);if(this.checked){D.show();C.removeAttr("disabled")}else{D.hide();C.attr("disabled","disabled");C.removeClass("error")}})},updateDays:function(A){var B=(A)?$(A).parents(".timetable-set-data"):$("#timetable");$(".timetable-block-open input[type=checkbox]",B).each(function(){var G=$(this).parents(".timetable-block-data-entry");var F=G[0].className.split(" ");var E=F[F.length-1];var C=$("."+E+".timetable-block-data-entry div",B);var D=$("."+E+".timetable-block-data-entry div.timetable-block-data-closed",B);if(this.checked){C.removeClass("closed");C.show();D.hide()}else{C.addClass("closed");C.hide();D.show()}});$(".timetable-block-active input[type=checkbox]",B).each(function(){var J=$(this).parents(".timetable-block-data-entry");var I=J[0].className.split(" ");var G=I[I.length-1];var C=$("."+G+".timetable-block-data-entry input.input",$("#timetable-set-special"));var F=$("."+G+".timetable-block-data-entry .dp-choose-date",$("#timetable-set-special"));var D=$("."+G+".timetable-block-data-entry div.timetable-block-data-closed",$("#timetable-set-special"));var H=$("."+G+".timetable-block-data-entry span",$("#timetable-set-special"));var E=$(".timetable-block-open ."+G+".timetable-block-data-entry input.input",$("#timetable-set-special"));if(this.checked){C.removeAttr("disabled");F.show();H.removeClass("disabled");if(!E.attr("checked")){D.show()}}else{C.attr("disabled","disabled");F.hide();D.hide();H.addClass("disabled")}});this.updateEntries()},updateEntries:function(A){var B=(A)?$(A).parents(".timetable-set-data"):$("#timetable");$(".timetable-block-data-entries input[type=checkbox]",B).each(function(){var D=$(this).parents(".timetable-block-data-entry");var C=$(".timetable-block-data-input",D);var E=$(".timetable-block-data-empty",D);if(this.checked){if(!C.is(".closed")){C.show()}E.hide()}else{C.hide();if(!E.is(".closed")){E.show()}$("input[type=text]",C).val("00:00")}})}},settings:{init:function(){var A=this;$("#settings_profile").bind("change",function(){A.update()});this.update()},update:function(){if($("#settings_profile").attr("checked")){$("#profile-privacy").show()}else{$("#profile-privacy").hide()}}},lunchUrlValidation:{dom:{},validated:false,init:function(){var A=this;A.dom.urlField=$("#lunch_menu_url");A.dom.form=A.dom.urlField.closest("form");A.dom.urlField.bind("change",function(B){A.validated=false;A.dom.form.find(":submit").attr("disabled",false).removeClass("disabled")});A.dom.form.bind("submit",function(B){if(!!A.dom.urlField.val()&&!A.validated){B.preventDefault();return A.validateContentType()}})},validateContentType:function(){var A=this;A.dom.form.find(":submit").attr("disabled",true).addClass("disabled");$.post(eat.settings.validateHtmlUrl,{url:A.dom.urlField.val()},function(B){if(B=="1"){A.validated=true;A.dom.form.find(":submit").attr("disabled",false).removeClass("disabled");A.dom.form.submit()}else{alert(__("user.editRestaurant.lunchMenu.invalidContent")+B)}})}}};$(document).ready(function(){window.setTimeout(function(){eat.user.init()},100)});