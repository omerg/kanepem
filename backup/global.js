function __(A){
	if(eat.locale.strings[A]){
		return eat.locale.strings[A]
	}else{
		return A
	}
}
var eat={};
eat.locale={strings:[],presets:[]};
core.settings.debug=false;
eat.settings={	pageHeight:692,
				imageUrl:"/images/v2/",
				iconUrl:"/images/v2/markers/",
				promoDataUrl:"/js/data/promoData.js",
				promoImageUrl:"/images/promo/",
				decorDataUrl:"/js/data/decorData.js",
				decorImageUrl:"/images/decor/",
				reviewLimit:5,
				iconWidth:15,
				iconHeight:15,
				anchorX:8,
				anchorY:8,
				highlightOffsetX:5,
				highlightOffsetY:5,
				tooltipOffsetX:-9,
				tooltipOffsetY:258,
				recentCities:5
				};
eat.main={	init:function(){eat.main.decor.init();eat.main.form.init();eat.main.tooltip.init();if($("#site-admin").length>0){eat.settings.tooltipOffsetY=eat.settings.tooltipOffsetY-$("#site-admin").height()}},
			decor:{	data:null,
					divs:null,
					init:function(){var A=this;this.divs=$(".decor");if(this.divs.length>0){$.get(eat.settings.decorDataUrl,false,function(B){A.data=B;A.render()},"json")}},
					render:function(){var A=this;this.divs.each(function(){var F=A.data[A.getRandom()];var E=F[0];var C=F[1];var G=F[2];var D=F[3];var B="";B+='<div class="decor-image"><img src="'+eat.settings.decorImageUrl+D+'" /></div>';B+='<div class="decor-author"><a href="'+eat.settings.userUrl+E+'">©'+E+"</a></div>";if(G){B+='<div class="decor-restaurant"><a href="'+eat.settings.restaurantUrl+"/"+G+'">'+C+"</a></div>"}else{B+='<div class="decor-restaurant">'+C+"</div>"}B+='<div class="decor-restaurant-bg">&nbsp;</div>';$(this).html(B)})},
					getRandom:function(){return Math.floor(Math.random()*eat.main.decor.data.length)}
			},
			form:{init:function(){$("input[@type=submit],input[@type=button]").bind("mousedown",function(A){A.preventDefault();$(this).addClass("active")}).bind("mouseup",function(A){A.preventDefault();$(this).removeClass("active")}).bind("mouseout",function(A){A.preventDefault();$(this).removeClass("active")}).each(function(){if($(this).attr("disabled")){$(this).addClass("disabled")}})}},
			tooltip:{	init:function(){var A=this;$(".tooltip-opener").each(function(){var D=this;var C=$(D);var B="";B+='<div class="small-tooltip">';B+='<div class="small-tooltip-wrapper">';B+='<div class="small-tooltip-body">';B+='<div class="small-tooltip-header"></div>';B+='<div class="small-tooltip-data">'+C.attr("title")+"</div>";B+='<div class="small-tooltip-footer"></div>';B+="</div>";B+="</div>";B+="</div>";C.append(B);C.bind("mouseout",function(E){A.hideTooltip(D)});C.bind("mouseover",function(E){A.showTooltip(D)});C.attr("title","")})},
						showTooltip:function(A){$(".small-tooltip",A).show()},
						hideTooltip:function(A){$(".small-tooltip",A).hide()}
			}
};
jQuery(document).ready(function(){eat.main.init()});
eat.adsGlobal={click:function(A){$.ajax({type:"POST",url:eat.settings.adsClickUrl,data:"ad="+A,success:function(B){document.location=B}})}};

eat.header={
	init:function(){
		this.messages.init();
		this.userbar.init();
		this.search.init()},
	messages:{	firstRun:true,
				index:0,
				init:function(){
					var A=this;
					this.index=this.getRandom();
					$("#messagebar .entry:eq("+this.index+")").show();
					window.setInterval(function(){
												A.nextMessage()},30000)
				},
				nextMessage:function(){
								var A=this;
								$("#messagebar .entry:eq("+eat.header.messages.index+")").fadeOut(2000,function(){
																												if($("#messagebar .entry").length-1==A.index){
																													A.index=0
																												}else{
																													A.index++
																												}
																												$("#messagebar .entry:eq("+A.index+")").fadeIn(2000)})},
				getRandom:function(){
					return Math.floor(Math.random()*$("#messagebar .entry").length)
				}
	},
	userbar:{	data:{	username:null,
						profile:null
				},
				dom:{},
				init:function(){
					this.dom.loggedin=$("#userbar .loggedin");
					this.dom.unlogged=$("#userbar .unlogged");
					this.dom.profile=$("#userbar-profile")
				},
				render:function(){
					if(this.data.username&&this.data.profile){
						this.dom.unlogged.hide();
						this.dom.loggedin.show();
						var A=this.dom.profile.html();
						this.dom.profile.html('<a href="'+this.data.profile+'">'+A+" "+this.data.username+"</a>")
					}else{
						this.dom.loggedin.hide();
						this.dom.unlogged.show()
					}
				}
	},
	search:{	dom:{},
				init:function(){
					this.dom.input=$("#search_text");
					this.dom.button=$("#search_button");
					this.render()},
				render:function(){
					var A=this;
					this.dom.input.bind("focus",function(){
															if(A.dom.input.is(".dimmed")){
																A.dom.input.val("");
																A.dom.input.removeClass("dimmed")
															}	
															A.dom.button.removeClass("disabled");
															A.dom.button.attr("disabled",false)
															}).addClass("dimmed").val(__("common.header.search.defaultText"));
					this.dom.input.bind("blur",function(){
															if(A.dom.input.val()==""){
																A.dom.input.addClass("dimmed");
																A.dom.input.val(__("common.header.search.defaultText"));
																A.dom.button.addClass("disabled");
																A.dom.button.attr("disabled",true)
															}
														})
		}
	}
};

jQuery(document).ready(function(){eat.header.init()});