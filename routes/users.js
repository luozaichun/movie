var express = require('express');
var router = express.Router('/users');//路由，注意这里再app.js是app.use('/users', users);所以设置路由的路径注意。

var User=require('../models/user');//数据库中user表模块
// var _=require('underscore');//停止循环，更加方便的写代码

//用户注册
router.post('/signup',function (req, res) {
    var _user=req.body;
    var user=new User({
        name:_user.name,
        password:_user.password
    });
    user.save(function (err,user) {
       if(err){
           console.log(err);
       }
      console.log(user)
   })
});

//

module.exports = router;