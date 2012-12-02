eat.communityProfile={
	init:function(){this.follow.init()},
	follow:{
			init:function(){
			this.controls.init();
			this.userlist.init()},
			render:function(){
				this.controls.render();
				this.userlist.render()},
			controls:{
					data:{
						isFollowed:false
					},
					dom:{
						buttons:null,
						add:null,
						remove:null,
						progress:null
					},
					init:function(){
						var A=this;
						this.data.isFollowed=isFollowed;
						this.dom.buttons=$("#sidebar-follow-buttons");
						this.dom.add=$("#sidebar-follow-buttons .follow-add");
						this.dom.remove=$("#sidebar-follow-buttons .follow-remove");
						this.dom.progress=$("#sidebar-follow-progress");
						this.dom.add.bind("click",function(){A.toggle(this.id.split("-")[1])});
						this.dom.remove.bind("click",function(){A.toggle(this.id.split("-")[1])});
						this.render()
					},
					render:function(){
						if(this.data.isFollowed){
							this.dom.remove.show();
							this.dom.add.hide()
						}else{
							this.dom.add.show();
							this.dom.remove.hide()
						}
						this.dom.buttons.show()
					},
					toggle:function(B){
						var A=this;
						this.progress("show");
						$.post(
							   eat.settings.followUrl,
							   {user:B},
							   function(C){
								   if(C==1){
									   A.data.isFollowed=(A.data.isFollowed)?false:true;
									   A.progress("hide");
									   A.render();
									   eat.communityProfile.follow.userlist.loadData("followers",B)
									}
								},
								"json")
						},
					progress:function(B){
							var A=this;
							if(B=="show"){
								this.dom.progress.fadeIn(250)
							}else{
								window.setTimeout(function(){
														   A.dom.progress.fadeOut(250);
														   A.render()
														   },500)
								}
							}
			},
			userlist:{
					data:{
						active:"followers",
						following:null,
						followers:null
					},
					dom:{
						followingTab:null,
						followingCount:null,
						followersTab:null,
						followersCount:null,
						userlist:null
					},
					init:function(){
						var A=this;
						this.data.following=following;
						this.data.followers=followers;
						this.dom.followingTab=$("#sidebar-tabs-following");
						this.dom.followingCount=$("#sidebar-tabs-following span");
						this.dom.followingEmpty=$("#sidebar-follow-following-empty");
						this.dom.followersTab=$("#sidebar-tabs-followers");
						this.dom.followersCount=$("#sidebar-tabs-followers span");
						this.dom.followersEmpty=$("#sidebar-follow-followers-empty");
						this.dom.userlist=$("#sidebar-follow-userlist");
						this.dom.userlistData=$("#sidebar-follow-userlist-data");
						this.dom.userlistLink=$("#sidebar-follow-userlist-link");
						this.dom.followingTab.bind("click",function(){A.selectTab("following")});
						this.dom.followersTab.bind("click",function(){A.selectTab("followers")});
						this.render()
					},
					render:function(){
						if(this.data.active=="following"){
							this.dom.followingTab.addClass("on");
							this.dom.followersTab.removeClass("on")
						}else{
							this.dom.followingTab.removeClass("on");
							this.dom.followersTab.addClass("on")
						}
						this.dom.followingCount.html(((this.data.following)?String(this.data.following.length):"0"));
						this.dom.followersCount.html(((this.data.followers)?String(this.data.followers.length):"0"));
						this.dom.followingEmpty.hide();
						this.dom.followersEmpty.hide();
						if(this.data.active=="following"){
							if(this.data.following.length==0){
								this.dom.followingEmpty.show();
								this.dom.userlist.hide()
							}else{
								this.dom.userlistData.html(this.getUserlistHTML(this.data.following));
								this.dom.followingEmpty.hide();
								this.dom.userlist.show()
							}
							this.dom.userlistLink.show()
						}
						if(this.data.active=="followers"){
							if(this.data.followers.length==0){
								this.dom.followersEmpty.show();
								this.dom.userlist.hide()
							}else{
								this.dom.userlistData.html(this.getUserlistHTML(this.data.followers));
								this.dom.followersEmpty.hide();
								this.dom.userlist.show()
							}
							this.dom.userlistLink.hide()
						}
					},
					getUserlistHTML:function(D){
						var C='<div class="userlist-header"></div>';
						for(var A in D){
							var B=D[A];
							C+='<a class="userlist-entry" href="'+B[2]+'">';
							C+='<div class="userlist-entry-name">'+B[1]+"</div>";
							if(B[3]){
								C+='<div class="userlist-entry-image"><img src="'+B[3]+'" alt="'+B[1]+'" /></div>'
							}else{
								C+='<div class="userlist-entry-no-image"></div>'
							}
							C+="</a>"
						}
						C+='<div class="userlist-footer"></div>';
						return C
					},
					selectTab:function(A){
						this.data.active=A;
						this.render()
					},
					loadData:function(B,C){
						var A=this;
						if(B=="following"){
							$.post(
								   eat.settings.followingJsonUrl,
								   {user:C},
								   function(D){
									   if(D!==0){
										   A.data.following=D?D:null;
										   A.render()
										}
									},
									"json")
						}
						if(B=="followers"){
							$.post(
								   eat.settings.followersJsonUrl,
								   {user:C},
								   function(D){
									   if(D!==0){
										   A.data.followers=D?D:null;
										   A.render()
										}
									},
									"json")
						}
					}
			}
	}
};
	
$(document).ready(function(){eat.communityProfile.init()});
	
imagebox={
	zindex:10000,
	visible:false,
	moving:false,
	currentImageTop:0,
	currentThumbTop:107,
	currentImage:0,
	imageHeight:269,
	thumbHeight:60,
	images:[],
	thumbs:[],
	captions:[],
	init:function(){
		var A=this;
		$(".imagebox").each(function(){$(this).bind("click",function(B){B.stopPropagation();var C=this.id.split("-")[1];A.open(this,C)})});$("#body").bind("click",function(){A.close()})},
	open:function(D,E){var B=this;if(!this.visible){this.visible=true;this.currentImage=0;this.currentImageTop=0;this.currentThumbTop=107;this.captions=$("#imagebox-"+E+"-caption-list").val().split("|");this.images=$("#imagebox-"+E+"-image-list").val().split(",");this.thumbs=$("#imagebox-"+E+"-thumb-list").val().split(",");var C="";C+='<div id="imagebox">';C+='<div id="imagebox-close"></div>';C+='<div id="imagebox-roll">';C+='<div id="imagebox-roll-previous"></div>';C+='<div id="imagebox-roll-images">';for(var A in this.thumbs){C+='<div class="imagebox-roll-image"><img src="'+this.thumbs[A]+'" alt="" width="50" height="50" /></div>'}C+="</div>";C+='<div id="imagebox-roll-next"></div>';C+="</div>";C+='<div id="imagebox-images">';C+='<div id="imagebox-images-holder">';for(var A in this.images){C+='<div class="imagebox-images-image">';C+='<img src="'+this.images[A]+'" alt="" />';if(this.captions[A]){C+='<div class="imagebox-images-image-caption">'+this.captions[A]+"</div>"}C+="</div>"}C+="</div>";C+="</div>";C+="</div>";imagebox.zindex++;$(D).parents(".entry").eq(0).css("z-index",this.zindex).append(C);this.updateLinks();window.setTimeout(function(){$("#imagebox-close").bind("click",function(){B.close()});$("#imagebox-roll-next").bind("click",function(F){F.stopPropagation();B.nextImage()});$("#imagebox-roll-previous").bind("click",function(F){F.stopPropagation();B.previousImage()});if(core.browser.msie6){$("#imagebox").show()}else{$("#imagebox").fadeIn(250)}},50)}},
	close:function(){var A=this;if(core.browser.msie6){$("#imagebox").hide().remove();A.visible=false}else{$("#imagebox").fadeOut(250,function(){$("#imagebox").remove();A.visible=false})}},
	nextImage:function(){var A=this;if(!this.moving){if(this.currentImage<this.images.length-1){this.moving=true;var B=this.currentThumbTop-this.thumbHeight;var C=this.currentImageTop-this.imageHeight;$("#imagebox-roll-images").animate({top:B},250,function(){A.moving=false;A.currentThumbTop=B});$("#imagebox-images-holder").animate({top:C},250,function(){A.moving=false;A.currentImageTop=C;A.updateLinks()});this.currentImage++}}},
	previousImage:function(){var A=this;if(!this.moving){if(this.currentImage>0){this.moving=true;var B=this.currentThumbTop+this.thumbHeight;var C=this.currentImageTop+this.imageHeight;$("#imagebox-roll-images").animate({top:B},250,function(){A.moving=false;A.currentThumbTop=B});$("#imagebox-images-holder").animate({top:C},250,function(){A.moving=false;A.currentImageTop=C;A.updateLinks()});this.currentImage--}}},
	updateLinks:function(){if(this.currentImage==this.images.length-1){$("#imagebox-roll-next").addClass("disabled")}else{$("#imagebox-roll-next").removeClass("disabled")}if(this.currentImage==0){$("#imagebox-roll-previous").addClass("disabled")}else{$("#imagebox-roll-previous").removeClass("disabled")}}
};
	
jQuery(document).ready(function(){imagebox.init()});