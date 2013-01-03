main.items={
	init:function(){
		this.pager.init();
	},
	pager:{
		data:[],
		dom:{},
		init:function(){
			this.dom.pager=$("#pager-container");
			this.loadData();
			},	
		loadData:function(A){
			var B = this;
			$.post(
				mySettings.loadItemsUrl,
				"type="+type,
				function(C){
						B.data = C.array;
						B.render(B.data);
				},
				"json"
			)
		},
		render:function(data){
			var A = this;
			var C ='<ul class="paging">';
			for (var i = 0;i <A.data.length; i++)
			{
				C+='<li class="pager-element" id="' + A.data[i].id + '">';
						C+='<a href="../profile/' + A.data[i].username + '"><img src="';
						C += A.data[i].thumbnail_url + '">';
						C+='<div class="username">' + A.data[i].username +'</div></a>';
						C+='<div class="date-time">Date Sent: ' + A.data[i].tm + '</div>';
						C+='<div class="subject">Title: ' + A.data[i].title + '</div></li>';
			}
			C+='</ul>';
			A.dom.pager.html(C);
			A.dom.pagerElement=$("#pager-container li");
			A.dom.pagerElement.bind("click",function(){
				window.location = "../item/" + $(this).attr("id");
			});
			$("ul.paging").quickPager( {
				pageSize: 5
			});

		}
	}
}

$(document).ready(function(){
	main.items.init();
});