var main ={};

main.viewProfile={
	dom:{},
	init:function(){
		$("#title-2").click(function(){
		});
		$("#title-3").click(function(){
		});
		$("#title-4").click(function(){
		});
		$("#title-5").click(function(){
		});
		this.profile.init();
		this.address.init();
		this.shares.init();
		this.requests.init();
		this.links.init();
		this.follow.init();
	},
	profile:{
		dom:{},
		data:{
			user_id:null,
			picture_id:null,
			name:null,
			surname:null,
			description:null,
			image:"ali",
			self:false
		},
		init:function(){
			var A = this;
			this.dom.core=$("#profile");
			this.dom.requested_username=$("#queried_username");
			this.dom.profiledata=$("#profile-data");
			this.dom.picture=$("#content-header-left-sqr");
			this.dom.userImage=$("#user-image");
			this.dom.username=$("#content-header-username");
			this.dom.name=$("#content-header-name");
			this.dom.surname=$("#content-header-surname");
			this.dom.description=$("#content-header-description");
			this.dom.editProfileLink=$("#profile-info-header-actions-edit");
			this.dom.cancelEditProfileLink=$("#profile-info-header-actions-cancel");
			this.dom.profile_message=$("#info-section-1-message");
			this.dom.pager=$("#pager-container");						
			this.dom.editProfile=$("#edit-profile");
			this.dom.editform=$("#edit-form");
			this.dom.nameInput=$("#name");
			this.dom.surnameInput=$("#surname");
			this.dom.descriptionInput=$("#edit-form-description textarea");
			this.dom.imageInput = $("#edit-form-photo image");
			this.dom.submitInput=$("#edit-form-submit input");
			this.dom.links=$("#links");
			this.getProfile(A.dom.requested_username.html());

/*			this.dom.editform.bind("submit",function(){
				A.setProfile();
				return false;
			});*/
			this.dom.editProfileLink.click(function(){
				A.editProfile();
				return false;
			});
			this.dom.cancelEditProfileLink.click(function(){
				A.getProfile();
				return false;
			});
			$("#title-1").click(function(){
				A.getProfile(A.dom.requested_username.html());	
			});
		},
		getProfile:function(username){
			var A = this;
			A.dom.editProfile.fadeOut(200);
			A.dom.cancelEditProfileLink.fadeOut(200);
			A.dom.profile_message.html("Yukleniyor...").fadeIn(200);
			window.setTimeout(function(){
				$.ajax({
					   url:mySettings.viewProfileUrl,
					   data:"username="+username,
					   success:function(data){
							if(data.success){
								A.data.name = data.name;
								A.data.surname = data.surname;
								A.data.description = data.description;
								A.dom.username.html(data.username);
								if(A.data.self == true){
									A.dom.editProfileLink.show();
									A.dom.editProfileLink.html('<a href="">Edit Proifle</a>');
								}
								A.dom.name.html(data.name + ' ' + data.surname);
								A.dom.description.html("Description: " + data.description);
							}else{
								if(data.errormessage == "noProfile"){
									A.dom.profile_message.html("Profile has not been defined yet");
									if(A.data.self == true){
										A.dom.editProfileLink.show();
									}	
								} else {
									A.dom.profile_message.html(data.errormessage);
								}
							}
							A.dom.profile_message.fadeOut(200);
							A.dom.profiledata.fadeIn(200);
							A.dom.editProfileLink.fadeIn(200);
						},
						dataType:"json"
					});
				},500);
			A.getImage();
		},
		editProfile:function(){
			var A = this;
			this.dom.nameInput.val(A.data.name);
			this.dom.surnameInput.val(A.data.surname);
			this.dom.descriptionInput.val(A.data.description);
			this.dom.profiledata.fadeOut(200);
			this.dom.editProfileLink.fadeOut(200);
			window.setTimeout(function(){
			A.dom.editProfile.fadeIn(200);
			A.dom.cancelEditProfileLink.fadeIn(200);
			},
			500);																										
		},
		setProfile:function(){
			var A = this;
			A.dom.profile_message.html("Yukleniyor...").fadeIn(200);
			A.data.name = A.dom.nameInput.val();
			A.data.surname = A.dom.surnameInput.val();
			A.data.description = A.dom.descriptionInput.val();
			//A.data.image = A.dom.imageInput.val();
			$.post(				
					mySettings.editProfileUrl,
					A.data,
					function(data){
						if(data.success){
							A.dom.editProfile.fadeOut(200);
							A.dom.profile_message.fadeOut(200);
							window.setTimeout(function(){
								A.dom.profile_message.html("Profile data has been updated<br>").fadeIn(200);
								A.getProfile();
								A.getImage();
								A.dom.editProfileLink.fadeIn(200);
								},
								1000);	
						} else {
							A.dom.profiledata.html(data.errormessage)
						}
					},
					"json");
		},
		getImage:function(){
			var A = this;
			A.dom.picture.fadeOut(200);
			$.post(				
					mySettings.loadPictureUrl,
					"user="+A.dom.requested_username.html(),
					function(data){
						//dont add randval if facebook picture
						var startsWith = data.substring(13,21);
						if(startsWith != "facebook"){
							A.dom.userImage.attr('src', data + '?randval='+ Math.random());
						} else {
							A.dom.userImage.attr('src', data);
						}
						A.dom.picture.fadeIn(200);
					});		
		}
	},
	address:{
		dom:{},
		data:{},
		init:function(){
			var A = this;
			this.dom.address_message=$("#info-section-2-message");
			this.dom.links_addresses=$("#links-addresses");
			this.dom.editAddress=$("#address-info-header-actions-edit");
			$("#title-2").click(function(){
				A.getAddresses();	
			});
		},
		getAddresses:function(){
			var A = this;
			A.dom.address_message.html("Yukleniyor...").fadeIn(200);
			window.setTimeout(function(){
				$.post(
					mySettings.loadUsersItemUrl,
					"username="+main.viewProfile.profile.dom.requested_username.html()+'&item_type=address',
					function(C){
						if(main.viewProfile.profile.data.self == true){
							A.dom.editAddress.html('<a id="add-address-link" href="wizard/house/" class="iframe">Add New Address</a>');			
							$("#add-address-link").fancybox({
								'autoDimensions'	: false,
								'width'         		:800,
								'height'        		:500,
								'margin'				:1,
								'padding'				:1,
								'onClosed'				:function() {main.viewProfile.address.getAddresses();}
							});
						}
						A.renderAddress(C.data);
						A.dom.address_message.fadeOut(200);
					},
					"json"
				);
			},500);
		},
		renderAddress:function(data){
			if (data.length != 0) {
				var C ='<ul class="paging">';
				for (var i = 0;i <data.length; i++)
				{			
					C+='<li class="pager-element" style="display: list-item;" id="' + data[i].id + '">';
					//set image url
					var imgUrl = "http://maps.google.com/maps/api/staticmap";
					imgUrl += '?center=' + data[i].src_lat + ',' + data[i].src_lng + '&';	
					imgUrl +='markers=icon:http://students.sabanciuniv.edu/~cms/uniWorks/images/home_mini.png|';
					imgUrl += data[i].src_lat + ',' + data[i].src_lng + '&';
					imgUrl +='size=100x100&';
					imgUrl +='zoom=15&maptype=roadmap&sensor=false';	
					var img_tag = '<img src="' + imgUrl + '">';
					C += img_tag;
					C+='<span class="address-title">' + data[i].title + '</span>';
					C+='<span class="address-text">' + data[i].street_address + ', ' + data[i].postcode + ', ' + data[i].city + '</span>';
					C+='<div class="address-actions">';
					if(main.viewProfile.profile.data.self == true){
					C += '<span class="address-action">';
					C += '<a id="edit-address-link" class="iframe" href="wizard/house?edit_id=' + data[i].id + 
																					'&latitude=' + data[i].latitude + 
																					'&longitude=' + data[i].longitude + 
																					'&street_address=' + data[i].street_address + 
																					'&postcode=' + data[i].postcode + 
																					'&city=' + data[i].city + 
																					'&title=' + data[i].title + 
																					'">Edit</a></span>';
					C += '<span class="address-action"><a id="delete-address-link" href="" onClick="main.viewProfile.address.confirmDelete(' + data[i].id + ');return false">Delete</a></span>';
					}
					C += '</div>';
					C+='</li>';
				}
				C+='</ul>';
			} else {
				var C = "<span>Liste Bos</span>";	
			}
			
			$("#info-section-2-pager-container").html(C);				
			$(".iframe").fancybox({
				'autoDimensions'	: false,
				'width'         		:800,
				'height'        		:500,
				'margin'				:1,
				'padding'				:1,
				'onClosed'				:function() {main.viewProfile.address.getAddresses();}
			});
		},
		confirmDelete:function(id){
			var answer = confirm ("Are you sure you want to delete address?")
			if (answer) {
				var A = this;
				A.dom.address_message.html("Yukleniyor...").fadeIn(200);
				window.setTimeout(function(){
					$.post(
						mySettings.deleteItemUrl,
						"delete_id="+id,
						function(C){
								A.getAddresses();
								A.dom.address_message.fadeOut(200);
						},
						"json"
					);
				},500);
				return false;
			} else {
				return false;	
			}
		}
	},
	shares:{
		dom:{},
		data:{},
		init:function(){
			var A = this;
			this.dom.shares_message=$("#info-section-3-message");
			this.dom.links_shares=$("#links-shares");
			this.dom.edit_shares=$("#shares-info-header-actions-edit");
			$("#title-3").click(function(){
				A.getShares();
			});
		},
		getShares:function(){
			var A = this;
			A.dom.shares_message.html("Yukleniyor...").fadeIn(200);
			window.setTimeout(function(){
				$.post(
					mySettings.loadUsersItemUrl,
					"username="+main.viewProfile.profile.dom.requested_username.html()+'&item_type=add',
					function(C){
						if(main.viewProfile.profile.data.self == true){
							A.dom.edit_shares.html('<a id="add-address-link" href="../map/">Yeni Paylasim Ekle</a>');
						}
						A.renderShares(C.data);
						A.dom.shares_message.fadeOut(200);
					},
					"json"
				);
			},500);
		},
		renderShares:function(data){
			if (data.length != 0) {
				var C ='<ul class="paging">';
				for (var i = 0;i <data.length; i++)
				{			
					C+='<li class="pager-element" style="display: list-item;" id="' + data[i].id + '">';
					//set image url
					var imgUrl = "http://maps.google.com/maps/api/staticmap";
					imgUrl += '?center=' + data[i].src_lat + ',' + data[i].src_lng + '&';
					var item_icon;
					switch(data[i].item_type)
					{
					case "add_home":
						item_icon = "home_mini.png";
						break;
					case "add_car":
						item_icon = "car_mini.png";
						break;
					default:
						item_icon = "";
					}
					imgUrl +='markers=icon:http://students.sabanciuniv.edu/~cms/uniWorks/images/' + item_icon + '|';
					imgUrl += data[i].src_lat + ',' + data[i].src_lng + '&';
					imgUrl +='size=100x100&';
					imgUrl +='zoom=15&maptype=roadmap&sensor=false';	
					var img_tag = '<img src="' + imgUrl + '">';
					C += img_tag;
					C+='<span class="address-title">' + data[i].title + '</span>';
					C+='<span class="address-text">' + data[i].street_address + ', ' + data[i].postcode + ', ' + data[i].city + '</span>';
					C+='<div class="address-actions">';
					if(main.viewProfile.profile.data.self == true){
					C += '<span class="address-action">';
					C += '<a id="edit-share-link" href="../item/' + data[i].id + '">Degistir</a></span>';
					C += '<span class="address-action"><a id="delete-address-link" href="" onClick="main.viewProfile.shares.confirmDelete(' + data[i].id + ');return false">Delete</a></span>';
					}
					C += '</div>';
					C+='</li>';
				}
				C+='</ul>';
			} else {
				var C = "<span>Liste Bos</span>";	
			}
			
			$("#info-section-3-pager-container").html(C);				
			$(".iframe").fancybox({
				'autoDimensions'	: false,
				'width'         		:800,
				'height'        		:500,
				'margin'				:1,
				'padding'				:1,
				'onClosed'				:function() {main.viewProfile.address.getAddresses();}
			});
		},
		confirmDelete:function(id){
			var answer = confirm ("Bu paylasimi silmek istediginizden emin misiniz?")
			if (answer) {
				var A = this;
				A.dom.shares_message.html("Yukleniyor...").fadeIn(200);
				window.setTimeout(function(){
					$.post(
						mySettings.deleteItemUrl,
						"delete_id="+id,
						function(C){
								A.getShares();
								A.dom.shares_message.fadeOut(200);
						},
						"json"
					);
				},500);
				return false;
			} else {
				return false;	
			}
		}
	},
	requests:{
		dom:{},
		data:{},
		init:function(){
			var A = this;
			this.dom.requests_message=$("#info-section-4-message");
			this.dom.links_requests=$("#links-requests");
			this.dom.edit_requests=$("#requests-info-header-actions-edit");
			$("#title-4").click(function(){
				A.getRequests();
			});
		},
		getRequests:function(){
			var A = this;
			A.dom.requests_message.html("Yukleniyor...").fadeIn(200);
			window.setTimeout(function(){
				$.post(
					mySettings.loadUsersItemUrl,
					"username="+main.viewProfile.profile.dom.requested_username.html()+'&item_type=req',
					function(C){
						if(main.viewProfile.profile.data.self == true){
							A.dom.edit_requests.html('<a id="add-address-link" href="../map/">Yeni Paylasim Ekle</a>');
						}
						A.renderRequests(C.data);
						A.dom.requests_message.fadeOut(200);
					},
					"json"
				);
			},500);
		},
		renderRequests:function(data){
			if (data.length != 0) {
				var C ='<ul class="paging">';
				for (var i = 0;i <data.length; i++)
				{			
					C+='<li class="pager-element" style="display: list-item;" id="' + data[i].id + '">';
					//set image url
					var imgUrl = "http://maps.google.com/maps/api/staticmap";
					imgUrl += '?center=' + data[i].src_lat + ',' + data[i].src_lng + '&';
					var item_icon;
					switch(data[i].item_type)
					{
					case "req_home":
						item_icon = "baggage_mini.png";
						break;
					case "req_car":
						item_icon = "hitchhike_mini.png";
						break;
					default:
						item_icon = "";
					}
					imgUrl +='markers=icon:http://students.sabanciuniv.edu/~cms/uniWorks/images/' + item_icon + '|';
					imgUrl += data[i].src_lat + ',' + data[i].src_lng + '&';
					imgUrl +='size=100x100&';
					imgUrl +='zoom=15&maptype=roadmap&sensor=false';	
					var img_tag = '<img src="' + imgUrl + '">';
					C += img_tag;
					C+='<span class="address-title">' + data[i].title + '</span>';
					C+='<span class="address-text">' + data[i].street_address + ', ' + data[i].postcode + ', ' + data[i].city + '</span>';
					C+='<div class="address-actions">';
					if(main.viewProfile.profile.data.self == true){
					C += '<span class="address-action">';
					C += '<a id="edit-share-link" href="../item/' + data[i].id + '">Degistir</a></span>';
					C += '<span class="address-action"><a id="delete-address-link" href="" onClick="main.viewProfile.requests.confirmDelete(' + data[i].id + ');return false">Delete</a></span>';
					}
					C += '</div>';
					C+='</li>';
				}
				C+='</ul>';				
			} else {
			var C = "<span>Liste Bos</span>";	
			}
			
			$("#info-section-4-pager-container").html(C);				
			$(".iframe").fancybox({
				'autoDimensions'	: false,
				'width'         		:800,
				'height'        		:500,
				'margin'				:1,
				'padding'				:1,
				'onClosed'				:function() {main.viewProfile.address.getAddresses();}
			});
		},
		confirmDelete:function(id){
			var answer = confirm ("Bu paylasimi silmek istediginizden emin misiniz?")
			if (answer) {
				var A = this;
				A.dom.requests_message.html("Yukleniyor...").fadeIn(200);
				window.setTimeout(function(){
					$.post(
						mySettings.deleteItemUrl,
						"delete_id="+id,
						function(C){
								A.getRequests();
								A.dom.requests_message.fadeOut(200);
						},
						"json"
					);
				},500);
				return false;
			} else {
				return false;	
			}
		}
		},
	links:{
		dom:{},
		data:{},
		init:function(){
			var A = this;
			this.dom.links_message=$("#info-section-5-message");
			this.dom.links_links=$("#links-links");
			this.dom.edit_links=$("#links-info-header-actions-edit");
			$("#title-5").click(function(){
				A.getLinks();
			});
		},
		getLinks:function(){
			var A = this;
			A.dom.links_message.html("Yukleniyor...").fadeIn(200);
			window.setTimeout(function(){
				$.post(
					mySettings.loadUsersItemUrl,
					"username="+main.viewProfile.profile.dom.requested_username.html()+'&item_type=add_link',
					function(C){
						if(main.viewProfile.profile.data.self == true){
							A.dom.edit_links.html('<a id="add-address-link" href="../map/">Yeni Paylasim Ekle</a>');
						}
						A.renderLinks(C.data);
						A.dom.links_message.fadeOut(200);
					},
					"json"
				);
			},500);
		},
		renderLinks:function(data){
			if (data.length != 0) {
				var C ='<ul class="paging">';
				for (var i = 0;i <data.length; i++)
				{			
					C+='<li class="pager-element" style="display: list-item;" id="' + data[i].id + '">';
					//set image url
					var imgUrl = "http://maps.google.com/maps/api/staticmap";
					imgUrl += '?center=' + data[i].src_lat + ',' + data[i].src_lng + '&';
					imgUrl +='markers=icon:http://www.kanepem.org/images/label_mini.png|';
					imgUrl += data[i].src_lat + ',' + data[i].src_lng + '&';
					imgUrl +='size=100x100&';
					imgUrl +='zoom=15&maptype=roadmap&sensor=false';	
					var img_tag = '<img src="' + imgUrl + '">';
					C += img_tag;
					C+='<span class="address-title">' + data[i].title + '</span>';
					C+='<span class="address-text">' + data[i].street_address + ', ' + data[i].postcode + ', ' + data[i].city + '</span>';
					C+='<div class="address-actions">';
					if(main.viewProfile.profile.data.self == true){
					C += '<span class="address-action">';
					C += '<a id="edit-share-link" href="../item/' + data[i].id + '">Degistir</a></span>';
					C += '<span class="address-action"><a id="delete-address-link" href="" onClick="main.viewProfile.links.confirmDelete(' + data[i].id + ');return false">Delete</a></span>';
					}
					C += '</div>';
					C+='</li>';
				}
				C+='</ul>';				
			} else {
				var C = "<span>Liste Bos</span>";	
			}
			
			$("#info-section-5-pager-container").html(C);				
			$(".iframe").fancybox({
				'autoDimensions'	: false,
				'width'         		:800,
				'height'        		:500,
				'margin'				:1,
				'padding'				:1,
				'onClosed'				:function() {main.viewProfile.address.getAddresses();}
			});
		},
		confirmDelete:function(id){
			var answer = confirm ("Bu paylasimi silmek istediginizden emin misiniz?")
			if (answer) {
				var A = this;
				A.dom.links_message.html("Yukleniyor...").fadeIn(200);
				window.setTimeout(function(){
					$.post(
						mySettings.deleteItemUrl,
						"delete_id="+id,
						function(C){
								A.getLinks();
								A.dom.links_message.fadeOut(200);
						},
						"json"
					);
				},500);
				return false;
			} else {
				return false;	
			}
		}
		},
	follow:{
			init:function(){
				this.controls.init();
				this.userlist.init()
			},
			render:function(){
				this.controls.render();
				this.userlist.render()},
			controls:{
					data:{
						queriedUsername:null,
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
						this.dom.buttons=$("#sidebar-follow-buttons");
						this.dom.add=$("#sidebar-follow-buttons .follow-add");
						this.dom.remove=$("#sidebar-follow-buttons .follow-remove");
						this.dom.progress=$("#sidebar-follow-progress");
						
						this.data.queriedUsername=$("#queried_username").html();
						this.dom.add.bind("click",function(){A.toggle(this.id.split("-")[1])});
						this.dom.remove.bind("click",function(){A.toggle(this.id.split("-")[1])});
						$.ajax({
							   type:"POST",
							   url:mySettings.isFollowedUrl,
							   data:"queried_user="+A.data.queriedUsername,
							   success:function(B){
									if(B == "true"){
										A.data.isFollowed=true;
									} else {
										A.data.isFollowed=false;
									}
							   },
							   dataType:"json",
							   async: false
						});
						this.render()
					},
					render:function(){
						if(this.data.isFollowed){
							this.dom.remove.show();
							this.dom.add.hide()
						} else if(main.viewProfile.profile.data.self == true){
							this.dom.add.hide();
							this.dom.remove.hide();
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
							   mySettings.followUrl,
							   {user:B},
							   function(C){
								   if(C=="1"){
									   A.data.isFollowed=(A.data.isFollowed)?false:true;
									   A.progress("hide");
									   A.render();
									   main.viewProfile.follow.userlist.loadData("followers",B)
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
						$.ajax({
							   type:"POST",
							   url:mySettings.followingUrl,
							   data:"user="+main.viewProfile.follow.controls.data.queriedUsername,
							   success:function(B){
								A.data.following=B;
							   },
							   dataType:"json",
							   async:false
						});
						$.ajax({
							   type:"POST",
							   url:mySettings.followersUrl,
							   data:"user="+main.viewProfile.follow.controls.data.queriedUsername,
							   success:function(B){
								A.data.followers=B;
							   },
							   dataType:"json",
							   async:false
						});
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
							C+='<a class="userlist-entry" href="' + B[1]+ '">';
							C+='<div class="userlist-entry-name">'+B[0]+"</div>";
							if(B[2]){
								C+='<div class="userlist-entry-image"><img src="' + B[2] + '" alt="'+B[1]+'" /></div>'
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
								   mySettings.followingUrl,
								   {user:C},
								   function(D){
									   alert("load");
									   if(D!==0){
										   A.data.following=D?D:null;
										   A.render()
										}
									},
									"json")
						}
						if(B=="followers"){
							$.post(
								   mySettings.followersUrl,
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

function showResponse(responseText, statusText, xhr, $form)  { 
    // for normal html responses, the first argument to the success callback 
    // is the XMLHttpRequest object's responseText property 
 
    // if the ajaxForm method was passed an Options Object with the dataType 
    // property set to 'xml' then the first argument to the success callback 
    // is the XMLHttpRequest object's responseXML property 
 
    // if the ajaxForm method was passed an Options Object with the dataType 
    // property set to 'json' then the first argument to the success callback 
    // is the json data object returned by the server 
 
 	main.viewProfile.profile.dom.profile_message.show();
    alert('status: ' + statusText + '\n\nresponseText: \n' + responseText + 
        '\n\nThe output div should have already been updated with the responseText.'); 
	
	main.viewProfile.profile.getProfile(main.viewProfile.profile.dom.requested_username.html());
}

function showRequest(formData, jqForm, options) { 
    // formData is an array; here we use $.param to convert it to a string to display it 
    // but the form plugin does this for you automatically when it submits the data 
    var queryString = $.param(formData); 
 
    // jqForm is a jQuery object encapsulating the form element.  To access the 
    // DOM element for the form do this: 
    // var formElement = jqForm[0]; 
 
    alert('About to submit: \n\n' + queryString); 
 
    // here we could return false to prevent the form from being submitted; 
    // returning anything other than false will allow the form submit to continue 
    return true; 
} 
						
$(document).ready(function(){
						   
	var options = { 
			target:        '#info-section-1-message',   // target element(s) to be updated with server response 
			beforeSubmit:  showRequest,  // pre-submit callback 
			success:       showResponse  // post-submit callback 
	 };
	main.viewProfile.init();
	$('#edit-form').ajaxForm(options);
});
		