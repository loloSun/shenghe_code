//dataGrid重新加载数据，处理传参问题
function reloadGrid(gridId, queryFormId) {
	var params = {};
	if (queryFormId != null) {
		$.each($("#" + queryFormId).serializeArray(), function(index) {
			if (params[this['name']]) {
				params[this['name']] = params[this['name']] + "," + this['value'];
			} else {
				params[this['name']] = this['value'];
			}
		});
	}
	$("#" + gridId).datagrid("load", params);
}
//重置表单
function resetForm(queryFormId) {
	$("#" + queryFormId)[0].reset();
	$.each($("#" + queryFormId).serializeArray(), function(index) {
		var name = this['name'];
		var o = $("#" + name);
		if (o.hasClass("easyui-textbox")) {
			o.textbox("setValue", "");
		} else if (o.hasClass("easyui-combotree")) {
			o.combotree("setValue", "");
			var tb = o.parent("td").children(".textbox").children(".textbox-text");
			tb.val(o.combotree("getText"));
		} else if (o.hasClass("easyui-combobox")) {
			o.combobox("setValue", "");
			var tb = o.parent("td").children(".textbox").children(".textbox-text");
			tb.val(o.combobox("getText"));
		}
	});
}
//校验combotree、combobox
function checkCBTB(id, msg) {
	var o = $("#" + id);
	var b = false;
	var v = "";
	if (o.hasClass("easyui-combotree")) {
		v = o.combotree("getValue");
	} else if (o.hasClass("easyui-combobox")) {
		v = o.combobox("getValue");
	}
	if (v != "") {
		b = true;
	} else {
		$.messager.alert("系统提示", msg);
	}
	return b;
}