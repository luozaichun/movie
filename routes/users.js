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
            alert('该用户名已经存在')
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

router.post('/signin',function (req, res) {
    var _name=req.body.name;
    var _password=req.body.password;

    User.findOne({name:_name},function (err, user) {
        if(err){
            console.log(err)
        }
        if (!user){
            res.json({
                success:0
            });
        }else {
            //引用一个实例方法，区别静态方法
            user.comparePassword(_password,function (err, isMatch) {
                if (err){
                    console.log(err)
                }
                if (isMatch){
                    res.json({
                        success:1,
                        name:_name
                    });
                    // var html='';

                }
            })
        }
    })
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