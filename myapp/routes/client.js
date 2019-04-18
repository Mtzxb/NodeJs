var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./client/index')
});

//酒店分类界面
router.get('/item',function(req,res,next){
	res.render('./client/hotel')
})
//渲染搜索酒店界面
router.get('/search', function(req, res, next) {
  res.render('./client/hotelSearch')
});

//酒店详情界面
router.get('/hotel_detail', function(req, res, next) {
  res.render('./client/hotel_detail')
});

//渲染登录界面
router.get('/load',function(req,res,next){
  res.render('./client/load')
})

//渲染注册界面
router.get('/register',function(req,res,next){
  res.render('./client/register')
})

//底部公共
router.get('/foot',function(req,res,next){
	res.render('./client/footer')
})
//公共头部
router.get('/head',function(req,res,next){
	res.render('./client/header')
})
//
router.get('/travel',function(req,res,next){
  res.render('./client/travel')
})
module.exports = router;
