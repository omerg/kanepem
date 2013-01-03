
/***********global variables*************/
var mySettings = {};
var header = {};
var main ={};
var footer = {};
var iframe = false;

/*******Debugging Utils******************/
	
// simple logger
function log(message) {
	if(mySettings.debug == true) {
		if(window.console) {
     		console.debug(message);
  		} else {
     		alert(message);
  		}
 	}};

//simple utility to display elapsed time
//in an encapsulated code block
function benchmark(s,d) {
	log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
}

//var processTime = new Date(); 
//benchmark("Data sent, processed, received: ", processTime);

function isdefined( variable)
{
    return (typeof(window[variable]) == "undefined")?  false: true;
}

/******endOf: Debugging Utils ***********/
var core={};
core.browser={
	msie:false,
	msie6:false,
	msie7:false,
	webkit:false,
	init:function(){
		this.msie=(navigator.userAgent.toLowerCase().indexOf("msie")!=-1)?true:false;
		this.msie6=(navigator.userAgent.toLowerCase().indexOf("msie 6.")!=-1)?true:false;
		this.msie7=(navigator.userAgent.toLowerCase().indexOf("msie 7.")!=-1)?true:false;		
		this.webkit=(navigator.userAgent.toLowerCase().indexOf("webkit")!=-1)?true:false}};
jQuery(document).ready(function(){core.browser.init()});

//function parses mysql datetime string and returns javascript Date object
//input has to be in this format: 2007-06-05 15:26:02
function mysqlTimeStampToDate(timestamp) {
    var regex=/^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
    var parts=timestamp.replace(regex,"$1 $2 $3 $4 $5 $6").split(' ');
    return new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
}

var dates = {

/*Returns a number:
    * -1 if a < b
    * 0 if a = b
    * 1 if a > b
    * NaN if a or b is an illegal date*/
    compare:function(a,b) {
        return (
            isFinite(a=this.convert(a).valueOf()) &&
            isFinite(b=this.convert(b).valueOf()) ?
            (a>b)-(a<b) :
            NaN
        );
    },

/*Returns a boolean or NaN:
    * true if d is between the start and end (inclusive)
    * false if d is before start or after end.
    * NaN if one or more of the dates are illegal.*/
    inRange:function(d,start,end) {
        return (
            isFinite(d=this.convert(d).valueOf()) &&
            isFinite(start=this.convert(start).valueOf()) &&
            isFinite(end=this.convert(end).valueOf()) ?
            start <= d && d <= end :
            NaN
        );
    },
    convert:function(d) {
        return (
            d.constructor === Date ? d :
            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
            d.constructor === Number ? new Date(d) :
            d.constructor === String ? new Date(d) :
            typeof d === "object" ? new Date(d.year,d.month,d.date) :
            NaN
        );
    }
}

//ajax lookup function
//checks accounts table
function lookup(inputString) {
    if(inputString.length == 0) {
        // Hide the suggestion box.
        $("#suggestions").fadeOut(250);
    } else {
        $.post(
			mySettings.toLookUpUrl,
			{queryString: ""+inputString+""},
			function(data){
				if(data.success && data.show.length > 0) {
					var C = "";
					for(var i=0;data.show[i];i++){
						C += "<li onclick='fill(&quot;" + data.show[i] + "&quot;);'>" + data.show[i] + "</li>";
					}
					$("#suggestions").fadeIn(250);
					$("#autoSuggestionsList").html(C);
				} else {
					$("#suggestions").fadeOut(250);
				}
        	},
			"json"
			);
	}
} // lookup


function fill(thisValue) {
	$(".suggestion-form").val(thisValue);
	$("#suggestions").hide();
}


header={
	init:function(){
		this.userbar.init();
	},
	userbar:{	data:{	username:null,
						profile:null
				},
				dom:{},
				init:function(){
					var A = this;
					this.dom.loggedin=$("#userbar .loggedin");
					this.dom.unlogged=$("#userbar .unlogged");
					this.dom.profile=$("#userbar-profile");
					this.dom.login=$("#userbar-login");
					this.dom.logout=$("#userbar-logout");
					this.dom.facebookLogin=$("#facebook-login");
					this.dom.logout.html('<a href="' + mySettings.logoutUrl + '">Logout</a>');
					this.dom.facebookLogin.bind("click",function(){
						A.doLogin();
						return false
					});
					this.dom.logout.bind("click",function(){
						FB.getLoginStatus(function(response) {
  							if (response.session) {
								FB.logout();
							}
						});
					});
					this.render();
				},
				doLogin:function(){
				},
				render:function(){
					if (mySettings.username){
						this.data.username = mySettings.username;
					}
					if(mySettings.personalState == 'loggedin'){
						this.dom.unlogged.hide();
						this.dom.loggedin.show();
						var A=this.dom.profile.html();
						this.dom.profile.html('<a href="' + mySettings.profileUrl + '/' + this.data.username + '">'+A+" "+this.data.username+"</a>")
					}else{
						this.dom.loggedin.hide();
						this.dom.unlogged.show()
					}
				}
	}
};	
											
$(document).ready(function(){
	header.init();
	if(iframe == false){
		$("#header-signup-button").fancybox({
			'autoDimensions'	: false,
			'width'         		:435,
			'height'        		:280
		});
		if(mySettings.personalState == 'loggedin'){
			$("#header-link-inbox").show();
			$("#header-link-profile").show();
			$("#facebook-login").hide();
		} else {
			$("#header-link-inbox").hide();
			$("#header-link-profile").hide();
		}
	}
});