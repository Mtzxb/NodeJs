window.onload = function(){
			var tel = document.getElementById("tel");
			var pwd = document.getElementById("pwd");
			var cpwd = document.getElementById("cpwd");
			var err = document.getElementsByClassName('err_tip').item(0);
			var err1 = document.getElementsByClassName('err_tip1').item(0);
			var err2 = document.getElementsByClassName('err_tip2').item(0);
 

			tel.onblur = function(){
				if(tel.value ==''){
					err.style.display = 'block';
				}else{
					err.style.display = 'none';
				}
			}
			pwd.onkeyup = function(){
				if(pwd.value ==''){
					err1.style.display = 'block';
				}else if(pwd.value.length < 4){
					err1.style.display = 'block';
					err1.innerText = '密码长度不能少于4';
				}else{
					err1.style.display = 'none';
				}
			}
			cpwd.onkeyup = function(){
				if (cpwd.value != pwd.value) {
					err2.style.display = 'block';
				}else{
					err2.style.display = 'none';
				}
			}

			function changeimg(){
				// 改变背景图片
				var imgArr = ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"];
				var index = Math.floor(Math.random()*(imgArr.length-1));
				var bg = document.getElementsByClassName("reg_bg").item(0);
				var cImg = imgArr[index];
				bg.style.backgroundImage = "url(/img/"+ cImg + ")";
			}
			changeimg()
			

			$('#register_btn').click(function(e){
				e.preventDefault();
				console.log($('input'))
				for(var i=0;i<4;i++){
					if($('input')[i].value == ""){
						alert($('input')[i].placeholder)
						return
					}
				}
				if (cpwd.value != pwd.value){
					alert('密码不一致')
					return;
				}
				var data = $('.singup').serialize();
				$.ajax({
					url: './api/register',
					type: 'post',
					data: data
				}).then(function(res){
					alert(res);
					window.location.href='http://localhost:8085/load';
				})
			})
		}