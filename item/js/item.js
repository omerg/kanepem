main = {	
	init:function(){
		this.item_data.id = $("#queried_item_id").html();
		main.map.init();
		main.loadData();
		main.header.init();
		main.content.init();
		main.love.init();
		main.rate.init();
		main.apply.init();
		main.reportAbuse.init();
	},
	item_data:{	
		id:null,
		owner_id:null,
		item_type:null,
		street_address:null,
		postcode:null,
		city:null,
		phone:null,
		email:null,
		src_lat:null,
		src_lng:null,
		dst_lat:null,
		dst_lng:null,
		start_date:null,
		end_date:null,
		title:null,
		description:null,
		tm:null,
		owner_name:null,
		thumbnail_url:null,
		features:null,
		profile_name:null,
		profile_surname:null,
		self:false
	},
	loadData:function(){
		var A = this;
		$.post(
			mySettings.loadItemUrl,
			"item_id="+main.item_data.id,
			function(C){
				if(C.success){
					// load data into main.data
					A.item_data.owner_id = C.array.owner_id;
					switch(C.array.item_type)
					{
					case "add_car":
						A.item_data.item_type = "Car Share";
						break;
					case "req_car":
						A.item_data.item_type = "Car Request";
						break;
					case "add_home":
						A.item_data.item_type = "Home Share";
						break;
					case "req_home":
						A.item_data.item_type = "Home Request";
						break;
					default:
						A.item_data.item_type = "Custom Item";
					}
					A.item_data.street_address = C.array.street_address;
					A.item_data.postcode = C.array.postcode;
					A.item_data.city = C.array.city;
					A.item_data.phone = C.array.phone;
					A.item_data.email = C.array.email;
					A.item_data.src_lat = C.array.src_lat;
					A.item_data.src_lng = C.array.src_lng;
					A.item_data.dst_lat = C.array.dst_lat;
					A.item_data.dst_lng = C.array.dst_lng;					
					A.item_data.start_date = C.array.start_date;
					A.item_data.end_date = C.array.end_date;
					A.item_data.title = C.array.title;
					A.item_data.description = C.array.description;
					A.item_data.tm = C.array.tm;
					A.item_data.thumbnail_url = C.array.thumbnail_url;
					A.item_data.owner_name = C.array.username;
					A.item_data.features = C.array.features;	
					A.item_data.profile_name = C.array.name;
					A.item_data.profile_surname = C.array.surname;
					A.item_data.self = C.array.self;					
					
					//render page
					main.map.render();
					main.header.render();
					main.content.render();
					
					//render Open Graph meta tags
					$('meta[name=og_title]').attr("content", A.item_data.title);
					$('meta[name=og_type]').attr("content", A.item_data.item_type);
					$('meta[name=og_url]').attr("content", "http://students.sabanciuniv.edu/~cms/uniWorks/map/" + main.item_data.id);
					$('meta[name=og_image]').attr("content", "http://students.sabanciuniv.edu/~cms/uniWorks/images/logo.png");
					$("#fb-like-button").html('<fb:like layout="button_count" show_faces="false" width="180" action="recommend" colorscheme="light"></fb:like>');
				} else {
					//direct to items page
					alert(C.errormessage);
				}
			},
			"json")
	}
};

main.map = {
	imgUrl:"",
	init:function(){
	},
		//http://maps.google.com/maps/api/staticmap?center=60.165257,24.928665&size=200x200&zoom=13&maptype=roadmap&markers=icon:http://students.sabanciuniv.edu/~cms/uniWorks/images/home_mini.png|60.165257,24.928665&sensor=false
	render:function(){
		//set image url
		this.imgUrl += "http://maps.google.com/maps/api/staticmap";
		this.imgUrl += '?center=' + main.item_data.src_lat + ',' + main.item_data.src_lng + '&';	
		var item_icon;
		switch(main.item_data.item_type)
		{
		case "Car Share":
			item_icon = "car_mini.png";
			break;
		case "Car Request":
			item_icon = "hitchhike_mini.png";
			break;
		case "Home Share":
			item_icon = "home_mini.png";
			break;
		case "Home Request":
			item_icon = "baggage_mini.png";
			break;
		default:
			item_icon = "";
		}
		this.imgUrl +='markers=icon:http://students.sabanciuniv.edu/~cms/uniWorks/images/' + item_icon +'|' + main.item_data.src_lat + ',' + main.item_data.src_lng + '&';
		this.imgUrl +='size=223x200&';
		this.imgUrl +='zoom=15&maptype=roadmap&sensor=false';	
		var img_tag = '<img src="' + this.imgUrl + '">';
		this.imgUrl = "";
		$("#content-header-map-snapshot").html(img_tag);
		
	}}
main.header = {
	dom:{},
	init:function(){
		this.dom.core = $("#content-header-item-data");
		this.dom.name = $("#content-header-item-name");
		this.dom.features = $("#content-header-item-features");	
	},
	render:function(){
		var A = this;
		A.dom.name.html(main.item_data.title);
						
		var myString = new String(main.item_data.features);
		var B = '<ul id="features-list">';
		for(var i=0;i < 8;i++){	
			if(myString.charAt(i) == "1"){
				B += '<li class="features-list-item" id="feature-small-' + (i + 1) + '"></li>';
			}
		}
		B += '</ul>';
		A.dom.features.html(B);
	}}
main.content = {
	dom:{},
	init:function(){
		this.dom.item_type = $("#item-type");
		this.dom.features = $("#item-features");	
		this.dom.start_date = $("#start-date");
		this.dom.end_date = $("#end-date");
		this.dom.item_description = $("#item-description");
		this.dom.users = $("#item-users");
		
		this.dom.editFeaturesLink=$("#features-info-header-actions-edit");
		this.dom.editDatesLink=$("#dates-info-header-actions-edit");
		this.dom.editDescriptionLink=$("#description-info-header-actions-edit");
		
		this.dom.editPrivacyLink=$("#item-actions-edit-privacy");
		this.dom.deleteLink=$("#item-actions-delete");
		this.dom.reportLink=$("#item-actions-report");		
	},
	render:function(){
		var A = this;
		this.dom.item_type.html(main.item_data.item_type);
		this.dom.start_date.html(main.item_data.start_date);
		this.dom.end_date.html(main.item_data.end_date);
		this.dom.item_description.html(main.item_data.description);
		
		if(main.item_data.self == "true"){
			A.dom.editFeaturesLink.show();
			A.dom.editDatesLink.show();
			A.dom.editDescriptionLink.show();
			A.dom.editFeaturesLink.html('<a href="editItem/index.php?step=4" class="iframe">Edit Features</a>');
			A.dom.editDatesLink.html('<a href="editItem/index.php?step=2&edit_id=' + main.item_data.id + '&start_date=' + main.item_data.start_date + '&end_date=' + main.item_data.end_date + '" class="iframe">Edit Dates</a>');
			A.dom.editDescriptionLink.html('<a href="editItem/index.php?step=3&edit_id=' + main.item_data.id + '&title=' + main.item_data.title + '&description=' + main.item_data.description + '" class="iframe">Edit Description</a>');
			A.dom.editPrivacyLink.html('<a href="editItem/index.php?step=5" class="iframe">Edit Privacy</a>');
			A.dom.deleteLink.html('<a href="">Delete Item</a>');
			A.dom.reportLink.hide();
			
			var myString = new String(main.item_data.features);
			var B = '<ul id="features-list">';
			for(var i=0;i < 8;i++){	
				if(myString.charAt(i) == "1"){
					B += '<li class="features-list-item" id="feature-small-' + (i + 1) + '"></li>';
				}
			}
			B += '</ul>';
			A.dom.features.html(B);
			
			$(".info-header-actions").find("a").fancybox({
				'autoDimensions'	: false,
				'width'         		:800,
				'height'        		:500,
				'margin'				:1,
				'padding'				:1,
				'onClosed'				:function() {
												main.loadData();
												main.map.render();
												main.header.render();
												main.content.render();
										}
			});
		} else {
		}
		
		//get user thumbnail
		var C = '<a href="../profile/' + main.item_data.owner_name + '">';
		C += 		'<img class="user-thumb" src="' + main.item_data.thumbnail_url + '" alt="" />';
		C += 		'<div class="username"><div class="account-name">' + main.item_data.owner_name + '</div>';
		if(main.item_data.profile_name != null || main.item_data.profile_surname != null){
			C += 	'<div class="profile-name">' + main.item_data.profile_name + ' ' + main.item_data.profile_surname + '</div>';
		}
		C += 		'</div>';
		C += 	'</a>';
		C+=		'<div class="item-options">';
        C+=			'<ul class="buttons">';
        C+=				'<li>Follow</li>';
        C+=				'<li><a href="../message/index.php?message_to=' + main.item_data.owner_name + '">Send a Message</a></li>';
		C+=			'</ul>';
		C+=		'</div>';
		this.dom.users.html(C);
	}
}

main.love = {
	init:function(){
		
	}
}

main.rate = {
	init:function(){
		
	}
}

main.apply = {
	init:function(){
		
	}
}

main.reportAbuse = {
	init:function(){
		
	}
}

$(document).ready(function(){
	main.init();
	//$("#content-header-left-sqr").datepicker();

});