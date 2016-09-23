var express = require('express');
var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  res.ss = "At beginning";
  next();
});


app.get('/', function(req, res, next){
  res.send(res.ss + 'hello world');
  next();
},function (req, res, next) {
  console.log('/ Request Type:', req.method);
  next();
});


app.get('/user/:id', function(req, res, next) {
  console.log('user Request URL:', req.originalUrl);
  // 如果 user id 为 0, 跳到下一个路由
  if (req.params.id == 0){
    next('route');
  }
  // 否则将控制权交给栈中下一个中间件
  else {
    next();
  } //
}, function (req, res, next) {
  console.log('user Request Type:', req.method);
  res.send("User" + req.params.id);
  // next();
});

app.get('/user/:id', function (req, res, next) {
  console.log('special id = 0');
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(404);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log('error:' + err.message);
});





app.listen(3011, function () {
  console.log('Example app listening on port 3011!');
});