function randerTableHeader() {
	$(".datagrid-htable").find("div.datagrid-cell").each(function() {
		$(this).css("text-align", "center");
	});
}
window.onload = function() {
	randerTableHeader();
}