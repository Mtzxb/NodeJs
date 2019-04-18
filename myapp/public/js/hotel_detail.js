$(function(){
	var databaoliu = ''
	$('.heads').load('http://localhost:8085/head')
	$("#res").focus(function(event){
		$("#res").css({
			'height':"100px",
			'border-color':"#ffb133",
			'box-shadow':"0 0 3px rgba(255,177,51,1)"
		})
		$(".res_a").eq(0).css("display",'block');
	})
	$("#res").on('blur',function(){
		$("#res").css({
			'height':"50px",
			'border':"1px solid #cecece",
			'box-shadow':"none"
		})
		$(".res_a").eq(0).css("display",'none')
	})
	
	function showpage(){
		var id = window.location.href.split('?')[1];
		$.ajax({
			url: './api/serach_id',
			type: 'post',
			data: {id:id}
		}).then(function(res){
			databaoliu = res;
			$('title').html(res[0].hotelName);
			$('.hotel_cname >span').html(res[0].hotelName);
			$('.hotel_bg >img').attr('src',res[0].hotelImg);
			var str = '地址：'+res[0].hotelAddress+'<a href="#"><i></i>查看地图</a>'
			$('.hotel_location >span').html(str);
			$('.h_intro >p').html(res[0].hotelDes);
			BDmap(res)//地图
			//开始渲染价格
			$.ajax({
				url: './api//hotelRoom_price',
				type: 'post',
				data:{star:res[0].hotelStar}
			}).then(function(res){
				var str = ""
				for(var i =0 ;i<res.length;i++){
				 	str += '<a href="#" class="room_item clearfix"><div class="room_name">';
				 	str += '<img src="http://images.mafengwo.net/images/hotel/ota/agoda_w100h20_2x_2.png" alt=""></div>'
				 	str += '<div class="room_type">'+res[i].roomType+'</div>'
				 	str += '<div class="room_price">'+res[i].price+'<i></i></div></a>' 
				}
				$('.booking_info').append(str)
			})
		})		
	}
	showpage()

	$('.booking_info').on('click','a',function(e){
		e.preventDefault();
		var date = new Date().getTime();
		var hotelname  = databaoliu[0].hotelName;
		var ordersDate = new Date();
		var ordertime  = dateFtt("yyyy-MM-dd hh:mm:ss",ordersDate);
		var roomType   = this.children[1];
		console.log(roomType)
		if (sessionStorage.user) {
			$.ajax({
				url: './api/order',
				type: 'POST',
				data: {
					'orderName':date,
					'hotelName':hotelname,
					'ordersDate':ordertime,
					'roomType':roomType,
					'userName':sessionStorage.user
				},
			}).then(function(res){
				alert(res)
			})	
		}else{
			alert('请登录后再下单')
		}
	})

	function BDmap(res){
		var arr = res[0].hotelLocation.split(',');
		var jingdu = Number(arr[0]);
		var weidu  = Number(arr[1]);
		var map = new BMap.Map("room_mapcontent");
		var point = new BMap.Point(jingdu,weidu);
		map.centerAndZoom(point,15);
		map.enableScrollWheelZoom(true);
		var marker = new BMap.Marker(point);//生成小红点
		map.addOverlay(marker);//讲小红点显示出来
		marker.enableDragging()

		var opts = {
		  position : point,    // 指定文本标注所在的地理位置
		  offset   : new BMap.Size(10, -35)    //设置文本偏移量
		}
		var hotelname = res[0].hotelName
		var label = new BMap.Label(hotelname, opts);  // 创建文本标注对象
			label.setStyle({
				 color : "red",
				 fontSize : "12px",
				 height : "20px",
				 lineHeight : "20px",
				 fontFamily:"微软雅黑"
			 });
		map.addOverlay(label);
	}
		
})