// 初始化 面向对象方式
var $hpMain = {
	topCdt : 0,
	winWidth : 0,
	scrollHeight : 100,
	mouseOverElement : [],
	mouseOutElement : [],
	init : function() {
		$hpMain.turnPageEvent();
		$hpMain.randerEvent();
		$hpMain.saveContactEvent();
		$hpMain.checkContentDetail();
		$hpMain.queryContentEvent();
		$hpMain.scalingEvent();
		$hpMain.navMenuBtnEvent();
	},
	// 顶部导航 移入移出样式
	navMenuBtnEvent : function() {
		$('li.mainlevel').each(function(index) {
			// 鼠标悬停事件 有两个参数 进入、移出
			$(this).hover(function() {
				// 给 a 标签添加样式（增加类名）
				$(this).children("a").addClass("nav-first-h");
				var _self = this;
				// 清除定时器
				clearTimeout($hpMain.mouseOutElement[index]);
				// 每一项移入时的延迟效果
				$hpMain.mouseOverElement[index] = setTimeout(function() {
					// 搜索与其匹配的元素
					$(_self).find('ul').slideDown(200);
				}, 300);
				// 移出
			}, function() {
				// 删除类名 样式消失
				$(this).children("a").removeClass("nav-first-h");
				var _self = this;
				clearTimeout($hpMain.mouseOverElement[index]);
				$hpMain.mouseOutElement[index] = setTimeout(function() {
					$(_self).find('ul').slideUp(200);
				}, 300);
			});
		});
		$("li.mainlevel").children("ul").each(function(index) {
			$(this).focus(function() {
				$(this).parent("li").addClass("nav-first-h");
			}, function() {
				$(this).parent("li").removeClass("nav-first-h");
			});
		});
	},
	// 缩放比例事件
	scalingEvent : function() {
		// 获取浏览器的宽
		$hpMain.winWidth = $(window).width();
		$hpMain.randerNavState();
	},
	// 导航响应式
	randerNavState : function() {
		if ($hpMain.winWidth <= 1150) {
			$hpMain.randerFirstNavPadding("0px 6px");
			$("#keyword").css("width", "80px");
			$("table.search-table").css("margin-right", "10px");
		} else if ($hpMain.winWidth <= 1270) {
			$hpMain.randerFirstNavPadding("0px 10px");
			$("#keyword").css("width", "115px");
			$("table.search-table").css("margin-right", "10px");
		} else {
			$hpMain.randerFirstNavPadding("0px 15px");
			$("#keyword").css("width", "135px");
			$("table.search-table").css("margin-right", "20px");
		}
	},
	// 导航响应式 —— padding的动态变化
	// 下拉菜单的定位
	randerFirstNavPadding : function(padding) {
		$(".mainlevel").children("a").each(function() {
			$(this).css("padding", padding);
			var ul = $(this).parent("li").children("ul");
			if (ul.length > 0) {
				// 获取第一个匹配元素的外部宽  设置为 true 时，计算边距在内
				var width = $(this).outerWidth(true);
				ul.each(function() {
					$(this).css("left", -(130 - width - 15)/2 + "px");
				});
			}
		});
	},
	// 导航点击事件 路由跳转
	turnPageEvent : function() {
		$(".navBtn").click(function() {
			// 返回被选元素的属性值
			var url = $(this).attr("url");
			// 如果他有这个类名 就直接跳转到首页
			if ($(this).hasClass("homepage")) {
				window.location.href = url;
			} else {
				// 如果不是首页
				// 获取 rltPage/id 属性
				// 要跳转的页面类型（哪个模块内部）
				var rltPage = $(this).attr("rltPage");
				// 要跳转的页面id
				var id = $(this).attr("id");
				// 如果存在 rltPage 属性 路由跳转方式
				if (rltPage != undefined && rltPage != null && rltPage.length > 0) {
					window.location.href = url + "?p=" + rltPage + "&navId=" + id;
				}
			}
		});
	},
	// 页面滚动
	randerEvent : function() {
		// 滚动事件
		$(".container").on("scroll", function() {
			// 相对偏移量
			var top = $(this).offset().top;
			// 取得第一个匹配元素的html内容
			$(".img-news").html(top);
		});
		$(".img-news-con").find("li").hover(function(){
			$(this).find(".img-news-txt").stop().animate({height:"150px"},400);
		},function(){
			$(this).find(".img-news-txt").stop().animate({height:"50px"},400);
		});
	},
	// 页面内点击跳转事件 con-detail
	checkContentDetail : function() {
		$(".con-detail").click(function() {
			// 获取 conId url rltPage navId turntoNav 属性
			var conId = $(this).attr("conId");
			var url = $(this).attr("url");
			var rltPage = $(this).attr("rltPage");
			var navId = $(this).attr("navId");
			var turntoNav = $(this).attr("turntoNav") + "";
			// 专业服务
			if (turntoNav == "true" && navId != "" && rltPage != "") {
				window.location.href = url + "?p=" + rltPage + "&navId=" + navId;
			} else {  // 媒体动态
				window.open(url + "?p=c&contentId=" + conId);
			}
		});
	},
	// 联系我们
	saveContactEvent : function() {
		$("#saveContactBtn").click(function() {
			var succ = $hpMain.checkInput("posted", "姓名");
			succ = succ ? $hpMain.checkInput("telephone", "电话") : succ;
			succ = succ ? $hpMain.checkInput("email", "邮箱") : succ;
			succ = succ ? $hpMain.checkInput("leaveWord", "留言") : succ;
			if (succ) {
				var url = $(this).attr("url") + "/feedback/saveFeedback";
				var contactParams = {
					"posted":$.trim($("#posted").val())
					,"telephone":$.trim($("#telephone").val())
					,"email":$.trim($("#email").val())
					,"leaveWord":$.trim($("#leaveWord").val())
					,"pk":"c"
				}
				$.post(url, contactParams, function(data) {
					if (data && data.success) {
						$("#resetContactBtn").trigger("click");
						alert("留言成功！");
					} else {
						alert("出错啦，请稍后再试！");
					}
				}, "json");
			}
		});
	},
	checkInput : function(id, text) {
		var isInput = $("#" + id).is("textarea") ? false : true;
		var max = parseInt($("#" + id).attr("maxLen"));
		var v = isInput ? $("#" + id).val() : $("#" + id).html()
		v = $.trim(v);
		if (v.length == 0) {
			alert(text + "输入不能为空！");
			return false;
		} else if (v.length > max) {
			alert(text + "最多输入" + max + "个字符！");
			return false;
		} else {
			if (id == "email") {
				var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
				if (v != "" && !reg.test(v)) {
					alert("请输入正确的邮件地址！");
					return false;
				}
			} else if (id == "telephone") {
				var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
				if (v != "" && !reg.test(v)) {
					alert("请输入正确的手机号码！");
					return false;
				}
			}
			if (!isInput) {
				$("#" + id).html(v);
			} else {
				$("#" + id).val(v);
			}
			return true;
		}
	},
	queryContentEvent : function() {
		$('#keyword').on("keypress", function(event){
        	if (event.keyCode == "13") {
        		$hpMain.query();
        		return false;
          	}
     	});
		$("#searchBtn").click(function() {
			$hpMain.query();
		});
	},
	query : function() {
		var keyword = $.trim($('#keyword').val());
		if (keyword == "") {
			alert("请输入关键字");
		} else {
			if ($("#pKey").val() != "q") {
				$("#pKey").val("q");
			}
			$("#searchForm").submit();
		}
	},
	queryPagging : function(current, length, keyword) {
		$("#currentPage").val(current);
		$("#length").val(length);
		$("#keyword").val(keyword);
		$hpMain.query();
	}
};
// 窗口大小调整时发生
window.onresize = $hpMain.scalingEvent;
$(function() {
	$hpMain.init();
});