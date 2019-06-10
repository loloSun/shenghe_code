//初始化window
function getWindow(winId, title, width, height) {
	var win = $("#" + winId).window({
		width:width,
		height:height,
		top: ($(window).height() - height) * 0.5,
	    left: ($(window).width() - width) * 0.5,
		title:title,
		modal:true,
		//href:url,
	    minimizable: false,
	    maximizable: false,
	    collapsible: false
	});
	return win;
}