


$(document).bind("ajaxSend", function(){
	$("#loadingDiv").show()
	console.log("loading");
}).bind("ajaxComplete", function(){
	$("#loadingDiv").hide()
	console.log("loading complete");
});