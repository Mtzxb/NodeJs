var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var client = require('./routes/client');
var admin  = require('./routes/admin');
var api    = require('./routes/api.js');

var app = express();

// 允许我们访问的url地址
app.all("*", function (req,res,next) {
  var allowedOrigins = [
    "http://192.168.85.156:8083",
    "http://192.168.191.1:8083",
    "http://192.168.85.130:8080",
    "http://192.168.85.129:8000",
    "http://192.168.85.191:8082",
    "*"
  ];
　// 这里是允许跨域的的domain列表
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', true);// Allow Cookie
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

// 配置项目模板引擎
app.engine('html', ejs.__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置路由中间件
app.use('/', client);//普通用户
app.use('/admin', admin);//管理用户
app.use('/api', api);//ajax请求路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
