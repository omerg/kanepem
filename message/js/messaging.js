main.messaging={
	init:function(){
		this.controls.init();
		this.messageArea.init();
		this.pager.init();
	},
	controls:{
		data:{},
		dom:{
			compose:null,
			inbox:null,
			sent:null
		},
		init:function(){
			var A = this;
			this.dom.controls=$("#content-sidebar-controls");
			this.dom.controls.compose=$("#controls-compose");
			this.dom.controls.inbox=$("#controls-inbox");
			this.dom.controls.sent=$("#controls-sent");
			this.dom.controls.compose.bind("click",function(){
				main.messaging.messageArea.dom.data.compose.show();
				main.messaging.messageArea.dom.data.view.hide();
				main.messaging.pager.dom.inbox.hide();
				main.messaging.messageArea.dom.data.message.hide();
			});
			this.dom.controls.inbox.bind("click",function(){
				main.messaging.messageArea.dom.data.compose.hide();	
				main.messaging.messageArea.dom.data.message.hide();
				main.messaging.pager.dom.inbox.show();
				main.messaging.pager.loadData("inbox");
			});
			this.dom.controls.sent.bind("click",function(){
				main.messaging.messageArea.dom.data.compose.hide();
				main.messaging.messageArea.dom.data.message.hide();
				main.messaging.pager.dom.inbox.show();
				main.messaging.pager.loadData("sent");
			});
		},
		render:function(){	
				main.messaging.messageArea.dom.data.view.show();
			},
		progress:function(){}
	},
	messageArea:{
		data:{},
		dom:{},
		init:function(){
			var A = this;			
			this.dom.data=$("#content-header-data");
			this.dom.data.view=$("#content-header-data-view");
			this.dom.data.viewTo=$("#view-to");
			this.dom.data.viewFrom=$("#view-from");
			this.dom.data.viewMessage=$("#view-message");
			this.dom.data.compose=$("#content-data-compose");
			this.dom.data.formTo=$("#form-to");
			this.dom.data.formSubject=$("#form-subject");
			this.dom.data.formMessage=$("#form-message");
			this.dom.data.message=$("#content-header-data-message");
			$("#message-form").bind("submit",function(){
									A.sendMessage();
									return false
								});
		},
		render:function(){},
		loadData:function(){},
		getForm:function(){},
		getMessage:function(B){
			var A = this;
			$.post(
				mySettings.getMessageUrl,
				"id="+B,
				function(C){
					if(C.success){
						A.dom.data.viewFrom.html(C.from);
						A.dom.data.viewTo.html(C.to);
						A.dom.data.viewMessage.html(C.message);
						A.dom.data.view.show();
					} else {
						A.dom.data.view.html("Message not found");
						A.dom.data.view.show();
					}
				},
			"json")
		},
		markAsRead:function(B){
			var A = this;
			$.post(
			   mySettings.markAsReadUrl,
			   "message_id="+B.id,
			   function(C){
				   if(C.success){
					   $(B).removeClass('unread').addClass('read');
				   } else {
					   alert("there was a problem while marking the message as read");
				   }
			   },
			   "json")
		},
		sendMessage:function(){
			var A = this;
			var B = {
				to:A.dom.data.formTo.val(),
				subject:A.dom.data.formSubject.val(),
				message:A.dom.data.formMessage.val()
			}
			$.post(				
					mySettings.sendMessageUrl,
					B,
					function(data){
						if(data.success){
							A.dom.data.compose.fadeOut(200);
							window.setTimeout(function(){
								A.dom.data.compose.hide();
								A.dom.data.message.html("Message has been sent");
								A.dom.data.message.fadeIn(200);
								},
								1000);	
						} else {
							A.dom.data.compose.hide();
							A.dom.data.message.html(data.errormessage);
							A.dom.data.message.fadeIn(200);
						}
					},
					"json");	
		},
	},
	pager:{
		data:[],
		dom:{},
		init:function(){		
			this.dom.container=$("#content-data-pager");
			this.dom.inbox=$("#content-data-inbox");
			this.dom.pager=$("#pager-container");
			},	
		loadData:function(A){
			var B = this;
			if(A == "inbox"){
				$.ajax({
					url:mySettings.viewInboxUrl,
					success:function(C){
						B.data = C;
						B.render(B.data);
					},
					dataType:"json"})
			} else {
				$.ajax({
					url:mySettings.viewSentUrl,
					success:function(C){
						B.data = C;
						B.render(B.data);
					},
					dataType:"json"})
			}
		},
		render:function(data){
			var A = this;
			var C ='<ul class="paging">';
			for (var i = 0;i <A.data.length; i++)
			{
				C+='<li class="pager-element ' + A.data[i].readState + '" id="' + A.data[i].id + '">';
					C+='<input type="checkbox">';
						C+='<a href="../profile/' + A.data[i].username + '"><img src="';
						C += A.data[i].thumbnail_url + '"';	
						C+='<div class="username">' + A.data[i].username +'</div></a>';
						C+='<div class="date-time">Date Sent: ' + A.data[i].tm + '</div>';
						C+='<div class="subject">Subject: ' + A.data[i].subject + '</div></li>';
			}
			C+='</ul>';
			A.dom.pager.html(C);
			A.dom.pagerElement=$("#pager-container li");
			A.dom.pagerElement.bind("click",function(){
				main.messaging.messageArea.getMessage(this.id);
				main.messaging.messageArea.markAsRead(this);
			});
			$("ul.paging").quickPager( {
				pageSize: 5
			});

		}
	}
}
$(document).ready(function(){main.messaging.init()});