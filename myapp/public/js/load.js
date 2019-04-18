window.onload = function(){
	var account = document.getElementById('account');
	var password = document.getElementById('password');
	var err = document.getElementsByClassName('err_tip').item(0);
	var err1 = document.getElementsByClassName('err_tip1').item(0);
	account.onkeyup = function(){
		if(account.value ==''){//用户名框验证不能为空
			err.style.display = 'block';
		}else{
			err.style.display = 'none';
		}
	}
	password.onblur = function(){//密码框验证不能为空
		if(password.value ==''){
			err1.style.display = 'block';

		}else if(password.value.length < 4){//密码框验证不能少于4位
			err1.innerText = '密码长度不能少于4'
		}else{
			err1.style.display = 'none';
		}
	}

	function changeimg(){
			// 改变背景图片
			var imgArr = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"];
			var index = Math.floor(Math.random()*(imgArr.length-1));
			var bg = document.getElementsByClassName("load_bg").item(0);
			var cImg = imgArr[index];
			bg.style.backgroundImage = "url(/img/"+ cImg + ")";
		}
	changeimg()

	//登录请求
	$('#load_btn').click(function(e){
		e.preventDefault();
		var data = $('.singup').serialize();
		$.ajax({
			url: './api/load',
			type: 'post',
			data: data,
		}).then(function(res){
			if (res.loginStatus) {
				sessionStorage.setItem('user',res.loginUser.nickName)
				alert(sessionStorage.getItem('user')+',登陆成功');
				window.location.href='http://localhost:8085/';	
			}else{
				alert('用户名或密码错误，请重新输入')
			}
		})
		
	})
}
