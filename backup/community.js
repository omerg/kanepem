eat.community={
	init:function(){
		this.profile.filter.init();
		this.overview.init()},
	overview:{
		init:function(){
			if($("#new-images").length>0){
				$("#new-images .image-entry").bind("mouseover",function(){$(".image-caption",this).show()}).bind("mouseout",function(){$(".image-caption",this).hide()})}}},
	profile:{filter:{init:function(){this.update();$(".category-small").bind("click",function(){$("#profile-update").removeClass("disabled")});$(".category-small input[type=checkbox]").bind("click",function(){eat.community.profile.filter.update()});$("#profile-update").click(function(){if(!$(this).is(".disabled")){$("#content-navigation form")[0].submit()}});$("#content-sorting select").bind("change",function(){this.form.submit()})},update:function(){$(".category-small input[type=checkbox]").each(function(){if(!this.checked){$(this).parents(".category-small").addClass("disabled")}else{$(this).parents(".category-small").removeClass("disabled")}})}}}};
	
$(document).ready(function(){eat.community.init()});