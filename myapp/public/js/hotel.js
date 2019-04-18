$(function() {
	$('.header').load('http://localhost:8085/head')
	//格式化日期
	Date.prototype.Format = function(fmt) {
		var obj = {
			"M+": this.getMonth() + 1,
			"d+": this.getDate(),
			"h+": this.getHours(),
			"m+": this.getMinutes(),
			"s+": this.getSeconds(),
			"S+": this.getMilliseconds()
		};
		if(/(y+)/.test(fmt)) { //处理年份
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		for(var i in obj) {
			if(new RegExp('(' + i + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[i]) : (("00" + obj[i]).substr(("" + obj[i]).length)));
			}
		}
		return fmt
	}
	//日历对象
	function Canlendar(iNow, cal) {
		function run(n) {
			var oDate = new Date(); //定义时间
			oDate.setMonth(oDate.getMonth() + n); //设置月份
			var year = oDate.getFullYear(); //年
			var month = oDate.getMonth(); //月
			var today = oDate.getDate(); //日
			//计算本月有多少天
			var allDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
			//判断闰年
			if(month == 1) {
				if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
					allDay = 29;
				}
			}
			//判断本月第一天是星期几
			oDate.setDate(1); //时间调整到本月第一天
			var week = oDate.getDay(); //读取本月第一天是星期几
			cal.find(".dateList").empty(); //每次清空
			//插入空白
			//创建前几个灰色li
			for(var i = 0; i < week; i++) {
				cal.find(".dateList").append("<li></li>");
			}
			//日期插入到dateList
			for(var i = 1; i <= allDay; i++) {
				cal.find(".dateList").append("<li>" + i + "</li>")
			}
			//标记颜色
			cal.find(".dateList li").each(function(i, elm) {
				var val = $(this).text();
				if(n == 0) {
					if(val < today) {
						$(this).addClass('ccc')
					} else if(val == today) {
						$(this).addClass('red')
					} else if(i % 7 == 0 || i % 7 == 6) {
						$(this).addClass('sun')
					}
				} else if(n < 0) {
					$(this).addClass('ccc')
				} else if(i % 7 == 0 || i % 7 == 6) {
					$(this).addClass('sun')
				}
			});
			// 当鼠标悬停时更改样式
			cal.find(".dateList").mouseover(function(e) {
				var e = e || window.event;
				var target = e.target || e.srcElement;
				$(target).addClass('red').siblings().removeClass("red")
			})
			// 当点击li时取得当前日期值
			cal.find(".dateList").click(function(e) {
				var e = e || window.event;
				var target = e.target || e.srcElement;
				var day = $(target)[0].innerHTML
				var date = year + "-" + (month + 1) + "-" + day;
				var type = cal.parent().attr("data-type");
				if(type == 1) {
					$(".start-time input").val(date);
				} else {
					$(".leave-time input").val(date);
				}
				cal.parent().hide();
			})
			//定义标题日期
			cal.find("h4").text((month + 1) + "月" + year + "年");
		};
		run(iNow);
		//上一页
		$(".a1").click(function() {
			iNow--;
			run(iNow);
		});
		//下一页
		$(".a2").click(function() {
			iNow++;
			run(iNow);
		})
	}
	
	var cal1 = $(".cal1");
	var cal2 = $(".cal2");
	new Canlendar(0, cal1);
	new Canlendar(1, cal2);

	$(document).click(function() {
		$("#cal").css({
			"display": "none"
		})
		$(".people-info").css({
			"display": "none"
		})

	})

	$(".start-time").click(function(e) {
		var event = e || window.event;
		event.stopPropagation();
		$(".people-info").css({
			"display": "none"
		})
		$("#cal").css({
			"display": "block",
			"left": '540px'
		})
		$("#cal").attr("data-type", "1")
		$(this).addClass("input_active")
	})

	$(".leave-time").click(function(e) {
		var event = e || window.event;
		event.stopPropagation();
		$(".people-info").css({
			"display": "none"
		})
		$("#cal").show();
		$("#cal").css({
			"left": "730px"
		})
		$(this).addClass("input_active")
		$("#cal").attr("data-type", "2")
	})
	$(".item-people").click(function(e) {
		var event = e || window.event;
		event.stopPropagation();
		$("#cal").css({
			"display": "none"
		})
		$(".people-info").show();
		$(this).addClass("input_active")
	})
	$(".select-triger").click(function(e) {
		var event = e || window.event;
		event.stopPropagation();
		$(this).siblings("ul").show();
		$(this).parent().siblings().children().eq(1).hide()
	})
	$(".people-info").click(function(e) {
		$(".select ul").hide();
	})

	//选择人数
	$(".select ul").click(function(e) {
		var event = e || window.event;
		var targer = event.target || event.srcElement;
		var val = $(targer).text();
		var str = $(this).siblings().children("span").text()
		var str1 = str.charAt(0);
		var res = str.replace(str1, val)
		$(this).siblings().children("span").text(res);
	})

	//选择人数后确定
	$(".bottom .sure").click(function(e) {
		var event = e || window.event;
		event.stopPropagation();
		var str = $('.select-triger span').text();
		$(".item-people .num").text(str)
		$(".people-info").css({
			"display": "none"
		})
	})
});