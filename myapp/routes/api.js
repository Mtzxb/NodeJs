var express = require('express');
var router = express.Router();
var pool    = require('../db/db');

//酒店分类展示
router.post('/hotel_classification',function(req, res, next){
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('连接错误')
			return
		}
		switch(req.body.data){
			case '全部':
				var sql = "select * from hotel";
				break;
			case '五星级酒店':
				var sql = "SELECT * FROM hotel WHERE hotelStar = 5";
				break;
			case '精品酒店':
				var sql = "select * from hotel where hotelName like '%精品酒店%'";
				break;
			default : 
				var sql = "select * from hotel where hotelCountry like '%"+req.body.data+"%' or hotelName like '%"+req.body.data+"%' or hotelProvince like '%"+req.body.data+"%'";
				break
			}
		connection.query(sql,function(err,rows){
			if (err) {
				res.send('执行错误');
				return
			}
			res.send(rows)
			connection.release();
		})
	})
})

//渲染酒店详情界面
router.post('/serach_id',function(req, res, next){
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('连接错误')
		}
		console.log(req.body.id)
		var sql = "SELECT * FROM hotel where hotelID = "+req.body.id;
		connection.query(sql,function(err,rows){
			if (rows) {
				res.send(rows)
			}
			connection.release();
		})
	})
})

//酒店对应价格获取
router.post('/hotelRoom_price',function(req,res,next){
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('连接错误')
		}
		var sql = "SELECT * FROM price where hotelStar = "+req.body.star;
		connection.query(sql,function(err,rows){
			if (rows) {
				res.send(rows)
			}
			connection.release();
		})
	})
})

//用户注册
router.post('/register',function(req,res,next){//后台对注册的处理
	console.log(req.body)
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('连接错误')
		}
		var sqlsearch = "select * from guest where userName=?";
		var sqlParams = [req.body.username];
		connection.query(sqlsearch,sqlParams,function(err,rows){
			if (err) {
				res.send("链接错误2")
				return;
			}else{
				if (rows.length > 0) {
					res.send('用户名重复');
					connection.release();
					return;
				}else{
					// 如果不重名 就建立一个新连接 执行插入数据库
					pool.getConnection(function(err,connection1){
						if (err) {
							res.send('连接错误');
						}
						var sql = "INSERT INTO guest (userName,password,nickName) VALUES (?,?,?)";
						var sqlParams = [req.body.username,req.body.password,req.body.nickname];
						connection1.query(sql,sqlParams,function(err,rows){
							if (err) {
								throw err;
								return;
							}else{
								res.send('注册成功')
								connection1.release();
							}
						})
					})//插入操作结束
				}
			}
			connection.release();
		})
	})
})

//用户登录
router.post('/load',function(req,res,next){//后台对登录的处理
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('连接错误')
		}
		var sql = "select * from guest where userName=? and password=?";
		var sqlParams = [req.body.username,req.body.password];
		connection.query(sql,sqlParams,function(err,rows){
			if(rows.length == 1){
				res.send({
					loginStatus:true,
					loginUser:rows[0]
				})
			}else{
				res.send({
					loginStatus:false
				})
			}
			connection.release();
		})
	})
})

//下单处理
router.post('/order',function(req,res,next){//后台对登录的处理
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('连接错误')
		}
		var sql = "INSERT INTO orders  (orderName,hotelName,ordersDate,roomType,userName) VALUE ('"+req.body.orderName+"','"+req.body.hotelName+"','"+req.body.ordersDate+"','"+req.body.roomType+"','"+req.body.userName+"')";
		connection.query(sql,function(err,rows){
			if (err) {
				res.send('下单失败')
			}
			res.send('下单成功')
			connection.release();
		})
	})
})

//订单查询
router.post('/orderSelect',function(req,res,next){
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('连接错误')
		}
		var sql = "SELECT * FROM orders WHERE userName = '"+req.body.username+"' order by ordersID desc LIMIT "+req.body.index+",1"
		connection.query(sql,function(err,rows){
			if (err) {
				res.send('查询失败')
			}
			res.send(rows)
			connection.release();
		})
	})
})

//
router.post('/indexbox',function(req,res,next){
	pool.getConnection(function(err,connection){
		if (err) {
			res.send('连接错误')
		}
		var sql = "SELECT * FROM hotlecomment limit 4";
		connection.query(sql,function(err,rows){
			if (err) {
				res.send('查询失败')
			}
			res.send(rows)
			connection.release();
		})
	})
})

//陈倩的请求
router.get('/chenqian',function(req,res,next){
	res.send('给我发送的数据地址是：' + req.url)
})
router.post('/chenqian',function(req,res,next){
	console.log(req.body)
	var shuju = req.body
	res.send('给我发送的数据是：' + shuju)
})
module.exports = router;