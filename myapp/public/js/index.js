window.onload = (function() {
		//轮播图
		var liss = document.getElementById('liss');
		var liss_li = liss.getElementsByTagName('li');
		var pic = document.getElementById('pic');
		var pic_li = pic.getElementsByTagName('li');
		var mun = -1;
		setInterval(function() {
				mun++;
				if (mun > 4) {
					mun = 0;
				}
				for (var i = 0; i < liss_li.length; i++) {
					liss_li[i].className = '';
				}
				liss_li[mun].className = 'border';
				pic.innerHTML = '<li>' + liss_li[mun].innerHTML + '</li>';
			}, 2000)
			//搜索选项
		var search_pic = document.getElementsByClassName('search_pic1');
		var search_pic2 = document.getElementsByClassName('search_pic2');
		var input1 = document.getElementsByClassName('search_input')[0];
		var input_text = input1.getElementsByTagName('input')[0];
		var input2 = document.getElementsByClassName('search_input1')[0];
		for (var i = 0; i < search_pic.length; i++) {
			search_pic[i].onclick = function(e) {
				var e = e || window.event;
				var sext = e.target.getAttribute('date-place');
				var net = e.target.getAttribute('date-one');
				for (var j = 0; j < search_pic.length; j++) {
					search_pic[j].className = 'search_pic search_pic1';
				}
				e.target.className += ' search_pic2';
				input1.style.display = 'block';
				input2.style.display = 'none';
				if (net) {
					input1.style.display = 'none';
					input2.style.display = 'block';
				}
				input_text.setAttribute('placeholder', sext)
			}
		}
		//热卖产品
		var meisongqu_ul = document.getElementsByClassName('meisongqu_ul')[0];
		var meisongqu_li = meisongqu_ul.getElementsByTagName('li');
		var h3 = meisongqu_ul.getElementsByTagName('h3');
		var p = meisongqu_ul.getElementsByTagName('p');
		for (var i = 0; i < meisongqu_li.length; i++) {
			(function(n) {
				meisongqu_li[n].onmouseover = function(e) {
					var e = e || window.event;
					//								h3[n].style.height = '80px';
					//								h3[n].style.marginTop = '-35px';
					//								h3[n].style.color ='#ff9d00';
					h3[n].style.animation = 'key 1s forwards';
					p[n].style.backgroundColor = '#f8f8f8';
					// h3[n].style.backgroundColor = '#f00';
				}
				meisongqu_li[n].onmouseout = function(e) {
					var e = e || window.event;
					//								h3[n].style.height = '42px';
					//								h3[n].style.marginTop = '0px';
					//								h3[n].style.backgroundColor = '';
					//								h3[n].style.color ='#000000';
					h3[n].style.animation = 'way 1s forwards';
					p[n].style.backgroundColor = '';
					h3[n].style.backgroundColor = 'transprante';
				}
			}(i));
		};
	}())