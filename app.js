
var createError = require('http-errors');
var express = require('express');
var app = express();
var flash=require('connect-flash');
var config=require('./config');
//app.set('env',process.env.ENV);
var path = require('path');
//处理收藏夹图标
var favicon=require('serve-favicon');
//解析cookie, req.cookies属性存放着客户端提交过来的cookie
//req.cookie(key,value) 向客户端写入cookie
var cookieParser = require('cookie-parser');
//写日志的
var logger = require('morgan');
//处理请求体的req.body属性 存放着请求体对象
var bodyParser=require('body-parser');
//主页路由
var indexRouter = require('./routes/index');
//用户路由
var usersRouter = require('./routes/users');
//文章路由
var articlesRouter = require('./routes/articles');
//引入session中间件
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
// view engine setup
//设置模板的存放路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'ejs');
//指定HTML模板的渲染方法
// app.set('view engine', 'html');
// app.engine('html',require('ejs').__express);
//在你把favicon图标放置在public目录之后取消注释
app.use(favicon(path.join(__dirname,'public','favicon.ico')));
//日志记录中间件
app.use(logger('dev'));
//处理content-type=json的请求体
app.use(bodyParser.json());
//处理content-type=urlencoded的请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret:'zfpx',
    resave:true,//每次响应结束后都保存一下session数据
    saveUninitialized:true,//保存新创建但未初始化的session
    store:new MongoStore({
        url:config.dbUrl
    })
}));
app.use(flash());
app.use(function(req,res,next){
    res.locals.user=req.session.user;
    res.locals.success=req.flash('success').toString();
    res.locals.error=req.flash('error').toString();
    res.locals.keyword=req.session.keyword;
    next();
});
//静态文件服务中间件，指定一个绝对目录的路径作为静态文件的根目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
