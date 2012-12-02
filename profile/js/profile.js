/*main.profile={
	init:function(){this.follow.init()},
};
	
$(document).ready(function(){main.profile.init()});
	
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
	
jQuery(document).ready(function(){imagebox.init()});*/