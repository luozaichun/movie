var express = require('express');
var router = express.Router('/users');//路由，注意这里再app.js是app.use('/users', users);所以设置路由的路径注意。

var User=require('../models/user');//数据库中user表模块
// var _=require('underscore');//停止循环，更加方便的写代码

//用户注册
router.post('/signup',function (req, res) {
    var _user=req.body;

    User.findOne({name:_user.name},function (err, users) {
        if (err){
            console.log(err)
        }
        if (users){
            res.redirect('/');
        }
        else{
            var user=new User({
                name:_user.name,
                password:_user.password
            });
            user.save(function (err,user) {
                if(err){
                    console.log(err);
                }
                res.redirect('/users/list')
            });
        }
    });

});

//用户列表
router.get('/list',function (req, res) {
    var id=req.query.id;

    if (id==undefined){
        User.fetch(function (err,users) {
            if(err){
                console.log(err);
            }
            res.render('user-list',{
                title:'用户列表页',
                users: users
            })
        });
    }else{
        //list delete
        User.remove({_id:id},function (err,uses) {
            if (err){
                console.log(err);
            }else{
                res.json({
                    success:1
                })
            }
        })
    }

});

module.exports = router;