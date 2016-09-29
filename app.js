var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');//表单数据格式化,bodyParser中间件用来解析http请求体，是express默认使用的中间件之一。获取表单请求，将body里面的东西初始化一个对象
var mongoose = require('mongoose');
var mongoStore=require('connect-mongo')(express);
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var dbUrl='mongodb://localhost/movie';
mongoose.connect(dbUrl);//连接数据库，数据库的名称设置为movie


// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));//获取表单请求，解析数据。


app.use(cookieParser());
app.use(express.session({
  
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);//app.use 加载用于处理http請求的middleware（中间件），当一个请求来的时候，会依次被这些 middlewares处理。
app.use('/users', users);//app.use相当于启动

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.locals.moment=require('moment');
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });

});


module.exports = app;
